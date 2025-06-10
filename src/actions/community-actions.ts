
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, query, orderBy, serverTimestamp, Timestamp, where, limit } from 'firebase/firestore';
import { 
  type Community,
  type PostInCommunity, // Will be used more when posts are in Firestore
  type Comment,       // Will be used more when comments are in Firestore
  defaultRules,
  generateHintFromName
} from '@/lib/community-service';
import { generateImage } from '@/ai/flows/generate-image-flow';

export interface CreateCommunityFormState {
  success: boolean;
  message?: string;
  communityId?: string; // Return ID for redirection or further ops
  communityName?: string;
  fieldErrors?: {
    communityName?: string;
    communityDescription?: string;
    communityLongDescription?: string;
    communityBannerImage?: string; 
  };
}

export interface UpdateCommunityFormState {
  success: boolean;
  message?: string;
  communityId?: string;
  communityName?: string;
  fieldErrors?: {
    editCommunityName?: string;
    editCommunityDescription?: string;
    editCommunityLongDescription?: string;
  };
}

export interface CreatePostInCommunityFormState {
  success: boolean;
  message?: string;
  postId?: string;
  fieldErrors?: {
    newPostTitle?: string;
    newPostContent?: string;
  };
}


export async function createCommunityAction(
  prevState: CreateCommunityFormState | undefined,
  formData: FormData
): Promise<CreateCommunityFormState> {
  const name = formData.get('communityName') as string;
  const description = formData.get('communityDescription') as string;
  const longDescription = formData.get('communityLongDescription') as string || description;
  const bannerImageFile = formData.get('communityBannerImage') as File | null;

  const fieldErrors: NonNullable<CreateCommunityFormState['fieldErrors']> = {};

  if (!name || name.trim() === '') {
    fieldErrors.communityName = 'Community name is required.';
  }
  if (!description || description.trim() === '') {
    fieldErrors.communityDescription = 'Description is required.';
  }
  if (!longDescription || longDescription.trim() === '') {
    fieldErrors.communityLongDescription = 'Full details are required.';
  }

  let bannerImageDataUri: string | undefined = undefined;
  let bannerImageHintGenerated: string | undefined = undefined;

  if (bannerImageFile && bannerImageFile.size > 0) {
    if (bannerImageFile.size > 5 * 1024 * 1024) { // Max 5MB
        fieldErrors.communityBannerImage = 'Banner image must be less than 5MB.';
    } else if (!bannerImageFile.type.startsWith('image/')) {
        fieldErrors.communityBannerImage = 'Invalid file type. Please upload an image.';
    } else {
        try {
            const bannerImageBytes = await bannerImageFile.arrayBuffer();
            const bannerImageBuffer = Buffer.from(bannerImageBytes);
            bannerImageDataUri = `data:${bannerImageFile.type};base64,${bannerImageBuffer.toString('base64')}`;
            bannerImageHintGenerated = bannerImageFile.name; // Use file name as a basic hint
        } catch (error) {
            console.error("Error processing banner image:", error);
            fieldErrors.communityBannerImage = 'Error processing banner image.';
        }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      fieldErrors,
    };
  }

  try {
    const communityData: Omit<Community, 'id'> = {
      name: name.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      members: 0,
      image: `https://placehold.co/400x250.png?text=${encodeURIComponent(name.substring(0,3))}`,
      imageHint: generateHintFromName(name, "icon"),
      bannerImage: bannerImageDataUri || `https://placehold.co/1200x400.png?text=${encodeURIComponent(name.substring(0,3))}`,
      bannerImageHint: bannerImageHintGenerated || generateHintFromName(name, "banner"),
      postsCount: 0,
      foundedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rules: defaultRules,
      // 'createdAt': serverTimestamp() // Add if sorting by creation time is needed
    };

    const docRef = await addDoc(collection(db, "communities"), communityData);
    const newCommunityId = docRef.id;

    let iconGenerationMessage = 'Using placeholder icon.';
    try {
      const imagePrompt = `A unique, modern, abstract icon for an online community named '${name}', focusing on themes of connection and support. Suitable for a small avatar.`;
      const generatedImageOutput = await generateImage({ prompt: imagePrompt });

      if (generatedImageOutput.imageDataUri) {
        await updateDoc(doc(db, "communities", newCommunityId), {
          image: generatedImageOutput.imageDataUri,
          imageHint: "AI generated icon"
        });
        iconGenerationMessage = 'Icon generation successful.';
      } else {
        iconGenerationMessage = 'Icon generation attempted, but no image was returned.';
      }
    } catch (genError) {
      console.error("Error generating icon for community:", genError);
      iconGenerationMessage = 'Icon generation failed.';
    }
    
    const bannerMessage = bannerImageDataUri ? "Banner image uploaded." : "Using placeholder banner.";

    revalidatePath('/communities');
    revalidatePath('/communities/create'); 
    revalidatePath(`/communities/${newCommunityId}`);
    return { 
      success: true, 
      message: `Community "${name}" created! ${iconGenerationMessage} ${bannerMessage}`,
      communityId: newCommunityId,
      communityName: name,
    };

  } catch (error) {
    console.error("Error in createCommunityAction (Firestore):", error);
    return { success: false, message: 'An unexpected error occurred while creating the community in Firestore.' };
  }
}


export async function updateCommunityAction(
  communityId: string,
  prevState: UpdateCommunityFormState | undefined,
  formData: FormData
): Promise<UpdateCommunityFormState> {
  const name = formData.get('editCommunityName') as string;
  const description = formData.get('editCommunityDescription') as string;
  const longDescription = formData.get('editCommunityLongDescription') as string || description;
  
  const fieldErrors: NonNullable<UpdateCommunityFormState['fieldErrors']> = {};

  if (!name || name.trim() === '') {
    fieldErrors.editCommunityName = 'Community name is required.';
  }
  if (!description || description.trim() === '') {
    fieldErrors.editCommunityDescription = 'Description is required.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      fieldErrors,
    };
  }

  try {
    const communityRef = doc(db, "communities", communityId);
    const communitySnap = await getDoc(communityRef);

    if (!communitySnap.exists()) {
      return { success: false, message: "Community not found." };
    }
    const currentCommunityData = communitySnap.data() as Community;

    const updatedFields: Partial<Community> = {
      name: name.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
    };

    // Logic for updating placeholder images if name changes and no new images are provided
    // This logic would typically be extended if the edit form allowed banner/icon uploads too.
    // For now, assume only text fields are editable in this form.
    if (name.trim() !== currentCommunityData.name) {
        if (!currentCommunityData.image || !currentCommunityData.image.startsWith('data:image')) {
            updatedFields.image = `https://placehold.co/400x250.png?text=${encodeURIComponent(name.substring(0,3))}`;
            updatedFields.imageHint = generateHintFromName(name, "icon");
        }
        if (!currentCommunityData.bannerImage || !currentCommunityData.bannerImage.startsWith('data:image')) {
            updatedFields.bannerImage = `https://placehold.co/1200x400.png?text=${encodeURIComponent(name.substring(0,3))}`;
            updatedFields.bannerImageHint = generateHintFromName(name, "banner");
        }
    }

    await updateDoc(communityRef, updatedFields);

    revalidatePath(`/communities/${communityId}`);
    revalidatePath('/communities');
    return {
      success: true,
      message: `Community "${name}" updated successfully!`,
      communityId: communityId,
      communityName: name,
    };
  } catch (error) {
    console.error("Error in updateCommunityAction (Firestore):", error);
    return { success: false, message: 'An unexpected error occurred while updating the community in Firestore.' };
  }
}

// This action will be refactored when posts are migrated to Firestore
export async function createPostInCommunityAction(
  prevState: CreatePostInCommunityFormState | undefined,
  formData: FormData
): Promise<CreatePostInCommunityFormState> {
  // Placeholder - to be implemented with Firestore posts subcollection
  console.warn("createPostInCommunityAction needs to be updated for Firestore posts.");
  const title = formData.get('newPostTitle') as string;
   if (!title) return { success: false, message: 'Title is required', fieldErrors: {newPostTitle: "Title is required"} };
  return { success: false, message: 'Post creation with Firestore not yet implemented.' };
}

// Fetch all communities from Firestore
export async function getAllCommunitiesAction(): Promise<Community[]> {
  try {
    const communitiesCollection = collection(db, "communities");
    // Example: Order by name, or later by a 'createdAt' timestamp if added
    // const q = query(communitiesCollection, orderBy("name"));
    const querySnapshot = await getDocs(communitiesCollection);
    const communities = querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    } as Community));
    return communities;
  } catch (error) {
    console.error("Error fetching all communities from Firestore:", error);
    return [];
  }
}

// Fetch a single community by ID from Firestore
export async function getCommunityByIdAction(id: string): Promise<Community | undefined> {
  try {
    const communityRef = doc(db, "communities", id);
    const docSnap = await getDoc(communityRef);
    if (docSnap.exists()) {
      // Fetch posts count (if this field exists, or dynamically count subcollection later)
      const communityData = { id: docSnap.id, ...docSnap.data() } as Community;
      
      // Simulate fetching posts and comments for now. This will be complex.
      // In a real scenario, posts would be a subcollection and fetched separately, possibly with pagination.
      // For now, we'll add a placeholder `posts` array to match the existing type.
      // This will be removed/refactored when posts are actually stored in Firestore.
      (communityData as any).posts = []; 


      return communityData;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching community ${id} from Firestore:`, error);
    return undefined;
  }
}

export type AddCommentData = Omit<Comment, 'id' | 'time'>;

// This action will be refactored when comments are migrated to Firestore
export async function addCommentToPostAction(
  communityId: string, 
  postId: string, 
  commentData: AddCommentData
): Promise<Comment | null> {
  // Placeholder - to be implemented with Firestore comments subcollection
  console.warn("addCommentToPostAction needs to be updated for Firestore comments.");
  return null;
}

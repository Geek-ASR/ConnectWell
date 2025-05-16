
'use server';

import { revalidatePath } from 'next/cache';
import { 
  addCommunity as addCommunityService, 
  updateCommunityDetails as updateCommunityDetailsService, 
  addPostToCommunity as addPostToCommunityService,
  type Community,
  type PostInCommunity 
} from '@/lib/community-service';
import { generateImage } from '@/ai/flows/generate-image-flow';

export interface CreateCommunityFormState {
  success: boolean;
  message?: string;
  community?: Community;
  fieldErrors?: {
    communityName?: string;
    communityDescription?: string;
    communityLongDescription?: string;
  };
}

export interface UpdateCommunityFormState {
  success: boolean;
  message?: string;
  community?: Community;
  fieldErrors?: {
    editCommunityName?: string;
    editCommunityDescription?: string;
    editCommunityLongDescription?: string;
  };
}

export interface CreatePostInCommunityFormState {
  success: boolean;
  message?: string;
  post?: PostInCommunity;
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


  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      fieldErrors,
    };
  }

  try {
    let newCommunity = addCommunityService({ // Make newCommunity mutable
      name,
      description,
      longDescription,
    });

    if (newCommunity) {
      let iconGenerationMessage = 'Using placeholder icon.';
      try {
        const imagePrompt = `A unique, modern, abstract icon for an online community named '${newCommunity.name}', focusing on themes of connection and support. Suitable for a small avatar.`;
        const generatedImageOutput = await generateImage({ prompt: imagePrompt });

        if (generatedImageOutput.imageDataUri) {
          const updatedCommunityWithImage = updateCommunityDetailsService(newCommunity.id, {
            image: generatedImageOutput.imageDataUri,
          });
          if (updatedCommunityWithImage) {
            newCommunity = updatedCommunityWithImage; // update the community object
            iconGenerationMessage = 'Icon generation successful.';
          } else {
            console.warn(`Failed to update community ${newCommunity.id} with generated image.`);
            iconGenerationMessage = 'Icon generation attempted, but update failed.';
          }
        } else {
            iconGenerationMessage = 'Icon generation attempted, but no image was returned.';
        }
      } catch (genError) {
        console.error("Error generating image for community:", genError);
        iconGenerationMessage = 'Icon generation failed.';
        // Community is still created, but with placeholder image.
      }

      revalidatePath('/communities');
      revalidatePath('/communities/create'); 
      return { 
        success: true, 
        message: `Community "${newCommunity.name}" created successfully! ${iconGenerationMessage}`,
        community: newCommunity 
      };
    } else {
      return { success: false, message: 'Failed to create community. Please try again.' };
    }
  } catch (error) {
    console.error("Error in createCommunityAction:", error);
    return { success: false, message: 'An unexpected error occurred while creating the community.' };
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
    const updatedCommunity = updateCommunityDetailsService(communityId, {
      name,
      description,
      longDescription,
    });

    if (updatedCommunity) {
      revalidatePath(`/communities/${communityId}`);
      revalidatePath('/communities');
      return {
        success: true,
        message: `Community "${updatedCommunity.name}" updated successfully!`,
        community: updatedCommunity,
      };
    } else {
      return { success: false, message: 'Failed to update community. Community not found or no changes made.' };
    }
  } catch (error) {
    console.error("Error in updateCommunityAction:", error);
    return { success: false, message: 'An unexpected error occurred while updating the community.' };
  }
}

export async function createPostInCommunityAction(
  prevState: CreatePostInCommunityFormState | undefined,
  formData: FormData
): Promise<CreatePostInCommunityFormState> {
  const title = formData.get('newPostTitle') as string;
  const content = formData.get('newPostContent') as string;
  const communityId = formData.get('communityId') as string;
  const userId = formData.get('userId') as string;
  const userName = formData.get('userName') as string;
  const userAvatar = formData.get('userAvatar') as string;
  const userAvatarHint = formData.get('userAvatarHint') as string || 'user avatar';

  const fieldErrors: NonNullable<CreatePostInCommunityFormState['fieldErrors']> = {};
  if (!title || title.trim() === '') {
    fieldErrors.newPostTitle = 'Post title is required.';
  }
  if (!content || content.trim() === '') {
    fieldErrors.newPostContent = 'Post content is required.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, message: 'Please correct the errors below.', fieldErrors };
  }

  if (!communityId || !userId || !userName) {
    return { success: false, message: 'User or community information is missing. Cannot create post.' };
  }

  try {
    const newPost = addPostToCommunityService(communityId, {
      userId,
      userName,
      userAvatar: userAvatar || `https://placehold.co/40x40.png?text=${userName.substring(0,2).toUpperCase()}`,
      userAvatarHint,
      title,
      content,
    });

    if (newPost) {
      revalidatePath(`/communities/${communityId}`);
      return {
        success: true,
        message: 'Post created successfully!',
        post: newPost,
      };
    } else {
      return { success: false, message: 'Failed to create post. Community not found or an error occurred.' };
    }
  } catch (error) {
    console.error("Error in createPostInCommunityAction:", error);
    return { success: false, message: 'An unexpected error occurred while creating the post.' };
  }
}

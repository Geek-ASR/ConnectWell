
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface UserProfileData {
  bio?: string;
  medicalConditions?: string; // Comma-separated string
  avatarUrl?: string;
  bannerUrl?: string;
}

export interface UpdateUserProfileFormState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    bio?: string;
    medicalConditions?: string;
    avatarFile?: string;
    bannerFile?: string;
  };
  // No longer returning profileData from the action
}

// Simulate a delay for server action
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_AVATAR_SIZE_MB = 2;
const MAX_BANNER_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function updateUserProfileAction(
  userId: string, // Added userId parameter
  prevState: UpdateUserProfileFormState | undefined, 
  formData: FormData
): Promise<UpdateUserProfileFormState> {
  await sleep(500); // Simulate network delay

  if (!userId) {
    return {
      success: false,
      message: 'User ID is missing. Cannot update profile.',
    };
  }

  const bio = formData.get('bio') as string;
  const medicalConditions = formData.get('medicalConditions') as string;
  const avatarFile = formData.get('avatarFile') as File | null;
  const bannerFile = formData.get('bannerFile') as File | null;

  const fieldErrors: NonNullable<UpdateUserProfileFormState['fieldErrors']> = {};
  let newAvatarDataUri: string | undefined = undefined;
  let newBannerDataUri: string | undefined = undefined;

  if (bio && bio.length > 500) {
    fieldErrors.bio = 'Bio must be 500 characters or less.';
  }

  if (medicalConditions && medicalConditions.length > 300) {
    fieldErrors.medicalConditions = 'Medical conditions entry is too long.';
  }

  // Process avatar file
  if (avatarFile && avatarFile.size > 0) {
    if (avatarFile.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      fieldErrors.avatarFile = `Avatar image must be less than ${MAX_AVATAR_SIZE_MB}MB.`;
    } else if (!ALLOWED_IMAGE_TYPES.includes(avatarFile.type)) {
      fieldErrors.avatarFile = 'Invalid avatar file type. Please upload a JPEG, PNG, GIF or WEBP.';
    } else {
      try {
        const avatarBytes = await avatarFile.arrayBuffer();
        const avatarBuffer = Buffer.from(avatarBytes);
        newAvatarDataUri = `data:${avatarFile.type};base64,${avatarBuffer.toString('base64')}`;
      } catch (error) {
        console.error("Error processing avatar image:", error);
        fieldErrors.avatarFile = 'Error processing avatar image.';
      }
    }
  }

  // Process banner file
  if (bannerFile && bannerFile.size > 0) {
    if (bannerFile.size > MAX_BANNER_SIZE_MB * 1024 * 1024) {
      fieldErrors.bannerFile = `Banner image must be less than ${MAX_BANNER_SIZE_MB}MB.`;
    } else if (!ALLOWED_IMAGE_TYPES.includes(bannerFile.type)) {
      fieldErrors.bannerFile = 'Invalid banner file type. Please upload a JPEG, PNG, GIF or WEBP.';
    } else {
      try {
        const bannerBytes = await bannerFile.arrayBuffer();
        const bannerBuffer = Buffer.from(bannerBytes);
        newBannerDataUri = `data:${bannerFile.type};base64,${bannerBuffer.toString('base64')}`;
      } catch (error) {
        console.error("Error processing banner image:", error);
        fieldErrors.bannerFile = 'Error processing banner image.';
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
    const userProfileRef = doc(db, 'users', userId);
    // Fetch existing data to merge, or start with an empty object
    let existingData: UserProfileData = {};
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
        existingData = docSnap.data() as UserProfileData;
    }

    const profileDataToSave: UserProfileData = {
      ...existingData, // Preserve existing fields not being updated
      bio: bio.trim(),
      medicalConditions: medicalConditions.trim(),
    };

    if (newAvatarDataUri) {
      profileDataToSave.avatarUrl = newAvatarDataUri;
    }
    // If avatarFile is null or size 0, but there was an intent to remove (not explicitly handled here yet, but could be)
    // For now, if no new avatar file is provided, existing avatarUrl is preserved unless explicitly cleared.
    // To clear an image, one might send a specific flag or an empty string for the file input.

    if (newBannerDataUri) {
      profileDataToSave.bannerUrl = newBannerDataUri;
    }
    
    await setDoc(userProfileRef, profileDataToSave, { merge: true });

    revalidatePath('/profile');

    return {
      success: true,
      message: 'Profile updated successfully!',
    };

  } catch (error) {
    console.error("Error saving profile to Firestore:", error);
    return {
      success: false,
      message: 'An error occurred while saving your profile. Please try again.',
    };
  }
}

// Action to fetch profile data (can be called by client components)
export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  if (!userId) return null;
  try {
    const userProfileRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile from Firestore:", error);
    return null; // Or throw error / return an error state
  }
}

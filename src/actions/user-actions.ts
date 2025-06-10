
'use server';

import { revalidatePath } from 'next/cache';

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
  profileData?: UserProfileData;
}

// Simulate a delay for server action
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_AVATAR_SIZE_MB = 2;
const MAX_BANNER_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function updateUserProfileAction(
  // prevState is not strictly needed here if we rebuild full state, but good for pattern
  prevState: UpdateUserProfileFormState | undefined, 
  formData: FormData
): Promise<UpdateUserProfileFormState> {
  await sleep(500); // Simulate network delay

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
      // Return existing data if files cause errors but text is okay
      profileData: {
        bio: bio.trim(),
        medicalConditions: medicalConditions.trim(),
        // Don't pass back new URIs if there were errors with them
      }
    };
  }

  const updatedProfileData: UserProfileData = {
    bio: bio.trim(),
    medicalConditions: medicalConditions.trim(),
  };

  if (newAvatarDataUri) {
    updatedProfileData.avatarUrl = newAvatarDataUri;
  }
  if (newBannerDataUri) {
    updatedProfileData.bannerUrl = newBannerDataUri;
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile updated successfully!',
    profileData: updatedProfileData,
  };
}

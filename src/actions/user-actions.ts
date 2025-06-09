
'use server';

import { revalidatePath } from 'next/cache';

export interface UserProfileData {
  bio?: string;
  medicalConditions?: string; // Comma-separated string
}

export interface UpdateUserProfileFormState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    bio?: string;
    medicalConditions?: string;
  };
  profileData?: UserProfileData;
}

// Simulate a delay for server action
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function updateUserProfileAction(
  prevState: UpdateUserProfileFormState | undefined,
  formData: FormData
): Promise<UpdateUserProfileFormState> {
  await sleep(500); // Simulate network delay

  const bio = formData.get('bio') as string;
  const medicalConditions = formData.get('medicalConditions') as string;

  const fieldErrors: NonNullable<UpdateUserProfileFormState['fieldErrors']> = {};

  if (bio && bio.length > 500) {
    fieldErrors.bio = 'Bio must be 500 characters or less.';
  }

  // Basic validation for medical conditions (e.g., not too long)
  if (medicalConditions && medicalConditions.length > 300) {
    fieldErrors.medicalConditions = 'Medical conditions entry is too long.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      fieldErrors,
    };
  }

  const updatedProfileData: UserProfileData = {
    bio: bio.trim(),
    medicalConditions: medicalConditions.trim(),
  };

  // In a real app, you would save this to a database here.
  // For this prototype, we just return the data.
  // Revalidation is called to simulate data being refetched if it were server-side.
  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile updated successfully!',
    profileData: updatedProfileData,
  };
}

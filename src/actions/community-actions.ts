
'use server';

import { revalidatePath } from 'next/cache';
import { addCommunity as addCommunityService, updateCommunityDetails as updateCommunityDetailsService, type Community } from '@/lib/community-service';

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
  // Optional: Add validation for longDescription if needed
  // if (!longDescription || longDescription.trim() === '') {
  //   fieldErrors.communityLongDescription = 'Full details are required.';
  // }


  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      fieldErrors,
    };
  }

  try {
    const newCommunity = addCommunityService({
      name,
      description,
      longDescription,
    });

    if (newCommunity) {
      revalidatePath('/communities');
      revalidatePath('/communities/create'); 
      return { 
        success: true, 
        message: `Community "${newCommunity.name}" created successfully!`,
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

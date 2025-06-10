
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userAvatarHint: string;
  text: string;
  time: string;
}

export interface PostInCommunity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userAvatarHint: string;
  title: string;
  content: string;
  comments: number; 
  commentObjects: Comment[];
  upvotes: number;
  time: string;
  isUpvotedByUser?: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  members: number;
  image: string; // This is treated as the community icon/avatar
  imageHint: string;
  bannerImage: string; // This is the cover image
  bannerImageHint: string;
  postsCount?: number; // Keep track of posts, actual posts will be a subcollection
  // posts: PostInCommunity[]; // Posts will be a subcollection in Firestore
  foundedDate: string;
  rules: string;
}

export const defaultRules = "1. Be respectful and courteous to all members.\n2. No hate speech, bullying, or harassment.\n3. Share constructively and keep discussions relevant to the community's topic.\n4. Do not share medical advice; always consult with qualified health professionals for medical concerns.\n5. Protect your privacy and the privacy of others.";

// In-memory data storage is removed. Data will be handled by Firestore via server actions.

export const generateHintFromName = (name: string, suffix: string = ""): string => {
  const nameParts = name.toLowerCase().split(' ').slice(0, 2).join(' ');
  const baseHint = nameParts ? nameParts : "community";
  return suffix ? `${baseHint} ${suffix}` : baseHint;
};

// The functions below (addPostToCommunityService, addCommentToPost) will be refactored
// in subsequent steps when posts and comments are migrated to Firestore.
// For now, their direct modification of the (now removed) initialCommunities array
// would not work and will be handled by new Firestore logic in actions.

export const addPostToCommunityService = (
  communityId: string,
  postBaseData: { userId: string; userName: string; userAvatar: string; userAvatarHint: string; title: string; content: string }
): PostInCommunity | null => {
  // This function will be refactored to interact with Firestore.
  // For now, it's a placeholder as community posts are not yet in Firestore.
  console.warn("addPostToCommunityService needs to be updated for Firestore");
  return null;
};

export const addCommentToPost = (
  communityId: string,
  postId: string,
  commentData: { userId: string; userName: string; userAvatar: string; userAvatarHint: string; text: string; }
): Comment | null => {
  // This function will be refactored to interact with Firestore.
  // For now, it's a placeholder as comments are not yet in Firestore.
  console.warn("addCommentToPost needs to be updated for Firestore");
  return null;
};

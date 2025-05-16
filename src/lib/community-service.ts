
"use client"; // Keep this for now as functions might be used by client components directly

export interface PostInCommunity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userAvatarHint: string;
  title: string;
  content: string;
  comments: number;
  upvotes: number;
  time: string;
  isUpvotedByUser?: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  longDescription: string; // Changed from optional to required
  members: number;
  image: string;
  imageHint: string;
  bannerImage?: string;
  bannerImageHint?: string;
  posts: PostInCommunity[];
}

let initialCommunities: Community[] = [
  { id: "1", name: "Diabetes Support Group", description: "Sharing experiences and tips for managing diabetes.", longDescription: "This group is dedicated to individuals living with all types of diabetes, their families, and caregivers. We share experiences, offer support, discuss treatment options, and provide tips for daily management and healthy living. Join us to connect with a compassionate community.", members: 120, image: "https://placehold.co/400x250.png", imageHint: "health group", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "community gathering", posts: [] },
  { id: "2", name: "Ankylosing Spondylitis Warriors", description: "A community for those fighting AS.", longDescription: "Connect with fellow Ankylosing Spondylitis (AS) warriors. This space is for sharing coping mechanisms, treatment advancements, exercise routines, and emotional support for managing life with AS. Let's navigate this journey together.", members: 75, image: "https://placehold.co/400x250.png", imageHint: "wellness community", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "support network", posts: [] },
  { id: "3", name: "Mental Wellness Advocates", description: "Support for mental health challenges and triumphs.", longDescription: "A safe and inclusive community for discussing mental wellness, sharing personal stories of challenges and triumphs, and advocating for mental health awareness. Find resources, support, and understanding here.", members: 250, image: "https://placehold.co/400x250.png", imageHint: "support circle", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "peaceful mind", posts: [] },
  { id: "4", name: "Chronic Pain Navigators", description: "Coping strategies and support for chronic pain.", longDescription: "Living with chronic pain can be isolating. This community offers a platform to share effective coping strategies, discuss pain management techniques, and find mutual support from others who understand the daily struggles.", members: 90, image: "https://placehold.co/400x250.png", imageHint: "patient group", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "gentle healing", posts: [] },
  { id: "5", name: "Allergy & Asthma Network", description: "Connect with others managing allergies and asthma.", longDescription: "A network for individuals and families affected by allergies and asthma. Share tips on managing triggers, understanding medications, and navigating daily life with these conditions. Breathe easier with community support.", members: 150, image: "https://placehold.co/400x250.png", imageHint: "breathing health", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "fresh air", posts: [] },
  { id: "6", name: "Heart Health Champions", description: "A group focused on cardiovascular wellness and recovery.", longDescription: "Dedicated to promoting heart health, supporting individuals recovering from cardiac events, and sharing information on cardiovascular wellness. Join fellow champions in making heart-healthy choices and supporting one another.", members: 180, image: "https://placehold.co/400x250.png", imageHint: "heartbeat monitor", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "healthy lifestyle", posts: [] },
];

export const getCommunityById = (id: string): Community | undefined => {
  return initialCommunities.find(community => community.id === id);
};

export const getAllCommunities = (): Community[] => {
  return [...initialCommunities]; // Return a copy to prevent direct mutation from outside
};

export const addCommunity = (communityData: { name: string; description: string; longDescription: string }): Community => {
  const newCommunity: Community = {
    id: Date.now().toString(),
    name: communityData.name,
    description: communityData.description,
    longDescription: communityData.longDescription, // Now expects longDescription
    members: 0, // Initial members count
    image: `https://placehold.co/400x250.png?text=${encodeURIComponent(communityData.name.substring(0,3))}`,
    imageHint: "community topic",
    bannerImage: `https://placehold.co/1200x400.png?text=${encodeURIComponent(communityData.name.substring(0,3))}`,
    bannerImageHint: "community banner",
    posts: [],
  };
  initialCommunities.unshift(newCommunity); // Add to the beginning of the array
  return newCommunity;
};

export const addPostToCommunity = (
  communityId: string,
  postBaseData: { userId: string; userName: string; userAvatar: string; userAvatarHint: string; title: string; content: string }
): PostInCommunity | null => {
  const community = initialCommunities.find(c => c.id === communityId);
  if (community) {
    const newPost: PostInCommunity = {
      id: `p_${Date.now().toString()}_${Math.random().toString(16).slice(2)}`,
      ...postBaseData,
      comments: 0,
      upvotes: 0,
      time: 'Just now',
      isUpvotedByUser: false,
    };
    community.posts.unshift(newPost);
    return newPost;
  }
  return null;
};

export const updateCommunityDetails = (
  communityId: string,
  updatedData: { name?: string; description?: string; longDescription?: string }
): Community | null => {
  const communityIndex = initialCommunities.findIndex(c => c.id === communityId);
  if (communityIndex > -1) {
    const community = initialCommunities[communityIndex];
    if (updatedData.name) community.name = updatedData.name;
    if (updatedData.description) community.description = updatedData.description;
    // Ensure longDescription is updated, and falls back to description if not explicitly provided during update
    community.longDescription = updatedData.longDescription || updatedData.description || community.longDescription;
    
    // If name changes, update placeholder images (optional, but good for consistency)
    if (updatedData.name) {
        community.image = `https://placehold.co/400x250.png?text=${encodeURIComponent(updatedData.name.substring(0,3))}`;
        community.bannerImage = `https://placehold.co/1200x400.png?text=${encodeURIComponent(updatedData.name.substring(0,3))}`;
    }

    initialCommunities[communityIndex] = community;
    return community;
  }
  return null;
};

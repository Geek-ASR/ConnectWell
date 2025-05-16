
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
}

export interface Community {
  id: string;
  name: string;
  description: string;
  longDescription?: string; // Optional: for the detail page
  members: number;
  image: string;
  imageHint: string;
  bannerImage?: string; // Optional: for the detail page
  bannerImageHint?: string; // Optional
  posts: PostInCommunity[]; // Added posts array
}

// Changed to let to allow modification
let initialCommunities: Community[] = [
  { id: "1", name: "Diabetes Support Group", description: "Sharing experiences and tips for managing diabetes.", longDescription: "This group is dedicated to individuals living with all types of diabetes, their families, and caregivers. We share experiences, offer support, discuss treatment options, and provide tips for daily management and healthy living. Join us to connect with a compassionate community.", members: 120, image: "https://placehold.co/400x250.png", imageHint: "health group", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "community gathering", posts: [] },
  { id: "2", name: "Ankylosing Spondylitis Warriors", description: "A community for those fighting AS.", longDescription: "Connect with fellow Ankylosing Spondylitis (AS) warriors. This space is for sharing coping mechanisms, treatment advancements, exercise routines, and emotional support for managing life with AS. Let's navigate this journey together.", members: 75, image: "https://placehold.co/400x250.png", imageHint: "wellness community", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "support network", posts: [] },
  { id: "3", name: "Mental Wellness Advocates", description: "Support for mental health challenges and triumphs.", longDescription: "A safe and inclusive community for discussing mental wellness, sharing personal stories of challenges and triumphs, and advocating for mental health awareness. Find resources, support, and understanding here.", members: 250, image: "https://placehold.co/400x250.png", imageHint: "support circle", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "peaceful mind", posts: [] },
  { id: "4", name: "Chronic Pain Navigators", description: "Coping strategies and support for chronic pain.", longDescription: "Living with chronic pain can be isolating. This community offers a platform to share effective coping strategies, discuss pain management techniques, and find mutual support from others who understand the daily struggles.", members: 90, image: "https://placehold.co/400x250.png", imageHint: "patient group", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "gentle healing", posts: [] },
  { id: "5", name: "Allergy & Asthma Network", description: "Connect with others managing allergies and asthma.", longDescription: "A network for individuals and families affected by allergies and asthma. Share tips on managing triggers, understanding medications, and navigating daily life with these conditions. Breathe easier with community support.", members: 150, image: "https://placehold.co/400x250.png", imageHint: "breathing health", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "fresh air", posts: [] },
  { id: "6", name: "Heart Health Champions", description: "A group focused on cardiovascular wellness and recovery.", longDescription: "Dedicated to promoting heart health, supporting individuals recovering from cardiac events, and sharing information on cardiovascular wellness. Join fellow champions in making heart-healthy choices and supporting one another.", members: 180, image: "https://placehold.co/400x250.png", imageHint: "heartbeat monitor", bannerImage: "https://placehold.co/1200x400.png", bannerImageHint: "healthy lifestyle", posts: [] },
];


// Function to provide community data. In a real app, this would fetch from a DB or API.
export const getCommunityById = (id: string): Community | undefined => {
  return initialCommunities.find(community => community.id === id);
};

export const getAllCommunities = (): Community[] => {
  return [...initialCommunities]; // Return a copy to avoid direct state mutation issues elsewhere if needed
};

// New function to add a community (client-side simulation)
export const addCommunity = (communityData: { name: string; description: string; longDescription?: string }): Community => {
  const newCommunity: Community = {
    id: Date.now().toString(),
    name: communityData.name,
    description: communityData.description,
    longDescription: communityData.longDescription || communityData.description,
    members: 0, // New communities start with 0 members
    image: `https://placehold.co/400x250.png?text=${communityData.name.substring(0,2).toUpperCase()}`,
    imageHint: "community topic", // Generic hint
    bannerImage: `https://placehold.co/1200x400.png?text=${communityData.name.substring(0,2).toUpperCase()}`,
    bannerImageHint: "community banner", // Generic hint
    posts: [], // Initialize with empty posts array
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
      id: `p_${Date.now().toString()}_${Math.random().toString(16).slice(2)}`, // More unique ID
      ...postBaseData,
      comments: 0,
      upvotes: 0,
      time: 'Just now',
    };
    community.posts.unshift(newPost); // Add to the beginning
    return newPost;
  }
  return null;
};


export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // Fetch all communities when the component mounts or when initialCommunities might have changed
    setCommunities(getAllCommunities());
  }, []); // Re-run if you expect initialCommunities to change due to external factors and need to refresh.
            // For this specific case of adding then navigating back, the page re-mount will call this.
  
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = communities.filter(community =>
      community.name.toLowerCase().includes(lowercasedSearchTerm) ||
      community.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredCommunities(results);
  }, [searchTerm, communities]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Discover Communities</CardTitle>
              <CardDescription>Find groups based on medical conditions, share experiences, and connect.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/communities/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Community
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search communities (e.g., Diabetes, Arthritis)"
              className="pl-10 w-full md:w-1/2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </CardContent>
      </Card>

      {filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  data-ai-hint={community.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{community.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Users className="h-4 w-4 mr-1.5" />
                  {community.members} members
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{community.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/communities/${community.id}`}>View Community</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            {searchTerm ? (
                <p className="text-lg text-muted-foreground">No communities found matching your search for &quot;{searchTerm}&quot;. Try a different term or create one!</p>
            ) : (
                <p className="text-lg text-muted-foreground">No communities available. Why not create one?</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

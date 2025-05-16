
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Edit3, MessageSquarePlus, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Community } from '../page'; // Import the Community type
import { getCommunityById } from '../page'; // Import the data fetching function
import { useToast } from '@/hooks/use-toast';

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  const communityId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (communityId) {
      const foundCommunity = getCommunityById(communityId);
      if (foundCommunity) {
        setCommunity(foundCommunity);
      } else {
        console.error("Community not found");
        // Optionally redirect or show a more permanent "not found" state
        // router.push('/communities?error=notfound'); // Example
      }
    }
    setLoading(false);
  }, [communityId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="shadow-lg">
            <CardContent className="pt-6">
                <p className="text-xl text-muted-foreground">Loading community details...</p>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
         <div className="flex items-center gap-4 my-6">
            <Button variant="outline" size="icon" asChild>
                <Link href="/communities">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Communities</span>
                </Link>
            </Button>
             <h1 className="text-2xl font-bold text-destructive">Community Not Found</h1>
        </div>
        <Card className="shadow-lg">
            <CardContent className="pt-6">
                <p className="text-muted-foreground">The community you are looking for does not exist or may have been moved.</p>
                <Button asChild className="mt-4">
                    <Link href="/communities">Go to Communities</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  // Placeholder data for posts and members
  const posts = [
    { id: 'p1', user: { name: 'Alice Wonderland', avatar: 'https://placehold.co/40x40.png?text=AW', avatarHint: 'woman nature' }, title: 'First steps after diagnosis', content: 'Just got diagnosed and feeling overwhelmed. Any advice for newcomers?', comments: 5, upvotes: 12, time: '2h ago' },
    { id: 'p2', user: { name: 'Bob The Builder', avatar: 'https://placehold.co/40x40.png?text=BB', avatarHint: 'man city' }, title: 'Managing daily routines', content: 'What are your best tips for staying on track with medication and diet?', comments: 8, upvotes: 25, time: '5h ago' },
    { id: 'p3', user: { name: 'Charlie Brown', avatar: 'https://placehold.co/40x40.png?text=CB', avatarHint: 'person thinking' }, title: 'New research article discussion', content: 'Found an interesting article on new treatments, wanted to share and discuss thoughts. [Link]', comments: 12, upvotes: 30, time: '1d ago' },
  ];

  const communityMembers = [
    { id: 'm1', name: 'Eva Green', avatar: 'https://placehold.co/40x40.png?text=EG', avatarHint: 'profile photo' },
    { id: 'm2', name: 'David Lee', avatar: 'https://placehold.co/40x40.png?text=DL', avatarHint: 'user icon' },
    { id: 'm3', name: 'Olivia Chen', avatar: 'https://placehold.co/40x40.png?text=OC', avatarHint: 'member avatar' },
    { id: 'm4', name: 'Michael B.', avatar: 'https://placehold.co/40x40.png?text=MB', avatarHint: 'man smiling' },
  ];

  const handleEditCommunity = () => {
    toast({ title: "Edit Community", description: "This would open an edit form for the community. (Not implemented)" });
  };

  const handleNewPost = () => {
    toast({ title: "New Post", description: "This would open a new post creation modal/page. (Not implemented)" });
  };

  const handleViewAllMembers = () => {
    toast({ title: "View All Members", description: `Displaying all ${community.members} members. (Not implemented)` });
  };

  const handleCommunitySettings = () => {
    toast({ title: "Community Settings", description: "Opening community settings. (Not implemented)" });
  };


  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Back Button */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/communities">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Communities</span>
          </Link>
        </Button>
        {/* Community Actions */}
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleEditCommunity}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit Community
            </Button>
             <Button onClick={handleNewPost}>
                <MessageSquarePlus className="mr-2 h-4 w-4" /> New Post
            </Button>
        </div>
      </div>

      {/* Community Banner and Info */}
      <Card className="shadow-xl overflow-hidden">
        <div className="relative h-48 md:h-64 bg-muted">
          {community.bannerImage && (
            <Image
              src={community.bannerImage}
              alt={`${community.name} banner`}
              fill
              style={{objectFit: 'cover'}}
              data-ai-hint={community.bannerImageHint || "community banner"}
              priority // Consider adding priority if this is LCP
            />
          )}
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text contrast */}
        </div>
        <CardHeader className="relative -mt-16 md:-mt-20 z-10 p-6 bg-gradient-to-t from-card via-card/80 to-transparent rounded-t-lg">
          <div className='flex flex-col items-center md:flex-row md:items-end gap-4'>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-card shadow-lg">
              <AvatarImage src={community.image} alt={community.name} data-ai-hint={community.imageHint} />
              <AvatarFallback className="text-3xl">{getInitials(community.name)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left pt-2 md:pt-0 md:pb-2">
              <CardTitle className="text-3xl md:text-4xl font-bold">{community.name}</CardTitle>
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mt-1">
                <Users className="h-4 w-4 mr-1.5" />
                {community.members} members
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <CardDescription className="text-base leading-relaxed">
            {community.longDescription || community.description}
          </CardDescription>
        </CardContent>
      </Card>
      
      {/* Main content: Posts and Members side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Section (Left/Main) */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Posts</h2>
            {posts.map(post => (
                <Card key={post.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-start gap-3 pb-3">
                         <Avatar className="h-10 w-10">
                            <AvatarImage src={post.user.avatar} alt={post.user.name} data-ai-hint={post.user.avatarHint} />
                            <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold text-sm text-foreground">{post.user.name}</p>
                            <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-1 text-foreground">{post.title}</h3>
                        <p className="text-sm text-foreground/90">{post.content}</p>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground flex justify-between items-center pt-3 border-t">
                        <div className="flex gap-4">
                            <span>{post.upvotes} Upvotes</span>
                            <span>{post.comments} Comments</span>
                        </div>
                        {/* Placeholder for post actions like reply, etc. */}
                         <Button variant="ghost" size="sm" className="text-xs h-auto p-1">View Post</Button>
                    </CardFooter>
                </Card>
            ))}
            {posts.length === 0 && (
                <Card className="shadow-md">
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground text-center">No posts in this community yet. Be the first to share!</p>
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Members & About Section (Right Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">Community Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {communityMembers.slice(0, 5).map(member => ( // Show a few members
                        <div key={member.id} className="flex items-center gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">{member.name}</span>
                        </div>
                    ))}
                    {community.members > 5 && (
                        <Button variant="link" className="p-0 h-auto text-sm w-full justify-start mt-2 text-primary hover:text-primary/80" onClick={handleViewAllMembers}>
                            View all {community.members} members
                        </Button>
                    )}
                     {community.members === 0 && (
                         <p className="text-sm text-muted-foreground">No members yet.</p>
                     )}
                </CardContent>
            </Card>

             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">About this Community</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                    <div className="flex items-center">
                        <strong className="w-20 text-muted-foreground">Founded:</strong>
                        <span className="text-foreground">January 2024 <span className="text-xs text-muted-foreground">(Placeholder)</span></span>
                    </div>
                     <div className="flex items-start">
                        <strong className="w-20 text-muted-foreground shrink-0">Rules:</strong>
                        <span className="text-foreground">Be respectful, share constructively, no medical advice (consult professionals). <span className="text-xs text-muted-foreground">(Placeholder)</span></span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={handleCommunitySettings}>
                        <Settings className="mr-2 h-4 w-4" /> Community Settings
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

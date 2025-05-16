
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Users, Edit3, MessageSquarePlus, Settings, ArrowBigUp, MessageCircle as MessageCircleIcon, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext'; 
import { cn } from '@/lib/utils';
import type { Community, PostInCommunity } from '@/lib/community-service'; 
import { getCommunityById, addPostToCommunity, updateCommunityDetails } from '@/lib/community-service';

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth(); 
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isSubmittingNewPost, setIsSubmittingNewPost] = useState(false);

  const [isEditCommunityDialogOpen, setIsEditCommunityDialogOpen] = useState(false);
  const [editCommunityName, setEditCommunityName] = useState("");
  const [editCommunityDescription, setEditCommunityDescription] = useState("");
  const [editCommunityLongDescription, setEditCommunityLongDescription] = useState("");
  const [isSubmittingEditCommunity, setIsSubmittingEditCommunity] = useState(false);

  const communityId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (communityId) {
      const foundCommunity = getCommunityById(communityId);
      if (foundCommunity) {
        setCommunity(foundCommunity);
      } else {
        console.error("Community not found with ID:", communityId);
        // Optionally, redirect or show a more prominent "not found" message earlier
      }
    }
    setLoading(false);
  }, [communityId]); // Removed router from dependencies as it's not directly used for fetching

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const communityMembers = [ // Placeholder members, can be part of community data later
    { id: 'm1', name: 'Eva Green', avatar: 'https://placehold.co/40x40.png?text=EG', avatarHint: 'profile photo' },
    { id: 'm2', name: 'David Lee', avatar: 'https://placehold.co/40x40.png?text=DL', avatarHint: 'user icon' },
    { id: 'm3', name: 'Olivia Chen', avatar: 'https://placehold.co/40x40.png?text=OC', avatarHint: 'member avatar' },
    { id: 'm4', name: 'Michael B.', avatar: 'https://placehold.co/40x40.png?text=MB', avatarHint: 'man smiling' },
  ];

  const handleOpenEditCommunityDialog = () => {
    if (!community) return;
    setEditCommunityName(community.name);
    setEditCommunityDescription(community.description);
    setEditCommunityLongDescription(community.longDescription || community.description);
    setIsEditCommunityDialogOpen(true);
  };

  const handleEditCommunitySubmit = async () => {
    if (!community || !communityId) {
      toast({ title: "Error", description: "Community data missing.", variant: "destructive" });
      return;
    }
    if (!editCommunityName.trim() || !editCommunityDescription.trim()) {
      toast({ title: "Missing Information", description: "Please provide a name and description.", variant: "destructive" });
      return;
    }

    setIsSubmittingEditCommunity(true);
    try {
      const updatedCommunityData = updateCommunityDetails(communityId, {
        name: editCommunityName,
        description: editCommunityDescription,
        longDescription: editCommunityLongDescription,
      });

      if (updatedCommunityData) {
        setCommunity(updatedCommunityData); 
        toast({ title: "Community Updated", description: "Community details have been saved." });
        setIsEditCommunityDialogOpen(false);
      } else {
        toast({ title: "Error", description: "Could not update community details.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error updating community:", error);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsSubmittingEditCommunity(false);
    }
  };


  const handleOpenNewPostDialog = () => {
    if (!community || !communityId || !user) {
      toast({ title: "Error", description: "Cannot create post. Community or user data missing.", variant: "destructive" });
      return;
    }
    setNewPostTitle("");
    setNewPostContent("");
    setIsNewPostDialogOpen(true);
  };

  const handleCreatePostSubmit = async () => {
    if (!community || !communityId || !user) {
      toast({ title: "Error", description: "Cannot create post. Community or user data missing.", variant: "destructive" });
      return;
    }
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({ title: "Missing Information", description: "Please provide a title and content for your post.", variant: "destructive" });
      return;
    }

    setIsSubmittingNewPost(true);
    try {
      const postAdded = addPostToCommunity(communityId, {
        userId: user.uid,
        userName: user.displayName || 'Anonymous User',
        userAvatar: user.photoURL || `https://placehold.co/40x40.png?text=${getInitials(user.displayName)}`,
        userAvatarHint: 'user avatar',
        title: newPostTitle,
        content: newPostContent
      });

      if (postAdded) {
        const updatedCommunityData = getCommunityById(communityId); // Re-fetch to get updated posts
        if (updatedCommunityData) {
          setCommunity(updatedCommunityData);
        }
        toast({ title: "Post Created", description: "Your post has been added to the community." });
        setIsNewPostDialogOpen(false);
        setNewPostTitle(""); // Reset form fields
        setNewPostContent("");
      } else {
        toast({ title: "Error", description: "Could not add post to the community.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast({ title: "Error", description: "An unexpected error occurred while creating the post.", variant: "destructive" });
    } finally {
      setIsSubmittingNewPost(false);
    }
  };


  const handleViewAllMembers = () => {
    toast({ title: "View All Members", description: `Displaying all ${community?.members || 0} members. (Not implemented)` });
  };

  const handleCommunitySettings = () => {
    toast({ title: "Community Settings", description: "Opening community settings. (Not implemented)" });
  };

  const handleUpvotePost = (postId: string) => {
    if (!community) return;

    const updatedPosts = community.posts.map(post => {
      if (post.id === postId) {
        const newUpvotedState = !post.isUpvotedByUser;
        return {
          ...post,
          isUpvotedByUser: newUpvotedState,
          upvotes: newUpvotedState ? post.upvotes + 1 : post.upvotes - 1,
        };
      }
      return post;
    });
    setCommunity({ ...community, posts: updatedPosts });
  };

  const handleCommentOnPost = (postId: string) => {
    toast({
      title: "Comment",
      description: `Viewing comments for post ${postId}. (Not implemented)`,
    });
  };
  
  const handleViewPost = (postId: string) => {
    toast({
        title: "View Post",
        description: `Navigating to full view for post ${postId}. (Not implemented)`,
    });
  };


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
            <Dialog open={isEditCommunityDialogOpen} onOpenChange={setIsEditCommunityDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handleOpenEditCommunityDialog}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Community
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Edit Community Details</DialogTitle>
                  <DialogDescription>
                    Update the name and description for the {community.name} community.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editCommunityName" className="text-right">Name</Label>
                    <Input id="editCommunityName" value={editCommunityName} onChange={(e) => setEditCommunityName(e.target.value)} className="col-span-3" disabled={isSubmittingEditCommunity} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editCommunityDescription" className="text-right">Description</Label>
                    <Textarea id="editCommunityDescription" value={editCommunityDescription} onChange={(e) => setEditCommunityDescription(e.target.value)} className="col-span-3" rows={3} disabled={isSubmittingEditCommunity} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editCommunityLongDescription" className="text-right">Full Details</Label>
                    <Textarea id="editCommunityLongDescription" value={editCommunityLongDescription} onChange={(e) => setEditCommunityLongDescription(e.target.value)} className="col-span-3" rows={5} disabled={isSubmittingEditCommunity} />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={isSubmittingEditCommunity}>Cancel</Button>
                  </DialogClose>
                  <Button type="button" onClick={handleEditCommunitySubmit} disabled={isSubmittingEditCommunity || !editCommunityName.trim() || !editCommunityDescription.trim()}>
                    {isSubmittingEditCommunity ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenNewPostDialog}>
                  <MessageSquarePlus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                  <DialogDescription>
                    Share your thoughts or start a discussion in the {community.name} community.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPostTitle" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="newPostTitle"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="col-span-3"
                      placeholder="Enter post title"
                      disabled={isSubmittingNewPost}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPostContent" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="newPostContent"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="col-span-3"
                      placeholder="What's on your mind?"
                      rows={5}
                      disabled={isSubmittingNewPost}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={isSubmittingNewPost}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button 
                    type="button" 
                    onClick={handleCreatePostSubmit} 
                    disabled={isSubmittingNewPost || !newPostTitle.trim() || !newPostContent.trim()}
                  >
                    {isSubmittingNewPost ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                      </>
                    ) : (
                      "Create Post"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              priority
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
            {(community.posts && community.posts.length > 0) ? (
                community.posts.map(post => (
                    <Card key={post.id} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-start gap-3 pb-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.userAvatar} alt={post.userName} data-ai-hint={post.userAvatarHint} />
                                <AvatarFallback>{getInitials(post.userName)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm text-foreground">{post.userName}</p>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold mb-1 text-foreground">{post.title}</h3>
                            <p className="text-sm text-foreground/90">{post.content}</p>
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground flex justify-between items-center pt-3 border-t">
                           <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "flex items-center gap-1 text-xs h-auto p-1",
                                        post.isUpvotedByUser ? "text-primary hover:text-primary/90" : "text-muted-foreground hover:text-primary"
                                    )}
                                    onClick={() => handleUpvotePost(post.id)}
                                >
                                    <ArrowBigUp className={cn("h-4 w-4", post.isUpvotedByUser ? "fill-primary" : "")} />
                                    {post.upvotes} Upvote{post.upvotes !== 1 ? 's' : ''}
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-1 text-xs h-auto p-1 text-muted-foreground hover:text-primary"
                                    onClick={() => handleCommentOnPost(post.id)}
                                >
                                    <MessageCircleIcon className="h-4 w-4" /> {post.comments} Comment{post.comments !== 1 ? 's' : ''}
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs h-auto p-1" onClick={() => handleViewPost(post.id)}>
                                View Post
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
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

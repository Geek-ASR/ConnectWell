
"use client";

import React, { useEffect, useState, useActionState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// import { useActionState } from "react"; // Already imported above
import { useFormStatus } from "react-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Users, Edit3, MessageSquarePlus, Settings, ArrowBigUp, MessageCircle as MessageCircleIcon, Loader2, CalendarDays, FileText, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext'; 
import { cn } from '@/lib/utils';
import type { Community, PostInCommunity, Comment } from '@/lib/community-service'; 
// import { getCommunityById, addCommentToPost } from '@/lib/community-service'; // Will use server actions instead
import { 
  updateCommunityAction, 
  createPostInCommunityAction, 
  getCommunityByIdAction, // New import
  addCommentToPostAction, // New import
  type UpdateCommunityFormState,
  type CreatePostInCommunityFormState,
  type AddCommentData
} from '@/actions/community-actions';

function EditCommunitySubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
    </Button>
  );
}

function CreatePostSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...</> : "Create Post"}
    </Button>
  );
}


export default function CommunityDetailPage() {
  const { id: communityIdParam } = useParams() as { id?: string };
  const communityId = communityIdParam;

  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth(); 
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const [isEditCommunityDialogOpen, setIsEditCommunityDialogOpen] = useState(false);
  const [currentEditName, setCurrentEditName] = useState("");
  const [currentEditDescription, setCurrentEditDescription] = useState("");
  const [currentEditLongDescription, setCurrentEditLongDescription] = useState("");

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);


  const initialEditFormState: UpdateCommunityFormState = { success: false };
  const boundUpdateCommunityAction = communityId ? updateCommunityAction.bind(null, communityId) : null;
  const [editFormState, editFormAction] = useActionState( 
    boundUpdateCommunityAction || (() => Promise.resolve(initialEditFormState)), 
    initialEditFormState
  );

  const initialCreatePostFormState: CreatePostInCommunityFormState = { success: false };
  const [createPostFormState, formActionCreatePost] = useActionState(createPostInCommunityAction, initialCreatePostFormState); 

  const fetchCommunityData = async (id: string) => {
    setLoading(true);
    try {
      const foundCommunity = await getCommunityByIdAction(id);
      if (foundCommunity) {
        setCommunity(foundCommunity);
        setCurrentEditName(foundCommunity.name);
        setCurrentEditDescription(foundCommunity.description);
        setCurrentEditLongDescription(foundCommunity.longDescription || foundCommunity.description);
      } else {
        console.error("Community not found with ID:", id);
        setCommunity(null); // Ensure community is null if not found
      }
    } catch (error) {
      console.error("Failed to fetch community data:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not load community details."});
      setCommunity(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (communityId) {
      fetchCommunityData(communityId);
    } else {
      setLoading(false); // No ID, so not loading
      setCommunity(null);
    }
  }, [communityId]);

  useEffect(() => {
    if (editFormState?.success && editFormState.community) {
      toast({
        title: "Community Updated!",
        description: editFormState.message || `The community "${editFormState.community.name}" has been updated.`,
      });
      // No need to setCommunity directly, revalidation should handle it, or re-fetch
      if (communityId) fetchCommunityData(communityId);
      setIsEditCommunityDialogOpen(false); 
    } else if (editFormState?.message && !editFormState.success) {
      toast({
        variant: "destructive",
        title: "Error Updating Community",
        description: editFormState.message,
      });
    }
  }, [editFormState, toast, communityId]);

  useEffect(() => {
    if (createPostFormState?.success && createPostFormState.post && communityId) {
      toast({
        title: "Post Created!",
        description: createPostFormState.message || "Your post has been added.",
      });
      // Re-fetch community data to show the new post
      fetchCommunityData(communityId);
      setIsNewPostDialogOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
    } else if (createPostFormState?.message && !createPostFormState.success) {
      toast({
        variant: "destructive",
        title: "Error Creating Post",
        description: createPostFormState.message,
      });
    }
  }, [createPostFormState, toast, communityId]);


  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const handleOpenEditCommunityDialog = () => {
    if (!community) return;
    setCurrentEditName(community.name);
    setCurrentEditDescription(community.description);
    setCurrentEditLongDescription(community.longDescription || community.description);
    setIsEditCommunityDialogOpen(true);
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

  const handleViewAllMembers = () => {
    toast({ title: "View All Members", description: `Displaying all ${community?.members || 0} members. (Not implemented)` });
  };

  const handleCommunitySettings = () => {
    toast({ title: "Community Settings", description: "Opening community settings. (Not implemented)" });
  };

  const handleUpvotePost = (postId: string) => {
    if (!community) return;
    // This is a client-side optimistic update. A real version would call a server action.
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
  
  const handleViewPost = (postId: string) => {
    toast({
        title: "View Post",
        description: `Viewing full post ${postId} is not yet implemented.`,
    });
  };

  const handleToggleCommentInput = (postId: string) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null); // Close if already open
    } else {
      setActiveCommentPostId(postId);
      setNewCommentText(""); // Clear previous comment text
    }
  };

  const handlePostNewComment = async (postId: string) => {
    if (!communityId || !user || !community) {
      toast({ title: "Error", description: "Cannot post comment. User or community data missing.", variant: "destructive"});
      return;
    }
    if (newCommentText.trim() === "") {
      toast({ title: "Empty Comment", description: "Please write something to comment.", variant: "destructive"});
      return;
    }

    setIsPostingComment(true);
    try {
      const commentPayload: AddCommentData = {
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        userAvatar: user.photoURL || `https://placehold.co/40x40.png?text=${getInitials(user.displayName)}`,
        userAvatarHint: "user avatar",
        text: newCommentText,
      };
      const newComment = await addCommentToPostAction(communityId, postId, commentPayload);

      if (newComment) {
        await fetchCommunityData(communityId); // Re-fetch to get updated comments
        setNewCommentText("");
        // Optionally close the input: setActiveCommentPostId(null); // Or keep open for more comments
        toast({title: "Comment Posted!"});
      } else {
        toast({title: "Error", description: "Failed to post comment.", variant: "destructive"});
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({title: "Error", description: "An unexpected error occurred while posting comment.", variant: "destructive"});
    } finally {
      setIsPostingComment(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="shadow-lg">
            <CardContent className="pt-6 flex items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/communities">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Communities</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
            <Dialog open={isEditCommunityDialogOpen} onOpenChange={setIsEditCommunityDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handleOpenEditCommunityDialog} disabled={!boundUpdateCommunityAction}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Community
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <form action={boundUpdateCommunityAction ? editFormAction : undefined}>
                  <DialogHeader>
                    <DialogTitle>Edit Community Details</DialogTitle>
                    <DialogDescription>
                      Update the name and description for the {community.name} community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editCommunityName" className="text-right">Name</Label>
                      <Input 
                        id="editCommunityName" 
                        name="editCommunityName" 
                        value={currentEditName} 
                        onChange={(e) => setCurrentEditName(e.target.value)} 
                        className="col-span-3" 
                      />
                       {editFormState?.fieldErrors?.editCommunityName && (
                          <p className="col-span-4 text-sm text-destructive text-right">{editFormState.fieldErrors.editCommunityName}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editCommunityDescription" className="text-right">Description</Label>
                      <Textarea 
                        id="editCommunityDescription" 
                        name="editCommunityDescription" 
                        value={currentEditDescription} 
                        onChange={(e) => setCurrentEditDescription(e.target.value)} 
                        className="col-span-3" 
                        rows={3} 
                      />
                      {editFormState?.fieldErrors?.editCommunityDescription && (
                        <p className="col-span-4 text-sm text-destructive text-right">{editFormState.fieldErrors.editCommunityDescription}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editCommunityLongDescription" className="text-right">Full Details</Label>
                      <Textarea 
                        id="editCommunityLongDescription" 
                        name="editCommunityLongDescription" 
                        value={currentEditLongDescription} 
                        onChange={(e) => setCurrentEditLongDescription(e.target.value)} 
                        className="col-span-3" 
                        rows={5} 
                      />
                       {editFormState?.fieldErrors?.editCommunityLongDescription && (
                          <p className="col-span-4 text-sm text-destructive text-right">{editFormState.fieldErrors.editCommunityLongDescription}</p>
                        )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <EditCommunitySubmitButton />
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenNewPostDialog}>
                  <MessageSquarePlus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <form action={formActionCreatePost}>
                  <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts or start a discussion in the {community.name} community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {communityId && <input type="hidden" name="communityId" value={communityId} />}
                    {user && (
                      <>
                        <input type="hidden" name="userId" value={user.uid} />
                        <input type="hidden" name="userName" value={user.displayName || 'Anonymous User'} />
                        <input type="hidden" name="userAvatar" value={user.photoURL || ''} />
                        <input type="hidden" name="userAvatarHint" value="user avatar" />
                      </>
                    )}
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newPostTitle" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="newPostTitle"
                        name="newPostTitle"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="col-span-3"
                        placeholder="Enter post title"
                      />
                       {createPostFormState?.fieldErrors?.newPostTitle && (
                          <p className="col-span-4 text-sm text-destructive text-right">{createPostFormState.fieldErrors.newPostTitle}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newPostContent" className="text-right">
                        Content
                      </Label>
                      <Textarea
                        id="newPostContent"
                        name="newPostContent"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="col-span-3"
                        placeholder="What's on your mind?"
                        rows={5}
                      />
                      {createPostFormState?.fieldErrors?.newPostContent && (
                          <p className="col-span-4 text-sm text-destructive text-right">{createPostFormState.fieldErrors.newPostContent}</p>
                        )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <CreatePostSubmitButton />
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </div>
      </div>

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
          <div className="absolute inset-0 bg-black/30" /> 
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Posts</h2>
            {(community.posts && community.posts.length > 0) ? (
                community.posts.slice().sort((a, b) => {
                    const timeA = a.id.split('_')[1] ? parseInt(a.id.split('_')[1]) : 0;
                    const timeB = b.id.split('_')[1] ? parseInt(b.id.split('_')[1]) : 0;
                    return timeB - timeA;
                }).map(post => (
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
                            <p className="text-sm text-foreground/90 whitespace-pre-line">{post.content}</p>
                             {/* Comments Section */}
                            {(post.commentObjects && post.commentObjects.length > 0 || activeCommentPostId === post.id) && (
                              <div className="mt-4 pt-4 border-t">
                                <h4 className="text-sm font-semibold mb-2 text-foreground">Comments ({post.comments})</h4>
                                {post.commentObjects.slice().sort((a,b) => { // Sort comments by time in ID
                                     const timeA = a.id.split('_')[1] ? parseInt(a.id.split('_')[1]) : 0;
                                     const timeB = b.id.split('_')[1] ? parseInt(b.id.split('_')[1]) : 0;
                                     return timeB - timeA;
                                }).map(comment => (
                                  <div key={comment.id} className="flex items-start gap-2.5 mb-3 last:mb-0">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.userAvatar} alt={comment.userName} data-ai-hint={comment.userAvatarHint} />
                                      <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow p-3 rounded-md bg-muted/50">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-foreground">{comment.userName}</p>
                                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                                      </div>
                                      <p className="text-xs text-foreground/80 mt-0.5">{comment.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {activeCommentPostId === post.id && (
                              <div className="mt-3 flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "User"} data-ai-hint="user avatar" />
                                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                                </Avatar>
                                <Input
                                  type="text"
                                  placeholder="Write a comment..."
                                  value={newCommentText}
                                  onChange={(e) => setNewCommentText(e.target.value)}
                                  className="flex-grow h-9 text-xs"
                                  onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey && !isPostingComment) { e.preventDefault(); handlePostNewComment(post.id);}}}
                                  disabled={isPostingComment}
                                />
                                <Button 
                                  size="icon" 
                                  className="h-9 w-9" 
                                  onClick={() => handlePostNewComment(post.id)} 
                                  disabled={!newCommentText.trim() || isPostingComment}
                                >
                                  {isPostingComment ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                  <span className="sr-only">Post Comment</span>
                                </Button>
                              </div>
                            )}
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
                                    onClick={() => handleToggleCommentInput(post.id)}
                                >
                                    <MessageCircleIcon className="h-4 w-4" /> {post.comments} Comment{post.comments !== 1 ? 's' : ''}
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs h-auto p-1 text-muted-foreground hover:text-primary" onClick={() => handleViewPost(post.id)}>
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

        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">Community Members ({community.members})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {community.members > 0 ? (
                        Array.from({ length: Math.min(community.members, 5) }).map((_, index) => ( 
                            <div key={`member-placeholder-${index}`} className="flex items-center gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://placehold.co/40x40.png?text=M${index+1}`} alt={`Member ${index+1}`} data-ai-hint="user avatar" />
                                    <AvatarFallback>{`M${index+1}`}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-foreground">{`Community Member ${index+1}`}</span>
                            </div>
                        ))
                    ) : (
                         <p className="text-sm text-muted-foreground">No members yet.</p>
                    )}
                    {community.members > 5 && (
                        <Button variant="link" className="p-0 h-auto text-sm w-full justify-start mt-2 text-primary hover:text-primary/80" onClick={handleViewAllMembers}>
                            View all {community.members} members
                        </Button>
                    )}
                </CardContent>
            </Card>

             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">About this Community</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                    <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                            <strong className="block text-muted-foreground">Founded</strong>
                            <span className="text-foreground">{community.foundedDate}</span>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-muted-foreground">Rules</strong>
                            <p className="text-foreground whitespace-pre-line">{community.rules}</p>
                        </div>
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

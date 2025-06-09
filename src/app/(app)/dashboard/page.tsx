
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Removed Sheet related imports as they are no longer used
import {
  ArrowBigUp,
  Briefcase,
  ChevronDown,
  FilePlus2,
  Globe,
  Image as ImageIcon,
  Link as LinkIcon,
  List,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
  Loader2,
  Bookmark, 
  Flag, 
  UserPlus, 
  UserCheck,
  // Removed LayoutGrid, PlusCircle, FlaskConical, Lightbulb, HeartHandshake, HeartPulse, Baby as they are no longer used
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { moderateContent, type ModerateContentOutput } from "@/ai/flows/ai-moderation";
import { useToast } from "@/hooks/use-toast";


// Removed SpaceItem interface as it's no longer used

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    avatarHint: string;
    role: string;
    isVerified?: boolean;
  };
  updatedTime: string;
  question?: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  tags?: string[];
  upvotes: number;
  comments: number;
  shares: number;
  isUpvotedByUser?: boolean;
  isReported?: boolean;
  isSaved?: boolean;
  isUserFollowed?: boolean; 
}

interface AdItem {
  id: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  linkUrl: string;
  advertiser: string;
}

const initialFeedItems: FeedItem[] = [
  {
    id: "1",
    user: {
      name: "Dr. Emily Carter",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NDk0OTI1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      avatarHint: "doctor portrait",
      role: "Cardiologist, Lead Researcher",
      isVerified: true,
    },
    updatedTime: "5h ago",
    question: "Latest advancements in hypertension treatment?",
    content:
      "Recent studies show promising results with new combination therapies and personalized lifestyle intervention programs. One particular study highlighted the impact of personalized medicine approach in managing high blood pressure effectively, leading to better patient outcomes and fewer side effects compared to traditional methods. Further research is ongoing to explore long-term benefits.",
    imageUrl: "https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtZWRpY2FsJTIwcmVzZWFyY2h8ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "medical research",
    tags: ["Hypertension", "Cardiology", "Research"],
    upvotes: 1256,
    comments: 78,
    shares: 45,
    isUpvotedByUser: false,
    isReported: false,
    isSaved: false,
    isUserFollowed: false,
  },
  {
    id: "2",
    user: {
      name: "John Smith",
      avatarUrl: "https://images.unsplash.com/photo-1597764690472-ec054f1c8637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwYXRpZW50JTIwYWR2b2NhdGV8ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      avatarHint: "patient advocate",
      role: "Patient Advocate, Diabetes Educator",
    },
    updatedTime: "1d ago",
    content:
      "Sharing my journey managing Type 2 Diabetes. It's been a rollercoaster, but finding a supportive community and the right diet plan has made a huge difference. Consistency with glucose monitoring and regular exercise are key. Happy to answer questions or share tips! #diabetes #healthjourney #communitysupport",
    tags: ["Diabetes", "Patient Story", "Wellness"],
    upvotes: 850,
    comments: 123,
    shares: 22,
    isUpvotedByUser: true,
    isReported: false,
    isSaved: true,
    isUserFollowed: true,
  },
  {
    id: "3",
    user: {
      name: "Wellness Hub",
      avatarUrl: "https://images.unsplash.com/photo-1642793891075-4f53583a2079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx3ZWxsbmVzcyUyMGxvZ298ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      avatarHint: "wellness logo",
      role: "Community Space",
      isVerified: true,
    },
    updatedTime: "3d ago",
    question: "Best practices for post-operative care at home?",
    content:
      "Recovering from surgery requires careful attention to medication schedules, wound care, and mobility exercises. We've compiled a list of essential tips from healthcare professionals to ensure a smooth recovery process. Remember to follow your doctor's specific instructions. Read more on our blog...",
    imageUrl: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxob21lJTIwcmVjb3Zlcnl8ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "home recovery",
    tags: ["PostOp", "Recovery", "Healthcare"],
    upvotes: 930,
    comments: 55,
    shares: 30,
    isUpvotedByUser: false,
    isReported: false,
    isSaved: false,
    isUserFollowed: false,
  },
];

// Removed 'spaces' array as it's no longer used

const ads: AdItem[] = [
  {
    id: "ad1",
    title: "Advanced Health Monitoring Wearable - Track Vitals 24/7",
    imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxoZWFsdGglMjB3ZWFyYWJsZXxlbnwwfHx8fDE3NDk0OTI1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "health wearable",
    linkUrl: "#",
    advertiser: "TechCare Inc.",
  },
  {
    id: "ad2",
    title: "Join Our Online Yoga & Meditation Classes for Mind-Body Balance",
    imageUrl: "https://images.unsplash.com/photo-1608405059861-b21a68ae76a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx5b2dhJTIwbWVkaXRhdGlvbnxlbnwwfHx8fDE3NDk0OTI1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "yoga meditation",
    linkUrl: "#",
    advertiser: "SereneMind Studio",
  },
];

// Removed DashboardSpacesSidebarContent component as it's no longer used by this page


export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postText, setPostText] = useState("");
  const [activePostType, setActivePostType] = useState("share");
  const [displayedFeedItems, setDisplayedFeedItems] = useState<FeedItem[]>(initialFeedItems);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  // Removed isMobileSpacesOpen state as it's no longer used

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    setIsSubmittingPost(true);
    try {
      const moderationResult: ModerateContentOutput = await moderateContent({ text: postText });

      if (moderationResult.isHarmful) {
        toast({
          variant: "destructive",
          title: "Content Moderation",
          description: moderationResult.reason || "This content violates community guidelines. Please revise.",
        });
      } else {
        const newPost: FeedItem = {
          id: Date.now().toString(),
          user: {
            name: user?.displayName || "Anonymous User",
            avatarUrl: user?.photoURL || `https://images.unsplash.com/photo-1614383686435-dd60cf22aae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx1c2VyJTIwYXZhdGFyJTIwc21hbGx8ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080`,
            avatarHint: "user avatar small",
            role: "Community Member", 
          },
          updatedTime: "Just now",
          content: postText,
          question: activePostType === "ask" ? postText : undefined,
          tags: ["New", "Discussion"], 
          upvotes: 0,
          comments: 0,
          shares: 0,
          isUpvotedByUser: false,
          isReported: false,
          isSaved: false,
          isUserFollowed: false,
        };

        setDisplayedFeedItems(prevItems => [newPost, ...prevItems]);
        setPostText("");
        toast({
          title: "Post Created!",
          description: activePostType === "share" ? "Your update has been shared." : "Your question has been posted.",
        });
      }
    } catch (error) {
      console.error("Error during content moderation or post submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not submit post. Please try again.",
      });
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const handleHidePost = (postId: string) => {
    setDisplayedFeedItems(prevItems => prevItems.filter(item => item.id !== postId));
     toast({
        description: "Post hidden from your feed.",
      });
  };

  const handleUpvote = (postId: string) => {
    setDisplayedFeedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === postId) {
          const newUpvotedState = !item.isUpvotedByUser;
          return {
            ...item,
            isUpvotedByUser: newUpvotedState,
            upvotes: newUpvotedState ? item.upvotes + 1 : item.upvotes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleCommentClick = (postId: string) => {
    setDisplayedFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === postId ? { ...item, comments: item.comments + 1 } : item
      )
    );
    toast({
      description: "Comment interaction simulated. Full comment functionality is not yet implemented.",
    });
  };

  const handleShareClick = (postId: string) => {
     setDisplayedFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === postId ? { ...item, shares: item.shares + 1 } : item
      )
    );
    toast({
      description: "Post link copied to clipboard (simulation).",
    });
  };

  const handleReportPost = (postId: string) => {
    setDisplayedFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === postId ? { ...item, isReported: true } : item
      )
    );
    toast({
      title: "Post Reported",
      description: "Thank you for your feedback. This post will be reviewed.",
    });
  };

  const handleToggleSavePost = (postId: string) => {
    setDisplayedFeedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === postId) {
          const newSavedState = !item.isSaved;
          toast({
            description: newSavedState ? "Post saved!" : "Post unsaved.",
          });
          return { ...item, isSaved: newSavedState };
        }
        return item;
      })
    );
  };

  const handleToggleFollowUser = (feedItemId: string) => {
    setDisplayedFeedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === feedItemId) {
          const newFollowedState = !item.isUserFollowed;
          toast({
            description: newFollowedState ? `You are now following ${item.user.name}.` : `You unfollowed ${item.user.name}.`,
          });
          return { ...item, isUserFollowed: newFollowedState };
        }
        return item;
      })
    );
  };


  return (
    <div className="min-h-screen">
      {/* Mobile Sheet Trigger for Spaces - REMOVED */}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 xl:gap-x-8">
        <main className="lg:col-span-12 xl:col-span-9 py-6 space-y-6 px-4 lg:px-0">
          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-3 pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage 
                    src={user?.photoURL?.includes("placehold.co") ? "https://images.unsplash.com/photo-1614383686435-dd60cf22aae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx1c2VyJTIwYXZhdGFyJTIwc21hbGx8ZW58MHx8fHwxNzQ5NDkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080" : user?.photoURL ?? undefined} 
                    alt={user?.displayName ?? "User"} 
                    data-ai-hint="user avatar small"
                  />
                  <AvatarFallback className="text-lg">{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                <p className="font-medium text-foreground">{user?.displayName || "Create a Post"}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="share" className="w-full" onValueChange={setActivePostType}>
                <TabsList className="grid w-full grid-cols-2 mb-3 h-9">
                  <TabsTrigger value="share" className="text-xs">Share Update</TabsTrigger>
                  <TabsTrigger value="ask" className="text-xs">Ask Question</TabsTrigger>
                </TabsList>
                <form onSubmit={handlePostSubmit}>
                  <Textarea
                    placeholder={activePostType === "share" ? "What's on your mind? Share an update, experience, or insight..." : "What health-related question do you have for the community? Be specific."}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    rows={3}
                    className="w-full text-sm border-border/70 focus:ring-primary/50"
                    disabled={isSubmittingPost}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8" disabled={isSubmittingPost}>
                            <ImageIcon className="h-4 w-4"/>
                            <span className="sr-only">Add image</span>
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8" disabled={isSubmittingPost}>
                            <List className="h-4 w-4"/>
                            <span className="sr-only">Add tags</span>
                        </Button>
                    </div>
                    <Button type="submit" disabled={!postText.trim() || isSubmittingPost} className="min-w-[100px] h-9 text-xs">
                      {isSubmittingPost ? (
                        <>
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post"
                      )}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          {displayedFeedItems.map((item) => (
            <Card key={item.id} className={cn("shadow-md border-border/50", item.isReported && "opacity-50 pointer-events-none")}>
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.user.avatarUrl} alt={item.user.name} data-ai-hint={item.user.avatarHint} />
                      <AvatarFallback>{getInitials(item.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5">
                          <Link href="#" className="font-semibold text-sm hover:underline text-foreground">{item.user.name}</Link>
                          {item.user.isVerified && <ShieldCheck className="h-4 w-4 text-primary fill-primary/20" title="Verified Medical Professional"/>}
                          <span className="text-xs text-muted-foreground">&bull;</span>
                          <Button 
                            variant={item.isUserFollowed ? "secondary" : "ghost"} 
                            size="sm" 
                            className={cn(
                              "p-0 h-auto text-xs rounded-md", 
                              item.isUserFollowed ? "px-2 py-0.5 border border-primary/50 text-primary" : "text-primary hover:text-primary/80 hover:bg-primary/10"
                            )}
                            onClick={() => handleToggleFollowUser(item.id)}
                          >
                            {item.isUserFollowed ? (
                              <UserCheck className="mr-1 h-3 w-3" /> 
                            ) : (
                              <UserPlus className="mr-1 h-3 w-3" />
                            )}
                            {item.isUserFollowed ? "Following" : "Follow"}
                          </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.user.role} &bull; {item.updatedTime}
                      </p>
                    </div>
                  </div>
                  {!item.isReported && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent/50" onClick={() => handleHidePost(item.id)}>
                      <X className="h-4 w-4" />
                       <span className="sr-only">Hide post</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                {item.question && <h3 className="text-md font-semibold mb-1.5 text-foreground">{item.question}</h3>}
                <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                  {item.content}
                </p>
                {item.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-border/50 aspect-video relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.question || "Feed image"}
                      fill
                      style={{objectFit: 'cover'}}
                      className="bg-muted"
                      data-ai-hint={item.imageHint}
                    />
                  </div>
                )}
                {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full cursor-pointer hover:bg-secondary/80">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 h-auto text-xs",
                      item.isUpvotedByUser ? "text-primary hover:text-primary/90" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                    onClick={() => handleUpvote(item.id)}
                  >
                    <ArrowBigUp className={cn("h-4 w-4", item.isUpvotedByUser ? "fill-primary" : "")} />
                    {item.upvotes > 1000 ? (item.upvotes/1000).toFixed(1) + 'k' : item.upvotes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:bg-primary/10 px-2 py-1 h-auto text-xs"
                    onClick={() => handleCommentClick(item.id)}
                  >
                    <MessageCircle className="h-4 w-4" /> {item.comments}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:bg-primary/10 px-2 py-1 h-auto text-xs"
                    onClick={() => handleShareClick(item.id)}
                  >
                    <Repeat className="h-4 w-4" /> {item.shares}
                  </Button>
                </div>
                 {!item.isReported && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-accent/50 hover:text-primary">
                        <MoreHorizontal className="h-4 w-4" />
                         <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                       <DropdownMenuItem onClick={() => handleToggleSavePost(item.id)}>
                         {item.isSaved ? <Bookmark className="mr-2 h-4 w-4 fill-current text-primary" /> : <Bookmark className="mr-2 h-4 w-4" />}
                        {item.isSaved ? "Unsave post" : "Save post"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleReportPost(item.id)}>
                        <Flag className="mr-2 h-4 w-4" /> Report post
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleHidePost(item.id)}>
                        <X className="mr-2 h-4 w-4" /> Not interested
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardFooter>
            </Card>
          ))}
        </main>

        <aside className="hidden xl:block xl:col-span-3 sticky top-16 h-[calc(100vh-4rem)]">
           <div className="h-full overflow-y-auto py-6 space-y-6">
            {ads.map((ad) => (
              <Card key={ad.id} className="shadow-md overflow-hidden border-border/50">
                {ad.imageUrl && (
                    <div className="aspect-[3/2] relative bg-muted">
                        <Image src={ad.imageUrl} alt={ad.title} fill style={{objectFit: 'cover'}} data-ai-hint={ad.imageHint}/>
                    </div>
                )}
                <CardContent className="p-3">
                    <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline block text-foreground">
                        {ad.title}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{ad.advertiser}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="shadow-none border-none bg-transparent mt-4">
                <CardContent className="p-2 text-xs text-muted-foreground text-center">
                    Advertisement
                </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}


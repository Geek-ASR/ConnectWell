
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
  ArrowBigUp,
  Briefcase,
  ChevronDown,
  FilePlus2,
  Globe,
  Image as ImageIcon,
  Lightbulb,
  Link as LinkIcon,
  List,
  MessageCircle,
  MoreHorizontal,
  PlusCircle,
  Repeat,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface SpaceItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    avatarHint: string;
    role: string;
  };
  updatedTime: string;
  question?: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  upvotes: number;
  comments: number;
  shares: number;
  isUpvotedByUser?: boolean; // Added for upvote functionality
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
      avatarUrl: "https://placehold.co/40x40.png?text=EC",
      avatarHint: "doctor portrait",
      role: "Cardiologist, Lead Researcher",
    },
    updatedTime: "5h ago",
    question: "What are the latest advancements in treating hypertension?",
    content:
      "Recent studies show promising results with new combination therapies and lifestyle intervention programs. One particular study highlighted the impact of personalized medicine... (more)",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "medical research",
    upvotes: 1200,
    comments: 78,
    shares: 45,
    isUpvotedByUser: false,
  },
  {
    id: "2",
    user: {
      name: "John Smith",
      avatarUrl: "https://placehold.co/40x40.png?text=JS",
      avatarHint: "patient advocate",
      role: "Patient Advocate, Diabetes Educator",
    },
    updatedTime: "1d ago",
    content:
      "Sharing my journey managing Type 2 Diabetes. It's been a rollercoaster, but finding a supportive community and the right diet plan has made a huge difference. Happy to answer questions or share tips! #diabetes #healthjourney",
    upvotes: 850,
    comments: 123,
    shares: 22,
    isUpvotedByUser: true, // Example of an already upvoted post
  },
  {
    id: "3",
    user: {
      name: "Wellness Hub",
      avatarUrl: "https://placehold.co/40x40.png?text=WH",
      avatarHint: "wellness logo",
      role: "Community Space",
    },
    updatedTime: "3d ago",
    question: "Best practices for post-operative care at home?",
    content:
      "Recovering from surgery requires careful attention to medication, wound care, and mobility. We've compiled a list of essential tips from healthcare professionals to ensure a smooth recovery process. Read more on our blog...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "home recovery",
    upvotes: 930,
    comments: 55,
    shares: 30,
    isUpvotedByUser: false,
  },
];


export default function DashboardPage() {
  const { user } = useAuth();
  const [postText, setPostText] = useState("");
  const [activePostType, setActivePostType] = useState("share");
  const [displayedFeedItems, setDisplayedFeedItems] = useState<FeedItem[]>(initialFeedItems);

  const spaces: SpaceItem[] = [
    { name: "Medical Research Today", icon: Briefcase, href: "#" },
    { name: "Global Health Initiatives", icon: Globe, href: "#" },
    { name: "Chronic Illness Support", icon: Users, href: "#" },
    { name: "Mental Wellness Journeys", icon: Lightbulb, href: "#" },
    { name: "Fitness & Recovery", icon: TrendingUp, href: "#" },
    { name: "Pediatric Health", icon: Star, href: "#" },
  ];

  const ads: AdItem[] = [
    {
      id: "ad1",
      title: "Advanced Health Monitoring Wearable",
      imageUrl: "https://placehold.co/300x200.png",
      imageHint: "health wearable",
      linkUrl: "#",
      advertiser: "TechCare Inc.",
    },
    {
      id: "ad2",
      title: "Join Our Online Yoga & Meditation Classes",
      imageUrl: "https://placehold.co/300x200.png",
      imageHint: "yoga meditation",
      linkUrl: "#",
      advertiser: "SereneMind Studio",
    },
  ];

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    console.log({
      type: activePostType,
      content: postText,
      user: user?.displayName,
    });
    setPostText("");
  };

  const handleHidePost = (postId: string) => {
    setDisplayedFeedItems(prevItems => prevItems.filter(item => item.id !== postId));
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


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 xl:gap-x-8 min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 py-6 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <Card className="shadow-none border-none bg-transparent">
          <CardContent className="p-0 space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <PlusCircle className="mr-2 h-5 w-5" /> Create Space
            </Button>
            {spaces.map((space) => (
              <Button
                key={space.name}
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href={space.href}>
                  <space.icon className="mr-2 h-5 w-5" />
                  {space.name}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Separator />
        <div className="space-y-1 px-2 text-xs text-muted-foreground">
          <Link href="#" className="hover:underline block">About</Link>
          <Link href="#" className="hover:underline block">Careers</Link>
          <Link href="#" className="hover:underline block">Terms</Link>
          <Link href="#" className="hover:underline block">Privacy</Link>
          <Link href="#" className="hover:underline block">Acceptable Use</Link>
          <Link href="#" className="hover:underline block">Your Ad Choices</Link>
          <Link href="#" className="hover:underline block">Grievance Officer</Link>
        </div>
      </aside>

      {/* Main Content Feed */}
      <main className="lg:col-span-9 xl:col-span-7 py-6 space-y-6">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} data-ai-hint="user avatar small"/>
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
              <p className="font-medium text-foreground">Create Post</p>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="share" className="w-full" onValueChange={setActivePostType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="share">Share Update</TabsTrigger>
                <TabsTrigger value="ask">Ask Question</TabsTrigger>
              </TabsList>
              <form onSubmit={handlePostSubmit}>
                <TabsContent value="share" className="mt-4">
                  <Textarea
                    placeholder="What's on your mind? Share an update..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    rows={4}
                    className="w-full text-sm"
                  />
                </TabsContent>
                <TabsContent value="ask" className="mt-4">
                  <Textarea
                    placeholder="What question do you have for the community? Be specific."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    rows={4}
                    className="w-full text-sm"
                  />
                </TabsContent>
                <div className="flex justify-end items-center mt-4 gap-2">
                  <Button type="submit" disabled={!postText.trim()}>Post</Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        {displayedFeedItems.map((item) => (
          <Card key={item.id} className="shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.user.avatarUrl} alt={item.user.name} data-ai-hint={item.user.avatarHint} />
                    <AvatarFallback>{getInitials(item.user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                        <Link href="#" className="font-semibold text-sm hover:underline">{item.user.name}</Link>
                        <Button variant="link" size="sm" className="text-primary p-0 h-auto text-xs">Follow</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.user.role} &bull; Updated {item.updatedTime}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleHidePost(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {item.question && <h3 className="text-lg font-semibold mb-2">{item.question}</h3>}
              <p className="text-sm text-foreground/90 whitespace-pre-line">
                {item.content}
              </p>
              {item.imageUrl && (
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src={item.imageUrl}
                    alt={item.question || "Feed image"}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={item.imageHint}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1.5 hover:bg-accent/50",
                    item.isUpvotedByUser ? "text-primary hover:text-primary/90" : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={() => handleUpvote(item.id)}
                >
                  <ArrowBigUp className={cn("h-5 w-5", item.isUpvotedByUser ? "fill-primary" : "")} /> {/* Optional: fill-primary requires icon to support fill */}
                  {item.upvotes > 1000 ? (item.upvotes/1000).toFixed(1) + 'k' : item.upvotes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground hover:bg-accent/50 hover:text-primary">
                  <MessageCircle className="h-5 w-5" /> {item.comments}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground hover:bg-accent/50 hover:text-primary">
                  <Repeat className="h-5 w-5" /> {item.shares}
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent/50 hover:text-primary">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:block xl:col-span-3 py-6 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        {ads.map((ad) => (
           <Card key={ad.id} className="shadow-md overflow-hidden">
            {ad.imageUrl && (
                <Image src={ad.imageUrl} alt={ad.title} width={300} height={200} className="w-full h-auto object-cover" data-ai-hint={ad.imageHint}/>
            )}
            <CardContent className="p-3">
                <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline block">
                    {ad.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{ad.advertiser}</p>
            </CardContent>
           </Card>
        ))}
         <Card className="shadow-none border-none bg-transparent mt-4">
            <CardContent className="p-2 text-xs text-muted-foreground">
                Advertisement
            </CardContent>
        </Card>
      </aside>
    </div>
  );
}

    
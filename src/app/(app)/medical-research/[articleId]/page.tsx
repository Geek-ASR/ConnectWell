
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CalendarDays, FileTextIcon, Loader2, ThumbsUp, MessageCircleMore, Flag, Send } from 'lucide-react';
import { getResearchArticleById, type ResearchArticle, type Comment } from '@/lib/data/research-data';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function MedicalResearchArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [article, setArticle] = useState<ResearchArticle | null | undefined>(undefined); 
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const articleId = typeof params.articleId === 'string' ? params.articleId : null;

  useEffect(() => {
    if (articleId) {
      setLoading(true);
      const foundArticle = getResearchArticleById(articleId);
      setArticle(foundArticle);
      setLoading(false);
    } else {
      setArticle(null); 
      setLoading(false);
    }
  }, [articleId]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handlePostComment = () => {
    if (!article || !user || !newCommentText.trim()) {
      toast({ title: "Cannot post comment", description: "Please write something or ensure you are logged in.", variant: "destructive"});
      return;
    }
    setIsPostingComment(true);
    const newCommentToAdd: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: user.uid,
      userName: user.displayName || "Anonymous User",
      userAvatar: user.photoURL || `https://placehold.co/40x40.png?text=${getInitials(user.displayName)}`,
      userAvatarHint: "user avatar",
      text: newCommentText.trim(),
      time: "Just now",
      likes: 0,
      isLikedByUser: false,
    };

    // Simulate API call & update
    setTimeout(() => {
      setArticle(prevArticle => {
        if (!prevArticle) return null;
        const updatedComments = [newCommentToAdd, ...(prevArticle.comments || [])];
        return { ...prevArticle, comments: updatedComments };
      });
      setNewCommentText("");
      toast({ title: "Comment Posted!", description: "Your comment has been added to this article." });
      setIsPostingComment(false);
    }, 500);
  };

  const handleLikeComment = (commentId: string) => {
    if (!article) return;
    setArticle(prevArticle => {
      if (!prevArticle) return null;
      return {
        ...prevArticle,
        comments: (prevArticle.comments || []).map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.isLikedByUser ? comment.likes - 1 : comment.likes + 1, isLikedByUser: !comment.isLikedByUser }
            : comment
        ),
      };
    });
  };

  const handleReplyComment = (commentId: string) => {
    toast({ title: "Reply", description: `Replying to comment ${commentId} (feature coming soon).` });
  };

  const handleReportComment = (commentId: string) => {
    toast({ title: "Report", description: `Comment ${commentId} reported (feature coming soon).`, variant: "default" });
  };


  if (loading || article === undefined) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Card className="shadow-lg p-6">
          <CardContent className="pt-6 flex items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-2xl text-muted-foreground">Loading research article...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 my-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/medical-research">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Medical Research</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-destructive">Research Article Not Found</h1>
        </div>
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">The research article you are looking for does not exist or may have been moved.</p>
            <Button asChild className="mt-4">
              <Link href="/medical-research">Go to Medical Research Hub</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/medical-research">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Medical Research Hub
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl overflow-hidden">
        {article.imageUrl ? (
          <div className="relative h-64 md:h-80 bg-muted">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={article.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50">
                {article.title}
              </h2>
              <div className="text-sm mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-gray-300">
                <div className="flex items-center">
                  <FileTextIcon className="mr-1.5 h-4 w-4" />
                  <span>Source: {article.source}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  <span>Published: {article.date}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CardHeader className="p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {article.title}
            </CardTitle>
            <div className="text-sm mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-muted-foreground">
              <div className="flex items-center">
                <FileTextIcon className="mr-1.5 h-4 w-4" />
                <span>Source: {article.source}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                <span>Published: {article.date}</span>
              </div>
            </div>
          </CardHeader>
        )}

        <CardContent className="p-6 space-y-4">
          <CardDescription className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
            {article.summary}
          </CardDescription>
          <p className="text-sm text-muted-foreground italic">
            Note: This is a summary of the research article. For full details, please refer to the original publication. Comments below are user opinions and not part of the original article.
          </p>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Comments ({article.comments?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment Form */}
          {user && (
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 mt-1">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} data-ai-hint="user avatar" />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow space-y-2">
                <Textarea
                  placeholder="Share your thoughts on this article..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  rows={3}
                  className="text-sm"
                  disabled={isPostingComment}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handlePostComment} 
                    disabled={!newCommentText.trim() || isPostingComment}
                    size="sm"
                  >
                    {isPostingComment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    {isPostingComment ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <p className="text-sm text-muted-foreground text-center">
              <Link href="/login" className="text-primary hover:underline">Log in</Link> or <Link href="/signup" className="text-primary hover:underline">sign up</Link> to post a comment.
            </p>
          )}

          <Separator />

          {/* Display Comments */}
          {(article.comments && article.comments.length > 0) ? (
            <div className="space-y-5">
              {article.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} data-ai-hint={comment.userAvatarHint} />
                    <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow p-3.5 rounded-lg bg-muted/60 border border-border/50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-foreground">{comment.userName}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{comment.text}</p>
                    <div className="mt-2.5 pt-2 border-t border-border/70 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs" 
                        className={cn(
                          "flex items-center gap-1 text-xs h-auto p-1",
                          comment.isLikedByUser ? "text-primary hover:text-primary/90" : "text-muted-foreground hover:text-primary"
                        )}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className={cn("h-3.5 w-3.5", comment.isLikedByUser ? "fill-primary" : "")} />
                        {comment.likes}
                      </Button>
                       <Button 
                        variant="ghost" 
                        size="xs" 
                        className="flex items-center gap-1 text-xs h-auto p-1 text-muted-foreground hover:text-primary"
                        onClick={() => handleReplyComment(comment.id)}
                      >
                        <MessageCircleMore className="h-3.5 w-3.5" /> Reply
                      </Button>
                       <Button 
                        variant="ghost" 
                        size="xs" 
                        className="flex items-center gap-1 text-xs h-auto p-1 text-muted-foreground hover:text-destructive"
                        onClick={() => handleReportComment(comment.id)}
                      >
                        <Flag className="h-3.5 w-3.5" /> Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to share your thoughts!</p>
          )}
        </CardContent>
        <CardFooter>
             <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" onClick={() => router.back()}>
                Go Back to Hub
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

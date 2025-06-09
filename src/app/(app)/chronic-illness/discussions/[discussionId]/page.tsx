
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getFeaturedDiscussionById, type FeaturedDiscussionItem } from '@/lib/data/chronic-illness-data';
import { cn } from '@/lib/utils';

export default function ChronicIllnessDiscussionPage() {
  const params = useParams();
  const router = useRouter();
  const [discussion, setDiscussion] = useState<FeaturedDiscussionItem | null | undefined>(undefined); // undefined for loading, null for not found
  const [loading, setLoading] = useState(true);

  const discussionId = typeof params.discussionId === 'string' ? params.discussionId : null;

  useEffect(() => {
    if (discussionId) {
      setLoading(true);
      const foundDiscussion = getFeaturedDiscussionById(discussionId);
      setDiscussion(foundDiscussion);
      setLoading(false);
    } else {
      setDiscussion(null); // No ID, so not found
      setLoading(false);
    }
  }, [discussionId]);

  if (loading || discussion === undefined) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Card className="shadow-lg p-6">
          <CardContent className="pt-6 flex items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-2xl text-muted-foreground">Loading discussion...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 my-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/chronic-illness">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Chronic Illness Hub</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-destructive">Discussion Not Found</h1>
        </div>
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">The discussion you are looking for does not exist or may have been moved.</p>
            <Button asChild className="mt-4">
              <Link href="/chronic-illness">Go to Chronic Illness Hub</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const DiscussionIcon = discussion.icon;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/chronic-illness">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chronic Illness Hub
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl overflow-hidden">
        {discussion.imageUrl && (
          <div className="relative h-64 md:h-80 bg-muted">
            <Image
              src={discussion.imageUrl}
              alt={discussion.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={discussion.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                {DiscussionIcon && <DiscussionIcon className="h-5 w-5" />}
                <span>{discussion.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50">
                {discussion.title}
              </h2>
            </div>
          </div>
        )}
        
        {!discussion.imageUrl && (
            <CardHeader className="p-6">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    {DiscussionIcon && <DiscussionIcon className="h-5 w-5 text-primary" />}
                    <span>{discussion.category}</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                {discussion.title}
                </CardTitle>
            </CardHeader>
        )}

        <CardContent className={cn("p-6 space-y-4", discussion.imageUrl && "pt-6")}>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
            {discussion.longSummary || discussion.summary}
          </p>
          {discussion.longSummary && discussion.summary !== discussion.longSummary && (
            <p className="text-sm text-muted-foreground italic">
              Initial summary: {discussion.summary}
            </p>
          )}
        </CardContent>
        <CardFooter>
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" onClick={() => router.back()}>
                Go Back
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

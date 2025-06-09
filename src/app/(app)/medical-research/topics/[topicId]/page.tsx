
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getTrendingTopicById, type TrendingTopic } from '@/lib/data/research-data';
import { cn } from '@/lib/utils';

export default function TrendingTopicPage() {
  const params = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<TrendingTopic | null | undefined>(undefined); // undefined for loading, null for not found
  const [loading, setLoading] = useState(true);

  const topicId = typeof params.topicId === 'string' ? params.topicId : null;

  useEffect(() => {
    if (topicId) {
      setLoading(true);
      const foundTopic = getTrendingTopicById(topicId);
      setTopic(foundTopic);
      setLoading(false);
    } else {
      setTopic(null); // No ID, so not found
      setLoading(false);
    }
  }, [topicId]);

  if (loading || topic === undefined) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Card className="shadow-lg p-6">
          <CardContent className="pt-6 flex items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-2xl text-muted-foreground">Loading topic details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 my-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/medical-research">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Medical Research Hub</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-destructive">Topic Not Found</h1>
        </div>
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">The topic you are looking for does not exist or may have been moved.</p>
            <Button asChild className="mt-4">
              <Link href="/medical-research">Go to Medical Research Hub</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TopicIconComponent = topic.icon;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/medical-research">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Medical Research Hub
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="p-6 bg-muted/30 border-b">
          <div className="flex items-center gap-4 mb-2">
            <TopicIconComponent className="h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold text-foreground">
              {topic.name}
            </CardTitle>
          </div>
          <CardDescription className="text-md text-muted-foreground italic">
            Explore insights and advancements related to {topic.name.toLowerCase()}.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
            {topic.details}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

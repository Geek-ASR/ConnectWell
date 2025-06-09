
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2, CalendarDays, Edit2, User } from 'lucide-react';
import { getTrendingTopicById, type TrendingTopic } from '@/lib/data/research-data';
import { cn } from '@/lib/utils';

export default function TrendingTopicPage() {
  const params = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<TrendingTopic | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  const topicId = typeof params.topicId === 'string' ? params.topicId : null;

  useEffect(() => {
    if (topicId) {
      setLoading(true);
      const foundTopic = getTrendingTopicById(topicId);
      setTopic(foundTopic);
      setLoading(false);
    } else {
      setTopic(null); 
      setLoading(false);
    }
    setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
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
      <div className="space-y-8 max-w-4xl mx-auto">
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

  // const TopicIconComponent = topic.icon; // Icon might not be used in this newspaper layout

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
        <div className="relative w-full h-64 md:h-80 bg-muted">
            <Image
              src="https://placehold.co/1200x500.png" 
              alt={`Image related to ${topic.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="medical research technology abstract"
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
        
        <CardHeader className="p-6 md:p-8">
          <CardDescription className="text-sm text-primary font-semibold tracking-wider uppercase mb-1">
            ConnectWell Topic Analysis
          </CardDescription>
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {topic.name}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-3">
            <div className="flex items-center">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
              Published: {currentDate}
            </div>
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5" />
              By: ConnectWell Research Team
            </div>
             {/* topic.icon could be placed here if desired, e.g. next to category or author */}
          </div>
        </CardHeader>
        
        <Separator className="mx-6 md:mx-8 w-auto" />

        <CardContent className="p-6 md:p-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-line"
            // Using prose classes for better article typography if available, otherwise fallback to manual styling
            // Ensure you have @tailwindcss/typography plugin if using prose classes
            // Fallback manual styling:
            // style={{ fontSize: '1.1rem', lineHeight: '1.7' }} 
          >
            {topic.details.split('\n\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

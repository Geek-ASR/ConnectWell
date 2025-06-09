
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, FileTextIcon, Loader2 } from 'lucide-react';
import { getResearchArticleById, type ResearchArticle } from '@/lib/data/research-data';
import { cn } from '@/lib/utils'; // Added import for cn

export default function MedicalResearchArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<ResearchArticle | null | undefined>(undefined); // undefined for loading, null for not found
  const [loading, setLoading] = useState(true);

  const articleId = typeof params.articleId === 'string' ? params.articleId : null;

  useEffect(() => {
    if (articleId) {
      setLoading(true);
      const foundArticle = getResearchArticleById(articleId);
      setArticle(foundArticle);
      setLoading(false);
    } else {
      setArticle(null); // No ID, so not found
      setLoading(false);
    }
  }, [articleId]);

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
        {article.imageUrl && (
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
          </div>
        )}
        <CardHeader className={cn(article.imageUrl && "relative -mt-16 md:-mt-20 z-10 p-6")}>
          <CardTitle className={cn("text-2xl md:text-3xl font-bold", article.imageUrl && "text-white shadow-lg")}>
            {article.title}
          </CardTitle>
          <div className={cn("text-sm mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1", article.imageUrl ? "text-slate-200" : "text-muted-foreground")}>
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
        <CardContent className="p-6 space-y-4">
          <CardDescription className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
            {article.summary}
          </CardDescription>
          <p className="text-sm text-muted-foreground italic">
            Note: This is a summary of the research article. For full details, please refer to the original publication.
          </p>
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

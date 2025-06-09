
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, Lightbulb, Link as LinkIcon, Search, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredResearch, trendingTopicsData } from '@/lib/data/research-data'; // Import data

const helpfulResources = [
  { id: 'hr1', name: 'PubMed Central (PMC)', description: 'Free full-text archive of biomedical and life sciences literature.', link: 'https://www.ncbi.nlm.nih.gov/pmc/' },
  { id: 'hr2', name: 'ClinicalTrials.gov', description: 'Database of privately and publicly funded clinical studies conducted around the world.', link: 'https://clinicaltrials.gov/' },
  { id: 'hr3', name: 'World Health Organization (WHO) Research', description: 'Global health research initiatives and publications.', link: 'https://www.who.int/research-and-innovation' },
];

export default function MedicalResearchPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Medical Research Hub</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Explore the latest advancements, find clinical trials, and access valuable resources in the world of medical science.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search research papers, clinical trials, topics..."
              className="pl-10 w-full text-base h-12 rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Featured Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredResearch.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-primary/20 transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-48 bg-muted">
                <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} data-ai-hint={item.imageHint} />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-sm">{item.source} - {item.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                  <Link href={`/medical-research/${item.id}`}>Read More <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Trending Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopicsData.map((topic) => (
            <Card key={topic.id} className="shadow-md hover:shadow-accent/20 transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <topic.icon className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-md text-foreground mb-1">{topic.name}</h3>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/80">
                  <Link href={`/medical-research/topics/${topic.id}`}>Explore Topic</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Helpful Resources</h2>
        <div className="space-y-4">
          {helpfulResources.map((resource) => (
            <Card key={resource.id} className="shadow-md">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-md text-foreground">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                    Visit Site <LinkIcon className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}


"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Baby, BookOpen, ShieldCheck, Users, Link as LinkIcon, FileText, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredArticles = [
  {
    id: 'ph1',
    title: 'Understanding Your Newborn: A Guide for New Parents',
    category: 'Parenting Tips',
    summary: 'Navigate the first few months with your baby, covering feeding, sleeping, and common concerns.',
    imageUrl: 'https://images.unsplash.com/photo-1545177251-f63921bd2b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bmV3Ym9ybiUyMGJhYnklMjBwYXJlbnR8ZW58MHx8fHwxNzQ5NDkyMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'newborn baby parent',
    link: '#', // Placeholder link
    icon: Baby,
  },
  {
    id: 'ph2',
    title: 'Vaccination Schedules: Keeping Your Child Protected',
    category: 'Health Information',
    summary: 'An overview of recommended vaccination schedules and the importance of timely immunizations.',
    imageUrl: 'https://images.unsplash.com/photo-1576766125468-a5d48274c5b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjaGlsZCUyMHZhY2NpbmF0aW9uJTIwZG9jdG9yfGVufDB8fHx8MTc0OTQ5MjI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'child vaccination doctor',
    link: '#', // Placeholder link
    icon: ShieldCheck,
  },
];

const commonTopics = [
  { id: 'ct1', name: 'Fever Management in Children', icon: Activity, link: '#', description: 'Learn when to worry and how to provide comfort.' },
  { id: 'ct2', name: 'Nutrition for Toddlers', icon: FileText, link: '#', description: 'Tips for healthy eating habits for growing children.' },
  { id: 'ct3', name: 'Developmental Milestones (0-5 Years)', icon: BookOpen, link: '#', description: 'Track your child\'s growth and development.' },
];

const communityResources = [
  { id: 'cr1', name: 'ConnectWell Parenting Support Group', type: 'Community', icon: Users, link: '#' }, // Placeholder link
  { id: 'cr2', name: 'American Academy of Pediatrics', type: 'External Organization', icon: LinkIcon, link: 'https://www.healthychildren.org' },
  { id: 'cr3', name: 'KidsHealth from Nemours', type: 'External Resource', icon: LinkIcon, link: 'https://kidshealth.org/' },
];

export default function PediatricHealthPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/50 overflow-hidden">
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/50">
          <Image 
            src="https://images.unsplash.com/photo-1505155485412-30b3a45080ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjaGlsZHJlbiUyMHBsYXlpbmclMjB2aWJyYW50fGVufDB8fHx8MTc0OTQ5MjI4NHww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Happy children playing or abstract child-friendly design"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="children playing vibrant"
            priority
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center p-6">
            <Baby className="h-16 w-16 text-white/90 mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold text-white shadow-md">
              Pediatric Health & Parenting Hub
            </CardTitle>
            <CardDescription className="text-lg text-white/80 mt-2 max-w-2xl mx-auto">
              Resources, support, and information for your child's health and development journey.
            </CardDescription>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Featured Articles & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticles.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-primary/20 transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-48 bg-muted">
                <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} data-ai-hint={item.imageHint} />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span>{item.category}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                  <Link href={item.link}>Read More <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Common Topics & Concerns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonTopics.map((topic) => (
            <Card key={topic.id} className="shadow-md hover:shadow-accent/20 transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <topic.icon className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-md text-foreground mb-1">{topic.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 px-2 h-10 line-clamp-2">{topic.description}</p>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/80 mt-auto">
                  <Link href={topic.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Community & External Resources</h2>
        <div className="space-y-4">
          {communityResources.map((resource) => (
            <Card key={resource.id} className="shadow-md">
              <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <resource.icon className="h-7 w-7 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-md text-foreground">{resource.name}</h3>
                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full sm:w-auto shrink-0">
                  <Link href={resource.link} target={resource.type.includes('External') ? '_blank' : '_self'} rel="noopener noreferrer">
                    {resource.type === 'Community' ? 'Join Community' : 'Visit Site'}
                    {resource.type.includes('External') && <LinkIcon className="ml-1.5 h-3.5 w-3.5" />}
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


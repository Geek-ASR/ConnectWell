
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Headphones, Link as LinkIcon, MessageCircle, Sparkles, Users, Wind } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredContent = [
  {
    id: 'mw1',
    title: 'Understanding Anxiety: Symptoms and Strategies',
    category: 'Educational',
    summary: 'Learn about the common signs of anxiety and discover effective strategies to manage its impact on daily life.',
    imageUrl: 'https://images.unsplash.com/photo-1551845833-fbd9a311bd1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2FsbSUyMHBlcnNvbiUyMHRoaW5raW5nfGVufDB8fHx8MTc0OTQ5MjAzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'calm person thinking',
    link: '#',
    icon: Brain,
  },
  {
    id: 'mw2',
    title: 'The Power of Mindfulness in Stress Reduction',
    category: 'Practice',
    summary: 'Explore how mindfulness techniques can help reduce stress, improve focus, and enhance overall emotional balance.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzY2VuZXxlbnwwfHx8fDE3NDk0OTIwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'meditation peaceful scene',
    link: '#',
    icon: Wind,
  },
];

const mindfulnessPractices = [
  { id: 'mp1', name: '5-Minute Guided Breathing', icon: Headphones, link: '#', description: 'A short audio guide to center yourself.' },
  { id: 'mp2', name: 'Mindful Walking Exercise', icon: Wind, link: '#', description: 'Connect with your surroundings.' },
  { id: 'mp3', name: 'Body Scan Meditation', icon: Sparkles, link: '#', description: 'Increase awareness of your physical sensations.' },
];

const supportResources = [
  { id: 'sr1', name: 'ConnectWell Anxiety Support Community', type: 'Community', icon: Users, link: '/communities/3' }, // Assuming ID 3 is Mental Wellness
  { id: 'sr2', name: 'National Alliance on Mental Illness (NAMI)', type: 'External Resource', icon: LinkIcon, link: 'https://www.nami.org' },
  { id: 'sr3', name: 'Crisis Text Line', type: 'Hotline', icon: MessageCircle, link: 'https://www.crisistextline.org/' },
];

export default function MentalWellnessPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/50 overflow-hidden">
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-accent/70 via-primary/50 to-secondary/60">
          <Image 
            src="https://images.unsplash.com/photo-1690695896840-a2de90fee72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGNhbG0lMjBwZWFjZWZ1bHxlbnwwfHx8fDE3NDk0OTIwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Calming abstract background for mental wellness"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="abstract calm peaceful"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-6">
            <Brain className="h-16 w-16 text-white/90 mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold text-white shadow-md">
              Nurture Your Mind: Mental Wellness Hub
            </CardTitle>
            <CardDescription className="text-lg text-white/80 mt-2 max-w-2xl mx-auto">
              Discover resources, practices, and support to enhance your emotional and psychological well-being.
            </CardDescription>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Featured Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredContent.map((item) => (
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
        <h2 className="text-2xl font-semibold text-foreground mb-4">Mindfulness Practices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mindfulnessPractices.map((practice) => (
            <Card key={practice.id} className="shadow-md hover:shadow-accent/20 transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <practice.icon className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-md text-foreground mb-1">{practice.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 px-2 h-10 line-clamp-2">{practice.description}</p>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/80 mt-auto">
                  <Link href={practice.link}>Start Practice</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Support & Resources</h2>
        <div className="space-y-4">
          {supportResources.map((resource) => (
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
                  <Link href={resource.link} target={resource.type === 'External Resource' || resource.type === 'Hotline' ? '_blank' : '_self'} rel="noopener noreferrer">
                    {resource.type === 'Community' ? 'Visit Community' : 'Learn More'}
                    {(resource.type === 'External Resource' || resource.type === 'Hotline') && <LinkIcon className="ml-1.5 h-3.5 w-3.5" />}
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

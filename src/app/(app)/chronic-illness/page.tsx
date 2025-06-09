
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, HeartHandshake, Link as LinkIcon, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredDiscussions } from '@/lib/data/chronic-illness-data'; // Updated import

const copingStrategies = [
  { id: 'cs1', name: 'Mindfulness for Pain Relief', icon: HeartHandshake, link: '#', description: 'Explore guided meditations and mindfulness techniques.' },
  { id: 'cs2', name: 'Gentle Exercise Routines', icon: Users, link: '#', description: 'Find safe and effective exercises for various conditions.' },
  { id: 'cs3', name: 'Nutrition & Chronic Illness', icon: BookOpen, link: '#', description: 'Learn about dietary approaches that may help manage symptoms.' },
];

const externalResources = [
  { id: 'er1', name: 'Chronic Pain Navigators Community', type: 'ConnectWell Community', icon: Users, link: '/communities/4' }, 
  { id: 'er2', name: 'American Chronic Pain Association', type: 'External Organization', icon: LinkIcon, link: 'https://www.theacpa.org/' },
  { id: 'er3', name: 'Invisible Disabilities Association', type: 'External Organization', icon: LinkIcon, link: 'https://invisibledisabilities.org/' },
];

export default function ChronicIllnessPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/50 overflow-hidden">
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/50">
          <Image 
            src="https://images.unsplash.com/photo-1579208570378-8c970854bc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdXBwb3J0JTIwY29tZm9ydCUyMGVtcGF0aHl8ZW58MHx8fHwxNzQ5NDkyMTMyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Supportive hands or abstract representation of comfort"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="support comfort empathy"
            priority
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center p-6">
            <HeartHandshake className="h-16 w-16 text-white/90 mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold text-white shadow-md">
              Chronic Illness Support Hub
            </CardTitle>
            <CardDescription className="text-lg text-white/80 mt-2 max-w-2xl mx-auto">
              Find solidarity, share your journey, and discover resources for living with chronic conditions.
            </CardDescription>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Featured Discussions & Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredDiscussions.map((item) => (
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
                  <Link href={`/chronic-illness/discussions/${item.id}`}>Read More <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Coping Strategies & Well-being</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {copingStrategies.map((strategy) => (
            <Card key={strategy.id} className="shadow-md hover:shadow-accent/20 transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <strategy.icon className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-md text-foreground mb-1">{strategy.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 px-2 h-10 line-clamp-2">{strategy.description}</p>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/80 mt-auto">
                  <Link href={strategy.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Connect & Find Resources</h2>
        <div className="space-y-4">
          {externalResources.map((resource) => (
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
                    {resource.type === 'ConnectWell Community' ? 'Visit Community' : 'Visit Site'}
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

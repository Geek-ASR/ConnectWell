
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, HeartPulse, Apple, Users, Award, Zap, Snowflake, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredWorkouts = [
  {
    id: 'fw1',
    title: 'Full Body Strength Blast',
    category: 'Strength Training',
    summary: 'A comprehensive workout targeting all major muscle groups for balanced strength development.',
    imageUrl: 'https://images.unsplash.com/photo-1513352098199-8ccf457b35a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBsaWZ0aW5nJTIwd2VpZ2h0cyUyMGd5bXxlbnwwfHx8fDE3NDk0OTIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'person lifting weights gym',
    link: '#', // Placeholder link
    icon: Dumbbell,
  },
  {
    id: 'fw2',
    title: 'Cardio Endurance Challenge',
    category: 'Cardiovascular Health',
    summary: 'Boost your heart health and stamina with this invigorating cardio routine.',
    imageUrl: 'https://images.unsplash.com/photo-1532660954873-8c3f937e6871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBydW5uaW5nJTIwdHJhY2t8ZW58MHx8fHwxNzQ5NDkyMjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'person running track',
    link: '#', // Placeholder link
    icon: Zap,
  },
];

const recoveryTechniques = [
  { id: 'rt1', name: 'Active Stretching Routine', icon: Snowflake, link: '#', description: 'Improve flexibility and reduce muscle soreness with these dynamic stretches.' },
  { id: 'rt2', name: 'Foam Rolling Essentials', icon: Zap, link: '#', description: 'Learn how to effectively use a foam roller for myofascial release.' },
  { id: 'rt3', name: 'Optimal Sleep for Recovery', icon: HeartPulse, link: '#', description: 'Understand the crucial role of sleep in muscle repair and growth.' },
];

const communityResources = [
  { id: 'cr1', name: 'ConnectWell Fitness Fanatics', type: 'Community', icon: Users, link: '#' }, // Placeholder link
  { id: 'cr2', name: 'MyFitnessPal', type: 'External Tool', icon: LinkIcon, link: 'https://www.myfitnesspal.com/' },
  { id: 'cr3', name: 'Yoga With Adriene', type: 'External Resource', icon: LinkIcon, link: 'https://yogawithadriene.com/' },
];

export default function FitnessRecoveryPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/50 overflow-hidden">
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-primary/70 via-accent/50 to-secondary/60">
          <Image 
            src="https://images.unsplash.com/photo-1542533450-52ccfdc39aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Zml0bmVzcyUyMHN1bnJpc2UlMjBzaWxob3VldHRlfGVufDB8fHx8MTc0OTQ5MjIyM3ww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Dynamic fitness imagery - e.g., silhouette of a person stretching at sunrise"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="fitness sunrise silhouette"
            priority
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center p-6">
            <HeartPulse className="h-16 w-16 text-white/90 mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold text-white shadow-md">
              Fitness & Recovery Hub
            </CardTitle>
            <CardDescription className="text-lg text-white/80 mt-2 max-w-2xl mx-auto">
              Your space to find workout inspiration, recovery tips, and connect with fellow fitness enthusiasts.
            </CardDescription>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Featured Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWorkouts.map((item) => (
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
                  <Link href={item.link}>View Workout <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Recovery Techniques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recoveryTechniques.map((technique) => (
            <Card key={technique.id} className="shadow-md hover:shadow-accent/20 transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <technique.icon className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-md text-foreground mb-1">{technique.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 px-2 h-10 line-clamp-2">{technique.description}</p>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/80 mt-auto">
                  <Link href={technique.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Apple className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-semibold text-foreground">Nutrition Corner</CardTitle>
            </div>
            <CardDescription>Fuel your body right. Find tips on pre/post-workout meals, hydration, and healthy eating habits.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">Explore articles and discussions on how nutrition plays a key role in fitness and recovery. (Content coming soon!)</p>
            <Button variant="outline">Explore Nutrition Tips</Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Join the Community & Find Resources</h2>
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
                    {resource.type === 'Community' ? 'Visit Community' : 'Visit Site'}
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

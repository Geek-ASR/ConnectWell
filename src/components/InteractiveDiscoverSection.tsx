
"use client";

import React, { useState }
from 'react';
import { Search, UserPlus, Zap, Users, ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface Feature {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  gridPositionDesktop: string; // e.g., md:row-start-1 md:col-start-2
  iconAnimationClass?: string; // For icon-specific hover animations
}

const mentorshipFeatures: Feature[] = [
  {
    id: 'find-mentor',
    Icon: Search,
    title: "Find a Mentor",
    description: "Connect with experienced professionals tailored to your career goals and industry.",
    gridPositionDesktop: 'row-start-1 col-start-2 justify-self-center self-end',
    iconAnimationClass: 'group-hover:rotate-[15deg]',
  },
  {
    id: 'offer-mentorship',
    Icon: UserPlus,
    title: "Become a Mentor",
    description: "Share your knowledge, guide aspiring talents, and make a lasting impact.",
    gridPositionDesktop: 'row-start-2 col-start-1 justify-self-end self-center',
    iconAnimationClass: 'group-hover:scale-110',
  },
  {
    id: 'skill-pathways',
    Icon: Zap,
    title: "Skill Pathways",
    description: "Explore curated learning tracks and develop in-demand skills with expert guidance.",
    gridPositionDesktop: 'row-start-2 col-start-3 justify-self-start self-center',
    iconAnimationClass: 'group-hover:animate-pulse-glow-subtle',
  },
  {
    id: 'community-hub',
    Icon: Users,
    title: "Community Hub",
    description: "Engage in vibrant discussions, network with peers, and grow together.",
    gridPositionDesktop: 'row-start-3 col-start-2 justify-self-center self-start',
    iconAnimationClass: 'group-hover:translate-x-1',
  },
];

const FeatureCardDesktop: React.FC<Feature & { index: number }> = ({ Icon, title, description, gridPositionDesktop, index, iconAnimationClass }) => {
  return (
    <div
      className={cn(
        "group relative w-full max-w-[240px] md:max-w-[220px] lg:max-w-[260px] aspect-[5/4] p-2 rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fadeInUp glassmorphism-card",
        gridPositionDesktop
      )}
      style={{ animationDelay: `${index * 150 + 400}ms`, animationFillMode: 'forwards' }}
    >
      <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center transition-opacity duration-300 group-hover:opacity-0">
        <Icon className={cn("w-10 h-10 lg:w-12 lg:h-12 text-primary mb-3 transition-transform duration-300", iconAnimationClass)} strokeWidth={1.5} />
        <h4 className="text-md lg:text-lg font-semibold text-card-foreground">{title}</h4>
      </div>
      <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-card/70 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <Icon className={cn("w-8 h-8 lg:w-10 lg:h-10 text-primary mb-2 transition-transform duration-300", iconAnimationClass)} strokeWidth={1.5}/>
        <h4 className="text-md lg:text-lg font-bold text-primary mb-1.5">{title}</h4>
        <p className="text-xs lg:text-sm text-muted-foreground leading-snug">{description}</p>
      </div>
    </div>
  );
};

const FeatureCardMobile: React.FC<Feature> = ({ Icon, title, description, iconAnimationClass }) => {
  return (
    <AccordionItem value={id} className="border-none mb-4">
      <AccordionTrigger className="p-5 rounded-2xl glassmorphism-card hover:bg-card/80 transition-colors data-[state=open]:bg-card/90">
        <div className="flex items-center gap-4">
          <Icon className={cn("w-8 h-8 text-primary transition-transform duration-300", iconAnimationClass)} strokeWidth={1.5} />
          <h4 className="text-lg font-semibold text-card-foreground">{title}</h4>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-5 mt-1 bg-card/50 backdrop-blur-sm rounded-b-2xl text-sm text-muted-foreground">
        {description}
      </AccordionContent>
    </AccordionItem>
  );
};


export function InteractiveDiscoverSection() {
  return (
    <section id="discover" className="py-16 md:py-24 bg-background/30 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 md:mb-20 opacity-0 animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Unlock Your Potential
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Discover tools and communities to help you grow, connect, and succeed on your wellness journey.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-4 lg:gap-6 place-items-center md:max-w-3xl lg:max-w-4xl mx-auto min-h-[500px] lg:min-h-[600px] relative">
          {/* Central Plus Symbol */}
          <div 
            className="row-start-2 col-start-2 flex items-center justify-center w-full h-full opacity-0 animate-fadeInUp group"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <div className="relative w-20 h-20 lg:w-28 lg:h-28 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[22.5deg]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 lg:w-8 h-full bg-gradient-to-br from-primary/70 to-accent/70 rounded-full shadow-lg transition-all duration-500"></div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-6 lg:h-8 w-full bg-gradient-to-tr from-primary/70 to-accent/70 rounded-full shadow-lg transition-all duration-500"></div>
            </div>
          </div>

          {mentorshipFeatures.map((feature, index) => (
            <FeatureCardDesktop key={feature.id} {...feature} index={index} />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-0">
          <Accordion type="single" collapsible className="w-full">
            {mentorshipFeatures.map((feature, index) => (
               <div 
                key={feature.id} 
                className="opacity-0 animate-fadeInUp" 
                style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: 'forwards' }}
              >
                <FeatureCardMobile {...feature} />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

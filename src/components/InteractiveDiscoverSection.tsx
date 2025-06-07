
"use client";

import React from 'react';
import { Search, UserPlus, Zap, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  gridPosition: string; // e.g., md:row-start-1 md:col-start-2
}

const mentorshipFeatures: Feature[] = [
  {
    id: 'find-mentor',
    Icon: Search,
    title: "Find a Mentor",
    description: "Connect with experienced professionals tailored to your career goals and industry.",
    gridPosition: 'md:row-start-1 md:col-start-2 justify-self-center self-end',
  },
  {
    id: 'offer-mentorship',
    Icon: UserPlus,
    title: "Become a Mentor",
    description: "Share your knowledge, guide aspiring talents, and make a lasting impact.",
    gridPosition: 'md:row-start-2 md:col-start-1 justify-self-end self-center',
  },
  {
    id: 'skill-pathways',
    Icon: Zap,
    title: "Skill Pathways",
    description: "Explore curated learning tracks and develop in-demand skills with expert guidance.",
    gridPosition: 'md:row-start-2 md:col-start-3 justify-self-start self-center',
  },
  {
    id: 'community-hub',
    Icon: Users,
    title: "Community Hub",
    description: "Engage in vibrant discussions, network with peers, and grow together.",
    gridPosition: 'md:row-start-3 md:col-start-2 justify-self-center self-start',
  },
];

const FeatureCard: React.FC<Feature & { index: number }> = ({ Icon, title, description, gridPosition, index }) => {
  return (
    <div
      className={cn(
        "group relative w-full max-w-[280px] sm:max-w-[240px] md:max-w-[220px] lg:max-w-[260px] aspect-[4/3] p-5 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center justify-center text-center opacity-0 animate-fadeInUp",
        gridPosition
      )}
      style={{ animationDelay: `${index * 150 + 300}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 transition-opacity duration-300 group-hover:opacity-0">
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
        <h4 className="text-base sm:text-lg font-semibold text-card-foreground">{title}</h4>
      </div>
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col items-center justify-center text-center bg-card/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-1 sm:mb-2" strokeWidth={1.5}/>
        <h4 className="text-base sm:text-lg font-bold text-primary mb-1">{title}</h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{description}</p>
      </div>
    </div>
  );
};

export function InteractiveDiscoverSection() {
  return (
    <section id="discover-features" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 md:mb-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Unlock Your Potential
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Discover tools and communities to help you grow and succeed.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3 md:grid-rows-3 md:gap-4 lg:gap-8 place-items-center md:max-w-3xl lg:max-w-4xl mx-auto md:min-h-[500px] lg:min-h-[600px]">
          {/* Central Plus Symbol - Visible on MD screens and up */}
          <div className="hidden md:flex md:row-start-2 md:col-start-2 items-center justify-center w-full h-full opacity-0 animate-fadeInUp" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            <div className="relative w-24 h-24 lg:w-32 lg:h-32">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 lg:w-6 h-full bg-primary/70 rounded-full transform transition-all duration-500 group-hover:scale-105"></div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-5 lg:h-6 w-full bg-primary/70 rounded-full transform transition-all duration-500 group-hover:scale-105"></div>
            </div>
          </div>

          {/* Feature Cards */}
          {mentorshipFeatures.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

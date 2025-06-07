
"use client"; // Required for useEffect, useState for animations/interactions

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { InteractiveDiscoverSection } from "@/components/InteractiveDiscoverSection";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
      <Header />
      <main className="flex-grow overflow-x-hidden"> {/* Prevent horizontal scroll from animations */}
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Soft Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.3)] via-[hsl(var(--accent)/0.2)] to-[hsl(var(--secondary)/0.3)] opacity-80 dark:opacity-60"></div>

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-12 items-center">
              {/* Text Content Area (Left) */}
              <div className="text-center lg:text-left">
                <h1
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground opacity-0",
                    heroAnimated && "animate-slideInFromLeft"
                  )}
                  style={{ animationDelay: '0.2s' }}
                >
                  Welcome to <span className="text-gradient-primary-accent">ConnectWell</span>
                </h1>
                <p
                  className={cn(
                    "mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground opacity-0",
                    heroAnimated && "animate-slideInFromLeft"
                  )}
                  style={{ animationDelay: '0.4s' }}
                >
                  Find understanding, share experiences, and build supportive communities on your health journey.
                </p>
                <div
                  className={cn(
                    "mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 opacity-0",
                    heroAnimated && "animate-fadeInUp"
                  )}
                  style={{ animationDelay: '0.6s' }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="shadow-lg animate-button-bounce-once transition-all duration-300 hover:scale-105 group relative overflow-hidden hover:shadow-[0_0_25px_3px_hsl(var(--primary)/0.5)] focus:shadow-[0_0_25px_3px_hsl(var(--primary)/0.5)]"
                  >
                    <Link href="/signup">
                      <span className="absolute inset-0 w-full h-full bg-primary-foreground/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      Join Our Community <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/30 transition-shadow duration-300 hover:scale-105 glassmorphism-card border-border/50 hover:bg-card/50">
                    <Link href="/#discover">Learn More</Link>
                  </Button>
                </div>
              </div>

              {/* Visual Element (Right) - Hidden on small screens, appears on large */}
              <div 
                className={cn(
                  "hidden lg:flex justify-center items-center opacity-0",
                  heroAnimated && "animate-fadeInUp" 
                )}
                style={{ animationDelay: '0.5s' }} 
              >
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Interactive Lottie animation or 3D looping scene of community connections or wellness symbols"
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl object-cover aspect-[6/5]" 
                  data-ai-hint="Lottie animation community connection wellness symbols clay style"
                  priority
                />
              </div>
            </div>

            {/* Scroll Indicator - Centered at the bottom of the section */}
            <div 
              className={cn(
                "absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0", 
                heroAnimated && "animate-fadeInUp"
              )}
              style={{ animationDelay: '1.2s' }} // Increased delay
            >
              <ChevronDown className="h-8 w-8 text-muted-foreground animate-scroll-indicator-bounce" />
            </div>
          </div>
        </section>

        {/* Illustration Section (Kept for now, can be removed or updated) */}
        <section className="py-16 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="glassmorphism-card p-2 rounded-3xl">
              <Image
                src="https://placehold.co/1200x600.png"
                alt="ConnectWell community interaction scene"
                width={1200}
                height={600}
                className="rounded-2xl shadow-2xl"
                data-ai-hint="clay style community figures connecting"
              />
            </div>
          </div>
        </section>
        
        <InteractiveDiscoverSection />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-mint-200 to-lavender-200 dark:from-sky-800/30 dark:via-mint-800/30 dark:to-lavender-800/30 opacity-70"></div>
          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Find Your Community?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sign up today and start connecting with others who understand. It&apos;s free to join.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-8 shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden px-10 py-6 text-lg"
            >
              <Link href="/signup">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer group-hover:animate-none"></span>
                Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
              {[
                { name: "Partner A", hint: "health organization logo" },
                { name: "Partner B", hint: "wellness app logo" },
                { name: "Partner C", hint: "medical research logo" },
                { name: "Partner D", hint: "support group logo" },
              ].map((partner) => (
                <div key={partner.name} className="flex justify-center">
                  <Image
                    src={`https://placehold.co/150x60.png?text=${encodeURIComponent(partner.name)}`}
                    alt={partner.name}
                    width={120}
                    height={48}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    data-ai-hint={partner.hint}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


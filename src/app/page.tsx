
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { InteractiveDiscoverSection } from "@/components/InteractiveDiscoverSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-fadeInUp">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Welcome to <span className="text-primary">ConnectWell</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Find understanding, share experiences, and build supportive communities with people who share your health journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
                <Link href="/signup">
                  Join Our Community <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/30 transition-shadow">
                <Link href="/#discover-features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Illustration Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto max-w-5xl px-4">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="ConnectWell community illustration"
              width={1200}
              height={600}
              className="rounded-xl shadow-2xl"
              data-ai-hint="community health support"
            />
          </div>
        </section>

        {/* New Discover Features Section */}
        <InteractiveDiscoverSection />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Find Your Community?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sign up today and start connecting with others who understand. It&apos;s free to join.
            </p>
            <Button size="lg" asChild className="mt-8 shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/signup">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

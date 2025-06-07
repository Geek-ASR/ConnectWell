
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { UsersRound, MessageSquareText, ListPlus, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  animationDelay?: string;
}

function FeatureCard({ icon: Icon, title, description, animationDelay }: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden",
        "opacity-0 animate-fadeInUp" // Apply animation and initial opacity
      )}
      style={{ animationDelay: animationDelay, animationFillMode: 'forwards' }} // Apply delay and ensure it stays at final state
    >
      <CardHeader className="bg-card-foreground/5 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const features = [
    {
      icon: UsersRound,
      title: "Personalized Profiles",
      description: "Create your profile, share your medical journey, and connect with others who understand.",
    },
    {
      icon: MessageSquareText,
      title: "Real-Time Chat & Threads",
      description: "Engage in lively discussions, share experiences, and get quick updates within communities.",
    },
    {
      icon: ListPlus,
      title: "Build Communities",
      description: "Form or join communities based on specific medical conditions to find targeted support.",
    },
    {
      icon: ShieldCheck,
      title: "AI-Powered Moderation",
      description: "Our AI ensures a safe, respectful, and supportive environment for everyone.",
    },
  ];

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
                <Link href="/#features">Learn More</Link>
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

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                A Safe Space to Connect & Heal
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                Discover features designed for support, understanding, and empowerment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title} 
                  {...feature} 
                  animationDelay={`${index * 150}ms`} // Stagger the animation delay
                />
              ))}
            </div>
          </div>
        </section>

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

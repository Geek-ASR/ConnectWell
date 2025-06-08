
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartHandshake, Users, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <HeartHandshake className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">About ConnectWell</CardTitle>
            <CardDescription>Connecting individuals for better health and well-being.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>ConnectWell is a health community platform designed to empower individuals by fostering connections based on shared medical conditions and health experiences. We believe that by sharing knowledge, support, and personal journeys, we can collectively navigate the complexities of health and improve well-being.</p>
            
            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                  <p>To create a safe, supportive, and informative online space where individuals can connect with others facing similar health challenges, share experiences, and find strength in community.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Lightbulb className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Our Vision</h3>
                  <p>To be the leading platform for health-focused communities, recognized for its commitment to empathy, reliable peer support, and the promotion of informed health decisions, enhanced by responsible AI moderation.</p>
                </div>
              </div>
            </div>

            <p className="pt-6">We are passionate about leveraging technology to break down barriers of isolation that often accompany health issues. ConnectWell aims to provide tools for easy communication, community building, and access to shared wisdom, all within a secure and respectful environment.</p>
            <p>Join us in building a healthier, more connected world.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

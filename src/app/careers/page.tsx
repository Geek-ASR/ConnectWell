
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Mail } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Briefcase className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Careers at ConnectWell</CardTitle>
            <CardDescription>Join our mission to build healthier communities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>At ConnectWell, we are a passionate team dedicated to improving lives through community and technology. We believe in fostering an inclusive environment where innovation thrives and every team member can make a significant impact.</p>
            
            <h2 className="text-2xl font-semibold text-foreground pt-4">Why Join Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Make a real difference in people's health journeys.</li>
              <li>Work with a talented and mission-driven team.</li>
              <li>Opportunities for growth and learning.</li>
              <li>Competitive salary and benefits.</li>
              <li>A culture of collaboration and respect.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Current Openings</h2>
            <p>We are always looking for talented individuals to join our team. While we may not have specific openings listed at this moment, we encourage you to check back frequently or send us your resume.</p>
            <div className="bg-secondary/50 p-6 rounded-lg mt-4">
                <p className="text-center text-foreground font-medium">No current openings listed.</p>
                <p className="text-center mt-2 text-sm">Please check back later or submit your resume for future consideration.</p>
            </div>
            
            <div className="text-center pt-8">
              <Button size="lg" asChild>
                <a href="mailto:careers@connectwell.example.com">
                  <Mail className="mr-2 h-5 w-5" /> Contact HR / Submit Resume
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

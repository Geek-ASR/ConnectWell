
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ConnectWell application (the "Service") operated by ConnectWell ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Accounts</h2>
            <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Intellectual Property</h2>
            <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of ConnectWell and its licensors.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at legal@connectwell.example.com.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

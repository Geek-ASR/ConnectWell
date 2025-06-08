
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Welcome to ConnectWell. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the ConnectWell, express an interest in obtaining information about us or our products and services, when you participate in activities on the ConnectWell or otherwise when you contact us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the ConnectWell, the choices you make and the products and features you use. The personal information we collect may include the following: names; email addresses; usernames; passwords; contact preferences; contact or authentication data; and other similar information.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">How We Use Your Information</h2>
            <p>We use personal information collected via our ConnectWell for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Sharing Your Information</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p>If you have questions or comments about this notice, you may email us at privacy@connectwell.example.com.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

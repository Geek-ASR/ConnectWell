
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function CreateCommunityPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!communityName.trim() || !communityDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out both community name and description.",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    console.log("Creating community:", { communityName, communityDescription });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    toast({
      title: "Community Created (Simulated)",
      description: `The community "${communityName}" has been successfully created.`,
    });

    // In a real app, you would likely add the new community to a global state or re-fetch
    // For now, we just navigate back
    router.push("/communities");
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
            <Link href="/communities">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Communities</span>
            </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create a New Community</h1>
      </div>
      
      <Card className="shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Community Details</CardTitle>
            <CardDescription>
              Give your community a meaningful name and describe its purpose.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="communityName">Community Name</Label>
              <Input
                id="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g., Diabetes Support Group"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="communityDescription">Description</Label>
              <Textarea
                id="communityDescription"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder="Share what this community is about, its goals, and who it's for."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>
             {/* Placeholder for image upload in the future
            <div className="space-y-2">
              <Label htmlFor="communityImage">Community Image (Optional)</Label>
              <Input id="communityImage" type="file" disabled={isSubmitting} />
              <p className="text-xs text-muted-foreground">
                Choose an image that represents your community.
              </p>
            </div>
            */}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild disabled={isSubmitting}>
              <Link href="/communities">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting || !communityName.trim() || !communityDescription.trim()}>
              {isSubmitting ? "Creating..." : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Community
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

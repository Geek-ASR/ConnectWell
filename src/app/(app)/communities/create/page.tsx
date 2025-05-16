
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
import { ArrowLeft, PlusCircle, Loader2 } from "lucide-react";
import { addCommunity } from '@/lib/community-service'; // Import from the new service

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

    try {
      // Add the community using the centralized service
      addCommunity({ 
        name: communityName, 
        description: communityDescription, 
        longDescription: communityDescription 
      });
      
      console.log("Creating community (simulated API call):", { communityName, communityDescription });
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      toast({
        title: "Community Created!",
        description: `The community "${communityName}" has been successfully created.`,
      });
      router.push("/communities");

    } catch (error) {
      console.error("Error creating community:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not create community. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/communities">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Communities</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Community</h1>
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
                className="text-base"
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
                className="text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-6">
            <Button variant="outline" asChild disabled={isSubmitting}>
              <Link href="/communities">Cancel</Link>
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !communityName.trim() || !communityDescription.trim()}
              className="min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
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


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react"; // Changed from useFormState
import { useFormStatus } from "react-dom";
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
import { createCommunityAction, type CreateCommunityFormState } from '@/actions/community-actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="min-w-[160px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
        </>
      ) : (
        <>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Community
        </>
      )}
    </Button>
  );
}

export default function CreateCommunityPage() {
  const router = useRouter();
  const { toast } = useToast();

  const initialState: CreateCommunityFormState = { success: false };
  const [formState, formAction] = useActionState(createCommunityAction, initialState); // Changed from useFormState
  
  // To keep input fields controlled if needed, or clear them after success
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityLongDescription, setCommunityLongDescription] = useState("");


  useEffect(() => {
    if (formState?.success && formState.community) {
      toast({
        title: "Community Created!",
        description: formState.message || `The community "${formState.community.name}" has been successfully created.`,
      });
      // Reset form fields
      setCommunityName("");
      setCommunityDescription("");
      setCommunityLongDescription("");
      router.push("/communities");
    } else if (formState?.message && !formState.success) {
      toast({
        variant: "destructive",
        title: "Error Creating Community",
        description: formState.message,
      });
    }
  }, [formState, router, toast]);

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
        <form action={formAction}>
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
                name="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g., Diabetes Support Group"
                required
                className="text-base"
              />
              {formState?.fieldErrors?.communityName && (
                <p className="text-sm text-destructive">{formState.fieldErrors.communityName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="communityDescription">Short Description</Label>
              <Textarea
                id="communityDescription"
                name="communityDescription"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder="A brief overview of the community (shows on listing cards)."
                rows={3}
                required
                className="text-base"
              />
              {formState?.fieldErrors?.communityDescription && (
                <p className="text-sm text-destructive">{formState.fieldErrors.communityDescription}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="communityLongDescription">Full Details / Long Description</Label>
              <Textarea
                id="communityLongDescription"
                name="communityLongDescription"
                value={communityLongDescription}
                onChange={(e) => setCommunityLongDescription(e.target.value)}
                placeholder="Share what this community is about in more detail, its goals, and who it's for. This shows on the community's main page."
                rows={5}
                className="text-base"
              />
               {formState?.fieldErrors?.communityLongDescription && (
                <p className="text-sm text-destructive">{formState.fieldErrors.communityLongDescription}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-6">
            <Button variant="outline" asChild>
              <Link href="/communities">Cancel</Link>
            </Button>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

    
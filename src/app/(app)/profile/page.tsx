
"use client";

import React, { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Edit3, ShieldCheck, CalendarDays, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfileAction, type UpdateUserProfileFormState, type UserProfileData } from "@/actions/user-actions";
import { cn } from "@/lib/utils";

const initialProfileData: UserProfileData = {
  bio: "Passionate about sharing experiences and learning from others. Love hiking and reading.",
  medicalConditions: "Type 1 Diabetes,Allergic Asthma", // Default as comma-separated
};

const defaultJoinedDate = "January 15, 2023";

function EditProfileSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
    </Button>
  );
}


export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // State for profile data
  const [bio, setBio] = useState(initialProfileData.bio || "");
  const [medicalConditionsString, setMedicalConditionsString] = useState(initialProfileData.medicalConditions || "");

  // State for form inputs within the dialog
  const [formBio, setFormBio] = useState("");
  const [formMedicalConditions, setFormMedicalConditions] = useState("");
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Load profile data from localStorage on mount
  useEffect(() => {
    if (user?.uid) {
      const storedBio = localStorage.getItem(`connectwell-profile-${user.uid}-bio`);
      const storedConditions = localStorage.getItem(`connectwell-profile-${user.uid}-conditions`);
      if (storedBio) setBio(storedBio);
      if (storedConditions) setMedicalConditionsString(storedConditions);
    }
  }, [user?.uid]);

  const initialFormState: UpdateUserProfileFormState = { success: false };
  const [formState, formAction] = useActionState(updateUserProfileAction, initialFormState);

  useEffect(() => {
    if (formState?.success && formState.profileData) {
      setBio(formState.profileData.bio || "");
      setMedicalConditionsString(formState.profileData.medicalConditions || "");

      if (user?.uid) {
        localStorage.setItem(`connectwell-profile-${user.uid}-bio`, formState.profileData.bio || "");
        localStorage.setItem(`connectwell-profile-${user.uid}-conditions`, formState.profileData.medicalConditions || "");
      }
      
      toast({
        title: "Profile Updated!",
        description: formState.message || "Your profile has been successfully updated.",
      });
      setIsEditDialogOpen(false);
    } else if (formState?.message && !formState.success) {
      toast({
        variant: "destructive",
        title: "Error Updating Profile",
        description: formState.message,
      });
    }
  }, [formState, toast, user?.uid]);


  const handleOpenEditDialog = () => {
    setFormBio(bio);
    setFormMedicalConditions(medicalConditionsString);
    setIsEditDialogOpen(true);
  };

  const displayedMedicalConditions = medicalConditionsString
    .split(',')
    .map(condition => condition.trim())
    .filter(condition => condition.length > 0);

  if (!user) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="shadow-lg">
                <CardContent className="pt-6">
                    <p className="text-xl text-muted-foreground">Loading profile...</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  const bannerUrl = "https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhYnN0cmFjdCUyMG5hdHVyZXxlbnwwfHx8fDE3NDk0OTIzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const defaultAvatarUrl = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx1c2VyJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzQ5NDkyMzYxfDA&ixlib=rb-4.1.0&q=80&w=1080";
  
  const currentPhotoUrlIsPlaceholder = user.photoURL?.includes("placehold.co");
  const avatarSrc = currentPhotoUrlIsPlaceholder || !user.photoURL ? defaultAvatarUrl : user.photoURL;


  return (
    <div className="space-y-8">
      <Card className="shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
           <Image src={bannerUrl} alt="Profile banner" fill style={{objectFit:"cover"}} data-ai-hint="abstract nature" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={avatarSrc} alt={user.displayName ?? "User"} data-ai-hint="user portrait"/>
              <AvatarFallback className="text-4xl">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="text-center pt-20">
          <CardTitle className="text-3xl font-bold">{user.displayName ?? "Anonymous User"}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{user.email ?? "No email provided"}</CardDescription>
          <div className="flex justify-center items-center gap-2 mt-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {defaultJoinedDate}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-8 pb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">About Me</h3>
            <p className="text-muted-foreground whitespace-pre-line">{bio || "No bio provided yet."}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Medical Conditions</h3>
            {displayedMedicalConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {displayedMedicalConditions.map((condition) => (
                  <Badge key={condition} variant="secondary" className="text-sm px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30">
                    <ShieldCheck className="h-4 w-4 mr-1.5 text-accent" />
                    {condition}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No medical conditions listed.</p>
            )}
          </div>
          
          <div className="text-center mt-8">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handleOpenEditDialog}>
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <form action={formAction}>
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>
                      Update your bio and medical conditions. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-base">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formBio}
                        onChange={(e) => setFormBio(e.target.value)}
                        placeholder="Tell us a little about yourself..."
                        rows={4}
                        className="text-sm"
                      />
                      {formState?.fieldErrors?.bio && (
                        <p className="text-sm text-destructive">{formState.fieldErrors.bio}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions" className="text-base">Medical Conditions</Label>
                      <Input
                        id="medicalConditions"
                        name="medicalConditions"
                        value={formMedicalConditions}
                        onChange={(e) => setFormMedicalConditions(e.target.value)}
                        placeholder="e.g., Type 1 Diabetes, Asthma (comma-separated)"
                        className="text-sm"
                      />
                       <p className="text-xs text-muted-foreground">Enter conditions separated by commas.</p>
                      {formState?.fieldErrors?.medicalConditions && (
                        <p className="text-sm text-destructive">{formState.fieldErrors.medicalConditions}</p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <EditProfileSubmitButton />
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

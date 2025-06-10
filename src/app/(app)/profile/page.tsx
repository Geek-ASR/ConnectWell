
"use client";

import React, { useState, useEffect, useActionState, useRef } from "react";
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
import { Edit3, ShieldCheck, CalendarDays, Loader2, ImageUp, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfileAction, type UpdateUserProfileFormState, type UserProfileData } from "@/actions/user-actions";
import { cn } from "@/lib/utils";

const initialProfileBio = "Passionate about sharing experiences and learning from others. Love hiking and reading.";
const initialMedicalConditions = "Type 1 Diabetes,Allergic Asthma";
const defaultJoinedDate = "January 15, 2023";
const defaultBannerUrl = "https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhYnN0cmFjdCUyMG5hdHVyZXxlbnwwfHx8fDE3NDk0OTIzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const defaultAvatarPlaceholder = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx1c2VyJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzQ5NDkyMzYxfDA&ixlib=rb-4.1.0&q=80&w=1080";


function EditProfileSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="min-w-[140px]">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
    </Button>
  );
}


export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const editProfileFormRef = useRef<HTMLFormElement>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [bio, setBio] = useState(initialProfileBio);
  const [medicalConditionsString, setMedicalConditionsString] = useState(initialMedicalConditions);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const [currentBannerUrl, setCurrentBannerUrl] = useState<string>(defaultBannerUrl);

  // State for form inputs within the dialog
  const [formBio, setFormBio] = useState("");
  const [formMedicalConditions, setFormMedicalConditions] = useState("");
  const [formAvatarFile, setFormAvatarFile] = useState<File | null>(null);
  const [formAvatarPreview, setFormAvatarPreview] = useState<string | null>(null);
  const [formBannerFile, setFormBannerFile] = useState<File | null>(null);
  const [formBannerPreview, setFormBannerPreview] = useState<string | null>(null);
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (user?.uid) {
      const storedBio = localStorage.getItem(`connectwell-profile-${user.uid}-bio`) || initialProfileBio;
      const storedConditions = localStorage.getItem(`connectwell-profile-${user.uid}-conditions`) || initialMedicalConditions;
      const storedAvatar = localStorage.getItem(`connectwell-profile-${user.uid}-avatar`);
      const storedBanner = localStorage.getItem(`connectwell-profile-${user.uid}-banner`) || defaultBannerUrl;
      
      setBio(storedBio);
      setMedicalConditionsString(storedConditions);
      setCurrentAvatarUrl(storedAvatar);
      setCurrentBannerUrl(storedBanner);

      // Initialize form states for dialog
      setFormBio(storedBio);
      setFormMedicalConditions(storedConditions);
      setFormAvatarPreview(storedAvatar); // Preview is the current avatar initially
      setFormBannerPreview(storedBanner); // Preview is the current banner initially
    }
  }, [user?.uid]);

  const initialFormState: UpdateUserProfileFormState = { success: false };
  const [formState, formAction] = useActionState(updateUserProfileAction, initialFormState);

  useEffect(() => {
    if (formState?.success && formState.profileData) {
      const { bio: newBio, medicalConditions: newConditions, avatarUrl: newAvatar, bannerUrl: newBanner } = formState.profileData;
      
      setBio(newBio || initialProfileBio);
      setMedicalConditionsString(newConditions || initialMedicalConditions);
      if (newAvatar) setCurrentAvatarUrl(newAvatar);
      if (newBanner) setCurrentBannerUrl(newBanner);

      if (user?.uid) {
        localStorage.setItem(`connectwell-profile-${user.uid}-bio`, newBio || "");
        localStorage.setItem(`connectwell-profile-${user.uid}-conditions`, newConditions || "");
        if (newAvatar) localStorage.setItem(`connectwell-profile-${user.uid}-avatar`, newAvatar);
        if (newBanner) localStorage.setItem(`connectwell-profile-${user.uid}-banner`, newBanner);
      }
      
      toast({
        title: "Profile Updated!",
        description: formState.message || "Your profile has been successfully updated.",
      });
      setIsEditDialogOpen(false);
      // Reset file inputs in dialog for next open
      setFormAvatarFile(null);
      // setFormAvatarPreview(newAvatar || (user?.photoURL && !user.photoURL.includes("placehold.co") ? user.photoURL : defaultAvatarPlaceholder));
      setFormAvatarPreview(newAvatar || currentAvatarUrl || (user?.photoURL && !user.photoURL.includes("placehold.co") ? user.photoURL : defaultAvatarPlaceholder) );

      setFormBannerFile(null);
      setFormBannerPreview(newBanner || currentBannerUrl);
      editProfileFormRef.current?.reset();


    } else if (formState?.message && !formState.success) {
      toast({
        variant: "destructive",
        title: "Error Updating Profile",
        description: formState.message,
      });
      // Do not close dialog on error, keep form values as they were
      // Field errors are shown inline
    }
  }, [formState, toast, user?.uid, currentAvatarUrl, currentBannerUrl]);


  const handleOpenEditDialog = () => {
    // Set form values from current profile state when dialog opens
    setFormBio(bio);
    setFormMedicalConditions(medicalConditionsString);
    setFormAvatarPreview(currentAvatarUrl || (user?.photoURL && !user.photoURL.includes("placehold.co") ? user.photoURL : defaultAvatarPlaceholder));
    setFormBannerPreview(currentBannerUrl);
    setFormAvatarFile(null); // Clear any previously selected file
    setFormBannerFile(null); // Clear any previously selected file
    
    // Reset formState if needed to clear previous errors from action
    // This might not be strictly necessary if useActionState handles it, but good for safety.
    if (formState && (formState.fieldErrors || !formState.success)) {
       // dispatch({ type: 'RESET_FORM_STATE_ACTION_PROFILE' }); // If using a more complex reducer
    }
    setIsEditDialogOpen(true);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayedMedicalConditions = medicalConditionsString
    .split(',')
    .map(condition => condition.trim())
    .filter(condition => condition.length > 0);

  if (!user) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="shadow-lg">
                <CardContent className="pt-6 flex items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    <p className="text-xl text-muted-foreground">Loading profile...</p>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  const displayAvatarSrc = currentAvatarUrl || (user.photoURL && !user.photoURL.includes("placehold.co") ? user.photoURL : defaultAvatarPlaceholder);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg overflow-hidden">
        <div className="relative h-48 md:h-56 bg-muted">
           <Image src={currentBannerUrl} alt="Profile banner" fill style={{objectFit:"cover"}} data-ai-hint="abstract nature landscape" priority />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={displayAvatarSrc} alt={user.displayName ?? "User"} data-ai-hint="user portrait"/>
              <AvatarFallback className="text-4xl">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="text-center pt-20 pb-6">
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
            <p className="text-muted-foreground whitespace-pre-line text-sm md:text-base">{bio || "No bio provided yet."}</p>
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
              <DialogContent className="sm:max-w-[580px]">
                <form action={formAction} ref={editProfileFormRef}>
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>
                      Update your bio, medical conditions, avatar, and banner image. Click save when done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-6 max-h-[70vh] overflow-y-auto pr-3">
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="font-medium">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formBio}
                        onChange={(e) => setFormBio(e.target.value)}
                        placeholder="Tell us a little about yourself..."
                        rows={3}
                        className="text-sm"
                      />
                      {formState?.fieldErrors?.bio && (
                        <p className="text-sm text-destructive">{formState.fieldErrors.bio}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions" className="font-medium">Medical Conditions</Label>
                      <Input
                        id="medicalConditions"
                        name="medicalConditions"
                        value={formMedicalConditions}
                        onChange={(e) => setFormMedicalConditions(e.target.value)}
                        placeholder="e.g., Type 1 Diabetes, Asthma"
                        className="text-sm"
                      />
                       <p className="text-xs text-muted-foreground">Enter conditions separated by commas.</p>
                      {formState?.fieldErrors?.medicalConditions && (
                        <p className="text-sm text-destructive">{formState.fieldErrors.medicalConditions}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="avatarFile" className="font-medium">Profile Avatar</Label>
                        {formAvatarPreview && (
                            <div className="mt-2 flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={formAvatarPreview} alt="Avatar preview" data-ai-hint="user avatar"/>
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                </Avatar>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => { 
                                    setFormAvatarFile(null); 
                                    setFormAvatarPreview(defaultAvatarPlaceholder); 
                                    const input = document.getElementById('avatarFile') as HTMLInputElement;
                                    if(input) input.value = "";
                                  }}
                                  className="text-xs"
                                >
                                  <Trash2 className="mr-1.5 h-3.5 w-3.5"/> Remove
                                </Button>
                            </div>
                        )}
                        <Input
                            id="avatarFile"
                            name="avatarFile"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {formState?.fieldErrors?.avatarFile && (
                            <p className="text-sm text-destructive">{formState.fieldErrors.avatarFile}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bannerFile" className="font-medium">Profile Banner</Label>
                        {formBannerPreview && (
                            <div className="mt-2 relative aspect-video w-full max-w-sm rounded-md overflow-hidden border">
                                <Image src={formBannerPreview} alt="Banner preview" fill style={{objectFit:"cover"}} data-ai-hint="profile banner abstract"/>
                            </div>
                        )}
                         <Input
                            id="bannerFile"
                            name="bannerFile"
                            type="file"
                            accept="image/*"
                            onChange={handleBannerChange}
                            className="text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {formState?.fieldErrors?.bannerFile && (
                            <p className="text-sm text-destructive">{formState.fieldErrors.bannerFile}</p>
                        )}
                    </div>

                  </div>
                  <DialogFooter className="pt-6">
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


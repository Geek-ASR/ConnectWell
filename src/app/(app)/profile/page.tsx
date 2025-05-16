
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Edit3, ShieldCheck, CalendarDays } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuth();

  // Placeholder data
  const profileData = {
    displayName: user?.displayName ?? "Demo User",
    email: user?.email ?? "user@example.com",
    avatarUrl: user?.photoURL ?? `https://placehold.co/128x128.png?text=${(user?.displayName ?? "U").charAt(0)}`,
    bio: "Living with Type 1 Diabetes for 10 years. Passionate about sharing experiences and learning from others. Love hiking and reading.",
    medicalConditions: ["Type 1 Diabetes", "Allergic Asthma"],
    joinedDate: "January 15, 2023",
  };
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
           <Image src="https://placehold.co/1200x300.png" alt="Profile banner" layout="fill" objectFit="cover" data-ai-hint="abstract nature" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.displayName} data-ai-hint="user portrait"/>
              <AvatarFallback className="text-4xl">{getInitials(profileData.displayName)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="text-center pt-20"> {/* Increased padding top for avatar overlap */}
          <CardTitle className="text-3xl font-bold">{profileData.displayName}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{profileData.email}</CardDescription>
          <div className="flex justify-center items-center gap-2 mt-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {profileData.joinedDate}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-8 pb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">About Me</h3>
            <p className="text-muted-foreground whitespace-pre-line">{profileData.bio}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Medical Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.medicalConditions.map((condition) => (
                <Badge key={condition} variant="secondary" className="text-sm px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30">
                  <ShieldCheck className="h-4 w-4 mr-1.5 text-accent" />
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for 'Edit Profile' Form - could be a modal or separate section */}
      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Keep your information up to date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue={profileData.displayName} />
            </div>
             <div>
              <Label htmlFor="email">Email (Cannot be changed)</Label>
              <Input id="email" defaultValue={profileData.email} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={profileData.bio} rows={4} />
          </div>
          <div>
            <Label htmlFor="medicalConditions">Medical Conditions (comma-separated)</Label>
            <Input id="medicalConditions" defaultValue={profileData.medicalConditions.join(", ")} />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      */}
    </div>
  );
}

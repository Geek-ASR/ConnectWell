
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CommunitiesPage() {
  // Placeholder data
  const communities = [
    { id: "1", name: "Diabetes Support Group", description: "Sharing experiences and tips for managing diabetes.", members: 120, image: "https://placehold.co/400x250.png", imageHint: "health group" },
    { id: "2", name: "Ankylosing Spondylitis Warriors", description: "A community for those fighting AS.", members: 75, image: "https://placehold.co/400x250.png", imageHint: "wellness community" },
    { id: "3", name: "Mental Wellness Advocates", description: "Support for mental health challenges and triumphs.", members: 250, image: "https://placehold.co/400x250.png", imageHint: "support circle" },
    { id: "4", name: "Chronic Pain Navigators", description: "Coping strategies and support for chronic pain.", members: 90, image: "https://placehold.co/400x250.png", imageHint: "patient group" },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Discover Communities</CardTitle>
              <CardDescription>Find groups based on medical conditions, share experiences, and connect.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/communities/create"> {/* Placeholder for create community page */}
                <PlusCircle className="mr-2 h-4 w-4" /> Create Community
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search communities (e.g., Diabetes, Arthritis)" className="pl-10 w-full md:w-1/2" />
          </div>
        </CardContent>
      </Card>

      {communities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={community.image}
                alt={community.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
                data-ai-hint={community.imageHint}
              />
              <CardHeader>
                <CardTitle className="text-xl">{community.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Users className="h-4 w-4 mr-1.5" />
                  {community.members} members
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{community.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/communities/${community.id}`}>View Community</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground">No communities found. Try a different search or create one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, MessageSquareText, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  // Placeholder data - replace with real data fetching
  const joinedCommunities = [
    { id: "1", name: "Diabetes Support Group", members: 120, newPosts: 5, image: "https://placehold.co/300x200.png", imageHint: "medical support" },
    { id: "2", name: "Ankylosing Spondylitis Warriors", members: 75, newPosts: 2, image: "https://placehold.co/300x200.png", imageHint: "wellness group" },
  ];

  const recentActivity = [
    { type: "comment", user: "Alice", post: "Managing sugar levels", community: "Diabetes Support Group", time: "2h ago" },
    { type: "thread", user: "Bob", post: "New exercise routine", community: "Ankylosing Spondylitis Warriors", time: "5h ago" },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to Your Dashboard!</CardTitle>
          <CardDescription>
            Here&apos;s a quick overview of your communities and recent activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get started by exploring communities or viewing recent discussions.</p>
        </CardContent>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Communities</h2>
          <Button variant="outline" asChild>
            <Link href="/communities">
              <Users className="mr-2 h-4 w-4" /> View All
            </Link>
          </Button>
        </div>
        {joinedCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedCommunities.map(community => (
              <Card key={community.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <Image 
                  src={community.image} 
                  alt={community.name} 
                  width={300} 
                  height={200} 
                  className="w-full h-40 object-cover"
                  data-ai-hint={community.imageHint}
                />
                <CardHeader>
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                  <CardDescription>{community.members} members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary">{community.newPosts} new posts</p>
                  <Button variant="default" size="sm" className="mt-4 w-full" asChild>
                    <Link href={`/communities/${community.id}`}>Visit Community</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p className="mb-4">You haven&apos;t joined any communities yet.</p>
              <Button asChild>
                <Link href="/communities">
                  <PlusCircle className="mr-2 h-4 w-4" /> Explore Communities
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <MessageSquareText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">
                        <span className="font-semibold">{activity.user}</span>
                        {activity.type === 'comment' ? ' commented on "' : ' started a thread "'}
                        {activity.post}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        in {activity.community} &bull; {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No recent activity to show.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

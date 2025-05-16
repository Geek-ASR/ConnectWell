
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import type { Community } from '@/lib/community-service'; // Import Community type
import { getAllCommunities } from '@/lib/community-service'; // Import data fetching function

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // Fetch all communities when the component mounts
    setCommunities(getAllCommunities());
  }, []); 
  
  useEffect(() => {
    // Filter communities based on search term
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = communities.filter(community =>
      community.name.toLowerCase().includes(lowercasedSearchTerm) ||
      community.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredCommunities(results);
  }, [searchTerm, communities]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
              <Link href="/communities/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Community
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search communities (e.g., Diabetes, Arthritis)"
              className="pl-10 w-full md:w-1/2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </CardContent>
      </Card>

      {filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  data-ai-hint={community.imageHint}
                />
              </div>
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
            {searchTerm ? (
                <p className="text-lg text-muted-foreground">No communities found matching your search for &quot;{searchTerm}&quot;. Try a different term or create one!</p>
            ) : (
                <p className="text-lg text-muted-foreground">No communities available. Why not create one?</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

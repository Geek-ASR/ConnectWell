
"use client";

import Link from "next/link";
import { HeartHandshake, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/auth/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    // { href: "/about", label: "About" }, // Example, can add later
    { href: "/communities", label: "Communities" },
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-6">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <HeartHandshake className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">ConnectWell</span>
        </Link>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          {loading ? null : user ? (
            <UserNav />
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  const DesktopNav = () => (
    <>
      <Link href="/" className="flex items-center gap-2">
        <HeartHandshake className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold tracking-tight">ConnectWell</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 lg:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-6">
        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted"></div> // Skeleton for auth buttons
        ) : user ? (
          <UserNav />
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
        {isMobile ? <MobileNav /> : <DesktopNav />}
         {isMobile && (
            <div className="ml-auto">
              {loading ? null : user ? <UserNav /> : (
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          )}
      </div>
    </header>
  );
}

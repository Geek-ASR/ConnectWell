
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeartHandshake, LogIn, UserPlus, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/auth/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext"; // Import useTheme
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#discover", label: "Discover" },
    { href: "/communities", label: "Communities" },
  ];

  const commonNavActions = (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );

  const MobileNav = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 flex flex-col glassmorphism-card border-r-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
            <HeartHandshake className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">ConnectWell</span>
          </Link>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 rounded-md hover:bg-primary/10 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border/50">
          {commonNavActions}
          <div className="mt-4">
            {loading ? null : user ? (
              <UserNav />
            ) : (
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full text-md py-3">
                    <Link href="/login">
                      <LogIn className="mr-2 h-5 w-5" /> Login
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="w-full text-md py-3">
                    <Link href="/signup">
                      <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            )}
          </div>
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
      <nav className="ml-auto flex items-center gap-2 lg:gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-4 flex items-center gap-2">
        {commonNavActions}
        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted/50"></div>
        ) : user ? (
          <UserNav />
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
            <Button asChild className="transition-all hover:shadow-md hover:shadow-primary/30">
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled ? "h-16 bg-background/80 backdrop-blur-lg shadow-md border-b border-border/50" : "h-20 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-full items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <>
            <MobileNav />
            <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <HeartHandshake className="h-7 w-7 text-primary" />
              <span className="text-xl font-semibold">ConnectWell</span>
            </Link>
            <div className="ml-auto">
              {user ? <UserNav /> : commonNavActions}
            </div>
          </>
        ) : (
          <DesktopNav />
        )}
      </div>
    </header>
  );
}


"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator, 
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  UserCircle2, 
  Settings, 
  HeartHandshake, 
  LogOut, 
  FlaskConical, 
  Lightbulb, 
  HeartPulse, 
  Baby,
  Info,       
  Briefcase,  
  FileText,   
  Shield,     
  FileBadge   
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <HeartHandshake className="h-16 w-16 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading ConnectWell...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }
  
  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/communities", label: "Communities", icon: Users },
    { href: "/medical-research", label: "Medical Research", icon: FlaskConical },
    { href: "/mental-wellness", label: "Mental Wellness", icon: Lightbulb },
    { href: "/chronic-illness", label: "Chronic Illness", icon: HeartHandshake },
    { href: "/fitness-recovery", label: "Fitness & Recovery", icon: HeartPulse },
    { href: "/pediatric-health", label: "Pediatric Health", icon: Baby },
    { href: "/profile", label: "My Profile", icon: UserCircle2 },
    { href: "/settings", label: "Settings", icon: Settings, disabled: true },
  ];

  const informationalNavItems = [
    { href: "/about", label: "About", icon: Info },
    { href: "/careers", label: "Careers", icon: Briefcase },
    { href: "/terms", label: "Terms of Service", icon: FileText },
    { href: "/privacy", label: "Privacy Policy", icon: Shield },
    { href: "/acceptable-use", label: "Acceptable Use", icon: FileBadge },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <HeartHandshake className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">ConnectWell</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 1)} 
                  tooltip={item.label}
                  disabled={item.disabled}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
            <SidebarMenu className="mb-2">
                {informationalNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    variant="ghost" 
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-xs"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-3.5 w-3.5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarSeparator className="mb-2" />
            <Button variant="ghost" onClick={logout} className="w-full justify-start group-data-[collapsible=icon]:justify-center text-sm">
                <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 lg:px-8">
          <div className="md:hidden"> 
            <SidebarTrigger />
          </div>
          <div className="flex-1">
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

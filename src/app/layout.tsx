
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import { FloatingChatButton } from '@/components/layout/FloatingChatButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConnectWell - Your Health Community',
  description: 'Join communities of people with similar medical diagnoses to share, support, and connect.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider> {/* Wrap AuthProvider and children with ThemeProvider */}
          <AuthProvider>
            {children}
            <Toaster />
            <FloatingChatButton /> {/* Use the client component here */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

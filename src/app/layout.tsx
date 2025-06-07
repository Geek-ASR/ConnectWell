
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Import ThemeProvider
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react'; // Correctly added import

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
            {/* Floating Chatbot Icon */}
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl animate-slow-pulse border-2 border-primary/50 hover:scale-110 transition-transform glassmorphism-card z-50"
              aria-label="Open Chatbot"
              onClick={() => alert("Chatbot feature coming soon!")} // Placeholder action
            >
              <MessageSquare className="h-7 w-7 text-primary" />
            </Button>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

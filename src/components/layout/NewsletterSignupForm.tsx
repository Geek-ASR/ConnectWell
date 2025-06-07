
"use client";

import React, { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000); // Reset error state
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000); // Reset error state
      return;
    }

    setStatus("submitting");
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/error for demo
    if (Math.random() > 0.2) {
      setStatus("success");
      setMessage("Thanks for subscribing! Check your inbox for a confirmation.");
      setEmail(''); 
    } else {
      setStatus("error");
      setMessage("Oops! Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 3000); 
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting" || status === "success"}
            className={cn(
              "pl-10 pr-4 py-3 h-12 text-base rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow focus:shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
              status === "error" && "animate-shake border-destructive ring-destructive ring-1 focus:ring-destructive focus:shadow-[0_0_15px_hsl(var(--destructive)/0.4)]"
            )}
            aria-label="Email for newsletter"
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === "submitting" || status === "success"}
          className="w-full sm:w-auto h-12 px-6 rounded-xl text-base transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {status === "submitting" && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {status === "success" && <CheckCircle className="mr-2 h-5 w-5 text-green-400" />}
          {status === "idle" && "Subscribe"}
          {status === "error" && "Try Again"}
          {status === "submitting" && "Subscribing..."}
          {status === "success" && "Subscribed!"}
        </Button>
      </form>
      {message && status === "error" && (
        <p className="mt-3 text-sm text-destructive flex items-center justify-center sm:justify-start">
          <AlertTriangle className="h-4 w-4 mr-1.5" />
          {message}
        </p>
      )}
      {message && status === "success" && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400 flex items-center justify-center sm:justify-start">
          <CheckCircle className="h-4 w-4 mr-1.5" />
          {message}
        </p>
      )}
    </div>
  );
}

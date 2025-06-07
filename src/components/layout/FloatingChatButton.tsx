
"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function FloatingChatButton() {
  const handleChatbotClick = () => {
    alert("Chatbot feature coming soon!");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl animate-slow-pulse border-2 border-primary/50 hover:scale-110 transition-transform glassmorphism-card z-50"
      aria-label="Open Chatbot"
      onClick={handleChatbotClick}
    >
      <MessageSquare className="h-7 w-7 text-primary" />
    </Button>
  );
}


"use client";

import type { User } from "firebase/auth"; // Will use Firebase User type later
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Simplified User type for now
interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email?: string, displayName?: string) => void; // Simulate login
  logout: () => void; // Simulate logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true); // Simulate initial loading

  useEffect(() => {
    // Simulate checking auth state on mount
    const storedUser = localStorage.getItem("connectwell-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email = "user@example.com", displayName = "Demo User") => {
    const demoUser: AppUser = {
      uid: "demo-uid-" + Math.random().toString(16).slice(2),
      email,
      displayName,
      photoURL: `https://placehold.co/40x40.png?text=${displayName.charAt(0)}`
    };
    setUser(demoUser);
    localStorage.setItem("connectwell-user", JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("connectwell-user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

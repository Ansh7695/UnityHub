"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, LogIn, CheckCircle, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
    }
  };

  return (
    <main className="min-h-[85vh] bg-background text-foreground flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              Unity Hub
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-foreground">Welcome Back</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your hackathons, video rooms, and project dashboard.
          </p>
        </div>

        {loggedIn ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-xl font-bold text-foreground">Signed In Successfully!</h2>
            <p className="text-xs text-muted-foreground">Redirecting to your workspace...</p>
            <div className="pt-2">
              <Link href="/hackathons">
                <Button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                  Go to Hackathons Arena
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-medium text-foreground">Password</label>
                <a href="#" className="text-orange-500 hover:underline text-[11px]">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-5 text-sm gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </Button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          Don't have an account yet?{" "}
          <Link href="/signup" className="text-orange-500 font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}

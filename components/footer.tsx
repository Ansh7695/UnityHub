"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Disc as Discord, Send, Flame, Code2, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-lg relative overflow-hidden transition-colors duration-300">
      {/* Glow decorative background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/20">
                <Flame className="w-5 h-5 fill-current" />
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Unity Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Empowering global developers to collaborate, build groundbreaking open-source software, compete in hackathons, and innovate together.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-3">
                Stay updated with hackathons & dev news
              </h4>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3.5 py-2 text-sm rounded-lg bg-secondary/80 border border-border focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-foreground transition"
                />
                <Button type="submit" size="sm" className="gap-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white">
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
              {subscribed && (
                <p className="text-xs text-amber-500 mt-2 flex items-center gap-1">
                  ✓ Successfully subscribed to Unity Hub updates!
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hackathons" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-500" />
                  Hackathons
                </Link>
              </li>
              <li>
                <Link href="/meetings" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-500" />
                  Video Rooms
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-500" />
                  Projects & Teams
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Join Us
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Unity Hub. All rights reserved. Built with React, Next.js, and Tailwind CSS.
          </p>

          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition">
              <Discord className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

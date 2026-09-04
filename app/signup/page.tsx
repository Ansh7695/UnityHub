"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, UserPlus, CheckCircle, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Frontend Developer",
    skills: ["React", "TypeScript"],
    interests: ["AI", "Blockchain"],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "AI / ML Researcher",
    "Smart Contract Developer",
    "UI/UX Designer",
    "DevOps / Cloud Engineer",
  ];

  const availableSkills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "Rust", "Solidity", "Tailwind CSS", "GraphQL", "Docker", "AWS"
  ];

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-[85vh] bg-background text-foreground flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              Unity Hub
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-foreground">Create Your Developer Account</h1>
          <p className="text-xs text-muted-foreground">
            Join 10,000+ developers building software, joining hackathons, and matching teams.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-foreground">Welcome to Unity Hub!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your profile has been created. You can now explore hackathons, join live video rooms, and start matching with project teams.
            </p>
            <div className="pt-4">
              <Link href="/hackathons">
                <Button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                  Explore Hackathons
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`font-semibold transition ${step === 1 ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-muted-foreground"}`}
              >
                1. Account Details
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`font-semibold transition ${step === 2 ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-muted-foreground"}`}
              >
                2. Tech Role & Skills
              </button>
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-5 text-sm gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                  >
                    <span>Next: Select Skills & Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-foreground mb-1.5">Primary Developer Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground text-sm focus:outline-none"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-foreground mb-2">Technical Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl font-medium transition ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                              : "bg-secondary/80 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">
                    Back
                  </Button>
                  <Button type="submit" className="w-2/3 py-5 text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </main>
  );
}

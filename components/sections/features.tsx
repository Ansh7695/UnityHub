"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Video, FileText, Brain, Rocket, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: "Team Collaboration",
    description: "Video calls, file sharing, and real-time collaboration tools.",
    icon: Video,
    href: '/1',
  },
  {
    title: "Project Ideas & Repositories",
    description: "Explore new ideas and access GitHub repositories seamlessly.",
    icon: Code,
    href: '/2',
  },
  {
    title: "AI-powered Team Matching",
    description: "Smart suggestions for finding the perfect teammates.",
    icon: Brain,
    href: '/3',
  },
  {
    title: "Hackathon Listings",
    description: "Browse and register for exciting hackathon events.",
    icon: Rocket,
    href: '/',
  },
  {
    title: "Task Management",
    description: "Manage deadlines efficiently with Kanban view.",
    icon: Calendar,
    href: '/',
  },
  {
    title: "Documentation & Resources",
    description: "Access comprehensive guides and learning materials.",
    icon: FileText,
    href: '/',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage projects, collaborate with your team, and build amazing things together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.href ?? '/'} className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-6 h-full backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all duration-300 border border-border/50 rounded-lg transform-gpu"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
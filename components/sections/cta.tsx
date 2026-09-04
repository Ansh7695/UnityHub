"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Team&apos;s Workflow?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers already using Unity Hub to collaborate, compete in hackathons, and innovate together.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all duration-300 border-0"
            >
              <Flame className="mr-2 h-5 w-5 fill-current" />
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/5 pointer-events-none" />
    </section>
  );
}
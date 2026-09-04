"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Sun, Menu, X, Flame, Trophy, Video, Users, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/hackathons', label: 'Hackathons', icon: Trophy },
    { href: '/meetings', label: 'Video Rooms', icon: Video },
    { href: '/projects', label: 'Projects & Teams', icon: Users },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 text-white group-hover:scale-105 transition-transform shadow-md shadow-orange-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              Unity Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-500 font-semibold'
                      : 'text-foreground/80 hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-muted-foreground'}`} />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-orange-400" />
            </Button>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Button>
            </Link>

            <Link href="/signup">
              <Button size="sm" className="gap-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-90 shadow-md shadow-orange-500/20 text-white border-0">
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-orange-400" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                      isActive
                        ? 'bg-orange-500/10 text-orange-500 font-semibold'
                        : 'text-foreground/80 hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5 text-orange-500" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

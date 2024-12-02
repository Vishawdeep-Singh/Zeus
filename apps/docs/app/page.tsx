'use client';
import Link from 'next/link';
import { Dumbbell, Users, BarChart, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LandingHero } from '@/components/LandingHero';
import { StickyScrollRevealDemo } from '@/components/StickyScrollRevealDemo';

export default function LandingPage() {
  return (
    <div
      className="flex flex-col min-h-screen [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Zap fill="black" size={40}></Zap>
          <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">
            Zeus
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/signup">Sign up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/signin">Sign in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link
              className="text-base font-medium hover:underline underline-offset-4"
              href="/signup"
            >
              Sign up
            </Link>
            <Link
              className="text-base font-medium hover:underline underline-offset-4"
              href="/signin"
            >
              Sign in
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section>
          <LandingHero />
        </section>
        <section>
          <StickyScrollRevealDemo />
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Zeus Fitness App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

"use client"
import Link from "next/link"
import Image from "next/image"
import { Dumbbell, Users, BarChart, ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AnimatedZeusImage from "./image1.png"
import AnimatedZeusLogo from "./animated-zeus-logo"
import { FlipWords } from "@/components/ui/flip-words"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { LandingHero } from "@/components/LandingHero"
import { StickyScrollRevealDemo } from "@/components/StickyScrollRevealDemo"

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <AnimatedZeusLogo />
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Zeus</span>
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
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
              Sign up
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signin">
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Godly Features</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Dumbbell className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Olympian Workouts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Access a vast library of workouts designed by professional trainers, fit for the gods themselves.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Divine Community</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Connect with fellow demigods, share your progress, and motivate each other on your fitness quests.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <BarChart className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Immortal Progress Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Monitor your gains with advanced analytics and visualizations worthy of Mount Olympus.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join the Pantheon of Fitness</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Embark on your legendary fitness journey with Zeus. Sign up now and transform yourself into a god among mortals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <Button type="submit" className="w-full">Ascend to Greatness</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Zeus Fitness App. All rights reserved.</p>
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
  )
}
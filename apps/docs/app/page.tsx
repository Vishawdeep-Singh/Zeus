'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Dumbbell, Users, BarChart, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AnimatedZeusImage from './image1.png';
import AnimatedZeusLogo from './animated-zeus-logo';
import { FlipWords } from '@/components/ui/flip-words';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function LandingPage() {
  const words = ['Zeus', 'Kratos', 'Hera', 'Poseidon', 'Athena', 'Hades'];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <AnimatedZeusLogo />
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
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
                <Link href="#features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#testimonials">Testimonials</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#testimonials"
            >
              Testimonials
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#contact"
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unleash Your Inner God with Zeus
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Transform your body and mind with Zeus - the ultimate gym
                    companion app that brings the power of{' '}
                    <FlipWords
                      className="text-black font-bold"
                      duration={1000}
                      words={words}
                    />{' '}
                    to your workouts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Start Free Trial</Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 3000,
                      stopOnInteraction: true,
                    }),
                  ]}
                >
                  <CarouselContent className="">
                    <CarouselItem>
                      <img
                        src="/image1.png"
                        className="rounded-2xl h-[800px] object-cover w-[800px]"
                        alt=""
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img
                        src="/image2.png"
                        className="rounded-2xl h-[800px] object-cover w-[800px]"
                        alt=""
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img src="/image5.jpg" className="rounded-2xl" alt="" />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Godly Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Dumbbell className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Olympian Workouts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Access a vast library of workouts designed by professional
                  trainers, fit for the gods themselves.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Divine Community</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Connect with fellow demigods, share your progress, and
                  motivate each other on your fitness quests.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <BarChart className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">
                  Immortal Progress Tracking
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Monitor your gains with advanced analytics and visualizations
                  worthy of Mount Olympus.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Choose Your Destiny
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Mortal</h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  For those beginning their ascent
                </p>
                <p className="text-4xl font-bold text-center mb-6">
                  $9.99<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    Basic workout tracking
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    Access to community forums
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />5
                    Olympian workouts per month
                  </li>
                </ul>
                <Button className="mt-auto">Choose Plan</Button>
              </div>
              <div className="flex flex-col p-6 bg-yellow-500 text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Demigod</h3>
                <p className="text-center mb-4">
                  For serious fitness enthusiasts
                </p>
                <p className="text-4xl font-bold text-center mb-6">
                  $19.99<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    All Mortal features
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    Advanced progress analytics
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    Unlimited Olympian workouts
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    Personalized training plans
                  </li>
                </ul>
                <Button className="mt-auto bg-white text-yellow-500 hover:bg-gray-100">
                  Choose Plan
                </Button>
              </div>
              <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">
                  Olympian
                </h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  For those seeking godly perfection
                </p>
                <p className="text-4xl font-bold text-center mb-6">
                  $29.99<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    All Demigod features
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    1-on-1 coaching sessions
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    Exclusive Zeus challenges
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                    Priority support from Hermes
                  </li>
                </ul>
                <Button className="mt-auto">Choose Plan</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Praise from Olympus
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Hercules"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h3 className="text-xl font-bold">Hercules</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  "Zeus has taken my strength to new heights. I couldn't have
                  completed my 12 labors without it!"
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Athena"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h3 className="text-xl font-bold">Athena</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  "The wisdom in Zeus's training plans is unparalleled. It's not
                  just about strength, but strategy too."
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Apollo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h3 className="text-xl font-bold">Apollo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  "As the god of physical perfection, I approve. Zeus has helped
                  me maintain my godly physique."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join the Pantheon of Fitness
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Embark on your legendary fitness journey with Zeus. Sign up
                  now and transform yourself into a god among mortals.
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
                  <Button type="submit" className="w-full">
                    Ascend to Greatness
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{' '}
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

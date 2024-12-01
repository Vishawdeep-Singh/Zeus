"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Comprehensive Analytics at Your Fingertips",
    description:
      "Gain insights into your gym's performance with detailed analytics. View attendance data for the last 7 days and revenue trends over the past 6 months. Easily filter results to track multiple gym locations separately for better decision-making.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll01.png'}
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Stay Ahead of Membership Expirations",
    description:
      "Keep track of expiring memberships effortlessly. When a user's membership nears its end, they’re added to the membership expiry table for timely reminders, ensuring no one misses out on renewing.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll02.png'}
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Real-Time Attendance Tracking",
    description:
      "Get live updates on your gym’s attendance. See who has visited, track member check-ins, and stay on top of your gym’s activity to ensure smooth operations.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll3.png'}
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Effortless Member Search with Advanced Filters",
    description:
      "Quickly find members using a powerful search tool with filters like date, gym name, and user name. View attendance records for specific dates or ranges, ensuring accurate tracking of gym activity.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll4.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Simplified Gym Management",
    description:
      "Easily manage all of your gyms in one place. View and control key information for each location, ensuring smooth operations across your gym empire.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll5.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Seamless Membership Management",
    description:
      "Effortlessly add new memberships to any of your gyms. Within each gym, you can manage memberships directly, giving you full control over your gym's membership base.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll6.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Member Profiles & Insights",
    description:
      "Gain a deeper understanding of your gym members. View detailed stats and information for each member, making it easy to track their engagement and manage memberships efficiently.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll7.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "User-Friendly Interface for Members",
    description:
      "A clean, intuitive user interface for your gym members. Users can easily join gyms, track memberships, and engage with your gym’s services from their own dashboard.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll8.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Monitor Your Gym Memberships",
    description:
      "Users can track their memberships across all gyms. With clear indicators of days left until expiry, users are notified of upcoming renewals, so they never miss a beat.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll9.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Effortless Attendance Tracking for Members",
    description:
      "Users can quickly mark their attendance at joined gyms. Gym admins and owners receive notifications in real time, ensuring accurate tracking of attendance for all members.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll10.png'}
          width={2000}
          height={2000}
          className="h-full w-full object-fill"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Advanced Search for Members & Attendance",
    description:
      "Utilize a robust search engine to find specific member attendance data. With multiple filters, including date, gym name, and user, you can access tailored results for precise record-keeping.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={'/scroll4.png'}
          width={1000}
          height={1000}
          className="h-full w-full object-contain"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}

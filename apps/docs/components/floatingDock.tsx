'use client';
import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from '@tabler/icons-react';
import Image from 'next/image';
import { UserCheck, WalletCards } from 'lucide-react';

export function FloatingDockDemo() {
  const links = [
    {
      title: 'Home',
      icon: (
        <IconHome className="h-full w-full text-black dark:text-neutral-300" />
      ),
      href: '/user',
    },

    {
      title: 'Memberhsips',
      icon: (
        <WalletCards className="h-full w-full text-black dark:text-neutral-300"></WalletCards>
      ),
      href: '/user/memberships',
    },
    {
      title: 'Attendances',
      icon: (
        <UserCheck className="h-full w-full text-black dark:text-neutral-300"></UserCheck>
      ),
      href: '/user/attendances',
    },
    {
      title: 'Aceternity UI',
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: '#',
    },
  ];
  return (
    <div className="flex z-50 relative justify-center h-fit w-full">
      <FloatingDock
        desktopClassName="fixed bottom-10 text-black bg-black"
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}

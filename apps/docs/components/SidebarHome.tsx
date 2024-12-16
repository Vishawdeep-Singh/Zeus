'use client';
import React, { useEffect, useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Bell, Dumbbell, Users, Settings, Building2, Zap } from 'lucide-react';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import multiavatar from '@multiavatar/multiavatar/esm';
import MultiAvatar from './Multiavatar';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/context/socketContext';
import { getGymsOfOwner } from '@/actions/getGymsOfOwner';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { notificationsState } from '@/states/notifications';
import { useNotifications } from '@/hooks/useNotifications';
import { Navbar } from './Navbar';
import { revalidatePath } from 'next/cache';

export default function SidebarHome({ children, session }: any) {
  const router = useRouter();
  const avatar = multiavatar(session.name);
  const { socket, user } = useWebSocket();
  const [gymIds, setGymIds] = useState<string[]>([]);
  const notifications = useNotifications();
  const [, setNotifications] = useRecoilState(notificationsState);

  useEffect(() => {
    async function fetchGymIds() {
      const response = await getGymsOfOwner();
      if (response.error) {
        toast.error(`${response.error}`, {
          closeButton: true,
          position: 'top-center',
        });
      } else {
        setGymIds(response.data as []);
      }
    }
    fetchGymIds();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = async (event) => {
        const { type, data } = JSON.parse(event.data) || {};

        if (type === 'check-in') {
          const audio = new Audio(`/notifications.mp3`);
          await audio.play();
          // toast.info(`${data.message}`,{
          //   position:'top-right'
          // })

          toast(
            <div className="space-x-2 space-y-1 flex items-center">
              <Bell size={20} fill="black"></Bell>
              <div className="font-semibold">{data.message}</div>
            </div>,
            { duration: 5000, position: 'top-right' }
          );
          if (data.notificationMetaData) {
            setNotifications((prev) => [...prev, data.notificationMetaData]);
          }
          // const response = await addNotifications(data.message,data.time)

          // if(response.data){
          //   setNotifications((prev) => [...prev,response?.data]);
          // }
          // if(response.error){
          //   toast.error(`${response.error}`,{
          //     closeButton:true,
          //     position:"top-center"
          //   })
          // }
        } else if (type === 'join-in') {
          const audio = new Audio(`/notifications.mp3`);
          await audio.play();

          toast(
            <div className="space-x-2 space-y-1 flex items-center">
              <Bell size={20} fill="black"></Bell>
              <div className="font-semibold">{data.message}</div>
            </div>,
            { duration: 5000, position: 'top-right' }
          );
          if (data.notificationMetaData) {
            setNotifications((prev) => [...prev, data.notificationMetaData]);
          }
          revalidatePath('/admin/dashboard');
          // const response = await addNotifications(data.message,data.time)

          // if(response.data){
          //   setNotifications((prev) => [...prev,response?.data]);
          // }
          // if(response.error){
          //   toast.error(`${response.error}`,{
          //     closeButton:true,
          //     position:"top-center"
          //   })
          // }
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    if (user && socket && gymIds?.length > 0) {
      socket.send(
        JSON.stringify({
          type: 'join-notifications-admin',
          data: {
            gymIds: gymIds,
            ownerId: user.id,
          },
        })
      );
    }
  }, [user, socket, gymIds]);

  const links = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: (
        <Dumbbell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Manage Gyms',
      href: '/admin/manageGyms',
      icon: (
        <Building2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Go To User Site',
      href: '/user',
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: '#',
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: async () => {
        signOut();
        router.push('/signin');
      },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen' // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {session.user.provider === 'google' ? (
              <SidebarLink
                link={{
                  label: session.user.name,
                  href: '#',
                  icon: (
                    <Image
                      src={session.user.image}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                      priority
                    />
                  ),
                }}
              />
            ) : (
              <SidebarLink
                link={{
                  label: session.user.name,
                  href: '#',
                  icon: (
                    <MultiAvatar
                      name={session.user.name}
                      className="h-12 w-12"
                    ></MultiAvatar>
                  ),
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Zap className="" fill="black" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl text-black dark:text-white whitespace-pre"
      >
        Zeus
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Zap className="" fill="black" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: any) => {
  return (
    <div className="flex flex-1">
      <div className=" rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <Navbar></Navbar>
        {children}
      </div>
    </div>
  );
};

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ManageGyms } from '@/components/manageGyms';
import { Navbar } from '@/components/Navbar';
import prisma from '@/lib/db';
import { toast } from 'sonner';
import { Gym } from '@/types/types';
import { Suspense } from 'react';
import Loading from './loading';
import React from 'react';

async function getGyms(ownerId: string) {
  try {
    const response = await prisma.gym.findMany({
      where: {
        ownerId: Number(ownerId),
      },
    });
    if (response.length === 0) {
      return { nogyms: 'No gyms are added by you . Try adding a gym' };
    }
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to getGyms at the moment' };
  }
}

async function GetGyms({ ownerId }: { ownerId: string }) {
  const gyms = await getGyms(ownerId);

  if (gyms.error) {
    toast.error(`${gyms.error}`, {
      closeButton: true,
      position: 'bottom-center',
    });
  } else if (gyms.nogyms) {
    return <div className="text-5xl font-bold text-center">{gyms.nogyms}</div>;
  } else {
    return <ManageGyms gyms={gyms.data as Gym[]} />;
  }
}
export default async function () {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div
      className="h-screen space-y-5 p-4 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      {/* <Navbar title={'Manage Gyms'}></Navbar> */}
      <Suspense fallback={<Loading></Loading>}>
        <GetGyms ownerId={session.user.id}></GetGyms>
      </Suspense>
    </div>
  );
}

const awaiter = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the promise after 'ms' milliseconds
    }, ms);
  });
};

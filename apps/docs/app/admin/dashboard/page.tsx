import { Navbar } from '@/components/Navbar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { TabsDemo } from '@/components/demoTabs';
import prisma from '@/lib/db';
import { masterTableDataConversion, onwerGymsConversion } from '@/lib/helper';
import { toast } from 'sonner';
import React from 'react';


export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'auto';

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
 
  const response = await getMembersOfAllGym(session.user.id);
  if (response.error) {
    toast.error(`${response.data}`, {
      closeButton: true,
      position: 'top-center',
    });
  }

  return (
    <div
      className="h-screen space-y-5 p-4 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      {/* <div>
        <Navbar title={'Dashboard'}></Navbar>
      </div> */}

      <div>
        {/* <div className="w-full space-y-10  overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br bg-white  border-black ">
          <p>Analytics</p>
          <div className="flex space-y-10 flex-col ">
            <div className="flex flex-wrap space-x-5">
            <Component></Component>
            <Component1></Component1>
            
           
            </div>


          </div>


        </div> */}

        <TabsDemo
          // @ts-ignore
          membershipExpiry={response.memberhshipExpiry}
          // @ts-ignore
          masterTableData={response.data}
          // @ts-ignore
          ownedGyms={response.ownedGyms}
        ></TabsDemo>
      </div>
      <div></div>
    </div>
  );
}
async function getMembersOfAllGym(userId: string) {
  try {
    if (!userId) {
      notFound();
    }
    const response = await prisma.gym.findMany({
      where: {
        ownerId: Number(userId),
      },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            cellPh: true,
            memberships: {
              select: {
                gymId: true,
                membershipId: true,
                dateJoined: true,
                expired: true,
                membership: {
                  select: {
                    duration: true,
                  },
                },
              },
            },
            attendance: true,
          },
        },
      },
    });

    const memberhshipExpiry = response;
    // @ts-ignore
    const [strucutedData, ownedGyms] = await Promise.all([
      // @ts-ignore
      masterTableDataConversion(response),
      // @ts-ignore
      onwerGymsConversion(response)
    ]);

    return { data: strucutedData, ownedGyms, memberhshipExpiry };
  } catch (error: any) {
    console.error(error.message);
    return { error: 'Not able to get Dashboard Data at the moment' };
  }
}

import { FloatingDockDemo } from '@/components/floatingDock';
import { ManageGym } from '@/components/manageGym';
import { authOptions } from '@/lib/auth';
import { Gym } from '@/types/types';
import { paramsId } from '@/types/validations';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

async function getMembership(id: string, gymId: string) {
  try {
    const response = await prisma.userMembership.findMany({
      where: {
        userId: Number(id),
        gymId: gymId,
      },
      select: {
        membershipId: true,
        userId: true,
        expired: true,
      },
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to process memberships at the moment' };
  }
}
export default async function ({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  const { id } = params;
  if (!id) {
    notFound();
  }
  const result = paramsId.safeParse(id);
  if (!result.success) {
    return (
      <div className="flex flex-col text-xl items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Invalid Id Error</h1>
        Invalid Gym Id
        <a href="/admin/manageGyms" className="mt-4 text-blue-600">
          Go back to homw
        </a>
      </div>
    );
  }

  const gymsDetails = await getGymDetails(id);
  const membershipUserDetails = await getMembership(session.user.id, id);

  if (gymsDetails.error || membershipUserDetails.error) {
    return (
      <div className="text-4xl font-bold text-center">
        {gymsDetails.error} || {membershipUserDetails.error}
      </div>
    );
  }

  return (
    <div
      className="space-y-5 p-4 h-screen overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <div className="animate-slide-up">
        <ManageGym
          role={'user'}
          membershipUserDetails={membershipUserDetails.data}
          gymDetails={gymsDetails.data as Gym}
          gymId={params.id}
        ></ManageGym>
      </div>
      <FloatingDockDemo></FloatingDockDemo>
    </div>
  );
}

async function getGymDetails(id: string) {
  try {
    const response = await prisma.gym.findUnique({
      where: {
        id,
      },
      include: {
        memberships: {
          select: {
            id: true,
            duration: true,
            description: true,
            color: true,
            price: true,
            users: true,
          },
        },
      },
    });
    if (!response) {
      return { error: 'Gym Details doest not exist' };
    }

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot Process Request at the moment' };
  }
}

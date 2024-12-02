import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { WarningShower } from './warningShower';

export const MembershipExpiringWarning = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  const response = await getMembership(session.user.id);
  if (response.error) {
    return (
      <div className="text-5xl font-bold text-center">{response.error}</div>
    );
  }

  return <WarningShower data={response.data}></WarningShower>;
};

async function getMembership(id: string) {
  try {
    const response = await prisma.userMembership.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        gym: {
          select: {
            name: true,
          },
        },
        membership: {
          select: {
            duration: true,
          },
        },
      },
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to process memberships at the moment' };
  }
}

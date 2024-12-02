import { Zap } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserNotifications } from '@/components/userNotifications';
import { AccessAdmin } from '@/components/accessAdminTools';
import { UserLogOut } from '@/components/userLogoutButton';
import prisma from '@/lib/db';
import { WarningShower } from '@/components/warningShower';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect('/signin');
  }

  const response = await getMembership(session.user.id);
  return (
    <>
      <div className="p-5 flex">
        <WarningShower data={response.data} />
        <Link className="flex items-center justify-center" href="/">
          <Zap fill="Black" size={50}></Zap>
          <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-white">
            Zeus
          </span>
        </Link>

        <AccessAdmin></AccessAdmin>

        <div className="border border-black bg-slate-100 fixed right-5 z-50 top-2  rounded-3xl px-4 space-x-5 py-2 flex items-center ">
          <UserNotifications
            name={session?.user.name as string}
            provider={session.user.provider}
            image={session.user.image}
          ></UserNotifications>
          <p className="font-bold text-lg">{session.user.name}</p>
          <UserLogOut></UserLogOut>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}

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

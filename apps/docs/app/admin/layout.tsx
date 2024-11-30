import SidebarHome from '@/components/SidebarHome';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  return <SidebarHome session={session}>{children}</SidebarHome>;
}

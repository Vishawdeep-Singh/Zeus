import { Signup } from '@/components/SignUp';
import { authOptions } from '@/lib/auth';
import { SignUp } from '@/types/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/user');
  }
  return <Signup />;
}

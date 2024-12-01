'use client';
import { handleAccessingAdminTools } from '@/actions/updateRole';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const AccessAdmin = () => {
  const { data: session, update } = useSession();
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (session?.user.role) {
      setRole(session.user.role);
    }
  }, [session?.user.role]);

  const router = useRouter();
  if (role === 'USER') {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" absolute transform -translate-x-1/2 left-1/2">
            Access Admin Tools
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Accessing Admin Tools means you are owner of a gym
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const response = await handleAccessingAdminTools();
                if (response.data) {
                  await update({
                    ...session,
                    user: {
                      ...session?.user,
                      role: 'ADMIN',
                    },
                  });
                  router.refresh();

                  router.push('/admin/dashboard');
                } else if (response.error) {
                  toast.error(`${response.error}`, {
                    closeButton: true,
                    position: 'top-center',
                  });
                }
              }}
            >
              Go to admin tools
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (role === 'ADMIN') {
    return (
      <Button
        onClick={() => {
          router.push('/admin/dashboard');
        }}
        className=" absolute transform -translate-x-1/2 left-1/2"
      >
        Go To Admin Tools
      </Button>
    );
  }
  return null;
};

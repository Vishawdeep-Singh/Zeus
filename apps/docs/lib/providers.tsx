'use client';
import { WebSocketProvider } from '@/context/socketContext';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <WebSocketProvider>{children}</WebSocketProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};

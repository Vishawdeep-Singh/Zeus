import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="grid gap-9 grid-cols-2 max-w-7xl mx-auto px-4 py-20 scroll-smooth overflow-auto">
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="rounded-2xl dark p-8 space-y-4 flex flex-col  h-full w-full  overflow-hidden bg-slate-400 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative">
        <div className="self-center">
          <Skeleton className="h-10 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="self-center">
          <Skeleton className="h-60 w-[530] rounded-3xl"></Skeleton>
        </div>
        <div className="space-y-2 ml-5">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

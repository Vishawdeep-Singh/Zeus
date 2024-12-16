import Image from 'next/image';
import { Tabs } from './ui/tabs';
import { GymFilter } from './gymFilter';
import { GymsData, MasterTableMember } from '@/types/types';
import { lazy, Suspense } from 'react';

const Component = lazy(() => import('./attendanceWeeks'));
const Component1 = lazy(() => import('./revenueMonths'));
const Component2 = lazy(() => import('./todayAttendance'));
const Component3 = lazy(() => import('./membershipExpiry'));
const MasterTable = lazy(() => import('./masterTable'));

export function TabsDemo({
  masterTableData,
  ownedGyms,
  membershipExpiry,
}: {
  masterTableData: MasterTableMember[];
  ownedGyms: { gymId: string; gymName: string }[];
  membershipExpiry: GymsData;
}) {
  const tabs = [
    {
      title: 'Analytics',
      value: 'product',
      content: (
        <Suspense fallback={<p>Loading Analytics...</p>}>
          <div className="w-full space-y-10  overflow-hidden  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br bg-white  border-black ">
            <div className="flex space-x-10 w-full items-center">
              <p>Analytics</p>
              <div>
                <GymFilter ownedGyms={ownedGyms}></GymFilter>
              </div>
            </div>

            <div className="flex  space-y-10 flex-col ">
              <div className="flex flex-wrap space-x-5">
                <Component></Component>
                <Component1></Component1>
              </div>
            </div>
          </div>
        </Suspense>
      ),
    },
    {
      title: 'Membership Expiry',
      value: 'services',
      content: (
        <Suspense fallback={<p>Loading Membership Expiry...</p>}>
          <div className="w-full space-y-10 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br  bg-white  ">
            <p>Membership Expiry</p>
            <div className=" flex flex-col space-y-5">
              <GymFilter ownedGyms={ownedGyms}></GymFilter>
              <Component3 membershipExpiry={membershipExpiry}></Component3>
            </div>
          </div>
        </Suspense>
      ),
    },
    {
      title: "Today's Visits",
      value: "Today's Visits",
      content: (
        <Suspense fallback={<p>Loading Today's Visits</p>}>
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br  bg-white ">
            <div className="flex text-black justify-center p-5">
              <GymFilter ownedGyms={ownedGyms}></GymFilter>
            </div>
            <Component2></Component2>
          </div>
        </Suspense>
      ),
    },
    {
      title: 'Master Search',
      value: 'Master Search',
      content: (
        <Suspense fallback={<p>Loading Master Search</p>}>
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br  bg-white ">
            <MasterTable
              ownedGyms={ownedGyms}
              membersData={masterTableData}
            ></MasterTable>
          </div>
        </Suspense>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px]  relative b flex flex-col  mx-auto w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}

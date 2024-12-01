'use client';

import { TrendingUp } from 'lucide-react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getTodayAttendance } from '@/actions/getTodaysAttendance';
import { toast } from 'sonner';
import { AttedanceGymFilterState } from '@/states/filters';
import { useRecoilValue } from 'recoil';
import { Attendances } from '@/types/types';
import MultiAvatar from './Multiavatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const description = 'A radial chart with text';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: 'black',
  },
} satisfies ChartConfig;

type User = {
  userId: number;
  userName: string;
  provider: string;
  image?: string | null | undefined;
};
export function Component2() {
  const router = useRouter();
  const gymFilterValue = useRecoilValue(AttedanceGymFilterState);
  const [allGymAttendancesData, setAllGymAttendancesData] = useState<
    Attendances[]
  >([]);
  const [attendances, setAttendances] = useState<number>(0);
  const [members, setMembers] = useState<User[] | null>(null);
  const [chartData, setChartData] = useState<{ visitors: number }[]>([
    { visitors: 0 },
  ]);

  useEffect(() => {
    async function fetchTodayAttendance() {
      const response = await getTodayAttendance();
      if (response.error) {
        toast.error(`${response.error}`, {
          closeButton: true,
          position: 'top-center',
        });
      }

      if (response.data) {
        setAllGymAttendancesData(response.data);
      }
    }
    fetchTodayAttendance();
  }, []);

  useEffect(() => {
    if (gymFilterValue && allGymAttendancesData.length > 0) {
      const gymAttendanceData = allGymAttendancesData.find(
        (obj) => obj.id === gymFilterValue
      );

      const finalFilterdAttendance = gymAttendanceData?.attendance.filter(
        (obj) => {
          const date = new Date().toLocaleDateString();
          return date === obj.date;
        }
      );
      const members = finalFilterdAttendance?.map((attendanceData) => {
        const userName = attendanceData.users.name;
        const userId = attendanceData.userId;
        const provider = attendanceData.users.provider;
        const image = attendanceData.users.image;
        return {
          userId,
          userName,
          provider,
          image,
        };
      });
      if (members) {
        setMembers(members);
      }
      if (finalFilterdAttendance) {
        setAttendances(finalFilterdAttendance.length);
        setChartData([{ visitors: finalFilterdAttendance.length }]);
      }
    }
  }, [gymFilterValue, allGymAttendancesData]);
  return (
    <div className="flex justify-center space-x-24">
      <Card className="flex max-w-md bg-[#f7f7f7] flex-col hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
        <CardHeader className="items-center pb-0">
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription className="text-lg">
            {new Date().toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1  pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto flex-1 aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={250}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {attendances.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="max-w-3xl min-w-96  max-h-[400px] items-center flex bg-[#f7f7f7] flex-col hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
        <CardTitle className="mt-5">Members</CardTitle>
        <CardContent className="overflow-y-auto mt-5 space-y-5">
          {members &&
            members.length > 0 &&
            members.map((userData) => {
              return (
                <a
                  href={`/profile?userId=${userData.userId}`}
                  key={userData.userId}
                  className="flex items-center space-x-10 hover:bg-white p-3 rounded-md cursor-pointer"
                >
                  {userData.provider === 'google' ? (
                    <Image
                      src={userData.image as string}
                      className="h-10 w-10 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ) : (
                    <MultiAvatar
                      className="h-10 w-10"
                      name={userData.userName}
                    />
                  )}
                  <p className="font-semibold">{userData.userName}</p>
                </a>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}

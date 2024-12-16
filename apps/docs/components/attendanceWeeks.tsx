'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getLastSevenDaysAttendance } from '@/actions/Last7DaysAttendance';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { AttedanceGymFilterState } from '@/states/filters';
import MultiAvatar from './Multiavatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { sevenDaysAttendance } from '@/states/attendance';
// const chartData = [
//   { day: "Monday", attendance: 186 , members:[]},
//   { day: "Tuesday", attendance: 305 },
//   { day: "Wednesday", attendance: 237 },
//   { day: "Thursday", attendance: 473 },
//   { day: "Friday", attendance: 209 },
//   { day: "Saturday", attendance: 214 },
//   { day: "Sunday", attendance: 295 },
// ];
const CACHE_DURATION = 60 * 60 * 1000;
const chartConfig = {
  attendance: {
    label: 'Attendance',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;
type DayEntry = {
  day: string;
  attendance: number;
  members: User[];
};
type User = {
  userId: Number;
  userName: string;
  provider: string;
  image?: string | null | undefined;
};
export default function Component() {
  const [selectedDayMembers, setSelectedDayMembers] = useState<User[] | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const CustomTooltip = ({ active, payload, label }: any) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;

  //     return (
  //       <div className="bg-white overflow-auto h-fit border rounded-lg  shadow-xl p-4">
  //         <p className="font-bold text-sm">{label}</p>
  //         <p className="text-primary text-sm">Attendances: {data.attendance}</p>
  //         <p className="font-bold text-xl mt-5">Members</p>

  //         <div className="h-full w-full mt-5">
  //           <ul className="space-y-3 overflow-auto">
  //             {data.members.length > 0 &&
  //               data.members.map((data: any) => {
  //                 return (
  //                   <li className="flex  space-x-5 items-center">
  //                     <MultiAvatar
  //                       className="h-10 w-10"
  //                       name={data.userName}
  //                     ></MultiAvatar>
  //                     <p className="text-base">{data.userName}</p>
  //                   </li>
  //                 );
  //               })}
  //           </ul>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return null;
  // };
  const gymFilterValue = useRecoilValue(AttedanceGymFilterState);
  const [sevenDayAttendance, setSevenDayAttendance] =
    useRecoilState(sevenDaysAttendance);
  const [chartData, setChartData] = useState<DayEntry[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<String | null>(null);

  useEffect(() => {
    async function fetchData() {
      const currentTime = new Date().getTime();
      const cachedData = sevenDayAttendance[gymFilterValue as string];
      if (
        cachedData &&
        cachedData.expiration &&
        cachedData.expiration > currentTime
      ) {
        console.log('Using cached data');
        setChartData(cachedData.data);
        return;
      }
      console.log('Not cached');
      const response = await getLastSevenDaysAttendance();

      const attendances = response.data?.find(
        (attendance) => attendance.id === gymFilterValue
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      const sevenDaysAgoAttendances = attendances?.attendance
        .filter((attendance, i) => {
          const attendDate = new Date(attendance.date);
          return attendDate >= sevenDaysAgo && attendDate <= today;
        })
        .map((attendance, i) => {
          const attendDate = new Date(attendance.date);
          const userId = attendance.users.id;
          const userName = attendance.users.name;
          const provider = attendance.users.provider;
          const image = attendance.users.image;
          const newDate = attendDate.toLocaleDateString('en-us', {
            weekday: 'long',
          });
          return { newDate, userId, userName, provider, image };
        });
      const getLast7Days = (): DayEntry[] => {
        const days: DayEntry[] = [];
        const today = new Date();

        for (let i = 1; i < 7; i++) {
          const day = new Date(today);
          day.setDate(today.getDate() - i);
          const dayName = day.toLocaleDateString('en-us', { weekday: 'long' });
          days.push({ day: dayName, attendance: 0, members: [] });
        }

        return days;
      };

      const last7Days = getLast7Days();

      sevenDaysAgoAttendances?.forEach((day) => {
        const dayEntry = last7Days.find((d) => d.day === day.newDate);
        if (dayEntry) {
          dayEntry.attendance += 1;
          const userobj = {
            userId: day.userId,
            userName: day.userName,
            provider: day.provider,
            image: day.image,
          };
          dayEntry.members.push(userobj);
        }
      });

      const finalData = last7Days;
      setChartData(finalData);

      setSevenDayAttendance((prevCache) => ({
        ...prevCache,
        // @ts-ignore
        [gymFilterValue]: {
          data: last7Days,
          expiration: currentTime + CACHE_DURATION,
        },
      }));
    }
    fetchData();
  }, [gymFilterValue, sevenDayAttendance]);

  return (
    <div className="w-[50%]  h-full">
      <Card className=" w-[100%] bg-[#f7f7f7] h-full hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
        <CardHeader>
          <CardTitle>Daily Attendance Chart</CardTitle>
          <CardDescription>Last 7 Days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[150px]">
            <BarChart
              accessibilityLayer
              data={chartData!}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                className="cursor-pointer"
                onClick={(data) => {
                  const dayData = data;
                  if (dayData && dayData.members.length > 0) {
                    setSelectedDayMembers(dayData.members);
                    setIsDialogOpen(true);
                    setSelectedDay(data.day);
                  }
                }}
                dataKey="attendance"
                fill="black"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% today <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total attendance for the last 7 days
          </div>
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Members Present on {selectedDay}</DialogTitle>
            <DialogDescription>
              {selectedDayMembers?.length} Attendances
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDayMembers?.map((member) => (
              <a
                href={`/profile?userId=${member.userId}`}
                key={member.userId.toString()}
                className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                {member.provider === 'google' ? (
                  <Image
                    src={member.image as string}
                    className="h-10 w-10 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                    priority
                  />
                ) : (
                  <MultiAvatar className="h-10 w-10" name={member.userName} />
                )}

                <span className="text-base">{member.userName}</span>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

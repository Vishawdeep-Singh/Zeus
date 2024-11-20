"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getLastSevenDaysAttendance } from "@/actions/Last7DaysAttendance";
import { useRecoilValue } from "recoil";
import { AttedanceGymFilterState } from "@/states/filters";
// const chartData = [
//   { day: "Monday", attendance: 186 },
//   { day: "Tuesday", attendance: 305 },
//   { day: "Wednesday", attendance: 237 },
//   { day: "Thursday", attendance: 473 },
//   { day: "Friday", attendance: 209 },
//   { day: "Saturday", attendance: 214 },
//   { day: "Sunday", attendance: 295 },
// ];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  const gymFilterValue = useRecoilValue(AttedanceGymFilterState);
  const [chartData, setChartData] = useState<
    { day: string; attendance: number }[] | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getLastSevenDaysAttendance();
      console.log(response.data);
      const attendances = response.data?.find(
        (attendance) => attendance.id === gymFilterValue
      );
      console.log(attendances);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to the start of the day for accuracy

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      console.log(today);
      console.log(sevenDaysAgo);

      const sevenDaysAgoAttendances = attendances?.attendance
        .filter((attendance, i) => {
          const attendDate = new Date(attendance.date);
          return attendDate >= sevenDaysAgo && attendDate <= today;
        })
        .map((attendance, i) => {
          const attendDate = new Date(attendance.date);

          const newDate = attendDate.toLocaleDateString("en-us", {
            weekday: "long",
          });
          return newDate;
        });
      const getLast7Days = () => {
        const days = [];
        const today = new Date();

        for (let i = 1; i < 7; i++) {
          const day = new Date(today);
          day.setDate(today.getDate() - i);
          const dayName = day.toLocaleDateString("en-us", { weekday: "long" });
          days.push({ day: dayName, attendance: 0 });
        }

        return days;
      };

      const last7Days = getLast7Days();
      console.log(last7Days);
      sevenDaysAgoAttendances?.forEach((day) => {
        const dayEntry = last7Days.find((d) => d.day === day);
        if (dayEntry) {
          dayEntry.attendance += 1;
        }
      });
      // console.log(last7Days)
      // console.log(sevenDaysAgoAttendances)
      const finalData = last7Days;
      setChartData(finalData);
    }
    fetchData();
  }, [gymFilterValue]);

  return (
    <div className="w-[50%]   h-full">
      <Card className=" w-[100%] bg-[#f7f7f7] h-full hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
        <CardHeader>
          <CardTitle>Daily Attendance Chart</CardTitle>
          <CardDescription>Last 7 Days</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Keep ChartContainer as required by the chart library */}
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
              <Bar dataKey="attendance" fill="black" radius={8}>
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
    </div>
  );
}

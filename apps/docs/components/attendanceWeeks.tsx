"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { day: "Monday", attendance: 186 },
  { day: "Tuesday", attendance: 305 },
  { day: "Wednesday", attendance: 237 },
  { day: "Thursday", attendance: 473 },
  { day: "Friday", attendance: 209 },
  { day: "Saturday", attendance: 214 },
  { day: "Sunday", attendance: 295 },
]

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Component() {
 
    return (
        <div className="w-[50%]  h-full">
          <Card className=" w-[100%] h-full shadow-md">
            <CardHeader>
              <CardTitle>Daily Attendance Chart</CardTitle>
              <CardDescription>Last 7 Days</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Keep ChartContainer as required by the chart library */}
              <ChartContainer config={chartConfig} className="w-full h-[150px]">
                <BarChart
                  accessibilityLayer
                  data={chartData}
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

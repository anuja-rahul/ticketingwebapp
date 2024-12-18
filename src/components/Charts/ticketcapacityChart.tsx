"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
import { useToast } from "@/hooks/use-toast";
import { getTicketPoolStats } from "@/app/lib/Records";
import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { SkeletonCard } from "../UserSkeleton";

interface ChartDataProps {
  yAxis: string;
  load: number;
}

const initialChartData: ChartDataProps[] = [
  { yAxis: "Load", load: 0 },
  { yAxis: "Max", load: 0 },
];

const chartConfig = {
  load: {
    label: "count :",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TicketCapacityChart() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] =
    useState<ChartDataProps[]>(initialChartData);

  const getPoolStats = async () => {
    setIsLoading(true);
    try {
      const response = await getTicketPoolStats();
      if (response.data) {
        // Transform the response to match chart data format
        const newChartData: ChartDataProps[] = [
          { yAxis: "Load", load: response.data.totalTickets },
          { yAxis: "Max", load: response.data.totalCapacity },
        ];
        setChartData(newChartData);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch ticket pool stats",
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPoolStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="full sm:w-[350px] lg:w-full">
        <CardHeader className="flex flex-col items-start justify-center w-full">
          <CardTitle className="flex flex-row items-center justify-between w-full">
            <span className="">System Capacity</span>
            <Button
              variant="outline"
              size="sm"
              className="text-foreground hover:bg-primary/10 items-center space-x-2 duration-300
                    hover:translate-y-[-3px] def_btn hover:text-foreground hover:border-primary/30 rounded-3xl flex justify-end"
              onClick={() => {
                getPoolStats();
              }}
            >
              <RefreshCcw className={clsx("h-4 w-4", {"animate-spin": isLoading})} />
              <span>Refresh</span>
            </Button>
          </CardTitle>
          <CardDescription>realtime</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // <div>Loading...</div>
            <SkeletonCard />
          ) : (
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: -0,
                }}
              >
                <XAxis type="number" dataKey="load" hide />
                <YAxis
                  dataKey="yAxis"
                  type="category"
                  tickLine={false}
                  tickMargin={15}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 5)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="load" fill="var(--color-load)" radius={5} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground flex flex-row text-balance py-1 gap-2">
            Showing total system capacity (tickets).
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

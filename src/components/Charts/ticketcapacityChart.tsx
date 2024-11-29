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
    label: "amount",
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
      <Card className="full sm:w-[350px] lg:w-[500px]">
        <CardHeader>
          <CardTitle>System Capacity</CardTitle>
          <CardDescription>realtime</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
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
          <div className="leading-none text-muted-foreground">
            Showing total system capacity (tickets).
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

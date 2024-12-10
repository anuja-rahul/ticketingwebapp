"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  getHistoryStats,
  HistoryStats,
  HistoryStatsRaw,
} from "@/app/lib/Statistics";
import { LongSkeletonCard } from "../UserSkeleton";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import clsx from "clsx";

export function formatDateArray(dateArray: number[]): string {
  const [year, month, day] = dateArray;
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}

const chartData: HistoryStats[] = [
  { date: "9999-01-01", totalSales: 0, totalUsers: 0 },
  { date: "9999-12-31", totalSales: 0, totalUsers: 0 },
];

const chartConfig = {
  activity: {
    label: "Activity",
  },
  totalSales: {
    label: "totalSales",
    color: "hsl(var(--chart-1))",
  },
  totalUsers: {
    label: "totalUsers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function PlatformHistoryGraph() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [graphtData, setGraphData] = React.useState<HistoryStats[]>(chartData);

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const response = await getHistoryStats();
      if (response.data) {
        const formattedData = response.data.map((item: HistoryStatsRaw) => ({
          ...item,
          date: formatDateArray(item.date),
        }));
        setGraphData(formattedData);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch history records",
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = graphtData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-12-10");
    let daysToSubtract = 365;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full mt-8">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Platform Activity Chart - Users and Sales</CardTitle>
          <CardDescription>
            Showing total activities upto last 12 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 12 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="text-foreground hover:bg-primary/10 items-center space-x-2 duration-300
                    hover:translate-y-[-3px] def_btn hover:text-foreground hover:border-primary/30 rounded-3xl flex justify-end"
          onClick={() => {
            getHistory();
          }}
        >
          <RefreshCcw
            className={clsx("h-4 w-4", { "animate-spin": isLoading })}
          />
          <span>Refresh</span>
        </Button>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <LongSkeletonCard />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="filltotalSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-totalSales)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-totalSales)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="filltotalUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-totalUsers)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-totalUsers)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="totalUsers"
                type="natural"
                fill="url(#filltotalUsers)"
                stroke="var(--color-totalUsers)"
                stackId="a"
              />
              <Area
                dataKey="totalSales"
                type="natural"
                fill="url(#filltotalSales)"
                stroke="var(--color-totalSales)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

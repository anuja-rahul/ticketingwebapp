"use client";

import { RefreshCcw, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { useEffect, useState } from "react";
import {
  getThreadPoolStats,
  TransformedTicketThreadPoolStats,
} from "@/app/lib/ThreadPool";
import { SkeletonCard } from "../UserSkeleton";
import { Button } from "../ui/button";
import clsx from "clsx";
import { parseDate, transformUserData } from "./threadCapacityGraph";

const chartData: TransformedTicketThreadPoolStats[] = [
  {
    createdAt: parseDate([2023, 0, 0, 0, 0, 0, 0]).toISOString(),
    name: "testName",
    activeThreads: 0,
    idleThreads: 0,
    totalThreads: 0,
  },
  {
    createdAt: parseDate([2023, 0, 0, 0, 0, 0, 0]).toISOString(),
    name: "testName",
    activeThreads: 0,
    idleThreads: 0,
    totalThreads: 0,
  },
  {
    createdAt: parseDate([2023, 0, 0, 0, 0, 0, 0]).toISOString(),
    name: "testName",
    activeThreads: 0,
    idleThreads: 0,
    totalThreads: 0,
  },
];

const chartConfig = {
  activeThreads: {
    label: "activeThreads",
    color: "hsl(var(--chart-1))",
  },
  idleThreads: {
    label: "idleThreads",
    color: "hsl(var(--chart-2))",
  },
  totalThreads: {
    label: "totalThreads",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function TaskCapacityGraph() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] =
    useState<TransformedTicketThreadPoolStats[]>(chartData);

  const getThreadStats = async () => {
    setIsLoading(true);
    try {
      const response = await getThreadPoolStats({
        threadType: "taskExecutor",
      });
      if (response.data) {
        const formattedData = transformUserData(response.data);
        setGraphData(formattedData);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch ticket thread pool stats",
          description: "Please try again later",
        });
        setGraphData(chartData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThreadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mt-6 w-1/2">
      <CardHeader className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-col w-3/5">
          <CardTitle>ThreadPool - TaskExecutor</CardTitle>
          <CardDescription>
            Showing upto 60 of the latest thread pool records
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-foreground hover:bg-primary/10 items-center space-x-2 duration-300
                    hover:translate-y-[-3px] def_btn hover:text-foreground hover:border-primary/30 rounded-3xl flex justify-end"
          onClick={() => {
            getThreadStats();
          }}
        >
          <RefreshCcw
            className={clsx("h-4 w-4", { "animate-spin": isLoading })}
          />
          <span>Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={graphData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="createdAt"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(5, 10)}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient
                  id="fillidleThreads"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-idleThreads)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-idleThreads)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="fillactiveThreads"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-activeThreads)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-activeThreads)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="filltotalThreads"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-totalThreads)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-totalThreads)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="idleThreads"
                type="natural"
                fill="url(#fillidleThreads)"
                fillOpacity={0.4}
                stroke="var(--color-idleThreads)"
                stackId="a"
              />
              <Area
                dataKey="activeThreads"
                type="natural"
                fill="url(#fillactiveThreads)"
                fillOpacity={0.4}
                stroke="var(--color-activeThreads)"
                stackId="a"
              />
              <Area
                dataKey="totalThreads"
                type="natural"
                fill="url(#filltotalThreads)"
                fillOpacity={0.4}
                stroke="var(--color-totalThreads)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full items-start gap-2 text-sm">
          <div className="flex flex-row gap-4">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total Threads{" "}
              <TrendingUp className="h-4 w-4 text-orange-400/80" />
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              Active Threads <TrendingUp className="h-4 w-4 text-blue-400/80" />
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              Idle Threads <TrendingUp className="h-4 w-4 text-teal-400/80" />
            </div>
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Realtime
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

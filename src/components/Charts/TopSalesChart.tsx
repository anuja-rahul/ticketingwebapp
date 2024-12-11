"use client";

import { RefreshCcw, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { FormattedSaleStats, getSalesRecordsStats } from "@/app/lib/Records";
import { SkeletonCard } from "../UserSkeleton";
import { Button } from "../ui/button";
import clsx from "clsx";

const chartData: FormattedSaleStats[] = [
  { vendor: "vendor1", ticketSales: 0, date: "00-00" },
  { vendor: "vendor2", ticketSales: 0, date: "00-00" },
  { vendor: "vendor3", ticketSales: 0, date: "00-00" },
  { vendor: "vendor1", ticketSales: 0, date: "00-00" },
  { vendor: "vendor3", ticketSales: 0, date: "00-00" },
  { vendor: "vendor1", ticketSales: 0, date: "00-00" },
  { vendor: "vendor3", ticketSales: 0, date: "00-00" },
  { vendor: "vendor1", ticketSales: 0, date: "00-00" },
  { vendor: "vendor3", ticketSales: 0, date: "00-00" },
  { vendor: "vendor1", ticketSales: 0, date: "00-00" },
];

const chartConfig = {
  ticketSales: {
    label: "TicketSales",
    color: "hsl(var(--chart-1))",
  },
  date: {
    label: "date",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function TopSalesChart() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedChartData, setUpdatedChartData] =
    useState<FormattedSaleStats[]>(chartData);

  const getSalesStats = async () => {
    setIsLoading(true);
    try {
      const response = await getSalesRecordsStats();
      if (response.data) {
        const formattedData = response.data.map((item) => {
          const [, month, day] = item.date; // Destructure and ignore the year
          return {
            ...item,
            date: `${String(month).padStart(2, "0")}-${String(day).padStart(
              2,
              "0"
            )}`, // Format as MM-DD
          };
        });
        setUpdatedChartData(formattedData);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch top sales stats",
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSalesStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between w-full">
          <span>Top Sellers - Sorted by Sales per date</span>
          <Button
            variant="outline"
            size="sm"
            className="text-foreground hover:bg-primary/10 items-center space-x-2 duration-300
                    hover:translate-y-[-3px] def_btn hover:text-foreground hover:border-primary/30 rounded-3xl flex justify-end"
            onClick={() => {
              getSalesStats();
            }}
          >
            <RefreshCcw
              className={clsx("h-4 w-4", { "animate-spin": isLoading })}
            />
            <span>Refresh</span>
          </Button>
        </CardTitle>
        <CardDescription>daily updated</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={updatedChartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="date"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <XAxis dataKey="ticketSales" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="ticketSales"
                layout="vertical"
                fill="var(--color-ticketSales)"
                radius={4}
              >
                <LabelList
                  dataKey="vendor"
                  position="insideLeft"
                  offset={8}
                  className="fill-background/80 font-bold"
                  fontSize={12}
                />
                <LabelList
                  dataKey="ticketSales"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Top sellers <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total results upto top 10 sales records of all time
        </div>
      </CardFooter>
    </Card>
  );
}

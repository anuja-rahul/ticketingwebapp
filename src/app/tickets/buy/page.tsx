"use client";

import { getAllVendorConfigs } from "@/app/lib/EventConfigCruds";
import BuyActionButtons from "@/components/DataTables/BuyTable/BuyActionButton";
import { DataTable } from "@/components/DataTables/DataTable";
import {
  VendorStatAction,
  VendorStats,
} from "@/components/DataTables/EventTableComponent";
import { BuyColumns } from "@/components/DataTables/BuyTable/BuyDataColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkeletonCardTable } from "@/components/UserSkeleton";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sell() {
  const [, setTicketStats] = useState<VendorStats[] | null>(null);
  const [ticketStatsAction, setTicketStatsAction] = useState<
    VendorStatAction[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const pathname = usePathname();

  const getTicketStats = async () => {
    setIsLoading(true);
    try {
      const response = await getAllVendorConfigs();
      if (response?.data) {
        setTicketStats(response.data);
        const ticketStatsWithActions: VendorStatAction[] = response.data.map(
          (stat) => ({
            ...stat,
            action: <BuyActionButtons eventName={stat.eventName} />,
          })
        );
        setTicketStatsAction(ticketStatsWithActions);
        // console.log(ticketStatsWithActions);
      } else {
        setTicketStats(null);
        setTicketStatsAction(null);
        toast({
          variant: "destructive",
          title: "Failed to fetch ticket stats",
          description: "Please try again later",
        });
      }
    } catch (error) {
      console.error("Failed to fetch ticket stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTicketStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tickets">tickets</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tickets/buy">buy</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Buy Tickets
        </h1>
        <Separator className="my-4 bg-muted-foreground w-3/5" />
        <p className="mb-2">Womp Womp</p>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-4/5 mt-16">
            <SkeletonCardTable />
          </div>
        ) : (
          <div className="w-[88%]">
            <div className="w-full flex flex-col items-end justify-start">
              <Button
                className="border border-primary/40"
                variant={"outline"}
                onClick={() => {
                  getTicketStats();
                }}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            <DataTable columns={BuyColumns} data={ticketStatsAction || []} />
          </div>
        )}
      </div>
    </section>
  );
}

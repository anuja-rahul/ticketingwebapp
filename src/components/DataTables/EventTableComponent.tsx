import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SellActionButtons, {
  ActionButtonProps,
} from "./SellTable/SellActionButton";
import { getVendorConfigs } from "@/app/lib/UserCrud";
import { SkeletonCardTable } from "../UserSkeleton";
import { DataTable } from "./DataTable";
import { EventColumns } from "./ProfileDataColumns";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

interface VendorStats {
  id: number;
  eventName: string;
  email: string;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

interface VendorStatAction extends VendorStats {
  action: React.ReactNode;
}

interface EventTableComponentProps {
  SpecialButton?: React.ComponentType<ActionButtonProps>;
}

export default function EventTableComponent({
  SpecialButton,
}: EventTableComponentProps) {
  const [, setVendorStats] = useState<VendorStats[] | null>(null);
  const [vendorStatsAction, setVendorStatsAction] = useState<
    VendorStatAction[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const pathname = usePathname();

  const getVendorStats = async () => {
    setIsLoading(true);
    try {
      const response = await getVendorConfigs();
      if (response?.data) {
        setVendorStats(response.data);
        const vendorStatsWithActions: VendorStatAction[] = response.data.map(
          (stat) => ({
            ...stat,
            action: SpecialButton ? (
              <SpecialButton eventName={stat.eventName} />
            ) : (
              <SellActionButtons eventName={stat.eventName} />
            ),
          })
        );
        setVendorStatsAction(vendorStatsWithActions);
      } else {
        setVendorStats(null);
        setVendorStatsAction(null);
        toast({
          variant: "destructive",
          title:
            "Failed getting vendor stats: " + new Date().toLocaleTimeString(),
          description: "Something went wrong...",
        });
      }
    } catch (error) {
      console.error("Failed to fetch vendor stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVendorStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
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
                getVendorStats();
              }}
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          <DataTable columns={EventColumns} data={vendorStatsAction || []} />
        </div>
      )}
    </>
  );
}

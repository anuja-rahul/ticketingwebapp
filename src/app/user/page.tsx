"use client";

import "./index.scss";
import { useEffect, useState } from "react";
import {
  getCustomerTicketConfigs,
  getUser,
  // getVendorConfigs,
} from "../lib/UserCrud";
import { usePathname } from "next/navigation";
import { SkeletonCard, SkeletonCardTable } from "@/components/UserSkeleton";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleX, RefreshCcw } from "lucide-react";
import React from "react";
import CustomerActionButtons from "@/components/DataTables/CustomerTable/CustomerActionButton";
import { DataTable } from "@/components/DataTables/DataTable";
import {
  Ticket,
  TicketColumns,
} from "@/components/DataTables/ProfileDataColumns";
// import VendorActionButtons from "@/components/DataTables/VendorTable/VendorActionButton";
import EventTableComponent from "@/components/DataTables/EventTableComponent";

interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: number[];
}

export interface CustomerTicketStats {
  customerEmail: string;
  eventName: string;
  ticketsBought: number;
  createdAt: string;
  updatedAt: string;
}

interface CustomerTicketStatsAction extends Ticket {
  action: React.ReactNode;
}

export default function User() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [customerStats, setCustomerStats] = useState<
    CustomerTicketStats[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [message, setMessage] = useState<boolean>(true);
  const [customerStatsAction, setCustomerStatsAction] = useState<
    CustomerTicketStatsAction[] | null
  >(null);

  const pathname = usePathname();
  const { toast } = useToast();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      setMessage(true);
      const response = await getUser();
      if (response?.data) {
        setUser(response.data as UserModel);
      } else {
        setUser(null);
        toast({
          variant: "destructive",
          title: "Failed getting user: " + new Date().toLocaleTimeString(),
          description: "Something went wrong...",
        });
        setMessage(false);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerStats = async () => {
    setIsTableLoading(true);
    try {
      const response = await getCustomerTicketConfigs();
      if (response?.data) {
        setCustomerStats(response.data);
        const customerStatsWithActions: CustomerTicketStatsAction[] =
          response.data.map((stat) => ({
            ...stat,
            action: (
              <CustomerActionButtons
                eventName={stat.eventName}
                refreshMethod={getCustomerStats}
              />
            ),
          }));
        setCustomerStatsAction(customerStatsWithActions);
      } else {
        setCustomerStats(null);
        setCustomerStatsAction(null);
        toast({
          variant: "destructive",
          title:
            "Failed getting customer stats: " + new Date().toLocaleTimeString(),
          description: "Something went wrong...",
        });
      }
    } catch (error) {
      console.error("Failed to fetch customer stats", error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!user) return;
    // if (user.role === "VENDOR") {
    //   getVendorStats();
    // }
    // else
    if (user.role === "CUSTOMER") {
      getCustomerStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          User Profile
        </h1>
        <Separator className="my-4 bg-muted-foreground w-2/5" />
        {isLoading ? (
          <SkeletonCard />
        ) : user ? (
          <div className="p-1 h-auto mb-8">
            <Card className="w-full min-w-[400px] max-w-md overflow-hidden border rounded-3xl">
              <div
                className="bg-gradient-to-br from-primary/30 to-muted/30 px-6 py-6 z-1
                flex flex-col items-center justify-center w-full h-auto gap-4 rounded-3xl"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4 gap-4">
                    {Object.entries(user).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <Label
                          htmlFor={key}
                          className="font-medium text-muted-foreground capitalize text-right self-center"
                        >
                          {key}:
                        </Label>
                        <p
                          id={key}
                          className="text-foreground font-semibold self-center"
                        >
                          {value}
                        </p>
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
                <div className="flex flex-col items-end justify-end w-full mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-foreground hover:bg-primary/10 flex items-center space-x-2 duration-300
                    hover:translate-y-[-3px] def_btn hover:text-foreground hover:border-primary/30 rounded-3xl"
                    onClick={() => {
                      fetchUser();
                      // if (user?.role === "VENDOR") {
                      //   getVendorStats();
                      // } else
                      if (user?.role === "CUSTOMER") {
                        getCustomerStats();
                      }
                    }}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span>Refresh</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : message ? (
          <p>loading profile...</p>
        ) : (
          <p className="text-red-700 flex flex-row gap-2">
            {" "}
            <CircleX /> Error loading user profile...{" "}
          </p>
        )}
        <div className="user-page">
          {user?.role === "VENDOR" ? (
            <div className="mt-4 w-screen px-10 flex flex-col items-center justify-start">
              <h2 className="text-3xl text-center text-balance font-bold my-2">
                Event Configurations
              </h2>
              <Separator className="my-8 bg-muted-foreground w-2/5" />

              {/* <div className="w-[88%]">
                <DataTable
                  data={vendorStatsAction || []}
                  columns={EventColumns}
                />
              </div> */}
              <EventTableComponent />
            </div>
          ) : user?.role === "CUSTOMER" && customerStats ? (
            <div className="mt-4 w-screen px-10 flex flex-col items-center justify-start">
              <h2 className="text-3xl text-center text-balance font-bold my-2">
                Your Tickets
              </h2>
              <Separator className="my-8 bg-muted-foreground w-2/5" />

              <div className="w-[85%]">
                <div className="w-full flex flex-col items-end justify-start">
                  <Button
                    className="border border-primary/40"
                    variant={"outline"}
                    onClick={() => {
                      getCustomerStats();
                    }}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
                {!isTableLoading ? (
                  <DataTable
                    columns={TicketColumns}
                    data={customerStatsAction || []}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-auto">
                    <SkeletonCardTable />
                  </div>
                )}
              </div>
            </div>
          ) : (
            message ?? <p className="my-2">Loading history...</p>
          )}
        </div>
      </div>
    </section>
  );
}

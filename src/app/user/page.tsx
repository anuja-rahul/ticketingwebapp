"use client";

import "./index.scss";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import {
  getCustomerTicketConfigs,
  getUser,
  getVendorConfigs,
} from "../lib/UserCrud";
import { usePathname } from "next/navigation";
import { SkeletonCard } from "@/components/UserSkeleton";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleX, RefreshCcw } from "lucide-react";
import React from "react";
// import CustomerTable from "@/components/DataTables/CustomerTable/CustomerTable";
import ActionButton from "@/components/DataTables/CustomerTable/ActionButton";
import { DataTable } from "@/components/DataTables/CustomerTable/Data-Table";
import { TicketColumns } from "@/components/DataTables/CustomerTable/columns";

interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface VendorStats {
  id: number;
  eventName: string;
  email: string;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

interface CustomerTicketStats {
  customerEmail: string;
  eventName: string;
  ticketsBought: number;
}

interface CustomerTicketStatsAction extends CustomerTicketStats {
  action: React.ReactNode;
}

export default function User() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [vendorStats, setVendorStats] = useState<VendorStats[] | null>(null);
  const [customerStats, setCustomerStats] = useState<
    CustomerTicketStats[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const getVendorStats = async () => {
    setIsLoading(true);
    try {
      setMessage(true);
      const response = await getVendorConfigs();
      if (response?.data) {
        setVendorStats(response.data);
      } else {
        setVendorStats(null);
        toast({
          variant: "destructive",
          title:
            "Failed getting vendor stats: " + new Date().toLocaleTimeString(),
          description: "Something went wrong...",
        });
        setMessage(false);
      }
    } catch (error) {
      console.error("Failed to fetch vendor stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerStats = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomerTicketConfigs();
      if (response?.data) {
        setCustomerStats(response.data);
        const customerStatsWithActions: CustomerTicketStatsAction[] =
          response.data.map((stat) => ({
            ...stat,
            action: <ActionButton eventName={stat.eventName} />,
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "VENDOR") {
      getVendorStats();
    } else if (user.role === "CUSTOMER") {
      getCustomerStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-start justify-start w-full h-auto">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">User</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          User Profile
        </h1>
        <Separator className="my-4 bg-muted-foreground w-3/5" />
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
                    className="text-primary hover:bg-primary/10 flex 
                    items-center space-x-2 duration-300 hover:translate-y-[-4px] def_btn hover:text-foreground hover:border-primary/30"
                    onClick={() => {
                      fetchUser();
                      getCustomerStats();
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
          {user?.role === "VENDOR" && vendorStats ? (
            <div className="mt-4 w-full max-w-md">
              <h2 className="text-2xl">Event Configurations</h2>
              <ul className="max-h-80 overflow-y-auto">
                {vendorStats.map((vendor) => (
                  <li
                    key={vendor.id}
                    className="p-4 border rounded-md shadow-md mt-2"
                  >
                    <p>
                      <strong>Event Name:</strong> {vendor.eventName}
                    </p>
                    <p>
                      <strong>Total Tickets:</strong> {vendor.totalTickets}
                    </p>
                    <p>
                      <strong>Ticket Release Rate:</strong>{" "}
                      {vendor.ticketReleaseRate}
                    </p>
                    <p>
                      <strong>Customer Retrieval Rate:</strong>{" "}
                      {vendor.customerRetrievalRate}
                    </p>
                    <p>
                      <strong>Max Ticket Capacity:</strong>{" "}
                      {vendor.maxTicketCapacity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : user?.role === "CUSTOMER" && customerStats ? (
            <div className="mt-4 w-screen px-10 flex flex-col items-center justify-start">
              <h2 className="text-3xl text-center text-balance font-bold my-2">
                Purchase History
              </h2>
              <Separator className="my-8 bg-muted-foreground w-2/5" />

              <div className="w-4/5">
                <DataTable
                  columns={TicketColumns}
                  data={customerStatsAction || []}
                />
              </div>

              {/* <ul className="max-h-80 overflow-y-auto w-4/5 mt-5">
                {customerStats.map((customer, index) => (
                  <li
                    key={`${customer.customerEmail}-${customer.eventName}-${index}`}
                    className="p-4 border rounded-md shadow-md mt-2"
                  >
                    <p>
                      <strong>Event Name:</strong> {customer.eventName}
                    </p>
                    <p>
                      <strong>Email:</strong> {customer.customerEmail}
                    </p>
                    <p>
                      <strong>Tickets Bought:</strong> {customer.ticketsBought}
                    </p>
                  </li>
                ))}
              </ul> */}
            </div>
          ) : (
            message ?? <p className="my-2">Loading history...</p>
          )}
        </div>
      </div>
    </section>
  );
}

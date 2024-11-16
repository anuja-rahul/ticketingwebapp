"use client";

import EventTableComponent from "@/components/DataTables/EventTableComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function Sell() {
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
              <BreadcrumbLink href="/tickets/sell">sell</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Sell Tickets
        </h1>
        <Separator className="my-4 bg-muted-foreground w-2/5" />
        <p className="mb-2 text-center text-balance flex-wrap px-4 w-4/5">
        <span className="text-primary/80">Review</span>, <span className="text-yellow-500/80">Update</span> or 
          <span className="text-destructive"> Delete</span> any or all the tickets you have up for sale.
        </p>
      </div>
      <EventTableComponent />
      {/* <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-4/5 mt-16">
            <SkeletonCardTable />
          </div>
        ) : (
          <div className="w-[88%] flex flex-col items-center justify-center">
            <DataTable columns={EventColumns} data={vendorStatsAction || []} />
          </div>
        )}
      </div> */}
    </section>
  );
}

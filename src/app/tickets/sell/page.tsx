"use client";

import EventTableComponent from "@/components/DataTables/EventTableComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createSchema = z.object({
  eventName: z
    .string()
    .min(1, { message: "Event Name is required" })
    .regex(/^[^\s]+$/, { message: "Event Name must not contain spaces" }),
});

type Schema = z.infer<typeof createSchema>;

export default function Sell() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: Schema) {
    setIsLoading(true);
    console.log(data);
    // Create the event
    setIsLoading(false);
  }

  const { create, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(createSchema),
    reValidateMode: "onSubmit",
  });

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
          <span className="text-green-500/80">Create</span>,
          <span className="text-primary/80"> Review</span>,{" "}
          <span className="text-yellow-500/80">Update</span> or
          <span className="text-destructive"> Delete</span> any or all the
          tickets you have up for sale.
        </p>

        <div className="my-8">
          <Card className="w-full min-w-[350px]">
            <CardHeader>
              <CardTitle>Create an Event</CardTitle>
              <CardDescription>
                Deploy your new event tickets in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="mb-1">
                      Event Name
                    </Label>
                    <Input id="name" placeholder="Name of your event" />
                  </div>
                  <div className="flex flex-col space-y-1.5"></div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                disabled={isLoading}
                type="submit"
                className="mt-4 hover:bg-blue-900/60 duration-300"
              >
                Create
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <EventTableComponent />
    </section>
  );
}

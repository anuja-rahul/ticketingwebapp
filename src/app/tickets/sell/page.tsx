"use client";

import { createVendorConfigs } from "@/app/lib/EventConfigCruds";
import EventTableComponent from "@/components/DataTables/EventTableComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
  const [success, setSuccess] = React.useState<boolean>(false);
  const { toast } = useToast();

  async function onSubmit(data: Schema) {
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await createVendorConfigs(data);
      if (response?.data) {
        setSuccess(true);
        toast({
          variant: "default",
          title:
            "Config created successfully : " + new Date().toLocaleTimeString(),
          description:
            "Table will be refreshed momentarily to showcase the latest data...",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed creating config : " + new Date().toLocaleTimeString(),
          description:
            "Please make sure the [Event Name] is unique or try again later...",
        });
        setSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [success]);

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(createSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
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
                    <Label htmlFor="eventName" className="mb-2">
                      Event Name
                    </Label>
                    <Input
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      id="eventName"
                      placeholder="Name of your event"
                      {...register("eventName")}
                    />
                    {formState.errors.eventName && (
                      <small className="text-red-600">
                        {formState.errors.eventName.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5"></div>
                </div>
                <div className="flex justify-end w-full">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="mt-4 hover:bg-blue-900/60 duration-300 border border-foreground/30"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <EventTableComponent />
    </section>
  );
}

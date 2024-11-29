import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateVendorConfigTotalTickets,
  updateVendorConfigTotalTicketsProps,
} from "@/app/lib/EventConfigCruds";
import { useToast } from "@/hooks/use-toast";
export interface ActionButtonProps {
  eventName: string;
  maxTicketCapacity: number;
  refreshMethod: () => void;
}

const SellActionButtons: React.FC<ActionButtonProps> = ({
  eventName,
  maxTicketCapacity,
  refreshMethod,
}) => {
  const updateSchema = z.object({
    totalTickets: z
      .number()
      .min(0, { message: "Total Tickets must be greater than 0" })
      .max(maxTicketCapacity, {
        message: "Total Tickets must be less than {maxTicketCapacity}",
      }),
  });

  type Schema = z.infer<typeof updateSchema>;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const { toast } = useToast();

  // const deleteEventConfig = async () => {};

  async function onSubmit(data: Schema) {
    setSuccess(false);
    setIsLoading(true);

    const updateProps: updateVendorConfigTotalTicketsProps = {
      eventName: eventName,
      totalTickets: data.totalTickets,
    };
    try {
      const response = await updateVendorConfigTotalTickets(updateProps);
      if (response?.data) {
        setSuccess(true);
        toast({
          variant: "default",
          title:
            "Config updated successfully : " + new Date().toLocaleTimeString(),
          description:
            "Table will be refreshed momentarily to showcase the latest data...",
        });
      } else {
        setSuccess(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          "Error occured, please try again : " +
          new Date().toLocaleTimeString(),
        description: "UNKNOWN_ERROR_OCCURED",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        refreshMethod();
      }, 500);
    }
  }, [refreshMethod, success]);

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(updateSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      {/* <Button
        className="px-5"
        variant="outline"
        onClick={() => {
          console.log("Buy button clicked", eventName);
        }}
      >
        Update
      </Button> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="gap-1">
            <DialogTitle>
              Update &quot;{eventName}&quot; Configuration
            </DialogTitle>
            <DialogDescription>
              Make changes to your configuration{"'"}s totalTicket count here. Click
              save when you{"'"}re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* form start */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row items-center gap-4">
                <Label htmlFor="totalTickets" className="text-right">
                  <span className="flex flex-col text-nowrap">
                    Add Tickets
                  </span>
                </Label>
                <Input
                  id="totalTickets"
                  className="col-span-3"
                  type="number"
                  defaultValue={0}
                  min="0"
                  disabled={isLoading}
                  max={maxTicketCapacity}
                  {...register("totalTickets", {
                    setValueAs: (value) => Number(value),
                  })}
                />
              </div>
              <div className="mt-2">
                {formState.errors.totalTickets && (
                  <small className="text-red-600">
                    {formState.errors.totalTickets.message}
                  </small>
                )}
              </div>
              <div className="flex flex-row items-center justify-between w-full mt-8 px-2">
                <DialogTrigger asChild>
                  <Button className="border border-muted-foreground/30" variant={"destructive"}>Close</Button>
                </DialogTrigger>
                <Button className="border border-muted-foreground/30" type="submit">
                  {isLoading ? "updating... " : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="destructive"
        className="scale-90 duration-300 hover:bg-red-700"
        onClick={() => {
          console.log("Delete button clicked", eventName);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default SellActionButtons;

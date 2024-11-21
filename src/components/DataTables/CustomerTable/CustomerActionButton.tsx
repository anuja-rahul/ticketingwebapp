import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import BuyActionButtons, {
  ActionButtonProps,
} from "../BuyTable/BuyActionButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteCustomerTicket } from "@/app/lib/TicketCruds";
import { RefreshCcw } from "lucide-react";

// add delete methods

const CustomerActionButtons: React.FC<ActionButtonProps> = ({
  eventName,
  refreshMethod,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [success, setSuccess] = React.useState<boolean>(false);

  const deleteAction = async () => {
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await deleteCustomerTicket({ eventName });
      if (response) {
        toast({
          variant: "default",
          title: "Ticket(s) deleted successfully",
          description: `You have deleted all ticket(s) under the event "${eventName}"`,
        });
        setSuccess(true);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete ticket(s)",
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        refreshMethod();
      }, 500);
    }
  }, [refreshMethod, success]);

  return (
    <>
      <div className="flex flex-row items-center justify-center w-4/5">
        <BuyActionButtons eventName={eventName} refreshMethod={refreshMethod} />
        {/* <Button
        className="px-5"
        variant="outline"
        onClick={() => {
          console.log("Buy button clicked", eventName);
        }}
      >
        Buy
      </Button> */}
        {/* <Button
          variant="destructive"
          className="scale-90 duration-300 hover:bg-red-700"
          onClick={() => {
            console.log("Delete button clicked", eventName);
          }}
        >
          Delete
        </Button> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="duration-200 hover:bg-red-800/60"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                the tickets you own under the event {"'"}
                {eventName}
                {"'"}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteAction();
                }}
                className="bg-red-900 hover:bg-red-800/60 text-foreground duration-200"
              >
                {isLoading ? <RefreshCcw className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default CustomerActionButtons;

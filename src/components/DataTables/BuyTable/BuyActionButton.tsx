import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addCustomerTicket } from "@/app/lib/TicketCruds";
import { RefreshCcw } from "lucide-react";

// test this sh*t
export interface ActionButtonProps {
  eventName: string;
  refreshMethod: () => void;
}

const BuyActionButtons: React.FC<ActionButtonProps> = ({
  eventName,
  refreshMethod,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [success, setSuccess] = React.useState<boolean>(false);

  const buyAction = async () => {
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await addCustomerTicket({ eventName });
      if (response?.data) {
        toast({
          variant: "default",
          title: "Ticket(s) bought successfully",
          description: `You have bought ${response.data.ticketsBought} ticket(s) for the ${response.data.eventName} event`,
        });
        setSuccess(true);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to buy ticket(s)",
          description: "Check if there's enough tickets or Please try again later",
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
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      {isLoading ? (
        <RefreshCcw className="animate-spin" />
      ) : (
        <Button
          className="px-5"
          variant="outline"
          onClick={() => {
            buyAction();
          }}
        >
          Buy
        </Button>
      )}
    </div>
  );
};

export default BuyActionButtons;

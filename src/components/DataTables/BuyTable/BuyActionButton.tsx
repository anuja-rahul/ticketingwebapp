import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addCustomerTicket } from "@/app/lib/TicketCruds";
import { RefreshCcw } from "lucide-react";


// test this sh*t
interface ActionButtonProps {
  eventName: string;
}

const BuyActionButtons: React.FC<ActionButtonProps> = ({ eventName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const buyAction = async () => {
    setIsLoading(true);
    try {
      const response = await addCustomerTicket({ eventName });
      if (response?.data) {
        toast({
          variant: "default",
          title: "Ticket bought successfully",
          description: `You have bought ${response.data.ticketsBought} tickets for ${response.data.eventName}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to buy ticket",
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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

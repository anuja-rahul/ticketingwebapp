import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  eventName: string;
}

const BuyActionButtons: React.FC<ActionButtonProps> = ({ eventName }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <Button
        className="px-5"
        variant="outline"
        onClick={() => {
          console.log("Buy button clicked", eventName);
        }}
      >
        Buy
      </Button>
    </div>
  );
};

export default BuyActionButtons;

import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  eventName: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ eventName }) => {
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

export default ActionButton;

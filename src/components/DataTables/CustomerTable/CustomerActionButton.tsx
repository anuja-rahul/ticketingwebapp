import React from "react";
import { Button } from "@/components/ui/button";
import BuyActionButtons, {
  ActionButtonProps,
} from "../BuyTable/BuyActionButton";

// add delete methods

const CustomerActionButtons: React.FC<ActionButtonProps> = ({
  eventName,
  refreshMethod,
}) => {
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
    </>
  );
};

export default CustomerActionButtons;

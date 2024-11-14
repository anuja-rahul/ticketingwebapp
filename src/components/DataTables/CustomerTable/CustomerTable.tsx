import { Ticket, TicketColumns } from "./columns";
import { DataTable } from "./Data-Table";
import React from "react";

export const TestBtn: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("View button clicked");
        }}
      >
        View
      </button>
    </div>
  );
};

function getData(): Ticket[] {
  // Fetch data from your API here.
  return [
    {
      customerEmail: "test@example.com",
      eventName: "Event 1",
      ticketsBought: 200,
      action: <TestBtn />,
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    // <div className="container mx-auto py-10">
    <DataTable columns={TicketColumns} data={data} />
    // </div>
  );
}

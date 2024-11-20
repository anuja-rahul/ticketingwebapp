import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Event } from "../ProfileDataColumns";

export const BuyColumns: ColumnDef<Event>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({column}) => {
  //     return (
  //       <div className="flex items-start justify-start">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           ID
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Event Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center">{cell.getValue() as React.ReactNode}</div>
    ),
  },
  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <div className="flex justify-center">
  //           <Button
  //             variant="ghost"
  //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           >
  //             Vendor Email
  //             <ArrowUpDown className="ml-2 h-4 w-4" />
  //           </Button>
  //         </div>
  //       );
  //     },
  //     cell: ({ cell }) => (
  //       <div className="text-left">{cell.getValue() as React.ReactNode}</div>
  //     ),
  //   },
  {
    accessorKey: "totalTickets",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
          className="my-2"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Tickets <br></br> Available
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center">{cell.getValue() as React.ReactNode}</div>
    ),
  },
  //   {
  //     accessorKey: "ticketReleaseRate",
  //     header: ({ column }) => {
  //       return (
  //         <div className="flex justify-center">
  //           <Button
  //             variant="ghost"
  //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           >
  //             Ticket Release<br></br>Rate
  //             <ArrowUpDown className="ml-2 h-4 w-4" />
  //           </Button>
  //         </div>
  //       );
  //     },
  //     cell: ({ cell }) => (
  //       <div className="text-right">{cell.getValue() as React.ReactNode}</div>
  //     ),
  //   },
  {
    accessorKey: "customerRetrievalRate",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {/* Customer<br></br> */}
            Buy Rate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center">{cell.getValue() as React.ReactNode}</div>
    ),
  },
  //   {
  //     accessorKey: "maxTicketCapacity",
  //     header: ({ column }) => {
  //       return (
  //         <div className="flex justify-center">
  //           <Button
  //             variant="ghost"
  //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           >
  //             Max Ticket<br></br>Capacity
  //             <ArrowUpDown className="ml-2 h-4 w-4" />
  //           </Button>
  //         </div>
  //       );
  //     },
  //     cell: ({ cell }) => (
  //       <div className="text-right mr-8">
  //         {cell.getValue() as React.ReactNode}
  //       </div>
  //     ),
  //   },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-start">
        {row.original.action}
      </div>
    ),
  },
  {
    id: "extras",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-1 gap-1">
            <DropdownMenuLabel>Extras</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.eventName)}
            >
              Copy event name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.id.toString())}
            >
              Copy event ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Event</DropdownMenuItem>
            <DropdownMenuItem>View Vendors</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

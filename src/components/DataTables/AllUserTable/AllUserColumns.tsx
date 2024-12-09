import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: number[];
};

export type FormattedUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export function parseDate(dateArray: number[]): Date {
  const [year, month, day, hour, minute, second, nano] = dateArray;
  return new Date(
    Date.UTC(year, month - 1, day, hour, minute, second, nano / 1000000)
  );
}

export function transformUserData(apiResponse: User[]): FormattedUser[] {
  return apiResponse.map((user) => ({
    ...user,
    createdAt: parseDate(user.createdAt),
  }));
}

export const AllUserColumns: ColumnDef<FormattedUser>[] = [
  // {
  //   accessorKey: "customerEmail",
  //   header: "Customer Email",
  // },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center mr-1 text-xs">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center mr-1 text-xs">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-left mr-1 text-xs">{cell.getValue() as React.ReactNode}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-center mr-1">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="text-right mr-1 text-xs gap-2">
        <span className="mr-2">
          {(cell.getValue() as Date).toLocaleTimeString()}
        </span>
        <span>{(cell.getValue() as Date).toLocaleDateString()}</span>
      </div>
    ),
  },
  //   {
  //     accessorKey: "action",
  //     header: () => <div className="text-center">Action</div>,
  //     cell: ({ row }) => (
  //       <div className="flex flex-row justify-start items-start">
  //         {row.original.action}
  //       </div>
  //     ),
  //   },
  {
    id: "extras",
    cell: ({ row }) => {
      const ticket = row.original;

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
              onClick={() => navigator.clipboard.writeText(ticket.name)}
            >
              Copy username
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>View role</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

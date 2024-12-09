"use client";

import {
  AllUserColumns,
  FormattedUser,
  transformUserData,
} from "@/components/DataTables/AllUserTable/AllUserColumns";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllUsers } from "../lib/UserCrud";
import { SkeletonCardTable } from "@/components/UserSkeleton";
import { AllUserTable } from "@/components/DataTables/AllUserTable/AllUserTable";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState<FormattedUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState<boolean>(true);
  const pathname = usePathname();
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // setMessage(true);
      const response = await getAllUsers();
      if (response?.data) {
        const formattedData = transformUserData(response.data);
        setUsers(formattedData);
      } else {
        setUsers(null);
        toast({
          variant: "destructive",
          title: "Failed getting users: " + new Date().toLocaleTimeString(),
          description: "Something went wrong...",
        });
        // setMessage(false);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-center justify-center w-4/5">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          All Users
        </h1>
        <Separator className="my-4 bg-muted-foreground w-2/5" />
        <p className="mb-2">A list of all our users</p>
        {isLoading ? (
          <SkeletonCardTable />
        ) : (
          <div className="w-[88%]">
            <div className="w-full flex flex-col items-end justify-start">
              <Button
                className="border border-primary/40"
                variant={"outline"}
                onClick={() => {
                  fetchUsers();
                }}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            <AllUserTable columns={AllUserColumns} data={users || []} />
          </div>
        )}
      </div>
    </section>
  );
}

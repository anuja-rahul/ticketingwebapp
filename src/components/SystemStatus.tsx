"use client";
import { TestAPI } from "@/app/lib/TestAPI";
import React, { useEffect } from "react";
import Indicator from "./Indicator";
import { usePathname } from "next/navigation";

export default function SystemStatus() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [normal, setNormal] = React.useState<boolean>(false);
  const pathname = usePathname();

  const testBackend = async () => {
    setIsLoading(true);
    try {
      const backendAPI = await TestAPI();
      console.log("api", backendAPI);
      setNormal(backendAPI);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Run backend check on initial load and every route change
    testBackend();
  }, [pathname]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center">
          <Indicator className="bg-yellow-400" />
          <span className="ml-2 text-xs">Loading...</span>
        </div>
      ) : normal ? (
        <div className="flex items-center">
          <Indicator className="bg-primary" />
          <span className="ml-2 text-xs">All systems normal</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Indicator className="bg-red-600" />
          <span className="ml-2 text-xs">System not responding</span>
        </div>
      )}
    </div>
  );
}

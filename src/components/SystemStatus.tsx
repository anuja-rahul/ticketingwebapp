"use client";
import { TestAPI, TestServerRoutes } from "@/app/lib/TestAPI";
import React, { useEffect } from "react";
import Indicator from "./Indicator";
import { usePathname } from "next/navigation";

export default function SystemStatus() {
  const pathname = usePathname();

  const [isBackLoading, setIsBackLoading] = React.useState<boolean>(true);
  const [isFrontLoading, setIsFrontLoading] = React.useState<boolean>(true);

  const [backNormal, setBackNormal] = React.useState<boolean>(false);
  const [frontNormal, setFrontNormal] = React.useState<boolean>(false);

  const testBackend = async () => {
    setIsBackLoading(true);
    try {
      const backendAPI = await TestAPI();
      if (backendAPI) {
        setBackNormal(true);
      }
    } catch (error) {
      console.error(error);
      setBackNormal(false);
    } finally {
      setIsBackLoading(false);
    }
  };

  const testFrontend = async () => {
    setIsFrontLoading(true);
    try {
      const frontendAPI = await TestServerRoutes();
      setFrontNormal(frontendAPI);
    } catch (error) {
      console.error(error);
      setFrontNormal(false);
    } finally {
      setIsFrontLoading(false);
    }
  };

  useEffect(() => {
    testBackend();
    testFrontend();
  }, [pathname]);

  return (
    <div className="w-full">
      {isBackLoading || isFrontLoading ? (
        <div className="flex items-center">
          <Indicator className="bg-yellow-300" />
          <span className="ml-2 text-xs">Loading...</span>
        </div>
      ) : backNormal && frontNormal ? (
        <div className="flex items-center">
          <Indicator className="bg-primary" />
          <span className="ml-2 text-xs">All systems normal</span>
        </div>
      ) : backNormal || frontNormal ? (
        <div className="flex items-center">
          <Indicator className="bg-orange-500" />
          <span className="ml-2 text-xs">Some systems operational</span>
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

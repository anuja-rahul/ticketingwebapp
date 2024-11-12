"use client";
import { TestAPI } from "@/app/lib/TestAPI";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import Indicator from "./Indicator";

export default function SystemStatus() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [normal, setNormal] = React.useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    async function testBackend() {
      try {
        const backendAPI = await TestAPI();
        console.log("api", backendAPI);
        setNormal(backendAPI);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to reach backend",
        });
      } finally {
        setIsLoading(false);
      }
    }

    testBackend();
  }, [toast]); // Removed `normal` from dependencies

  return (
    <div>
      {isLoading ? (
        <p className="text-foreground/80 text-xs">Loading...</p>
      ) : normal ? (
        <div className="flex items-center">
          <Indicator className="bg-primary" />
          <span className="ml-2">All systems normal</span>
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

"use client";

import LoginLogoutBtn from "@/components/LoginLogoutBtn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignOut() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const authParams = searchParams.get("reason");
  const path = usePathname();
  const [params, setParams] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (authParams === "pre_existing_session_found") {
      setParams(true);
    } else {
      setParams(false);
    }
  }, [authParams, path]);

  useEffect(() => {
    if (params) {
      toast({
        variant: "destructive",
        title: "Session found : " + new Date().toLocaleTimeString(),
        description: "ERROR : " + authParams?.toUpperCase(),
      });
    }
  }, [authParams, params, toast]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/auth">auth</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/signout">sign out</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 w-4/5">
        <div className="space-y-1 flex flex-col justify-center items-center text-sm text-muted-foreground w-auto">
          <h2 className="text-4xl font-medium text-foreground leading-none mb-4">
            Log out
          </h2>
          <p>Wanna log out ?</p>
          <p>Just hit the button.</p>
        </div>
        <Separator className="my-4 bg-muted-foreground w-3/5" />
        <div className="mt-4">
          <LoginLogoutBtn
            className="aspect-auto w-36 min-h-10 duration-300 bg-gradient-to-r from-primary/10 via-background/40 to-primary/10 
           border-foreground/20 text-foreground text-sm font-bold rounded-3xl"
          />
        </div>
        <div className="flex h-5 items-center space-x-4 text-sm"></div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Auth() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const authParams = searchParams.get("reason");
  const path = usePathname();
  const [params, setParams] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (authParams === "no_token_or_role") {
      setParams(true);
    } else if (authParams === "unauthorized") {
      setParams(false);
    }
  }, [authParams, path]);

  useEffect(() => {
    if (params !== undefined) {
      toast({
        variant: "destructive",
        title: `${
          params ? "Authentication required" : "Access denied"
        }: ${new Date().toLocaleTimeString()}`,
        description: params
          ? "Please login or signup to continue"
          : "You do not have permission to access that page",
      });
    }
  }, [params, toast]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-svh">
      <div className="flex flex-col justify-center items-center mt-12 w-4/5">
        <div className="space-y-1 flex flex-col justify-center items-center text-sm text-muted-foreground w-auto">
          <h2 className="text-4xl font-medium text-foreground leading-none mb-4">
            Authentication
          </h2>
          <p>Want to get the best out of TicketingApp?</p>
          <p>Sign up or login to get started.</p>
        </div>
        <Separator className="my-4 bg-muted-foreground w-3/5" />
        <div className="flex h-5 items-center space-x-4 text-sm mt-4 duration-300">
          <Link
            href="/auth/signup"
            className={`${buttonVariants({
              variant: "outline",
            })} font-bold hover:translate-y-[-2px] bg-gradient-to-r 
            from-background/10 via-primary/20 to-background/10 border-muted-foreground/30 def_btn`}
          >
            Signup
          </Link>
          <Separator
            orientation="vertical"
            className="bg-muted-foreground h-12"
          />
          <Link
            href="/auth/login"
            className={`${buttonVariants({
              variant: "outline",
            })} font-bold hover:translate-y-[-2px] bg-gradient-to-r 
            from-background/10 via-primary/20 to-background/10 border-muted-foreground/30 def_btn`}
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

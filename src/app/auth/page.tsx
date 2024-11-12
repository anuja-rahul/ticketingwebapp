"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Auth() {
  return (
    <section className="flex flex-col justify-start items-center w-full my-12 h-screen">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="pl-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/auth">auth</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 w-4/5">
        <div className="space-y-1 flex flex-col justify-center items-center text-sm text-muted-foreground w-auto">
          <h2 className="text-4xl font-medium text-foreground leading-none mb-4">
            Authentication
          </h2>
          <p>Want to get the best out of TicketingApp ?</p>
          <p>Sign up or login to get started.</p>
        </div>
        <Separator className="my-4 bg-muted-foreground w-3/5" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link
            href="/auth/signup"
            className={`${buttonVariants({
              variant: "link",
            })} font-bold hover:text-secondary-foreground duration-300 hover:translate-y-[-2px]`}
          >
            Signup
          </Link>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <Link
            href="/auth/login"
            className={`${buttonVariants({
              variant: "link",
            })} font-bold hover:text-secondary-foreground duration-300 hover:translate-y-[-2px]`}
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

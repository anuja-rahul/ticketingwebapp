"use client";

import { RegisterForm } from "@/components/registerForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Signup() {
  return (
    <section className="pt-10 flex flex-col justify-center items-center w-full">
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
              <BreadcrumbLink href="/auth/signup">signup</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Signup
        </h1>
        <p className="mb-2">Register your account</p>
        <RegisterForm
          className="flex items-center justify-center w-3/5 h-auto bg-blue-900/30 
        py-6 rounded-[8rem] mt-1"
        />
      </div>
    </section>
  );
}

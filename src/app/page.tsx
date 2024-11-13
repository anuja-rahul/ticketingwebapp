"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Home() {


  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Home
        </h1>
        <p className="mb-2">Womp Womp</p>
      </div>
    </section>
  );
}

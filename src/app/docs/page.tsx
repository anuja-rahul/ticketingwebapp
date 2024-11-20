"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Docs() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">docs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Documentation
        </h1>
        <p className="mb-2">Womp Womp</p>
        <div className="bg-red-400 h-screen">red div</div>
        <div className="bg-blue-400 h-screen" id="securitylevels">
          blue div
        </div>
      </div>
    </section>
  );
}

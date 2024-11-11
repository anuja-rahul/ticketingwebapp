"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import React, { useState } from "react";

export default function Home() {
  // const [response, setResponse] = useState("");

  // const sendRequest = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8080/test/hello");
  //     const text = await res.text();
  //     setResponse(text);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setResponse("Error fetching data");
  //   }
  // };

  return (
    <section className="pt-10 flex flex-col justify-center items-center w-full">
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
        <p className="mb-2">Finish up the home</p>
      </div>
    </section>
  );
}

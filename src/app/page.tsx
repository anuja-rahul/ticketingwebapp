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
    <section>
      <Breadcrumb className="pl-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center pt-6">
        <h1>Hello, this is the home</h1>
        <p>Reminder: finish this !</p>
        {/* <button onClick={sendRequest}>Send Request</button>
        <p>Response: {response}</p> */}
      </div>
    </section>
  );
}

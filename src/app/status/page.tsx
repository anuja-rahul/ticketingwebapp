"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { TestAPI, TestServerRoutes } from "../lib/TestAPI";
import Indicator from "@/components/Indicator";

export default function Status() {
  const [isBackLoading, setIsBackLoading] = React.useState<boolean>(true);
  const [isFrontLoading, setIsFrontLoading] = React.useState<boolean>(true);

  const [frontNormal, setFrontNormal] = React.useState<boolean>(false);
  const [backNormal, setBackNormal] = React.useState<boolean>(false);

  const pathname = usePathname();

  const testBackend = async () => {
    setIsBackLoading(true);
    try {
      const backendAPI = await TestAPI();
      setBackNormal(backendAPI);
    } catch (error) {
      console.error(error);
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
    } finally {
      setIsFrontLoading(false);
    }
  };

  function FrontEndIndicator(isFrontLoading: boolean, frontNormal: boolean) {
    useEffect(() => {
      if (pathname === "/status") {
        testBackend();
        testFrontend();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    return (
      <div className="w-full">
        {isFrontLoading ? (
          <div className="flex items-center">
            <Indicator className="bg-yellow-400" />
            {/* <span className="ml-2 text-xs">Loading...</span> */}
          </div>
        ) : frontNormal ? (
          <div className="flex items-center">
            <Indicator className="bg-primary" />
            {/* <span className="ml-2 text-xs">All systems normal</span> */}
          </div>
        ) : (
          <div className="flex items-center">
            <Indicator className="bg-red-600" />
            {/* <span className="ml-2 text-xs">System not responding</span> */}
          </div>
        )}
      </div>
    );
  }

  function FrontEndState(isFrontLoading: boolean, frontNormal: boolean) {
    return (
      <div className="w-full">
        {isFrontLoading ? (
          <span className="ml-2 text-xs">Loading...</span>
        ) : frontNormal ? (
          <span className="ml-2 text-xs">Operational</span>
        ) : (
          <span className="ml-2 text-xs">System not responding</span>
        )}
      </div>
    );
  }

  function BackEndIndicator(isBackLoading: boolean, backNormal: boolean) {
    return (
      <div className="w-full">
        {isBackLoading ? (
          <div className="flex items-center">
            <Indicator className="bg-yellow-400" />
            {/* <span className="ml-2 text-xs">Loading...</span> */}
          </div>
        ) : backNormal ? (
          <div className="flex items-center">
            <Indicator className="bg-primary" />
            {/* <span className="ml-2 text-xs">All systems normal</span> */}
          </div>
        ) : (
          <div className="flex items-center">
            <Indicator className="bg-red-600" />
            {/* <span className="ml-2 text-xs">System not responding</span> */}
          </div>
        )}
      </div>
    );
  }

  function BackEndState(isBackLoading: boolean, backNormal: boolean) {
    return (
      <div className="w-full">
        {isBackLoading ? (
          <span className="ml-2 text-xs">Loading...</span>
        ) : backNormal ? (
          <span className="ml-2 text-xs">Operational</span>
        ) : (
          <span className="ml-2 text-xs">System not responding</span>
        )}
      </div>
    );
  }

  function FrontEndButton() {
    return (
      <Button
        variant={"outline"}
        onClick={() => {
          testFrontend();
        }}
      >
        Check
      </Button>
    );
  }

  function BackEndButton() {
    return (
      <Button
        variant={"outline"}
        onClick={() => {
          testBackend();
        }}
      >
        Check
      </Button>
    );
  }

  const data = [
    {
      indicator: FrontEndIndicator(isFrontLoading, frontNormal),
      state: FrontEndState(isFrontLoading, frontNormal),
      service: "Server Actions",
      description:
        "Handles all the communications between the client and the server",
      run: FrontEndButton(),
    },
    {
      indicator: BackEndIndicator(isBackLoading, backNormal),
      state: BackEndState(isBackLoading, backNormal),
      service: "Backend API",
      description:
        "Handles all the communications between the server and the database",
      run: BackEndButton(),
    },
  ];

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
              <BreadcrumbLink href="/status">status</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 w-4/5">
        <div className="space-y-1 flex flex-col justify-center items-center text-sm text-muted-foreground w-auto">
          <h2 className="text-4xl font-medium text-foreground leading-none mb-4">
            System Status
          </h2>
          <p>Check out how our services are doing</p>
        </div>
        <Separator className="my-4 bg-muted-foreground w-3/5" />

        <Table>
          <TableCaption>All neccessaroy services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Indicator</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.service}>
                <TableCell className="font-medium">{item.indicator}</TableCell>
                <TableCell className="w-52">{item.state}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell className="text-xs">{item.description}</TableCell>
                <TableCell className="text-right">{item.run}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>indicator speacial</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    testBackend();
                    testFrontend();
                  }}
                >
                  Check All
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

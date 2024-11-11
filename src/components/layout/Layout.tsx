"use client";

import "./index.scss";

import { Navbar } from "../ui/navbar";
import { ModeToggle } from "../mode-toggle";
import { AvatarIcon } from "../Avatar";
import Link from "next/link";
import { LockIcon } from "lucide-react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import MyKBD from "../myKBD";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className="w-full">
          <div className="flex justify-center items-center layout">
            <div
              id="nav"
              className="w-4/5 flex flex-row align-middle justify-between h-10 items-center p-7 pr-4 pl-2 rounded-3xl 
          bg-blue-900/30"
            >
              {/* navbar */}
              <Navbar />
              <div className="flex flex-row justify-end items-center w-1/4 h-full gap-4">
                <MyKBD />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={"/auth"}>
                        <div className="flex items-center justify-center scale-100 duration-300 hover:translate-y-[-2px] hover:bg-muted-foreground/20 rounded-2xl p-2">
                          <LockIcon />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs pt-2">
                      <p>login/signup</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={"/user"}>
                        <div className="flex items-center justify-center scale-90 duration-300 hover:translate-y-[-2px] hover:bg-muted-foreground/20 rounded-2xl">
                          <AvatarIcon />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs pt-2">
                      <p>profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="layout w-full">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}

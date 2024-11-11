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
              <Navbar />
              <div className="flex flex-row justify-end items-center w-1/4 h-full gap-4">
              <MyKBD />
                <Link href={"/auth"}>
                  <div className="flex items-center justify-center scale-100 hover:scale-105 duration-300">
                    <LockIcon />
                  </div>
                </Link>
                <Link href={"/user"}>
                  <div className="flex items-center justify-center scale-90 hover:scale-95 duration-300">
                    <AvatarIcon />
                  </div>
                </Link>
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

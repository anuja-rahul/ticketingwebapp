"use client";

import { Navbar } from "../ui/navbar";
import { ModeToggle } from "../mode-toggle";
import { AvatarIcon } from "../Avatar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          id="nav"
          className="w-4/5 flex flex-row align-middle justify-between h-10 items-center p-7 pr-4 pl-2 rounded-3xl bg-slate-600"
        >
          <Navbar />
          <div className="flex flex-row justify-end items-center w-1/4 h-full">
            {/* <Image
              src={DefUser}
              alt="user"
              width={30}
              height={30}
              className="mx-4"
            /> */}
            <AvatarIcon/>
            <ModeToggle />
          
          </div>
        </div>
      </div>
      <div className="layout w-full">{children}</div>
    </>
  );
}

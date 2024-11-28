import { CircleHelp, FileSearch, Home, Map } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import MyKBD from "./myKBD";
import SystemStatus from "./SystemStatus";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function Footer() {
  return (
    // bg-blue-900/30
    <footer
      className="w-4/5 bottom-0 flex flex-row align-middle justify-between min-h-10 h-28 items-center px-20 rounded-full 
      gap-2 p-12 bg-gradient-to-r from-background/60 via-muted-foreground/20 to-background/60 border-background/50 border"
    >
      <div className="flex flex-row items-center justify-center w-2/12 p-4 flex-wrap">
        <Link
          className={`${buttonVariants({ variant: "ghost" })} flex flex-wrap`}
          href="/status"
        >
          <SystemStatus />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2"
              >
                <Home />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="mb-2 text-xs">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/sitemap"
                className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2"
              >
                <Map />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="mb-2 text-xs">
              <p>Sitemap</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="http://localhost:8080/swagger-ui/index.html"
                className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2"
              >
                <FileSearch />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="mb-2 text-xs">
              <p>Documentation</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/help"
                className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2"
              >
                <CircleHelp />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="mb-2 text-xs">
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <MyKBD />
        <ModeToggle />
      </div>
    </footer>
  );
}

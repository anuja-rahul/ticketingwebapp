import {
  ChartLine,
  DollarSign,
  Home,
  LayoutList,
  Lock,
  LogOut,
  ShoppingCart,
  User2,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import MyKBD from "./myKBD";
import SystemStatus from "./SystemStatus";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Footer() {
  return (
    <footer
      className="w-[90%] bottom-0 flex flex-row align-middle justify-between min-h-10 h-28 items-center rounded-t-3xl 
          bg-blue-900/30 gap-2 p-12"
    >
      <div className="flex flex-row items-center justify-center">
        <Link className={buttonVariants({ variant: "ghost" })} href="/status">
        <SystemStatus />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href="/" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <Home />
        </Link>
        <Link href="/auth" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <Lock />
        </Link>
        <Link href="/tickets/buy" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <ShoppingCart />
        </Link>
        <Link href="/tickets/sell" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <DollarSign />
        </Link>
        <Link href="/user" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <User2 />
        </Link>
        <Link href="/dashboard" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <ChartLine />
        </Link>
        <Link href="/vendors" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <LayoutList />
        </Link>
        <Link href="/signout" className="duration-300 hover:translate-y-[-3px] hover:bg-muted-foreground/30 rounded-full p-2">
          <LogOut />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <MyKBD />
        <ModeToggle />
      </div>
    </footer>
  );
}

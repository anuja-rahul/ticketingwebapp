"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { deleteCookies, getCookieTokens } from "@/app/lib/BasicCrud";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Cookies {
  token: { name: string; value: string; path: string };
  username: { name: string; value: string; path: string };
  role: { name: string; value: string; path: string };
}

export default function LoginLogoutBtn() {
  const pathname = usePathname();
  const [cookies, setCookies] = useState<Cookies | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCookies = async () => {
      const fetchedCookies = await getCookieTokens();
      console.log("cookie", fetchedCookies);
      setCookies(fetchedCookies);
    };

    fetchCookies();
  }, [pathname]);

  useEffect(() => {
    if (cookies && cookies.username) {
      setUsername(cookies.username.value);
    } else {
      setUsername(null);
    }
  }, [cookies]);

  const handleLogout = async () => {
    const result = await deleteCookies();
    if (result) {
      setUsername(null);
      toast({
        title: "Logging out: " + new Date().toLocaleTimeString(),
        description: "Deleting user cookies...",
      });
      window.location.reload();
    } else {
      toast({
        variant: "destructive",
        title: "Failed to clear cookies: " + new Date().toLocaleTimeString(),
        description: "Error trying to clear cookies...",
      });
    }
  };

  return (
    <>
      <div className="border rounded-2xl">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {username ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center scale-100 duration-300 hover:translate-y-[-2px] 
                  hover:bg-muted-foreground/20 rounded-2xl p-2 text-xs"
                >
                  Logout
                </button>
              ) : (
                <Link href="/auth">
                  <div
                    className="flex items-center justify-center scale-100 duration-300 hover:translate-y-[-2px] 
                    hover:bg-muted-foreground/20 rounded-2xl p-2"
                  >
                    <LockIcon />
                  </div>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent className="text-xs pt-2">
              <p>{username ? "Logout" : "login/signup"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

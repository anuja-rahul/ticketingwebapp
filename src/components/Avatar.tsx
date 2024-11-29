"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCookieTokens } from "@/app/lib/BasicCrud";

interface Cookies {
  token: { name: string; value: string; path: string };
  username: { name: string; value: string; path: string };
  role: { name: string; value: string; path: string };
}

const tempCookies: Cookies = {
  token: { name: "token", value: "defaultToken", path: "/" },
  username: { name: "username", value: "defaultUser", path: "/" },
  role: { name: "role", value: "defaultRole", path: "/" },
};

interface UserIconReturn {
  role: string;
  email: string;
}

export function useUserIcon(): UserIconReturn {
  const pathname = usePathname();
  const [cookies, setCookies] = useState<Cookies | null>(null);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const fetchedCookies = await getCookieTokens();
        setCookies(fetchedCookies);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setCookies(tempCookies);
      }
    };

    fetchCookies();
  }, [pathname]);

  return {
    role: cookies?.role?.value?.toLowerCase() ?? "none",
    email: cookies?.username?.value ?? "none",
  };
}

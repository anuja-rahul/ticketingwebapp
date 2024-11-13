"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCookieTokens } from "@/app/lib/BasicCrud";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Cookies {
  token: { name: string; value: string; path: string };
  username: { name: string; value: string; path: string };
  role: { name: string; value: string; path: string };
}

export function UserIcon() {
  const pathname = usePathname();
  const [cookies, setCookies] = useState<Cookies | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchCookies = async () => {
      const fetchedCookies = await getCookieTokens();
      // console.log("cookie", fetchedCookies);
      setCookies(fetchedCookies);
    };

    fetchCookies();
  }, [pathname]);

  useEffect(() => {
    if (cookies && cookies.username) {
      setEmail(cookies.username.value);
    }
  }, [cookies]);

  return email ? (
    <p className="text-xs rounded-2xl p-2">{email}</p>
  ) : (
    <Avatar className="bg-muted-foreground">
      <AvatarImage
        src="https://assets.dryicons.com/uploads/icon/svg/5610/fff0263a-8f19-4b74-8f3d-fc24b9561a96.svg"
        alt="@shadcn"
      />
      <Badge>Badge</Badge>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image1 from "./../../assets/images/image1.webp";
// import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { SidebarTrigger } from "./sidebar";
import LogoLink from "../LogoLink";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Buy tickets",
    href: "/tickets/buy",
    description:
      "Select and purchase tickets from a wide range of dynamically updated collection of events.",
  },
  {
    title: "Sell tickets",
    href: "/tickets/sell",
    description:
      "Looking for a place to sell your tickets ? TicketingApp is the right place for you.",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "get the latest staistics about our platform.",
  },
  {
    title: "Profile",
    href: "/user",
    description: "want to checkout your profile ?",
  },
  {
    title: "Vendors",
    href: "/vendors",
    description: "View a summerized preview of all our vendors.",
  },
  {
    title: "Home",
    href: "/",
    description: "Feeling lost ? Get back to home.",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="w-full">
      <SidebarTrigger />
      <NavigationMenuList className="pl-2">
        <LogoLink />
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <Image src={Image1} alt="image1" className="rounded-xl" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      TicketingApp
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Dynamic ticketing application made with Nextjs + spring
                      boot.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Home">
                Explore the home of TicketingApp.
              </ListItem>
              <ListItem href="/auth/login" title="Login">
                Already a user ? Login here.
              </ListItem>
              <ListItem href="/auth/signup" title="Signup">
                Signup to get the most out of TicketingApp.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="http://localhost:8080/swagger-ui/index.html#/"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

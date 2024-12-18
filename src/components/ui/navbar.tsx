"use client";

import * as React from "react";
import Link from "next/link";
// import Image1 from "./../../assets/images/image1.webp";
import Image3 from "./../../assets/images/silver_tickets.png";
// import Image2 from "./../../assets/images/purple_tickets.png";
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
import {
  AdminBadge,
  AnyBadge,
  CustomerBadge,
  VendorBadge,
} from "../roleBadges";

type Role = "vendor" | "customer" | "admin" | "any";

const components: {
  title: string;
  role: Role;
  href: string;
  description: string;
}[] = [
  {
    title: "Buy Tickets",
    role: "customer",
    href: "/tickets/buy",
    description:
      "Select and purchase tickets from a wide range of dynamically updated collection of events.",
  },
  {
    title: "Sell Tickets",
    role: "vendor",
    href: "/tickets/sell",
    description:
      "Looking for a place to sell your tickets? TicketingApp is the right place for you.",
  },
  {
    title: "Dashboard",
    role: "admin",
    href: "/dashboard",
    description: "Get the latest statistics about our platform.",
  },
  {
    title: "Profile",
    role: "any",
    href: "/user",
    description: "Want to checkout your profile?",
  },
  {
    title: "All Users",
    role: "admin",
    href: "/users",
    description: "View a summarized preview of all our users.",
  },
  {
    title: "System",
    role: "any",
    href: "/status",
    description: "Wanna see what's running under the hood?",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="w-auto max-w-full z-[999] highest opacity-100 flex flex-row items-start justify-start">
      <SidebarTrigger />
      <NavigationMenuList className="pl-2">
        <LogoLink />
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border">
            TicketingApp
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 highest opacity-100">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <Image src={Image3} alt="image1" className="rounded-xl" />
                    <div className="mb-2 mt-4 text-lg font-medium w-auto">
                      TicketingApp
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Dynamic ticketing application made with Nextjs + Spring
                      Boot.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Home">
                Explore the home of TicketingApp.
              </ListItem>
              <ListItem href="/auth/login" title="Login">
                Already a user? Login here.
              </ListItem>
              <ListItem href="/auth/signup" title="Signup">
                Signup to get the most out of TicketingApp.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                key={component.href}
                /* eslint-disable @typescript-eslint/no-unsafe-assignment */
                  title={
                    <TitleWithBadge
                      title={component.title}
                      role={component.role}
                    />
                  }
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

interface TitleWithBadgeProps {
  title: string;
  role: Role;
}

function TitleWithBadge({ title, role }: TitleWithBadgeProps) {
  return (
    <div>
      {title}
      {role === "vendor" && <VendorBadge />}
      {role === "customer" && <CustomerBadge />}
      {role === "admin" && <AdminBadge />}
      {role === "any" && <AnyBadge />}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: React.ReactNode }
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
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

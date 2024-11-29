"use client";

import * as React from "react";
import {
  BookOpen,
  FileText,
  Gauge,
  Lock,
  Map,
  Server,
  ShieldCheck,
  ShoppingCart,
  Store,
  Ticket,
  UserCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSupport } from "@/components/nav-support";
import { NavUser } from "@/components/nav-user";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const themes = [
  {
    name: "TicketingApp",
    logo: Ticket,
  },
];

const data = {
  navMain: [
    {
      title: "Authentication",
      url: "/auth",
      icon: Lock,
      isActive: false,
      items: [
        {
          title: "Signup",
          url: "/auth/signup",
        },
        {
          title: "Login",
          url: "/auth/login",
        },
        {
          title: "Signout",
          url: "/auth/signout",
        },
      ],
    },
    {
      title: "Admins",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Realtime Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Vendors",
      url: "#",
      icon: Store,
      items: [
        {
          title: "Sell Tickets",
          url: "/tickets/sell",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Buy Tickets",
          url: "/tickets/buy",
        },
      ],
    },
    {
      title: "Anyone",
      url: "#",
      icon: UserCheck,
      items: [
        {
          title: "Profile",
          url: "/user",
        },
        {
          title: "System Status",
          url: "/status",
        },
      ],
    },
  ],
  support: [
    {
      name: "System Status",
      url: "/status",
      icon: Gauge,
    },
    {
      name: "API Documentation",
      url: "http://localhost:8080/swagger-ui/index.html",
      icon: Server,
    },
    {
      name: "Learn More",
      url: "/learn-more",
      icon: BookOpen,
    },
    {
      name: "Terms & Services",
      url: "/terms",
      icon: FileText,
    },
    {
      name: "Sitemap",
      url: "/sitemap",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      side="left"
      className="bg-transparent"
    >
      <SidebarHeader className="bg-gradient-to-l from-background via-secondary/80 to-background">
        <ThemeSwitcher themes={themes} />
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-l from-background via-secondary/80 to-background">
        <NavMain items={data.navMain} />
        <NavSupport support={data.support} />
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-l from-background via-secondary/80 to-background">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

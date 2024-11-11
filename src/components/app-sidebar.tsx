import { ChartLine, DollarSign, Home, LayoutList, LogIn, LogOut, ShoppingCart, User2, UserPlus2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Login",
    url: "/auth/login",
    icon: LogIn,
  },
  {
    title: "Signup",
    url: "/auth/signup",
    icon: UserPlus2,
  },
  {
    title: "Buy Tickets",
    url: "/tickets/buy",
    icon: ShoppingCart,
  },
  {
    title: "Sell Tickets",
    url: "/tickets/sell",
    icon: DollarSign,
  },
  {
    title: "Profile",
    url: "/user",
    icon: User2,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartLine,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: LayoutList,
  },
  {
    title: "Signout",
    url: "/auth/signout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon" side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md">TicketingApp</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
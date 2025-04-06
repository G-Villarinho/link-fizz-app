import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";

interface AppSidebarItemsProps {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function AppSidebarItems({ items }: AppSidebarItemsProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span className="ml-4">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <Separator className="my-2" />
      </SidebarMenu>
    </SidebarGroup>
  );
}

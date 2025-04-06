import logo from "@/assets/icon.png";

import {
  FileSpreadsheet,
  LayoutDashboard,
  LifeBuoy,
  Link,
  Send,
  WholeWord,
} from "lucide-react";

import { AppSidebarItems } from "@/components/app-sidebar-items";
import { AppSidebarSecondary } from "@/components/app-sidebar-secondary";
import { AppSidebarUser } from "@/components/app-sidebar-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const data = {
  sidebarSecondaryItems: [
    {
      name: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      name: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  sidebarItems: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Links",
      url: "/links",
      icon: Link,
    },
    {
      name: "Pages",
      url: "/pages",
      icon: FileSpreadsheet,
    },
    {
      name: "Domínios",
      url: "/links/domains",
      icon: WholeWord,
    },
  ],
};

export function AppSidebar() {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  function handleNavigateCreateLink() {
    navigate("/links/create");
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="flex items-center gap-x-3">
                <img src={logo} alt="Logo Link Fizz" className="h-12 w-auto" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Link Fizz</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Enterprise
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full" onClick={handleNavigateCreateLink}>
              Criar link
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarItems items={data.sidebarItems} />
        <AppSidebarSecondary
          items={data.sidebarSecondaryItems}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        {profile && (
          <AppSidebarUser
            user={{
              name: profile.name,
              email: profile.email,
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

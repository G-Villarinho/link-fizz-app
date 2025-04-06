import logo from "@/assets/icon.png";

import {
  FileSpreadsheet,
  LayoutDashboard,
  LifeBuoy,
  Link,
  Send,
  WholeWord,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
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
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  function handleNavigateCreateLink() {
    navigate("/create-link");
  }

  return (
    <Sidebar variant="floating" {...props}>
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
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {profile && (
          <NavUser
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

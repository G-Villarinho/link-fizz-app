import { Navigate, Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";
import { isAxiosError } from "axios";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import { Loading } from "../loading";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppLayout() {
  const { isAuthenticated, unauthenticate, isLoading } = useAuth();

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          unauthenticate();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [unauthenticate]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full max-w-screen-xl mx-auto my-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

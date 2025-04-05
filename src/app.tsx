import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme/provider";
import { queryClient } from "@/lib/react-query";
import { router } from "@/routes";

import "@/index.css";
import { HeadProvider } from "react-head";
import { AuthProvider } from "./contexts/auth/provider";

export function App() {
  return (
    <HeadProvider>
      <ThemeProvider defaultTheme="light" storageKey="link-fizz.theme">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </HeadProvider>
  );
}

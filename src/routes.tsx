import { createBrowserRouter } from "react-router-dom";

// Layouts
import { AuthLayout } from "@/pages/_layouts/auth";
import { AppLayout } from "./pages/_layouts/app";

// Auth Pages
import { LoginPage } from "@/pages/auth/login/login";
import { RegisterPage } from "@/pages/auth/register/register";

// App Pages
import { DashboardPage } from "@/pages/app/dashboard";
import { CreateLinkPage } from "@/pages/app/create-link/create-link";
import { LinkDetailsPage } from "@/pages/app/link-details/link-details";
import { LinksPage } from "./pages/app/links/links";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/links/create",
        element: <CreateLinkPage />,
      },
      {
        path: "/links/:shortCode/details",
        element: <LinkDetailsPage />,
      },
      {
        path: "/links",
        element: <LinksPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";

// Layouts
import { AuthLayout } from "@/pages/_layouts/auth";
import { AppLayout } from "./pages/_layouts/app";

// Error Pages
import { NotFound } from "@/pages/404";

// Auth Pages
import { LoginPage } from "@/pages/auth/login/login";
import { RegisterPage } from "@/pages/auth/register/register";

// App Pages
import { DashboardPage } from "@/pages/app/dashboard";
import { CreateLinkPage } from "@/pages/app/create-link/create-link";
import { LinkDetailsPage } from "@/pages/app/link-details/link-details";
import { LinksPage } from "@/pages/app/links/links";

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
    path: "/not-found",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
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

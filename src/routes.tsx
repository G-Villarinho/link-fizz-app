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
        path: "/create-link",
        element: <CreateLinkPage />,
      },
      {
        path: "links/:shortCode/details",
        element: <LinkDetailsPage />,
      },
    ],
  },
]);

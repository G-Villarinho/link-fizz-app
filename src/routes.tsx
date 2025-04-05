import { createBrowserRouter } from "react-router-dom";

// Layouts
import { AuthLayout } from "@/pages/_layouts/auth";
import { AppLayout } from "./pages/_layouts/app";

// Auth Pages
import { LoginPage } from "@/pages/auth/login/login";
import { RegisterPage } from "@/pages/auth/register/register";

// App Pages
import { DashboardPage } from "./pages/app/dashboard";

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
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";

// Layouts
import { AuthLayout } from "@/pages/_layouts/auth";

// Auth Pages
import { LoginPage } from "./pages/auth/login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

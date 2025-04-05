import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../loading";

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
    <main>
      <Outlet />
    </main>
  );
}

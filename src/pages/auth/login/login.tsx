import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "./login-form";
import { Title, Meta } from "react-head";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Title>Entrar | Link Fizz</Title>
      <Meta
        name="description"
        content="Faça login para acessar sua conta no Link Fizz"
      />
      <LoginForm />
    </>
  );
}

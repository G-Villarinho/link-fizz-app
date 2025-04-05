import { Title, Meta } from "react-head";
import { RegisterForm } from "./register-form";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export function RegisterPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Title>Registrar | Link Fizz</Title>
      <Meta
        name="description"
        content="Crie uma conta para acessar o Link Fizz"
      />
      <RegisterForm />
    </>
  );
}

import { LoginForm } from "./login-form";
import { Title, Meta } from "react-head";

export function LoginPage() {
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

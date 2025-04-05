import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email("o e-mail deve ser válido."),
  password: z.string().min(6, "Senha deve ter pelo menos 8 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: login,
  });

  async function handleLogin({ email, password }: LoginSchema) {
    try {
      const response = await loginFn({ email, password });

      authenticate(response.token);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("E-mail ou senha inválidos.");
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Entrar na sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <div>
                  <Input
                    id="email"
                    type="email"
                    disabled={isSubmitting}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    placeholder="exemplo@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <div>
                  <Input
                    id="password"
                    type="password"
                    disabled={isSubmitting}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { register } from "@/api/register";

const registerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("O e-mail deve ser válido."),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { authenticate } = useAuth();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: registerFn } = useMutation({
    mutationFn: register,
  });

  async function handleRegister({ name, email, password }: RegisterSchema) {
    try {
      const response = await registerFn({ name, email, password });
      authenticate(response.token);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("E-mail já cadastrado.");
          return;
        }
      }
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para se registrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <div>
                  <Input
                    id="name"
                    type="text"
                    disabled={isSubmitting}
                    {...registerInput("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
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
                    {...registerInput("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <div>
                  <Input
                    id="password"
                    type="password"
                    disabled={isSubmitting}
                    {...registerInput("password")}
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
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Criando...
                    </span>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

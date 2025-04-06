import { createLink } from "@/api/create-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const createLinkSchema = z.object({
  destinationUrl: z
    .string()
    .nonempty("a url de destino é obrigatória.")
    .url("url inválida."),
  title: z.string().optional(),
  customCode: z.string().optional(),
});

type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export function CreateLinkForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });

  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
  });

  async function handleCreateLink(data: CreateLinkSchema) {
    try {
      const response = await createLinkFn(data);
      navigate(`/links/${response.shortCode}/details`, {
        state: { showModal: true },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(
            "Um link utilizado com esse identificador personalizado já existe."
          );
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateLink)} className="space-y-12 p-6">
      <div className="space-y-2">
        <Label htmlFor="url">URL de destino</Label>
        <Input
          id="url"
          placeholder="https://exemplo.com"
          className="h-10"
          {...register("destinationUrl")}
        />
        {errors.destinationUrl && (
          <p className="text-red-500 text-sm">
            {errors.destinationUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título (opcional)</Label>
        <Input
          id="title"
          placeholder="Ex: Promoção de Abril"
          className="h-10"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="flex items-end gap-2">
        <div className="w-1/2 space-y-2">
          <Label htmlFor="domain">
            Domínio <Lock size="15" />
          </Label>
          <Input
            id="domain"
            placeholder="linkfizz.com"
            className="h-10"
            disabled
          />
        </div>

        <div className="w-1/2 space-y-2">
          <Label htmlFor="customCode">Identificador personalizado</Label>
          <Input
            id="customCode"
            placeholder="meu-link-personalizado"
            className="h-10"
            {...register("customCode")}
          />
          {errors.customCode && (
            <p className="text-red-500 text-sm">{errors.customCode.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2"></div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Criando Link...
          </span>
        ) : (
          "Criar link"
        )}
      </Button>
    </form>
  );
}

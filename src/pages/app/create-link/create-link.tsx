import { Heading } from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { Meta, Title } from "react-head";
import { CreateLinkForm } from "./create-link-form";

export function CreateLinkPage() {
  return (
    <>
      <Title>Criar link | Link Fizz</Title>
      <Meta
        name="description"
        content="Crie um link personalizado e encurte-o com o Link Fizz"
      />
      <div className="w-full flex flex-col items-center px-4 pt-32 gap-6">
        <div className="w-full max-w-4xl">
          <Heading
            title="Criar link"
            subtitle="Personalize e encurte seus links de forma rápida e fácil"
          />
        </div>

        <Card className="w-full max-w-4xl rounded-2xl shadow-md bg-zinc-50">
          <CardContent>
            <CreateLinkForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

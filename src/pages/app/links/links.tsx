import { getLinks } from "@/api/get-links";
import { Heading } from "@/components/heading";
import { LinkCard } from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Meta, Title } from "react-head";
import { useNavigate } from "react-router-dom";
import { LinksFilter } from "./links-filter";
import { Separator } from "@/components/ui/separator";

export function LinksPage() {
  const navigate = useNavigate();

  const { data: links } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(),
    staleTime: 1000 * 60 * 5,
  });

  function handleNavigateCreateLink() {
    navigate("/links/create");
  }

  return (
    <>
      <Title>Links | Link Fizz</Title>
      <Meta
        name="description"
        content="Acesse seus links encurtados no Link Fizz"
      />

      <div className="flex flex-row items-center justify-between">
        <Heading title="Link fizzs" />
        <Button onClick={handleNavigateCreateLink}>Criar link</Button>
      </div>
      <LinksFilter />

      <Separator className="my-4" />
      <div className="w-full space-y-6">
        {links && links.length > 0 ? (
          links.map((link) => <LinkCard key={link.id} link={link} />)
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Nenhum link encontrado</h1>
            <p className="text-gray-500">Crie um novo link para começar</p>
            <a
              href="/create-link"
              className="mt-4 text-blue-500 hover:underline"
            >
              Criar link
            </a>
          </div>
        )}
      </div>
    </>
  );
}

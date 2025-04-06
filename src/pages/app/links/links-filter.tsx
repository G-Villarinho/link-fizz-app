import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";

export function LinksFilter() {
  return (
    <div className="w-full flex flex-row gap-2 items-center py-5">
      <Input placeholder="Procurar links..." className="w-[240px]" />
      <Button variant="outline">
        <Calendar /> Filtrar por data de criação
      </Button>
      <Button variant="outline">
        <Filter /> Adicionar filtro
      </Button>
    </div>
  );
}

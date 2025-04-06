import { Copy, Share, Pencil, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useState } from "react";

interface LinkCardActionsProps {
  shortCode: string;
  shortUrl: string;
}

export function LinkCardActions({ shortCode, shortUrl }: LinkCardActionsProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copiado para a área de transferência!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleCopy}>
        <Copy className="w-4 h-4 mr-1" />
        {copied ? "Copiado!" : "Copiar"}
      </Button>
      <Button size="sm" variant="outline">
        <Share className="w-4 h-4 mr-1" />
        Compartilhar
      </Button>
      <Link to={`/links/${shortCode}/edit`}>
        <Button size="sm" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </Link>
      <Button size="sm" variant="outline">
        <Ellipsis className="w-4 h-4" />
      </Button>
    </div>
  );
}

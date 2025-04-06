import { ChartBarDecreasing, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateLinkSucessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shortCode: string;
}

export function CreateLinkSucessModal({
  isOpen,
  onOpenChange,
  shortCode,
}: CreateLinkSucessModalProps) {
  const [copied, setCopied] = useState(false);
  const link = `http://localhost:8080/${shortCode}`;

  function handleCopy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>O seu link está pronto 🎉</DialogTitle>
          <DialogDescription>
            Compartilhe como quiser, ou copie o link abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col items-center gap-4 py-4 rounded-xl bg-muted">
          <div className="px-4 py-1 mb-3 rounded-full bg-accent text-accent-foreground font-semibold text-md">
            linkfizz.com/{shortCode}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <ChartBarDecreasing className="h-4 w-4 mr-2" />
              Ver detalhes
            </Button>

            <Button type="button" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copiado!" : "Copiar link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

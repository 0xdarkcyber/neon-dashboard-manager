
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAccountModal = ({ isOpen, onClose }: AddAccountModalProps) => {
  const [accountName, setAccountName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountName || !apiKey) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Conta adicionada com sucesso");
      setIsLoading(false);
      setAccountName("");
      setApiKey("");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border/50 font-mono">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono">Adicionar Nova Conta</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Conta</Label>
            <Input
              id="name"
              placeholder="Ex: Conta Principal"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="bg-background border-border/50 focus:border-[#4AFF8F]/50 focus:ring-[#4AFF8F]/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua API key aqui"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background border-border/50 focus:border-[#4AFF8F]/50 focus:ring-[#4AFF8F]/20"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="neon-green-glow"
              disabled={isLoading}
            >
              {isLoading ? "Adicionando..." : "Adicionar Conta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

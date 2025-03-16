
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WebhookSettingsProps {
  onSave: (webhooks: WebhookData) => void;
  initialData?: WebhookData;
}

export interface WebhookData {
  main: string;
  error: string;
  win: string;
}

export const WebhookSettings = ({ onSave, initialData }: WebhookSettingsProps) => {
  const [mainWebhook, setMainWebhook] = useState(initialData?.main || "");
  const [errorWebhook, setErrorWebhook] = useState(initialData?.error || "");
  const [winWebhook, setWinWebhook] = useState(initialData?.win || "");
  
  const handleSave = () => {
    onSave({
      main: mainWebhook,
      error: errorWebhook,
      win: winWebhook
    });
    toast.success("Webhooks salvos com sucesso");
  };
  
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label htmlFor="main-webhook" className="font-mono text-sm">Webhook Principal</label>
        <Input 
          id="main-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-background border-border/50 font-mono text-sm"
          value={mainWebhook}
          onChange={(e) => setMainWebhook(e.target.value)}
        />
        <p className="text-xs text-muted-foreground font-mono">Todas as notificações gerais</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="error-webhook" className="font-mono text-sm">Webhook de Erros</label>
        <Input 
          id="error-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-background border-border/50 font-mono text-sm"
          value={errorWebhook}
          onChange={(e) => setErrorWebhook(e.target.value)}
        />
        <p className="text-xs text-muted-foreground font-mono">Alertas de erro do sistema</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="win-webhook" className="font-mono text-sm">Webhook de Vitórias</label>
        <Input 
          id="win-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-background border-border/50 font-mono text-sm"
          value={winWebhook}
          onChange={(e) => setWinWebhook(e.target.value)}
        />
        <p className="text-xs text-muted-foreground font-mono">Notificações de raffles ganhas</p>
      </div>
      
      <Button 
        className="neon-green-glow w-full mt-4"
        onClick={handleSave}
      >
        Salvar Webhooks
      </Button>
    </div>
  );
};

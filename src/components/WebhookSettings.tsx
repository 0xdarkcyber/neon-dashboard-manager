
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
    toast.success("Webhooks saved successfully");
  };
  
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label htmlFor="main-webhook" className="font-mono text-sm text-gray-300">Main Webhook</label>
        <Input 
          id="main-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
          value={mainWebhook}
          onChange={(e) => setMainWebhook(e.target.value)}
        />
        <p className="text-xs text-gray-400 font-mono">All general notifications</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="error-webhook" className="font-mono text-sm text-gray-300">Error Webhook</label>
        <Input 
          id="error-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
          value={errorWebhook}
          onChange={(e) => setErrorWebhook(e.target.value)}
        />
        <p className="text-xs text-gray-400 font-mono">System error alerts</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="win-webhook" className="font-mono text-sm text-gray-300">Win Webhook</label>
        <Input 
          id="win-webhook" 
          placeholder="https://discord.com/api/webhooks/..." 
          className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
          value={winWebhook}
          onChange={(e) => setWinWebhook(e.target.value)}
        />
        <p className="text-xs text-gray-400 font-mono">Raffle win notifications</p>
      </div>
      
      <Button 
        className="w-full mt-4 bg-gray-900 hover:bg-gray-700 text-gray-300 border border-gray-700"
        onClick={handleSave}
      >
        Save Webhooks
      </Button>
    </div>
  );
};

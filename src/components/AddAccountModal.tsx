
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WebhookSettings, WebhookData } from "./WebhookSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { WalletManager, WalletData } from "./WalletManager";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: AccountData) => void;
  editData?: AccountData;
  isEdit?: boolean;
}

export interface AccountData {
  id?: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  webhooks: WebhookData;
  wallets?: WalletData[];
  stats?: {
    totalRaffles: number;
    wins: number;
  };
  lastUsed?: string;
}

export const AddAccountModal = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  editData, 
  isEdit = false 
}: AddAccountModalProps) => {
  const [accountName, setAccountName] = useState(editData?.name || "");
  const [apiKey, setApiKey] = useState(editData?.apiKey || "");
  const [webhooks, setWebhooks] = useState<WebhookData>(editData?.webhooks || {
    main: "",
    error: "",
    win: ""
  });
  const [wallets, setWallets] = useState<WalletData[]>(editData?.wallets || []);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountName || !apiKey) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const accountData: AccountData = {
        id: editData?.id || `acc-${Date.now()}`,
        name: accountName,
        apiKey: apiKey,
        isActive: editData?.isActive ?? true,
        webhooks,
        wallets,
        stats: editData?.stats || {
          totalRaffles: 0,
          wins: 0
        },
        lastUsed: editData?.lastUsed || "Nunca"
      };
      
      onAdd(accountData);
      
      toast.success(`Conta ${isEdit ? 'atualizada' : 'adicionada'} com sucesso`);
      setIsLoading(false);
      
      // Reset form if not editing
      if (!isEdit) {
        setAccountName("");
        setApiKey("");
        setWebhooks({ main: "", error: "", win: "" });
        setWallets([]);
      }
      
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-gray-700/50 font-mono animated-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono">
            {isEdit ? `Editar Conta: ${editData?.name}` : "Adicionar Nova Conta"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full bg-gray-800">
            <TabsTrigger value="account" className="flex-1 data-[state=active]:bg-gray-700">Dados da Conta</TabsTrigger>
            <TabsTrigger value="webhooks" className="flex-1 data-[state=active]:bg-gray-700">Webhooks</TabsTrigger>
            <TabsTrigger value="wallets" className="flex-1 data-[state=active]:bg-gray-700">Wallets</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="account" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Conta</Label>
                <Input
                  id="name"
                  placeholder="Ex: Conta Principal"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="bg-gray-800 border-gray-700/50 focus:border-gray-500/50 focus:ring-gray-500/20"
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
                  className="bg-gray-800 border-gray-700/50 focus:border-gray-500/50 focus:ring-gray-500/20"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="webhooks">
              <WebhookSettings 
                onSave={setWebhooks} 
                initialData={webhooks}
              />
            </TabsContent>
            
            <TabsContent value="wallets">
              <WalletManager 
                onSave={setWallets}
                initialWallets={wallets}
              />
            </TabsContent>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
                className="border-gray-700 hover:bg-gray-800"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-700"
                disabled={isLoading}
              >
                {isLoading ? 
                  (isEdit ? "Atualizando..." : "Adicionando...") : 
                  (isEdit ? "Salvar Alterações" : "Adicionar Conta")
                }
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

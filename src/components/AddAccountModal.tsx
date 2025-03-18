
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
      toast.error("Please fill all required fields");
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
        lastUsed: editData?.lastUsed || "Never"
      };
      
      onAdd(accountData);
      
      toast.success(`Account ${isEdit ? 'updated' : 'added'} successfully`);
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
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono text-gray-300">
            {isEdit ? `Edit Account: ${editData?.name}` : "Add New Account"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full bg-gray-800 border border-gray-700">
            <TabsTrigger 
              value="account" 
              className="flex-1 text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
            >
              Account Data
            </TabsTrigger>
            <TabsTrigger 
              value="webhooks" 
              className="flex-1 text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
            >
              Webhooks
            </TabsTrigger>
            <TabsTrigger 
              value="wallets" 
              className="flex-1 text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
            >
              Wallets
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="account" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Account Name</Label>
                <Input
                  id="name"
                  placeholder="Ex: Main Account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-gray-600 text-gray-300 placeholder-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-gray-300">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Paste your API key here"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-gray-600 text-gray-300 placeholder-gray-500"
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
            
            <DialogFooter className="mt-6 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-700 text-gray-300"
                disabled={isLoading}
              >
                {isLoading ? 
                  (isEdit ? "Updating..." : "Adding...") : 
                  (isEdit ? "Save Changes" : "Add Account")
                }
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

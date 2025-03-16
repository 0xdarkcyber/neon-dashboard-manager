
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AccountData } from "./AddAccountModal";
import { 
  Edit, 
  Trash2, 
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface AccountCardProps {
  account: AccountData;
  onEdit: (account: AccountData) => void;
  onRemove: (id: string) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
}

export const AccountCard = ({ 
  account, 
  onEdit, 
  onRemove,
  onToggleActive
}: AccountCardProps) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  
  const handleToggle = () => {
    onToggleActive(account.id!, !account.isActive);
    toast.success(`Conta ${!account.isActive ? 'ativada' : 'desativada'} com sucesso`);
  };
  
  const confirmDelete = () => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      setTimeout(() => setIsConfirmingDelete(false), 3000); // Reset after 3 seconds
      return;
    }
    
    onRemove(account.id!);
    setIsConfirmingDelete(false);
    toast.success("Conta removida com sucesso");
  };
  
  return (
    <Card className={`card-stats p-4 animated-border ${!account.isActive ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-mono font-bold flex items-center gap-2">
            {account.name}
            {!account.isActive && (
              <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
                Inativa
              </span>
            )}
          </h3>
          <p className="text-xs text-gray-500 font-mono flex items-center gap-1">
            <span>Último uso: {account.lastUsed || "Nunca"}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center mr-2">
            <span className="text-xs mr-2 text-gray-500">
              {account.isActive ? "On" : "Off"}
            </span>
            <Switch 
              checked={account.isActive} 
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-gray-500"
            />
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8" 
            onClick={() => onEdit(account)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className={`h-8 w-8 ${isConfirmingDelete ? 'text-destructive' : ''}`}
            onClick={confirmDelete}
          >
            {isConfirmingDelete ? <AlertCircle className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-3 text-sm font-mono">
        <div className="bg-gray-900/50 rounded p-2">
          <p className="text-xs text-gray-500">Raffles Total</p>
          <p className="font-bold">{account.stats?.totalRaffles || 0}</p>
        </div>
        <div className="bg-gray-900/50 rounded p-2">
          <p className="text-xs text-gray-500">Vitórias</p>
          <p className="font-bold">{account.stats?.wins || 0}</p>
        </div>
        <div className="bg-gray-900/50 rounded p-2">
          <p className="text-xs text-gray-500">Taxa</p>
          <p className="font-bold">
            {account.stats?.totalRaffles 
              ? ((account.stats.wins / account.stats.totalRaffles) * 100).toFixed(1) + '%'
              : '0%'
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

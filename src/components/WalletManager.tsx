
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export interface WalletData {
  network: 'BTC' | 'EVM' | 'SOL';
  address: string;
}

interface WalletManagerProps {
  onSave: (wallets: WalletData[]) => void;
  initialWallets?: WalletData[];
}

export const WalletManager: React.FC<WalletManagerProps> = ({ onSave, initialWallets = [] }) => {
  const [btcWallets, setBtcWallets] = useState<string[]>(
    initialWallets.filter(w => w.network === 'BTC').map(w => w.address).slice(0, 5)
  );
  
  const [evmWallets, setEvmWallets] = useState<string[]>(
    initialWallets.filter(w => w.network === 'EVM').map(w => w.address).slice(0, 5)
  );
  
  const [solWallets, setSolWallets] = useState<string[]>(
    initialWallets.filter(w => w.network === 'SOL').map(w => w.address).slice(0, 5)
  );

  const [newAddress, setNewAddress] = useState('');
  const [activeTab, setActiveTab] = useState('BTC');

  const handleAddWallet = () => {
    if (!newAddress.trim()) {
      toast.error('Please enter a wallet address');
      return;
    }

    switch (activeTab) {
      case 'BTC':
        if (btcWallets.length >= 5) {
          toast.error('Maximum 5 BTC wallets allowed');
          return;
        }
        setBtcWallets([...btcWallets, newAddress]);
        break;
      case 'EVM':
        if (evmWallets.length >= 5) {
          toast.error('Maximum 5 EVM wallets allowed');
          return;
        }
        setEvmWallets([...evmWallets, newAddress]);
        break;
      case 'SOL':
        if (solWallets.length >= 5) {
          toast.error('Maximum 5 Solana wallets allowed');
          return;
        }
        setSolWallets([...solWallets, newAddress]);
        break;
    }
    
    setNewAddress('');
  };

  const handleRemoveWallet = (network: string, index: number) => {
    switch (network) {
      case 'BTC':
        setBtcWallets(btcWallets.filter((_, i) => i !== index));
        break;
      case 'EVM':
        setEvmWallets(evmWallets.filter((_, i) => i !== index));
        break;
      case 'SOL':
        setSolWallets(solWallets.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSave = () => {
    const allWallets: WalletData[] = [
      ...btcWallets.map(address => ({ network: 'BTC' as const, address })),
      ...evmWallets.map(address => ({ network: 'EVM' as const, address })),
      ...solWallets.map(address => ({ network: 'SOL' as const, address }))
    ];
    
    onSave(allWallets);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-lg mb-4 text-gray-300">Wallet Addresses</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-gray-800 border border-gray-700">
          <TabsTrigger 
            value="BTC" 
            className="w-1/3 font-mono text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
          >
            BTC ({btcWallets.length}/5)
          </TabsTrigger>
          <TabsTrigger 
            value="EVM" 
            className="w-1/3 font-mono text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
          >
            EVM ({evmWallets.length}/5)
          </TabsTrigger>
          <TabsTrigger 
            value="SOL" 
            className="w-1/3 font-mono text-gray-400 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-300"
          >
            SOL ({solWallets.length}/5)
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 mb-4">
          <div className="flex gap-2">
            <Input
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder={`Add ${activeTab} wallet address`}
              className="bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500"
            />
            <Button 
              type="button" 
              onClick={handleAddWallet}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800"
            >
              Add
            </Button>
          </div>
        </div>

        <TabsContent value="BTC" className="space-y-2">
          {btcWallets.map((wallet, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-md">
              <span className="font-mono text-sm text-gray-300 truncate flex-1">{wallet}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveWallet('BTC', index)}
                className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {btcWallets.length === 0 && (
            <p className="text-gray-400 text-sm">No BTC wallets added.</p>
          )}
        </TabsContent>

        <TabsContent value="EVM" className="space-y-2">
          {evmWallets.map((wallet, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-md">
              <span className="font-mono text-sm text-gray-300 truncate flex-1">{wallet}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveWallet('EVM', index)}
                className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {evmWallets.length === 0 && (
            <p className="text-gray-400 text-sm">No EVM wallets added.</p>
          )}
        </TabsContent>

        <TabsContent value="SOL" className="space-y-2">
          {solWallets.map((wallet, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-md">
              <span className="font-mono text-sm text-gray-300 truncate flex-1">{wallet}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveWallet('SOL', index)}
                className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {solWallets.length === 0 && (
            <p className="text-gray-400 text-sm">No Solana wallets added.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <Button 
          type="button" 
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 w-full"
          onClick={handleSave}
        >
          Save Wallets
        </Button>
      </div>
    </div>
  );
};

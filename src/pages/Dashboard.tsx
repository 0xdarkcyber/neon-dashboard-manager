
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Plus, 
  Layers, 
  User, 
  LogOut,
  Settings,
  Bell,
  Terminal,
  Webhook
} from "lucide-react";
import { AddAccountModal, AccountData } from "@/components/AddAccountModal";
import { AccountCard } from "@/components/AccountCard";
import { WebhookSettings, WebhookData } from "@/components/WebhookSettings";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [editingAccount, setEditingAccount] = useState<AccountData | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [globalWebhooks, setGlobalWebhooks] = useState<WebhookData>({
    main: "",
    error: "",
    win: ""
  });

  // Simulating initial data load
  useEffect(() => {
    // In a real app, this would come from an API
    setAccounts([
      {
        id: "acc-1",
        name: "Conta Principal",
        apiKey: "api-key-xxxxx",
        isActive: true,
        webhooks: {
          main: "https://discord.com/api/webhooks/example1",
          error: "",
          win: ""
        },
        stats: {
          totalRaffles: 427,
          wins: 24
        },
        lastUsed: "2h atrás"
      },
      {
        id: "acc-2",
        name: "Conta Secundária",
        apiKey: "api-key-yyyyy",
        isActive: false,
        webhooks: {
          main: "",
          error: "",
          win: ""
        },
        stats: {
          totalRaffles: 189,
          wins: 11
        },
        lastUsed: "5d atrás"
      }
    ]);
    
    setGlobalWebhooks({
      main: "https://discord.com/api/webhooks/global",
      error: "https://discord.com/api/webhooks/errors",
      win: "https://discord.com/api/webhooks/wins"
    });
  }, []);

  const handleAddAccount = (account: AccountData) => {
    if (isEditing) {
      setAccounts(accounts.map(acc => 
        acc.id === account.id ? account : acc
      ));
    } else {
      setAccounts([...accounts, account]);
    }
    resetEditState();
  };
  
  const handleEditAccount = (account: AccountData) => {
    setEditingAccount(account);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  
  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };
  
  const handleToggleActive = (id: string, isActive: boolean) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, isActive } : account
    ));
  };
  
  const resetEditState = () => {
    setIsEditing(false);
    setEditingAccount(undefined);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetEditState();
  };
  
  const handleSaveGlobalWebhooks = (webhooks: WebhookData) => {
    setGlobalWebhooks(webhooks);
  };

  // Calculate total stats
  const totalStats = accounts.reduce((acc, account) => {
    return {
      totalAccounts: accounts.length,
      activeAccounts: acc.activeAccounts + (account.isActive ? 1 : 0),
      totalRaffles: acc.totalRaffles + (account.stats?.totalRaffles || 0),
      totalWins: acc.totalWins + (account.stats?.wins || 0)
    };
  }, { totalAccounts: 0, activeAccounts: 0, totalRaffles: 0, totalWins: 0 });

  const stats = [
    { label: "Total Contas", value: totalStats.totalAccounts.toString() },
    { label: "Contas Ativas", value: totalStats.activeAccounts.toString() },
    { label: "Total Raffles", value: totalStats.totalRaffles.toLocaleString() },
    { label: "Raffles Ganhas", value: totalStats.totalWins.toLocaleString() },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 text-foreground">
      {/* Sidebar with elevated design */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-card/90 backdrop-blur-sm border-r border-border/30 p-4">
        <div className="gray-glow-effect inline-block p-2 mb-8">
          <Link to="/">
            <h2 className="text-2xl font-mono font-bold tracking-tighter gray-glow-text">
              ready.boost<span className="animate-pulse">_</span>
            </h2>
          </Link>
        </div>
        
        <nav className="space-y-1 mt-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-foreground bg-accent/10"
          >
            <Terminal className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-muted-foreground"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Estatísticas
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-muted-foreground"
          >
            <Webhook className="mr-2 h-5 w-5" />
            Webhooks
          </Button>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-destructive"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content with improved UI */}
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-mono font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              className="neon-green-glow" 
              onClick={() => {
                resetEditState();
                setIsModalOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Improved Stats Cards with animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="card-stats bg-gradient-to-br from-card/80 to-card/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="font-mono">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold gray-glow-text">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Tabs with accounts and webhook settings */}
        <Tabs defaultValue="accounts" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="accounts" className="font-mono">Contas</TabsTrigger>
            <TabsTrigger value="webhooks" className="font-mono">Webhooks Globais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            {/* Filter tabs for accounts */}
            <Tabs defaultValue="all" className="mb-4">
              <TabsList className="mb-4">
                <TabsTrigger value="all" className="font-mono">Todas</TabsTrigger>
                <TabsTrigger value="active" className="font-mono">Ativas</TabsTrigger>
                <TabsTrigger value="inactive" className="font-mono">Inativas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.length > 0 ? (
                  accounts.map(account => (
                    <AccountCard 
                      key={account.id}
                      account={account}
                      onEdit={handleEditAccount}
                      onRemove={handleRemoveAccount}
                      onToggleActive={handleToggleActive}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground font-mono">
                      Nenhuma conta cadastrada.{" "}
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-mono text-accent"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Adicionar agora
                      </Button>
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="active" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.filter(a => a.isActive).length > 0 ? (
                  accounts
                    .filter(account => account.isActive)
                    .map(account => (
                      <AccountCard 
                        key={account.id}
                        account={account}
                        onEdit={handleEditAccount}
                        onRemove={handleRemoveAccount}
                        onToggleActive={handleToggleActive}
                      />
                    ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground font-mono">
                      Nenhuma conta ativa encontrada.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="inactive" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.filter(a => !a.isActive).length > 0 ? (
                  accounts
                    .filter(account => !account.isActive)
                    .map(account => (
                      <AccountCard 
                        key={account.id}
                        account={account}
                        onEdit={handleEditAccount}
                        onRemove={handleRemoveAccount}
                        onToggleActive={handleToggleActive}
                      />
                    ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground font-mono">
                      Nenhuma conta inativa encontrada.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card className="card-stats bg-gradient-to-br from-card/80 to-card/30 p-6">
              <h3 className="font-mono text-lg font-bold mb-4">Webhooks Discord Globais</h3>
              <p className="text-sm text-muted-foreground mb-6 font-mono">
                Configure webhooks globais para todas as contas. Cada conta pode ter configurações específicas que substituem estas.
              </p>
              
              <WebhookSettings
                onSave={handleSaveGlobalWebhooks}
                initialData={globalWebhooks}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Account Modal (Add/Edit) */}
      <AddAccountModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onAdd={handleAddAccount}
        editData={editingAccount}
        isEdit={isEditing}
      />
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Plus, 
  Settings, 
  Bell, 
  Layers, 
  User, 
  LogOut 
} from "lucide-react";
import { AddAccountModal } from "@/components/AddAccountModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "Total Contas", value: "12" },
    { label: "Contas Ativas", value: "8" },
    { label: "Total Raffles", value: "1,432" },
    { label: "Raffles Ganhas", value: "86" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 p-4">
        <div className="gray-glow-effect inline-block p-2 mb-8">
          <h2 className="text-2xl font-mono font-bold tracking-tighter gray-glow-text">
            ready.boost<span className="animate-pulse">_</span>
          </h2>
        </div>
        
        <nav className="space-y-2 mt-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-foreground"
          >
            <Layers className="mr-2 h-5 w-5" />
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
            <Settings className="mr-2 h-5 w-5" />
            Configurações
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-muted-foreground"
          >
            <Bell className="mr-2 h-5 w-5" />
            Notificações
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
      
      {/* Main content */}
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-mono font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button className="neon-green-glow" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-stats">
              <div className="font-mono">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold gray-glow-text">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Accounts */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="font-mono">Todas as Contas</TabsTrigger>
            <TabsTrigger value="active" className="font-mono">Ativas</TabsTrigger>
            <TabsTrigger value="inactive" className="font-mono">Inativas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example account cards - these would be populated from your data */}
            {[1, 2, 3, 4].map((account) => (
              <Card key={account} className="card-stats p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-mono font-bold">Conta #{account}</h3>
                    <p className="text-sm text-muted-foreground font-mono">Último uso: 2h atrás</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm font-mono">Ativa</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-mono">
                  <div>
                    <p className="text-muted-foreground">Raffles Total</p>
                    <p>124</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ganhos</p>
                    <p>6</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="active">
            {/* Content for active accounts */}
          </TabsContent>
          
          <TabsContent value="inactive">
            {/* Content for inactive accounts */}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Account Modal */}
      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;

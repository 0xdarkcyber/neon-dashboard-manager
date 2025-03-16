
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Settings, Bell, Layers, User, LogOut } from "lucide-react";

const AccountSettings = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar - same as Dashboard */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 p-4">
        <div className="gray-glow-effect inline-block p-2 mb-8">
          <h2 className="text-2xl font-mono font-bold tracking-tighter gray-glow-text">
            ready.boost<span className="animate-pulse">_</span>
          </h2>
        </div>
        
        <nav className="space-y-2 mt-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-muted-foreground"
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
            className="w-full justify-start font-mono text-foreground"
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
          <h1 className="text-2xl font-mono font-bold">Configurações</h1>
          
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="webhooks" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="webhooks" className="font-mono">Webhooks Discord</TabsTrigger>
          </TabsList>
          
          <TabsContent value="webhooks">
            <Card className="card-stats p-6">
              <h3 className="font-mono text-lg font-bold mb-4">Configuração de Webhooks</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="main-webhook" className="font-mono">Webhook Principal</label>
                  <Input 
                    id="main-webhook" 
                    placeholder="https://discord.com/api/webhooks/..." 
                    className="bg-background border-border/50 font-mono"
                  />
                  <p className="text-sm text-muted-foreground font-mono">Todas as notificações gerais serão enviadas para este webhook</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="error-webhook" className="font-mono">Webhook de Erros</label>
                  <Input 
                    id="error-webhook" 
                    placeholder="https://discord.com/api/webhooks/..." 
                    className="bg-background border-border/50 font-mono"
                  />
                  <p className="text-sm text-muted-foreground font-mono">Alertas de erro do sistema</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="win-webhook" className="font-mono">Webhook de Vitórias</label>
                  <Input 
                    id="win-webhook" 
                    placeholder="https://discord.com/api/webhooks/..." 
                    className="bg-background border-border/50 font-mono"
                  />
                  <p className="text-sm text-muted-foreground font-mono">Notificações de raffles ganhas</p>
                </div>
                
                <Button className="neon-green-glow">Salvar Configurações</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountSettings;

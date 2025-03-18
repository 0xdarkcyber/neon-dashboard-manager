
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Settings, 
  Bell, 
  Layers, 
  User, 
  LogOut,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";

type NotificationType = "error" | "success" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "error",
      message: "Connection failure with Alphabot API",
      timestamp: "10:23:45",
      read: false
    },
    {
      id: 2,
      type: "success",
      message: "Raffle won: ETH Denver Whitelist",
      timestamp: "09:15:32",
      read: false
    },
    {
      id: 3,
      type: "info",
      message: "Account #2 participated in 15 raffles today",
      timestamp: "08:45:21",
      read: true
    },
    {
      id: 4,
      type: "error",
      message: "Proxy #5 blocked by Captcha",
      timestamp: "Yesterday, 23:12:05",
      read: true
    },
    {
      id: 5,
      type: "success",
      message: "Raffle won: NFT Minter Access",
      timestamp: "Yesterday, 20:35:11",
      read: true
    }
  ]);

  const getIconByType = (type: NotificationType) => {
    switch (type) {
      case "error":
        return <AlertCircle className="text-destructive" />;
      case "success":
        return <CheckCircle className="text-accent" />;
      case "info":
        return <Info className="text-primary" />;
    }
  };

  const getClassByType = (type: NotificationType, read: boolean) => {
    const baseClass = "border-l-4 ";
    if (read) return baseClass + "border-muted";
    
    switch (type) {
      case "error":
        return baseClass + "border-destructive";
      case "success":
        return baseClass + "border-accent";
      case "info":
        return baseClass + "border-primary";
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar - same as other pages */}
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
            Statistics
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-muted-foreground"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start font-mono text-foreground"
          >
            <Bell className="mr-2 h-5 w-5" />
            Notifications
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
          <h1 className="text-2xl font-mono font-bold">Notifications</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="font-mono text-sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Card className="card-stats p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg font-bold">Alert System</h3>
              <div className="font-mono text-sm text-muted-foreground">
                {notifications.filter(n => !n.read).length} unread
              </div>
            </div>
            
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`${getClassByType(notification.type, notification.read)} pl-4 pr-6 py-4 bg-card/50 rounded-r-md flex items-start gap-3 font-mono ${notification.read ? 'opacity-70' : 'opacity-100'}`}
                >
                  <div className="mt-1">
                    {getIconByType(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p>{notification.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;

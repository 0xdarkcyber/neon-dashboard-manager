
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const Index = () => {
  const [text, setText] = useState("");
  const fullText = "ready.boost";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="space-y-8 text-center">
        <div className="glow-effect inline-block p-2">
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter glow-text">
            {text}<span className="animate-pulse">_</span>
          </h1>
        </div>
        
        <p className="text-muted-foreground font-mono max-w-[600px] mx-auto">
          Sistema de gerenciamento de contas Alphabot para automação de raffles
        </p>
        
        <Button
          className="glow-effect relative font-mono text-lg group hover:shadow-[0_0_2rem_-0.5rem] hover:shadow-primary/40 transition-all duration-300"
          size="lg"
        >
          <Terminal className="mr-2 h-5 w-5" />
          <span className="relative z-10">
            Login com Discord
          </span>
        </Button>
      </div>
      
      <div className="fixed bottom-4 left-4 font-mono text-sm text-muted-foreground">
        <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse mr-2" />
        Sistema operacional
      </div>
    </div>
  );
};

export default Index;

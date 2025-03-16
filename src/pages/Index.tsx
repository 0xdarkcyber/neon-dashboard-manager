
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Terminal, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/70 p-4">
      <div className="space-y-12 text-center max-w-3xl">
        <div className="gray-glow-effect inline-block p-3">
          <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter gray-glow-text">
            {text}<span className="animate-pulse">_</span>
          </h1>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-400 font-mono max-w-xl mx-auto">
            Sistema avançado de gestão para raffles
          </p>
          
          <Link to="/dashboard">
            <Button
              className="neon-green-glow relative font-mono text-lg group px-8 py-6 hover:shadow-[0_0_2rem_-0.5rem] hover:shadow-[#4AFF8F]/40 transition-all duration-300"
              size="lg"
            >
              <Terminal className="mr-2 h-5 w-5" />
              <span className="relative z-10">
                Login com Discord
              </span>
              <ChevronRight className="ml-2 h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 w-full max-w-md">
        <div className="text-center text-muted-foreground text-sm font-mono">
          <p>© 2023 ready.boost • Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

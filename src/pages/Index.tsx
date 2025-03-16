
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80 p-4 relative overflow-hidden">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-10 pointer-events-none" />
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-gray-800/20 rounded-full blur-3xl animate-pulse-strong" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gray-700/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gray-600/20 rounded-full blur-2xl animate-float" />
      
      <div className="space-y-12 text-center max-w-3xl relative z-10">
        <div className="colorful-glow-effect inline-block p-5 bouncing">
          <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter colorful-glow-text">
            {text}<span className="animate-pulse">_</span>
          </h1>
          <div className="flex justify-center mt-2">
            <span className="h-6 w-6 text-gray-400 animate-subtle-pulse mr-1">○</span>
            <span className="h-6 w-6 text-gray-300 animate-subtle-pulse">●</span>
          </div>
        </div>
        
        <div className="space-y-8">
          <p className="text-lg md:text-xl text-gray-400 font-mono max-w-xl mx-auto floating-delay-1">
            Sistema avançado de gestão para raffles
          </p>
          
          <Link to="/dashboard">
            <Button
              className="white-glow relative font-mono text-lg group px-8 py-6 bg-gray-900 text-white hover:text-white hover:bg-gray-800 transition-all duration-300 floating-delay-2 animated-border"
              size="lg"
            >
              <Terminal className="mr-2 h-5 w-5" />
              <span className="relative z-10">
                Login
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 w-full max-w-md">
        <div className="text-center text-gray-500 text-sm font-mono floating-delay-3">
          <p>© 2023 ready.boost • Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

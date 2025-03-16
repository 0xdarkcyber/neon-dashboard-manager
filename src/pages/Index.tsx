
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
        <div className="gray-glow-effect inline-block p-2">
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter gray-glow-text">
            {text}<span className="animate-pulse">_</span>
          </h1>
        </div>
        
        <Button
          className="neon-green-glow relative font-mono text-lg group hover:shadow-[0_0_2rem_-0.5rem] hover:shadow-[#4AFF8F]/40 transition-all duration-300"
          size="lg"
        >
          <Terminal className="mr-2 h-5 w-5" />
          <span className="relative z-10">
            Login com Discord
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Index;

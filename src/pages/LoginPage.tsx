
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const navigate = useNavigate();
  
  const fullText = `> connecting to ready.boost network...
> initializing secure token...
> waiting for authentication...`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 flex flex-col justify-center items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-gray-200 mb-6">
            ready.boost<span className="text-gray-500">_</span>
          </h2>
          
          <div className="bg-gray-800/80 border border-gray-700/60 rounded-lg p-6 mb-6 animated-border">
            <pre className="font-mono text-gray-300 text-sm text-left">
              {terminalText}
              <span className="inline-block animate-pulse">▋</span>
            </pre>
          </div>
          
          <Button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600 transition-all duration-300 py-6"
          >
            <Terminal className="mr-2 h-5 w-5" />
            {loading ? "Connecting..." : "Login with Discord"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

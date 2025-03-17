
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight, ExternalLink, Twitter, Globe, MessagesSquare } from 'lucide-react';

export interface WhitelistWin {
  id: string;
  projectName: string;
  imageUrl: string;
  mintDate: string;
  price: string;
  account: string;
  links: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
}

interface WhitelistPanelProps {
  whitelists: WhitelistWin[];
}

export const WhitelistPanel: React.FC<WhitelistPanelProps> = ({ whitelists }) => {
  const [selectedWhitelist, setSelectedWhitelist] = useState<WhitelistWin | null>(null);

  return (
    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-800/30 border border-gray-700/30 animated-border">
      <CardHeader>
        <h3 className="font-mono text-lg font-bold text-gray-200">Recent Whitelist Wins</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-700/30">
          {whitelists.map((whitelist) => (
            <Sheet key={whitelist.id}>
              <div className="flex items-center justify-between p-4 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img 
                      src={whitelist.imageUrl} 
                      alt={whitelist.projectName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-mono text-gray-200">{whitelist.projectName}</h4>
                    <p className="text-xs text-gray-400">Mint: {whitelist.mintDate}</p>
                  </div>
                </div>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0"
                    onClick={() => setSelectedWhitelist(whitelist)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </div>
              
              <SheetContent className="bg-gray-800 border-l border-gray-700/50">
                <SheetHeader>
                  <SheetTitle className="font-mono text-gray-200">
                    {whitelist.projectName}
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div className="w-full h-40 rounded-lg overflow-hidden">
                    <img 
                      src={whitelist.imageUrl} 
                      alt={whitelist.projectName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mint Date</span>
                      <span className="text-gray-200">{whitelist.mintDate}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="text-gray-200">{whitelist.price}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account</span>
                      <span className="text-gray-200">{whitelist.account}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-2">
                    {whitelist.links.website && (
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700" asChild>
                        <a href={whitelist.links.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    
                    {whitelist.links.twitter && (
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700" asChild>
                        <a href={whitelist.links.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 mr-1" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    
                    {whitelist.links.discord && (
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700" asChild>
                        <a href={whitelist.links.discord} target="_blank" rel="noopener noreferrer">
                          <MessagesSquare className="h-4 w-4 mr-1" />
                          Discord
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ))}
          
          {whitelists.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-400 font-mono">No whitelist wins yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

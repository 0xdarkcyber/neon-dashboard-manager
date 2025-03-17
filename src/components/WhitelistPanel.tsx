import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Twitter, MessageSquare } from 'lucide-react';

interface WhitelistEntry {
  id: string;
  projectName: string;
  imageUrl: string;
  date: string;
  mintDate: string;
  account: string;
  links: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
  description: string;
}

const mockWhitelistData: WhitelistEntry[] = [
  {
    id: 'wl-1',
    projectName: 'Celestial Guardians',
    imageUrl: 'https://picsum.photos/seed/picsum1/300/300',
    date: '2023-06-15',
    mintDate: '2023-07-01',
    account: 'Conta Principal',
    links: {
      website: 'https://example.com/celestial',
      twitter: 'https://twitter.com/celestial',
      discord: 'https://discord.gg/celestial'
    },
    description: 'PFP Collection com 5,555 NFTs. Mint em SOL, preço 1 SOL.'
  },
  {
    id: 'wl-2',
    projectName: 'Neon Samurai',
    imageUrl: 'https://picsum.photos/seed/picsum2/300/300',
    date: '2023-06-10',
    mintDate: '2023-06-30',
    account: 'Conta Secundária',
    links: {
      website: 'https://example.com/neon',
      twitter: 'https://twitter.com/neon',
      discord: 'https://discord.gg/neon'
    },
    description: 'Collection exclusiva com 3,333 NFTs. Mint em ETH, preço 0.05 ETH.'
  },
  {
    id: 'wl-3',
    projectName: 'Cryptic Realms',
    imageUrl: 'https://picsum.photos/seed/picsum3/300/300',
    date: '2023-06-05',
    mintDate: '2023-06-25',
    account: 'Conta Principal',
    links: {
      website: 'https://example.com/cryptic',
      twitter: 'https://twitter.com/cryptic',
      discord: 'https://discord.gg/cryptic'
    },
    description: 'Gamefi project with 10,000 NFTs. Mint em ETH, preço 0.08 ETH.'
  },
  {
    id: 'wl-4',
    projectName: 'Digital Dreamers',
    imageUrl: 'https://picsum.photos/seed/picsum4/300/300',
    date: '2023-06-01',
    mintDate: '2023-06-20',
    account: 'Conta Principal',
    links: {
      website: 'https://example.com/digital',
      twitter: 'https://twitter.com/digital',
      discord: 'https://discord.gg/digital'
    },
    description: 'Arte generativa com 7,777 NFTs. Mint em ETH, preço 0.1 ETH.'
  },
];

export const WhitelistPanel = () => {
  return (
    <Card className="bg-gray-800 border border-gray-700/30 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono text-gray-300">WL Win</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-250px)] px-4">
          <div className="space-y-3 py-2">
            {mockWhitelistData.map((entry) => (
              <WhitelistEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const WhitelistEntryCard: React.FC<{ entry: WhitelistEntry }> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const formattedDate = new Date(entry.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedMintDate = new Date(entry.mintDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return (
    <Collapsible 
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700/30"
      open={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <div className="p-3 flex items-center gap-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-800">
          <img 
            src={entry.imageUrl} 
            alt={entry.projectName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="font-mono text-gray-300 truncate">{entry.projectName}</h4>
          <p className="text-xs text-gray-500">Ganho em: {formattedDate}</p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-400 hover:text-gray-300">
            <span className="sr-only">Toggle</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <div className="px-3 pb-3 pt-0">
          <div className="bg-gray-800 rounded p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div>
                <span className="block">Mint date:</span>
                <span className="font-medium text-gray-400">{formattedMintDate}</span>
              </div>
              <div>
                <span className="block">Conta:</span>
                <span className="font-medium text-gray-400">{entry.account}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">{entry.description}</p>
            
            <div className="flex gap-2 pt-1">
              {entry.links.website && (
                <Button variant="outline" size="sm" className="h-8 bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 text-gray-400">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="sr-only">Website</span>
                </Button>
              )}
              
              {entry.links.twitter && (
                <Button variant="outline" size="sm" className="h-8 bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 text-gray-400">
                  <Twitter className="h-3.5 w-3.5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              )}
              
              {entry.links.discord && (
                <Button variant="outline" size="sm" className="h-8 bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 text-gray-400">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="sr-only">Discord</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

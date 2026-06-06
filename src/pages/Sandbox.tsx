import { useState } from 'react';
import { Send, Map as MapIcon, Users, History, Settings, Globe, Swords, Scroll, Crown, Shield, Building2, Anchor } from 'lucide-react';
import FantasyMap from '../components/FantasyMap';
import type { Territory } from '../data/mapData';

export default function Sandbox() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'ai', content: 'Welcome, Chronicler. You stand at the precipice of the Third Age. The Kingdom of Eldoria is under siege by the Frost Giants from the north. The Drakkenheim Empire masses its armies on the eastern border. What will you do?' }
  ]);
  const [input, setInput] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'chat'>('split');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    setTimeout(() => {
      const responses = [
        'The winds of fate shift. Your command ripples through the magical essence of the realm. The siege continues, but a new hope emerges from the Whispering Woods...',
        'The Chronicler pens your decree into the Book of Ages. Word spreads quickly — riders carry your message to every corner of Aethermoor. The consequences will be felt for generations.',
        'The arcane ley-lines tremble as your words take hold. Across the Crystal Peaks, the mages sense a great change coming. The dragons of Drakkenheim stir in their volcanic slumber.',
        'A raven arrives from the Shadowfen Wastes bearing news: the Lich-Kings have noted your actions. In the Frostmarch, the clans debate whether to march south...',
      ];
      setMessages(prev => [...prev, { role: 'ai', content: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 800 + Math.random() * 1200);
  };

  const handleTerritorySelect = (territory: Territory) => {
    setSelectedTerritory(prev => prev?.id === territory.id ? null : territory);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-14 md:w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-4 shrink-0">
        <button
          onClick={() => setViewMode('split')}
          className={`p-2.5 rounded-xl transition-colors ${viewMode === 'split' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}
        >
          <MapIcon size={20} />
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`p-2.5 rounded-xl transition-colors ${viewMode === 'map' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}
        >
          <Globe size={20} />
        </button>
        <button
          onClick={() => setViewMode('chat')}
          className={`p-2.5 rounded-xl transition-colors ${viewMode === 'chat' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}
        >
          <Scroll size={20} />
        </button>
        <div className="w-8 h-px bg-slate-800 my-2" />
        <button className="p-2.5 text-slate-500 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Swords size={20} />
        </button>
        <button className="p-2.5 text-slate-500 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Users size={20} />
        </button>
        <button className="p-2.5 text-slate-500 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <History size={20} />
        </button>
        <div className="mt-auto p-2.5 text-slate-500 hover:bg-slate-800 hover:text-white rounded-xl transition-colors cursor-pointer">
          <Settings size={20} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Panel */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className={`${viewMode === 'map' ? 'flex-1' : 'flex-1 lg:flex-[0.6]'} relative`}>
            <FantasyMap
              onTerritorySelect={handleTerritorySelect}
              selectedTerritory={selectedTerritory?.id ?? null}
            />
          </div>
        )}

        {/* Right Panel — Chat + Info */}
        {(viewMode === 'split' || viewMode === 'chat') && (
          <div className={`${viewMode === 'chat' ? 'flex-1' : 'hidden lg:flex lg:flex-col lg:flex-[0.4]'} min-w-0`}>
            {/* Selected Territory Info */}
            {selectedTerritory && (
              <div className="p-4 bg-slate-900 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedTerritory.color }} />
                  <h3 className="font-bold text-sm text-white">{selectedTerritory.name}</h3>
                  <button onClick={() => setSelectedTerritory(null)} className="ml-auto text-slate-500 hover:text-white text-xs">✕</button>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{selectedTerritory.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-slate-950 rounded-lg p-2">
                    <span className="text-slate-500 block mb-0.5">Capital</span>
                    <span className="text-slate-200 font-medium">{selectedTerritory.capital}</span>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-2">
                    <span className="text-slate-500 block mb-0.5">Population</span>
                    <span className="text-slate-200 font-medium">{selectedTerritory.population}</span>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-2">
                    <span className="text-slate-500 block mb-0.5">Government</span>
                    <span className="text-slate-200 font-medium">{selectedTerritory.government}</span>
                  </div>
                  <div className="bg-slate-950 rounded-lg p-2">
                    <span className="text-slate-500 block mb-0.5">Settlements</span>
                    <span className="text-slate-200 font-medium">{selectedTerritory.cities.length} locations</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1.5">Locations</span>
                  {selectedTerritory.cities.map((city, ci) => {
                    const CityIcon = city.type === 'capital' ? Crown : city.type === 'fortress' ? Shield : city.type === 'port' ? Anchor : Building2;
                    return (
                      <div key={ci} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <CityIcon size={12} className="text-slate-500" />
                        <span>{city.name}</span>
                        <span className="text-slate-600 text-[9px] ml-auto uppercase">{city.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-sm'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-sm'
                    }`}>
                      <p>{m.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-800 bg-slate-900/50 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tell the AI what happens next..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all shadow-lg shadow-purple-600/20 active:scale-90"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

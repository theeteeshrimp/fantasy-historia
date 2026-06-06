import { useState } from 'react';
import { Send, Map as MapIcon, Users, History, Settings, ChevronRight, Globe } from 'lucide-react';

export default function Sandbox() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Welcome, Chronicler. You stand at the precipice of the Third Age. The Kingdom of Eldoria is under siege by the Frost Giants. What will you do?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: 'The winds of fate shift. Your command ripples through the magical essence of the realm. The siege continues, but a new hope emerges from the Whispering Woods...' }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 md:w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-8">
        <div className="p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-600/20 cursor-pointer">
            <MapIcon size={24} className="text-white" />
        </div>
        <div className="p-3 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-slate-500 hover:text-white">
            <Users size={24} />
        </div>
        <div className="p-3 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-slate-500 hover:text-white">
            <History size={24} />
        </div>
        <div className="mt-auto p-3 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-slate-500 hover:text-white">
            <Settings size={24} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-slate-950 border-r border-slate-800">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                            m.role === 'user' 
                            ? 'bg-purple-600 text-white rounded-tr-none' 
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                        }`}>
                            <p className="text-sm md:text-base leading-relaxed">{m.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/30">
                <div className="max-w-4xl mx-auto flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Tell the AI what happens next..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-90"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* Info Panel / Map (Desktop) */}
        <div className="hidden lg:block w-96 bg-slate-900 p-6 overflow-y-auto border-l border-slate-800">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Globe size={18} className="text-purple-500" />
                World State
            </h2>
            
            <div className="space-y-8">
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Active Quest</h3>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                        <p className="text-sm font-medium text-slate-300">Break the Frost Siege</p>
                        <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-purple-500" />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Key Locations</h3>
                    <div className="space-y-2">
                        {['Iron Citadel', 'Whispering Woods', 'Crystal Peaks'].map((loc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                <span className="text-sm text-slate-400 group-hover:text-white">{loc}</span>
                                <ChevronRight size={14} className="text-slate-600" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547513364-7063d865076b?q=80&w=800')] bg-cover opacity-20 grayscale" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Map View Unavailable</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

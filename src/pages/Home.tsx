import { Link } from 'react-router-dom';
import { Sword, Wand2, Shield, ScrollText } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Magic Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-purple-600/20 blur-[120px] rounded-full -z-10" />

      <section className="max-w-7xl mx-auto px-4 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Rewrite the Fate of <br />
          <span className="text-purple-500">Ancient Realms</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The first AI-powered fantasy history sandbox. Choose your realm, a pivotal moment, and alter the course of magic and war.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/sandbox" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-600/20 active:scale-95">
            Get Started
          </Link>
          <Link to="/browse" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all active:scale-95">
            Browse Presets
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Sword, title: "Grand Strategy", desc: "Lead armies of myth across sprawling continents." },
            { icon: Wand2, title: "Arcane AI", desc: "Procedural magic systems that adapt to your will." },
            { icon: Shield, title: "Realm Building", desc: "Create kingdoms, cultures, and divine pantheons." },
            { icon: ScrollText, title: "Dynamic Lore", desc: "Every action rewrites the chronicles of history." }
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl text-left hover:border-purple-500/50 transition-colors group">
              <feature.icon className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/30 border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <h2 className="text-4xl font-bold mb-6">Explore Infinite "What Ifs"</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                What if the High Elves never split from the Drow? What if the Orcish Horde discovered gunpowder in the Third Age? Our AI explores every ripple effect in the fabric of fantasy.
              </p>
              <div className="space-y-4">
                {["Proprietary Magic LLM", "Dynamic Map Generation", "Multiplayer Roleplay"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full aspect-video bg-gradient-to-br from-purple-900/20 to-slate-800 border border-slate-700 rounded-3xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        <p className="text-sm font-medium text-white italic">"The dragon-lords of Valoria never expected the dwarven rebellion to master the sky-ships..."</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Search, Flame, Wind, Droplets, Mountain } from 'lucide-react';

const PRESETS = [
  {
    title: "The Sundering of Eldoria",
    desc: "What if the Great Cataclysm was averted by the Archmage?",
    tags: ["High Fantasy", "Political"],
    image: "https://images.unsplash.com/photo-1519074063912-ad2a60b7b9fd?q=80&w=800",
    plays: "12.4k"
  },
  {
    title: "Dawn of the Iron Orcs",
    desc: "The Orcish tribes discover the secret of steel 500 years early.",
    tags: ["Warfare", "Industrial"],
    image: "https://images.unsplash.com/photo-1615678815958-5910c6811c25?q=80&w=800",
    plays: "8.2k"
  },
  {
    title: "Empire of the Eternal Frost",
    desc: "A never-ending winter spreads from the northern wastes.",
    tags: ["Survival", "Post-Apoc"],
    image: "https://images.unsplash.com/photo-1517210122415-b0c70b2a09bf?q=80&w=800",
    plays: "5.1k"
  },
  {
    title: "The Dragon Rebirth",
    desc: "Dragons return to the world, but they are peaceful guardians.",
    tags: ["Mythology", "Exploration"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800",
    plays: "15.9k"
  },
  {
    title: "Underdark Ascendant",
    desc: "The civilizations of the surface collapse, leaving only the subterranean.",
    tags: ["Dark Fantasy", "Horror"],
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800",
    plays: "9.3k"
  },
  {
    title: "The Silent Woods",
    desc: "Magic disappears from the world, leaving elves to find a new path.",
    tags: ["Low Fantasy", "Drama"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
    plays: "3.7k"
  }
];

export default function Browse() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="text-left">
            <h1 className="text-4xl font-bold mb-4">Browse Presets</h1>
            <p className="text-slate-400">Discover community-created worlds and historical turning points.</p>
        </div>
        <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
                type="text" 
                placeholder="Search scenarios..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
            />
        </div>
      </div>

      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {[
            { label: "Trending", icon: Flame },
            { label: "New", icon: Wind },
            { label: "Popular", icon: Droplets },
            { label: "Staff Picks", icon: Mountain },
        ].map((cat, i) => (
            <button key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 transition-colors whitespace-nowrap">
                <cat.icon size={16} className="text-purple-500" />
                <span className="text-sm font-medium">{cat.label}</span>
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRESETS.map((p, i) => (
          <div key={i} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/5 cursor-pointer">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="px-2 py-1 bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{p.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500">
                    <span className="text-slate-300 font-medium">{p.plays}</span> plays
                </div>
                <button className="text-xs font-bold text-purple-500 hover:text-purple-400 uppercase tracking-widest">
                    Play Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Globe, Sparkles, User } from 'lucide-react';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Sandbox from './pages/Sandbox';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <Sparkles className="text-purple-500" />
              <span>Fantasy Historia</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 font-medium text-slate-400">
              <Link to="/browse" className="hover:text-white transition-colors">Presets</Link>
              <Link to="/sandbox" className="hover:text-white transition-colors">Sandbox</Link>
              <a href="#" className="hover:text-white transition-colors">Library</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Globe size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                <User size={18} />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/sandbox" element={<Sandbox />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <Sparkles size={18} className="text-purple-500" />
              <span>Fantasy Historia</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-300">Terms</a>
              <a href="#" className="hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-300">Discord</a>
              <a href="#" className="hover:text-slate-300">Twitter</a>
            </div>
            <p>© 2026 Fantasy Historia. Powered by magic & AI.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

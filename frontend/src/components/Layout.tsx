import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export function Layout() {
  const location = useLocation();
  const isNova = location.pathname.includes('nova-social');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // If we are in the fake Nova Social app, render a different header
  if (isNova) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-gray-200">
        <header className="border-b border-gray-800 bg-[#12141A]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/nova-social" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-black">N</span>
              </div>
              Nova Social
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <span className="hover:text-white cursor-pointer transition-colors">Feed</span>
              <span className="hover:text-white cursor-pointer transition-colors">Communities</span>
              <span className="hover:text-white cursor-pointer transition-colors">Governance</span>
            </nav>
            <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Exit Demo
            </Link>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  // ZIP Default Layout
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-zip-indigo/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zip-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      
      <header className="border-b border-zip-slate-800/50 bg-obsidian/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-zip-cyan group-hover:text-zip-emerald transition-colors duration-500" />
              <Fingerprint className="w-4 h-4 text-obsidian absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-white uppercase leading-none">ZIP</span>
              <span className="text-[10px] text-zip-cyan font-mono uppercase tracking-wider mt-1 opacity-80">Zero-Exposure</span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              Vault
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zip-cyan transition-all group-hover:w-full" />
            </Link>
            <Link to="/generate-proof" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              Generate Proof
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zip-emerald transition-all group-hover:w-full" />
            </Link>
            <Link to="/nova-social" className="text-xs px-3 py-1.5 rounded-full border border-zip-slate-700 bg-zip-slate-800/50 text-slate-400 hover:text-white hover:border-zip-indigo/50 transition-all flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Demo App
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 relative z-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      
      <footer className="border-t border-zip-slate-800/50 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-sm text-slate-500">
          <p>© 2026 Midnight Hackathon • ZIP MVP</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zip-emerald shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>ZK Network Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

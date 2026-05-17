
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, NeonButton } from '../components/ui';

export function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-zip-cyan/20 blur-[50px] rounded-full" />
        <Shield className="w-24 h-24 text-zip-cyan relative z-10" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-black tracking-tight mb-6"
      >
        Prove you're human.<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zip-cyan to-zip-indigo">
          Reveal nothing else.
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
      >
        ZIP uses Zero-Knowledge cryptography to verify your identity locally. 
        No biometrics uploaded. No passports stored. Just mathematical proof.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/onboard">
          <NeonButton color="cyan" className="text-lg px-8 py-4">
            Create Secure Vault <ArrowRight className="w-5 h-5 ml-2" />
          </NeonButton>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full"
      >
        <GlassCard className="text-left">
          <Lock className="w-8 h-8 text-zip-cyan mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Local First</h3>
          <p className="text-sm text-slate-400">Your identity data is encrypted and stored exclusively on your device. It never touches our servers.</p>
        </GlassCard>
        
        <GlassCard className="text-left">
          <EyeOff className="w-8 h-8 text-zip-indigo mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Zero Exposure</h3>
          <p className="text-sm text-slate-400">Platforms only receive a boolean proof (`verified: true`), completely decoupling your actions from your real-world identity.</p>
        </GlassCard>

        <GlassCard className="text-left">
          <Shield className="w-8 h-8 text-zip-emerald mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Midnight Aligned</h3>
          <p className="text-sm text-slate-400">Built on the principles of the Midnight Network: safeguarding sensitive commercial and personal data.</p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

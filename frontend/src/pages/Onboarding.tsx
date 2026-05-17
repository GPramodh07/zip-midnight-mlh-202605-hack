import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Cpu, CheckCircle2 } from 'lucide-react';
import { GlassCard, NeonButton } from '../components/ui';
import { createZipVault } from '../services/zipCryptoService';

export function Onboarding() {
  const [alias, setAlias] = useState('');
  const [step, setStep] = useState<'input' | 'generating' | 'success'>('input');
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) return;

    setStep('generating');
    await createZipVault(alias);
    setStep('success');

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto pt-20">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlassCard className="p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-zip-slate-800 flex items-center justify-center mb-4 border border-zip-slate-700">
                  <Fingerprint className="w-8 h-8 text-zip-cyan" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Create Identity Vault</h2>
                <p className="text-sm text-slate-400">
                  Choose a public alias. Your underlying credentials will be cryptographically bound to this device.
                </p>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Public Alias</label>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="e.g. satoshi99"
                    className="w-full bg-zip-slate-900/50 border border-zip-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-zip-cyan focus:ring-1 focus:ring-zip-cyan transition-all"
                    autoFocus
                  />
                </div>
                <NeonButton type="submit" color="cyan" className="w-full" disabled={!alias.trim()}>
                  Initialize Secure Vault
                </NeonButton>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {step === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-zip-cyan border-opacity-50"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-b-2 border-l-2 border-zip-indigo absolute top-2 left-2"
              />
              <Cpu className="w-8 h-8 text-zip-cyan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h3 className="text-xl font-mono text-zip-cyan mb-2 neon-text-cyan">Synthesizing ZK Keys...</h3>
            <p className="text-sm text-slate-500 font-mono">Deriving local secure enclave parameters</p>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle2 className="w-24 h-24 text-zip-emerald mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Vault Secured</h3>
            <p className="text-slate-400">Your zero-exposure identity is ready.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

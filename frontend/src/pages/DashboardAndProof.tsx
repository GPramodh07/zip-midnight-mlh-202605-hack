import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Activity, FileKey2, Copy, Check } from 'lucide-react';
import { GlassCard, NeonButton } from '../components/ui';
import { getZipVault } from '../services/zipCryptoService';
import type { ZipVault } from '../services/zipCryptoService';

export function Dashboard() {
  const [vault, setVault] = useState<ZipVault | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const v = getZipVault();
    if (!v) {
      navigate('/onboard');
    } else {
      setVault(v);
    }
  }, [navigate]);

  if (!vault) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Identity Vault</h1>
          <p className="text-slate-400">Manage your zero-exposure credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard glow="cyan">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zip-cyan/10 flex items-center justify-center border border-zip-cyan/20">
                  <FileKey2 className="w-6 h-6 text-zip-cyan" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Local ZK Enclave</h2>
                  <p className="text-xs text-zip-cyan font-mono">STATUS: ENCRYPTED & ACTIVE</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800">
                <p className="text-xs text-slate-500 mb-1 font-mono uppercase">Public Alias</p>
                <p className="font-mono text-white">@{vault.alias}</p>
              </div>
              <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800">
                <p className="text-xs text-slate-500 mb-1 font-mono uppercase">Vault ID</p>
                <p className="font-mono text-slate-300 truncate">{vault.vaultId}</p>
              </div>
              <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800">
                <p className="text-xs text-slate-500 mb-1 font-mono uppercase">Proofs Generated</p>
                <p className="font-mono text-white">{vault.proofsGenerated}</p>
              </div>
              <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800">
                <p className="text-xs text-slate-500 mb-1 font-mono uppercase">Created At</p>
                <p className="font-mono text-slate-300 text-sm">{new Date(vault.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 text-center">
              Your raw identity data is mathematically blinded. Midnight network cannot decrypt it.
            </p>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden border-orange-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert className="w-24 h-24 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="font-bold text-orange-500">ZIP Threat Guard</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4">
              Lightweight anomaly detection is monitoring your proof generation for privacy leaks or unauthorized usage patterns.
            </p>
            <div className="bg-black/30 rounded p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Activity className="w-3 h-3 text-zip-cyan" />
                <span>Zero suspicious activities detected</span>
              </div>
              <div className="w-full bg-zip-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-zip-emerald to-zip-cyan w-full h-full opacity-50" />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export function GenerateProof() {
  const [vault, setVault] = useState<ZipVault | null>(null);
  const [step, setStep] = useState<'config' | 'compiling' | 'generating' | 'success'>('config');
  const [proofData, setProofData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const v = getZipVault();
    if (!v) navigate('/onboard');
    else setVault(v);
  }, [navigate]);

  const handleGenerate = async () => {
    if (!vault) return;
    setStep('compiling');
    
    // Simulate compilation
    await new Promise(r => setTimeout(r, 1500));
    setStep('generating');
    
    // Simulate generation via service
    const { generateZKProof } = await import('../services/zipCryptoService');
    const proof = await generateZKProof(vault);
    setProofData(proof);
    setStep('success');
  };

  const copyProof = () => {
    navigator.clipboard.writeText(JSON.stringify(proofData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!vault) return null;

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Generate Proof</h1>

      {step === 'config' && (
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-4">Selective Disclosure</h2>
          <p className="text-slate-400 text-sm mb-8">
            Choose exactly what you want to prove to the verifier. Unselected data will remain mathematically hidden.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 rounded-lg bg-zip-slate-800/50 border border-zip-cyan/30">
              <div>
                <p className="font-medium text-white">Proof of Humanity</p>
                <p className="text-xs text-slate-400">Proves you are a unique human</p>
              </div>
              <div className="w-10 h-6 bg-zip-cyan rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-zip-slate-900/50 border border-zip-slate-800 opacity-50 cursor-not-allowed">
              <div>
                <p className="font-medium text-white">Age &gt; 18</p>
                <p className="text-xs text-slate-400">Proves age requirement</p>
              </div>
              <div className="w-10 h-6 bg-zip-slate-700 rounded-full relative">
                <div className="w-4 h-4 bg-slate-500 rounded-full absolute left-1 top-1" />
              </div>
            </div>
          </div>

          <NeonButton color="emerald" className="w-full" onClick={handleGenerate}>
            Compile & Generate Proof
          </NeonButton>
        </GlassCard>
      )}

      {(step === 'compiling' || step === 'generating') && (
        <GlassCard className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-8 relative">
            <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-zip-cyan animate-spin`} />
            <div className={`absolute inset-2 rounded-full border-2 border-transparent border-b-zip-indigo animate-spin-slow`} />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-zip-cyan">
              ZK
            </div>
          </div>
          <h2 className="text-xl font-mono text-zip-cyan mb-2 neon-text-cyan">
            {step === 'compiling' ? 'Compiling Compact Circuit...' : 'Synthesizing ZK-SNARK...'}
          </h2>
          <p className="text-slate-400 text-sm font-mono max-w-sm">
            {step === 'compiling' 
              ? 'Translating constraints into zero-knowledge verifiable format.' 
              : 'Executing local witness generation. Your data remains on device.'}
          </p>
        </GlassCard>
      )}

      {step === 'success' && proofData && (
        <GlassCard glow="emerald" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-zip-emerald/20 flex items-center justify-center text-zip-emerald">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Proof Generated</h2>
              <p className="text-sm text-slate-400">Ready to be verified by any dApp</p>
            </div>
          </div>

          <div className="relative group mb-6">
            <pre className="bg-obsidian p-6 rounded-lg overflow-x-auto text-sm font-mono text-zip-cyan border border-zip-slate-800">
              {JSON.stringify(proofData, null, 2)}
            </pre>
            <button 
              onClick={copyProof}
              className="absolute top-4 right-4 p-2 bg-zip-slate-800 rounded text-slate-300 hover:text-white hover:bg-zip-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-zip-emerald" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex gap-4">
            <NeonButton variant="outline" color="cyan" className="flex-1" onClick={() => setStep('config')}>
              Generate Another
            </NeonButton>
            <NeonButton color="indigo" className="flex-1" onClick={() => navigate('/nova-social')}>
              Use in Demo App
            </NeonButton>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

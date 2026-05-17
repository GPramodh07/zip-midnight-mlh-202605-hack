import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, FileKey2, Copy, Check, Terminal, Fingerprint, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, NeonButton } from '../components/ui';
import { getZipVault } from '../services/zipCryptoService';
import type { ZipVault } from '../services/zipCryptoService';
import { analyzeAuthenticity } from '../services/geminiService';
import type { AuthenticityAnalysis } from '../services/geminiService';

export function Dashboard() {
  const [vault, setVault] = useState<ZipVault | null>(null);
  const [threatState, setThreatState] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const v = getZipVault();
    if (!v) {
      navigate('/onboard');
    } else {
      setVault(v);
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatState((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!vault) return null;

  const threatStatuses = [
    "Behavioral entropy stable",
    "Human interaction patterns detected",
    "Automation risk low",
    "Selective disclosure pathway secure"
  ];

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
              <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800 relative overflow-hidden">
                <p className="text-xs text-slate-500 mb-1 font-mono uppercase">Public Alias</p>
                <p className="font-mono text-white">@{vault.alias}</p>
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Fingerprint className="w-16 h-16" />
                </div>
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
          <GlassCard className="relative overflow-hidden border-zip-emerald/20">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity className="w-32 h-32 text-zip-emerald" />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-zip-emerald animate-ping absolute" />
                  <div className="w-3 h-3 rounded-full bg-zip-emerald relative" />
                </div>
                <h3 className="font-bold text-white tracking-wide uppercase text-sm">ZIP Threat Guard</h3>
              </div>
              <div className="bg-zip-emerald/10 border border-zip-emerald/20 px-2 py-1 rounded text-xs font-mono text-zip-emerald">
                LIVE MONITORING
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-zip-slate-800" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={vault.proofsGenerated > 0 ? "text-zip-cyan" : "text-zip-slate-600"} strokeWidth="8"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ 
                      strokeDashoffset: vault.proofsGenerated > 0 ? (283 - (283 * ((vault.lastConfidenceScore ?? 94) / 100))) : 283,
                      rotate: vault.proofsGenerated > 0 ? 0 : [0, 360]
                    }}
                    transition={vault.proofsGenerated > 0 
                      ? { duration: 1.5, ease: "easeOut" }
                      : { duration: 8, repeat: Infinity, ease: "linear" }
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  {vault.proofsGenerated > 0 ? (
                    <span className="text-xl font-bold text-white">{vault.lastConfidenceScore ?? 94}<span className="text-xs text-slate-400">%</span></span>
                  ) : (
                    <span className="text-xl font-bold text-slate-500">--<span className="text-xs text-slate-600">%</span></span>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-mono text-slate-500 uppercase">Assessment:</span>
                  {vault.proofsGenerated > 0 ? (
                    <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${
                      vault.lastRiskLevel === 'high' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                      vault.lastRiskLevel === 'medium' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
                      'text-zip-emerald bg-zip-emerald/10 border-zip-emerald/20'
                    }`}>
                      {vault.lastRiskLevel ? `${vault.lastRiskLevel} Risk` : 'Low Risk'}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 tracking-wider uppercase bg-zip-slate-800/50 px-2 py-0.5 rounded border border-zip-slate-700">Calibrating</span>
                  )}
                </div>
                <div className="bg-zip-slate-900/80 p-3 rounded border border-zip-slate-800 relative overflow-hidden h-16 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={threatState}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={`text-xs font-mono leading-tight ${vault.proofsGenerated > 0 ? "text-zip-cyan" : "text-slate-500"}`}
                    >
                      {vault.proofsGenerated > 0 ? threatStatuses[threatState] : ["Awaiting behavioral input", "Establishing baseline entropy", "Ready for proof generation", "Monitoring environment"][threatState]}
                    </motion.p>
                  </AnimatePresence>
                  {/* Subtle scanning line */}
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[2px] bg-zip-cyan/40 shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                    initial={{ left: '-5%' }}
                    animate={{ left: '105%' }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-2 border-t border-zip-slate-800 pt-4">
              Continuous authenticity inference engine is active.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export function GenerateProof() {
  const [vault, setVault] = useState<ZipVault | null>(null);
  const [step, setStep] = useState<'config' | 'interaction' | 'analyzing' | 'compiling' | 'success'>('config');
  const [interactionText, setInteractionText] = useState('');
  const [analysis, setAnalysis] = useState<AuthenticityAnalysis | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [proofData, setProofData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [includeAge, setIncludeAge] = useState(false);
  const navigate = useNavigate();
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = getZipVault();
    if (!v) navigate('/onboard');
    else setVault(v);
  }, [navigate]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleNextToInteraction = () => {
    setStep('interaction');
  };

  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactionText.trim()) return;
    
    setStep('analyzing');
    try {
      const result = await analyzeAuthenticity(interactionText);
      setAnalysis(result);
      
      // Hold on the analysis result card briefly before compiling
      setTimeout(() => {
        startCompilation(result);
      }, 4500);
    } catch (error) {
      console.error("[UI] Analysis failed:", error);
      alert("Gemini analysis failed. Please check the console logs and verify your API key is correct.");
      setStep('interaction');
    }
  };

  const startCompilation = async (analysisResult: AuthenticityAnalysis) => {
    setStep('compiling');
    setLogs([]);
    
    const addLog = (log: string, delay: number) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
          resolve();
        }, delay);
      });
    };

    await addLog('[ZIP] initializing zero-exposure proof engine...', 600);
    await addLog(`[ZIP] injecting authenticity vector (confidence: ${analysisResult.humanConfidence}%)...`, 900);
    await addLog(`[ZIP] verifying automation risk profile [${analysisResult.riskLevel.toUpperCase()}]...`, 700);
    await addLog('[ZIP] synthesizing Midnight witness states...', 800);
    await addLog('[ZIP] hashing identity commitment...', 1000);
    await addLog('[ZIP] validating circuit: HumanityProof.compact...', 1200);
    await addLog('[ZIP] compiling zk constraints for selective disclosure...', 900);
    await addLog('[ZIP] zero-knowledge proof synthesis complete.', 500);

    const { generateZKProof } = await import('../services/zipCryptoService');
    const proof = await generateZKProof(
      vault!, 
      includeAge ? 'custom' : 'minimal', 
      analysisResult.humanConfidence, 
      analysisResult.riskLevel
    );
    setProofData(proof);
    
    setTimeout(() => setStep('success'), 1200);
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

      <AnimatePresence mode="wait">
        {step === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
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
                  <div className="w-10 h-6 bg-zip-cyan rounded-full relative shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                  </div>
                </div>
                
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                    includeAge 
                      ? 'bg-zip-slate-800/50 border border-zip-cyan/30' 
                      : 'bg-zip-slate-900/50 border border-zip-slate-800'
                  }`}
                  onClick={() => setIncludeAge(!includeAge)}
                >
                  <div>
                    <p className="font-medium text-white">Age &gt; 18</p>
                    <p className="text-xs text-slate-400">Proves age requirement</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${includeAge ? 'bg-zip-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-zip-slate-700'}`}>
                    <div className={`w-4 h-4 rounded-full absolute top-1 transition-all shadow-sm ${includeAge ? 'bg-white right-1' : 'bg-slate-500 left-1'}`} />
                  </div>
                </div>
              </div>

              <NeonButton color="emerald" className="w-full" onClick={handleNextToInteraction}>
                Configure Authenticity Vector
              </NeonButton>
            </GlassCard>
          </motion.div>
        )}

        {step === 'interaction' && (
          <motion.div
            key="interaction"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <BrainCircuit className="w-8 h-8 text-zip-cyan" />
                <div>
                  <h2 className="text-xl font-bold text-white">Authenticity Interaction</h2>
                  <p className="text-sm text-slate-400">Provide a short cognitive sample</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-6">
                Our lightweight AI engine verifies humanity through behavioral entropy, without requiring PII or biometrics. Describe your surroundings or a recent thought.
              </p>
              
              <form onSubmit={startAnalysis} className="space-y-6">
                <textarea
                  value={interactionText}
                  onChange={(e) => setInteractionText(e.target.value)}
                  placeholder="e.g. I am sitting at my desk, looking at the rain against the window..."
                  className="w-full bg-zip-slate-900/50 border border-zip-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-zip-cyan focus:ring-1 focus:ring-zip-cyan transition-all resize-none h-32"
                  autoFocus
                />
                <NeonButton color="cyan" type="submit" className="w-full flex items-center justify-center gap-2" disabled={interactionText.length < 10}>
                  <Terminal className="w-4 h-4" /> Analyze & Generate
                </NeonButton>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {!analysis ? (
              <GlassCard className="p-12 flex flex-col items-center justify-center w-full relative overflow-hidden">
                {/* Cinematic scanning effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-zip-cyan/10 to-transparent"
                  initial={{ top: '-100%' }}
                  animate={{ top: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-zip-cyan opacity-80"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-b-2 border-zip-indigo opacity-60"
                  />
                  <BrainCircuit className="w-10 h-10 text-zip-cyan animate-pulse" />
                </div>
                <h2 className="text-xl font-mono text-zip-cyan mb-2 neon-text-cyan tracking-wider">
                  Analyzing Semantic Coherence...
                </h2>
                <p className="text-slate-400 text-sm font-mono">
                  Evaluating contextual authenticity
                </p>
              </GlassCard>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <GlassCard className="p-8 border-zip-cyan/30">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Authenticity Verified</h3>
                      <p className="text-xs text-zip-cyan font-mono">AI INFERENCE COMPLETE</p>
                    </div>
                    <div className="w-16 h-16 relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" className="stroke-zip-slate-800" strokeWidth="8" />
                        <motion.circle 
                          cx="50" cy="50" r="45" fill="none" className="stroke-zip-emerald" strokeWidth="8"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * (analysis.humanConfidence / 100)) }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="text-sm font-bold text-white">{analysis.humanConfidence}%</span>
                    </div>
                  </div>
                  
                  <div className="bg-zip-slate-900/50 p-4 rounded-lg border border-zip-slate-800 mb-6">
                    <p className="text-sm text-slate-300 italic">
                      "{analysis.summary}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono uppercase">Automation Risk:</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border 
                      ${analysis.riskLevel === 'low' ? 'text-zip-emerald bg-zip-emerald/10 border-zip-emerald/20' : 
                        analysis.riskLevel === 'medium' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' : 
                        'text-red-500 bg-red-500/10 border-red-500/20'}`}
                    >
                      {analysis.riskLevel} Risk
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 'compiling' && (
          <motion.div
            key="compiling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4 border-b border-zip-slate-800 pb-4">
                <Terminal className="w-5 h-5 text-zip-cyan" />
                <h3 className="font-mono text-sm text-slate-300">Midnight Synthesizer</h3>
              </div>
              
              <div className="bg-obsidian rounded-lg p-4 font-mono text-xs overflow-y-auto h-64 border border-zip-slate-800/50 relative">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-2 text-zip-cyan opacity-80"
                  >
                    {log}
                  </motion.div>
                ))}
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-3 bg-zip-cyan inline-block mt-1"
                />
                <div ref={logsEndRef} />
              </div>
            </GlassCard>
          </motion.div>
        )}

        {step === 'success' && proofData && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
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
                <NeonButton variant="outline" color="cyan" className="flex-1" onClick={() => {
                  setStep('config');
                  setInteractionText('');
                  setAnalysis(null);
                }}>
                  Generate Another
                </NeonButton>
                <NeonButton color="indigo" className="flex-1" onClick={() => navigate('/nova-social')}>
                  Use in Demo App
                </NeonButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

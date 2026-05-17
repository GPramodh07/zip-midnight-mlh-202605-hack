import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotOff, ShieldCheck, UserCheck, MessageSquare, Heart, Share2 } from 'lucide-react';
import { NeonButton, GlassCard } from '../components/ui';

export function NovaSocial() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerifyClick = () => {
    setShowModal(true);
  };

  const executeVerification = () => {
    setVerifying(true);
    // Simulate API request passing the proof
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {verified && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-8 flex items-center justify-center gap-3 text-emerald-400"
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm font-medium">Verified human via ZIP Protocol. Identity remains hidden.</span>
        </motion.div>
      )}

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden md:block w-64 space-y-4">
          <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800">
            <div className="w-16 h-16 rounded-full bg-gray-800 mb-4 mx-auto" />
            <h3 className="text-center text-white font-medium mb-1">Anonymous User</h3>
            <p className="text-center text-gray-500 text-xs mb-4">@nova_user_8821</p>
            
            {verified ? (
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-500 bg-emerald-500/10 py-1.5 rounded-full border border-emerald-500/20">
                <UserCheck className="w-3 h-3" /> Human Verified
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400 bg-gray-800 py-1.5 rounded-full">
                Unverified
              </div>
            )}
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 space-y-6">
          {!verified ? (
            <GlassCard className="bg-[#1A1D24] border-gray-800 p-12 text-center" glow="none">
              <BotOff className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Human Verification Required</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Nova Social is experiencing high bot activity. To view the community feed and interact, please prove you are human.
              </p>
              <NeonButton color="indigo" onClick={handleVerifyClick} className="w-full sm:w-auto">
                Verify with ZIP
              </NeonButton>
            </GlassCard>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {[1, 2, 3].map((post) => (
                <div key={post} className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Nova Native</span>
                        <UserCheck className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {post === 1 && "Just deployed my first zero-knowledge contract on the Midnight testnet! The privacy guarantees are mind-blowing. 🚀"}
                    {post === 2 && "The community vibe here since we implemented mandatory ZK humanity proofs has been incredible. Zero spam, just real discussions."}
                    {post === 3 && "Who's attending the privacy-first web3 meetup next week? Looking forward to seeing some familiar pseudonyms!"}
                  </p>
                  <div className="flex gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-purple-400 transition-colors"><Heart className="w-4 h-4" /> {post * 12}</button>
                    <button className="flex items-center gap-2 hover:text-purple-400 transition-colors"><MessageSquare className="w-4 h-4" /> {post * 4}</button>
                    <button className="flex items-center gap-2 hover:text-purple-400 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ZIP Verification Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !verifying && setShowModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md"
            >
              <GlassCard glow="cyan" className="bg-[#0f172a] p-8 border-zip-cyan/30">
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span className="w-6 h-6 rounded bg-purple-600 flex justify-center items-center text-xs">N</span>
                    Nova Social
                  </div>
                  <div className="text-xs text-gray-500 font-mono">REQUESTS</div>
                  <div className="flex items-center gap-2 font-black tracking-widest text-white uppercase">
                    ZIP
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-2">Proof Request</h3>
                  <p className="text-sm text-slate-400 mb-4">Nova Social is requesting the following zero-knowledge proof:</p>
                  
                  <div className="bg-zip-slate-900 rounded p-4 border border-zip-slate-800 flex justify-between items-center">
                    <span className="text-white font-medium">Proof of Humanity</span>
                    <span className="text-xs bg-zip-cyan/10 text-zip-cyan px-2 py-1 rounded">Required</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 mb-8 flex gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-slate-300">
                    Your real identity, alias, and vault details will <strong className="text-white">NOT</strong> be shared. Only a cryptographic boolean proof is transmitted.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowModal(false)} 
                    disabled={verifying}
                    className="flex-1 py-3 text-sm text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <NeonButton 
                    color="cyan" 
                    className="flex-1" 
                    onClick={executeVerification}
                    loading={verifying}
                  >
                    {verifying ? 'Generating Proof...' : 'Approve & Verify'}
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import TrustSection from '../../components/TrustSection';

const Partners = () => {
  return (
    <div className="bg-[#02040a] min-h-screen pt-32 pb-24">
      <section className="relative px-6 mb-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <Handshake size={14} className="text-[#F5A800]" />
            <span className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest">Partners & Clients</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Global Leaders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9CA3AF] text-lg max-w-2xl mx-auto"
          >
            We collaborate with forward-thinking enterprises, governments, and fast-growing startups to engineer solutions that redefine industries.
          </motion.p>
        </div>
      </section>

      {/* Re-use TrustSection but dark mode styled via its own internal styling if possible, or just render it */}
      <div className="bg-white rounded-3xl mx-6 overflow-hidden mt-12 shadow-2xl">
        <TrustSection />
      </div>
    </div>
  );
};

export default Partners;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Terms of Service
          </h2>
          <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl">
            Last updated: May 26, 2026
          </p>
        </motion.div>

        <div className="space-y-8 max-w-4xl">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Acceptance of Terms</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              By accessing or using Nexyovi's website, services, or products, you agree to be bound by these Terms of Service ("Terms"), all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </motion.div>

          {/* Use License */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Use License</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on Nexyovi's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 mt-4 text-white/60 text-[15px] leading-relaxed list-disc pl-5">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on Nexyovi's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="text-white/60 text-[15px] leading-relaxed mt-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Nexyovi at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Disclaimer</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              The materials on Nexyovi's website are provided "as is". Nexyovi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-white/60 text-[15px] leading-relaxed mt-4">
              Further, Nexyovi does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Limitations</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              In no event shall Nexyovi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nexyovi's website, even if Nexyovi or a Nexyovi authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p className="text-white/60 text-[15px] leading-relaxed mt-4">
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </motion.div>

          {/* Revisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Revisions and Errata</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              The materials appearing on Nexyovi's website could include technical, typographical, or photographic errors. Nexyovi does not warrant that any of the materials on its website are accurate, complete, or current. Nexyovi may make changes to the materials contained on its website at any time without notice. Nexyovi does not, however, make any commitment to update the materials.
            </p>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="bg-[#111827] rounded-[24px] p-8 border border-white/5"
          >
            <h3 className="text-xl font-black text-white mb-4">Governing Law</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Any claim relating to Nexyovi's website shall be governed by the laws of the Federal Democratic Republic of Ethiopia without regard to its conflict of law provisions.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="px-8 py-3 bg-white/[0.02] border border-white/10 text-white font-black text-[13px] uppercase tracking-widest rounded-full hover:bg-white/5 transition-all backdrop-blur-sm">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
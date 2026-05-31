import CompanyStory from '../../components/CompanyStory';
import CompanyLeadership from '../../components/CompanyLeadership';
import CompanyHubs from '../../components/CompanyHubs';
import Impact from './Impact';
import { motion } from 'framer-motion';

const Company = () => {
 return (
 <div className="bg-[#0A0F1C] text-white min-h-screen overflow-hidden selection:bg-[#F5A800]/30">
 {/* Hero / Intro */}
 <section className="py-32 text-center">
 <motion.h1
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-5xl md:text-6xl font-black tracking-tighter text-white"
 >
 Our Journey
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 60 }}
 animate={{ opacity: 1, y: 0 }}
 className="mt-4 text-[#9CA3AF] max-w-2xl mx-auto"
 >
 From a visionary startup to a global enterprise‑grade technology platform.
 </motion.p>
 </section>
 {/* Story */}
 <CompanyStory />
 {/* Leadership */}
 <CompanyLeadership />
 {/* Hubs */}
 <CompanyHubs />
 {/* Impact */}
 <Impact />
 </div>
 );
};

export default Company;

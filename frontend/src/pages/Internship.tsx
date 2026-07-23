import { motion } from 'framer-motion';
import { BookOpen, Rocket, Terminal, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const EASE_EXPO = [0.16, 1, 0.3, 1];

const steps = [
  {
    step: '01',
    title: 'Apply',
    desc: 'Submit your resume, GitHub profile, and a brief cover letter explaining why you want to join us.',
  },
  {
    step: '02',
    title: 'Initial Chat',
    desc: 'A 30-minute culture and basic technical screen with one of our senior engineers.',
  },
  {
    step: '03',
    title: 'Technical Assessment',
    desc: 'A take-home project or live pairing session designed to test your problem-solving skills.',
  },
  {
    step: '04',
    title: 'Offer & Onboarding',
    desc: 'Welcome to Nexyovi! You\'ll get your equipment, mentor assignment, and project briefing.',
  }
];

const highlights = [
  { icon: Terminal, title: 'Real Projects', desc: 'No dummy tasks. You will push code to production systems.' },
  { icon: Users, title: '1-on-1 Mentorship', desc: 'Paired directly with a senior engineer for the duration of the internship.' },
  { icon: Rocket, title: 'Modern Stack', desc: 'Work with React, Next.js, Node, Go, AWS, and cutting-edge AI tools.' },
  { icon: BookOpen, title: 'Structured Learning', desc: 'Weekly deep dives into architecture, security, and clean code practices.' },
];

export default function Internship() {
  const { siteContent } = useSite();
  const navigate = useNavigate();

  const content = siteContent?.internship || {};
  const pageTitle = content.title || 'Kickstart your career with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Elite Engineers.</span>';
  const pageDesc = content.description || 'Our 3-to-6 month intensive program is designed to turn promising junior talent into production-ready engineers. Join us in Addis Ababa or work remotely.';
  
  const pageHighlights = content.highlights || highlights;
  const pageSteps = content.steps || steps;

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-[#F5A800]/30 pt-24 sm:pt-32">
      
      {/* Dark Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-20 sm:mb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO } }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Nexyovi Mentorship Program</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-[-0.04em] mb-6 leading-[0.95]"
            dangerouslySetInnerHTML={{ __html: pageTitle }}
          />
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
            {pageDesc}
          </p>
        </motion.div>
      </div>

      {/* Creamy White Highlights Section */}
      <div className="bg-[#FDFBF7] text-slate-900 py-24 sm:py-32 rounded-[3rem]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-4">Why our Internship?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">An intense, immersive experience designed to fast-track your engineering career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageHighlights.map((item: any, i: number) => {
              const Icon = item.icon || Terminal;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE_EXPO }}
                  className="p-4 sm:p-6 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 flex items-center justify-center mb-6 text-[#F5A800]">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-black text-xl tracking-[-0.02em] mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dark Process Section */}
      <div className="bg-[#02040a] text-white py-24 sm:py-32">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-4">Application Process</h2>
            <p className="text-slate-400">How to join the next cohort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {pageSteps.map((step: any, i: number) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EXPO }}
                className="relative p-4 sm:p-6 transition-colors"
              >
                <h3 className="text-xl font-bold tracking-[-0.02em] mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Creamy White CTA Section */}
      <div className="bg-[#FDFBF7] text-slate-900 py-24 sm:py-32 rounded-t-[3rem] -mt-[3rem] relative z-10 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#F5A800]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="relative py-8 md:py-16 text-center"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#F5A800] to-[#FFD166] flex items-center justify-center text-black mb-8">
                <Rocket size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-[-0.04em] mb-4 leading-[1.1]">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Accelerate?</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto mb-10 font-medium">
                We open cohorts twice a year. If you have a solid foundation in programming and an obsession with learning, we want to hear from you.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/internship/apply')}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#F5A800] text-slate-950 font-black text-lg hover:bg-[#FFD166] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

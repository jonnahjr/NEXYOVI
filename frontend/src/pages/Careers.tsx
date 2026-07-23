import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, ChevronDown, ChevronUp, Users, Terminal, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { useState } from 'react';

const EASE_EXPO = [0.16, 1, 0.3, 1];

const defaultBenefits = [
  { title: 'Remote Flexibility', desc: 'Work from anywhere or from our Addis Ababa hub.' },
  { title: 'Top-Tier Equipment', desc: 'Latest MacBooks and high-end monitors provided.' },
  { title: 'Continuous Learning', desc: 'Budgets for courses, books, and certifications.' },
  { title: 'Global Standards', desc: 'Work on cutting-edge projects with international clients.' },
];

export default function Careers() {
  const { jobs, siteContent } = useSite();
  const navigate = useNavigate();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  const content = siteContent?.careers || {};
  const pageTitle = content.title || 'Build the future of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">African Engineering.</span>';
  const pageDesc = content.description || 'We are looking for top-tier talent to join our mission of delivering world-class software, security, and AI solutions from our roots in Ethiopia to the world.';
  const pageBenefits = content.benefits || defaultBenefits;
  
  const activeJobs = jobs?.filter(j => j.status === 'active') || [];

  const handleApply = (jobTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/careers/apply?role=${encodeURIComponent(jobTitle)}`);
  };

  const toggleJob = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Careers at Nexyovi</span>
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

      {/* Creamy White Benefits Section */}
      <div className="bg-[#FDFBF7] text-slate-900 py-24 sm:py-32 rounded-t-[3rem]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-4">Why join us?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">We believe in empowering our engineers to do their best work. Here is what we offer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageBenefits.map((benefit: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE_EXPO }}
                className="p-4 sm:p-6 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 flex items-center justify-center mb-6 text-[#F5A800]">
                  <Users size={24} />
                </div>
                <h3 className="font-black text-xl tracking-[-0.02em] mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Open Roles Section */}
      <div className="bg-[#02040a] text-white py-24 sm:py-32">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-3">Open Roles</h2>
              <p className="text-slate-400">Join our elite team and build the future.</p>
            </div>
          </div>

          <div className="space-y-4">
            {activeJobs.length === 0 ? (
              <div className="p-12 text-center border border-white/5 bg-white/[0.02] rounded-3xl">
                <p className="text-slate-400">No open roles at the moment. Please check back later or send an open application below.</p>
              </div>
            ) : (
              activeJobs.map((job: any, i: number) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EXPO }}
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-white/[0.04] border-[#F5A800]/30' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'}`}
                  >
                    <button
                      onClick={() => toggleJob(job.id)}
                      className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                          <Terminal size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-[-0.02em] mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                            <span className="px-2 py-1 bg-white/5 rounded-md">{job.department}</span>
                            <span className="px-2 py-1 bg-white/5 rounded-md">{job.type}</span>
                            {job.work_mode && <span className="px-2 py-1 bg-[#F5A800]/10 text-[#F5A800] rounded-md">{job.work_mode}</span>}
                            <span className="px-2 py-1 bg-white/5 rounded-md">{job.location}</span>
                            {job.salary_range && <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">{job.salary_range}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/50 transition-colors">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 sm:px-8 pb-8 pt-2"
                        >
                          <div className="pt-6 border-t border-white/10 space-y-8">
                            {job.description && (
                              <div>
                                <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-wider mb-3">About the Role</h4>
                                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                  {job.description}
                                </div>
                              </div>
                            )}
                            
                            {job.requirements && (
                              <div>
                                <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-wider mb-3">Requirements</h4>
                                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                  {job.requirements}
                                </div>
                              </div>
                            )}

                            <div className="pt-4 flex items-center justify-start">
                              <button
                                onClick={(e) => handleApply(job.title, e)}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5A800] text-black font-black rounded-xl hover:bg-[#FFD166] transition-colors"
                              >
                                Apply for this role <ArrowRight size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Premium Spontaneous Application Section */}
      <div className="bg-[#FDFBF7] text-slate-900 py-24 sm:py-32 rounded-t-[3rem] relative z-10 -mt-[3rem] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#F5A800]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="relative py-8 md:py-16 lg:py-20"
          >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              {/* Left Side: Typography */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5A800]/20 bg-[#F5A800]/10 text-[#F5A800] mb-8">
                  <Briefcase size={16} />
                  <span className="text-xs font-bold uppercase tracking-[0.1em]">Spontaneous Application</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-[-0.04em] mb-6 leading-[1.1]">
                  Don't see a <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">perfect fit?</span>
                </h3>
                <p className="text-slate-600 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Great talent doesn't always fit into a predefined box. If you have exceptional skills and a drive to build world-class systems, we want to hear from you.
                </p>
              </div>

              {/* Right Side: Action Area */}
              <div className="shrink-0 w-full lg:w-[400px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F5A800] to-[#FFD166] flex items-center justify-center text-black mb-8">
                    <Rocket size={36} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Join the Mission</h4>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Submit your resume and let's explore how you can make an impact at Nexyovi.
                  </p>
                  <button
                    onClick={() => navigate(`/careers/apply?role=${encodeURIComponent('Open Application')}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-[#F5A800] text-slate-950 font-black text-sm hover:bg-[#FFD166] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Send Open Application
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

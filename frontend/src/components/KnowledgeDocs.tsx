import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link as LinkIcon, Bold, Italic, Underline, Strikethrough, AtSign, Highlighter, Plus } from 'lucide-react';

const KnowledgeDocs = () => {
 const containerRef = useRef(null);
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ["start end", "end start"]
 });

 const contentY = useTransform(scrollYProgress, [0, 1], [0, -180]);

 return (
 <section ref={containerRef} id="knowledge" className="bg-[#060709] py-40 relative overflow-hidden border-t border-white/[0.04]">
 <div className="container-wide">
 <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-32 items-start">
 
 {/* Left Text Content */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="lg:sticky lg:top-40"
 >
 <div className="flex items-center gap-3 mb-8">
 <div className="w-2 h-2 rounded-full bg-blue-500 " />
 <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-xs">Technical Wiki</span>
 </div>
 <h2 className="text-white font-bold text-[64px] md:text-[84px] tracking-tighter leading-[0.9] mb-10">
 Knowledge <br/> <span className="text-white/40 italic">Unlocked.</span>
 </h2>
 <p className="text-[#a1a1a6] text-2xl leading-relaxed mb-16 font-medium">
 Architecting a central intelligence hub for your engineering team. Nexyovi's documentation layer is designed for speed, clarity, and deep integration.
 </p>
 <div className="flex flex-col gap-6">
 <button className="w-fit px-12 py-6 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,168,0,0.15)] ">
 Access Library
 </button>
 <div className="flex items-center gap-4 px-6 text-white/50 text-sm font-bold uppercase tracking-[0.2em]">
 <div className="h-px flex-1 bg-white/10" />
 Verified Documentation
 <div className="h-px flex-1 bg-white/10" />
 </div>
 </div>
 </motion.div>

 {/* Right Document Visual */}
 <motion.div
 initial={{ opacity: 0, scale: 0.98 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="relative bg-[#090A0C] rounded-[48px] border border-white/[0.08] overflow-hidden h-[800px] flex flex-col transition-all duration-700 hover:border-white/20"
 >
 {/* Hovering Toolbar */}
 <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-2 bg-[#0F1014]/90 backdrop-blur-3xl border border-white/10 rounded-[20px] z-30">
 <div className="flex gap-1.5 px-3 py-2 border-r border-white/5">
 <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center"><LinkIcon size={14}/></div>
 <div className="w-8 h-8 rounded-lg bg-white/5 text-white/40 flex items-center justify-center"><Bold size={14}/></div>
 <div className="w-8 h-8 rounded-lg bg-white/5 text-white/40 flex items-center justify-center"><Italic size={14}/></div>
 </div>
 <div className="flex gap-1.5 px-3 py-2 border-r border-white/5">
 <div className="w-8 h-8 rounded-lg bg-white/5 text-white/40 flex items-center justify-center"><Underline size={14}/></div>
 <div className="w-8 h-8 rounded-lg bg-white/5 text-white/40 flex items-center justify-center"><Strikethrough size={14}/></div>
 </div>
 <div className="px-4 py-2 text-xs font-black uppercase tracking-widest text-[#a1a1a6] hover:text-white transition-colors cursor-pointer bg-white/5 rounded-xl">Highlight Content</div>
 </div>

 {/* Scrolling Document Content */}
 <motion.div 
 style={{ y: contentY }}
 className="px-20 pt-32 pb-40 space-y-20 select-none"
 >
 <div className="space-y-8">
 <div className="w-20 h-px bg-blue-500/20" />
 <h3 className="text-white text-[44px] font-black tracking-tighter leading-none mb-4">Core Infrastructure Guide</h3>
 <p className="text-[#a1a1a6] text-2xl leading-relaxed font-medium">
 Architecture specifications for the Nexyovi v4.0 backbone. This document details the load-balancing clusters and security hardening protocols.
 </p>
 </div>
 
 <div className="p-12 rounded-[40px] bg-white/[0.02] border border-white/[0.04]">
 <div className="flex gap-3 mb-8">
 <div className="w-3 h-3 rounded-full bg-red-400/20" />
 <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
 <div className="w-3 h-3 rounded-full bg-emerald-400/20" />
 </div>
 <p className="text-white/50 text-xl leading-relaxed mb-8">
 Utilizing <span className="text-blue-400 font-bold">@security-group</span> reviews and <span className="text-emerald-400 font-bold">#deployment</span> hooks to ensure sub-10ms global synchronization across all active nodes.
 </p>
 <div className="h-px bg-white/5 mb-8" />
 <div className="flex gap-4">
 <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-black text-blue-400 uppercase tracking-widest">Active Draft</div>
 <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black text-white/40 uppercase tracking-widest">v4.9.2</div>
 </div>
 </div>

 <div className="space-y-12">
 {[1, 2].map((i) => (
 <div key={i} className="flex gap-8 group">
 <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-black text-white/40 group-hover:bg-blue-500 group-hover:text-white transition-all">{i}</div>
 <p className="text-white/40 text-2xl leading-relaxed">
 Standardize on <span className="text-white italic">Protocol Buffers</span> for internal communication to minimize payload size and maximize throughput velocity.
 </p>
 </div>
 ))}
 </div>

 <div className="pt-20 text-center">
 <div className="inline-block px-10 py-5 rounded-full border-2 border-white/5 text-white/10 font-black uppercase tracking-[0.5em] text-[12px]">End of Document</div>
 </div>
 </motion.div>

 {/* Gradient Masks */}
 <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#090A0C] via-[#090A0C]/80 to-transparent z-20 pointer-events-none" />
 <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/80 to-transparent z-20 pointer-events-none" />
 </motion.div>

 </div>
 </div>
 </section>
 );
};

export default KnowledgeDocs;


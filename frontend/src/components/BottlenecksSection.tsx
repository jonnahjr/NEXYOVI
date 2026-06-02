import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const bottlenecks = [
 {
 id: 'repetitive',
 title: 'Teams spend too much time on repetitive tasks.',
 align: 'start',
 rotateIn: -6,
 corner: 'rounded-tl-sm',
 color: 'bg-white text-slate-900',
 },
 {
 id: 'leads',
 title: 'Leads slip away without consistent follow-up.',
 align: 'end',
 rotateIn: 6,
 corner: 'rounded-tr-sm',
 color: 'bg-[#F5A800] text-black',
 },
 {
 id: 'workflows',
 title: 'Outdated workflows hurt customer experience.',
 align: 'start',
 rotateIn: -6,
 corner: 'rounded-bl-sm',
 color: 'bg-white text-slate-900',
 },
 {
 id: 'scaling',
 title: 'Scaling requires more people and higher costs.',
 align: 'end',
 rotateIn: 6,
 corner: 'rounded-br-sm',
 color: 'bg-white text-slate-900',
 }];

const BottlenecksSection = () => {
 const containerRef = useRef<HTMLElement>(null);
 const badgeRef = useRef(null);
 const badgeInView = useInView(badgeRef, { once: true, margin: '-80px' });
 const headingRef = useRef(null);
 const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

 return (
 <section
 ref={containerRef}
 className="relative bg-[#02040a] py-40 border-t border-white/[0.04] overflow-hidden"
 >
 {/* Subtle noise texture */}
 <div
 className="absolute inset-0 pointer-events-none opacity-[0.015]"
 style={{
 backgroundImage:
 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
 backgroundSize: '200px 200px',
 }}
 />

 {/* Ambient glows */}
 <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-[#F5A800] opacity-[0.025] blur-[150px] pointer-events-none" />
 <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 rounded-full bg-[#8b5cf6] opacity-[0.03] blur-[120px] pointer-events-none" />

 <div className="container relative z-10 max-w-4xl mx-auto px-6">
 <div className="flex flex-col items-center text-center gap-6">

 {/* Badge */}
 <motion.div
 ref={badgeRef}
 initial={{ opacity: 0, y: 16, scale: 0.95 }}
 animate={badgeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
 transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
 className="flex items-center gap-2 mb-2"
 >
 <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse " />
 <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.3em]">
 The Problem
 </span>
 </motion.div>

 {/* Bubble 1 — scrolls in independently */}
 <motion.div
 initial={{ opacity: 0, scale: 0.4, y: 60, rotate: bottlenecks[0].rotateIn }}
 whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
 viewport={{ once: true, amount: 0.6 }}
 transition={{ type: 'spring', bounce: 0.55, duration: 0.9 }}
 className="w-full flex justify-start"
 >
 <motion.div
 drag
 dragConstraints={containerRef}
 dragElastic={0.18}
 whileDrag={{ scale: 1.06, rotate: -2, zIndex: 50 }}
 className={`inline-block ${bottlenecks[0].color} ${bottlenecks[0].corner} rounded-3xl px-6 py-4 max-w-xl cursor-grab active:cursor-grabbing font-bold text-lg md:text-xl select-none`}
 >
 {bottlenecks[0].title}
 </motion.div>
 </motion.div>

 {/* Bubble 2 */}
 <motion.div
 initial={{ opacity: 0, scale: 0.4, y: 60, rotate: bottlenecks[1].rotateIn }}
 whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
 viewport={{ once: true, amount: 0.6 }}
 transition={{ type: 'spring', bounce: 0.55, duration: 0.9, delay: 0.1 }}
 className="w-full flex justify-end"
 >
 <motion.div
 drag
 dragConstraints={containerRef}
 dragElastic={0.18}
 whileDrag={{ scale: 1.06, rotate: 2, zIndex: 50 }}
 className={`inline-block ${bottlenecks[1].color} ${bottlenecks[1].corner} rounded-3xl px-6 py-4 max-w-xl cursor-grab active:cursor-grabbing font-bold text-lg md:text-xl select-none`}
 >
 {bottlenecks[1].title}
 </motion.div>
 </motion.div>

 {/* Heading — animates when it enters view */}
 <motion.h2
 ref={headingRef}
 initial={{ opacity: 0, y: 30, scale: 0.96 }}
 animate={headingInView ? { opacity: 1, y: 0, scale: 1 } : {}}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.04em] leading-[0.9] my-14 pointer-events-none"
 >
 Eliminate the bottlenecks
 <br />
 <span className="text-white/40">that hold you back</span>
 </motion.h2>

 {/* Bubble 3 */}
 <motion.div
 initial={{ opacity: 0, scale: 0.4, y: 60, rotate: bottlenecks[2].rotateIn }}
 whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
 viewport={{ once: true, amount: 0.6 }}
 transition={{ type: 'spring', bounce: 0.55, duration: 0.9 }}
 className="w-full flex justify-start"
 >
 <motion.div
 drag
 dragConstraints={containerRef}
 dragElastic={0.18}
 whileDrag={{ scale: 1.06, rotate: -2, zIndex: 50 }}
 className={`inline-block ${bottlenecks[2].color} ${bottlenecks[2].corner} rounded-3xl px-6 py-4 max-w-xl cursor-grab active:cursor-grabbing font-bold text-lg md:text-xl select-none`}
 >
 {bottlenecks[2].title}
 </motion.div>
 </motion.div>

 {/* Bubble 4 */}
 <motion.div
 initial={{ opacity: 0, scale: 0.4, y: 60, rotate: bottlenecks[3].rotateIn }}
 whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
 viewport={{ once: true, amount: 0.6 }}
 transition={{ type: 'spring', bounce: 0.55, duration: 0.9, delay: 0.1 }}
 className="w-full flex justify-end"
 >
 <motion.div
 drag
 dragConstraints={containerRef}
 dragElastic={0.18}
 whileDrag={{ scale: 1.06, rotate: 2, zIndex: 50 }}
 className={`inline-block ${bottlenecks[3].color} ${bottlenecks[3].corner} rounded-3xl px-6 py-4 max-w-xl cursor-grab active:cursor-grabbing font-bold text-lg md:text-xl select-none`}
 >
 {bottlenecks[3].title}
 </motion.div>
 </motion.div>

 </div>
 </div>
 </section>
 );
};

export default BottlenecksSection;



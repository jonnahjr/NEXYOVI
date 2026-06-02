import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Linkedin, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useCallback, useState } from 'react';

// Import the new high-fidelity avatars
import avatar1 from '../assets/avatar_exec1.png';
import avatar2 from '../assets/avatar_exec2.png';
import avatar3 from '../assets/avatar_exec3.png';

import { useSite } from '../context/SiteContext';

const Testimonials = () => {
 const { testimonials: dynamicTestimonials } = useSite();
 const trackRef = useRef<HTMLDivElement>(null);
 const [isDragging, setIsDragging] = useState(false);
 const isAutoScrolling = useRef(true);
 const x = useMotionValue(0);

 // Standardize dynamic testimonials — show all available (up to 15)
 const allTestimonials = dynamicTestimonials.slice(0, 15).map(t => ({
 name: t.author,
 role: t.role,
 org: t.role.split(',')[1]?.trim() || t.role,
 content: t.content,
 avatar: t.image_url || t.img || avatar1,
 linkedin: t.linkedin || null,
 }));

 // Card width (420px) + gap (24px) = 444px per card
 const cardWidth = 444;
 const totalWidth = allTestimonials.length * cardWidth;
 const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
 const maxDrag = Math.min(0, viewportWidth - totalWidth - 64);

 // Auto-scroll animation — smooth, constant speed, pauses only on drag
 useAnimationFrame((_time, delta) => {
 if (!isAutoScrolling.current) return;
 if (isDragging) return;
 const currentX = x.get();
 // Speed: 35px per second (smooth and readable)
 const step = (delta / 1000) * 35;
 const next = currentX - step;
 // Loop back to start when reaching the end
 if (next <= maxDrag) {
 x.set(0);
 } else {
 x.set(next);
 }
 });

 const scrollTo = useCallback((direction: 'left' | 'right') => {
 const currentX = x.get();
 const step = viewportWidth * 0.6;
 const target = direction === 'left'
 ? Math.min(0, currentX + step)
 : Math.max(maxDrag, currentX - step);
 x.set(target);
 }, [x, viewportWidth, maxDrag]);

 return (
 <section className="py-24 bg-[#02040a] relative overflow-hidden border-t border-white/5 select-none">
 {/* Background Ambience */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.1),transparent)]" />

 <div className="relative z-10">
 <div className="text-center mb-14 px-6">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-flex items-center gap-2 mb-3"
 >
 <div className="inline-flex items-center gap-2 mb-3">
 <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
 <span className="text-[13px] font-bold text-white/70 tracking-wide uppercase">Client Testimonials</span>
 </div>
 </motion.div>
 </div>

 {/* Draggable Testimonial Carousel */}
 <div className="relative group">
 {/* Side fade masks */}
 <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#02040a] to-transparent z-20 pointer-events-none" />
 <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#02040a] to-transparent z-20 pointer-events-none" />

 {/* Navigation Arrows */}
 <button
 onClick={() => scrollTo('left')}
 className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 md:flex hidden group-hover:opacity-100 opacity-0"
 aria-label="Scroll left"
 >
 <ChevronLeft size={18} className="text-white" />
 </button>
 <button
 onClick={() => scrollTo('right')}
 className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 md:flex hidden group-hover:opacity-100 opacity-0"
 aria-label="Scroll right"
 >
 <ChevronRight size={18} className="text-white" />
 </button>

 {/* Draggable track */}
 <motion.div
 ref={trackRef}
 style={{ x }}
 drag="x"
 dragConstraints={{ left: maxDrag, right: 0 }}
 dragElastic={0.4}
 dragMomentum={true}
 dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
 onDragStart={() => { setIsDragging(true); isAutoScrolling.current = false; }}
 onDragEnd={() => { setIsDragging(false); isAutoScrolling.current = true; }}
 whileTap={{ cursor: 'grabbing' }}
 className={`flex gap-6 px-6 md:px-12 py-8 cursor-grab active:cursor-grabbing ${isDragging ? 'scale-[1.01]' : ''} transition-transform duration-150`}
 >
 {allTestimonials.map((t, i) => (
 <motion.div
 key={i}
 whileHover={{ y: isDragging ? 0 : -6 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="w-[420px] md:w-[460px] shrink-0 p-10 flex flex-col bg-[#111111] border border-white/8 rounded-[28px] transition-all duration-500 group/card relative hover:border-white/20 hover:bg-white/[0.05]"
 >
 <div className="flex items-center gap-5 mb-8">
 <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 group-hover/card:border-white/40 transition-all duration-500 shrink-0">
 <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
 </div>
 <div className="min-w-0 flex-1">
 <div className="flex items-center gap-2">
 <h4 className="text-white font-bold text-xl tracking-tight truncate">{t.name}</h4>
 {t.linkedin && (
 <a
 href={t.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 onClick={(e) => e.stopPropagation()}
 className="shrink-0 text-[#0A66C2] hover:text-[#0A66C2] hover:scale-110 transition-all duration-200"
 title="View LinkedIn profile"
 >
 <Linkedin size={18} />
 </a>
 )}
 </div>
 <p className="text-[#7a7a7a] text-[11px] font-medium uppercase tracking-[0.2em] truncate">{t.org}</p>
 </div>
 </div>

 <div className="relative mb-8 flex-grow">
 <Quote size={24} className="text-white/5 absolute -top-4 -left-4" />
 <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed font-medium whitespace-normal italic group-hover/card:text-white transition-colors">
 "{t.content}"
 </p>
 </div>

 <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/[0.06]">
 <div className="flex gap-1">
 {[...Array(5)].map((_, j) => (
 <Star key={j} size={11} className="text-white/40 group-hover/card:text-white fill-current transition-colors duration-300" />
 ))}
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
 <span className="text-[10px] font-medium text-[#7a7a7a] uppercase tracking-widest hidden sm:inline">Verified Partner</span>
 </div>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>

 {/* Dots indicator — always same size, no active highlight */}
 <div className="flex items-center justify-center gap-2 mt-6">
 {allTestimonials.map((_, i) => (
 <button
 key={i}
 onClick={() => {
 const targetX = Math.max(maxDrag, Math.min(0, -(i * cardWidth) + (viewportWidth - cardWidth) / 2));
 x.set(targetX);
 }}
 className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-300"
 aria-label={`Go to testimonial ${i + 1}`}
 />
 ))}
 </div>
 </div>
 </section>
 );
};

export default Testimonials;

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { useSite } from '../context/SiteContext';

const Testimonials = () => {
  const { testimonials: dynamicTestimonials } = useSite();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isAutoScrolling = useRef(true);
  const x = useMotionValue(0);

  const allTestimonials = dynamicTestimonials.slice(0, 15).map(t => ({
    name: t.author,
    role: t.role,
    org: t.role.split(',')[1]?.trim() || t.role,
    content: t.content,
    avatar: t.image_url || t.img || null,
    linkedin: t.linkedin || null,
  }));

  const cardWidth = 444;
  const totalWidth = allTestimonials.length * cardWidth;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxDrag = Math.min(0, viewportWidth - totalWidth - 64);

  useAnimationFrame((_time, delta) => {
    if (!isAutoScrolling.current) return;
    if (isDragging) return;
    const currentX = x.get();
    const step = (delta / 1000) * 35;
    const next = currentX - step;
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
    <section className="py-20 bg-[#02040a] relative overflow-hidden section-divider-dark select-none">
      <div className="relative z-10">
        <div className="text-center mb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">Client Testimonials</span>
          </motion.div>
        </div>

        <div className="relative group">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#02040a] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#02040a] to-transparent z-20 pointer-events-none" />

          <button
            onClick={() => scrollTo('left')}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/8 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="text-white/60" />
          </button>
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/8 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="text-white/60" />
          </button>

          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.3}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
            onDragStart={() => { setIsDragging(true); isAutoScrolling.current = false; }}
            onDragEnd={() => { setIsDragging(false); isAutoScrolling.current = true; }}
            whileTap={{ cursor: 'grabbing' }}
            className={`flex gap-4 px-6 md:px-12 py-6 cursor-grab active:cursor-grabbing ${isDragging ? 'scale-[1.005]' : ''} transition-transform duration-150`}
          >
            {allTestimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: isDragging ? 0 : -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-[320px] md:w-[360px] shrink-0 p-6 flex flex-col bg-[#111111] border border-white/8 rounded-2xl group/card hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/10 text-white/40 text-xs font-bold">
                        {t.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-white font-bold text-sm tracking-tight truncate">{t.name}</h4>
                      {t.linkedin && (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 text-white/30 hover:text-white transition-colors"
                          title="View LinkedIn profile"
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-white/30 text-[10px] font-medium uppercase tracking-wider truncate">{t.org}</p>
                  </div>
                </div>

                <div className="relative flex-grow">
                  <p className="text-white/60 text-sm leading-relaxed font-normal whitespace-normal">
                    "{t.content}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5">
          {allTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const targetX = Math.max(maxDrag, Math.min(0, -(i * cardWidth) + (viewportWidth - cardWidth) / 2));
                x.set(targetX);
              }}
              className="w-1.5 h-1.5 rounded-full bg-white/15 hover:bg-white/40 transition-all duration-300"
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
   title: 'Senior Engineers Only',
   desc: 'No junior staffing. Every project is led by experienced senior engineers who architect, build, and ship production-grade systems.',
   accent: '#0ea5e9',
   link: '/services/software',
  },
  {
   title: 'Security by Design',
   desc: 'Security integrated from day one — not bolted on after. Every layer of every system is built with zero-trust principles and compliance in mind.',
   accent: '#f97316',
   link: '/services/security',
  },
  {
   title: 'AI-Native Development',
   desc: 'Modern AI tooling accelerates delivery across the entire development lifecycle — from code generation to testing, deployment, and monitoring.',
   accent: '#a855f7',
   link: '/services/ai',
  },
  {
   title: 'Long-Term Partnership',
   desc: 'Support beyond launch. We stay engaged with proactive maintenance, continuous improvements, and strategic guidance as your business evolves.',
   accent: '#3b82f6',
   link: '/company',
  },
];

function computeFocus(distance: number, range: number) {
  return Math.max(0, 1 - distance / range);
}

function computeOpacity(focus: number) {
  return 1;
}

function computeScale(focus: number) {
  return 1;
}

export default function WhyNexyoviSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollMetrics, setScrollMetrics] = useState({
    viewportHeight: 320,
    startTranslate: 0,
    endTranslate: -920,
    scrollDistance: 920,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 18,
    restDelta: 0.001
  });

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = cardsViewportRef.current;
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[cards.length - 1];

      if (!viewport || !firstCard || !lastCard) return;

      const viewportHeight = viewport.clientHeight;
      const viewportCenter = viewportHeight / 2;
      const firstCenter = firstCard.offsetTop + firstCard.offsetHeight / 2;
      const lastCenter = lastCard.offsetTop + lastCard.offsetHeight / 2;
      const startTranslate = viewportCenter - firstCenter;
      const endTranslate = viewportCenter - lastCenter;

      setScrollMetrics({
        viewportHeight,
        startTranslate,
        endTranslate,
        scrollDistance: Math.max(1, startTranslate - endTranslate),
      });
    };

    measure();

    const viewport = cardsViewportRef.current;
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;

    if (resizeObserver && viewport) {
      resizeObserver.observe(viewport);
      cardRefs.current.forEach((card) => {
        if (card) resizeObserver.observe(card);
      });
    }

    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (cardsContainerRef.current) {
      const translateY = scrollMetrics.startTranslate + (scrollMetrics.endTranslate - scrollMetrics.startTranslate) * v;
      cardsContainerRef.current.style.transform = `translateY(${translateY}px)`;
    }

    cards.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (el) {
        const translateY = scrollMetrics.startTranslate + (scrollMetrics.endTranslate - scrollMetrics.startTranslate) * v;
        const viewportCenter = scrollMetrics.viewportHeight / 2;
        const cardCenter = el.offsetTop + el.offsetHeight / 2 + translateY;
        const focus = computeFocus(Math.abs(viewportCenter - cardCenter), scrollMetrics.viewportHeight * 0.33);
        el.style.opacity = String(computeOpacity(focus));
        el.style.zIndex = String(10 + Math.round(focus * 20));
        el.style.transformOrigin = 'center center';
        el.style.transform = `scale(${computeScale(focus)})`;
      }
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FCFBF8] border-t border-slate-200"
      style={{ height: `${Math.ceil(scrollMetrics.viewportHeight + scrollMetrics.scrollDistance)}px` }}
    >
      <div className="absolute inset-0 z-0 bg-[#FCFBF8]" />

      <div className="sticky top-0 z-10 h-[38vh] min-h-[260px] overflow-hidden">
        <div className="container max-w-7xl mx-auto relative z-10 px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-4 lg:gap-8 items-center w-full min-h-0">

            {/* Left: Title + subtitle */}
            <div className="flex flex-col items-center lg:flex-row gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full"
              >
                <div className="lg:max-w-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Why Nexyovi?</span>
                  </div>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-slate-950 tracking-[-0.04em] leading-[0.94]">
                    Real{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">differentiation.</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-2 max-w-xs font-medium leading-relaxed">
                    This is what buyers compare. We deliver on every point.
                  </p>
                </div>
              </motion.div>

              {/* Animated Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="hidden lg:block flex-shrink-0"
              >
                <ChevronRight
                  size={48}
                  strokeWidth={3}
                  className="text-[#F5A800] animate-pulse"
                />
              </motion.div>
            </div>

            {/* Right: Cards container — slides up */}
            <div ref={cardsViewportRef} className="relative h-[170px] md:h-[210px] overflow-hidden px-2 py-2">
              <div ref={cardsContainerRef} className="absolute inset-x-2 top-2 space-y-2">
                  {cards.map((card, i) => {
                  return (
                    <Link
                      to={card.link}
                      key={card.title}
                      ref={(el) => { cardRefs.current[i] = el as unknown as HTMLDivElement; }}
                      className="group relative min-h-[74px] origin-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 md:p-3 transition-all duration-500 hover:border-[#F5A800]/40 hover:-translate-y-0.5 hover:shadow-lg block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F5A800]/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative z-10 space-y-1">
                        <div>
                          <h3
                            className="text-[13px] md:text-[15px] font-black tracking-[-0.02em] leading-[1.15] mb-0.5 text-slate-950"
                          >
                            {card.title}
                          </h3>
                          <p className="text-slate-500 text-[11px] md:text-[12px] leading-relaxed max-w-md font-medium">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

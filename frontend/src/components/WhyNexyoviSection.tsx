import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

const cards = [
  {
    title: 'Business-Focused Development',
    desc: 'Every project starts with business goals, not technology trends.',
    accent: '#F5A800',
  },
  {
    title: 'Built For Real Usage',
    desc: 'Production-ready software designed for real customers and daily operations.',
    accent: '#8b5cf6',
  },
  {
    title: 'AI With Practical Impact',
    desc: 'Automation and AI solutions that reduce workload and improve efficiency.',
    accent: '#10b981',
  },
  {
    title: 'Enterprise-Grade Security',
    desc: 'Robust architecture with military-grade encryption and compliance standards.',
    accent: '#ef4444',
  },
  {
    title: 'Scalable Cloud Infrastructure',
    desc: 'Cloud-native solutions designed to handle millions of users seamlessly as you grow.',
    accent: '#0ea5e9',
  },
  {
    title: 'Data-Driven Intelligence',
    desc: 'Actionable insights through advanced analytics and predictive modeling.',
    accent: '#f97316',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'Support, maintenance, improvements, and growth after launch.',
    accent: '#3b82f6',
  },
];

function computeFocus(distance: number, range: number) {
  return Math.max(0, 1 - distance / range);
}

function computeOpacity(focus: number) {
  return 0.32 + focus * 0.68;
}

function computeScale(focus: number) {
  return 0.8 + focus * 0.3;
}

export default function WhyNexyoviSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollMetrics, setScrollMetrics] = useState({
    viewportHeight: 620,
    startTranslate: 0,
    endTranslate: -2040,
    scrollDistance: 2040,
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
      className="relative bg-[#f4f4f5] border-t border-slate-200"
      style={{ height: `${Math.ceil(scrollMetrics.viewportHeight + scrollMetrics.scrollDistance)}px` }}
    >
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container max-w-7xl mx-auto relative z-10 px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center w-full min-h-0">

            {/* Left: Large Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              <div className="lg:max-w-xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-[-0.04em] leading-[0.9]">
                  Why Businesses
                  <br />
                  Work With
                  <br />
                  <span className="text-[#F5A800]">Nexyovi</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
                  Practical delivery, secure systems, and scalable platforms built for real business growth.
                </p>
              </div>
            </motion.div>

            {/* Right: Cards container — slides up */}
            <div ref={cardsViewportRef} className="relative h-[560px] md:h-[620px] overflow-hidden px-5 py-10">
              <div ref={cardsContainerRef} className="absolute inset-x-5 top-10 space-y-6">
                {cards.map((card, i) => {
                  return (
                    <div
                      key={card.title}
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className="group relative min-h-[220px] origin-center overflow-hidden rounded-[40px] border border-slate-700 bg-slate-900 p-8 md:p-10 transition-all duration-500 hover:border-slate-500 will-change-transform"
                    >
                      <div className="relative z-10 space-y-5">
                        <div>
                          <h3
                            className="text-[28px] md:text-[32px] font-black tracking-[-0.02em] leading-[1.1] mb-4 text-white"
                          >
                            {card.title}
                          </h3>
                          <p className="text-white/80 text-[16px] leading-relaxed max-w-lg font-medium">
                            {card.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="h-[2px] flex-1 max-w-[60px] rounded-full transition-all duration-500 group-hover:max-w-[100px]" style={{ backgroundColor: card.accent }} />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/75">
                            Learn more
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f4f4f5] to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}

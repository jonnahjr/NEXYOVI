import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Engineering First',
    desc: 'Senior engineers lead every project, ensuring robust architecture and high-quality code from day one.',
    accent: '#0ea5e9',
    link: '/services/software',
  },
  {
    title: 'Security Built-In',
    desc: 'Security is integrated at every layer, protecting your data and maintaining compliance seamlessly.',
    accent: '#f97316',
    link: '/services/security',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We stay involved after launch with dedicated support, maintenance, and continuous feature growth.',
    accent: '#3b82f6',
    link: '/company',
  },
  {
    title: 'Elite Talent Network',
    desc: 'Access top-tier engineers from Ethiopia and beyond — every engineer on our network has shipped production systems at scale.',
    accent: '#a855f7',
    link: '/company',
  },
  {
    title: 'Rapid Execution',
    desc: 'Iterative development cycles with continuous delivery — from concept to production in weeks, not months.',
    accent: '#14b8a6',
    link: '/services/cloud',
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
    viewportHeight: 430,
    startTranslate: 0,
    endTranslate: -1320,
    scrollDistance: 1320,
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
      className="relative bg-[#02040a] section-divider-dark"
      style={{ height: `${Math.ceil(scrollMetrics.viewportHeight + scrollMetrics.scrollDistance)}px` }}
    >
      <div className="absolute inset-0 z-0 bg-[#02040a]" />
      {/* Two diagonal // lines in creamy white */}
      <div
        className="absolute inset-0 z-[1] opacity-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, transparent 0%, transparent 30%, #FCFBF8 30%, #FCFBF8 36%, transparent 36%, transparent 66%, #FCFBF8 66%, #FCFBF8 72%, transparent 72%, transparent 100%)`,
        }}
      />

      <div className="sticky top-0 z-10 h-[56vh] min-h-[420px] overflow-hidden">
        <div className="container max-w-7xl mx-auto relative z-10 px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-10 items-center w-full min-h-0">

            {/* Left: Large Title + Arrow */}
            <div className="flex flex-col items-center lg:flex-row gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full"
              >
                <div className="lg:max-w-md">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-[-0.04em] leading-[0.94]">
                    <span className="text-[#F5A800]">Nexyovi</span>
                  </h2>
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
            <div ref={cardsViewportRef} className="relative h-[260px] md:h-[320px] overflow-hidden px-3 py-3">
              <div ref={cardsContainerRef} className="absolute inset-x-3 top-3 space-y-2">
                {cards.map((card, i) => {
                  return (
                    <div
                      key={card.title}
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className="group relative min-h-[110px] origin-center overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0a0e] p-4 md:p-5 transition-all duration-500 hover:border-[#F5A800]/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative z-10 space-y-2">
                        <div>
                          <h3
                            className="text-[15px] md:text-[17px] font-black tracking-[-0.02em] leading-[1.15] mb-1 text-white"
                          >
                            {card.title}
                          </h3>
                          <p className="text-white/50 text-[12px] md:text-[13px] leading-relaxed max-w-md font-medium">
                            {card.desc}
                          </p>
                        </div>

                        <Link to={card.link} className="flex items-center gap-2 pt-1 group/link">
                          <div className="h-[2px] flex-1 max-w-[44px] rounded-full transition-all duration-500 group-hover:max-w-[80px]" style={{ backgroundColor: card.accent }} />
                          <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/60 group-hover:text-[#F5A800]">
                            Learn more
                          </span>
                        </Link>
                      </div>
                    </div>
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

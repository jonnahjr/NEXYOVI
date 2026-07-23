import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import locate1 from '../assets/location/1.png';
import locate2 from '../assets/location/2.png';
import locate3 from '../assets/location/3.png';
import market1 from '../assets/market/1.png';
import market2 from '../assets/market/2.png';
import market3 from '../assets/market/3.png';
import tele1 from '../assets/tele/1.png';
import tele2 from '../assets/tele/2.png';
import tele3 from '../assets/tele/3.png';
import pharmaFlowImg from '../assets/ChatGPT Image Jul 23, 2026, 02_17_41 PM.png';
import stockVueImg from '../assets/ChatGPT Image Jul 23, 2026, 02_22_47 PM.png';
import biteOrderImg from '../assets/ChatGPT Image Jul 23, 2026, 02_22_49 PM.png';
import aiBusinessImg from '../assets/ChatGPT Image Jul 23, 2026, 02_31_23 PM.png';
import tableReserveImg from '../assets/ChatGPT Image Jul 23, 2026, 02_43_02 PM.png';
import hmsImg from '../assets/ChatGPT Image Jul 23, 2026, 03_08_50 PM.png';
import schoolErpImg from '../assets/ChatGPT Image Jul 23, 2026, 03_06_57 PM.png';
import hisImg from '../assets/ChatGPT Image Jul 23, 2026, 03_05_14 PM.png';
import projectMgmtImg from '../assets/ChatGPT Image Jul 23, 2026, 03_11_23 PM.png';

interface Project {
  name: string;
  desc: string;
  outcome?: string;
  screenshots?: string[];
  tags: string[];
  href: string;
  color: string;
}

const COLORS = [
  '#F5A800', '#8b5cf6', '#06b6d4', '#10b981', '#3b82f6', '#f43f5e',
  '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  '#0ea5e9', '#d946ef', '#22c55e', '#e11d48', '#7c3aed', '#f59e0b',
  '#0284c7', '#db2777', '#65a30d', '#0891b2', '#9333ea', '#ca8a04',
];

function color(i: number) {
  return COLORS[i % COLORS.length];
}

const projects: Project[] = [
  // ── Featured Projects ──
  {
    name: 'Nexi Locate',
    desc: 'Location discovery app for restaurants, cafes, and more.',
    outcome: 'Real-time location search with curated recommendations and user reviews',
    screenshots: [locate1, locate2, locate3],
    tags: ['Nexyovi Labs', 'Maps', 'Mobile'],
    href: '/request-demo?product=Nexi%20Locate',
    color: color(1),
  },
  {
    name: 'Tele-Psychiatry',
    desc: 'Secure telehealth platform connecting patients with specialists.',
    outcome: 'HIPAA-compliant with end-to-end encryption, scheduling, and e-prescribing',
    screenshots: [tele1, tele2, tele3],
    tags: ['iOS', 'Android', 'Health'],
    href: '/request-demo?product=Tele-Psychiatry',
    color: color(2),
  },
  {
    name: 'PharmaFlow',
    desc: 'A comprehensive pharmacy management system handling inventory tracking, prescription fulfillment, regulatory compliance, and patient records.',
    outcome: '200+ pharmacies | 50K+ prescriptions | 99.8% uptime',
    screenshots: [pharmaFlowImg],
    tags: ['Inventory', 'HIPAA', 'Analytics'],
    href: '/request-demo?product=PharmaFlow',
    color: color(3),
  },
  {
    name: 'StockVue',
    desc: 'A real-time inventory and stock management platform for retail and warehouse operations with multi-warehouse tracking, automated reordering, and analytics.',
    outcome: '40% reduction | 1M+ items | 50+ warehouses',
    screenshots: [stockVueImg],
    tags: ['Real-Time', 'Analytics', 'Automation'],
    href: '/request-demo?product=StockVue',
    color: color(4),
  },
  {
    name: 'BiteOrder',
    desc: 'A complete restaurant digital platform featuring custom websites, online ordering, table reservations, and POS integration with real-time order tracking.',
    outcome: '300+ restaurants | 120K+ orders | 35% growth',
    screenshots: [biteOrderImg],
    tags: ['Online Ordering', 'Reservations', 'POS'],
    href: '/request-demo?product=BiteOrder',
    color: color(5),
  },
  {
    name: 'TableReserve',
    desc: 'An intelligent reservation and booking management system for restaurants, hotels, and event venues with real-time availability and automated reminders.',
    outcome: '1M+ reservations | 500+ venues | <4% no-show rate',
    screenshots: [tableReserveImg],
    tags: ['Booking', 'CRM', 'Calendar'],
    href: '/request-demo?product=TableReserve',
    color: color(6),
  },

  // ── Solution Portfolio ──
  {
    name: 'Nexi Market',
    desc: 'Multi-vendor e-commerce platform built with modern web and mobile technologies.',
    outcome: 'Full-featured marketplace with vendor dashboards, payments, and inventory management',
    screenshots: [market1, market2, market3],
    tags: ['Nexyovi Labs', 'E-Commerce', 'Mobile'],
    href: '/request-demo?product=Nexi%20Market',
    color: color(0),
  },
  {
    name: 'AI Business OS (ERP + CRM + POS)',
    desc: 'Unified business operating system combining ERP, CRM, and POS into a single AI-powered platform for end-to-end operational management.',
    screenshots: [aiBusinessImg],
    tags: ['ERP', 'CRM', 'POS'],
    href: '/request-demo?product=AI%20Business%20OS%20(ERP%20%2B%20CRM%20%2B%20POS)',
    color: color(7),
    outcome: 'All-in-one AI-powered ERP, CRM, and POS for end-to-end business management',
  },

  // ── Additional Projects ──
  {
    name: 'Hospital Information System (HIS)',
    desc: 'Comprehensive HIS covering patient management, EHR, billing, pharmacy, lab, radiology, and clinical decision support.',
    screenshots: [hisImg],
    outcome: 'Unified digital health records with integrated clinical and administrative workflows',
    tags: ['EHR', 'Patient Mgmt', 'Clinical'],
    href: '/request-demo?product=Hospital%20Information%20System%20(HIS)',
    color: color(8),
  },
  {
    name: 'School ERP',
    desc: 'Complete school management system with student info, attendance, grading, timetable, fee management, and parent communication.',
    screenshots: [schoolErpImg],
    outcome: 'End-to-end student lifecycle management from enrollment through graduation',
    tags: ['Student Info', 'Grading', 'Parent Portal'],
    href: '/request-demo?product=School%20ERP',
    color: color(9),
  },
  {
    name: 'Hotel Management System (HMS)',
    desc: 'Complete HMS with booking engine, front desk operations, housekeeping, channel management, and guest experience tools.',
    screenshots: [hmsImg],
    outcome: 'Seamless hotel operations with automated booking, front desk, and housekeeping',
    tags: ['Booking', 'Front Desk', 'Channel Mgmt'],
    href: '/request-demo?product=Hotel%20Management%20System%20(HMS)',
    color: color(10),
  },
  {
    name: 'Project Management Software',
    desc: 'Full-featured project management platform with task tracking, Gantt charts, resource management, and team collaboration.',
    screenshots: [projectMgmtImg],
    outcome: 'Collaborative project delivery with real-time task tracking and resource planning',
    tags: ['Tasks', 'Gantt', 'Collaboration'],
    href: '/request-demo?product=Project%20Management%20Software',
    color: color(11),
  },
];

function useCardsPerSlide() {
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 640) return 2;
    }
    return 1;
  });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCount(4);
      else if (w >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

export default function FeaturedProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsPerSlide = useCardsPerSlide();
  const totalSlides = Math.ceil(projects.length / cardsPerSlide);

  // Reset slide when cards per slide changes (resize)
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerSlide]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Group projects into slides
  const slides: Project[][] = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(projects.slice(i * cardsPerSlide, (i + 1) * cardsPerSlide));
  }

  const gridCols =
    cardsPerSlide === 4 ? 'xl:grid-cols-4' : cardsPerSlide === 2 ? 'sm:grid-cols-2' : 'grid-cols-1';

  return (
    <section className="relative bg-[#02040a] py-16 sm:py-20 md:py-28 lg:py-36 section-divider-dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#F5A800]/5 blur-[100px] sm:blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#8b5cf6]/5 blur-[100px] sm:blur-[140px]" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Featured Projects</span>
            </div>
            <h2 className="text-[clamp(28px,8vw,56px)] font-black text-white tracking-[-0.04em] leading-[0.95]">
              Products we've <br />
              <span className="bg-gradient-to-r from-[#F5A800] to-amber-400 bg-clip-text text-transparent">shipped.</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group btn-gold text-[11px] sm:text-[12px] px-5 sm:px-7 py-2.5 sm:py-3"
          >
            <span className="relative z-10">View All</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Arrow left */}
          {totalSlides > 1 && (
            <button
              onClick={goPrev}
              className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-[#02040a]/80 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Track */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              {slides.map((slide, si) => (
                <div
                  key={si}
                  className={`flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-3 sm:gap-4`}
                >
                  {slide.map((project, pi) => (
                    <ProjectCard key={`${si}-${pi}`} project={project} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Arrow right */}
          {totalSlides > 1 && (
            <button
              onClick={goNext}
              className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-[#02040a]/80 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide
                      ? 'w-8 h-2 bg-[#F5A800]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile view all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="md:hidden text-center mt-8"
        >
          <Link
            to="/projects"
            className="group btn-gold text-[12px] sm:text-[13px] px-6 sm:px-8 py-3 sm:py-4"
          >
            <span className="relative z-10">View All Projects</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Individual Project Card ──────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Screenshot section or color accent bar */}
        {hasScreenshots ? (
          <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
            {project.screenshots!.length === 1 ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.screenshots![0]}
                  alt={`${project.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3">
                {project.screenshots!.map((img, j) => (
                  <div
                    key={j}
                    className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/5 flex-shrink-0 transition-all duration-500 group-hover:scale-[1.04]"
                    style={{
                      width: j === 1 ? '45%' : '35%',
                      aspectRatio: '9 / 19',
                      marginTop: j === 0 ? '10%' : j === 2 ? '10%' : 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${project.name} screen ${j + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
          </div>
        ) : (
          <div
            className="relative w-full h-40 sm:h-48 md:h-56 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
            }}
          >
            <div
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-25"
              style={{ backgroundColor: project.color, top: '-30%', right: '-15%' }}
            />
            <div
              className="absolute w-36 h-36 rounded-full blur-3xl opacity-15"
              style={{ backgroundColor: project.color, bottom: '-20%', left: '-5%' }}
            />
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight select-none"
              style={{ color: `${project.color}15` }}
            >
              {project.name.charAt(0)}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
          </div>
        )}

        {/* Info section */}
        <div className="p-4 sm:p-5 pt-3 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-[13px] sm:text-[15px] tracking-tight mb-1 group-hover:text-[#F5A800] transition-colors leading-snug">
            {project.name}
          </h3>
          <p className="text-white/40 text-[11px] sm:text-xs leading-relaxed mb-2 line-clamp-2">
            {project.desc}
          </p>

          {project.outcome && (
            <p className="text-[#F5A800] text-[11px] font-medium mb-3 leading-relaxed">
              {project.outcome}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 sm:pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30 uppercase tracking-wider group-hover:border-white/[0.15] group-hover:text-white/60 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.href !== '/projects' && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/[0.04] flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white">
                Request Demo
              </span>
              <ArrowRight size={14} className="text-[#F5A800]" />
            </div>
          )}
        </div>
      </div>

      {/* Hover overlay link */}
      <Link to={project.href} className="absolute inset-0 z-20" aria-label={`View ${project.name}`}>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={12} className="text-[#F5A800]" />
        </div>
      </Link>
    </motion.div>
  );
}

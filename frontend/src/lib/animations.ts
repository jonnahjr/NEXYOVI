import type { Variants } from 'framer-motion';

// ── Base Easing ──────────────────────────────────────────────
export const EASE_EXPO    = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING  = [0.34, 1.56, 0.64, 1] as const;
export const EASE_SMOOTH  = [0.4, 0, 0.2, 1] as const;
export const EASE_CINEMA  = [0.22, 1, 0.36, 1] as const;
export const EASE_MILITARY = [0.12, 0, 0.39, 0] as const;

// ── Fade Up ──────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const fadeUpSlow: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_EXPO } },
};

// ── Reveal variants (cinema-grade) ───────────────────────────
export const revealUp: Variants = {
  hidden:  { opacity: 0, y: 60, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_CINEMA } },
};

export const revealLeft: Variants = {
  hidden:  { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_CINEMA } },
};

export const revealRight: Variants = {
  hidden:  { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_CINEMA } },
};

// ── Fade In ──────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_SMOOTH } },
};

// ── Slide From Left / Right ──────────────────────────────────
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_EXPO } },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_EXPO } },
};

// ── Scale In ─────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_EXPO } },
};

// ── Stagger Containers ───────────────────────────────────────
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerContainerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

export const staggerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// ── Cinematic stagger ─────────────────────────────────────────
export const cinematicContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// ── Text Reveal (word/char) ──────────────────────────────────
export const textReveal: Variants = {
  hidden:  { opacity: 0, y: '100%', clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const textRevealCinema: Variants = {
  hidden:  { opacity: 0, y: 32, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.85, ease: EASE_CINEMA } },
};

// ── Card ─────────────────────────────────────────────────────
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_EXPO } },
};

// ── Page Transition ──────────────────────────────────────────
export const pageTransition = {
  initial:   { opacity: 0, y: 12 },
  animate:   { opacity: 1, y: 0 },
  exit:      { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: EASE_EXPO },
};

// ── Hover: Lift ──────────────────────────────────────────────
export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.25, ease: EASE_EXPO } },
  whileTap:   { scale: 0.97 },
};

export const hoverGlow = {
  whileHover: { y: -4, transition: { duration: 0.3 } },
  whileTap:   { scale: 0.98 },
};

// ── Parallax helpers ─────────────────────────────────────────
export const parallaxContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const parallaxChild: Variants = {
  hidden:  { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_CINEMA } },
};

// ── Viewport defaults ────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' };
export const viewportEager = { once: true, margin: '-40px' };
export const viewportLazy = { once: true, margin: '-120px' };

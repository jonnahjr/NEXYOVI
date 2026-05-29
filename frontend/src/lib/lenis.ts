import { useEffect } from 'react';
import Lenis from 'lenis';
import { frame, cancelFrame } from 'framer-motion';

let lenisInstance: Lenis | null = null;

export function useLenis(enabled = true) {

  useEffect(() => {
    if (!enabled) return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with Framer Motion's ticker to fix jitter and guarantee 60 FPS
    const update = (data: { timestamp: number }) => {
      lenisInstance?.raf(data.timestamp);
    };

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, [enabled]);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollTo(target: string | number | HTMLElement, options?: object) {
  lenisInstance?.scrollTo(target as any, options);
}

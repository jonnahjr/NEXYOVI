import { motion } from 'framer-motion';
import React from 'react';
import { EASE_EXPO } from '../lib/animations';

export default function TextReveal({
  children,
  className,
  delay = 0,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  light?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        initial={{ y: '100%', clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ y: 0, clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: EASE_EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode, ElementType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'info' | 'error';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const typeConfig = {
  success: {
    icon: CheckCircle2,
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    glow: 'rgba(52,211,153,0.15)',
    progress: '#10b981',
    defaultTitle: 'Success',
  },
  info: {
    icon: Info,
    accent: 'text-[#F5A800]',
    bg: 'bg-[#F5A800]/10',
    border: 'border-[#F5A800]/25',
    glow: 'rgba(245,168,0,0.15)',
    progress: '#F5A800',
    defaultTitle: 'Notification',
  },
  error: {
    icon: XCircle,
    accent: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    glow: 'rgba(248,113,113,0.15)',
    progress: '#ef4444',
    defaultTitle: 'Error',
  },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((
    message: string,
    type: ToastType = 'info',
    title?: string,
  ) => {
    const id = Math.random().toString(36).substr(2, 9);      const config = typeConfig[type];
    const newToast: Toast = {
      id,
      title: title || config.defaultTitle,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-[380px] w-full"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const config = typeConfig[t.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 120, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.25, ease: 'easeIn' } }}
                transition={{ type: 'spring', damping: 26, stiffness: 300, mass: 0.8 }}
                style={{ originX: 1 }}
                className="pointer-events-auto relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl bg-black/75 border-white/[0.12]"
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

                {/* Glow dot */}
                <div
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full blur-2xl pointer-events-none"
                  style={{ background: config.glow }}
                />

                <div className="relative z-10 p-4 pl-[52px]">
                  {/* App icon - top left */}
                  <div
                    className={`absolute top-4 left-4 w-7 h-7 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={14} className={config.accent} />
                  </div>

                  {/* Close button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); dismiss(t.id); }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white/30 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                  >
                    <X size={12} />
                  </button>

                  {/* App name label */}
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 mb-0.5">
                    Nexyovi
                  </div>

                  {/* Title */}
                  <div className={`text-sm font-bold text-white leading-tight mb-0.5 ${config.accent}`}>
                    {t.title}
                  </div>

                  {/* Message */}
                  <div className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {t.message}
                  </div>
                </div>

                {/* Progress bar at bottom */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 4.2, ease: 'linear' }}
                  style={{ transformOrigin: 'left', backgroundColor: config.progress }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

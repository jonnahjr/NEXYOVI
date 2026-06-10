import { motion } from 'framer-motion';

// ══════════════════════════════════════════════════════════════
//  SKELETON PRIMITIVES
// ══════════════════════════════════════════════════════════════

interface SkeletonProps {
  className?: string;
}

/** Single shimmer line — pulse + gradient sweep */
const SkeletonShimmerBase = ({ className = '', style, ...rest }: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative overflow-hidden rounded-lg bg-white/[0.04] ${className}`} style={style} {...rest}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

/** A rectangular block skeleton */
export const SkeletonBlock = ({ className = '', width, height }: SkeletonProps & { width?: string | number; height?: string | number }) => (
  <SkeletonShimmerBase className={className} style={width || height ? { width: width as any, height: height as any } : undefined} />
);

/** A circular skeleton */
export const SkeletonCircle = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
  <SkeletonShimmerBase className={`rounded-full shrink-0 ${className}`} style={{ width: size, height: size }} />
);

/** A text line skeleton */
export const SkeletonText = ({ lines = 1, lastWidth = '60%', className = '' }: { lines?: number; lastWidth?: string; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonShimmerBase
        key={i}
        className="h-3 rounded"
        style={{ width: i === lines - 1 ? lastWidth : '100%' }}
      />
    ))}
  </div>
);

/** A card skeleton (icon + title + description lines) */
export const SkeletonCard = ({ className = '' }: SkeletonProps) => (
  <div className={`bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 ${className}`}>
    <div className="flex items-start gap-4 mb-4">
      <SkeletonCircle size={36} />
      <div className="flex-1 space-y-2">
        <SkeletonShimmerBase className="h-4 w-2/3 rounded" />
        <SkeletonShimmerBase className="h-3 w-1/3 rounded" />
      </div>
    </div>
    <SkeletonText lines={3} lastWidth="80%" />
  </div>
);

/** A table row skeleton (for admin list views) */
export const SkeletonTableRow = ({ columns = 4, className = '' }: { columns?: number; className?: string }) => (
  <div className={`flex items-center gap-4 py-3 border-b border-white/[0.04] ${className}`}>
    <SkeletonShimmerBase className="h-8 w-8 rounded-full shrink-0" />
    {Array.from({ length: columns }).map((_, i) => (
      <SkeletonShimmerBase
        key={i}
        className="h-3 rounded flex-1"
        style={{ maxWidth: i === 0 ? '30%' : i === columns - 1 ? '15%' : '22%' }}
      />
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════
//  PAGE-LEVEL SKELETONS
// ══════════════════════════════════════════════════════════════

/** Admin panel skeleton — shows sidebar + topbar + dashboard card placeholders */
export const AdminSkeleton = () => (
  <div className="h-screen w-screen bg-[#02040a] flex overflow-hidden">
    {/* Sidebar skeleton */}
    <aside className="hidden lg:flex h-full w-[260px] bg-[#050816]/95 border-r border-white/[0.06] flex-col shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <SkeletonShimmerBase className="w-8 h-8 rounded-lg" />
          <div className="space-y-1.5">
            <SkeletonShimmerBase className="h-3 w-20 rounded" />
            <SkeletonShimmerBase className="h-2 w-14 rounded" />
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-4 space-y-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <SkeletonShimmerBase className="w-[18px] h-[18px] rounded" />
            <SkeletonShimmerBase className="h-3 flex-1 rounded" />
          </div>
        ))}
      </div>
    </aside>

    {/* Main content skeleton */}
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Topbar */}
      <header className="h-16 bg-[#050816]/80 border-b border-white/[0.06] px-6 flex items-center justify-between">
        <div className="space-y-1.5">
          <SkeletonShimmerBase className="h-4 w-28 rounded" />
          <SkeletonShimmerBase className="h-3 w-20 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonShimmerBase className="w-9 h-9 rounded-lg" />
          <div className="flex items-center gap-2">
            <SkeletonCircle size={32} />
            <SkeletonShimmerBase className="h-3 w-16 rounded hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Page content — cards grid */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome banner */}
          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <SkeletonShimmerBase className="h-5 w-32 rounded" />
                <SkeletonShimmerBase className="h-3 w-56 rounded" />
              </div>
              <SkeletonShimmerBase className="h-6 w-24 rounded-full" />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
                <SkeletonShimmerBase className="w-10 h-10 rounded-lg mb-3" />
                <SkeletonShimmerBase className="h-5 w-12 rounded mb-1" />
                <SkeletonShimmerBase className="h-3 w-20 rounded" />
              </div>
            ))}
          </div>

          {/* Content row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <SkeletonShimmerBase className="h-3 w-24 rounded" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <SkeletonShimmerBase className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 space-y-1.5">
                        <SkeletonShimmerBase className="h-3 w-24 rounded" />
                        <SkeletonShimmerBase className="h-2 w-16 rounded" />
                      </div>
                    </div>
                    <SkeletonShimmerBase className="h-2 w-3/4 rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <SkeletonShimmerBase className="h-3 w-24 rounded" />
              <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <SkeletonCircle size={24} />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonShimmerBase className="h-2 w-full rounded" />
                      <SkeletonShimmerBase className="h-2 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

/** Auth loading skeleton — minimal, brand-aware */
export const AuthSkeleton = () => (
  <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
    <div className="flex flex-col items-center gap-6">
      {/* Logo placeholder */}
      <div className="relative">
        <SkeletonShimmerBase className="w-16 h-16 rounded-2xl" />
        <div className="absolute -top-1 -right-1">
          <SkeletonShimmerBase className="w-4 h-4 rounded-full" />
        </div>
      </div>
      <div className="space-y-3 text-center">
        <SkeletonShimmerBase className="h-5 w-32 rounded mx-auto" />
        <SkeletonShimmerBase className="h-3 w-48 rounded mx-auto" />
      </div>
      {/* Login form skeleton */}
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl p-8 w-[380px] space-y-5">
        <SkeletonShimmerBase className="h-3 w-16 rounded" />
        <SkeletonShimmerBase className="h-11 w-full rounded-xl" />
        <SkeletonShimmerBase className="h-3 w-16 rounded" />
        <SkeletonShimmerBase className="h-11 w-full rounded-xl" />
        <SkeletonShimmerBase className="h-11 w-full rounded-xl" />
      </div>
      <SkeletonShimmerBase className="h-3 w-36 rounded" />
    </div>
    {/* Shimmer sweep overlay */}
    <motion.div
      className="fixed inset-0 pointer-events-none"
      initial={false}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  </div>
);

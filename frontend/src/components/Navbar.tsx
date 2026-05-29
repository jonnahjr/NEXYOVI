import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myLogo from '../assets/logo 1.png';
import { useSite } from '../context/SiteContext';

const navLinks = [
  { name: 'Company', href: '/company' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

// Magnetic Link Component for 3D effect
function MagneticLink({ children, href, isActive, onClick }: { children: React.ReactNode, href: string, isActive: boolean, onClick: (e: React.MouseEvent) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{ perspective: 400 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative z-10"
    >
      <motion.div
        style={{
          x: useTransform(x, [-50, 50], [-5, 5]),
          y: useTransform(y, [-50, 50], [-5, 5]),
          rotateX: useTransform(y, [-50, 50], [10, -10]),
          rotateY: useTransform(x, [-50, 50], [-10, 10]),
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Link
          to={href}
          onClick={onClick}
          className={`relative block px-5 py-2.5 text-[12px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
        >
          {isActive && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] -z-10"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 mix-blend-difference">{children}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

const Navbar = () => {
  const { settings } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (location.pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto pointer-events-auto"
      >
        {/* Glassmorphism Container */}
        <motion.div
          className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled
              ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
              : 'bg-transparent border border-transparent'
            }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Logo */}
          <div className="flex-shrink-0 z-20">
            <Link
              to="/"
              onClick={handleNavClick('/')}
              className="flex items-center group relative"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotateZ: -1.5, filter: 'drop-shadow(0 0 18px rgba(245,168,0,0.8))' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 2px rgba(245,168,0,0.2))',
                    'drop-shadow(0 0 14px rgba(245,168,0,0.65))',
                    'drop-shadow(0 0 2px rgba(245,168,0,0.2))',
                  ]
                }}
                transition={{
                  filter: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 },
                  scale: { type: 'spring', stiffness: 400, damping: 17 },
                  rotateZ: { type: 'spring', stiffness: 400, damping: 17 },
                }}
              >
                {settings?.logo_url ? (
                  <img src={settings.logo_url} alt="Nexyovi Logo" className="h-[50px] w-auto object-contain" />
                ) : (
                  <div className="h-[50px] w-[165px] bg-[#F5A800] opacity-90 group-hover:opacity-100 transition-opacity"
                    style={{ WebkitMask: `url('${myLogo}') left center / contain no-repeat`, mask: `url('${myLogo}') left center / contain no-repeat` }}
                    title="Nexyovi" />
                )}
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.name}
                href={link.href}
                isActive={location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href))}
                onClick={handleNavClick(link.href)}
              >
                {link.name}
              </MagneticLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex z-20">
            <Link
              to="/contact"
              onClick={handleNavClick('/contact')}
              className="group relative px-6 py-2.5 rounded-full bg-white transition-all hover:bg-gray-200"
            >
              <span className="relative z-10 text-[12px] font-bold text-black">
                Initiate Project
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 relative z-50 text-white flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: -4 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 4 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
          </button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-24 left-4 right-4 bg-[#0A0F1C]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={handleNavClick(link.href)}
                      className={`block text-lg font-black uppercase tracking-widest py-2 ${location.pathname === link.href ? 'text-[#F5A800]' : 'text-white hover:text-[#FFD166]'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="pt-6 mt-2 border-t border-white/10"
                >
                  <Link
                    to="/contact"
                    onClick={handleNavClick('/contact')}
                    className="flex justify-center items-center w-full py-4 rounded-xl bg-[#F5A800] text-white text-[13px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    Initiate Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;

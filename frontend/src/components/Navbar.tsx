import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myLogo from '../assets/logo 1.png';
import { useSite } from '../context/SiteContext';

const defaultNavLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Portfolio', href: '/projects' },
  { name: 'Company', href: '/company' },
  { name: 'Contact', href: '/contact' }];

function NavLink({ children, href, isActive, isHovered, onMouseEnter, onClick }: { children: React.ReactNode, href: string, isActive: boolean, isHovered?: boolean, onMouseEnter?: () => void, onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="relative z-10"
    >
      <Link
        to={href}
        onClick={onClick}
        className={`relative flex items-center justify-center px-2 py-1.5 text-[11px] md:text-[12px] font-medium tracking-wide transition-colors duration-300 ${isHovered ? 'text-black' : isActive ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
      >
        {/* Sliding Background Pill */}
        {isHovered && (
          <motion.div
            layoutId="nav-hover-pill"
            className="absolute inset-0 bg-white rounded-full -z-10"
            initial={false}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}

        {/* Active Indicator (Hidden when hovered) */}
        {isActive && !isHovered && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute inset-0 bg-white/10 rounded-full -z-20"
            initial={false}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}

        {/* Text */}
        <span className="relative leading-none">{children}</span>
      </Link>
    </div>
  );
}

const Navbar = () => {
  const { settings, siteContent } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const navLinks = siteContent?.navigation?.headerLinks?.length
    ? siteContent.navigation.headerLinks.map((link: any) => ({ name: link.label, href: link.href }))
    : defaultNavLinks;

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 pt-1 md:pt-2 overflow-visible">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[620px] mx-auto relative overflow-visible"
      >
        <div className="relative z-10 overflow-visible">
          {/* Navbar content */}
          <div className={`relative flex items-center justify-center gap-0.5 min-h-[24px] md:min-h-[28px] px-1 md:px-1.5 py-0 md:py-0 rounded-full transition-all duration-500 ${scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
            : 'bg-[#0a0a0a]/75 backdrop-blur-2xl border border-white/[0.08]'
            }`}>
            <Link
              to="/"
              onClick={handleNavClick('/')}
              className="block relative flex-shrink-0"
            >
              <div
                role="img"
                aria-label="Nexyovi"
                className="relative h-[60px] md:h-[68px] w-[160px] md:w-[182px]"
                style={{
                  mask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                  WebkitMask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                  background: 'linear-gradient(135deg, #F5A800, #FFD166, #F5A800)',
                }}
              />
            </Link>

            {/* Desktop Nav Links — centered */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link: any, index: number) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    href={link.href}
                    isActive={location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href))}
                    isHovered={hoveredLink === link.name}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onClick={handleNavClick(link.href)}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-3 relative z-50 text-white flex flex-col justify-center items-center w-8 h-8 flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: -3 }} className="w-5 h-0.5 bg-white block absolute" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-white block absolute" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 3 }} className="w-5 h-0.5 bg-white block absolute" />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-10 left-2 right-2 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 lg:hidden"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link: any, i: number) => (
                    <motion.div key={link.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.08 }}>
                      <Link
                        to={link.href}
                        onClick={handleNavClick(link.href)}
                        className={`block text-[14px] font-semibold py-2 ${location.pathname === link.href ? 'text-[#F5A800]' : 'text-white hover:text-[#FFD166]'}`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;

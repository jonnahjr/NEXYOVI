import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myLogo from '../assets/logo 1.png';
import { useSite } from '../context/SiteContext';

const navLinks = [
 { name: 'Company', href: '/company' },
 { name: 'Services', href: '/services' },
 { name: 'Industries', href: '/industries' },
 { name: 'Careers', href: '/careers' },
 { name: 'Projects', href: '/projects' },
 { name: 'Contact', href: '/contact' }];

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
 className={`relative block px-5 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-white/50 hover:text-white'
 }`}
 >
 {isActive && (
 <motion.div
 layoutId="nav-indicator"
 className="absolute inset-0 bg-white/[0.07] border border-white/10 rounded-full -z-10"
 initial={false}
 transition={{ type: "spring", stiffness: 300, damping: 30 }}
 />
 )}
 <span className="relative z-10">{children}</span>
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
 className="max-w-[1000px] mx-auto pointer-events-auto"
 >
 {/* Glassmorphism Container */}
 <motion.div
 className={`relative flex items-center justify-between px-4 md:px-5 py-2.5 rounded-full transition-all duration-500 ${scrolled
 ? 'bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/[0.08]'
 : 'bg-white/[0.02] backdrop-blur-2xl border border-white/[0.04]'
 }`}
 style={{ transformStyle: 'preserve-3d' }}
 >
 {/* Logo */}
 <div className="flex-shrink-0 z-20">
 <Link
 to="/"
 onClick={handleNavClick('/')}
 className="flex items-center group relative"
 >              <div
               role="img"
               aria-label="Nexyovi"
               className="h-[66px] md:h-[72px] w-[200px]"
               style={{
                mask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                WebkitMask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                background: 'linear-gradient(to right, #F5A800, #FFD166)',
               }}
              />
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
      className="group btn-gold text-[13px] px-5 py-2.5"
    >
      <span className="relative z-10">Start a project</span>
      <svg className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
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
 className="absolute top-24 left-4 right-4 bg-[#0A0F1C]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:hidden "
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
 className={`block text-[15px] font-medium tracking-wide py-2 ${location.pathname === link.href ? 'text-[#F5A800] font-semibold' : 'text-white hover:text-[#FFD166]'
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
    className="btn-accent text-[14px] py-3.5 w-full justify-center rounded-xl"
  >
    <span className="relative z-10">Initiate Project</span>
    <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
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

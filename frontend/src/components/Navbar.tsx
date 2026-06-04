import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myLogo from '../assets/logo 1.png';
import { useSite } from '../context/SiteContext';

const navLinks = [
 { name: 'Company', href: '/company' },
 { name: 'Services', href: '/services' },
 { name: 'Industries', href: '/industries' },
 { name: 'Projects', href: '/projects' },
 { name: 'Contact', href: '/contact' }];

function MagneticLink({ children, href, isActive, onClick }: { children: React.ReactNode, href: string, isActive: boolean, onClick: (e: React.MouseEvent) => void }) {
 const x = useMotionValue(0);
 const y = useMotionValue(0);

 const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
   const rect = e.currentTarget.getBoundingClientRect();
   x.set(e.clientX - (rect.left + rect.width / 2));
   y.set(e.clientY - (rect.top + rect.height / 2));
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
         x: useTransform(x, [-50, 50], [-4, 4]),
         y: useTransform(y, [-50, 50], [-4, 4]),
       }}
       transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
     >
       <Link
         to={href}
         onClick={onClick}
         className={`relative block px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-colors duration-300 ${isActive ? 'text-[#F5A800]' : 'text-white/80 hover:text-white'}`}
       >
         {isActive && (
           <motion.div
             layoutId="nav-indicator"
             className="absolute inset-0 bg-[#F5A800]/10 border border-[#F5A800]/20 rounded-full -z-10"
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
   <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
     <motion.div
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
       className="max-w-[1000px] mx-auto relative"
     >
       {/* Logo — big, popping out of the bar */}
       <div className="absolute left-4 md:left-5 -top-2 z-30">
         <Link
           to="/"
           onClick={handleNavClick('/')}
           className="block relative"
         >
           <div className="relative">
             {/* Glow behind logo */}
             <div className="absolute inset-0 bg-[#F5A800]/20 blur-xl rounded-full scale-75 pointer-events-none" />
             <div
               role="img"
               aria-label="Nexyovi"
               className="relative h-[56px] md:h-[62px] w-[160px] md:w-[180px] drop-shadow-[0_4px_12px_rgba(245,168,0,0.3)]"
               style={{
                 mask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                 WebkitMask: `url(${settings?.logo_url || myLogo}) center/contain no-repeat`,
                 background: 'linear-gradient(135deg, #F5A800, #FFD166, #F5A800)',
               }}
             />
           </div>
         </Link>
       </div>

       {/* Navbar bar — compact/small */}
       <motion.div
         className={`relative flex items-center justify-end px-4 md:px-5 py-2 rounded-full transition-all duration-500 ${scrolled
           ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
           : 'bg-[#0a0a0a]/75 backdrop-blur-2xl border border-white/[0.08]'
         }`}
       >
         {/* Desktop Nav Links — centered */}
         <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 ml-10">
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
             className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F5A800] text-black text-[12px] font-bold hover:bg-[#FFD166] transition-all duration-300"
           >
             <span>Start a project</span>
             <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
           </Link>
         </div>

         {/* Mobile Toggle */}
         <button
           className="lg:hidden p-2 relative z-50 text-white flex flex-col justify-center items-center w-9 h-9"
           onClick={() => setMobileOpen(!mobileOpen)}
         >
           <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: -3 }} className="w-5 h-0.5 bg-white block absolute" />
           <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-white block absolute" />
           <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 3 }} className="w-5 h-0.5 bg-white block absolute" />
         </button>
       </motion.div>

       {/* Mobile Menu */}
       <AnimatePresence>
         {mobileOpen && (
           <motion.div
             initial={{ opacity: 0, y: -16, scale: 0.96 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -16, scale: 0.96 }}
             transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
             className="absolute top-20 left-2 right-2 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 lg:hidden"
           >
             <div className="flex flex-col gap-3">
               {navLinks.map((link, i) => (
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
               <div className="pt-4 mt-1 border-t border-white/10">
                 <Link to="/contact" onClick={handleNavClick('/contact')} className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#F5A800] text-black text-[13px] font-bold hover:bg-[#FFD166] transition-all">
                   Start a Project
                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                 </Link>
               </div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
   </header>
 );
};

export default Navbar;

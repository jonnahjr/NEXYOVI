import { motion } from 'framer-motion';
import { trustLogosDefaults, useSite } from '../context/SiteContext';

const TrustLogos = () => {
 const { siteContent, partners } = useSite();
 // Use dynamic partners from SiteContext (includes admin edits via localStorage),
 // fall back to static trustLogosDefaults if empty
 const trustLogos = partners && partners.length > 0
   ? partners.filter(p => p.name && p.logo_url)
   : (siteContent?.trustLogos?.items?.length ? siteContent.trustLogos.items : trustLogosDefaults);
 const heading = siteContent?.trustLogos?.title || 'Experience Across Enterprise, Government & Technology Sectors';

 return (
    <section className="relative py-16 md:py-20 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
    <div className="container mx-auto px-6 max-w-6xl relative z-10">
    <motion.div
     initial={{ opacity: 0, y: 15 }}
     whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
     >
       <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-2">{heading}</p>
     </motion.div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#FCFBF8] to-transparent z-10 pointer-events-none" />
     <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#FCFBF8] to-transparent z-10 pointer-events-none" />

     <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-hidden"
     >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 50, repeat: Infinity }}
        className="flex items-center gap-12 md:gap-16 min-w-max"
       >
         {[...trustLogos, ...trustLogos].map((partner, i) => (
          <div key={i} className="flex items-center justify-center shrink-0 w-24 md:w-28 h-8 md:h-10">
           <img
            src={partner.logo_url}
            alt={partner.name}
           className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
         </div>
        ))}
      </motion.div>
     </motion.div>
    </div>
   </div>
  </section>
 );
};

export default TrustLogos;

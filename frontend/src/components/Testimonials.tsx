import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

// Import the new high-fidelity avatars
import avatar1 from '../assets/avatar_exec1.png';
import avatar2 from '../assets/avatar_exec2.png';
import avatar3 from '../assets/avatar_exec3.png';

import { useSite } from '../context/SiteContext';

const Testimonials = () => {
  const { testimonials: dynamicTestimonials } = useSite();

  // Import local avatars as fallbacks
  const staticAvatars: Record<string, string> = {
    avatar1: avatar1,
    avatar2: avatar2,
    avatar3: avatar3,
  };

  // Standardize dynamic testimonials and strictly limit to a maximum of 6
  const allTestimonials = dynamicTestimonials.slice(0, 6).map(t => ({
    name: t.author,
    role: t.role,
    org: t.role.split(',')[1]?.trim() || t.role,
    content: t.content,
    avatar: t.image_url || t.img || avatar1,
  }));

  return (
    <section className="py-24 bg-[#02040a] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.1),transparent)]" />

      <div className="relative z-10 w-full overflow-hidden">
        <div className="text-center mb-14 px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[12px] font-medium text-white/70 tracking-wide">Client Testimonials</span>
            </div>
          </motion.div>
        </div>

        {/* Infinite Horizontal Marquee - Full Width with Side Fades */}
        <div className="relative flex overflow-hidden group py-8">
          <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#000000] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#000000] to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicate the array once for seamless looping */}
            {[...allTestimonials, ...allTestimonials].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="w-[420px] shrink-0 p-8 mx-4 flex flex-col bg-[#111111] border border-white/5 rounded-[28px] transition-all duration-500 group/card relative hover:border-white/20 hover:bg-white/[0.04] cursor-default"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 group-hover/card:border-white/40 transition-all duration-500 shadow-2xl">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="whitespace-normal">
                    <h4 className="text-white font-bold text-lg tracking-tight transition-colors">{t.name}</h4>
                    <p className="text-[#7a7a7a] text-[11px] font-medium uppercase tracking-[0.2em]">{t.org}</p>
                  </div>
                </div>

                <div className="relative mb-8 flex-grow">
                  <Quote size={24} className="text-white/5 absolute -top-4 -left-4" />
                  <p className="text-[#9CA3AF] text-base leading-relaxed font-medium whitespace-normal italic group-hover/card:text-white transition-colors">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/[0.06]">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className="text-white/40 group-hover/card:text-white fill-current transition-colors duration-300" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                    <span className="text-[10px] font-medium text-[#7a7a7a] uppercase tracking-widest">Verified Partner</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

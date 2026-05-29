import { motion } from 'framer-motion';
import { Globe, MapPin, Phone } from 'lucide-react';
import { cardReveal, fadeUp, staggerContainer, viewport } from '../lib/animations';

const hubs = [
  {
    city: 'Addis Ababa',
    country: 'Ethiopia',
    role: 'Main Headquarters',
    addr: 'Bole District, Ethiopia',
    phone: '+251 911 000 000',
    timezone: 'EAT — UTC+3',
    accent: '#F5A800',
    number: '01',
    highlight: true,
  },
  {
    city: 'Miami',
    country: 'United States',
    role: 'Global Remote Hub',
    addr: 'Brickell Avenue, FL, USA',
    phone: '+1 (305) 000-0000',
    timezone: 'EST — UTC-5',
    accent: '#06b6d4',
    number: '02',
    highlight: false,
  },
];

const CompanyHubs = () => {
  return (
    <section id="hubs" className="bg-[#02040a] py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container relative z-10">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-xl mb-20"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <p className="text-[12px] font-medium text-white/70 tracking-wide mb-0">Where We Operate</p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-5">
            Global Command{' '}
            <span className="text-[#7a7a7a]">Hubs.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Bi-continental teams delivering engineering excellence 24 hours a day, across every time zone.
          </p>
        </motion.div>

        {/* Hub Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8"
        >
          {hubs.map((hub) => (
            <motion.div
              key={hub.city}
              variants={cardReveal}
              className="group relative rounded-[28px] overflow-hidden border border-white/5 bg-[#111111] transition-all duration-500 cursor-default hover:border-white/20"
            >
              {/* Top accent bar */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="p-8 relative">
                {/* Background number */}
                <div className="absolute bottom-4 right-6 text-[100px] font-black leading-none select-none pointer-events-none"
                  style={{ color: `${hub.accent}05` }}>
                  {hub.number}
                </div>

                {/* City + Badge */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-1">{hub.city}</h3>
                    <div className="text-[#7a7a7a] text-sm font-medium">{hub.country}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full text-[9px] font-medium uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-[#7a7a7a]">
                    {hub.role}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 relative z-10">
                  {[
                    { icon: MapPin, value: hub.addr },
                    { icon: Phone, value: hub.phone },
                    { icon: Globe, value: hub.timezone },
                  ].map(({ icon: Icon, value }) => (
                    <div key={value} className="flex items-center gap-3 text-sm text-[#7a7a7a]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 border border-white/10">
                        <Icon size={13} className="text-white/40" />
                      </div>
                      {value}
                    </div>
                  ))}
                </div>

                {/* Live dot */}
                <div className="flex items-center gap-2 mt-6 relative z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a7a7a]">Online</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Follow-the-sun bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-4xl p-6 rounded-2xl bg-[#111111] border border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-white text-sm font-medium">Follow-the-Sun Model — Always On</p>
          </div>
          <p className="text-[#7a7a7a] text-xs text-center sm:text-right">
            When Addis Ababa closes, Miami opens. Zero downtime. Maximum velocity.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default CompanyHubs;

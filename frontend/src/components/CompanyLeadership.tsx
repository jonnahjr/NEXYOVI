import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { fadeUp, staggerContainer } from '../lib/animations';

const getInitials = (name: string) =>
  name ? name.split(' ').filter(Boolean).map((p) => p[0]).join('').slice(0, 2).toUpperCase() : '';

const CompanyLeadership = () => {
  const { team, siteContent } = useSite();
  const companyTeam = siteContent?.companyTeam || {};

  const founder = team.find((m: any) => m.role && m.role.toLowerCase().includes('founder')) || team[0];
  const otherTeam = team.filter((m: any) => m !== founder);
  
  const isLeaderRole = (role: string) => {
    if (!role) return false;
    const r = role.toLowerCase();
    return r.includes('chief') || r.includes('cto') || r.includes('cpo') || r.includes('vp') || r.includes('vice president');
  };
  
  const leaders = otherTeam.filter((m: any) => isLeaderRole(m.role));
  const coreTeam = otherTeam.filter((m: any) => !isLeaderRole(m.role));

  const badge = companyTeam.badge || 'Our Team';
  const title = companyTeam.title || 'Meet the Team.';
  const highlight = companyTeam.highlight || 'Team.';
  const description = companyTeam.description || 'Leadership team overseeing software engineering, AI innovation, and cloud infrastructure delivery across global markets.';
  const founderName = companyTeam.founder_name || founder?.name || 'Yonas Bogale';
  const founderRole = companyTeam.founder_role || founder?.role || 'Founder & CEO';
  const founderBio = companyTeam.founder_bio || founder?.bio || "Leading Nexyovi's mission to build practical software, AI solutions, and digital infrastructure for modern businesses.";
  const founderButton = companyTeam.founder_button || 'LinkedIn Profile';
  const founderLinkedin = founder?.linkedin || 'https://www.linkedin.com/in/yonas-bogale/';
  const titlePrefix = title.includes(highlight) ? title.replace(highlight, '').trim() : title;

  return (
    <section id="leadership" className="relative overflow-hidden bg-[#FBF7F2] py-16 sm:py-20 md:py-28 lg:py-36 section-divider-dark">

      <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-5 md:px-6">

        {/* ══ SECTION HEADER ══ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-5">
              <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{badge}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 dark:text-white">
            {title.includes(highlight) ? (
              <>{titlePrefix}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">{highlight}</span></>
            ) : title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-slate-700 dark:text-white/40">
            {description}
          </motion.p>
        </motion.div>

        {/* ══ FOUNDER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-xl text-center"
        >
          <div className="mx-auto mb-3 sm:mb-4 md:mb-5 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden rounded-full border-2 border-[#F5A800]/20">
            {founder?.img ? (
              <img src={founder.img} alt={founderName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F5A800]/10">
                <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#F5A800]">{founder?.initials || 'YB'}</span>
              </div>
            )}
          </div>
          <h2 className="mb-1 text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 dark:text-white">{founderName}</h2>
          <p className="mb-2 sm:mb-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A800]">{founderRole}</p>
          <p className="mx-auto mb-3 sm:mb-4 md:mb-5 max-w-md text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-white/50">{founderBio}</p>
          <a
            href={founderLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#0a66c2]/20 bg-[#0a66c2]/10 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-[12px] font-bold text-[#0a66c2] transition-all hover:bg-[#0a66c2]/20"
          >
            <Linkedin size={12} className="sm:size-[13px]" />
            {founderButton}
          </a>
        </motion.div>

        {/* ══ LEADERS ══ */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mx-auto mb-10 sm:mb-12 md:mb-16 grid max-w-4xl gap-4 sm:gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {leaders.map((member: any) => (
            <motion.div
              key={member.id || member.name}
              variants={fadeUp}
              className="text-center"
            >
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-transparent">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-xl font-black text-white"
                    style={{ backgroundColor: member.color || '#8b5cf6' }}
                  >
                    {member.initials || getInitials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="mb-0.5 text-lg font-black text-slate-950 dark:text-white">{member.name}</h3>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A800]/70">{member.role}</p>
              <p className="mx-auto mb-4 max-w-[200px] text-xs font-medium leading-relaxed text-slate-700 dark:text-white/45">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-[#0a66c2]/20 bg-[#0a66c2]/10 px-3 py-1.5 text-[10px] font-bold text-[#0a66c2] transition-all hover:bg-[#0a66c2]/20"
                >
                  <Linkedin size={11} />
                  LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ══ CORE TEAM ══ */}
        {coreTeam.length > 0 && (
          <>
            <div className="mx-auto mb-8 flex max-w-xs items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">Core Team</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
              {coreTeam.map((member: any) => (
                <motion.div
                  key={member.id || member.name}
                  variants={fadeUp}
                  className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center transition-all hover:bg-white/[0.04]"
                >
                  <div className="mx-auto mb-2 h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-[10px] font-black text-white"
                        style={{ backgroundColor: member.color || '#8b5cf6' }}
                      >
                        {member.initials || getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  <h4 className="mb-0.5 truncate text-[12px] font-black leading-tight text-white/80">{member.name}</h4>
                  <p className="mb-1.5 truncate text-[8px] font-black uppercase tracking-[0.1em] text-[#F5A800]/50">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 rounded bg-white/5 px-1.5 py-0.5 text-[8px] font-bold text-white/30 transition-all hover:bg-[#0a66c2]/15 hover:text-[#0a66c2]"
                    >
                      <Linkedin size={7} />
                      LinkedIn
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* ══ FOOTER NOTE ══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
            <p className="text-xs font-medium leading-relaxed text-white/35">
              Supported by a distributed team of software engineers, AI specialists, designers, DevOps engineers, and infrastructure experts across multiple regions.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CompanyLeadership;

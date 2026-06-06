import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { fadeUp, staggerContainer } from '../lib/animations';

const LEADERSHIP_IDS = ['1', '2', '3', '16'];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const CompanyLeadership = () => {
  const { team, siteContent } = useSite();
  const companyTeam = siteContent?.companyTeam || {};
  const founder = team.find((member: any) => member.id === '1');
  const leaders = LEADERSHIP_IDS.filter((id) => id !== '1')
    .map((id) => team.find((member: any) => member.id === id))
    .filter(Boolean);
  const coreTeam = team.filter((member: any) => !LEADERSHIP_IDS.includes(member.id));

  const badge = companyTeam.badge || 'Our Team';
  const title = companyTeam.title || 'Meet the Team.';
  const highlight = companyTeam.highlight || 'Team.';
  const titlePrefix = title.includes(highlight) ? title.replace(highlight, '').trim() : title;
  const description =
    companyTeam.description ||
    'Leadership team overseeing software engineering, AI innovation, and cloud infrastructure delivery across global markets.';
  const founderName = companyTeam.founder_name || founder?.name || 'Yonas Bogale';
  const founderRole = companyTeam.founder_role || founder?.role || 'Founder & CEO';
  const founderBio =
    companyTeam.founder_bio ||
    founder?.bio ||
    "Leading Nexyovi's mission to build practical software, AI solutions, and digital infrastructure for modern businesses.";
  const founderButton = companyTeam.founder_button || 'LinkedIn Profile';
  const founderLinkedin = founder?.linkedin || 'https://www.linkedin.com/in/yonas-bogale/';

  return (
    <section id="leadership" className="relative overflow-hidden bg-[#02040a] py-28 md:py-36 section-divider-dark">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#F5A800]/6 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#8b5cf6]/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{badge}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4 text-4xl md:text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white">
            {title.includes(highlight) ? (
              <>
                {titlePrefix}{' '}
                <span className="bg-gradient-to-r from-[#F5A800] to-[#FFD166] bg-clip-text text-transparent">{highlight}</span>
              </>
            ) : (
              title
            )}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-xl text-lg font-medium text-white/50">{description}</motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-[#F5A800]/20">
            {founder?.img ? (
              <img src={founder.img} alt={founderName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F5A800]/10">
                <span className="text-3xl font-black text-[#F5A800]">{founder?.initials || 'YB'}</span>
              </div>
            )}
          </div>
          <h2 className="mb-1 text-3xl md:text-4xl font-black tracking-tight text-white">{founderName}</h2>
          <p className="mb-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#F5A800]">{founderRole}</p>
          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-white/50">{founderBio}</p>
          <a
            href={founderLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-[#0a66c2]/20 bg-[#0a66c2]/10 px-4 py-2 text-[13px] font-bold text-[#0a66c2] transition-all hover:bg-[#0a66c2]/20"
          >
            <Linkedin size={14} />
            {founderButton}
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {leaders.map((member: any) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              className="group rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30"
            >
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-transparent transition-all duration-500 group-hover:border-[#F5A800]/30">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-2xl font-black text-white"
                    style={{ backgroundColor: member.color || '#8b5cf6' }}
                  >
                    {member.initials || getInitials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="mb-0.5 text-xl font-black text-white transition-colors group-hover:text-[#F5A800]">{member.name}</h3>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.15em] text-[#F5A800]">{member.role}</p>
              <p className="mx-auto mb-4 max-w-xs text-sm font-medium leading-relaxed text-white/50">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#0a66c2]/20 bg-[#0a66c2]/10 px-3 py-1.5 text-[11px] font-bold text-[#0a66c2] transition-all hover:bg-[#0a66c2]/20"
                >
                  <Linkedin size={12} />
                  LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-2 px-2 md:grid-cols-4 lg:grid-cols-8"
        >
          {coreTeam.map((member: any) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              className="group min-w-0 rounded-[20px] bg-white/[0.02] px-5 py-3 text-center transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]"
            >
              <div className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-full transition-all duration-500">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: member.color || '#8b5cf6' }}
                  >
                    {member.initials || getInitials(member.name)}
                  </div>
                )}
              </div>
              <h4 className="mb-1 text-sm font-black text-white transition-colors group-hover:text-[#F5A800]">{member.name}</h4>
              <p className="mb-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#F5A800]">{member.role}</p>
              <p className="mb-2 line-clamp-2 text-[10px] font-medium leading-relaxed text-white/40">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[9px] font-bold text-white/50 transition-all hover:bg-[#0a66c2]/20 hover:text-[#0a66c2]"
                >
                  <Linkedin size={10} />
                  LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <div className="relative rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-8 py-6">
            <div className="absolute top-0 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F5A800] to-transparent" />
            <p className="text-sm font-medium leading-relaxed text-white/50">
              Supported by a distributed team of software engineers, AI specialists, designers, DevOps engineers, and infrastructure experts across multiple regions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLeadership;

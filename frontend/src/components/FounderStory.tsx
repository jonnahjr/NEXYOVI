import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

export default function FounderStory() {
  const { team, siteContent } = useSite();
  const founder = team.find((member: any) => member.id === '1');
  const homeFounder = siteContent?.homeFounder || {};
  const badge = homeFounder.badge || 'Leadership';
  const founderName = homeFounder.name || founder?.name || 'Yonas Bogale';
  const founderRole = homeFounder.role || founder?.role || 'Founder & CEO';
  const founderBio =
    homeFounder.bio ||
    founder?.bio ||
    "Nexyovi was founded on a singular vision: to bring world-class engineering rigor to digital transformation. We believe that robust systems are built from the ground up, not patched together as an afterthought.";
  const storyButton = homeFounder.story_button || 'Read our full story ->';
  const linkedinButton = homeFounder.linkedin_button || 'Connect on LinkedIn';
  const founderLinkedin = founder?.linkedin || 'https://www.linkedin.com/in/yonas-bogale/';
  const founderInitials =
    founder?.initials ||
    founderName
      .split(' ')
      .filter(Boolean)
      .map((part: string) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  const founderColor = founder?.color || '#F5A800';

  return (
    <section className="relative bg-[#02040a] py-24 section-divider-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] rounded-full bg-[#F5A800]/4 blur-[140px]" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{badge}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 border border-white/[0.08] bg-[#0a0a0e]">
              {founder?.img ? (
                <img
                  src={founder.img}
                  alt={founderName}
                  className="w-full h-full object-cover object-top relative"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-6xl font-black"
                  style={{ background: `linear-gradient(135deg, ${founderColor}22, ${founderColor}55)`, color: founderColor }}
                >
                  {founderInitials}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em] mb-3">
              {founderName}
            </h2>
            <p className="text-[#F5A800] font-bold uppercase tracking-[0.2em] text-sm mb-8">
              {founderRole}
            </p>

            <div className="space-y-6 text-white/80 leading-relaxed font-medium mb-10 max-w-lg">
              <p>
                {founderBio}
              </p>
              <Link to="/company#story" className="inline-block mt-4 text-[#F5A800] font-bold text-sm hover:text-white transition-colors">
                {storyButton}
              </Link>
            </div>

            <a
              href={founderLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#0a66c2]/10 border border-[#0a66c2]/20 text-white font-bold hover:bg-[#0a66c2]/20 transition-all"
            >
              <Linkedin size={20} className="text-[#0a66c2]" />
              {linkedinButton}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import {
  Shield, Lock, Eye, FileSearch,
  ScrollText, Building2, Network,
  CheckCircle2
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

const defaultItems = [
  {
    id: 'sdlc',
    icon: Shield,
    title: 'Secure SDLC',
    description: 'Security integrated throughout the development lifecycle, from architecture review through deployment and monitoring.',
    color: 'text-cyan-400',
    bgGlow: 'from-cyan-500/10'
  },
  {
    id: 'rbac',
    icon: Lock,
    title: 'Role-Based Access Control',
    description: 'Granular permissions and enterprise access management with audit-ready user role hierarchies.',
    color: 'text-emerald-400',
    bgGlow: 'from-emerald-500/10'
  },
  {
    id: 'encryption-rest',
    icon: Eye,
    title: 'Encryption at Rest',
    description: 'Sensitive data protected in storage with AES-256 encryption and secure key management infrastructure.',
    color: 'text-violet-400',
    bgGlow: 'from-violet-500/10'
  },
  {
    id: 'encryption-transit',
    icon: Network,
    title: 'Encryption in Transit',
    description: 'End-to-end TLS encryption, mutual TLS for service-to-service communication, and secure API gateways.',
    color: 'text-[#F5A800]',
    bgGlow: 'from-[#F5A800]/10'
  },
  {
    id: 'reviews',
    icon: FileSearch,
    title: 'Security Reviews',
    description: 'Automated and manual code reviews, dependency scanning, penetration testing, and vulnerability assessment.',
    color: 'text-pink-400',
    bgGlow: 'from-pink-500/10'
  },
  {
    id: 'audit',
    icon: ScrollText,
    title: 'Audit Logging',
    description: 'Full traceability with immutable audit trails, user action tracking, and compliance reporting.',
    color: 'text-amber-400',
    bgGlow: 'from-amber-500/10'
  },
  {
    id: 'compliance',
    icon: Building2,
    title: 'Compliance-Ready Architecture',
    description: 'Designed to support banking, healthcare, government, and enterprise regulatory requirements from day one.',
    color: 'text-cyan-300',
    bgGlow: 'from-cyan-400/10'
  }
];

export default function SecuritySection() {
  const { siteContent } = useSite();
  const items = siteContent?.security?.items || defaultItems;
  const badge = siteContent?.security?.badge || 'Trust Architecture';
  const title = siteContent?.security?.title || 'Security Built Into Every Layer';
  const subtitle = siteContent?.security?.subtitle || 'Enterprise-grade security is not an add-on — it is embedded in our architecture, processes, and delivery from day one.';

  return (
    <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden section-divider-dark">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.04),transparent_40%,rgba(245,168,0,0.03)_70%,transparent)] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">{badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.02em] leading-[1.05] mb-5">
            {title.includes('Every Layer') ? (
              <>{title.split('Every Layer')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Every Layer</span></>
            ) : title}
          </h2>
          <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">{subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item: any, i: number) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-all duration-300 flex-1 min-w-[140px] max-w-[200px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} bg-white/[0.05] border border-white/[0.06] mb-4`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

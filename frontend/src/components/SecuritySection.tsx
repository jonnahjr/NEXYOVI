import { motion } from 'framer-motion';
import {
  Building2,
  Eye, FileSearch,
  Lock,
  Network,
  ScrollText,
  Shield
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

const defaultItems = [
  {
    id: 'sdlc',
    icon: Shield,
    title: 'Secure SDLC',
    description: 'Security integrated throughout the development lifecycle, from architecture review through deployment and monitoring.',
  },
  {
    id: 'rbac',
    icon: Lock,
    title: 'Role-Based Access Control',
    description: 'Granular permissions and enterprise access management with audit-ready user role hierarchies.',
  },
  {
    id: 'encryption-rest',
    icon: Eye,
    title: 'Encryption at Rest',
    description: 'Sensitive data protected in storage with AES-256 encryption and secure key management infrastructure.',
  },
  {
    id: 'encryption-transit',
    icon: Network,
    title: 'Encryption in Transit',
    description: 'End-to-end TLS encryption, mutual TLS for service-to-service communication, and secure API gateways.',
  },
  {
    id: 'reviews',
    icon: FileSearch,
    title: 'Security Reviews',
    description: 'Automated and manual code reviews, dependency scanning, penetration testing, and vulnerability assessment.',
  },
  {
    id: 'audit',
    icon: ScrollText,
    title: 'Audit Logging',
    description: 'Full traceability with immutable audit trails, user action tracking, and compliance reporting.',
  },
  {
    id: 'compliance',
    icon: Building2,
    title: 'Compliance-Ready Architecture',
    description: 'Designed to support banking, healthcare, government, and enterprise regulatory requirements from day one.',
  }
];

export default function SecuritySection() {
  const { siteContent } = useSite();
  const items = siteContent?.security?.items || defaultItems;
  const badge = siteContent?.security?.badge || 'Trust Architecture';
  const title = siteContent?.security?.title || 'Security Built Into Every Layer';
  const subtitle = siteContent?.security?.subtitle || 'Enterprise-grade security is not an add-on — it is embedded in our architecture, processes, and delivery from day one.';

  return (
    <section className="relative bg-black py-28 md:py-36 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">{badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.02em] leading-[1.05] mb-5">
            {title}
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">{subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((item: any, i: number) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="flex items-start gap-2 mb-2 sm:mb-3">
                  <Icon size={16} className="sm:size-[18px] text-white shrink-0 mt-0.5" />
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">{item.title}</h3>
                </div>
                <p className="text-white/60 text-xs sm:text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

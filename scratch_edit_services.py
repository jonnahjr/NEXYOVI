import re

file_path = r"c:\Users\jonas\Desktop\nexyovi\frontend\src\pages\Services.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update CTAButton import
if "import { CTAButton }" not in content:
    content = content.replace("import TextReveal from '../components/TextReveal';", "import TextReveal from '../components/TextReveal';\nimport { CTAButton } from '../components/CTAButton';")

# 2. Update Hero description
content = content.replace(
    "Enterprise software, AI, cloud, and security engineering delivered by teams focused on long-term business outcomes.",
    "We design, build, and operate enterprise software, AI systems, and cloud infrastructure for organizations that need secure, scalable technology."
)

# 3. Update "By The Numbers"
content = content.replace(
    "{ value: 6, suffix: '', label: 'Core Engineering Disciplines' }",
    "{ value: 6, suffix: '', label: 'Core Engineering Practices' }"
)
content = content.replace(
    "{ value: 2024, suffix: '', label: 'Founded' }",
    "{ value: 4, suffix: '', label: 'Technology Domains' }"
)
content = content.replace(
    "{ value: 0, suffix: '', label: 'Africa', subtitle: 'Primary Delivery Region', hideNumber: true }",
    "{ value: 0, suffix: '', label: 'Engineering-Led Delivery Teams', hideNumber: true }"
)

# 4. Remove Duplicate "Our Capabilities" Section
content = re.sub(r"\{\/\* ══════════════════════════════════════════════════════\n\s*ENGINEERING EXPERTISE — dark searchable grid.*?(?=\{\/\* ══════════════════════════════════════════════════════\n\s*WHY NEXYOVI)", "", content, flags=re.DOTALL)

# 5. Fix Marquee back to 4-card Category grid
tech_ecosystem_grid = """
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techEcosystem.map((cat, i) => (
              <TechCategory key={cat.category} category={cat.category} icon={cat.icon} items={cat.items} />
            ))}
          </div>
        </div>
      </section>
"""
# Replace the marquee container
content = re.sub(r"\{\/\* Marquee Container \*\/}.*?(?=\{\/\* ══════════════════════════════════════════════════════\n\s*BY THE NUMBERS)", tech_ecosystem_grid, content, flags=re.DOTALL)

# 6. Add "Service Details" section after SERVICES GRID
service_details_section = """
      {/* ══════════════════════════════════════════════════════
          SERVICE DETAILS
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Service Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              What Each Service <span className="text-[#F5A800]">Includes.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[24px] bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Software Engineering</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Custom Web Applications</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">SaaS Platform Development</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Legacy System Modernization</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Enterprise API Architecture</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Artificial Intelligence</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Custom LLM Integrations</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">AI Agents & Workflow Automation</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Predictive Machine Learning Models</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Computer Vision Systems</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Cloud & DevOps</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Infrastructure as Code (IaC)</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">CI/CD Pipeline Design</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Cloud Migration Strategy</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Kubernetes & Container Orchestration</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Cybersecurity</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Zero-Trust Architecture</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Penetration Testing</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Compliance Audits (ISO, SOC 2, HIPAA)</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]"/> <span className="text-sm font-medium text-slate-600">Threat Monitoring & Response</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
"""

content = re.sub(r"(?=\{\/\* ══════════════════════════════════════════════════════\n\s*HOW WE DELIVER)", service_details_section, content)

# 7. Add "Engagement Models" before CTA
engagement_models_section = """
      {/* ══════════════════════════════════════════════════════
          ENGAGEMENT MODELS
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">How We Partner</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Flexible <span className="text-[#F5A800]">Engagement.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5"><Target size={20} className="text-[#F5A800]" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Project Delivery</h3>
              <p className="text-sm font-medium text-slate-500">End-to-end delivery of a specific scope with defined milestones and outcomes.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5"><Users size={20} className="text-[#F5A800]" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Teams</h3>
              <p className="text-sm font-medium text-slate-500">A scalable engineering squad embedded within your organization.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5"><Lightbulb size={20} className="text-[#F5A800]" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Consulting</h3>
              <p className="text-sm font-medium text-slate-500">Strategic architecture guidance and audits from our senior technical leadership.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5"><Cloud size={20} className="text-[#F5A800]" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Managed Operations</h3>
              <p className="text-sm font-medium text-slate-500">24/7 proactive monitoring, infrastructure maintenance, and reliability engineering.</p>
            </div>
          </div>
        </div>
      </section>
"""

content = re.sub(r"(?=\{\/\* ══════════════════════════════════════════════════════\n\s*CTA SECTION)", engagement_models_section, content)

# 8. Update CTAs in Services to use CTAButton
content = content.replace(
    '<a\n                href="mailto:contact@nexyovi.com"\n                className="group btn-gold text-[15px] px-10 py-4"\n              >',
    '<CTAButton\n                className="group btn-gold text-[15px] px-10 py-4"\n              >'
)
content = content.replace(
    '</ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />\n              </a>',
    '<ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />\n              </CTAButton>'
)
content = content.replace(
    '<a\n                href="mailto:contact@nexyovi.com"\n                className="group btn-ghost text-[15px] px-10 py-4"\n              >',
    '<CTAButton\n                className="group btn-ghost text-[15px] px-10 py-4"\n              >'
)
content = content.replace(
    '<span className="relative z-10">Email Us Directly</span>\n              </a>',
    '<span className="relative z-10">Email Us Directly</span>\n              </CTAButton>'
)
# Update Hero CTA
content = content.replace(
    '<a\n              href="mailto:contact@nexyovi.com"\n              className="group btn-ghost text-[14px] px-8 py-4"\n            >',
    '<CTAButton\n              className="group btn-ghost text-[14px] px-8 py-4"\n            >'
)
content = content.replace(
    '<span className="relative z-10">Start a Project</span>\n            </a>',
    '<span className="relative z-10">Start a Project</span>\n            </CTAButton>'
)

# Need a custom solution? CTA
content = content.replace(
    '<a\n                href="mailto:contact@nexyovi.com"\n                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"\n              >',
    '<CTAButton\n                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"\n              >'
)
content = content.replace(
    'Need a custom solution?\n                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />\n              </a>',
    'Need a custom solution?\n                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />\n              </CTAButton>'
)
content = content.replace(
    '<a\n              href="mailto:contact@nexyovi.com"\n              className="group inline-flex items-center justify-center w-full gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"\n            >',
    '<CTAButton\n              className="group inline-flex items-center justify-center w-full gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"\n            >'
)
content = content.replace(
    'Need a custom solution?\n              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />\n            </a>',
    'Need a custom solution?\n              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />\n            </CTAButton>'
)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Services page updated")

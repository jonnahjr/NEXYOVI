import re

file_path = r"c:\Users\jonas\Desktop\nexyovi\frontend\src\pages\Industries.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update ISO 27001 -> Security-First Engineering
content = content.replace("{ label: 'ISO 27001', sub: 'Security Certified' }", "{ label: 'Security-First Engineering', sub: 'Zero-Trust Architecture' }")

# 2. Add 'Illustrative Project' to Case Studies
content = content.replace("className=\"text-[10px] font-black uppercase tracking-[0.2em] text-slate-400\">{cs.industry}</div>", "className=\"text-[10px] font-black uppercase tracking-[0.2em] text-slate-400\">Illustrative Project • {cs.industry}</div>")

# 3. Create Compliance & Security Section (NEW)
compliance_section = """
      {/* ══════════════════════════════════════════════════════
          SECTION NEW — COMPLIANCE & SECURITY
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 blur-[140px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-widest">Compliance & Security</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Built for Regulated <span className="text-[#10b981]">Environments.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
              We engineer systems that meet the strictest security and compliance standards by default, ensuring your data is protected and auditable.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {['GDPR', 'HIPAA', 'PCI-DSS', 'SOC 2 Type II', 'Zero-Trust Architecture'].map((cap, i) => (
              <motion.div key={cap} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4, ease: EASE_EXPO }} className="group relative p-5 rounded-[16px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#10b981]/30 transition-all duration-500">
                <div className="text-white/80 font-bold text-sm group-hover:text-[#10b981] transition-colors duration-300">{cap}</div>
                <div className="mt-2 flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#10b981]/30 transition-colors duration-300" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
"""

# 4. Create How We Work Section (Replaces Global Delivery)
how_we_work_section = """
      {/* ══════════════════════════════════════════════════════
          SECTION 8 — HOW WE WORK
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F5A800]/3 blur-[150px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-widest">How We Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Excellence.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              We integrate seamlessly with your operations to deliver robust solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div className="group p-8 rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-[#F5A800]/30 hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"><Users size={22} className="text-[#F5A800]" /></div>
              <h3 className="text-white font-black text-xl mb-1">Dedicated Tech Lead</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-2">A senior architect oversees your entire engagement from discovery to deployment.</p>
            </motion.div>
            <motion.div className="group p-8 rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-[#F5A800]/30 hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"><Network size={22} className="text-[#F5A800]" /></div>
              <h3 className="text-white font-black text-xl mb-1">Distributed Teams</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-2">Global engineering talent operating across timezones for 24/7 delivery velocity.</p>
            </motion.div>
            <motion.div className="group p-8 rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-[#F5A800]/30 hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"><Code size={22} className="text-[#F5A800]" /></div>
              <h3 className="text-white font-black text-xl mb-1">Agile Delivery</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-2">Iterative development with continuous integration and transparent progress tracking.</p>
            </motion.div>
          </div>
        </div>
      </section>
"""

# Extract the big sections manually using string splits based on headers
parts = content.split("{/* ══════════════════════════════════════════════════════")

# We want to reassemble it in this order:
# 1. Hero (part 1 contains imports and part 2 is Hero)
# 2. Industries Overview (part 3)
# 3. Industry Expertise (part 4)
# 4. Compliance & Security (New)
# 5. Featured Case Studies (part 8)
# 6. Solutions We Deliver (part 5)
# 7. Why Choose Us (part 10)
# 8. How We Work (New, replaces part 9)
# 9. CTA (part 11)

def find_part(name):
    for i, p in enumerate(parts):
        if name in p:
            return "{/* ══════════════════════════════════════════════════════" + p
    return ""

p_header = parts[0]
p_hero = find_part("SECTION 1 — HERO")
p_overview = find_part("SECTION 2 — INDUSTRIES OVERVIEW")
p_expertise = find_part("SECTION 3 — INDUSTRY EXPERTISE PANEL")
p_solutions = find_part("SECTION 4 — SOLUTIONS WE DELIVER")
p_cases = find_part("SECTION 7 — FEATURED CASE STUDIES")
p_why = find_part("SECTION 9 — WHY ORGANIZATIONS CHOOSE NEXYOVI")
p_cta = find_part("SECTION 10 — FINAL CTA")

# Replace CTA button in Why Choose Us to use CTAButton
# Wait, let's just make sure CTAButton is imported
if "import { CTAButton }" not in p_header:
    p_header = p_header.replace("import TextReveal from '../components/TextReveal';", "import TextReveal from '../components/TextReveal';\nimport { CTAButton } from '../components/CTAButton';")

p_why = p_why.replace('<a href="mailto:contact@nexyovi.com" className="group inline-flex items-center gap-2 text-[#F5A800] font-bold text-sm tracking-wide">\n                    Start Project', '<CTAButton className="group inline-flex items-center gap-2 text-[#F5A800] font-bold text-sm tracking-wide">\n                    Start Project')
p_why = p_why.replace('</a>\n                </motion.div>', '</CTAButton>\n                </motion.div>')

p_cta = p_cta.replace('<a href="mailto:contact@nexyovi.com" className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#F5A800] hover:shadow-[0_8px_30px_rgba(245,168,0,0.25)]">', '<CTAButton className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#F5A800] hover:shadow-[0_8px_30px_rgba(245,168,0,0.25)]">')
p_cta = p_cta.replace('</a>\n              <a href="mailto:contact@nexyovi.com" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#F5A800]/40 hover:text-[#F5A800] hover:shadow-[0_8px_30px_rgba(245,168,0,0.08)] hover:-translate-y-0.5">', '</CTAButton>\n              <CTAButton className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#F5A800]/40 hover:text-[#F5A800] hover:shadow-[0_8px_30px_rgba(245,168,0,0.08)] hover:-translate-y-0.5">')
p_cta = p_cta.replace('Request a Technical Brief\n              </a>', 'Request a Technical Brief\n              </CTAButton>')

new_content = p_header + p_hero + p_overview + p_expertise + compliance_section + p_cases + p_solutions + p_why + how_we_work_section + p_cta

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("SUCCESS")

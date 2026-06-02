import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, User } from 'lucide-react';

const Pricing = () => {
 const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

 const plans = [
 {
 name: 'Startup',
 price: '$500',
 description: 'Perfect for small businesses looking to secure their digital presence.',
 features: ['Basic Security Audit', 'Web Development', 'ICT Consultation', 'Standard Email Support'],
 cta: 'Start Now',
 highlighted: false,
 icon: <User className="text-white/40" size={24} />
 },
 {
 name: 'Business',
 price: '$1,900',
 description: 'Comprehensive IT solutions for growing mid-sized enterprises.',
 features: ['Advanced Pentesting', 'Custom App Dev', 'Network Installation', '24/7 Managed Services', 'AI Integration'],
 cta: 'Get Started',
 highlighted: true,
 icon: <Zap className="text-orange-500" size={24} />
 },
 {
 name: 'Enterprise',
 price: 'Custom',
 description: 'End-to-end digital transformation for large-scale organizations.',
 features: ['Full Infrastructure Audit', 'Unlimited Custom Apps', 'Dedicated Security Team', 'Custom AI Training', 'Global SLA'],
 cta: 'Contact Sales',
 highlighted: false,
 icon: <Building2 className="text-white/40" size={24} />
 }
 ];

 return (
 <section id="pricing" className="py-32 bg-[#0b0c0f] relative overflow-hidden">
 <div className="container relative z-10">
 <div className="text-center mb-16">
 <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Flexible Service Tiers</h2>
 <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">
 Tailored IT and Security solutions designed to scale with your business. <br className="hidden md:block" /> From Addis Ababa to the world.
 </p>
 </div>

 {/* Pricing Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
 {plans.map((plan, idx) => (
 <motion.div
 key={plan.name}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ delay: idx * 0.1 }}
 viewport={{ once: true }}
 className={`glass-card relative p-8 flex flex-col ${plan.highlighted ? 'border-orange-500/30 /5 scale-105 z-10' : 'border-white/5'}`}
 >
 {plan.highlighted && (
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
 Best Value
 </div>
 )}

 <div className="mb-8">
 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
 {plan.icon}
 </div>
 <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
 <p className="text-sm text-white/40 mb-6">{plan.description}</p>
 <div className="flex items-baseline gap-1">
 <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
 {plan.price !== 'Custom' && (
 <span className="text-white/40 text-sm">/ project start</span>
 )}
 </div>
 </div>

 <div className="flex-grow">
 <ul className="space-y-4 mb-10">
 {plan.features.map((feature) => (
 <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
 <Check size={16} className="text-orange-500 shrink-0 mt-0.5" />
 {feature}
 </li>
 ))}
 </ul>
 </div>

 <button className={`w-full py-4 text-[15px] font-bold rounded-xl transition-all ${plan.highlighted ? 'border-button-light' : 'border-button-grey'}`}>
 {plan.cta}
 </button>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Background Decor */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
 <div className="glow-cyan absolute top-1/2 left-0 opacity-10"></div>
 <div className="glow-orange absolute bottom-0 right-0 opacity-10"></div>
 </div>
 </section>
 );
};

export default Pricing;


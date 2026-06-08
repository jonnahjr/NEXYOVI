import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Quote } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';

const defaultTestimonials = [
    {
        id: '2',
        quote: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. They brought deep technical expertise and a true partnership mindset. Gebeya's collaboration with Nexyovi has been transformative for our pan-African expansion.",
        role: "CEO & Co-Founder",
        company: "Gebeya",
        author: "Amadou Daffe",
        avatar: c1,
        linkedin: "https://et.linkedin.com/in/amadoudaffe",
        highlight: "transformative",
        label: "Trusted by founders of"
    },
    {
        id: '4',
        quote: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it — integrating with four banks and processing live transactions on day one. Their focus on security and reliability has been a game-changer for our platform.",
        role: "CEO",
        company: "Arifpay",
        author: "Rediet Tsigeberhan",
        avatar: c2,
        linkedin: "https://www.linkedin.com/in/rediet-tsigeberhan-97615642",
        highlight: "game-changer",
        label: "Trusted by founders of",
        caseStudy: "/projects/global-bank-security"
    },
    {
        id: '3',
        quote: "They delivered our health infrastructure platform ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves users across regional hospitals and clinics.",
        role: "Chief Technology Officer",
        company: "Ministry of Health",
        author: "Dawit Mekonnen",
        avatar: c3,
        linkedin: "https://linkedin.com",
        highlight: "ahead of schedule",
        caseStudy: "/projects/tele-psychiatry"
    },
    {
        id: '5',
        quote: "We needed a complete digital transformation — from legacy systems to modern cloud infrastructure. Nexyovi handled the migration with zero downtime and trained our team on the new stack. Their engineering discipline is world-class.",
        role: "Head of Digital",
        company: "Commercial Bank of Ethiopia",
        author: "Tigist Hailemariam",
        highlight: "zero downtime",
        caseStudy: "/projects/global-bank-security"
    },
    {
        id: '6',
        quote: "The mobile app they built for us had over 50k downloads in the first month. But what impressed me most was how they thought about scalability from day one — we haven't had a single performance issue even as traffic grew.",
        role: "VP of Product",
        company: "Ethio Telecom",
        author: "Binyam Alemu",
        highlight: "scalability from day one",
    },
    {
        id: '7',
        quote: "Nexyovi's team embedded with ours for six months and rebuilt our entire data infrastructure. They didn't just deliver on time — they transferred knowledge to our engineers throughout the process. That partnership mentality is rare.",
        role: "Director of Engineering",
        company: "INSA",
        author: "Meron Tadesse",
        highlight: "partnership mentality",
        caseStudy: "/company"
    },
];

export default function TestimonialSection() {
    const testimonials = defaultTestimonials;

    return (
        <section className="relative bg-[#02040a] py-16 section-divider-dark overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#F5A800]/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[120px]" />
            </div>

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />

                    <motion.div className="overflow-hidden">
                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ ease: 'linear', duration: 90, repeat: Infinity }}
                            className="flex items-stretch gap-5 min-w-max px-4"
                        >
                            {[...testimonials, ...testimonials].map((testimonial: any, idx: number) => (
                                <div
                                    key={`${testimonial.id}-${idx}`}
                                    className="relative w-[350px] md:w-[400px] shrink-0 rounded-2xl bg-[#0a0a0e]/90 backdrop-blur-sm p-6 flex flex-col border border-white/[0.06]"
                                >
                                    <Quote className="absolute top-3 left-3 text-[#F5A800]/20 w-5 h-5" />

                                    <div className="relative z-10 flex-grow pt-4">
                                        <p className="text-[12px] md:text-[13px] font-medium text-white/80 leading-relaxed mb-5 line-clamp-5">
                                            {(testimonial.highlight || "").length > 0 
                                                ? testimonial.quote.split(testimonial.highlight).map((part: string, index: number, array: string[]) => (
                                                    <React.Fragment key={index}>
                                                        {part}
                                                        {index !== array.length - 1 && <span className="text-[#F5A800] font-semibold">{testimonial.highlight}</span>}
                                                    </React.Fragment>
                                                )) 
                                                : testimonial.quote
                                            }
                                        </p>
                                    </div>

                                    <div className="flex flex-col pt-4 gap-4 border-t border-white/[0.06]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                                    {testimonial.img || testimonial.avatar ? (
                                                        <img
                                                            src={testimonial.img || testimonial.avatar}
                                                            alt={testimonial.author}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/50">
                                                            {(testimonial.author || "User").split(' ').map((n: string) => n[0]).join('').slice(0,2)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-[12px]">{testimonial.author}</p>
                                                    <p className="text-white/70 text-[11px]">{testimonial.role}</p>
                                                    <p className="text-white/50 text-[10px]">{testimonial.company}</p>
                                                </div>
                                            </div>
                                            {testimonial.linkedin && (
                                                <a
                                                    href={testimonial.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#0a66c2] hover:bg-white/10 transition-all"
                                                >
                                                    <Linkedin size={12} />
                                                </a>
                                            )}
                                        </div>
                                        {testimonial.caseStudy && (
                                            <Link to={testimonial.caseStudy} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#F5A800] opacity-70 hover:opacity-100 transition-opacity">
                                                <span>Read Case Study</span>
                                                <ArrowRight size={10} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

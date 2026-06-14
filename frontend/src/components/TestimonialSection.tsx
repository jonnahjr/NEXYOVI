import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Quote } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { homepageTestimonialsDefaults, useSite } from '../context/SiteContext';

export default function TestimonialSection() {
    const { siteContent } = useSite();
    const testimonials = siteContent?.testimonialsSection?.items?.length
        ? siteContent.testimonialsSection.items
        : homepageTestimonialsDefaults;

    return (
        <section className="relative bg-[#02040a] py-12 sm:py-14 md:py-16 section-divider-dark overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] bg-[#F5A800]/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
            </div>

            <div className="container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 lg:w-48 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 lg:w-48 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />

                    <motion.div className="overflow-hidden">
                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ ease: 'linear', duration: 90, repeat: Infinity }}
                            className="flex items-stretch gap-3 sm:gap-4 md:gap-5 min-w-max px-2 sm:px-3 md:px-4"
                        >
                            {[...testimonials, ...testimonials].map((testimonial: any, idx: number) => (
                                <div
                                    key={`${testimonial.id}-${idx}`}
                                    className="relative w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] shrink-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#0a0a0e]/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 flex flex-col border border-white/[0.06]"
                                >
                                    <Quote className="absolute top-2 sm:top-3 left-2 sm:left-3 text-[#F5A800]/20 w-4 h-4 sm:w-5 sm:h-5" />

                                    <div className="relative z-10 flex-grow pt-3 sm:pt-4">
                                        <p className="text-[11px] sm:text-[12px] md:text-[13px] font-medium text-white/80 leading-relaxed mb-4 sm:mb-5 line-clamp-5">
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

                                    <div className="flex flex-col pt-3 sm:pt-4 gap-3 sm:gap-4 border-t border-white/[0.06]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0">
                                                    {testimonial.avatar_url || testimonial.img || testimonial.avatar ? (
                                                        <img
                                                            src={testimonial.avatar_url || testimonial.img || testimonial.avatar}
                                                            alt={testimonial.author}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50">
                                                            {(testimonial.author || "User").split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-white font-semibold text-[11px] sm:text-[12px] truncate">{testimonial.author}</p>
                                                    <p className="text-white/70 text-[10px] sm:text-[11px] truncate">{testimonial.role}</p>
                                                    <p className="text-white/50 text-[9px] sm:text-[10px] truncate">{testimonial.company}</p>
                                                </div>
                                            </div>
                                            {testimonial.linkedin && (
                                                <a
                                                    href={testimonial.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#0a66c2] hover:bg-white/10 transition-all shrink-0"
                                                >
                                                    <Linkedin size={12} />
                                                </a>
                                            )}
                                        </div>
                                        {testimonial.caseStudy && (
                                            <Link to={testimonial.caseStudy} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F5A800] opacity-70 hover:opacity-100 transition-opacity">
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

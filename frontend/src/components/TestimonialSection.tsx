import { motion } from 'framer-motion';
import { Linkedin, Quote } from 'lucide-react';
import React from 'react';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
import yonasImg from '../assets/yonas.jpg';
import { useSite } from '../context/SiteContext';

const defaultTestimonials = [
    {
        id: '1',
        quote: "At Nexyovi, we don't just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact.",
        role: "Founder & CEO",
        company: "Nexyovi",
        author: "Yonas Bogale",
        avatar: yonasImg,
        linkedin: "https://www.linkedin.com/in/yonas-bogale",
        highlight: "real impact"
    },
    {
        id: '2',
        quote: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. Our time-to-market dropped from 12 months to 4 months. Gebeya's partnership with Nexyovi has been transformative for our pan-African expansion.",
        role: "CEO & Co-Founder",
        company: "Gebeya",
        author: "Amadou Daffe",
        avatar: c1,
        linkedin: "https://et.linkedin.com/in/amadoudaffe",
        highlight: "12 months to 4 months",
        label: "Trusted by founders of"
    },
    {
        id: '4',
        quote: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it in 8 weeks — integrating with four banks and processing live transactions on day one. They cut our fraud rate by 40% in 3 months.",
        role: "CEO",
        company: "Arifpay",
        author: "Rediet Tsigeberhan",
        avatar: c2,
        linkedin: "https://www.linkedin.com/in/rediet-tsigeberhan-97615642",
        highlight: "fraud rate by 40%",
        label: "Trusted by founders of"
    },
    {
        id: '3',
        quote: "They delivered our health infrastructure platform 3 months ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves 2.1M+ users across regional hospitals.",
        role: "Chief Technology Officer",
        company: "Ministry of Health",
        author: "Dawit Mekonnen",
        avatar: c3,
        linkedin: "https://linkedin.com",
        highlight: "2.1M+ users"
    }
];

const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function TestimonialSection() {
    const { testimonials: siteTestimonials } = useSite();
    const testimonials = siteTestimonials.length > 0 ? siteTestimonials : defaultTestimonials;
    
    return (
        <section className="relative bg-[#02040a] py-16 section-divider-dark overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {testimonials.map((testimonial: any, idx: number) => (
                        <motion.div
                            key={testimonial.id || idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative rounded-2xl bg-[#0a0a0e]/90 backdrop-blur-sm p-6 flex flex-col"
                        >
                            <Quote className="absolute top-3 left-3 text-[#F5A800]/20 w-6 h-6" />

                            <div className="relative z-10 flex-grow pt-4">
                                <p className="text-[13px] font-medium text-white/80 leading-relaxed mb-5">
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

                            <div className="flex items-center justify-between pt-4">
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
                                                {(testimonial.author || "User").split(' ').map(n => n[0]).join('').slice(0,2)}
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

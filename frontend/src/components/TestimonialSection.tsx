import { motion } from 'framer-motion';
import { Linkedin, Quote } from 'lucide-react';
import React from 'react';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
import yonasImg from '../assets/yonas.jpg';

const testimonials = [
    {
        quote: "Nexyovi didn't just write code; they architected a platform that could actually handle our scale. Their engineering team operates like a true extension of our own—delivering enterprise-grade security and performance without the usual agency friction.",
        role: "Chief Technology Officer",
        company: "Commercial Bank of Ethiopia",
        avatar: c1,
        linkedin: "https://linkedin.com",
        highlight: "enterprise-grade security"
    },
    {
        quote: "The speed and precision with which they delivered our core infrastructure was unmatched. They navigated complex compliance requirements seamlessly and helped us launch months ahead of schedule.",
        role: "VP of Engineering",
        company: "Ministry of Health",
        avatar: c2,
        linkedin: "https://linkedin.com",
        highlight: "months ahead of schedule"
    },
    {
        quote: "Working with Nexyovi transformed our product roadmap. Their deep expertise in AI and predictive analytics allowed us to build features we thought were years away. A truly elite engineering partner.",
        role: "Head of Digital Innovation",
        company: "Ethio Telecom",
        avatar: c3,
        linkedin: "https://linkedin.com",
        highlight: "elite engineering partner"
    },
    {
        quote: "Finding a team that balances flawless technical execution with stunning user experience is rare. Nexyovi delivered a platform that our users love and our engineers respect.",
        role: "Director of Infrastructure",
        company: "INSA",
        avatar: yonasImg,
        linkedin: "https://linkedin.com",
        highlight: "flawless technical execution"
    }
];

const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function TestimonialSection() {
    return (
        <section className="relative bg-[#02040a] py-16 section-divider-dark overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
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
                                    {testimonial.quote.split(testimonial.highlight).map((part, index, array) => (
                                        <React.Fragment key={index}>
                                            {part}
                                            {index !== array.length - 1 && <span className="text-[#F5A800] font-semibold">{testimonial.highlight}</span>}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-[12px]">{testimonial.role}</p>
                                        <p className="text-white/50 text-[10px]">{testimonial.company}</p>
                                    </div>
                                </div>
                                <a
                                    href={testimonial.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#0a66c2] hover:bg-white/10 transition-all"
                                >
                                    <Linkedin size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

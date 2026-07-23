import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../lib/animations';

import cbe from '../assets/cbe_transparent.png';
import ethio from '../assets/ethio_transparent.webp';
import insa from '../assets/Insa-09_transparent.webp';
import zemen from '../assets/zemen-bank-logo_transparent.png';

const logos = [
    { src: ethio, alt: 'Ethio Telecom' },
    { src: cbe, alt: 'Commercial Bank of Ethiopia' },
    { src: zemen, alt: 'Zemen Bank' },
    { src: insa, alt: 'INSA Ethiopia' }];

const duplicated = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

const TrustSection = () => {
    return (
        <section className="relative bg-[#07111f] py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden">

            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-px bg-gradient-to-r from-transparent via-[#F5A800]/40 to-transparent" />

            <div className="container relative z-10 px-4 sm:px-6 md:px-8">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-8 sm:mb-10 md:mb-12"
                >
                    <p className="section-label text-xs sm:text-sm md:text-base">Trusted Partners</p>
                    <p className="text-white/35 text-xs sm:text-sm font-medium tracking-wide">
                        Powering Ethiopia's leading institutions and global enterprises
                    </p>
                </motion.div>

                {/* Marquee */}
                <div
                    className="relative flex overflow-hidden py-2 sm:py-3"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    }}
                >
                    <motion.div
                        animate={{ x: [0, '-50%'] }}
                        transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
                        className="flex items-center gap-8 sm:gap-10 md:gap-16 lg:gap-24 min-w-max px-4 sm:px-6 md:px-8"
                    >
                        {duplicated.map((logo, i) => (
                            <div
                                key={i}
                                className="group flex items-center justify-center px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#F5A800]/30 hover:bg-[#F5A800]/5 transition-all duration-500 cursor-default shrink-0"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-6 sm:h-7 md:h-8 lg:h-10 w-auto object-contain grayscale opacity-35 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="mt-6 sm:mt-8 md:mt-10 text-center"
                >
                    <Link
                        to="/company/partners"
                        className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-white/25 hover:text-[#FFD166] transition-colors duration-300 group"
                    >
                        View all partners & case studies
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </section>
    );
};

export default TrustSection;

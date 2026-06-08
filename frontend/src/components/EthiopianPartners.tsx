import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

const PartnerIcon = ({ partner }: { partner: any }) => {
    return (
        <img
            src={partner.logo_url}
            alt={partner.name}
            className="h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
    );
};

export default function EthiopianPartners() {
    const { partners } = useSite();
    const maskStyle = {
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    };

    return (
        <section className="relative py-12 md:py-16 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                
                {/* Trusted Clients & Partners Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500 mb-2">Trusted Clients & Partners</p>
                        <p className="text-sm text-slate-400">Enterprise organizations across Africa & beyond</p>
                    </motion.div>
                    
                    <div className="relative flex overflow-hidden" style={maskStyle}>
                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
                            className="flex items-center gap-10 md:gap-12 min-w-max py-2"
                        >
                            {[...partners, ...partners, ...partners].map((partner, i) => (
                                <div
                                    key={`partner-${i}`}
                                    className="group flex items-center justify-center shrink-0 cursor-default"
                                >
                                    <div className="flex items-center justify-center shrink-0">
                                        <PartnerIcon partner={partner} />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}

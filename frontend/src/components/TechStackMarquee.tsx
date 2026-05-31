import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../lib/animations';

const techStack = [
 { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
 { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
 { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
 { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
 { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
 { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
 { name: 'NodeJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
 { name: 'Golang', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
 { name: '.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
 { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
 { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
 { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
 { name: 'LangChain', logo: 'https://cdn.simpleicons.org/langchain/white' },
 { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
 { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
 { name: 'Heroku', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/heroku/heroku-original.svg' }];

const row1 = techStack.slice(0, 8);
const row2 = techStack.slice(8);

const mask = {
 WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
 maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
};

const TechItem = ({ tech }: { tech: typeof techStack[0] }) => (
 <div className="group flex flex-col items-center gap-2 shrink-0 cursor-default">
 <div className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-[#F5A800]/30 hover:bg-[#F5A800]/5 transition-all duration-400">
 <img
 src={tech.logo}
 alt={tech.name}
 className="w-8 h-8 object-contain opacity-45 group-hover:opacity-90 transition-opacity duration-300"
 loading="lazy"
 />
 </div>
 <span className="text-[9px] font-black uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors whitespace-nowrap">
 {tech.name}
 </span>
 </div>
);

interface TechStackMarqueeProps {
 light?: boolean;
}

const TechStackMarquee = ({ light = false }: TechStackMarqueeProps) => {
 // Keep light prop for legacy compatibility but always use dark theme
 return (
 <section className="bg-[#050816] py-20 border-t border-white/[0.05] overflow-hidden">

 <div className="container mb-10">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="text-center"
 >
 <p className="text-white/25 text-sm font-medium tracking-widest uppercase">
 Works with your entire tech stack
 </p>
 </motion.div>
 </div>

 {/* Row 1 — scrolls left */}
 <div className="w-full relative flex overflow-hidden py-2 mb-4" style={mask}>
 <motion.div
 animate={{ x: ['0%', '-50%'] }}
 transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
 className="flex items-center gap-10 lg:gap-14 min-w-max px-6"
 >
 {[...row1, ...row1, ...row1, ...row1].map((tech, i) => (
 <TechItem key={`r1-${i}`} tech={tech} />
 ))}
 </motion.div>
 </div>

 {/* Row 2 — scrolls right */}
 <div className="w-full relative flex overflow-hidden py-2" style={mask}>
 <motion.div
 animate={{ x: ['-50%', '0%'] }}
 transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
 className="flex items-center gap-10 lg:gap-14 min-w-max px-6"
 >
 {[...row2, ...row2, ...row2, ...row2].map((tech, i) => (
 <TechItem key={`r2-${i}`} tech={tech} />
 ))}
 </motion.div>
 </div>
 </section>
 );
};

export default TechStackMarquee;

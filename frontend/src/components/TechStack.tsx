import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'Node.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
  { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'AWS', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Docker', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_logo_2010.svg' },
  { name: 'Kubernetes', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg' },
  { name: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { name: 'TensorFlow', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
];

const TechStack = () => {
  return (
    <section id="tech" className="bg-[#090A0C] py-24 border-t border-white/[0.04]">
      <div className="container-wide">
        <h3 className="text-center text-[#797d86] text-[13px] font-bold uppercase tracking-[0.2em] mb-12">
          The Ultimate Tech Stack
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 transition-all hover:opacity-100 grayscale hover:grayscale-0"
            >
              <img src={tech.icon} alt={tech.name} className="h-8 w-auto object-contain" />
              <span className="text-white text-[14px] font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;


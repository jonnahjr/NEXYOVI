import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, CheckSquare, Zap, Target, Cpu } from 'lucide-react';

const features = [
  {
    title: 'Project Management',
    description: 'Track progress with beautiful Kanban boards and Gantt charts.',
    icon: <Target className="text-[#ff6b00]" />,
    className: 'md:col-span-2 md:row-span-2',
    image: '/dashboard.png'
  },
  {
    title: 'Real-time Chat',
    description: 'Collaborate with your team instantly with built-in channels.',
    icon: <MessageSquare className="text-cyan-400" />,
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Smart Calendar',
    description: 'Sync your tasks and meetings in one place.',
    icon: <Calendar className="text-purple-400" />,
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Fast & Lightweight',
    description: 'Built for speed with native-like performance.',
    icon: <Zap className="text-yellow-400" />,
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    title: 'AI Assisted',
    description: 'Automate repetitive tasks with integrated Metabrain.',
    icon: <Cpu className="text-blue-400" />,
    className: 'md:col-span-2 md:row-span-1',
  }
];

const BentoGrid = () => {
  return (
    <section id="product" className="py-32 bg-[#0b0c0f]">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Productivity</h2>
          <p className="max-w-xl mx-auto text-lg text-white/60">
            Huly brings all your tools together in a cohesive, high-performance environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`glass-card p-8 flex flex-col justify-between group ${feature.className}`}
            >
              <div>
                <div className="mb-4 p-3 bg-white/5 inline-block rounded-xl group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </div>
              
              {feature.image && (
                <div className="mt-6 rounded-lg overflow-hidden border border-white/5 flex-grow">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;


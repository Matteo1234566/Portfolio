'use client';

import React from 'react';
import Card from '@/app/sections/ui/Card';
import { Brain, Layers, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'ai',
    title: 'AI & ML Engineering',
    icon: <Brain size={48} className="text-bubblegum" />,
    description: "We build custom models, NLP pipelines, and computer vision systems that actually solve problems.",
    tags: ["Prediction Models", "Computer Vision", "Data Pipelines"]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Systems',
    icon: <Layers size={48} className="text-bubblegum" />,
    description: "Robust, scalable backends and reactive frontends. We ensure your infrastructure grows with you.",
    tags: ["React / Next.js", "Django / Python", "Scalable APIs"]
  },
  {
    id: 'product',
    title: 'Product Architecture',
    icon: <Smartphone size={48} className="text-bubblegum" />,
    description: "We don't just code; we design. Human-friendly UIs and solid user experience principles from day one.",
    tags: ["UX Design", "System Arch", "Soft Brutalism"]
  },
  {
    id: 'consulting',
    title: 'Startup Consulting',
    icon: <Zap size={48} className="text-bubblegum" />,
    description: "Need an MVP yesterday? We help define technical strategy and build fast to validate your market.",
    tags: ["MVP Development", "Tech Strategy", "Fast Iteration"]
  }
];

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="mb-24 text-center md:text-left">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block"
        >
          What we do
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold text-white leading-tight"
        >
          FROM RESEARCH <br />
          TO <span className="text-bubblegum italic">PRODUCTION</span>
        </motion.h2>
      </div>

      <div className="flex flex-col relative pb-20" style={{ perspective: '2000px' }}>
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 5, // Tilted back slightly for 3D effect
                rotateZ: isEven ? -2 : 2, // Diagonal placement
                scale: 1 
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 0, 
                rotateZ: 0,
                zIndex: 50, // Bring to front on hover
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className={`
                w-full md:w-[90%] 
                ${index !== 0 ? '-mt-16 md:-mt-24' : ''} 
                ${isEven ? 'mr-auto' : 'ml-auto'}
                relative transition-all
              `}
              style={{ 
                zIndex: index + 1,
                transformStyle: 'preserve-3d'
              }}
            >
              <Card dark className="!bg-ink !border-white/10 shadow-2xl backdrop-blur-md overflow-hidden group">
                 {/* Decorative gradient blob */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-bubblegum/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-bubblegum/20 transition-colors duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 p-2">
                  {/* Big Icon */}
                  <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Text Info */}
                  <div className="flex-grow">
                    <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-bubblegum transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags (Vertical on desktop for style) */}
                  <div className="flex flex-row md:flex-col gap-2 flex-wrap justify-end md:w-32 shrink-0 mt-4 md:mt-0">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-right text-white/50 border-r-2 border-transparent pr-2 group-hover:border-bubblegum group-hover:text-white transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

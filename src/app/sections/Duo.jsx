'use client';

import React from 'react';
import Card from '@/app/sections/ui/Card';
import { Cpu, Code, Music, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const profiles = [
  {
    name: "Simone Zannini",
    role: "The Architect",
    description: "Deep learning specialist and system architect. I translate innovative ideas into production code and chaotic data into clear insights.",
    stats: ["Deep Neural Networks", "Data Analysys", "Computer Vision"],
    // skills: ["Deep Learning", "Data Engineering", "System Arch"]
  },
  {
    name: "Matteo Cese",
    role: "The Builder",
    description: "Full-Stack engineer with a research-driven mindset. I design and ship end-to-end products from scalable web platforms to computer vision and deep learning pipelines bridging innovation with real-world impact.",
    stats: ["Deep Learning", "Computer Vision", "Scalable Architectures & DevOps"],
    // skills: [
    //   "React / Next.js",
    //   "Python / CV / Deep Learning",
    //   "Scalable Architectures & DevOps"
    // ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function Duo({ onNavigate }) {
  return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl font-bold mb-4 text-ink dark:text-white"
          >
            THE <span className="text-forest dark:text-bubblegum">DUO</span>
          </motion.h2>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-ink/70 dark:text-smoke/70 max-w-xl mx-auto"
          >
            One brain for AI, one brain for scale — forged together to move faster than any agency.
          </motion.p>
        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
        >
          <motion.div
              variants={item}
              onClick={() => onNavigate && onNavigate('simone')}
              className="cursor-pointer"
          >
            <Card className="relative overflow-hidden group text-ink dark:text-smoke h-full border-ink dark:border-white/20 hover:border-bubblegum dark:hover:border-bubblegum transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-ink dark:text-white">
                <Cpu size={120} />
              </div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-3xl font-bold text-ink dark:text-white group-hover:text-bubblegum transition-colors">
                    {profiles[0].name}
                  </h3>
                  <span className="inline-block bg-forest text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mt-1">
                  {profiles[0].role}
                </span>
                </div>
                <div className="w-16 h-16 bg-bubblegum rounded-full border-2 border-ink dark:border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Music size={24} className="text-ink" />
                </div>
              </div>
              <p className="text-lg mb-6 leading-relaxed">{profiles[0].description}</p>
              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {profiles[0].stats.map(stat => (
                      <span
                          key={stat}
                          className="px-3 py-1 bg-smoke dark:bg-white/10 rounded-full text-sm font-bold border border-gray-200 dark:border-white/10"
                      >
                    {stat}
                  </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-bubblegum font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                View Profile <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Card>
          </motion.div>

          <motion.div
              variants={item}
              onClick={() => onNavigate && onNavigate('matteo')}
              className="cursor-pointer"
          >
            <Card className="relative overflow-hidden group text-ink dark:text-smoke h-full border-ink dark:border-white/20 hover:border-bubblegum dark:hover:border-bubblegum transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-ink dark:text-white">
                <Code size={120} />
              </div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-3xl font-bold text-ink dark:text-white group-hover:text-bubblegum transition-colors">
                    {profiles[1].name}
                  </h3>
                  <span className="inline-block bg-forest text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mt-1">
                  {profiles[1].role}
                </span>
                </div>
                <div className="w-16 h-16 bg-yellow-400 rounded-full border-2 border-ink dark:border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search size={24} className="text-ink" />
                </div>
              </div>
              <p className="text-lg mb-6 leading-relaxed">{profiles[1].description}</p>
              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {profiles[1].stats.map(stat => (
                      <span
                          key={stat}
                          className="px-3 py-1 bg-smoke dark:bg-white/10 rounded-full text-sm font-bold border border-gray-200 dark:border-white/10"
                      >
                    {stat}
                  </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-bubblegum font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                View Profile <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
  );
}

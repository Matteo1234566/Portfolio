'use client';

import React from 'react';
import Card from '@/app/sections/ui/Card';
import Button from '@/app/sections/ui/Button';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'ailights',
    title: 'AiLights',
    category: 'Computer Vision',
    description:
        'Real-time sports analytics platform. Uses advanced computer vision to track player movements and ball trajectory from video streams automatically.',
    techStack: ['Python', 'OpenCV', 'React', 'WebSockets'],
    highlight: true,
  },
  {
    id: 'traid',
    title: 'Traid',
    category: 'FinTech AI',
    description:
        'AI-driven trading platform utilizing neural time-series models to predict market trends and visualize data in a real-time dashboard.',
    techStack: ['TensorFlow', 'Next.js', 'Data Viz', 'Node.js'],
  },
  {
    id: 'screeba',
    title: 'Screeba',
    category: 'NLP Pipeline',
    description:
        'Advanced speech-to-text pipeline designed for academic transcription, handling multi-speaker identification and specialized terminology.',
    techStack: ['Whisper', 'Django', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'sensing',
    title: 'Wi-Fi Sensing',
    category: 'R&D',
    description:
        'Environmental perception system using standard Wi-Fi signals to detect human presence and movement without cameras.',
    techStack: ['Signal Processing', 'IoT', 'Edge Computing'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
};

export default function Projects() {
  return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-bold mb-2 text-ink dark:text-white leading-tight">
              SELECTED <br />
              <span className="relative inline-block">
              <span className="relative z-10 px-2 text-slate-50">WORK</span>
              <motion.span
                  className="absolute inset-0 bg-bubblegum"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'circOut' }}
                  style={{ originX: 0, zIndex: 0 }}
              />
            </span>
            </h2>
          </motion.div>
          <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-ink/60 dark:text-smoke/60 max-w-xs mt-4 md:mt-0 text-right hidden md:block"
          >
            We snap our fingers,
            <br />
            your product comes alive.
          </motion.p>
        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
              <motion.div key={project.id} variants={item} className="group h-full">
                <Card
                    className={`h-full flex flex-col ${
                        project.highlight ? 'border-bubblegum border-4' : ''
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs font-bold text-forest bg-green-100 px-2 py-1 rounded uppercase">
                  {project.category}
                </span>
                    <ExternalLink
                        className="text-ink/30 dark:text-white/30 group-hover:text-ink dark:group-hover:text-white transition-colors"
                        size={20}
                    />
                  </div>

                  <h3 className="font-display text-4xl font-bold mb-4 text-ink dark:text-white group-hover:text-forest dark:group-hover:text-bubblegum transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-lg text-ink/80 dark:text-smoke/80 mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="pt-6 border-t-2 border-smoke dark:border-white/10 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-sm font-bold text-ink/50 dark:text-white/50"
                        >
                    #{tech}
                  </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
          ))}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
        >
          <Button variant="secondary">
            View GitHub Profiles
          </Button>
        </motion.div>
      </div>
  );
}

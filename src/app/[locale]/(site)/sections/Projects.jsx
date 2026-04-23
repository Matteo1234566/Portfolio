'use client';

import React, { useEffect, useRef } from 'react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const t = useTranslations('Projects');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  const projects = [
    {
      id: 'ailights',
      title: t('items.ailights.title'),
      category: t('items.ailights.category'),
      description: t('items.ailights.description'),
      techStack: [
        t('items.ailights.techStack.0'),
        t('items.ailights.techStack.1'),
        t('items.ailights.techStack.2'),
        t('items.ailights.techStack.3')
      ],
      link: "/ailights"
    },
    {
      id: 'traid',
      title: t('items.traid.title'),
      category: t('items.traid.category'),
      description: t('items.traid.description'),
      techStack: [
        t('items.traid.techStack.0'),
        t('items.traid.techStack.1'),
        t('items.traid.techStack.2'),
        t('items.traid.techStack.3')
      ],
      link: "/traid"
    },
    {
      id: 'screeba',
      title: t('items.screeba.title'),
      category: t('items.screeba.category'),
      description: t('items.screeba.description'),
      techStack: [
        t('items.screeba.techStack.0'),
        t('items.screeba.techStack.1'),
        t('items.screeba.techStack.2')
      ],
      link: "/screeba"
    },
    {
      id: 'ai2sql',
      title: t('items.ai2sql.title'),
      category: t('items.ai2sql.category'),
      description: t('items.ai2sql.description'),
      techStack: [
        t('items.ai2sql.techStack.0'),
        t('items.ai2sql.techStack.1'),
        t('items.ai2sql.techStack.2')
      ],
      link: "https://4aitech.it/two-sequel"
    },
    {
      id: 'mirror',
      title: t('items.mirror.title'),
      category: t('items.mirror.category'),
      description: t('items.mirror.description'),
      techStack: [
        t('items.mirror.techStack.0'),
        t('items.mirror.techStack.1'),
        t('items.mirror.techStack.2'),
        t('items.mirror.techStack.3')
      ],
      link: '/mirror'
    },
    {
      id: 'capture',
      title: t('items.capture.title'),
      category: t('items.capture.category'),
      description: t('items.capture.description'),
      techStack: [
        t('items.capture.techStack.0'),
        t('items.capture.techStack.1'),
        t('items.capture.techStack.2'),
        t('items.capture.techStack.3')
      ],
      link: '/capture'
    },
    {
      id: 'pyquark',
      title: t('items.pyquark.title'),
      category: t('items.pyquark.category'),
      description: t('items.pyquark.description'),
      techStack: [
        t('items.pyquark.techStack.0'),
        t('items.pyquark.techStack.1'),
        t('items.pyquark.techStack.2'),
        t('items.pyquark.techStack.3')
      ],
      link: '/pyquark'
    },
    {
      id: 'puse',
      title: t('items.puse.title'),
      category: t('items.puse.category'),
      description: t('items.puse.description'),
      techStack: [
        t('items.puse.techStack.0'),
        t('items.puse.techStack.1'),
        t('items.puse.techStack.2'),
        t('items.puse.techStack.3')
      ],
      link: '/puse'
    },
    {
      id: 'targage',
      title: t('items.targage.title'),
      category: t('items.targage.category'),
      description: t('items.targage.description'),
      techStack: [
        t('items.targage.techStack.0'),
        t('items.targage.techStack.1'),
        t('items.targage.techStack.2'),
        t('items.targage.techStack.3')
      ],
      link: '/targage'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
              ref={headingRef}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-bold mb-2 text-ink dark:text-white leading-tight">
              {t('heading')} <br />
              <span className="relative inline-block">
              <span className="relative z-10 px-2 text-slate-50">{t('heading_highlight')}</span>
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
              ref={subtitleRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-ink/60 dark:text-smoke/60 max-w-xs mt-4 md:mt-0 text-right hidden md:block italic"
          >
            {t.rich('subtitle', {
              br: () => <br />
            })}
          </motion.p>
        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const borderRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.5,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(titleRef.current, {
        color: '#6366f1',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(borderRef.current, {
        borderColor: '#6366f1',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(titleRef.current, {
        color: '',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(borderRef.current, {
        borderColor: '',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
      <motion.div variants={item} className="group h-full" style={{ perspective: '1000px' }}>
        <div 
          ref={(el) => {
            cardRef.current = el;
            borderRef.current = el;
          }}
          className={`
            relative h-full flex flex-col overflow-hidden
            transition-all duration-300
            bg-white dark:bg-ink/50
            border-2 border-smoke/20 dark:border-white/10
            rounded-2xl
            hover:shadow-2xl
            ${project.highlight ? 'border-bubblegum border-4' : ''}
          `}
        >
          <div 
            ref={glowRef}
            className="absolute -top-20 -right-20 w-40 h-40 bg-bubblegum/30 rounded-full blur-3xl opacity-0 pointer-events-none"
          />
          
          <div className="flex justify-between items-start mb-4 p-6 pb-0">
                <span className="font-mono text-xs font-bold text-forest bg-green-100 dark:bg-forest/20 dark:text-green-300 px-2 py-1 rounded uppercase">
                  {project.category}
                </span>
                {project.link !== "" && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/30 dark:text-white/30 group-hover:text-ink dark:group-hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                )}

          </div>

          <h3 
            ref={titleRef}
            className="font-display text-4xl font-bold mb-4 text-ink dark:text-white px-6 transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-lg text-ink/80 dark:text-smoke/80 mb-8 flex-grow px-6">
            {project.description}
          </p>

          <div className="pt-6 border-t-2 border-smoke dark:border-white/10 flex flex-wrap gap-2 px-6 pb-6">
                {project.techStack.map((tech, i) => (
                    <TechTag key={tech} tech={tech} delay={i * 0.1} />
                ))}
          </div>
        </div>
      </motion.div>
  );
}

function TechTag({ tech, delay }) {
  const tagRef = useRef(null);

  useEffect(() => {
    if (!tagRef.current) return;

    const handleMouseEnter = () => {
      gsap.to(tagRef.current, {
        scale: 1.1,
        color: '#6366f1',
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(tagRef.current, {
        scale: 1,
        color: '',
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    tagRef.current.addEventListener('mouseenter', handleMouseEnter);
    tagRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tagRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      tagRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
      <span
        ref={tagRef}
        className="text-sm font-bold text-ink/50 dark:text-white/50 cursor-default"
      >
        #{tech}
      </span>
  );
}

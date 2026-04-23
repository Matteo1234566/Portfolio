'use client';

import React, { useState } from 'react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  CircleCheck,
  FileAudio,
  FileText,
  GraduationCap,
  Library,
  Mic,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScreebaSchema from './ScreebaSchema';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

export default function ScreebaPageClient() {
  const t = useTranslations('Screeba');

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
      }, 3000);
    }, 2000);
  };

  const steps = [
    {
      id: 'upload',
      icon: <UploadCloud size={32} className="text-bubblegum" />,
      title: t('steps.upload.title'),
      desc: t('steps.upload.desc'),
    },
    {
      id: 'process',
      icon: <Sparkles size={32} className="text-forest dark:text-bubblegum" />,
      title: t('steps.process.title'),
      desc: t('steps.process.desc'),
    },
    {
      id: 'download',
      icon: <FileText size={32} className="text-ink dark:text-white" />,
      title: t('steps.download.title'),
      desc: t('steps.download.desc'),
    },
  ];

  const users = [
    {
      id: 'students',
      icon: <GraduationCap size={24} className="text-bubblegum" />,
      title: t('users.students.title'),
      desc: t('users.students.desc'),
    },
    {
      id: 'university',
      icon: <Library size={24} className="text-forest dark:text-bubblegum" />,
      title: t('users.university.title'),
      desc: t('users.university.desc'),
    },
    {
      id: 'professionals',
      icon: <Mic size={24} className="text-ink dark:text-white" />,
      title: t('users.professionals.title'),
      desc: t('users.professionals.desc'),
    },
  ];

  const formats = [t('formats.0'), t('formats.1'), t('formats.2'), t('formats.3')];
  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">
      <ScreebaSchema />

      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16 mb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              <span>{t('eyebrow')}</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5 text-ink dark:text-white">
              {t('hero_title')}
            </h1>

            <p className="text-xl text-ink/70 dark:text-smoke/75 mb-6 leading-relaxed max-w-3xl">
              {t('description')}
            </p>

            <p className="text-base md:text-lg text-ink/60 dark:text-smoke/65 mb-8 leading-relaxed max-w-3xl">
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {formats.map((format) => (
                <span
                  key={format}
                  className="rounded-full border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/75 dark:text-smoke/80"
                >
                  {format}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:magosimo99@gmail.com">
                <Button variant="primary" className="px-8 py-4 text-lg gap-2">
                  {t('cta_demo')}
                  <ArrowRight size={17} />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <Card className="bg-white dark:bg-white/5 border-2 border-ink/5 dark:border-white/10 shadow-2xl relative overflow-hidden">
              <div className="border-b border-ink/5 dark:border-white/5 p-4 flex justify-between items-center bg-smoke/30 dark:bg-black/20">
                <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-50">
                  {t('demo.mock_label')}
                </span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-400/50" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                    {t('demo.label_name')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('demo.placeholder_name')}
                    className="w-full bg-paper dark:bg-ink/50 border border-ink/10 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-bubblegum transition-colors"
                  />
                </div>

                <div
                  onClick={() => !file && setFile({ name: 'lesson_audio.mp3', size: '18MB' })}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative ${
                    file
                      ? 'border-forest/50 bg-forest/5'
                      : 'border-ink/10 dark:border-white/10 hover:border-bubblegum dark:hover:border-bubblegum hover:bg-bubblegum/5'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-forest dark:text-green-400"
                      >
                        <CheckCircle size={48} className="mx-auto mb-2" />
                        <p className="font-bold">{t('demo.success')}</p>
                      </motion.div>
                    ) : file ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between bg-white dark:bg-ink p-3 rounded-lg shadow-sm border border-ink/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-bubblegum/10 p-2 rounded text-bubblegum">
                            <FileAudio size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-sm truncate max-w-[170px]">{file.name}</p>
                            <p className="text-xs opacity-50">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="p-1 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <UploadCloud size={40} className="mx-auto mb-3 text-ink/30 dark:text-white/30" />
                        <p className="font-bold text-sm">{t('demo.drop_text')}</p>
                        <p className="text-xs opacity-50 mt-1">{t('demo.drop_sub')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isUploading && (
                    <div className="absolute inset-0 bg-paper/90 dark:bg-ink/90 flex flex-col items-center justify-center z-10">
                      <div className="w-48 h-1 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: '0%' }}
                          transition={{ duration: 1.5, ease: 'easeInOut' }}
                          className="h-full bg-bubblegum w-full"
                        />
                      </div>
                      <p className="text-xs font-mono animate-pulse">{t('demo.processing')}</p>
                    </div>
                  )}
                </div>

                <Button className="w-full py-4" disabled={!file || isUploading} onClick={handleSimulateUpload}>
                  {isUploading ? t('demo.btn_loading') : t('demo.btn_action')}
                </Button>

                <div className="flex items-start gap-2 text-xs text-ink/50 dark:text-white/40 bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-500/20">
                  <AlertTriangle size={14} className="mt-0.5 text-orange-500 shrink-0" />
                  <p>{t('demo.quality_warning')}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('how_it_works')}</h2>
          <p className="text-lg text-ink/65 dark:text-smoke/70 max-w-2xl mx-auto">{t('flow_subtitle')}</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: false, margin: '-50px' }} className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div key={step.id} variants={item}>
              <Card className="h-full text-center hover:border-bubblegum transition-colors group">
                <div className="mx-auto w-16 h-16 bg-smoke dark:bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-ink/70 dark:text-smoke/70 leading-relaxed">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-forest text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-3">{t('users_label')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('users_title')}</h2>
            <p className="text-white/75 text-lg leading-relaxed">{t('users_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {users.map((entry) => (
              <div key={entry.id} className="rounded-2xl bg-white/10 border border-white/20 p-6">
                <div className="mb-4">{entry.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-2">{entry.title}</h3>
                <p className="text-white/85 leading-relaxed">{entry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-3">{t('quality_label')}</p>
          <h2 className="font-display text-4xl font-bold text-ink dark:text-white mb-4">{t('quality_title')}</h2>
          <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-5">{t('quality_description')}</p>
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border border-ink/10 dark:border-white/10 bg-paper dark:bg-ink p-4">
                <CircleCheck size={18} className="mt-0.5 shrink-0 text-bubblegum" />
                <p className="text-ink/75 dark:text-smoke/80 leading-relaxed">{t(`quality.items.${index}`)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-3">{t('output_label')}</p>
          <h2 className="font-display text-4xl font-bold text-ink dark:text-white mb-4">{t('output_title')}</h2>
          <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-5">{t('output_description')}</p>
          <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper dark:bg-ink p-5">
            <p className="text-xs uppercase tracking-[0.18em] font-bold text-ink/50 dark:text-smoke/50 mb-3">{t('output.preview_label')}</p>
            <h3 className="font-display text-2xl text-ink dark:text-white mb-3">{t('output.preview_title')}</h3>
            <ul className="space-y-2 text-ink/75 dark:text-smoke/80">
              {[0, 1, 2].map((index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-bubblegum" />
                  <span>{t(`output.preview_items.${index}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border-2 border-ink/10 dark:border-white/10 bg-paper dark:bg-ink p-8 md:p-10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-3">{t('faq_label')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink dark:text-white mb-4">{t('faq_title')}</h2>
            <p className="text-lg text-ink/70 dark:text-smoke/75 leading-relaxed">{t('faq_subtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div key={entry.question} className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-3">{entry.question}</h3>
                <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{entry.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-bubblegum/25 bg-bubblegum/10 p-5 flex items-start gap-3">
          <ShieldCheck className="mt-1 text-bubblegum shrink-0" size={18} />
          <p className="text-ink/75 dark:text-smoke/80 leading-relaxed">{t('privacy_note')}</p>
        </div>
      </div>
    </div>
  );
}

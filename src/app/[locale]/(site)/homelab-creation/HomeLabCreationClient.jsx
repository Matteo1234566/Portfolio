'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CloudUpload,
  DatabaseBackup,
  HardDrive,
  Home,
  LockKeyhole,
  MonitorCog,
  Network,
  PlugZap,
  Router,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  Zap,
} from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import Card from '@/app/[locale]/(site)/sections/ui/Card';

const HARDWARE = [
  { id: 'miniPc', icon: Server, tiers: [{ id: 'basic', price: 420 }, { id: 'standard', price: 720 }, { id: 'pro', price: 1180 }] },
  { id: 'switch', icon: Network, tiers: [{ id: 'basic', price: 160 }, { id: 'standard', price: 320 }, { id: 'pro', price: 620 }] },
  { id: 'ups', icon: PlugZap, tiers: [{ id: 'basic', price: 180 }, { id: 'standard', price: 360 }, { id: 'pro', price: 680 }] },
  { id: 'nas', icon: DatabaseBackup, tiers: [{ id: 'basic', price: 520 }, { id: 'standard', price: 960 }, { id: 'pro', price: 1580 }] },
  { id: 'storage', icon: HardDrive, tiers: [{ id: 'basic', price: 390 }, { id: 'standard', price: 780 }, { id: 'pro', price: 1320 }] },
];

const ADD_ONS = [
  { id: 'wireguard', icon: ShieldCheck, price: 280, suggested: false },
  { id: 'media', icon: MonitorCog, price: 540, suggested: false },
  { id: 'robinhood', icon: Bot, price: 690, suggested: false },
  { id: 'adblock', icon: Shield, price: 240, suggested: true },
  { id: 'backup', icon: DatabaseBackup, price: 430, suggested: true },
  { id: 'automation', icon: Home, price: 390, suggested: true },
  { id: 'monitoring', icon: Activity, price: 310, suggested: true },
  { id: 'cloudSync', icon: CloudUpload, price: 360, suggested: true },
  { id: 'hardening', icon: LockKeyhole, price: 460, suggested: true },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 18 } },
};

export default function HomeLabCreationClient() {
  const t = useTranslations('HomeLabCreation');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [selectedHardware, setSelectedHardware] = useState({
    miniPc: 'standard',
    switch: 'standard',
    ups: 'standard',
    nas: 'standard',
    storage: 'standard',
  });
  const [selectedAddOns, setSelectedAddOns] = useState(['wireguard', 'backup', 'monitoring']);
  const [openCategories, setOpenCategories] = useState(HARDWARE.map((category) => category.id));

  const money = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const hardwareSelections = HARDWARE.map((category) => {
    const tier = category.tiers.find((candidate) => candidate.id === selectedHardware[category.id]);
    return { ...category, tier };
  });
  const selectedAddOnItems = ADD_ONS.filter((addon) => selectedAddOns.includes(addon.id));
  const hardwareSubtotal = hardwareSelections.reduce((sum, category) => sum + category.tier.price, 0);
  const addOnsSubtotal = selectedAddOnItems.reduce((sum, addon) => sum + addon.price, 0);
  const total = hardwareSubtotal + addOnsSubtotal;

  const toggleAddOn = (id) => {
    setSelectedAddOns((current) => (
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    ));
  };

  const toggleCategory = (id) => {
    setOpenCategories((current) => (
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    ));
  };

  const scrollToConfigurator = () => {
    document.getElementById('homelab-configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300 pt-32 pb-40 lg:pb-24 overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} className={reduceMotion ? '' : 'animate-pulse'} aria-hidden="true" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
              HomeLab
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-forest to-bubblegum dark:from-violet-300 dark:to-pink-300 text-4xl md:text-6xl mt-2">
                Creation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-ink/75 dark:text-smoke/80 leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              {[0, 1, 2].map((index) => (
                <span key={index} className="rounded-full border border-ink/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 dark:text-smoke/70">
                  {t(`hero.chips.${index}`)}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-9">
              <Button type="button" onClick={scrollToConfigurator} className="px-7 py-4 text-base gap-2">
                {t('hero.cta')}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <a href="#summary" className="inline-flex items-center justify-center px-7 py-4 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-200 bg-white dark:bg-white/10 text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 shadow-soft border-2 border-transparent hover:border-ink dark:hover:border-white focus:outline-none focus:ring-2 focus:ring-bubblegum">
                {t('hero.secondaryCta')}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ConfiguratorVisual t={t} reduceMotion={reduceMotion} total={money.format(total)} />
          </motion.div>
        </div>
      </section>

      <section id="homelab-configurator" className="max-w-6xl mx-auto px-4 mt-24 scroll-mt-28">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          <div className="space-y-8">
            <SectionHeading eyebrow={t('hardware.eyebrow')} title={t('hardware.title')} description={t('hardware.description')} />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-80px' }}
              className="space-y-5"
            >
              {HARDWARE.map((category) => (
                <HardwareCategory
                  key={category.id}
                  category={category}
                  selectedTier={selectedHardware[category.id]}
                  isOpen={openCategories.includes(category.id)}
                  onToggleOpen={() => toggleCategory(category.id)}
                  onSelect={(tierId) => setSelectedHardware((current) => ({ ...current, [category.id]: tierId }))}
                  money={money}
                  t={t}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>

            <div className="pt-8">
              <SectionHeading eyebrow={t('addons.eyebrow')} title={t('addons.title')} description={t('addons.description')} />
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {ADD_ONS.map((addon) => (
                  <AddOnCard
                    key={addon.id}
                    addon={addon}
                    checked={selectedAddOns.includes(addon.id)}
                    onToggle={() => toggleAddOn(addon.id)}
                    money={money}
                    t={t}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside id="summary" className="hidden lg:block sticky top-28">
            <QuoteSummary
              hardwareSelections={hardwareSelections}
              selectedAddOnItems={selectedAddOnItems}
              hardwareSubtotal={hardwareSubtotal}
              addOnsSubtotal={addOnsSubtotal}
              total={total}
              money={money}
              t={t}
            />
          </aside>
        </div>
      </section>

      <MobileQuoteBar total={total} hardwareSubtotal={hardwareSubtotal} addOnsSubtotal={addOnsSubtotal} money={money} t={t} />
    </main>
  );
}

function ConfiguratorVisual({ t, reduceMotion, total }) {
  return (
    <Card className="relative overflow-hidden border-forest/20 dark:border-white/10 bg-white/75 dark:bg-ink/60 backdrop-blur-xl">
      <div className="absolute -top-28 -right-24 w-64 h-64 rounded-full bg-bubblegum/20 blur-3xl" />
      <div className="absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-forest/20 dark:bg-white/10 blur-3xl" />
      <div className="relative grid gap-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-ink/50 dark:text-smoke/60">{t('visual.label')}</p>
          <span className="rounded-full bg-bubblegum text-white px-3 py-1 text-xs font-bold">{total}</span>
        </div>

        <div className="relative min-h-[360px] rounded-[1.75rem] border-2 border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-5 overflow-hidden">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-6 top-6 h-24 w-24 rounded-[1.5rem] border-2 border-ink dark:border-white bg-white dark:bg-ink shadow-hard dark:shadow-hard-white grid place-items-center"
          >
            <Server size={42} className="text-bubblegum" aria-hidden="true" />
          </motion.div>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-7 top-24 h-20 w-32 rounded-2xl border-2 border-ink dark:border-white bg-forest text-white shadow-hard dark:shadow-hard-white grid place-items-center"
          >
            <Router size={36} aria-hidden="true" />
          </motion.div>
          <motion.div
            animate={reduceMotion ? undefined : { rotate: [-2, 2, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 right-8 h-32 w-40 rounded-[1.75rem] border-2 border-ink dark:border-white bg-white dark:bg-ink shadow-hard dark:shadow-hard-white p-4"
          >
            <div className="flex gap-2 h-full">
              {[0, 1, 2].map((index) => (
                <span key={index} className="flex-1 rounded-xl bg-smoke/70 dark:bg-white/10 border border-ink/10 dark:border-white/10" />
              ))}
            </div>
          </motion.div>
          <div className="absolute bottom-20 left-9 h-16 w-24 rounded-2xl border-2 border-ink dark:border-white bg-yellow-300 shadow-hard grid place-items-center text-ink">
            <Zap size={30} aria-hidden="true" />
          </div>
          <div className="absolute inset-x-10 top-1/2 h-px bg-bubblegum/50" />
          <div className="absolute left-1/2 top-[35%] h-24 w-px bg-bubblegum/50" />
          <div className="absolute left-1/3 bottom-[32%] h-20 w-px bg-bubblegum/50" />
        </div>
      </div>
    </Card>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2">{eyebrow}</p>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-ink dark:text-white leading-tight">{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 dark:text-smoke/70">{description}</p>
    </div>
  );
}

function HardwareCategory({ category, selectedTier, isOpen, onToggleOpen, onSelect, money, t, reduceMotion }) {
  const Icon = category.icon;

  return (
    <motion.div variants={reduceMotion ? undefined : item}>
      <Card className="!p-0 overflow-hidden bg-white/80 dark:bg-ink/60 border-ink/10 dark:border-white/10">
        <button
          type="button"
          onClick={onToggleOpen}
          className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-bubblegum/50"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white dark:bg-white/10 dark:text-bubblegum">
              <Icon size={24} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-ink dark:text-white">{t(`hardware.categories.${category.id}.title`)}</span>
              <span className="block text-sm text-ink/55 dark:text-smoke/60">{t(`hardware.categories.${category.id}.description`)}</span>
            </span>
          </span>
          <ChevronDown className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-3 p-5 pt-0" role="radiogroup" aria-label={t(`hardware.categories.${category.id}.title`)}>
                {category.tiers.map((tier) => {
                  const active = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onSelect(tier.id)}
                      className={`cursor-pointer rounded-2xl border-2 p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-bubblegum/50 ${
                        active
                          ? 'border-bubblegum bg-bubblegum/10 shadow-soft'
                          : 'border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-white/5 hover:border-bubblegum/70'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-display text-2xl font-bold text-ink dark:text-white">{t(`hardware.categories.${category.id}.tiers.${tier.id}.name`)}</span>
                        {active && <Check size={20} className="text-bubblegum" aria-hidden="true" />}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-ink/60 dark:text-smoke/65">{t(`hardware.categories.${category.id}.tiers.${tier.id}.spec`)}</span>
                      <span className="mt-4 block font-display text-2xl font-bold text-bubblegum">{money.format(tier.price)}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function AddOnCard({ addon, checked, onToggle, money, t, reduceMotion }) {
  const Icon = addon.icon;

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      onClick={onToggle}
      aria-pressed={checked}
      className={`cursor-pointer group rounded-[1.5rem] border-2 p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-bubblegum/50 ${
        checked
          ? 'border-bubblegum bg-bubblegum/10 shadow-soft'
          : 'border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:border-bubblegum/70'
      }`}
    >
      <span className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white dark:bg-white/10 dark:text-bubblegum transition-transform duration-200 group-hover:-translate-y-1">
          <Icon size={23} aria-hidden="true" />
        </span>
        <span className="flex items-center gap-2">
          {addon.suggested && (
            <span className="rounded-full bg-forest/10 dark:bg-bubblegum/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-forest dark:text-bubblegum">
              {t('addons.suggested')}
            </span>
          )}
          <span className={`grid h-7 w-7 place-items-center rounded-full border-2 ${checked ? 'border-bubblegum bg-bubblegum text-white' : 'border-ink/20 dark:border-white/20'}`}>
            {checked ? <Check size={15} aria-hidden="true" /> : <ToggleLeft size={15} aria-hidden="true" />}
          </span>
        </span>
      </span>
      <span className="mt-5 block font-display text-2xl font-bold text-ink dark:text-white">{t(`addons.items.${addon.id}.title`)}</span>
      <span className="mt-2 block text-sm leading-relaxed text-ink/60 dark:text-smoke/65">{t(`addons.items.${addon.id}.description`)}</span>
      <span className="mt-5 block font-display text-2xl font-bold text-bubblegum">+ {money.format(addon.price)}</span>
    </motion.button>
  );
}

function QuoteSummary({ hardwareSelections, selectedAddOnItems, hardwareSubtotal, addOnsSubtotal, total, money, t }) {
  return (
    <Card className="relative overflow-hidden bg-white/90 dark:bg-ink/80 border-ink/10 dark:border-white/10 backdrop-blur-xl">
      <div className="absolute -top-20 -right-16 w-48 h-48 rounded-full bg-bubblegum/20 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubblegum mb-2">{t('summary.eyebrow')}</p>
        <h2 className="font-display text-4xl font-bold text-ink dark:text-white mb-2">{t('summary.title')}</h2>
        <p className="text-sm text-ink/55 dark:text-smoke/60 mb-6">{t('summary.note')}</p>

        <div className="space-y-4 max-h-[46vh] overflow-auto pr-1">
          <SummaryBlock title={t('summary.hardware')} value={money.format(hardwareSubtotal)}>
            {hardwareSelections.map((category) => (
              <SummaryLine
                key={category.id}
                label={`${t(`hardware.categories.${category.id}.title`)} · ${t(`hardware.categories.${category.id}.tiers.${category.tier.id}.name`)}`}
                value={money.format(category.tier.price)}
              />
            ))}
          </SummaryBlock>

          <SummaryBlock title={t('summary.addons')} value={money.format(addOnsSubtotal)}>
            {selectedAddOnItems.length === 0 ? (
              <p className="text-sm text-ink/50 dark:text-smoke/50">{t('summary.noAddons')}</p>
            ) : (
              selectedAddOnItems.map((addon) => (
                <SummaryLine key={addon.id} label={t(`addons.items.${addon.id}.title`)} value={money.format(addon.price)} />
              ))
            )}
          </SummaryBlock>
        </div>

        <div className="mt-6 border-t-2 border-ink/10 dark:border-white/10 pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="font-display text-3xl font-bold text-ink dark:text-white">{t('summary.total')}</span>
            <span className="font-display text-4xl font-bold text-bubblegum">{money.format(total)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink/50 dark:text-smoke/50">{t('summary.disclaimer')}</p>
        </div>
      </div>
    </Card>
  );
}

function SummaryBlock({ title, value, children }) {
  return (
    <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-bold text-ink dark:text-white">{title}</h3>
        <span className="font-display text-xl font-bold text-bubblegum">{value}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-ink/60 dark:text-smoke/65">{label}</span>
      <span className="font-bold text-ink dark:text-white whitespace-nowrap">{value}</span>
    </div>
  );
}

function MobileQuoteBar({ total, hardwareSubtotal, addOnsSubtotal, money, t }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink dark:border-white/15 bg-white/95 dark:bg-ink/95 backdrop-blur-xl p-4 lg:hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bubblegum">{t('summary.mobileLabel')}</p>
            <p className="text-xs text-ink/55 dark:text-smoke/60">
              {t('summary.hardware')}: {money.format(hardwareSubtotal)} · {t('summary.addons')}: {money.format(addOnsSubtotal)}
            </p>
          </div>
          <a href="#summary" className="text-right focus:outline-none focus-visible:ring-4 focus-visible:ring-bubblegum/50 rounded-xl">
            <span className="block font-display text-3xl font-bold text-bubblegum">{money.format(total)}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-ink dark:text-white">{t('summary.viewBreakdown')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Camera, Clock3, Search, ShieldCheck, Video } from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';

const events = [
  {
    id: '1',
    plate: 'AB123CD',
    timestamp: '2026-03-24 08:11:27',
    camera: 'Gate A',
    type: 'entry',
    confidence: '99.1%',
    note: 'White hatchback, front camera, clear daylight frame.',
  },
  {
    id: '2',
    plate: 'AB123CD',
    timestamp: '2026-03-24 18:42:09',
    camera: 'Gate B',
    type: 'exit',
    confidence: '98.7%',
    note: 'Exit lane, rear capture cross-checked with timeline index.',
  },
  {
    id: '3',
    plate: 'ZX901TY',
    timestamp: '2026-03-24 10:03:44',
    camera: 'Ramp -1',
    type: 'passage',
    confidence: '96.9%',
    note: 'Underground transition detected from archived DVR footage.',
  },
  {
    id: '4',
    plate: 'ZX901TY',
    timestamp: '2026-03-24 19:21:03',
    camera: 'Gate B',
    type: 'exit',
    confidence: '97.5%',
    note: 'Vehicle exits after long stay, timestamp linked to original clip.',
  },
  {
    id: '5',
    plate: 'LM456NO',
    timestamp: '2026-03-24 07:54:18',
    camera: 'Gate A',
    type: 'entry',
    confidence: '98.4%',
    note: 'Morning entry under low-angle light, OCR normalized successfully.',
  },
  {
    id: '6',
    plate: 'LM456NO',
    timestamp: '2026-03-24 14:16:52',
    camera: 'Cash Desk',
    type: 'passage',
    confidence: '95.8%',
    note: 'Cross-zone sighting used for internal movement reconstruction.',
  },
];

export default function TargageInteractiveDemo() {
  const t = useTranslations('Targage.demo');
  const [query, setQuery] = useState('AB123CD');

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toUpperCase();

    if (!normalized) {
      return [];
    }

    return events.filter((event) => event.plate.includes(normalized));
  }, [query]);

  const summary = useMemo(() => {
    if (!filteredEvents.length) {
      return null;
    }

    const sorted = [...filteredEvents].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    return {
      plate: sorted[0].plate,
      firstSeen: sorted[0],
      lastSeen: sorted[sorted.length - 1],
      totalSightings: sorted.length,
    };
  }, [filteredEvents]);

  return (
    <Card className="h-full border-ink/10 dark:border-white/10 bg-white/80 dark:bg-ink/70 backdrop-blur-xl overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-2">{t('eyebrow')}</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white mb-3">
              {t('title')}
            </h3>
            <p className="text-ink/70 dark:text-smoke/75 max-w-2xl leading-relaxed">{t('description')}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[t('preset.0'), t('preset.1'), t('preset.2')].map((plate) => (
              <button
                key={plate}
                type="button"
                onClick={() => setQuery(plate)}
                className="rounded-full border border-ink/10 dark:border-white/10 bg-paper dark:bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink dark:text-white transition-colors hover:border-bubblegum hover:text-bubblegum"
              >
                {plate}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-4">
              <label className="block text-xs font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-smoke/50 mb-3">
                {t('searchLabel')}
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/80 px-4 py-3">
                <Search size={18} className="text-ink/40 dark:text-smoke/40" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value.toUpperCase())}
                  className="w-full bg-transparent outline-none font-mono text-sm md:text-base text-ink dark:text-white uppercase"
                  placeholder={t('searchPlaceholder')}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-smoke/50 mb-2">
                  {t('stats.total')}
                </p>
                <p className="font-display text-3xl text-ink dark:text-white">{summary ? summary.totalSightings : '0'}</p>
              </div>
              <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-smoke/50 mb-2">
                  {t('stats.first')}
                </p>
                <p className="font-display text-lg text-ink dark:text-white">{summary ? summary.firstSeen.timestamp : '--'}</p>
              </div>
              <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-smoke/50 mb-2">
                  {t('stats.last')}
                </p>
                <p className="font-display text-lg text-ink dark:text-white">{summary ? summary.lastSeen.timestamp : '--'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-bubblegum/30 bg-bubblegum/10 p-4 text-ink dark:text-white">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-bubblegum shrink-0" size={18} />
                <p className="leading-relaxed text-sm md:text-base">{t('complianceNote')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-ink/10 dark:border-white/10 bg-ink text-white p-4 md:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bubblegum mb-2">{t('resultsLabel')}</p>
                <p className="font-display text-2xl md:text-3xl">{summary ? summary.plate : t('emptyTitle')}</p>
              </div>
              <div className="rounded-xl bg-white/5 px-3 py-2 text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">{t('videoIndex')}</p>
                <p className="font-mono text-sm text-white/85">ANPR-Timeline</p>
              </div>
            </div>

            {filteredEvents.length ? (
              <div className="space-y-3">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="rounded-full bg-bubblegum px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                            {t(`eventType.${event.type}`)}
                          </span>
                          <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                            {event.confidence} OCR
                          </span>
                        </div>
                        <p className="font-display text-xl mb-2">{event.timestamp}</p>
                        <p className="text-white/70 leading-relaxed text-sm md:text-base">{event.note}</p>
                      </div>

                      <div className="grid gap-2 text-xs uppercase tracking-[0.18em] text-white/55 min-w-40">
                        <div className="flex items-center gap-2">
                          <Camera size={14} />
                          <span>{event.camera}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock3 size={14} />
                          <span>{t('clipReady')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video size={14} />
                          <span>{t('sourceLinked')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
                <p className="font-display text-2xl text-white mb-2">{t('emptyTitle')}</p>
                <p className="text-white/65 max-w-md mx-auto leading-relaxed">{t('emptyDescription')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

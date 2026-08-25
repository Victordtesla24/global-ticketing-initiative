'use client';

/* Shared building blocks for the Australian audience prototype surface. */

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfoTip } from '@/components/proposal/info-tip';
import type { Bucket } from '@/lib/data/audience-au';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Colour per source code, so a column header and its source card read as one thing. */
export const SOURCE_COLOUR: Record<string, string> = {
  LANP: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  SAL: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  AP: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  ASGS: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  '1P': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  APP7: 'bg-primary/20 text-primary border-primary/40',
  SPAM: 'bg-primary/20 text-primary border-primary/40',
};

export const SOURCE_LEGEND: { code: string; meaning: string }[] = [
  { code: 'LANP', meaning: 'ABS Census — language used at home' },
  { code: 'SAL', meaning: 'ABS QuickStats — suburb ancestry and birthplace' },
  { code: 'AP', meaning: 'Australia Post postcode reference' },
  { code: 'ASGS', meaning: 'ABS statistical areas and correspondences' },
  { code: '1P', meaning: 'First-party opted-in list' },
  { code: 'APP7', meaning: 'Australian Privacy Principle 7 — direct marketing' },
  { code: 'SPAM', meaning: 'Spam Act 2003 — channel consent' },
];

export const TRUST_STYLE: Record<string, string> = {
  'Official statistic': 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  'Reference standard': 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  'Primary record — first party': 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  Regulator: 'border-primary/40 bg-primary/10 text-primary',
  'Licensed panel': 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  Aggregator: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  'Modelled estimate': 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  'Platform record': 'border-sky-500/40 bg-sky-500/10 text-sky-300',
};

export const TRUST_LEGEND: { term: string; meaning: string; swatch: string }[] = [
  { term: 'Official statistic', meaning: 'Enumerated or statutory figure', swatch: TRUST_STYLE['Official statistic'] },
  { term: 'Reference standard', meaning: 'Authoritative geography or coding list', swatch: TRUST_STYLE['Reference standard'] },
  { term: 'Primary record — first party', meaning: 'Collected at opt-in by the operator', swatch: TRUST_STYLE['Primary record — first party'] },
  { term: 'Regulator', meaning: 'Law or guidance that constrains use', swatch: TRUST_STYLE.Regulator },
  { term: 'Licensed panel', meaning: 'Vendor panel — not a sendable list for ancestry', swatch: TRUST_STYLE['Licensed panel'] },
  { term: 'Modelled estimate', meaning: 'Assigned by model, not declared by the person', swatch: TRUST_STYLE['Modelled estimate'] },
];

export const KIND_STYLE: Record<string, string> = {
  dim: 'border-sky-500/40 bg-sky-500/[0.06] text-sky-300',
  fact: 'border-primary/50 bg-primary/[0.07] text-primary',
  xref: 'border-violet-500/40 bg-violet-500/[0.06] text-violet-300',
  view: 'border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-300',
};

export const KIND_LEGEND: { term: string; meaning: string; swatch: string }[] = [
  { term: 'Dimension', meaning: 'Slowly changing descriptive attributes', swatch: KIND_STYLE.dim },
  { term: 'Correspondence', meaning: 'Many-to-many geography bridge with a ratio', swatch: KIND_STYLE.xref },
  { term: 'Fact', meaning: 'Event at a point in time — consent, send, sale', swatch: KIND_STYLE.fact },
  { term: 'Serving view', meaning: 'The only object a campaign may send from', swatch: KIND_STYLE.view },
];

export function SyntheticBadge() {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-amber-400">
      <FlaskConical className="h-3 w-3 shrink-0" />
      Synthetic sample
    </span>
  );
}

export function SourceCode({ code, className }: { code: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1 py-px font-mono text-[9px] font-bold leading-none tracking-wider',
        SOURCE_COLOUR[code] ?? 'border-border/60 text-muted-foreground',
        className
      )}
    >
      {code}
    </span>
  );
}

export function Bars({
  title,
  data,
  max,
  accent = 'gold',
  tip,
}: {
  title: string;
  data: Bucket[];
  max?: number;
  accent?: 'gold' | 'amber';
  tip?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const top = Math.max(1, max ?? Math.max(...data.map((d) => d.count), 1));
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
      <p className="t-eyebrow mb-3 inline-flex items-center gap-1.5">
        {title}
        {tip ? <InfoTip content={tip} /> : null}
      </p>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate text-[12.5px] text-foreground/85">{d.label}</span>
              <span className="shrink-0 font-marquee text-[15px] font-bold text-primary">{d.count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  accent === 'gold'
                    ? 'bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]'
                    : 'bg-gradient-to-r from-amber-600 to-amber-400'
                )}
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.count / top) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : i * 0.06, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Tile({
  value,
  label,
  sub,
  tip,
  tone = 'gold',
}: {
  value: string;
  label: string;
  sub?: string;
  tip?: ReactNode;
  tone?: 'gold' | 'emerald' | 'amber';
}) {
  const colour = tone === 'emerald' ? 'text-emerald-400' : tone === 'amber' ? 'text-amber-400' : 'text-primary';
  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-secondary/20 p-4">
      <p className="t-eyebrow inline-flex items-center gap-1.5">
        {label}
        {tip ? <InfoTip content={tip} /> : null}
      </p>
      <p className={cn('mt-1 font-marquee text-2xl font-bold leading-tight md:text-3xl', colour)}>{value}</p>
      {sub ? <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

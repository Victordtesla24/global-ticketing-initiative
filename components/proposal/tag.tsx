'use client';

import { cn } from '@/lib/utils';

/**
 * Short labels that say where a figure came from.
 *
 *   Actual spend                   money this programme has already spent
 *   Published price                the price the vendor publishes
 *   Quoted                         a written quote held on file
 *   Calculated                     worked out from the figures beside it
 *   Official statistic             an official statistic or a statutory filed record
 *   Illustrative — from sample data  computed from the downloadable sample files
 *
 * In running text the sentence says this in words. The chip below is for the places
 * where there is no room for a sentence: a table cell, or a headline figure.
 */
export type ProvenanceTag =
  | 'ACTUAL'
  | 'LIST'
  | 'QUOTE'
  | 'DERIVED'
  | 'OFFICIAL'
  | 'ILLUSTRATIVE';

const TAG_LABELS: Record<ProvenanceTag, string> = {
  ACTUAL: 'Actual spend',
  LIST: 'Published price',
  QUOTE: 'Quoted',
  DERIVED: 'Calculated',
  OFFICIAL: 'Official statistic',
  ILLUSTRATIVE: 'Illustrative — from sample data',
};

const TAG_STYLES: Record<ProvenanceTag, string> = {
  ACTUAL: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  LIST: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  QUOTE: 'border-primary/40 bg-primary/10 text-primary',
  DERIVED: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  OFFICIAL: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  // Same amber the Synthetic sample badge uses, so a figure and the file it came
  // from read as one label rather than two competing ones.
  ILLUSTRATIVE: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

/** Small plain-word chip, e.g. "Published price" or "Calculated". */
export function Tag({ tag, className }: { tag: ProvenanceTag; className?: string }) {
  return (
    <span
      className={cn(
        'mx-0.5 inline-flex items-center whitespace-nowrap rounded border px-1.5 py-px align-middle text-[10px] font-semibold tracking-wide',
        TAG_STYLES[tag] ?? TAG_STYLES.LIST,
        className
      )}
    >
      {TAG_LABELS[tag] ?? TAG_LABELS.LIST}
    </span>
  );
}

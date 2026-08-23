'use client';

import { cn } from '@/lib/utils';

/**
 * Provenance markers on the trust ladder. Every monetary figure on this site
 * carries exactly one of: [ACTUAL] receipted/first-hand, [LIST] vendor-published
 * price, [QUOTE] written quote on file, [DERIVED] computed from tagged inputs,
 * [ASSUMPTION] declared planning assumption with a named confirmer, [OFFICIAL]
 * an official statistic or a statutory filed record (e.g. an SEC-filed 10-K, an
 * ABR extract), [UNKNOWN] genuinely unpriced/unevidenced.
 *
 * A marker records how a figure enters this programme's accounts; it does not
 * restate the source's own trust tier. An audited filing sits one rung below an
 * official statistic on the ladder, and no figure is promoted by carrying a
 * marker.
 *
 * [ILLUSTRATIVE] is the one marker on this ladder that is not a provenance
 * claim — it is the refusal of one. It marks a figure computed from the
 * downloadable synthetic sample files: an illustration of the pipeline, never a
 * forecast, a commitment, or evidence of demand, supply or revenue in any
 * market. It carries no evidentiary weight and can never be promoted into one
 * of the markers above; a figure that acquires a real basis is retagged, not
 * relabelled. It is declared in the lede of every page that renders it, in the
 * same form those pages declare the rest of the set, and it appears only where
 * that declaration stands: /prototype and the /architecture follow-one-ticket
 * walkthrough. Before this marker existed those same figures shipped under two
 * page-local labels (REAL EXTRACT / SYNTHETIC SAMPLE) that no page declared as
 * a marker vocabulary at all.
 */
export type ProvenanceTag =
  | 'ACTUAL'
  | 'LIST'
  | 'QUOTE'
  | 'DERIVED'
  | 'ASSUMPTION'
  | 'OFFICIAL'
  | 'UNKNOWN'
  | 'UNVERIFIED'
  | 'ILLUSTRATIVE';

const TAG_STYLES: Record<ProvenanceTag, string> = {
  ACTUAL: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  LIST: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  QUOTE: 'border-primary/40 bg-primary/10 text-primary',
  DERIVED: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  ASSUMPTION: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  OFFICIAL: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  UNKNOWN: 'border-red-500/40 bg-red-500/10 text-red-400',
  UNVERIFIED: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  // Same amber the SYNTHETIC SAMPLE mode badge uses, so a figure and the file
  // it came from read as one label rather than two competing ones.
  ILLUSTRATIVE: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

/** Small monospace provenance badge, e.g. [LIST] or [UNKNOWN]. */
export function Tag({ tag, className }: { tag: ProvenanceTag; className?: string }) {
  return (
    <span
      className={cn(
        'mx-0.5 inline-flex items-center rounded border px-1 py-px align-middle font-mono text-[10px] font-semibold tracking-wider',
        TAG_STYLES[tag] ?? TAG_STYLES.UNKNOWN,
        className
      )}
    >
      [{tag}]
    </span>
  );
}

const TAG_RE = /(\[(?:ACTUAL|LIST|QUOTE|DERIVED|ASSUMPTION|OFFICIAL|UNKNOWN|UNVERIFIED|ILLUSTRATIVE)\])/g;
const TAG_MATCH = /^\[(ACTUAL|LIST|QUOTE|DERIVED|ASSUMPTION|OFFICIAL|UNKNOWN|UNVERIFIED|ILLUSTRATIVE)\]$/;

/** Renders text, replacing inline provenance tags with monospace badges. */
export function TagText({ text, className }: { text: string; className?: string }) {
  const parts = (text ?? '').split(TAG_RE);
  return (
    <span className={className}>
      {parts.map((p: string, i: number) => {
        const m = TAG_MATCH.exec(p);
        return m ? <Tag key={i} tag={m[1] as ProvenanceTag} /> : <span key={i}>{p}</span>;
      })}
    </span>
  );
}

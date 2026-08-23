'use client';

import { cn } from '@/lib/utils';

/**
 * Provenance tags per the adversarial audit's trust ladder. The site-wide
 * estimate tag is abolished; every surviving figure carries exactly one of
 * these instead: [ACTUAL] receipted/first-hand, [LIST] vendor-published price,
 * [QUOTE] written quote on file, [DERIVED] computed from tagged inputs,
 * [ASSUMPTION] declared planning assumption with a named confirmer,
 * [OFFICIAL] an official statistic or a statutory filed record (e.g. an
 * SEC-filed 10-K, an ABR extract), deep-linked in workflow/verify/,
 * [UNKNOWN] genuinely unpriced/unevidenced.
 *
 * [OFFICIAL] was added on the closure pass (2026-08-23, F-04): two live figures
 * had been carrying provenance labels this audit invented for itself ("Audited
 * filing", "Trade-body estimate") rather than a marker from the sanctioned set.
 * [OFFICIAL] marks how a figure enters this programme's ledger; it does not
 * restate the source's trust tier, which stays as financial_rebuild.md §B.2
 * grades it (an audited filing sits one rung below an official statistic there,
 * and no figure is laundered upward by carrying this marker).
 */
export type ProvenanceTag =
  | 'ACTUAL'
  | 'LIST'
  | 'QUOTE'
  | 'DERIVED'
  | 'ASSUMPTION'
  | 'OFFICIAL'
  | 'UNKNOWN'
  | 'UNVERIFIED';

const TAG_STYLES: Record<ProvenanceTag, string> = {
  ACTUAL: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  LIST: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  QUOTE: 'border-primary/40 bg-primary/10 text-primary',
  DERIVED: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  ASSUMPTION: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  OFFICIAL: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  UNKNOWN: 'border-red-500/40 bg-red-500/10 text-red-400',
  UNVERIFIED: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
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

const TAG_RE = /(\[(?:ACTUAL|LIST|QUOTE|DERIVED|ASSUMPTION|OFFICIAL|UNKNOWN|UNVERIFIED)\])/g;
const TAG_MATCH = /^\[(ACTUAL|LIST|QUOTE|DERIVED|ASSUMPTION|OFFICIAL|UNKNOWN|UNVERIFIED)\]$/;

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

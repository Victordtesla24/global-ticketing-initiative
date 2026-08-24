'use client';

import { motion } from 'framer-motion';
import { Ban, Flag, Gavel, AlertTriangle } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider } from '@/components/proposal/section';
import { Timeline } from '@/components/proposal/timeline';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  RECS_LEDE, EXECUTION_INTRO, PRIORITY_RECOMMENDATIONS, EXECUTION_PROVENANCE,
  NOT_YET, ROADMAP_90_DAYS, ROADMAP_RECONCILIATION, ROADMAP_NOTE, CEO_ACTIONS, CLOSING_STATEMENT, CLOSING_PROVENANCE,
} from '@/lib/data/review';

function OutstandingItem({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">Outstanding before decision — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What must be obtained:</span> {item?.unknown ?? ''}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

export default function RecommendationsContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 09 — Recommendations" title="The Execution Sequence">
        <p className="max-w-3xl leading-relaxed text-muted-foreground mb-6">{RECS_LEDE}</p>

        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{EXECUTION_INTRO}</p>

        <div className="grid gap-4 lg:grid-cols-3">
          {(PRIORITY_RECOMMENDATIONS ?? []).map((r: any, i: number) => (
            <motion.div key={r?.order} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <GlassCard className={`h-full ${i === 0 ? 'gold-shimmer border-primary/40' : ''}`}>
                <p className="t-eyebrow mb-2">{r?.order}</p>
                <h3 className="font-marquee text-lg font-bold uppercase tracking-wide text-primary mb-3">{r?.title}</h3>
                <div className="mb-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{r?.timeline}</span>
                  <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{r?.timelineNote}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{r?.detail ?? ''}</p>
                {r?.openItem ? (
                  <div className="mt-4">
                    <OutstandingItem item={r.openItem} />
                  </div>
                ) : null}
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{EXECUTION_PROVENANCE}</p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Discipline" title="Deferred Commitments">
        <p className="mb-4 max-w-3xl text-sm text-muted-foreground">Not funded at this stage, and named without a price, contract or engagement attached:</p>
        <div className="grid gap-3 md:grid-cols-2">
          {(NOT_YET ?? []).map((n: string, i: number) => (
            <GlassCard key={i} className="py-4">
              <div className="flex items-start gap-3">
                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-foreground/85">{n}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Execution" title="The Gated Roadmap">
        <Timeline
          items={(ROADMAP_90_DAYS ?? []).map((m: any) => {
            const [marker, ...rest] = String(m?.milestone ?? '').split(': ');
            return {
              marker: marker ?? '',
              period: m?.timeline ?? '',
              title: rest.join(': ') || (m?.milestone ?? ''),
              blocks: [
                { label: 'Deliverable', text: m?.deliverable ?? '' },
                { label: 'Outcome', text: m?.outcome ?? '' },
              ],
            };
          })}
        />
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{ROADMAP_RECONCILIATION}</p>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{ROADMAP_NOTE}</p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Decision" title="Three Actions For The CEO">
        <div className="grid gap-4 lg:grid-cols-3">
          {(CEO_ACTIONS ?? []).map((a: any, i: number) => (
            <motion.div key={a?.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-marquee text-base font-bold text-black">{a?.n}</span>
                  <Gavel className="h-4 w-4 text-primary" />
                </div>
                <p className="mb-2 text-sm font-semibold leading-relaxed text-foreground">{a?.action}</p>
                <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold uppercase tracking-wider text-primary">Decision: </span>{a?.decision}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="mt-8 border-primary/40 text-center">
          <Flag className="mx-auto mb-3 h-6 w-6 text-primary" />
          <p className="font-marquee text-xl font-bold uppercase tracking-wide text-primary">Disciplined Capital, Staged Growth</p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{CLOSING_STATEMENT}</p>
          <p className="mx-auto mt-3 max-w-2xl border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">{CLOSING_PROVENANCE}</p>
        </GlassCard>
      </Section>
    </div>
  );
}

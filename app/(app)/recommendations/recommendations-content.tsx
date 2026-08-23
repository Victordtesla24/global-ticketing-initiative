'use client';

import { motion } from 'framer-motion';
import { Ban, Flag, Gavel } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, EstText } from '@/components/proposal/section';
import { Timeline } from '@/components/proposal/timeline';
import { PRIORITY_RECOMMENDATIONS, NOT_YET, ROADMAP_90_DAYS, CEO_ACTIONS } from '@/lib/data/review';

export default function RecommendationsContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 09 — Recommendations" title="The Execution Sequence">
        <p className="max-w-3xl leading-relaxed text-muted-foreground mb-8">
          A staged, evidence-led programme: strictly sequenced, capped investment in which each tranche of
          capital is released as the preceding gate is passed. The foundation work comes first — every later
          commitment builds on it.
        </p>

        <div className="grid gap-4 lg:grid-cols-3">
          {(PRIORITY_RECOMMENDATIONS ?? []).map((r: any, i: number) => (
            <motion.div key={r?.order} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <GlassCard className={`h-full ${i === 0 ? 'gold-shimmer border-primary/40' : ''}`}>
                <p className="t-eyebrow mb-2">{r?.order}</p>
                <h3 className="font-marquee text-lg font-bold uppercase tracking-wide text-primary mb-3">{r?.title}</h3>
                <div className="mb-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">{r?.budget}</span>
                  <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{r?.timeline}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85"><EstText text={r?.detail ?? ''} /></p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Discipline" title="Deferred Commitments">
        <div className="grid gap-3 md:grid-cols-2">
          {(NOT_YET ?? []).map((n: string, i: number) => (
            <GlassCard key={i} className="py-4">
              <div className="flex items-start gap-3">
                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-foreground/85"><EstText text={n} /></p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Execution" title="The 90-Day Roadmap">
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
                <p className="mb-2 text-sm font-semibold leading-relaxed text-foreground"><EstText text={a?.action ?? ''} /></p>
                <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold uppercase tracking-wider text-primary">Decision: </span>{a?.decision}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="mt-8 border-primary/40 text-center">
          <Flag className="mx-auto mb-3 h-6 w-6 text-primary" />
          <p className="font-marquee text-xl font-bold uppercase tracking-wide text-primary">Disciplined Capital, Staged Growth</p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Capital is released in gated stages: the discovery phase proceeds first, with further investment
            following once the entity gate (G0) and the data-feasibility gate (G1) are passed. Evidence leads,
            expenditure follows.
          </p>
        </GlassCard>
      </Section>
    </div>
  );
}

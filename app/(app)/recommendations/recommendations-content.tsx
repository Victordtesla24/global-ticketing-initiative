'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Ban, Flag, Gavel } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import { Timeline } from '@/components/proposal/timeline';
import {
  RECS_LEDE, EXECUTION_INTRO, PRIORITY_RECOMMENDATIONS, EXECUTION_PROVENANCE,
  NOT_YET, ROADMAP_90_DAYS, ROADMAP_RECONCILIATION, CEO_ACTIONS, CLOSING_STATEMENT, CLOSING_PROVENANCE,
} from '@/lib/data/review';

const EASE = [0.22, 1, 0.36, 1] as const;

/* A figure and the short line that says what it is. */
type Figure = { v: string; l: string };

function FigureTile({ figure }: { figure: Figure }) {
  return (
    <div className="rounded-lg border border-border/40 bg-secondary/20 px-3 py-2">
      <p className="font-marquee text-[15px] font-bold leading-tight text-primary">{figure.v}</p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground/85">{figure.l}</p>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary">
      {children}
    </span>
  );
}

/* The headline of each priced commitment, so the gate cards lead with a figure
   rather than a paragraph. The paragraph itself sits verbatim in the fold. */
type GateHead = { gate: string; value: string; valueSub: string; chips: string[] };

const GATE_HEADS: Record<string, GateHead> = {
  FIRST: {
    gate: 'Gate G0',
    value: 'A$1,920.00',
    valueSub: 'Consultant labour — 4.0 days at A$60.00/hr',
    chips: [
      '2.31× the A$830 anchor',
      'No vendor cash committed — five quote requests, free to lodge',
      'Professional fees quoted on request',
    ],
  },
  SECOND: {
    gate: 'Gate G1',
    value: 'A$2,880.00',
    valueSub: 'Consultant labour — 6.0 days',
    chips: [
      '3.47× the anchor',
      'Outreach tooling A$0 — Apollo.io published free tier',
      'Demand study and per-agreement legal review quoted on request',
    ],
  },
  THIRD: {
    gate: 'Gate G2',
    value: '3–5',
    valueSub: 'Pilot events in Australia',
    chips: [
      '3 certified dashboards',
      'Entry: 3+ signed pilot-event agreements or dated letters of intent',
      'One-off gate cost — priced per line below',
    ],
  },
};

/* Gate G2 priced one-off, on each of the vendor's two published prices for the
   same single report. The two configurations are alternatives, not a range. */
const G2_ROWS: string[][] = [
  ['AUD $2,500 live cart', 'Floor configuration', 'data floor A$2,500.00 + setup 7.0 days A$3,360.00', 'A$5,860.00', '7.06×'],
  ['AUD $2,500 live cart', 'Full configuration', 'data full A$6,036.74 + setup 8.0 days A$3,840.00', 'A$9,876.74', '11.90×'],
  ['AU$2,200 help centre', 'Floor configuration', '2,200 + 3,360', 'A$5,560.00', '6.70×'],
  ['AU$2,200 help centre', 'Full configuration', '2,200 + 3,342.20 + 194.54 + 3,840', 'A$9,576.74', '11.54×'],
  ['AU$2,200 help centre', 'Data-floor line only', '2,200 ÷ 830', 'A$2,200', '2.65×'],
];

const G2_FIGURES: Figure[] = [
  { v: '0.090×/mo', l: 'Run rate — monthly-cancellable, and not part of the authorised gate cost' },
  { v: 'US$199/mo', l: 'Statista Starter, billed annually — A$3,342.20 inside the full configuration' },
];

/* The three milestone bands, drawn to scale against the earliest completion day. */
const ROADMAP_BAND = [
  { key: 'M1', head: '30 days to G0', sub: 'M1 — Foundation · Days 1–30', days: 30, cls: 'bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]' },
  { key: 'M2', head: '60 days to G1', sub: 'M2 — Discovery · Days 31–90', days: 60, cls: 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]' },
  { key: 'M3', head: '12 weeks (84 days) to G2', sub: 'M3 — Pilot · Days 91–174', days: 84, cls: 'bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-pale)]' },
];

const ROADMAP_TOTAL_DAYS = 174;

const PHASE_RECONCILIATION: Figure[] = [
  { v: 'Phase 0 — Verify', l: 'Months 0–3 · covers M1 and M2 · days 1–90' },
  { v: 'Phase 1 — Pilot', l: 'Months 4–6 · covers M3 · days 91–174' },
];

const GATE_DEFINITIONS: Figure[] = [
  { v: 'G0', l: 'Due diligence & terms' },
  { v: 'G1', l: 'Discovery' },
  { v: 'G2', l: 'MVP build' },
];

function RoadmapBand() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="t-eyebrow">End to end, not in parallel</p>
        <p className="font-marquee text-lg font-bold uppercase text-primary">Earliest completion — day 174</p>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-border/20">
        {ROADMAP_BAND.map((s, i) => (
          <motion.div
            key={s.key}
            className={`h-full ${s.cls}`}
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: `${(s.days / ROADMAP_TOTAL_DAYS) * 100}%` }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {ROADMAP_BAND.map((s) => (
          <div key={s.key} className="rounded-lg border border-border/40 bg-secondary/20 px-3 py-2">
            <p className="font-marquee text-[14px] font-bold leading-tight text-primary">{s.head}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground/85">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecommendationsContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 09 — Recommendations" title="The Execution Sequence">
        <p className="mb-3 max-w-3xl leading-relaxed text-muted-foreground">
          Three sequential commitments, each gated on the one before — G0, then G1, then G2.
        </p>
        <Disclosure label="How this sequence is priced" className="mb-8 max-w-3xl">
          <p>{RECS_LEDE}</p>
          <p className="mt-2">{EXECUTION_INTRO}</p>
        </Disclosure>

        <div className="grid gap-4 lg:grid-cols-3">
          {(PRIORITY_RECOMMENDATIONS ?? []).map((r: any, i: number) => {
            const head = GATE_HEADS[r?.order ?? ''];
            return (
              <motion.div
                key={r?.order}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <GlassCard className={`flex h-full flex-col ${i === 0 ? 'gold-shimmer border-primary/40' : ''}`}>
                  <p className="t-eyebrow">{r?.order}</p>
                  <h3 className="mb-3 mt-1 font-marquee text-lg font-bold uppercase tracking-wide text-primary">
                    {r?.title}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{head?.gate}</p>
                  <div className="mt-3">
                    <p className="font-marquee text-2xl font-bold uppercase leading-tight text-primary md:text-3xl">
                      {head?.value}
                    </p>
                    <p className="mt-1 text-[12px] uppercase tracking-wider text-muted-foreground">{head?.valueSub}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(head?.chips ?? []).map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{r?.timeline}</span>
                    <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{r?.timelineNote}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Disclosure label="The full working">{r?.detail ?? ''}</Disclosure>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <p className="t-eyebrow mb-3">Gate G2 — the one-off cost, per line</p>
          <DataTable
            headers={['Basis', 'Configuration', 'Working', 'Total', 'Multiple of the A$830 anchor']}
            rows={G2_ROWS.map((row) => [
              <span key="b" className="whitespace-nowrap text-[12.5px] text-muted-foreground">{row[0]}</span>,
              <span key="c" className="whitespace-nowrap font-semibold text-foreground">{row[1]}</span>,
              <span key="w" className="font-mono text-[12.5px] text-foreground/80">{row[2]}</span>,
              <span key="t" className="whitespace-nowrap font-marquee text-[14px] font-bold text-primary">{row[3]}</span>,
              <span key="m" className="whitespace-nowrap font-marquee text-[14px] font-bold text-primary">{row[4]}</span>,
            ])}
          />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The two configurations are alternatives, not a range. No gate figure prices the Personal tier.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {G2_FIGURES.map((f) => (
              <FigureTile key={f.v} figure={f} />
            ))}
          </div>
        </div>

        <p className="mt-4 max-w-3xl border-t border-border/40 pt-2 text-[12px] leading-relaxed text-muted-foreground/60">
          {EXECUTION_PROVENANCE}
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Discipline" title="Deferred Commitments">
        <div className="mb-4 flex flex-wrap items-baseline gap-4">
          <span className="font-marquee text-4xl font-black leading-none text-primary">{NOT_YET?.length ?? 0}</span>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Not funded at this stage, and named without a price, contract or engagement attached:
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {(NOT_YET ?? []).map((n: string, i: number) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-secondary/20 px-3.5 py-3">
              <Ban className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-[12.5px] leading-snug text-foreground/85">{n}</p>
            </div>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Execution" title="The Gated Roadmap">
        <RoadmapBand />
        <div className="mt-6">
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
        </div>
        <p className="t-eyebrow mb-3 mt-8">How the bands meet the Australia phase plan</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PHASE_RECONCILIATION.map((f) => (
            <FigureTile key={f.v} figure={f} />
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Planning windows, not vendor commitments or sourced estimates.
        </p>
        <Disclosure label="Why these bands" className="mt-3 max-w-3xl">
          {ROADMAP_RECONCILIATION}
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Decision" title="Three Actions For The CEO">
        <div className="grid gap-4 lg:grid-cols-3">
          {(CEO_ACTIONS ?? []).map((a: any, i: number) => (
            <motion.div
              key={a?.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="h-full"
            >
              <GlassCard className="flex h-full flex-col">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-marquee text-base font-bold text-black">{a?.n}</span>
                  <Gavel className="h-4 w-4 text-primary" />
                </div>
                <p className="mb-3 text-sm font-semibold leading-relaxed text-foreground">{a?.action}</p>
                <div className="mt-auto rounded-lg border border-border/40 bg-secondary/20 px-3 py-2">
                  <p className="t-eyebrow mb-1">Decision</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{a?.decision}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {GATE_DEFINITIONS.map((f) => (
            <FigureTile key={f.v} figure={f} />
          ))}
        </div>

        <GlassCard className="mt-6 border-primary/40 text-center">
          <Flag className="mx-auto mb-3 h-6 w-6 text-primary" />
          <p className="font-marquee text-xl font-bold uppercase tracking-wide text-primary">Disciplined Capital, Staged Growth</p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Evidence leads, expenditure follows.
          </p>
          <div className="mx-auto mt-4 max-w-2xl text-left">
            <Disclosure label="The full statement">{CLOSING_STATEMENT}</Disclosure>
            <Disclosure label="Gate definitions" className="mt-2">{CLOSING_PROVENANCE}</Disclosure>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
}

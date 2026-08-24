'use client';

import { ReactNode, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldAlert, Grid3X3, ListChecks, Target, Landmark, Building2, Star, ArrowRight } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import {
  RISKS, riskColour, Risk,
  RISK_LEDE, RISK_BASIS_NOTE, RISK_LANDSCAPE, RISK_REGISTER_PROVENANCE,
  REGISTRY_CHECKS, TOP5_INTRO, TOP5_MITIGATIONS,
  FOUNDATION_STATEMENT, FOUNDATION_PROVENANCE,
} from '@/lib/data/risks';

const EASE = [0.22, 1, 0.36, 1] as const;

/* The three colour bands of the register, read straight off riskColour(). */
const SCORE_BANDS = [
  { label: 'High', range: '17–25', colour: '#DC2626', match: (s: number) => s >= 17 },
  { label: 'Medium', range: '9–16', colour: '#F59E0B', match: (s: number) => s >= 9 && s <= 16 },
  { label: 'Low', range: '1–8', colour: '#22C55E', match: (s: number) => s <= 8 },
];

/* What the public registers return for row 1, as a record rather than a paragraph. */
const ENTITY_FACTS: { label: string; value: string; alert?: boolean }[] = [
  { label: 'Ticketalay on ABN Lookup', value: '“No matching names found”', alert: true },
  { label: 'Active ABN named exactly “AB Entertainment”', value: 'None', alert: true },
  { label: 'Registrant of ticketalay.com.au', value: 'ABN 91 819 759 805 — V DESHPANDE & A KADAM' },
  { label: 'Trading as', value: 'A&B ENTERTAINMENTS — VIC 3030' },
  { label: 'Partnership active since', value: '07 Nov 2022' },
  { label: 'GST', value: 'Not registered', alert: true },
  { label: 'Domain status, auDA RDAP', value: '“server renew prohibited” — “Not Currently Eligible For Renewal”', alert: true },
  { label: 'Status last changed', value: '2026-08-16', alert: true },
];

/* The engagement actually metered behind row 2. */
const STORE_RATINGS = [
  { store: 'Google Play', ratings: '386 ratings', stars: 3.36 },
  { store: 'App Store', ratings: '45 ratings', stars: 2.62 },
];

const FOUNDATION_STEPS = ['Legal-entity confirmation', 'Audited financials', 'Signed pilot agreements'];

/* ------------------------------------------------------------- primitives */

function FactChip({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'amber' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold tracking-wide ${
        tone === 'amber'
          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
          : 'border-primary/30 bg-primary/10 text-foreground/85'
      }`}
    >
      {children}
    </span>
  );
}

/* A 1–5 axis drawn as five blocks, with the score kept in figures beside it. */
function ScaleDots({ label, value, colour }: { label: string; value: number; colour: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-[74px] shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n: number) => (
          <span
            key={n}
            className="h-1.5 w-4 rounded-full"
            style={{ backgroundColor: n <= value ? colour : 'rgba(255,255,255,0.10)' }}
          />
        ))}
      </span>
      <span className="font-marquee text-[13px] font-bold leading-none text-foreground">{value}</span>
    </div>
  );
}

/* Score as a share of the 25-point maximum. */
function ScoreBar({ score }: { score: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: riskColour(score) }}
        initial={reduceMotion ? false : { width: 0 }}
        whileInView={{ width: `${(score / 25) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      />
    </div>
  );
}

/* Store rating out of five, as a figure and a bar. */
function StarMeter({ store, ratings, stars }: { store: string; ratings: string; stars: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <p className="t-eyebrow">{store}</p>
        <p className="font-mono text-[11.5px] text-muted-foreground">{ratings}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <Star className="h-3.5 w-3.5 shrink-0 self-center text-primary" />
        <span className="font-marquee text-2xl font-bold leading-none text-primary">{stars.toFixed(2)}</span>
        <span className="text-[11.5px] text-muted-foreground">of 5 stars</span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]"
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width: `${(stars / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function RiskContent() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const reduceMotion = useReducedMotion();
  const selected = RISKS?.find?.((r: Risk) => r?.id === selectedId) ?? null;

  // Group risks by (likelihood, impact) cell
  const cellRisks = (l: number, i: number) =>
    RISKS?.filter?.((r: Risk) => r?.likelihood === l && r?.impact === i) ?? [];

  const impacts = [5, 4, 3, 2, 1];
  const likelihoods = [1, 2, 3, 4, 5];

  const totalRisks = RISKS?.length ?? 0;
  const entityRisk = RISKS?.find?.((r: Risk) => r?.id === 1) ?? null;
  const evidenceRisk = RISKS?.find?.((r: Risk) => r?.id === 2) ?? null;
  const entityRow = REGISTRY_CHECKS?.rows?.[0] ?? null;
  const evidenceRow = REGISTRY_CHECKS?.rows?.[1] ?? null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 06 — Risk Analysis" title="The Risk Heat Map">
        <div className="mb-6 flex flex-wrap gap-2">
          <FactChip>Self-assessed by the promoter — not a third-party or actuarial rating</FactChip>
          <FactChip>Likelihood × Impact, 1–5 on each axis</FactChip>
          <FactChip>Score out of 25</FactChip>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(RISK_LANDSCAPE?.stats ?? []).map((s: any, i: number) => (
            <StatCard key={i} label={s?.label ?? ''} value={s?.value ?? ''} sub={s?.note} />
          ))}
        </div>

        <p className="mb-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Two risks sit at the maximum score of 25 — entity ambiguity and the financial evidence gap — and they set the
          staged, evidence-led investment sequence. Select any marker on the map to read its mitigation.
        </p>
        <Disclosure label="The full working" className="mb-8 max-w-3xl">
          <p>{RISK_LEDE}</p>
          <p className="mt-2">{RISK_BASIS_NOTE}</p>
          <p className="mt-2 text-muted-foreground/60">{RISK_LANDSCAPE?.provenance}</p>
        </Disclosure>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Heat map */}
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4 text-primary" />
              <h3 className="font-marquee text-sm font-bold uppercase tracking-wider text-foreground">Likelihood × Impact (10 risks)</h3>
            </div>
            {/* The five-by-five grid has an intrinsic minimum width: on a phone it
                scrolls inside this card rather than widening the whole page. */}
            <div className="flex overflow-x-auto">
              {/* Y axis label */}
              <div className="flex items-center pr-2">
                <span className="t-eyebrow rotate-180 [writing-mode:vertical-rl]">Impact →</span>
              </div>
              <div className="min-w-[280px] flex-1">
                <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1.5">
                  {impacts.map((imp: number) => (
                    <div key={`row-${imp}`} className="contents">
                      <div className="flex items-center justify-center pr-1 text-xs text-muted-foreground w-5">{imp}</div>
                      {likelihoods.map((lik: number) => {
                        const score = lik * imp;
                        const cell = cellRisks(lik, imp);
                        const colour = riskColour(score);
                        return (
                          <div
                            key={`c-${lik}-${imp}`}
                            className="relative aspect-square rounded-md border border-white/5 flex flex-wrap items-center justify-center gap-1 p-1 transition-transform hover:scale-[1.04]"
                            style={{ backgroundColor: `${colour}${cell?.length ? '33' : '14'}` }}
                            title={`Likelihood ${lik} × Impact ${imp} = ${score}`}
                          >
                            {cell.map((r: Risk) => (
                              <button
                                key={r?.id}
                                onClick={() => setSelectedId(r?.id ?? null)}
                                aria-label={`Risk ${r?.id}: ${r?.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-black shadow-lg transition-all hover:scale-110"
                                style={{
                                  backgroundColor: colour,
                                  outline: selectedId === r?.id ? '2px solid #C9A84C' : 'none',
                                  outlineOffset: 2,
                                }}
                              >
                                {r?.id}
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div />
                  {likelihoods.map((l: number) => (
                    <div key={`x-${l}`} className="pt-1 text-center text-xs text-muted-foreground">{l}</div>
                  ))}
                </div>
                <p className="t-eyebrow mt-2 text-center">Likelihood →</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: '#22C55E' }} /> Low (1–8)</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: '#F59E0B' }} /> Medium (9–16)</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: '#DC2626' }} /> High (17–25)</span>
            </div>
          </GlassCard>

          {/* Detail panel */}
          <GlassCard className="self-start">
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-marquee text-sm font-bold uppercase tracking-wider text-foreground">Selected Risk</h3>
            </div>
            {selected ? (
              <motion.div key={selected?.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-black"
                    style={{ backgroundColor: riskColour(selected?.score ?? 0) }}
                  >
                    {selected?.id}
                  </span>
                  <div>
                    <p className="font-marquee text-base font-bold uppercase tracking-wide text-foreground">{selected?.name}</p>
                    <p className="text-xs text-muted-foreground">Score {selected?.score} — Likelihood {selected?.likelihood} × Impact {selected?.impact}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <ScoreBar score={selected?.score ?? 0} />
                </div>
                <p className="t-eyebrow mb-1">Mitigation (prospective)</p>
                <p className="text-sm leading-relaxed text-foreground/85">{selected?.mitigation}</p>
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a numbered marker on the heat map to view its mitigation.</p>
            )}
            <div className="mt-6 border-t border-border/40 pt-4">
              <p className="t-eyebrow mb-2">All Risks</p>
              <div className="flex flex-wrap gap-2">
                {(RISKS ?? []).map((r: Risk) => (
                  <button
                    key={r?.id}
                    onClick={() => setSelectedId(r?.id ?? null)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      selectedId === r?.id
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {r?.id}. {r?.name}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Risk Register" title="All Ten Risks">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <h3 className="font-marquee text-sm font-bold uppercase tracking-wider text-foreground">Where the ten scores fall</h3>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {SCORE_BANDS.map((b) => {
            const n = (RISKS ?? []).filter((r: Risk) => b.match(r?.score ?? 0)).length;
            return (
              <div key={b.label} className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: b.colour }}>
                    {b.label} ({b.range})
                  </p>
                  <p className="font-marquee text-2xl font-bold leading-none" style={{ color: b.colour }}>{n}</p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: b.colour }}
                    initial={reduceMotion ? false : { width: 0 }}
                    whileInView={{ width: `${(n / Math.max(1, totalRisks)) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </div>
                <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">
                  of {totalRisks} risk categories
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(RISKS ?? []).map((r: Risk, idx: number) => (
            <motion.div
              key={r?.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 2) * 0.05 }}
            >
              <GlassCard className="flex h-full flex-col">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-black"
                      style={{ backgroundColor: riskColour(r?.score ?? 0) }}
                    >
                      {r?.id}
                    </span>
                    <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{r?.name}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-bold text-black"
                    style={{ backgroundColor: riskColour(r?.score ?? 0) }}
                  >
                    {r?.score}
                  </span>
                </div>
                <ScoreBar score={r?.score ?? 0} />
                <div className="mt-3 space-y-1.5">
                  <ScaleDots label="Likelihood" value={r?.likelihood ?? 0} colour={riskColour(r?.score ?? 0)} />
                  <ScaleDots label="Impact" value={r?.impact ?? 0} colour={riskColour(r?.score ?? 0)} />
                </div>
                <div className="mt-4 border-t border-border/40 pt-3">
                  <p className="t-eyebrow mb-1">Mitigation (prospective)</p>
                  <p className="text-sm leading-relaxed text-foreground/85">{r?.mitigation}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <Disclosure label="How the register is scored" className="mt-5 max-w-3xl">
          {RISK_REGISTER_PROVENANCE}
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Registry Findings" title={REGISTRY_CHECKS?.title ?? ''}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Row 1 — the register record */}
          <GlassCard className="flex h-full flex-col">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-primary" />
                <p className="t-eyebrow">Row 1 — {entityRisk?.name}</p>
              </div>
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-bold text-black"
                style={{ backgroundColor: riskColour(entityRisk?.score ?? 0) }}
              >
                {entityRisk?.score}
              </span>
            </div>
            <p className="mb-4 text-sm leading-snug text-foreground/85">{entityRow?.heading}</p>
            <dl className="divide-y divide-border/40 overflow-hidden rounded-xl border border-border/60 bg-secondary/20">
              {ENTITY_FACTS.map((f) => (
                <div key={f.label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-3 py-2">
                  <dt className="text-[11.5px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className={`font-mono text-[12px] leading-snug ${f.alert ? 'text-amber-400' : 'text-foreground/85'}`}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              <FactChip tone="amber">Time-critical on the G0 critical path</FactChip>
              <FactChip tone="amber">Resolve before any agreement is signed</FactChip>
            </div>
            <Disclosure label="The register record in full" className="mt-4">
              {entityRow?.body}
            </Disclosure>
          </GlassCard>

          {/* Row 2 — the metered engagement */}
          <GlassCard className="flex h-full flex-col">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 shrink-0 text-primary" />
                <p className="t-eyebrow">Row 2 — {evidenceRisk?.name}</p>
              </div>
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-bold text-black"
                style={{ backgroundColor: riskColour(evidenceRisk?.score ?? 0) }}
              >
                {evidenceRisk?.score}
              </span>
            </div>
            <p className="mb-4 text-sm leading-snug text-foreground/85">{evidenceRow?.heading}</p>
            <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
              <p className="t-eyebrow mb-1">Google Play downloads</p>
              <p className="font-marquee text-2xl font-bold uppercase leading-none text-primary md:text-3xl">100,000+</p>
              <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
                Cumulative installs on the India-only product — not users, and not buyers.
              </p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {STORE_RATINGS.map((s) => (
                <StarMeter key={s.store} store={s.store} ratings={s.ratings} stars={s.stars} />
              ))}
            </div>
            <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">Both on India storefronts.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <FactChip tone="amber">No audited statements on file</FactChip>
              <FactChip tone="amber">No settlement records on file</FactChip>
              <FactChip tone="amber">No first-party exports on file</FactChip>
            </div>
            <Disclosure label="The register record in full" className="mt-4">
              {evidenceRow?.body}
            </Disclosure>
          </GlassCard>
        </div>
        <Disclosure label="Provenance" className="mt-5 max-w-3xl">
          {REGISTRY_CHECKS?.provenance}
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Priority Actions" title="Top Five Mitigations">
        <DataTable
          headers={['#', 'Risk', 'Mitigation']}
          rows={(TOP5_MITIGATIONS ?? []).map((m: any) => [
            <span
              key="rank"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-marquee text-[13px] font-bold text-primary"
            >
              {String(m?.rank ?? '')}
            </span>,
            <span key="risk" className="font-semibold text-foreground">{m?.risk ?? ''}</span>,
            m?.mitigation ?? '',
          ])}
        />
        <div className="mt-3 flex items-start gap-2 text-muted-foreground">
          <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm">{TOP5_INTRO}</p>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Sequencing" title="Why Foundation Work Leads the Sequence">
        <GlassCard>
          <p className="t-eyebrow mb-3">Movable only by documentary evidence</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[entityRisk, evidenceRisk].map((r: Risk | null, i: number) => (
              <div key={r?.id ?? i} className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{r?.name}</p>
                  <span className="font-marquee text-2xl font-bold leading-none" style={{ color: riskColour(r?.score ?? 0) }}>
                    {r?.score}
                  </span>
                </div>
                <div className="mt-3">
                  <ScoreBar score={r?.score ?? 0} />
                </div>
              </div>
            ))}
          </div>

          <p className="t-eyebrow mb-3 mt-6">Foundation work, in order</p>
          <ol className="flex flex-wrap items-center gap-2">
            {FOUNDATION_STEPS.map((s: string, i: number) => (
              <li key={s} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12.5px] font-semibold text-foreground/85">
                  <span className="font-marquee text-[12px] font-bold text-primary">{i + 1}</span>
                  {s}
                </span>
                {i < FOUNDATION_STEPS.length - 1 ? (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Neither product design nor marketing spend moves these two scores, so the foundation work leads the
            programme sequence, ahead of any market-entry or platform spend.
          </p>
          <Disclosure label="The full statement" className="mt-3">
            <p>{FOUNDATION_STATEMENT}</p>
            <p className="mt-2 text-muted-foreground/60">{FOUNDATION_PROVENANCE}</p>
          </Disclosure>
        </GlassCard>
      </Section>
    </div>
  );
}

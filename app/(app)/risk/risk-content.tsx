'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Grid3X3, ListChecks, Target } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, EstText, DataTable } from '@/components/proposal/section';
import { RISKS, riskColour, TOP5_MITIGATIONS, Risk } from '@/lib/data/risks';

export default function RiskContent() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const selected = RISKS?.find?.((r: Risk) => r?.id === selectedId) ?? null;

  // Group risks by (likelihood, impact) cell
  const cellRisks = (l: number, i: number) =>
    RISKS?.filter?.((r: Risk) => r?.likelihood === l && r?.impact === i) ?? [];

  const impacts = [5, 4, 3, 2, 1];
  const likelihoods = [1, 2, 3, 4, 5];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 06 — Risk Analysis" title="The Risk Heat Map">
        <p className="max-w-3xl text-muted-foreground leading-relaxed mb-8">
          Ten risk categories assessed on likelihood and impact (1–5 each). Four risks sit at or near the
          maximum score, and the two highest-rated risks — entity ambiguity and the financial evidence gap —
          are the direct basis for the staged, evidence-led investment sequence. Select any marker to inspect its mitigation.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Heat map */}
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4 text-primary" />
              <h3 className="font-marquee text-sm font-bold uppercase tracking-wider text-foreground">Likelihood × Impact (10 risks)</h3>
            </div>
            <div className="flex">
              {/* Y axis label */}
              <div className="flex items-center pr-2">
                <span className="t-eyebrow rotate-180 [writing-mode:vertical-rl]">Impact →</span>
              </div>
              <div className="flex-1">
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
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-black shadow-lg transition-all hover:scale-110"
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
                <p className="t-eyebrow mb-1">Mitigation</p>
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
        <div className="grid gap-4 md:grid-cols-2">
          {(RISKS ?? []).map((r: Risk, idx: number) => (
            <motion.div
              key={r?.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 2) * 0.05 }}
            >
              <GlassCard className="h-full">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="h-4 w-4 text-primary" />
                    <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{r?.id}. {r?.name}</p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-black"
                    style={{ backgroundColor: riskColour(r?.score ?? 0) }}
                  >
                    {r?.score}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Likelihood {r?.likelihood} · Impact {r?.impact}</p>
                <p className="text-sm leading-relaxed text-foreground/85">{r?.mitigation}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Priority Actions" title="Top Five Mitigations">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <ListChecks className="h-4 w-4 text-primary" />
          <p className="text-sm">Ranked by urgency and leverage across the whole programme.</p>
        </div>
        <DataTable
          headers={['#', 'Risk', 'Mitigation']}
          rows={(TOP5_MITIGATIONS ?? []).map((m: any) => [String(m?.rank ?? ''), m?.risk ?? '', m?.mitigation ?? ''])}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          <EstText text="The two highest risks (entity ambiguity and financial evidence, both scored 25) cannot be mitigated by design or spend — only by documentary evidence. This is why the foundation work leads the programme sequence." />
        </p>
      </Section>
    </div>
  );
}

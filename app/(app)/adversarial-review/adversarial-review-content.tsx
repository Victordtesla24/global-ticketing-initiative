'use client';

import { motion } from 'framer-motion';
import { Scale, AlertTriangle, FileWarning, Landmark, Database, Gauge } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Section, GlassCard, StatCard, OrnamentDivider, StatusBadge, DataTable } from '@/components/proposal/section';
import { TagText } from '@/components/proposal/tag';
import {
  REVIEW_LEDE,
  REVIEW_AUDIT_NOTE,
  D6_ACTUAL,
  DELIVERABLE_RATINGS,
  D4_OPEN_ITEM,
  OVERALL_ASSESSMENT,
  OVERALL_ASSESSMENT_PROVENANCE,
  MISSING_ELEMENTS,
  MISSING_ELEMENTS_PROVENANCE,
  UNREALISTIC_ASSUMPTIONS,
  ASSUMPTIONS_OPEN_ITEM,
  ASSUMPTIONS_PROVENANCE,
  REGULATORY_GAPS,
  REGULATORY_GAPS_PROVENANCE,
  DATA_QUALITY_CONCERNS,
  DATA_QUALITY_PROVENANCE,
  FINDINGS_STATS,
  CONFIDENCE,
  QUALITY_GATES_INTRO,
  QUALITY_GATES,
  QG15_RESTRUCTURED,
  QUALITY_GATES_PROVENANCE,
} from '@/lib/data/review';

function ProvenanceNote({ text }: { text: string }) {
  return (
    <p className="mt-3 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">
      <TagText text={text} />
    </p>
  );
}

function OpenItemCallout({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">OPEN ITEM — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What is unknown:</span> <TagText text={item?.unknown ?? ''} /></p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

export default function AdversarialReviewContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 08 — Adversarial Review" title="The Case Against This Proposal">
        <p className="max-w-3xl leading-relaxed text-muted-foreground mb-6">{REVIEW_LEDE}</p>

        <Alert className="mb-8 max-w-3xl border-red-500/40 bg-red-500/5">
          <AlertTriangle className="h-4 w-4 !text-red-400" />
          <AlertTitle className="text-red-300">Adversarial audit — corrections applied to this page</AlertTitle>
          <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            <p>{REVIEW_AUDIT_NOTE?.removed}</p>
            <p className="mt-2">{REVIEW_AUDIT_NOTE?.detail}</p>
          </AlertDescription>
        </Alert>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <StatCard label={D6_ACTUAL?.confidence?.label ?? ''} value={D6_ACTUAL?.confidence?.value ?? ''} sub={D6_ACTUAL?.confidence?.note} />
          <StatCard label={D6_ACTUAL?.verdict?.label ?? ''} value={D6_ACTUAL?.verdict?.value ?? ''} sub={D6_ACTUAL?.verdict?.note} />
        </div>
        <p className="mb-10 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{D6_ACTUAL?.provenance}</p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">
          {(DELIVERABLE_RATINGS ?? []).map((d: any, i: number) => (
            <motion.div key={d?.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{d?.id}: {d?.name}</p>
                  {d?.rating ? (
                    <StatusBadge status={d.rating} />
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/40 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {d?.ratingLabel ?? 'RATING REMOVED'}
                    </span>
                  )}
                </div>
                {d?.strength ? (
                  <>
                    <p className="t-eyebrow mb-1">Strength</p>
                    <p className="mb-3 text-xs leading-relaxed text-foreground/80"><TagText text={d?.strength ?? ''} /></p>
                  </>
                ) : null}
                <p className="t-eyebrow mb-1">Weakness</p>
                <p className="mb-3 text-xs leading-relaxed text-foreground/80"><TagText text={d?.weakness ?? ''} /></p>
                <p className="t-eyebrow mb-1">Recommendation</p>
                <p className="text-xs leading-relaxed text-foreground/80"><TagText text={d?.recommendation ?? ''} /></p>
                {d?.id === 'D4' ? (
                  <div className="mt-3">
                    <OpenItemCallout item={D4_OPEN_ITEM} />
                  </div>
                ) : null}
                <ProvenanceNote text={d?.provenance ?? ''} />
              </GlassCard>
            </motion.div>
          ))}
          <GlassCard className="h-full border-primary/30">
            <div className="mb-3 flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-primary">Overall Assessment</p>
            </div>
            <p className="text-xs leading-relaxed text-foreground/85">{OVERALL_ASSESSMENT}</p>
            <ProvenanceNote text={OVERALL_ASSESSMENT_PROVENANCE} />
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Reviewer Judgement" title="Confidence Assessment">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            <StatCard
              label="Overall Confidence — D6 actual"
              value={`${CONFIDENCE?.overall ?? 0}% (verdict: ${CONFIDENCE?.verdict ?? ''})`}
              sub={CONFIDENCE?.note}
            />
            <GlassCard>
              <p className="t-eyebrow mb-2 text-emerald-400">Would Increase Confidence</p>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {(CONFIDENCE?.increase ?? []).map((s: string, i: number) => <li key={i}>+ {s}</li>)}
              </ul>
            </GlassCard>
            <GlassCard>
              <p className="t-eyebrow mb-2 text-red-400">Would Decrease Confidence</p>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {(CONFIDENCE?.decrease ?? []).map((s: string, i: number) => <li key={i}>− {s}</li>)}
              </ul>
              <ProvenanceNote text={CONFIDENCE?.listsProvenance ?? ''} />
            </GlassCard>
          </div>
          <GlassCard className="self-start">
            <div className="mb-4 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">Confidence by Dimension — Attested Rows Only</p>
            </div>
            <div className="space-y-4">
              {(CONFIDENCE?.dimensions ?? []).map((d: any, i: number) => (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-foreground">{d?.dim}</span>
                    <span className="text-primary font-bold">{d?.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: (d?.value ?? 0) >= 70 ? '#22C55E' : (d?.value ?? 0) >= 50 ? '#F59E0B' : '#DC2626' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d?.value ?? 0}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{d?.why}</p>
                </div>
              ))}
            </div>
            <ProvenanceNote text={CONFIDENCE?.dimensionsProvenance ?? ''} />
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Critical Findings" title="What The Review Found">
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(FINDINGS_STATS ?? []).map((s: any, i: number) => (
            <StatCard key={i} label={s?.label ?? ''} value={s?.value ?? ''} sub={s?.note} />
          ))}
        </div>

        <Tabs defaultValue="missing" className="w-full">
          <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="missing" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Missing Elements ({MISSING_ELEMENTS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="assumptions" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Unrealistic Assumptions ({UNREALISTIC_ASSUMPTIONS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="regulatory" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Regulatory Gaps ({REGULATORY_GAPS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="quality" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Data Quality ({DATA_QUALITY_CONCERNS?.length ?? 0} of 10)</TabsTrigger>
          </TabsList>

          <TabsContent value="missing">
            <div className="grid gap-3 md:grid-cols-2">
              {(MISSING_ELEMENTS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-sm text-foreground/85">
                      <span className="font-semibold">{m?.name}</span> — {m?.detail}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{MISSING_ELEMENTS_PROVENANCE}</p>
          </TabsContent>

          <TabsContent value="assumptions">
            <DataTable
              headers={['Assumption flagged by the review', 'Honest status today']}
              rows={(UNREALISTIC_ASSUMPTIONS ?? []).map((m: any) => [
                <span key="a" className="font-semibold text-foreground">{m?.assumption ?? ''}</span>,
                <TagText key="s" text={m?.status ?? ''} />,
              ])}
            />
            <div className="mt-4">
              <OpenItemCallout item={ASSUMPTIONS_OPEN_ITEM} />
            </div>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{ASSUMPTIONS_PROVENANCE}</p>
          </TabsContent>

          <TabsContent value="regulatory">
            <div className="grid gap-3 md:grid-cols-2">
              {(REGULATORY_GAPS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="text-sm text-foreground/85">
                      {m?.market ? `[${m.market}] ` : ''}{m?.gap ?? ''}{m?.action ? ` — ${m.action}` : ''}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{REGULATORY_GAPS_PROVENANCE}</p>
          </TabsContent>

          <TabsContent value="quality">
            <div className="grid gap-3 md:grid-cols-2">
              {(DATA_QUALITY_CONCERNS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <Database className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-sm text-foreground/85">
                      {m?.concern ?? ''}{m?.affected ? ` — Affects: ${m.affected}` : ''}{m?.safeguard ? ` — Safeguard: ${m.safeguard}` : ''}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60"><TagText text={DATA_QUALITY_PROVENANCE} /></p>
          </TabsContent>
        </Tabs>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Quality Assurance" title="Gate Report — 7 of 15 Rows Survive">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{QUALITY_GATES_INTRO}</p>
        <DataTable
          headers={['Gate', 'Condition', 'Status', 'Audit cross-check']}
          rows={(QUALITY_GATES ?? []).map((g: any) => [
            g?.id ?? '',
            g?.condition ?? '',
            <span key={g?.id} className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <StatusBadge status={g?.status ?? ''} />
              {g?.selfAssessed ? <span className="text-[10px] text-muted-foreground">(self-assessed)</span> : null}
            </span>,
            g?.crossCheck ?? '',
          ])}
        />
        <GlassCard className="mt-6 border-amber-500/30">
          <p className="text-sm leading-relaxed text-foreground/85"><TagText text={QG15_RESTRUCTURED} /></p>
        </GlassCard>
        <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/60">{QUALITY_GATES_PROVENANCE}</p>
      </Section>
    </div>
  );
}

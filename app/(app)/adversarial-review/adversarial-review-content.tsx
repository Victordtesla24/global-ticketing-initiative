'use client';

import { motion } from 'framer-motion';
import { Scale, AlertTriangle, FileWarning, Landmark, Database, Gauge } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Section, GlassCard, StatCard, OrnamentDivider, StatusBadge, EstText, DataTable } from '@/components/proposal/section';
import {
  DELIVERABLE_RATINGS,
  OVERALL_ASSESSMENT,
  MISSING_ELEMENTS,
  UNREALISTIC_ASSUMPTIONS,
  REGULATORY_GAPS,
  DATA_QUALITY_CONCERNS,
  CONFIDENCE,
  QUALITY_GATES,
} from '@/lib/data/review';

export default function AdversarialReviewContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 08 — Adversarial Review" title="The Case Against This Proposal">
        <p className="max-w-3xl leading-relaxed text-muted-foreground mb-8">
          Every deliverable in this package was subjected to a genuinely critical internal review (Deliverable 6).
          The findings below are presented unedited — including the ratings that go against the package itself.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">
          {(DELIVERABLE_RATINGS ?? []).map((d: any, i: number) => (
            <motion.div key={d?.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <GlassCard className="h-full">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{d?.id}: {d?.name}</p>
                  <StatusBadge status={d?.rating ?? ''} />
                </div>
                <p className="t-eyebrow mb-1">Strength</p>
                <p className="mb-3 text-xs leading-relaxed text-foreground/80"><EstText text={d?.strength ?? ''} /></p>
                <p className="t-eyebrow mb-1">Weakness</p>
                <p className="mb-3 text-xs leading-relaxed text-foreground/80"><EstText text={d?.weakness ?? ''} /></p>
                <p className="t-eyebrow mb-1">Recommendation</p>
                <p className="text-xs leading-relaxed text-foreground/80"><EstText text={d?.recommendation ?? ''} /></p>
              </GlassCard>
            </motion.div>
          ))}
          <GlassCard className="h-full border-primary/30">
            <div className="mb-3 flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-primary">Overall Assessment</p>
            </div>
            <p className="text-xs leading-relaxed text-foreground/85">{OVERALL_ASSESSMENT}</p>
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Reviewer Judgement" title="Confidence Assessment">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            <StatCard label="Overall Confidence" value={`${CONFIDENCE?.overall ?? 0}%`} sub={CONFIDENCE?.note} />
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
            </GlassCard>
          </div>
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">Confidence by Dimension</p>
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
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Critical Findings" title="What The Review Found">
        <Tabs defaultValue="missing" className="w-full">
          <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="missing" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Missing Elements ({MISSING_ELEMENTS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="assumptions" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Unrealistic Assumptions ({UNREALISTIC_ASSUMPTIONS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="regulatory" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Regulatory Gaps ({REGULATORY_GAPS?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="quality" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Data Quality ({DATA_QUALITY_CONCERNS?.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="missing">
            <div className="grid gap-3 md:grid-cols-2">
              {(MISSING_ELEMENTS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-sm text-foreground/85">
                      <EstText text={typeof m === 'string' ? m : `${m?.element ?? m?.item ?? ''}${m?.why ? ' — ' + m.why : ''}${m?.detail ? ' — ' + m.detail : ''}`} />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assumptions">
            <div className="grid gap-3 md:grid-cols-2">
              {(UNREALISTIC_ASSUMPTIONS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <div className="text-sm text-foreground/85">
                      <EstText text={typeof m === 'string' ? m : `${m?.assumption ?? m?.item ?? ''}${m?.reality ? ' — Reality: ' + m.reality : ''}${m?.why ? ' — ' + m.why : ''}`} />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regulatory">
            <div className="grid gap-3 md:grid-cols-2">
              {(REGULATORY_GAPS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="text-sm text-foreground/85">
                      <EstText text={typeof m === 'string' ? m : `${m?.market ? '[' + m.market + '] ' : ''}${m?.gap ?? m?.item ?? ''}${m?.detail ? ' — ' + m.detail : ''}`} />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quality">
            <div className="grid gap-3 md:grid-cols-2">
              {(DATA_QUALITY_CONCERNS ?? []).map((m: any, i: number) => (
                <GlassCard key={i} className="py-4">
                  <div className="flex items-start gap-3">
                    <Database className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-sm text-foreground/85">
                      <EstText text={typeof m === 'string' ? m : `${m?.concern ?? m?.item ?? ''}${m?.affected ? ' — Affects: ' + m.affected : ''}${m?.safeguard ? ' — Safeguard: ' + m.safeguard : ''}`} />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Quality Assurance" title="Quality Gate Report — 15 Gates">
        <DataTable
          headers={['Gate', 'Condition', 'Status']}
          rows={(QUALITY_GATES ?? []).map((g: any) => [g?.id ?? '', g?.condition ?? '', <StatusBadge key={g?.id} status={g?.status ?? ''} />])}
        />
        <p className="mt-4 text-sm text-muted-foreground">13 of 15 gates passed. QG-03 (URL verification) and QG-12 (HR cost sourcing) are partial — both are disclosed rather than hidden.</p>
      </Section>
    </div>
  );
}

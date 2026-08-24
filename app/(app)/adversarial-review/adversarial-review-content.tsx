'use client';

import { motion } from 'framer-motion';
import { Scale, FileWarning, Landmark, Database, Gauge, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Section, GlassCard, StatCard, OrnamentDivider, StatusBadge, DataTable } from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import {
  REVIEW_LEDE,
  INDEPENDENT_REVIEW,
  DELIVERABLE_RATINGS,
  OVERALL_ASSESSMENT,
  OVERALL_ASSESSMENT_PROVENANCE,
  MISSING_ELEMENTS,
  MISSING_ELEMENTS_PROVENANCE,
  UNREALISTIC_ASSUMPTIONS,
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

/* Gauge bar in the house green / amber / red scale. */
function Meter({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="h-full rounded-full"
        style={{ background: value >= 70 ? '#22C55E' : value >= 50 ? '#F59E0B' : '#DC2626' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
    </div>
  );
}

const SEVERITY_STYLES: Record<string, string> = {
  Critical: 'border-red-500/40 bg-red-500/15 text-red-400',
  High: 'border-amber-500/40 bg-amber-500/15 text-amber-400',
  Medium: 'border-primary/40 bg-primary/15 text-primary',
};

function SeverityPill({ severity }: { severity: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.Medium
      }`}
    >
      {severity}
    </span>
  );
}

function SourceNote({ text }: { text: string }) {
  return (
    <p className="mt-3 border-t border-border/40 pt-2 text-[12px] leading-relaxed text-muted-foreground/60">{text}</p>
  );
}

/* The counted figures behind each deliverable rating, lifted out of the prose so the
   scorecard carries them and the wording keeps its place in the folds below. */
const DELIVERABLE_FIGURES: Record<string, Figure[]> = {
  'Deliverable 1': [
    { v: '60', l: 'Catalogue entries, across six categories' },
    { v: 'A:9 · B:18 · C:12 · D:7 · E:8 · F:6', l: 'Entries by category' },
    { v: '15 of 60', l: 'Provider URLs flagged unverified' },
    { v: '31 of 38', l: 'Paid entries on estimate-only pricing (81.6%)' },
  ],
  'Deliverable 2': [
    { v: '3–5x', l: 'Cost-range span at every layer' },
    { v: '5x · 5x · 3x · 4x', l: 'Warehouse · query · batch ingestion · streaming' },
    { v: '±30%', l: 'The narrowing the review asks for' },
  ],
  'Deliverable 4': [
    { v: 'AUD 2.76m', l: 'Cumulative losses, in the review’s quoted critique' },
    { v: 'AUD 12.6m', l: 'Programme TCO the critique says those losses exclude' },
    { v: '2,760,772', l: 'AU 1,526,232 + UK 299,250 + USA 493,150 + Canada 203,140 + EU 239,000' },
    { v: '12.62m vs 12.091m', l: 'Total-cost headline against the package’s own table' },
  ],
  'Deliverable 5': [
    { v: 'AUD 5m–25m', l: 'Total cost of ownership span quoted — a 5x range' },
    { v: '20%', l: 'On-cost assumption, never validated against state payroll tax' },
  ],
};

const DELIVERABLE_NOTES: Record<string, string> = {
  'Deliverable 4': 'Quoted critique of the original package — this proposal carries forward neither figure.',
};

/* The figures the data-quality row-by-row check turns on. */
const DATA_QUALITY_CROSSCHECK: Figure[] = [
  { v: '100,000+', l: 'Google Play downloads — the India-only product' },
  { v: '64%', l: 'ABS attendance, 2021-22 (abs.gov.au) — a COVID-affected window' },
  { v: '82.4%', l: 'ABS attendance, pre-pandemic 2017-18' },
  { v: '21-10-0186-01', l: 'The Statistics Canada table the package recorded as none found' },
  { v: 'AUD 830.00', l: 'The only actual programme spend' },
];

/* QG-15: the ledger the gate certified, priced at what was really spent. */
const QG15_FIGURES: Figure[] = [
  { v: 'AUD 830.00', l: 'The only actual programme spend' },
  { v: 'AUD 350.00', l: 'AI subscriptions and API credits' },
  { v: 'AUD 480.00', l: 'Consultation — 8.0 hours × AUD 60.00/hr' },
];

export default function AdversarialReviewContent() {
  const ratings = DELIVERABLE_RATINGS ?? [];
  const amberCount = ratings.filter((d) => d?.rating === 'AMBER').length;
  const redCount = ratings.filter((d) => d?.rating === 'RED').length;
  const unratedCount = ratings.filter((d) => !d?.rating).length;

  const gates = QUALITY_GATES ?? [];
  const gatePass = gates.filter((g) => g?.status === 'PASS').length;
  const gatePartial = gates.filter((g) => g?.status === 'PARTIAL').length;
  const gateSelf = gates.filter((g) => g?.selfAssessed).length;

  const tally: { n: number; status: string; label: string }[] = [
    { n: amberCount, status: 'AMBER', label: `of ${ratings.length} deliverables` },
    { n: redCount, status: 'RED', label: `of ${ratings.length} deliverables` },
    { n: unratedCount, status: 'NOT RATED', label: `of ${ratings.length} deliverables` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow="Section 08 — Adversarial Review" title="The Case Against This Proposal">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">{REVIEW_LEDE}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="flex flex-col gap-3">
            <p className="t-eyebrow">{INDEPENDENT_REVIEW?.confidence?.label ?? ''}</p>
            <p className="font-marquee text-4xl font-black uppercase leading-none text-primary md:text-5xl">
              {INDEPENDENT_REVIEW?.confidence?.value ?? ''}
            </p>
            <Meter value={CONFIDENCE?.overall ?? 0} />
            <p className="text-sm leading-snug text-muted-foreground">{INDEPENDENT_REVIEW?.confidence?.note}</p>
          </GlassCard>
          <GlassCard className="flex flex-col gap-3">
            <p className="t-eyebrow">{INDEPENDENT_REVIEW?.verdict?.label ?? ''}</p>
            <p className="font-marquee text-4xl font-black uppercase leading-none text-primary md:text-5xl">
              {INDEPENDENT_REVIEW?.verdict?.value ?? ''}
            </p>
            <StatusBadge status={INDEPENDENT_REVIEW?.verdict?.value ?? ''} className="self-start" />
            <p className="text-sm leading-snug text-muted-foreground">{INDEPENDENT_REVIEW?.verdict?.note}</p>
          </GlassCard>
        </div>
        <Disclosure label="Provenance" className="mt-3 max-w-3xl">
          {INDEPENDENT_REVIEW?.provenance}
        </Disclosure>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {tally.map((t) => (
            <div
              key={t.status}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/20 px-4 py-3"
            >
              <span className="font-marquee text-3xl font-black leading-none text-primary">{t.n}</span>
              <span className="flex flex-col gap-1">
                <StatusBadge status={t.status} className="self-start" />
                <span className="text-[11.5px] text-muted-foreground">{t.label}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ratings.map((d: any, i: number) => {
            const figures = DELIVERABLE_FIGURES[d?.id ?? ''] ?? [];
            const note = DELIVERABLE_NOTES[d?.id ?? ''];
            return (
              <motion.div
                key={d?.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="h-full"
              >
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span>
                      <span className="t-eyebrow block">{d?.id}</span>
                      <span className="mt-1 block font-marquee text-sm font-bold uppercase tracking-wide text-foreground">
                        {d?.name}
                      </span>
                    </span>
                    {d?.rating ? (
                      <StatusBadge status={d.rating} />
                    ) : (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-border/60 bg-secondary/40 px-3 py-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {d?.ratingLabel ?? 'NOT RATED'}
                      </span>
                    )}
                  </div>

                  {figures.length ? (
                    <div className="space-y-2">
                      {figures.map((f) => (
                        <FigureTile key={f.v + f.l} figure={f} />
                      ))}
                    </div>
                  ) : null}

                  {note ? <p className="mt-3 text-[12px] leading-relaxed text-amber-300/90">{note}</p> : null}

                  <div className="mt-auto pt-4">
                    <Disclosure label="The assessment">
                      {d?.strength ? (
                        <>
                          <p className="t-eyebrow mb-1">Strength</p>
                          <p className="mb-2">{d?.strength ?? ''}</p>
                        </>
                      ) : null}
                      <p className="t-eyebrow mb-1">Weakness</p>
                      <p className="mb-2">{d?.weakness ?? ''}</p>
                      <p className="t-eyebrow mb-1">Recommendation</p>
                      <p>{d?.recommendation ?? ''}</p>
                    </Disclosure>
                    <Disclosure label="Provenance" className="mt-2">
                      {d?.provenance ?? ''}
                    </Disclosure>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}

          <GlassCard className="flex h-full flex-col border-primary/30">
            <div className="mb-3 flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-primary">Overall Assessment</p>
            </div>
            <StatusBadge status={INDEPENDENT_REVIEW?.verdict?.value ?? ''} className="self-start" />
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
              Treat the package as a structured hypothesis to be tested through verification, not as an investment
              memorandum.
            </p>
            <div className="pt-4">
              <Disclosure label="The assessment">{OVERALL_ASSESSMENT}</Disclosure>
              <Disclosure label="Provenance" className="mt-2">
                {OVERALL_ASSESSMENT_PROVENANCE}
              </Disclosure>
            </div>
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Reviewer Judgement" title="Confidence Assessment">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            <GlassCard className="flex flex-col gap-3">
              <p className="t-eyebrow">Overall Confidence</p>
              <p className="font-marquee text-4xl font-black uppercase leading-none text-primary md:text-5xl">
                {CONFIDENCE?.overall ?? 0}%
              </p>
              <Meter value={CONFIDENCE?.overall ?? 0} />
              <span className="flex items-center gap-2">
                <span className="t-eyebrow">Verdict</span>
                <StatusBadge status={CONFIDENCE?.verdict ?? ''} />
              </span>
              <p className="text-sm leading-snug text-muted-foreground">{CONFIDENCE?.note}</p>
            </GlassCard>
            <GlassCard>
              <p className="t-eyebrow mb-2 text-emerald-400">Would Increase Confidence</p>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {(CONFIDENCE?.increase ?? []).map((s: string, i: number) => (
                  <li key={i}>+ {s}</li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <p className="t-eyebrow mb-2 text-red-400">Would Decrease Confidence</p>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {(CONFIDENCE?.decrease ?? []).map((s: string, i: number) => (
                  <li key={i}>− {s}</li>
                ))}
              </ul>
              <Disclosure label="Provenance" className="mt-3">
                {CONFIDENCE?.listsProvenance ?? ''}
              </Disclosure>
            </GlassCard>
          </div>
          <GlassCard className="self-start">
            <div className="mb-4 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">
                Confidence by Dimension
              </p>
            </div>
            <div className="space-y-4">
              {(CONFIDENCE?.dimensions ?? []).map((d: any, i: number) => (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-foreground">{d?.dim}</span>
                    <span className="font-bold text-primary">{d?.value}%</span>
                  </div>
                  <Meter value={d?.value ?? 0} delay={i * 0.05} />
                  <p className="mt-1 text-[12px] text-muted-foreground">{d?.why}</p>
                </div>
              ))}
            </div>
            <Disclosure label="Provenance" className="mt-4">
              {CONFIDENCE?.dimensionsProvenance ?? ''}
            </Disclosure>
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
            <TabsTrigger value="quality" className="rounded-full border border-border/60 px-4 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Data Quality ({DATA_QUALITY_CONCERNS?.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="missing">
            <div className="grid gap-3 md:grid-cols-2">
              {(MISSING_ELEMENTS ?? []).map((m: any, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/20 px-4 py-3"
                >
                  <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>
                    <span className="block font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">
                      {m?.name}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{m?.detail}</span>
                  </span>
                </div>
              ))}
            </div>
            <Disclosure label="Provenance" className="mt-4 max-w-3xl">
              {MISSING_ELEMENTS_PROVENANCE}
            </Disclosure>
          </TabsContent>

          <TabsContent value="assumptions">
            <DataTable
              headers={['Assumption flagged by the review', 'Where it stands today']}
              rows={(UNREALISTIC_ASSUMPTIONS ?? []).map((m: any) => [
                <span key="a" className="font-semibold text-foreground">{m?.assumption ?? ''}</span>,
                m?.status ?? '',
              ])}
            />
            <Disclosure label="Provenance" className="mt-4 max-w-3xl">
              {ASSUMPTIONS_PROVENANCE}
            </Disclosure>
          </TabsContent>

          <TabsContent value="regulatory">
            <div className="mb-3 flex items-center gap-2">
              <Landmark className="h-4 w-4 shrink-0 text-primary" />
              <p className="t-eyebrow">{REGULATORY_GAPS?.length ?? 0} gaps, by market and severity</p>
            </div>
            <DataTable
              headers={['Market', 'Gap', 'Severity', 'What it requires']}
              rows={(REGULATORY_GAPS ?? []).map((m: any) => [
                <span key="m" className="whitespace-nowrap font-mono text-[12px] font-semibold text-primary">{m?.market ?? ''}</span>,
                <span key="g" className="font-semibold text-foreground">{m?.gap ?? ''}</span>,
                <SeverityPill key="s" severity={m?.severity ?? ''} />,
                m?.action ?? '',
              ])}
            />
            <Disclosure label="Provenance" className="mt-4 max-w-3xl">
              {REGULATORY_GAPS_PROVENANCE}
            </Disclosure>
          </TabsContent>

          <TabsContent value="quality">
            <div className="mb-3 flex items-center gap-2">
              <Database className="h-4 w-4 shrink-0 text-amber-400" />
              <p className="t-eyebrow">{DATA_QUALITY_CONCERNS?.length ?? 0} concerns, each with a stated safeguard</p>
            </div>
            <DataTable
              headers={['Concern', 'Affects', 'Safeguard']}
              rows={(DATA_QUALITY_CONCERNS ?? []).map((m: any) => [
                <span key="c" className="font-semibold text-foreground">{m?.concern ?? ''}</span>,
                <span key="a" className="whitespace-nowrap text-[12.5px] text-muted-foreground">{m?.affected ?? ''}</span>,
                m?.safeguard ?? '',
              ])}
            />
            <p className="t-eyebrow mb-3 mt-6">The figures the row-by-row check turns on</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {DATA_QUALITY_CROSSCHECK.map((f) => (
                <FigureTile key={f.v} figure={f} />
              ))}
            </div>
            <Disclosure label="Provenance" className="mt-4 max-w-3xl">
              {DATA_QUALITY_PROVENANCE}
            </Disclosure>
          </TabsContent>
        </Tabs>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Quality Assurance" title="Gate Report">
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <StatCard label="Gates certifying a pass" value={String(gatePass)} sub={`Of ${gates.length} gates on the scorecard.`} />
          <StatCard label="Gates certifying partial" value={String(gatePartial)} sub="Each carries an independent cross-check." />
          <StatCard label="Self-assessed passes" value={String(gateSelf)} sub="The party that produced the work also assigned the verdict." />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {gatePass} of the {gates.length} gates certify a pass and {gatePartial} are partial; {gateSelf} of those
            passes are self-assessed.
          </p>
        </div>
        <Disclosure label="How the gate rows were checked" className="mb-4 max-w-3xl">
          {QUALITY_GATES_INTRO}
        </Disclosure>
        <DataTable
          headers={['Gate', 'Condition', 'Status', 'Independent cross-check']}
          rows={gates.map((g: any) => [
            <span key="id" className="whitespace-nowrap font-mono text-[12px] font-semibold text-primary">{g?.id ?? ''}</span>,
            g?.condition ?? '',
            <span key={g?.id} className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <StatusBadge status={g?.status ?? ''} />
              {g?.selfAssessed ? <span className="text-[11px] text-muted-foreground">(self-assessed)</span> : null}
            </span>,
            g?.crossCheck ?? '',
          ])}
        />

        <GlassCard className="mt-6 border-amber-500/30">
          <p className="t-eyebrow mb-3">QG-15 — the AI cost ledger</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {QG15_FIGURES.map((f) => (
              <FigureTile key={f.v} figure={f} />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">
            The gate certified an estimate as an invoice-ready document. Formatting an estimate as an invoice is not a
            quality achievement.
          </p>
          <Disclosure label="The full working" className="mt-3">
            {QG15_RESTRUCTURED}
          </Disclosure>
        </GlassCard>
        <SourceNote text={QUALITY_GATES_PROVENANCE} />
      </Section>
    </div>
  );
}

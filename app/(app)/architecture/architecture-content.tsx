'use client';

import { Database, TrendingUp, ShieldCheck, Timer, Globe, Zap } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import { Tag } from '@/components/proposal/tag';
import ArchitectureGraph from '@/components/proposal/architecture-graph';
import {
  ARCH_LEDE, ARCH_RECONCILIATION,
  DATA_MARTS, SCALABILITY,
  TECH_COMPARISON, TECH_COMPARISON_NOTE, APPROVAL_GATES, APPROVAL_GATES_NOTE,
  RETENTION, TRANSFER_ROUTES, TRANSFER_ROUTES_NOTE,
} from '@/lib/data/architecture';

/* The five measured triggers on which any growth layer may be re-proposed,
   lifted from the reconciliation so they read at a glance. */
const GROWTH_TRIGGERS = [
  'Storage > 100 GB sustained',
  'Scans > 1 TB/month',
  'Dashboard readers > 8',
  'A Spark-only transform',
  'First AU customer record',
];

export default function ArchitectureContent() {
  return (
    <div>
      <p className="t-eyebrow mb-3">Section 04</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Data <span className="text-primary">Architecture</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        The engine room of the Vision Statement — a medallion lakehouse on AWS, serverless-first, with consent and
        data-residency controls built in from day one.
      </p>
      <Disclosure label="The design intent, in full" className="mt-4 max-w-3xl">
        {ARCH_LEDE}
      </Disclosure>

      <GlassCard className="mt-6">
        <p className="t-eyebrow mb-1">{ARCH_RECONCILIATION.label}</p>
        <p className="font-marquee text-lg font-bold uppercase tracking-wide text-foreground">
          {ARCH_RECONCILIATION.value}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-secondary/20 p-4">
            <p className="t-eyebrow mb-1.5">Run Cost</p>
            <p className="font-marquee text-xl font-bold uppercase leading-tight text-primary md:text-2xl">
              A$46.43/mo
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
              <Tag tag="DERIVED" className="mr-1" />
              Monthly-cancellable, from the vendors&rsquo; own published Sydney prices.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-secondary/20 p-4">
            <p className="t-eyebrow mb-1.5">Setup</p>
            <p className="font-marquee text-xl font-bold uppercase leading-tight text-primary md:text-2xl">
              8.0 days
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
              7.0 of them committable before the first-party data is disclosed.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-secondary/20 p-4">
            <p className="t-eyebrow mb-1.5">Day-1 Roster</p>
            <p className="font-marquee text-xl font-bold uppercase leading-tight text-primary md:text-2xl">
              One fractional analyst
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
              No data-engineering hires priced — not &ldquo;2–3 data engineers&rdquo;.
            </p>
          </div>
        </div>

        <p className="t-eyebrow mt-6 mb-2">The working — line by line</p>
        <DataTable
          headers={['Line Item', 'Assumed Volume', 'Published Rate', 'Monthly']}
          rows={[
            ['S3 storage', '5 GB stored', 'US$0.025/GB-month', 'US$0.125'],
            ['Athena', '10 GB scanned per month', 'US$5.00/TB', 'US$0.05'],
            ['QuickSight', '1 author + 3 board readers', 'US$24/mo per author · US$3/mo per reader', 'US$33.00'],
            ['Glue Data Catalog', '—', 'Published free tier', 'A$0'],
            ['dbt Core', '—', 'Open source', 'A$0'],
            [
              <span key="t" className="font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
                Total
              </span>,
              '',
              'US$33.175/mo ÷ 0.7145 (RBA rate, 21 August 2026)',
              <span key="v" className="whitespace-nowrap font-marquee font-bold text-primary">
                A$46.43/mo
              </span>,
            ],
          ]}
        />
        <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
          The four rates are the vendors&rsquo; own published Sydney prices, applied to the assumed volumes shown.
          Metabase OSS self-hosted stands as the A$0 BI alternative — &ldquo;Free unlimited users&rdquo; on its own
          pricing page.
        </p>

        <div className="mt-5">
          <p className="t-eyebrow mb-2 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 shrink-0" />
            Growth layers return only on a measured trigger
          </p>
          <div className="flex flex-wrap gap-2">
            {GROWTH_TRIGGERS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[12px] font-semibold tracking-wide text-amber-300"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
            The full 10-layer lakehouse in the graph below is post-G2, trigger-gated growth design — each heavier layer
            may be re-proposed only against a trigger above.
          </p>
        </div>

        <Disclosure label="The full working" className="mt-5">
          <p>{ARCH_RECONCILIATION.note}</p>
          <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-primary/80">
            Source: {ARCH_RECONCILIATION.provenance}
          </p>
        </Disclosure>
      </GlassCard>

      <Section
        eyebrow="Interactive · End-to-End Architecture"
        title="From Source Systems to Marketing Activation"
        className="mt-10"
      >
        <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Every box opens in one plain sentence — and <span className="font-semibold text-primary">Follow one ticket</span>{' '}
          traces a single sample transaction along the whole path.
        </p>
        <GlassCard className="p-3 md:p-5">
          <ArchitectureGraph />
        </GlassCard>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          The post-trigger target design — the committed MVP build is the five-component stack costed above.
        </p>
        <Disclosure label="How to read the graph" className="mt-3 max-w-3xl">
          <p>
            Every box below is a working part of the design, and every one of them opens: what it is in one plain
            sentence, what happens to the data there, the sample file or dashboard on the prototype page that stands
            behind it, how that layer is charged, and what can go wrong there. Use{' '}
            <span className="font-semibold text-primary">Follow one ticket</span> to watch a single sample transaction
            travel the whole path.
          </p>
          <p className="mt-2">
            Per the reconciliation above, this is the post-trigger target design, not the committed MVP build. Each node
            names the basis on which that layer is charged and points back to the one costed stack — the committed MVP
            bill of materials at the top of this page.
          </p>
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Consumption" title="Five Data Marts">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(DATA_MARTS ?? []).map((m: any, i: number) => (
            <GlassCard key={i} className="flex h-full flex-col">
              <div className="mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <p className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">{m?.name}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{m?.purpose}</p>
              <div className="mt-3 space-y-1.5 text-[12px] text-muted-foreground">
                <p><span className="font-semibold text-foreground/70">Key metrics:</span> {m?.metrics}</p>
                <p><span className="font-semibold text-foreground/70">Access:</span> {m?.access}</p>
                <p><span className="font-semibold text-foreground/70">Refresh:</span> {m?.refresh}</p>
                <p><span className="font-semibold text-amber-400/90">Sensitive:</span> {m?.sensitive}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Growth Path" title="Scalability Roadmap — Posture, Infrastructure and Team Shape">
        <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Design intent, not committed spend — the A$46.43/mo run cost buys none of the Stage 1–3 infrastructure below.
        </p>
        <Disclosure label="What the run cost does and does not buy" className="mb-5 max-w-3xl">
          Infrastructure and team shape for each stage stand as design intent. The A$46.43/mo in the reconciliation
          above prices the day-1 MVP stack and nothing beyond it: it buys none of the Stage 1–3 infrastructure listed
          here, and it is not a floor or a per-stage cost. Each stage is entered on its stated trigger.
        </Disclosure>
        <div className="grid gap-4 lg:grid-cols-3">
          {(SCALABILITY ?? []).map((s: any, i: number) => (
            <GlassCard key={i} className="relative flex h-full flex-col overflow-hidden">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{s?.stage}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{s?.posture}</p>
              <div className="mt-3 space-y-1.5 text-[12px] text-muted-foreground">
                <p><span className="font-semibold text-foreground/70">Infrastructure:</span> {s?.infra}</p>
                <p><span className="font-semibold text-foreground/70">Team:</span> {s?.team}</p>
                <p><span className="font-semibold text-foreground/70">Trigger to advance:</span> {s?.trigger}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Procurement" title="Technology Options by Layer">
        <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Three products per layer, priced on the basis shown — the workload that selects between them is settled at
          gate G2.
        </p>
        <Disclosure label="How to read this table" className="mb-4 max-w-3xl">
          {TECH_COMPARISON_NOTE}
        </Disclosure>
        <DataTable
          headers={['Layer', 'Recommended', 'Alternative', 'Premium Alternative', 'Pricing Basis']}
          rows={(TECH_COMPARISON ?? []).map((t: any) => [t?.layer ?? '', t?.opt1 ?? '', t?.opt2 ?? '', t?.opt3 ?? '', t?.pricing ?? ''])}
        />
      </Section>

      <Section eyebrow="Governance" title="Technology Approval Gates — No Gate, No Spend">
        <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Five engineering gates, TG-0 to TG-4 — numbered apart from the financial decision schedule, which runs
          G0–G2 only.
        </p>
        <Disclosure label="How TG numbering maps to G0–G2" className="mb-4 max-w-3xl">
          {APPROVAL_GATES_NOTE}
        </Disclosure>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {(APPROVAL_GATES ?? []).map((g: any, i: number) => (
            <GlassCard key={i} className="h-full !p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">{g?.gate}</p>
              </div>
              <p className="text-[13px] leading-snug text-muted-foreground">{g?.evidence}</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-red-400/90">If failed: {g?.outcome}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Compliance by Design" title="Retention & Cross-Border Transfers">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">Retention Policy</p>
            </div>
            <DataTable
              headers={['Data Type', 'Retention', 'Rationale']}
              rows={(RETENTION ?? []).map((r: any) => [r?.type ?? '', r?.retention ?? '', r?.why ?? ''])}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">Transfer Mechanisms</p>
            </div>
            <DataTable
              headers={['Route', 'Legal Mechanism']}
              rows={(TRANSFER_ROUTES ?? []).map((r: any) => [r?.route ?? '', r?.mechanism ?? ''])}
            />
            <Disclosure label="The Canada route, in full" className="mt-3">
              {TRANSFER_ROUTES_NOTE}
            </Disclosure>
          </div>
        </div>
      </Section>

      {/* No posture or reviewer-rating tile belongs here: this page names no external reviewer, so
          any rating shown here would be a self-assigned verdict. If one is ever added it must name
          the reviewer, or carry the same self-assessment note the Risk page uses. */}
      <div className="grid gap-4">
        <GlassCard className="flex flex-col gap-2">
          <p className="t-eyebrow">Committed MVP Run Cost</p>
          <p className="font-marquee text-2xl font-bold uppercase leading-tight text-primary md:text-3xl">
            A$46.43/mo
          </p>
          <p className="text-sm leading-snug text-muted-foreground">
            <Tag tag="DERIVED" className="mr-1" />
            The committed MVP bill of materials, monthly-cancellable.
          </p>
          <Disclosure label="How this figure is built" className="mt-1">
            Calculated — the committed MVP bill of materials, monthly-cancellable. The working: S3 storage 5 GB at
            US$0.025/GB-month = US$0.125, Athena 10 GB scanned at US$5.00/TB = US$0.05, and QuickSight 1 author at
            US$24/mo plus 3 readers at US$3/mo = US$33.00, with Glue Data Catalog on its published free tier and dbt
            Core, open source, at A$0 — US$33.175/mo, ÷ 0.7145 (RBA rate, 21 August 2026) = A$46.43/mo. The four rates
            are the vendors&rsquo; own published Sydney prices, applied to assumed volumes of 5 GB stored, 10 GB scanned per
            month, and 1 author plus 3 board readers. Exceed a volume and the line is recalculated.
          </Disclosure>
        </GlassCard>
      </div>
    </div>
  );
}

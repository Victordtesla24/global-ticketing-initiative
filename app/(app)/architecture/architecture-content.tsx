'use client';

import { Database, TrendingUp, ShieldCheck, Timer, Globe, AlertTriangle } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable, StatCard } from '@/components/proposal/section';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import ArchitectureGraph from '@/components/proposal/architecture-graph';
import {
  ARCH_LEDE, ARCH_RECONCILIATION,
  DATA_MARTS, SCALABILITY, SCALABILITY_OPEN_ITEM,
  TECH_COMPARISON, TECH_COMPARISON_NOTE, APPROVAL_GATES, APPROVAL_GATES_NOTE,
  RETENTION, TRANSFER_ROUTES, TRANSFER_ROUTES_NOTE,
} from '@/lib/data/architecture';

export default function ArchitectureContent() {
  return (
    <div>
      <p className="t-eyebrow mb-3">Section 04</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Data <span className="text-primary">Architecture</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{ARCH_LEDE}</p>

      <GlassCard className="mt-6">
        <p className="t-eyebrow mb-1">{ARCH_RECONCILIATION.label}</p>
        <p className="font-marquee text-lg font-bold uppercase tracking-wide text-foreground">
          {ARCH_RECONCILIATION.value}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{ARCH_RECONCILIATION.note}</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-primary/80">
          Source: {ARCH_RECONCILIATION.provenance}
        </p>
      </GlassCard>

      <Section
        eyebrow="Interactive · End-to-End Architecture"
        title="From Source Systems to Marketing Activation"
        className="mt-10"
      >
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Every box below is a working part of the design, and every one of them opens: what it is in one plain
          sentence, what happens to the data there, the sample file or dashboard on the prototype page that stands
          behind it, how that layer is charged, and what can go wrong there. Use{' '}
          <span className="font-semibold text-primary">Follow one ticket</span> to watch a single sample transaction
          travel the whole path.
        </p>
        <GlassCard className="p-3 md:p-5">
          <ArchitectureGraph />
        </GlassCard>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          Per the reconciliation above, this is the post-trigger target design, not the committed MVP build. No cost
          line is published for any individual layer: none could cite a unit rate or a workload basis, so each node
          names the basis on which that layer is charged and points back to the one costed stack — the committed MVP
          bill of materials at the top of this page.
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Consumption" title="Five Data Marts">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(DATA_MARTS ?? []).map((m: any, i: number) => (
            <GlassCard key={i} className="flex h-full flex-col">
              <div className="mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <p className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">{m?.name}</p>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{m?.purpose}</p>
              <div className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
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
        <Alert className="mb-4 border-amber-500/40 bg-amber-500/5">
          <AlertTriangle className="h-4 w-4 !text-amber-400" />
          <AlertTitle className="text-amber-300">Outstanding before decision — {SCALABILITY_OPEN_ITEM.title}</AlertTitle>
          <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            <p><span className="font-semibold text-foreground/80">What must be obtained:</span> {SCALABILITY_OPEN_ITEM.unknown}</p>
            <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {SCALABILITY_OPEN_ITEM.owner}</p>
            <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {SCALABILITY_OPEN_ITEM.action}</p>
          </AlertDescription>
        </Alert>
        <div className="grid gap-4 lg:grid-cols-3">
          {(SCALABILITY ?? []).map((s: any, i: number) => (
            <GlassCard key={i} className="relative flex h-full flex-col overflow-hidden">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{s?.stage}</p>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{s?.posture}</p>
              <div className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
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
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{TECH_COMPARISON_NOTE}</p>
        <DataTable
          headers={['Layer', 'Recommended', 'Alternative', 'Premium Alternative', 'Pricing Basis']}
          rows={(TECH_COMPARISON ?? []).map((t: any) => [t?.layer ?? '', t?.opt1 ?? '', t?.opt2 ?? '', t?.opt3 ?? '', t?.pricing ?? ''])}
        />
      </Section>

      <Section eyebrow="Governance" title="Technology Approval Gates — No Gate, No Spend">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{APPROVAL_GATES_NOTE}</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {(APPROVAL_GATES ?? []).map((g: any, i: number) => (
            <GlassCard key={i} className="h-full !p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="font-marquee text-[12px] font-bold uppercase tracking-wide text-foreground">{g?.gate}</p>
              </div>
              <p className="text-[12px] leading-snug text-muted-foreground">{g?.evidence}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-red-400/90">If failed: {g?.outcome}</p>
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
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{TRANSFER_ROUTES_NOTE}</p>
          </div>
        </div>
      </Section>

      {/* No posture or reviewer-rating tile belongs here: this page names no external reviewer, so
          any rating shown here would be a self-assigned verdict. If one is ever added it must name
          the reviewer, or carry the same self-assessment note the Risk page uses. */}
      <div className="grid gap-4">
        <StatCard
          label="Committed MVP Run Cost"
          value="A$46.43/mo"
          sub={
            <>
              Calculated, and the only run cost published for this stack — the committed MVP bill of materials,
              monthly-cancellable. The working: S3 storage 5 GB at US$0.025/GB-month = US$0.125, Athena 10 GB scanned at
              US$5.00/TB = US$0.05, and QuickSight 1 author at US$24/mo plus 3 readers at US$3/mo = US$33.00, with Glue
              Data Catalog on its published free tier and dbt Core, open source, at A$0 — US$33.175/mo, ÷ 0.7145 (RBA
              rate, 21 August 2026) = A$46.43/mo. The four rates are the vendors’ own published Sydney prices; the three
              volumes multiplied by them are planning assumptions — 5 GB stored, to be confirmed by the Ticketalay
              principal, and 1 author plus 3 board readers, to be confirmed by the CEO, both by 30 September 2026, and
              10 GB scanned per month, to be confirmed against the first metered month after go-live. Exceed a volume
              and the line is recalculated.
            </>
          }
        />
      </div>
    </div>
  );
}

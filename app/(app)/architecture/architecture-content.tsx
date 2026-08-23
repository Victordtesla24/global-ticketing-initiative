'use client';

import { useState } from 'react';
import { Layers, Database, TrendingUp, ShieldCheck, Timer, Globe, AlertTriangle } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable, StatCard } from '@/components/proposal/section';
import { TagText } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import ArchitectureDiagram from '@/components/proposal/architecture-diagram';
import {
  ARCH_LEDE, ARCH_AUDIT_NOTE, ARCH_RECONCILIATION,
  ARCH_LAYERS, DATA_MARTS, SCALABILITY, SCALABILITY_OPEN_ITEM,
  TECH_COMPARISON, TECH_COMPARISON_NOTE, APPROVAL_GATES, APPROVAL_GATES_NOTE,
  RETENTION, TRANSFER_ROUTES, TRANSFER_ROUTES_NOTE, type ArchLayer,
} from '@/lib/data/architecture';

const LAYER_TINTS: Record<string, string> = {
  sources: 'border-border/70',
  ingestion: 'border-primary/40',
  landing: 'border-slate-400/40',
  bronze: 'border-orange-700/50',
  silver: 'border-slate-300/40',
  gold: 'border-primary/70',
  marts: 'border-primary/40',
  consumption: 'border-emerald-500/40',
};

export default function ArchitectureContent() {
  const [selected, setSelected] = useState<string>('gold');
  const layer: ArchLayer | undefined = (ARCH_LAYERS ?? []).find((l: ArchLayer) => l?.id === selected);

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 04</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Data <span className="text-primary">Architecture</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{ARCH_LEDE}</p>

      <Alert className="mt-6 max-w-3xl border-red-500/40 bg-red-500/5">
        <AlertTriangle className="h-4 w-4 !text-red-400" />
        <AlertTitle className="text-red-300">Adversarial audit — corrections applied to this page</AlertTitle>
        <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          <TagText text={ARCH_AUDIT_NOTE} />
        </AlertDescription>
      </Alert>

      <GlassCard className="mt-6">
        <p className="t-eyebrow mb-1">{ARCH_RECONCILIATION.label}</p>
        <p className="font-marquee text-lg font-bold uppercase tracking-wide text-foreground">
          {ARCH_RECONCILIATION.value}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          <TagText text={ARCH_RECONCILIATION.note} />
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-primary/80">
          Source: {ARCH_RECONCILIATION.provenance}
        </p>
      </GlassCard>

      <Section eyebrow="End-to-End Architecture" title="From Source Systems to Marketing Activation" className="mt-10">
        <GlassCard className="p-2 md:p-4">
          <ArchitectureDiagram />
        </GlassCard>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          Per the reconciliation above, this is the post-trigger target design, not the committed MVP build.
        </p>
      </Section>

      <Section eyebrow="Interactive" title="The Medallion Stack — Click a Layer">
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            {(ARCH_LAYERS ?? []).map((l: ArchLayer) => (
              <button
                key={l?.id}
                type="button"
                onClick={() => setSelected(l?.id ?? '')}
                className={`glass-card rounded-lg border px-4 py-3 text-left transition-all ${LAYER_TINTS[l?.id ?? ''] ?? 'border-border'} ${
                  selected === l?.id ? 'bg-primary/15 ring-1 ring-primary/50' : 'hover:bg-secondary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-foreground">{l?.name}</p>
                  {l?.medallion ? (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      l.medallion === 'gold' ? 'bg-primary/25 text-primary' : l.medallion === 'silver' ? 'bg-slate-400/20 text-slate-300' : l.medallion === 'bronze' ? 'bg-orange-700/25 text-orange-400' : 'bg-secondary text-muted-foreground'
                    }`}>{l.medallion}</span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
          <GlassCard className="lg:col-span-3">
            {layer ? (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <p className="font-marquee text-lg font-bold uppercase tracking-wide text-foreground">{layer?.name}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{layer?.what}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <p className="t-eyebrow mb-1">Technology</p>
                    <p className="text-[13px] text-foreground/85">{layer?.tech}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <p className="t-eyebrow mb-1">Integration Complexity</p>
                    <p className="text-[13px] text-foreground/85">{layer?.complexity}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs italic text-muted-foreground">
                  No cost line is published for any layer. The per-layer AUD tables that stood here cited no unit rate
                  and no workload basis; the committed MVP stack is priced in financial_rebuild.md §C.
                </p>
              </div>
            ) : null}
          </GlassCard>
        </div>
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
          <AlertTitle className="text-amber-300">OPEN ITEM — {SCALABILITY_OPEN_ITEM.title}</AlertTitle>
          <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            <p><span className="font-semibold text-foreground/80">What is unknown:</span> {SCALABILITY_OPEN_ITEM.unknown}</p>
            <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {SCALABILITY_OPEN_ITEM.owner}</p>
            <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {SCALABILITY_OPEN_ITEM.action} ({SCALABILITY_OPEN_ITEM.ref})</p>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Committed MVP Run Cost"
          value="A$46.43/mo [DERIVED]"
          sub="financial_rebuild.md §C.2–C.3 — the only run cost this audit publishes for this stack; the two AUD StatCards that stood here are deleted"
        />
        <StatCard
          label="Reviewer Rating"
          value="AMBER"
          sub="Sound in principle; validate against actual stack before finalising"
        />
      </div>
    </div>
  );
}

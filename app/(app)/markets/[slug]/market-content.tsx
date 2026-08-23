'use client';

import { MapPin, Scale, Handshake, Gauge } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, EstText, DataTable, StatusBadge } from '@/components/proposal/section';
import { Timeline } from '@/components/proposal/timeline';
import type { Market, MarketPhase, MarketProjectionRow } from '@/lib/data/markets';

export default function MarketContent({ market }: { market: Market }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow={`Section 07 — Market Deep-Dive · ${market?.shortName ?? ''}`} title={market?.name ?? ''}>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <StatusBadge status="GOLD" className="hidden" />
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> {market?.status}
          </span>
        </div>
        <GlassCard className="mb-8 gold-shimmer">
          <p className="t-eyebrow mb-2">Headline Evidence — {market?.heroStatSource}</p>
          <p className="font-marquee text-xl md:text-2xl font-bold uppercase leading-snug text-primary">{market?.heroStat}</p>
        </GlassCard>
        <p className="max-w-4xl leading-relaxed text-foreground/85">
          <EstText text={market?.evidence ?? ''} />
        </p>
      </Section>

      <Section eyebrow="Opportunity Sizing" title="TAM / SAM / SOM">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="TAM" value="Total Addressable" sub={market?.tam} />
          <StatCard label="SAM" value="Serviceable" sub={market?.sam} />
          <StatCard label="SOM" value="Obtainable" sub={market?.som} />
        </div>
        <GlassCard className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <p className="t-eyebrow">Entry Mode</p>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85"><EstText text={market?.entryMode ?? ''} /></p>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Phased Entry" title="Timeline & Gates">
        <Timeline
          items={(market?.timeline ?? []).map((p: MarketPhase, i: number) => ({
            marker: String(i + 1).padStart(2, '0'),
            period: p?.period ?? '',
            title: p?.phase ?? '',
            blocks: [{ label: 'Actions', text: p?.actions ?? '' }],
            gate: p?.gate,
          }))}
        />
      </Section>

      <Section eyebrow="Three-Year Base Scenario" title="Financial Projections">
        <DataTable
          headers={['Line Item (AUD)', 'Year 1', 'Year 2', 'Year 3']}
          rows={(market?.projections ?? []).map((r: MarketProjectionRow) => [r?.label ?? '', r?.y1 ?? '', r?.y2 ?? '', r?.y3 ?? ''])}
        />
        <GlassCard className="mt-4 border-amber-500/30">
          <p className="text-sm leading-relaxed text-foreground/85"><EstText text={market?.projectionNote ?? ''} /></p>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      <div className="grid gap-8 lg:grid-cols-2">
        <Section eyebrow="Compliance" title="Regulatory Checklist" className="mb-0">
          <GlassCard>
            <ul className="space-y-3">
              {(market?.regulatory ?? []).map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <EstText text={r} />
                </li>
              ))}
            </ul>
          </GlassCard>
        </Section>

        <Section eyebrow="Ecosystem" title="Key Partnerships" className="mb-0">
          <div className="space-y-3">
            {(market?.partnerships ?? []).map((p: { type: string; detail: string }, i: number) => (
              <GlassCard key={i} className="py-4">
                <div className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p?.type}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p?.detail}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>
      </div>

      <GlassCard className="mt-10 border-primary/30">
        <p className="t-eyebrow mb-2">Data Confidence</p>
        <p className="text-sm leading-relaxed text-foreground/85"><EstText text={market?.confidenceNote ?? ''} /></p>
      </GlassCard>
    </div>
  );
}

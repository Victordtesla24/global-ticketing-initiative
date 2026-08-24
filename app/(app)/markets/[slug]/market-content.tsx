'use client';

import { MapPin, Scale, Handshake, Gauge, CalendarClock, Calculator } from 'lucide-react';
import {
  Section,
  GlassCard,
  StatCard,
  OrnamentDivider,
  DataTable,
  StatusBadge,
} from '@/components/proposal/section';
import { Timeline } from '@/components/proposal/timeline';
import { Disclosure } from '@/components/proposal/disclosure';
import { cn } from '@/lib/utils';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import type { IdentityVariable } from '@/lib/data/revenue-model';
import type { Market, MarketPhase, HeroTile, Partnership } from '@/lib/data/markets';

function SourceLines({ sources, className }: { sources?: string[]; className?: string }) {
  if (!sources?.length) return null;
  return (
    <ul className={`mt-3 space-y-1 text-xs leading-relaxed text-muted-foreground/70 ${className ?? ''}`}>
      {sources.map((s: string, i: number) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ key figures */

/* A figure that sits inside a folded paragraph is lifted onto the visible
   layer here; the sentence it belongs to stays word for word in the fold
   directly beneath the strip. */
type KeyFigure = { value: string; label: string };

function FigureStrip({ figures, className }: { figures?: KeyFigure[]; className?: string }) {
  if (!figures?.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {figures.map((f: KeyFigure, i: number) => (
        <div key={i} className="max-w-sm rounded-lg border border-primary/25 bg-secondary/30 px-3.5 py-2.5">
          <p className="font-marquee text-base font-bold leading-tight text-primary">{f.value}</p>
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{f.label}</p>
        </div>
      ))}
    </div>
  );
}

const EVIDENCE_FIGURES: Record<string, KeyFigure[]> = {
  australia: [
    {
      value: '65% v 61%',
      label: 'Greater-capital-city attendance against the rest of the country — a four-percentage-point gap',
    },
    {
      value: 'July 2020 – June 2022',
      label: 'The pandemic-affected collection window behind the 64% figure',
    },
  ],
  usa: [
    {
      value: 'CA 626,214 · TX 431,939 · NJ 296,806',
      label: 'Top India-born state totals (ACS 2024 1-year, table B05006)',
    },
    {
      value: '12 May 2025',
      label: 'The FTC Rule on Unfair or Deceptive Fees (all-in pricing) took effect',
    },
    {
      value: 'SPPA 2022',
      label: 'The NEA arts-participation baseline — a five-yearly series; 2022 is the latest edition',
    },
  ],
  canada: [
    {
      value: '+13.1%',
      label:
        'UN DESA mid-2024 above the 2021 Census count — 117,585 higher, calculated (1,015,630 − 898,045) ÷ 898,045',
    },
    {
      value: '971,020 v 876,074',
      label: 'The Australian pair, reconciled the same way — ABS ERP (30 June 2025) against UN DESA (mid-2024)',
    },
  ],
  eu: [
    {
      value: 'October 2029',
      label: 'Next planned EU-SILC cultural-participation update — 2022 is the latest, on a roughly six-year cycle',
    },
  ],
};

const CADENCE_FIGURES: Record<string, KeyFigure[]> = {
  australia: [
    {
      value: 'June 2027',
      label:
        'First release of 2026 Census language and ancestry variables (collected 11 August 2026) — Census 2021 stands until then',
    },
    {
      value: '“Next release Unknown”',
      label: 'ABS attendance survey, 2021–22 release header — nothing fresher at any price',
    },
  ],
  uk: [
    {
      value: 'Once a year',
      label: 'DCMS Participation Survey cadence — 2024/25 is the latest annual publication, 2023/24 its predecessor',
    },
    {
      value: 'Read from 2018',
      label:
        'Any consumer-spend series — about 8 years of window, so the 2020–21 collapse and its rebound stay separable from structural growth',
    },
  ],
  canada: [
    {
      value: 'Biennial',
      label:
        'StatCan table 21-10-0186-01, reference years 2014–2024 — the 2024 edition reached The Daily on 22 January 2026',
    },
    {
      value: 'Five-yearly',
      label: 'The census cycle behind the immigration counts — 2021 is the operative census now',
    },
  ],
};

const CONFIDENCE_VIEW: Record<string, { headline: string; figures?: KeyFigure[] }> = {
  australia: {
    headline: 'Strongest-evidenced market.',
    figures: [
      {
        value: '82.4%',
        label: 'The 2017–18 upper bound for the pandemic-affected 2021–22 participation figures',
      },
    ],
  },
  uk: {
    headline: 'Strong general-demand signals.',
    figures: [
      {
        value: '11,022 v 22,263',
        label:
          'Marathi main language, England and Wales (Census 2021, a floor-not-total count) against Australia — the quantified niche ceiling',
      },
    ],
  },
};

export default function MarketContent({ market }: { market: Market }) {
  const tiles = market?.heroTiles ?? [];
  const revenue = market?.revenue;
  const slug = market?.slug ?? '';
  const evidenceFigures = EVIDENCE_FIGURES[slug];
  const cadenceFigures = CADENCE_FIGURES[slug];
  const confidenceView = CONFIDENCE_VIEW[slug];
  const confidenceNote = market?.confidenceNote ?? '';
  const confidenceHeadline =
    confidenceView && confidenceNote.startsWith(confidenceView.headline) ? confidenceView.headline : null;
  const confidenceRest = confidenceHeadline ? confidenceNote.slice(confidenceHeadline.length).trim() : '';

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow={`Section 07 — Market Deep-Dive · ${market?.shortName ?? ''}`} title={market?.name ?? ''}>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> {market?.status}
          </span>
        </div>

        <p className="mb-6 max-w-4xl text-[15px] leading-relaxed text-muted-foreground/70">
          Each figure below says where it came from, and the official statistics carry their source lines.
        </p>

        {market?.heroTilesIntro ? (
          <Disclosure label="How to read these tiles" className="mb-5 max-w-4xl">
            {market.heroTilesIntro}
          </Disclosure>
        ) : null}

        <div className={`grid gap-4 ${tiles.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {tiles.map((t: HeroTile, i: number) => (
            <StatCard
              key={i}
              className={i === 0 ? 'gold-shimmer' : ''}
              label={t?.label ?? ''}
              value={t?.value ?? ''}
              sub={t?.note ?? ''}
            />
          ))}
        </div>

        <div className="mt-6 max-w-4xl">
          {evidenceFigures?.length ? <FigureStrip figures={evidenceFigures} className="mb-4" /> : null}
          <Disclosure label="The full evidence">
            <p className="leading-relaxed">{market?.evidence ?? ''}</p>
            <SourceLines sources={market?.evidenceSources} />
          </Disclosure>
        </div>

        {market?.cadence ? (
          <GlassCard className="mt-6 border-primary/25">
            <div className="mb-3 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <p className="t-eyebrow">{market.cadence.title}</p>
            </div>
            {cadenceFigures?.length ? <FigureStrip figures={cadenceFigures} className="mb-4" /> : null}
            <Disclosure label="The full cadence note">
              <p className="leading-relaxed">{market.cadence.body}</p>
              <p className="mt-3">{market.cadence.source}</p>
            </Disclosure>
          </GlassCard>
        ) : null}
      </Section>

      <Section eyebrow="Approach" title="Entry Mode">
        <GlassCard>
          <div className="mb-2 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <p className="t-eyebrow">How This Market Is Entered</p>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{market?.entryMode}</p>
          {market?.entryModeNote ? (
            <Disclosure label="Scope of this statement" className="mt-4">
              {market.entryModeNote}
            </Disclosure>
          ) : null}
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

      {revenue ? (
      <Section eyebrow="Financials" title={revenue?.title ?? ''}>
        <GlassCard>
          <p className="max-w-4xl text-sm leading-relaxed text-foreground/85">{revenue?.body ?? ''}</p>

          {revenue?.showIdentity ? (
            <>
              <div className="mt-5 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <p className="t-eyebrow">The identity</p>
              </div>
              <div className="mt-3 rounded-lg border border-primary/25 bg-secondary/40 p-4 font-mono text-sm text-foreground">
                <p className="font-semibold text-primary">{REVENUE_IDENTITY?.formulaGross}</p>
                <p className="mt-1 font-semibold text-primary">{REVENUE_IDENTITY?.formulaShare}</p>
              </div>
              <DataTable
                className="mt-4"
                headers={['Variable', 'Meaning', 'Confirmer / Owner', 'By When']}
                rows={(IDENTITY_VARIABLES ?? []).map((v: IdentityVariable) => [
                  <span key="s" className="font-bold text-primary">{v?.symbol}</span>,
                  v?.meaning ?? '',
                  v?.confirms ?? '',
                  v?.when ?? '',
                ])}
              />
              <Disclosure label="Data confidence" className="mt-4 max-w-4xl">
                <p className="italic leading-relaxed">{DATA_CONFIDENCE_NOTE}</p>
              </Disclosure>
            </>
          ) : null}

          {revenue?.note ? (
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">{revenue.note}</p>
          ) : null}
          <SourceLines sources={revenue?.sources} />
        </GlassCard>
      </Section>
      ) : null}

      <OrnamentDivider />

      <div className="grid gap-8 lg:grid-cols-2">
        <Section eyebrow="Compliance" title="Regulatory Checklist" className="mb-0">
          {market?.regulatory?.length ? (
            <GlassCard>
              <ul className="space-y-2.5">
                {market.regulatory.map((r: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border/40 bg-secondary/20 p-3 text-sm text-foreground/85"
                  >
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              {market?.regulatoryNote || market?.regulatorySources?.length ? (
                <Disclosure label="Scope of this checklist" className="mt-4">
                  {market?.regulatoryNote ? <p className="leading-relaxed">{market.regulatoryNote}</p> : null}
                  <SourceLines sources={market?.regulatorySources} />
                </Disclosure>
              ) : null}
            </GlassCard>
          ) : null}
        </Section>

        <Section eyebrow="Ecosystem" title="Key Partnerships" className="mb-0">
          <div className="space-y-3">
            {(market?.partnerships ?? []).map((p: Partnership, i: number) => (
              <GlassCard key={i} className="py-4">
                <div className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{p?.type}</p>
                      {p?.criticality ? <StatusBadge status={p.criticality} /> : null}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p?.detail}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          {market?.partnershipsNote || market?.partnershipsSources?.length ? (
            <Disclosure label="Scope of these ratings" className="mt-4">
              {market?.partnershipsNote ? <p className="leading-relaxed">{market.partnershipsNote}</p> : null}
              <SourceLines sources={market?.partnershipsSources} />
            </Disclosure>
          ) : null}
        </Section>
      </div>

      <GlassCard className="mt-10 border-primary/30">
        <p className="t-eyebrow mb-3">Data Confidence</p>
        {confidenceHeadline ? (
          <>
            <p className="font-marquee text-xl font-bold uppercase tracking-wide text-primary md:text-2xl">
              {confidenceHeadline}
            </p>
            <FigureStrip figures={confidenceView?.figures} className="mt-4" />
          </>
        ) : (
          <p className="max-w-4xl text-sm leading-relaxed text-foreground/85">{confidenceNote}</p>
        )}
        {market?.confidenceTile ? (
          <div className="mt-4 max-w-md">
            <StatCard
              label={market.confidenceTile.label}
              value={market.confidenceTile.value ?? ''}
              sub={market.confidenceTile.note ?? ''}
            />
          </div>
        ) : null}
        {confidenceHeadline && confidenceRest ? (
          <Disclosure label="The full confidence note" className="mt-4 max-w-4xl">
            <p className="leading-relaxed">{confidenceRest}</p>
            <SourceLines sources={market?.confidenceSources} />
          </Disclosure>
        ) : market?.confidenceSources?.length ? (
          <Disclosure label="Provenance" className="mt-4 max-w-4xl">
            <SourceLines sources={market?.confidenceSources} />
          </Disclosure>
        ) : null}
      </GlassCard>
    </div>
  );
}

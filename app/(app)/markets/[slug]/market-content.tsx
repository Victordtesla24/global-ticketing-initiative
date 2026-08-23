'use client';

import { MapPin, Scale, Handshake, Gauge, AlertTriangle, CalendarClock, Calculator } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { TagText } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Timeline } from '@/components/proposal/timeline';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import type { Market, MarketPhase, OpenItem, HeroTile, SizingRow, Partnership, Blocker } from '@/lib/data/markets';

function OpenItemCallout({ item }: { item: OpenItem }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">OPEN ITEM — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What is unknown:</span> <TagText text={item?.unknown ?? ''} /></p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}{item?.ref ? ` (${item.ref})` : ''}</p>
      </AlertDescription>
    </Alert>
  );
}

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

export default function MarketContent({ market }: { market: Market }) {
  const tiles = market?.heroTiles ?? [];
  const revenue = market?.revenue;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Section eyebrow={`Section 07 — Market Deep-Dive · ${market?.shortName ?? ''}`} title={market?.name ?? ''}>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> {market?.status}
          </span>
        </div>

        <p className="mb-8 max-w-4xl text-[13px] leading-relaxed text-muted-foreground/70">
          No three-year projection is published for this market. Every monetary figure below carries the provenance
          marker it has earned; non-monetary official statistics carry their source lines, untagged.
        </p>

        {market?.heroTilesIntro ? (
          <p className="mb-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">{market.heroTilesIntro}</p>
        ) : null}

        <div className={`grid gap-4 ${tiles.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {tiles.map((t: HeroTile, i: number) => (
            <StatCard
              key={i}
              className={i === 0 ? 'gold-shimmer' : ''}
              label={t?.label ?? ''}
              value={<TagText text={t?.value ?? ''} />}
              sub={<TagText text={t?.note ?? ''} />}
            />
          ))}
        </div>

        <p className="mt-6 max-w-4xl leading-relaxed text-foreground/85">
          <TagText text={market?.evidence ?? ''} />
        </p>
        <SourceLines sources={market?.evidenceSources} />

        {market?.evidenceOpenItem ? (
          <div className="mt-6 max-w-4xl">
            <OpenItemCallout item={market.evidenceOpenItem} />
          </div>
        ) : null}

        {market?.cadence ? (
          <GlassCard className="mt-6 border-primary/25">
            <div className="mb-2 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <p className="t-eyebrow">{market.cadence.title}</p>
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">{market.cadence.body}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">{market.cadence.source}</p>
          </GlassCard>
        ) : null}
      </Section>

      <Section eyebrow="Opportunity Sizing" title="TAM / SAM / SOM">
        {market?.sizingIntro ? (
          <p className="mb-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">{market.sizingIntro}</p>
        ) : null}
        <DataTable
          headers={['Tier', 'Basis']}
          rows={(market?.sizing ?? []).map((s: SizingRow) => [
            <span key="t" className="whitespace-nowrap font-semibold text-foreground">{s?.tier}</span>,
            <TagText key="b" text={s?.basis ?? ''} />,
          ])}
        />
        <SourceLines sources={market?.sizingSources} />
        <div className="mt-4 space-y-4">
          {(market?.sizingOpenItems ?? []).map((o: OpenItem, i: number) => (
            <OpenItemCallout key={i} item={o} />
          ))}
        </div>

        <GlassCard className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <p className="t-eyebrow">Entry Mode</p>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{market?.entryMode}</p>
          {market?.entryModeNote ? (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">{market.entryModeNote}</p>
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
        <div className="mt-6 space-y-4">
          {(market?.timelineOpenItems ?? []).map((o: OpenItem, i: number) => (
            <OpenItemCallout key={i} item={o} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Financials, Rebuilt" title={revenue?.title ?? ''}>
        <GlassCard>
          <p className="max-w-4xl text-sm leading-relaxed text-foreground/85">
            <TagText text={revenue?.body ?? ''} />
          </p>

          {revenue?.showIdentity ? (
            <>
              <div className="mt-5 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <p className="t-eyebrow">The tagged identity — no output number</p>
              </div>
              <div className="mt-3 rounded-lg border border-primary/25 bg-secondary/40 p-4 font-mono text-sm text-foreground">
                <p className="font-semibold text-primary">{REVENUE_IDENTITY?.formulaGross}</p>
                <p className="mt-1 font-semibold text-primary">{REVENUE_IDENTITY?.formulaShare}</p>
              </div>
              <DataTable
                className="mt-4"
                headers={['Variable', 'Meaning', 'Status', 'Confirmer / Owner', 'By When']}
                rows={(IDENTITY_VARIABLES ?? []).map((v: any) => [
                  <span key="s" className="font-bold text-primary">{v?.symbol}</span>,
                  v?.meaning ?? '',
                  <TagText key="t" text={v?.tag ?? ''} />,
                  <TagText key="c" text={v?.confirms ?? ''} />,
                  v?.when ?? '',
                ])}
              />
              <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground/70">{DATA_CONFIDENCE_NOTE}</p>
            </>
          ) : null}

          {revenue?.blockers?.length ? (
            <>
              <p className="mt-5 t-eyebrow">{revenue?.blockersIntro ?? 'Unresolved before any figure is modelled'}</p>
              <ul className="mt-3 space-y-2">
                {revenue.blockers.map((b: Blocker, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>
                      {b?.item} — <span className="text-muted-foreground">owner: {b?.owner}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {revenue?.note ? (
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
              <TagText text={revenue.note} />
            </p>
          ) : null}
          <SourceLines sources={revenue?.sources} />
        </GlassCard>

        {revenue?.openItem ? (
          <div className="mt-4">
            <OpenItemCallout item={revenue.openItem} />
          </div>
        ) : null}
      </Section>

      <OrnamentDivider />

      <div className="grid gap-8 lg:grid-cols-2">
        <Section eyebrow="Compliance" title="Regulatory Checklist" className="mb-0">
          {market?.regulatory?.length ? (
            <GlassCard>
              <ul className="space-y-3">
                {market.regulatory.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              {market?.regulatoryNote ? (
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">{market.regulatoryNote}</p>
              ) : null}
              <SourceLines sources={market?.regulatorySources} />
            </GlassCard>
          ) : null}
          {market?.regulatoryOpenItem ? (
            <div className={market?.regulatory?.length ? 'mt-4' : ''}>
              <OpenItemCallout item={market.regulatoryOpenItem} />
            </div>
          ) : null}
        </Section>

        <Section eyebrow="Ecosystem" title="Key Partnerships" className="mb-0">
          <div className="space-y-3">
            {(market?.partnerships ?? []).map((p: Partnership, i: number) => (
              <GlassCard key={i} className="py-4">
                <div className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {p?.type}
                      {p?.criticality ? (
                        <span className="ml-2 rounded-full border border-primary/40 bg-primary/10 px-2 py-px text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                          {p.criticality}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p?.detail}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          {market?.partnershipsNote ? (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">{market.partnershipsNote}</p>
          ) : null}
          <SourceLines sources={market?.partnershipsSources} />
          {market?.partnershipsOpenItem ? (
            <div className="mt-4">
              <OpenItemCallout item={market.partnershipsOpenItem} />
            </div>
          ) : null}
        </Section>
      </div>

      <GlassCard className="mt-10 border-primary/30">
        <p className="t-eyebrow mb-2">Data Confidence</p>
        <p className="max-w-4xl text-sm leading-relaxed text-foreground/85">
          <TagText text={market?.confidenceNote ?? ''} />
        </p>
        {market?.confidenceTile ? (
          <div className="mt-4 max-w-md">
            <StatCard
              label={market.confidenceTile.label}
              value={<TagText text={market.confidenceTile.value ?? ''} />}
              sub={<TagText text={market.confidenceTile.note ?? ''} />}
            />
          </div>
        ) : null}
        <SourceLines sources={market?.confidenceSources} />
      </GlassCard>
    </div>
  );
}

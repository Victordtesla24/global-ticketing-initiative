'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, Star, ExternalLink, ListOrdered, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, StatCard, DataTable } from '@/components/proposal/section';
import { Tag, TagText } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  PROVIDERS, CATEGORY_LABELS, ACQUISITION_SEQUENCE, DAY1_BILL, HISTORICAL_DEPTH,
  type Provider, type ProviderCategory,
} from '@/lib/data/providers';
import { INSIGHTS_KEPT, INSIGHT_OPEN_ITEMS, FIRST_PARTY_OPEN_ITEM } from '@/lib/data/insights';
import { Slider } from '@/components/ui/slider';

const CATS: (ProviderCategory | 'All')[] = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];
const COST_CAP = 300000;

function OpenItemCallout({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">OPEN ITEM — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What is unknown:</span> {item?.unknown}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

export default function DataEcosystemContent() {
  const [cat, setCat] = useState<ProviderCategory | 'All'>('All');
  const [payment, setPayment] = useState<'All' | 'Paid' | 'Free' | 'Other'>('All');
  const [costRange, setCostRange] = useState<number[]>([0, COST_CAP]);
  const [includeUnpriced, setIncludeUnpriced] = useState(true);
  const [minRec, setMinRec] = useState(1);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return (PROVIDERS ?? []).filter((p: Provider) => {
      if (cat !== 'All' && p?.category !== cat) return false;
      if (payment === 'Paid' && p?.paid !== 'Paid') return false;
      if (payment === 'Free' && p?.paid !== 'Free') return false;
      if (payment === 'Other' && (p?.paid === 'Paid' || p?.paid === 'Free')) return false;
      if ((p?.recommendation ?? 0) < minRec) return false;
      const hasPrice = p?.costMin != null || p?.costMax != null;
      if (!hasPrice) {
        if (!includeUnpriced) return false;
      } else {
        const lo = p?.costMin ?? p?.costMax ?? 0;
        const hi = p?.costMax ?? p?.costMin ?? 0;
        if (hi < (costRange?.[0] ?? 0) || lo > (costRange?.[1] ?? COST_CAP)) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p?.name ?? ''} ${p?.coverage ?? ''} ${p?.notes ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cat, payment, costRange, includeUnpriced, minRec, query]);

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 03</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Data <span className="text-primary">Ecosystem</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Sixty data providers catalogued across six categories — from Ticketalay's own first-party database (the
        non-negotiable foundation) to premium market intelligence — the raw material for audience intelligence,
        campaign targeting and revenue measurement. The catalogue is an inventory of candidate sources, not evidence
        of demand. Every provider carries its trust tier on the mandate ladder (official statistic &gt; audited
        filing &gt; licensed panel &gt; aggregator &gt; modelled estimate) and a corrected cost cell; every monetary
        figure that survives carries a provenance tag — <Tag tag="ACTUAL" /> <Tag tag="LIST" /> <Tag tag="QUOTE" />{' '}
        <Tag tag="DERIVED" /> <Tag tag="ASSUMPTION" /> <Tag tag="UNKNOWN" /> — with one declared labelled exception: a
        third party&apos;s audited-filing figure (Live Nation&apos;s fee-bearing GTV, below) is none of the six
        cost-provenance categories — it is neither incurred, listed, quoted, derived, assumed nor unknown for this
        programme — so it carries the explicit provenance label{' '}
        <span className="font-semibold text-foreground/80">Audited filing</span> instead: benchmark only, feeding no
        funded figure, never a cost comparator. Every unpublished price bracket has been deleted, not softened. Filter
        by category, payment model, indicative cost and recommendation strength.
      </p>

      <Alert className="mt-6 max-w-3xl border-red-500/40 bg-red-500/5">
        <AlertTriangle className="h-4 w-4 !text-red-400" />
        <AlertTitle className="text-red-300">Adversarial audit — corrections applied to this page</AlertTitle>
        <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          24 claims removed from this page by the adversarial audit — see register (a further 14 replaced with
          vendor-published prices, re-sourced or resolved in place). The site-wide estimate tag is abolished. Vendor
          prices are quoted in the currency the vendor publishes; one FX rate everywhere: RBA, 21 Aug 2026 — USD
          0.7145 per A$1.
        </AlertDescription>
      </Alert>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Providers Catalogued"
          value="60"
          sub="Across six categories A–F (A: 9, B: 18, C: 12, D: 7, E: 8, F: 6) — recount adjudicated VERIFIED. The original tile's claimed provider-count minimum is deleted: it traces to no located source."
        />
        <StatCard
          label="Free / Public Sources"
          value={`${(PROVIDERS ?? []).filter((p: Provider) => p?.paid === 'Free').length}`}
          sub="Government statistics and open APIs — acquire first, at zero licence cost. Independently recounted by the audit."
        />
        <GlassCard className="flex flex-col gap-2">
          <p className="t-eyebrow">Day-1 Data Spend — Rebuilt</p>
          <p className="font-marquee text-2xl md:text-3xl font-bold text-primary uppercase leading-tight">
            A$6,036.74 <Tag tag="DERIVED" />
          </p>
          <p className="text-sm text-muted-foreground leading-snug">
            <TagText text="Full day-1 configuration = 7.27× the AUD 830.00 [ACTUAL] programme-spend anchor (GT-13); floor alternative A$2,500.00 [LIST] (one IBISWorld AU report) = 3.01×. Replaces the deleted Year-1 budget tile: its estimate-tagged headline figure and its premature-contracts counterfactual were both unsourced. Line-by-line build-up below." />
          </p>
        </GlassCard>
      </div>

      <Section eyebrow="Interactive Matrix" title="The 60-Provider Catalogue — Corrected" className="mt-12">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          <TagText text="What the audit found across the shipped catalogue: 15 of the 60 providers shipped with no URL at all, and of every paid price the original page attached to a provider, exactly one — Apollo.io — reconciled to a vendor-published price (and only via the proposal's own FX conversion). Every estimate-tagged price bracket with no published price behind it is deleted below and stands as [UNKNOWN]; every price a vendor actually publishes is quoted verbatim in the vendor's own currency and tagged [LIST]. An aggregator may point to a primary source but may never be one; a modelled estimate may never feed a headline or a funded figure." />
        </p>
        <GlassCard className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  cat === c ? 'border-primary/60 bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {c === 'All' ? 'All Categories' : `${c} · ${CATEGORY_LABELS?.[c as ProviderCategory] ?? ''}`}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Payment Model</p>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Paid', 'Free', 'Other'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPayment(p)}
                    className={`rounded-md border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      payment === p ? 'border-primary/60 bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {p === 'Other' ? 'Internal / Platform' : p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Indicative Annual Cost: AUD {(costRange?.[0] ?? 0).toLocaleString('en-AU')} – {(costRange?.[1] ?? COST_CAP).toLocaleString('en-AU')}{(costRange?.[1] ?? 0) >= COST_CAP ? '+' : ''}
              </p>
              <Slider value={costRange} min={0} max={COST_CAP} step={5000} onValueChange={(v: number[]) => setCostRange(v ?? [0, COST_CAP])} />
              <label className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <input type="checkbox" checked={includeUnpriced} onChange={(e) => setIncludeUnpriced(e?.target?.checked ?? true)} className="accent-[#C9A84C]" />
                Include quote-only / internal / [UNKNOWN] sources
              </label>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Minimum Recommendation: {minRec}★</p>
              <Slider value={[minRec]} min={1} max={5} step={1} onValueChange={(v: number[]) => setMinRec(v?.[0] ?? 1)} />
              <div className="relative mt-3">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value ?? '')}
                  placeholder="Search providers…"
                  className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs text-foreground outline-none focus:border-primary/60"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Showing <span className="text-primary font-semibold">{filtered?.length ?? 0}</span> of 60 providers
        </p>

        {(filtered?.length ?? 0) === 0 ? (
          <GlassCard className="py-12 text-center text-sm text-muted-foreground">
            No providers match the selected filters. Broaden the cost range or reduce the recommendation threshold.
          </GlassCard>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((p: Provider) => (
              <GlassCard
                key={p?.id}
                className="!p-4"
                onClick={() => setExpanded(expanded === p?.id ? null : p?.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{p?.id}. {p?.name}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {p?.category} · {CATEGORY_LABELS?.[p?.category] ?? ''} · {p?.paid}
                    </p>
                    <p className="mt-1">
                      <span className="inline-flex items-center rounded border border-border bg-secondary/40 px-1.5 py-px font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                        {p?.trustTier}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= (p?.recommendation ?? 0) ? 'fill-primary text-primary' : 'text-border'}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[12px] leading-snug text-muted-foreground"><TagText text={p?.coverage ?? ''} /></p>
                <p className="mt-1.5 text-[12px] font-semibold text-primary"><TagText text={`Cost: ${p?.costLabel ?? '—'}`} /></p>
                {expanded === p?.id ? (
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
                    <p><span className="text-foreground/70 font-semibold">Quality:</span> <TagText text={p?.quality ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Refresh:</span> {p?.refresh || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">GDPR:</span> <TagText text={p?.gdpr ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Latency:</span> {p?.latency || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Complexity:</span> {p?.complexity || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">History:</span> <TagText text={p?.historicalDepth ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">API:</span> <TagText text={p?.api ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Sample:</span> {p?.sample || '—'}</p>
                    <p className="col-span-2"><span className="text-foreground/70 font-semibold">Notes:</span> <TagText text={p?.notes ?? ''} /></p>
                    {p?.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e?.stopPropagation?.()}
                        className="col-span-2 inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> {p?.urlVerified ? 'Verified URL' : 'URL [UNVERIFIED]'}
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">Click for full assessment</p>
                )}
              </GlassCard>
            ))}
          </div>
        )}

        <div className="mt-6">
          <OpenItemCallout item={FIRST_PARTY_OPEN_ITEM} />
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Rebuilt Budget" title="Rebuilt Year-1 Data Budget — the Day-1 Bill of Materials">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          <TagText text="This table replaces the deleted Year-1 budget tile: neither its estimate-tagged headline figure nor its premature-contracts counterfactual traced to any source. Every line below is a vendor-published price or A$0, expressed as a multiple of the AUD 830.00 [ACTUAL] programme-spend anchor (GT-13, receipted actuals). Free official and intergovernmental sources are tagged [LIST] throughout this site, never [ACTUAL]: the footer defines [ACTUAL] as incurred and receipted, and the entire receipted record is A$350.00 + A$480.00 = A$830.00 (GT-11/GT-12/GT-13). A free-access status is the source's own published price of zero, not a spend line — the Investment page already renders these as A$0 [LIST], and the provider catalogue now matches it. The return on this spend is decision information for gate G1, not revenue — an ROI is not computable while partnership terms (U-02), contracted inventory (U-03) and primary demand evidence (U-04) are all unresolved." />
        </p>
        <DataTable
          headers={['Line', 'Figure', 'Multiple of A$830 anchor']}
          rows={(DAY1_BILL ?? []).map((b: any) => [
            <TagText key="l" text={b?.line ?? ''} />,
            <TagText key="f" text={b?.figure ?? ''} className="whitespace-nowrap font-semibold" />,
            b?.multiple ?? '',
          ])}
        />
        <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          <TagText text="Premium contracts (Nielsen, Kantar, Euromonitor, GWI, Bloomberg and the rest of the [UNKNOWN] rows above) are not deferred on price — they are unpriced: no published price exists and no written quote is on file (GT-08). Any future line item citing one must first obtain a written quote. Claritas and Geocodio are excluded outright as unfit for the Australian proof market at any price." />
        </p>
      </Section>

      <Section eyebrow="Historical Depth" title="How Many Years of Each Data Type to Buy — and What an Extra Year Is Worth">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          <TagText text="Every recommended-history cell is an [ASSUMPTION] — confirmer for all rows: the Data lead (role currently unassigned — LT to appoint), at gate G1, before the first paid data purchase order is raised. The cost cells are [LIST]/[DERIVED] from the price structures above; nothing in this table is an estimate. The headline finding: no recommended extra year of history costs anything — every priced back-catalogue is a free official release — and the binding limits are release cadences, not budgets." />
        </p>
        <DataTable
          headers={['#', 'Data type', 'Recommended history [ASSUMPTION]', 'Cadence anchor (why)', 'Marginal cost of each extra year', 'Marginal decision value of each extra year']}
          rows={(HISTORICAL_DEPTH ?? []).map((h: any) => [
            h?.id ?? '',
            <span key="t" className="font-semibold text-foreground">{h?.dataType ?? ''}</span>,
            <TagText key="r" text={h?.recommended ?? ''} />,
            <TagText key="c" text={h?.cadence ?? ''} />,
            <TagText key="m" text={h?.marginalCost ?? ''} />,
            <TagText key="v" text={h?.marginalValue ?? ''} />,
          ])}
        />
        <p className="mt-3 max-w-4xl text-[11px] leading-relaxed text-muted-foreground/60">
          financial_rebuild.md §A.2 (historical-depth table, LQ-03 — &quot;scored NONE on all 13 routes&quot; in the
          prior review, rebuilt there and carried onto this page). Cadence sources, all accessed 2026-08-23: ABS 2026
          Census topics and data release plan (abs.gov.au — first release June 2027, LANP/BPLP/ANCP first-release
          items; verify/abs-census-diaspora-reaudit.md §4); ABS Cultural and creative activities 2021-22 header
          &quot;Next release Unknown&quot; (verify/abs-attendance.md); Eurostat ilc_scp03 — EU-SILC ~6-yearly module,
          2022 latest, next planned update October 2029 (verify/eu-ca-stats.md); NEA SPPA 2022 (financial_rebuild.md
          §A.1.1 F9); StatCan 21-10-0186-01 biennial 2014–2024 (verify/eu-ca-stats.md); Apple lookup API release date
          (verify/entity-reality-reaudit.md §4). Depth rows are planning assumptions until the Data lead signs them at
          gate G1; their cost cells stand on the cited [LIST]/[DERIVED] evidence and need no such confirmation.
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Sequencing" title="Recommended Acquisition Order">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(ACQUISITION_SEQUENCE ?? []).map((s: any, i: number) => (
            <GlassCard key={i} className="h-full !p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 font-marquee text-xs font-bold text-primary">{i + 1}</span>
                <ListOrdered className="h-4 w-4 text-primary/70" />
                <p className="t-eyebrow">{s?.timing}</p>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground"><TagText text={s?.action ?? ''} /></p>
              <p className="mt-2 text-[11px] leading-snug text-amber-300/80"><span className="font-semibold uppercase tracking-wider">Gate:</span> {s?.rule}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="What the Data Buys" title="What the Data Buys — Corrected">
        <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          <TagText text="The original page closed with a quantified investment-versus-value chart and six benefit tiles. The chart is deleted entirely: every value bar was a self-described research benchmark with no primary source behind it. Four of the six benefit quantifications — reconciliation recovery as a share of GTV, campaign-conversion uplift, avoided market-entry spend, and sell-through uplift — are deleted for the same reason: each carried the abolished estimate tag and a basis line that named no identifiable source. The take-rate tile is deleted because the same programme carried two contradictory base-GTV values for one metric, and revenue on this programme is not computable while every input — take rate, ATV, event volume, repeat rate, partnership share — is [UNKNOWN]. What honestly survives:" />
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {(INSIGHTS_KEPT ?? []).map((ins: any) => (
            <GlassCard key={ins?.n} className="flex h-full flex-col">
              <div className="mb-2 flex items-center gap-2">
                {ins?.n === 1 ? <ShieldCheck className="h-4 w-4 text-primary" /> : <Lightbulb className="h-4 w-4 text-primary" />}
                <p className="t-eyebrow">{ins?.category}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{ins?.insight}</p>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground"><TagText text={ins?.impact ?? ''} /></p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">Basis: {ins?.basis}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {(INSIGHT_OPEN_ITEMS ?? []).map((item: any, i: number) => (
            <OpenItemCallout key={i} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}

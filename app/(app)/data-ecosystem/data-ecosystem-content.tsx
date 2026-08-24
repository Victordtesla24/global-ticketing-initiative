'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, Star, ExternalLink, ListOrdered, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, StatCard, DataTable } from '@/components/proposal/section';
import { Tag } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  PROVIDERS, CATEGORY_LABELS, COUNTRY_FILTERS, ACQUISITION_SEQUENCE, DAY1_BILL, HISTORICAL_DEPTH,
  type Provider, type ProviderCategory, type ProviderCountry,
} from '@/lib/data/providers';
import { INSIGHTS_KEPT, INSIGHT_OPEN_ITEMS, FIRST_PARTY_OPEN_ITEM } from '@/lib/data/insights';
import { Slider } from '@/components/ui/slider';

const CATS: (ProviderCategory | 'All')[] = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Upper bound of the cost filter, in AUD/yr.
 *
 * Computed from the catalogue it filters — the largest `costMax` any provider row carries —
 * rather than typed in, so the control can never show a ceiling that traces to nothing. Today
 * that is A$10,900 (rows 6 Statista and 27 Similarweb: US$649/mo billed annually × 12 ÷
 * 0.7145); if a row's published price changes, the bound follows it.
 *
 * The slider bounds published prices only. The 28 rows whose costMin/costMax are null are
 * quote-only, usage-metered or unpriced, and are governed by the include-unpriced checkbox
 * beneath the slider rather than by this bound.
 */
const COST_CAP = Math.max(0, ...(PROVIDERS ?? []).map((p: Provider) => p?.costMax ?? p?.costMin ?? 0));

function OutstandingItem({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">Outstanding before decision — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What must be obtained:</span> {item?.unknown}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

export default function DataEcosystemContent() {
  const [cat, setCat] = useState<ProviderCategory | 'All'>('All');
  const [payment, setPayment] = useState<'All' | 'Paid' | 'Free' | 'Other'>('All');
  const [country, setCountry] = useState<ProviderCountry | 'All'>('All');
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
      if (country !== 'All' && !(p?.countries ?? []).includes(country)) return false;
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
  }, [cat, payment, country, costRange, includeUnpriced, minRec, query]);

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
        of demand. Every provider carries its trust tier and its cost cell. The trust ladder&apos;s five
        ranked rungs are official statistic &gt; audited filing &gt; licensed panel &gt; aggregator &gt; modelled
        estimate; five further tiers appear in the catalogue below, because the sixty sources do not all fall on those
        rungs, and each is ranked against them explicitly:{' '}
        <span className="font-semibold text-foreground/80">Public filing — not captured</span> (a public filing exists
        but was never retrieved — row 32, StubHub/viagogo, whose investor site returned 403; ranks below audited
        filing and may never be cited as audited content),{' '}
        <span className="font-semibold text-foreground/80">Primary record — conditional</span> (Ticketalay&apos;s own
        first-party transaction data: primary if and only if ownership, access rights and reconciliation are
        demonstrated),{' '}
        <span className="font-semibold text-foreground/80">Platform record</span> (a platform&apos;s own operational
        record of its own activity — primary for that platform and evidence of nothing beyond it; ranks between
        licensed panel and aggregator), and two sub-classes that rank with aggregator,{' '}
        <span className="font-semibold text-foreground/80">Aggregator (channel)</span> (a distribution channel whose
        trust tier inherits from each listing&apos;s original source and which confers none of its own) and{' '}
        <span className="font-semibold text-foreground/80">Aggregator (tool)</span> (an operational utility over
        compiled or open data — fit for a task, never a source of demand evidence). Ten tiers across the sixty rows:
        official statistic 17, audited filing 1, public filing — not captured 1, primary record — conditional 1,
        platform record 2, licensed panel 5, aggregator 18, aggregator (channel) 2, aggregator (tool) 7, modelled
        estimate 6. Each cost cell says where its figure came from: money already spent, a price the vendor
        publishes, a written quote, a calculation from those, a planning assumption with a named confirmer, or an
        entry still to be confirmed. One figure sits outside that pattern: on the Statista Personal tier an earlier
        costing recorded A$922/yr against the vendor&apos;s own published US$649/mo billed annually. The two are not
        reconciled, the programme sponsor owns closing that gap, and no funded line depends on it. Live Nation&apos;s
        fee-bearing GTV, below, comes from a statutory SEC filing and is an official statistic for this purpose:
        benchmark only, feeding no funded figure and never a cost comparator, while the source itself stays at{' '}
        <span className="font-semibold text-foreground/80">audited filing</span> on the ladder above, one rung below an
        official statistic. No unpublished price bracket appears anywhere below. Filter by category, country coverage,
        payment model, published annual cost and recommendation strength.
      </p>

      <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Vendor prices are quoted in the currency the vendor publishes; one FX rate everywhere: RBA, 21 Aug 2026 — USD
        0.7145 per A$1.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Providers Catalogued"
          value="60"
          sub="Across six categories A–F (A: 9, B: 18, C: 12, D: 7, E: 8, F: 6). No provider-count minimum is claimed: none traces to a located source."
        />
        <StatCard
          label="Free / Public Sources"
          value={`${(PROVIDERS ?? []).filter((p: Provider) => p?.paid === 'Free').length}`}
          sub="Government statistics and open APIs — acquire first, at zero licence cost."
        />
        <GlassCard className="flex flex-col gap-2">
          <p className="t-eyebrow">Day-1 Data Spend — Rebuilt</p>
          <p className="font-marquee text-2xl md:text-3xl font-bold text-primary uppercase leading-tight">
            A$6,036.74 <Tag tag="DERIVED" />
          </p>
          <p className="text-sm text-muted-foreground leading-snug">
            The full day-1 configuration is 7.27× the A$830.00 of actual spend to date. The floor alternative — one
            IBISWorld AU report at its published A$2,500.00 — is 3.01×. Line-by-line build-up below.
          </p>
        </GlassCard>
      </div>

      <Section eyebrow="Interactive Matrix" title="The 60-Provider Catalogue" className="mt-12">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          14 of the 60 catalogued providers carry no URL. The original package shipped 15; Statistics Canada&apos;s
          table (row 18) has since been verified and given a live URL, which is the whole of the difference — the 15
          of 60 recorded on the Adversarial Review page is the count as shipped, and is correct as stated there. Where
          no published price exists behind a provider, its cost stands as to be confirmed; every price a vendor
          actually publishes is quoted verbatim in the vendor&apos;s own currency. An aggregator may point to a
          primary source but may never be one, and a modelled estimate may never feed a headline or a funded figure.
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
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Country Coverage
            </p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...COUNTRY_FILTERS] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCountry(c)}
                  className={`rounded-md border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    country === c ? 'border-primary/60 bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {c === 'All' ? 'All Countries' : c}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground/70">
              A country tag records where a source has coverage — not that it evidences demand in that market.
              &quot;Global&quot; is its own tag: a global source is not thereby an AU, UK, US, CA or EU source.
            </p>
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
                Published Annual Cost: AUD {(costRange?.[0] ?? 0).toLocaleString('en-AU')} – {(costRange?.[1] ?? COST_CAP).toLocaleString('en-AU')}
                <Tag tag="DERIVED" />
              </p>
              <Slider value={costRange} min={0} max={COST_CAP} step={100} onValueChange={(v: number[]) => setCostRange(v ?? [0, COST_CAP])} />
              <p className="mt-2 text-[11px] leading-snug text-muted-foreground/70">
                The bound is the catalogue&apos;s own highest published annual price, not a budget
                ceiling: A${COST_CAP.toLocaleString('en-AU')} = the published US$649/mo billed annually &times; 12
                &divide; 0.7145 (rows 6 and 27). Unpriced providers carry no bound: they are still to be confirmed,
                and are governed by the checkbox below rather than by this slider.
              </p>
              <label className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <input type="checkbox" checked={includeUnpriced} onChange={(e) => setIncludeUnpriced(e?.target?.checked ?? true)} className="accent-[#C9A84C]" />
                Include quote-only, internal and unpriced sources
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
                    <p className="mt-1 flex flex-wrap items-center gap-1">
                      <span className="inline-flex items-center rounded border border-border bg-secondary/40 px-1.5 py-px font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                        {p?.trustTier}
                      </span>
                      {(p?.countries ?? []).map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center rounded border border-primary/30 bg-primary/10 px-1.5 py-px font-mono text-[10px] font-semibold uppercase tracking-wider text-primary/80"
                        >
                          {c}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= (p?.recommendation ?? 0) ? 'fill-primary text-primary' : 'text-border'}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{p?.coverage ?? ''}</p>
                <p className="mt-1.5 text-[12px] font-semibold text-primary">Cost: {p?.costLabel ?? '—'}</p>
                {expanded === p?.id ? (
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
                    <p><span className="text-foreground/70 font-semibold">Quality:</span> {p?.quality ?? '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Refresh:</span> {p?.refresh || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">GDPR:</span> {p?.gdpr ?? '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Latency:</span> {p?.latency || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Complexity:</span> {p?.complexity || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">History:</span> {p?.historicalDepth ?? '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">API:</span> {p?.api ?? '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Sample:</span> {p?.sample || '—'}</p>
                    <p className="col-span-2"><span className="text-foreground/70 font-semibold">Notes:</span> {p?.notes ?? ''}</p>
                    {p?.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e?.stopPropagation?.()}
                        className="col-span-2 inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> {p?.urlVerified ? 'Verified URL' : 'URL not yet verified'}
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
          <OutstandingItem item={FIRST_PARTY_OPEN_ITEM} />
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Data Budget" title="Year-1 Data Budget — the Day-1 Bill of Materials">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Every line below is a vendor-published price or A$0, expressed as a multiple of the A$830.00 of actual
          spend to date. A free official or intergovernmental source is shown at its own published price of zero, not
          as a spend line: the whole of the actual spend is A$350.00 + A$480.00 = A$830.00. The return on this spend
          is decision information for gate G1, not revenue — a return on investment is not computable while the
          partnership terms, the contracted inventory and the primary demand evidence are all unresolved.
        </p>
        <DataTable
          headers={['Line', 'Figure', 'Multiple of A$830 anchor']}
          rows={(DAY1_BILL ?? []).map((b: any) => [
            b?.line ?? '',
            <span key="f" className="font-semibold">{b?.figure ?? ''}</span>,
            b?.multiple ?? '',
          ])}
        />
        <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Premium contracts — Nielsen, Kantar, Euromonitor, GWI, Bloomberg and the rest of the rows above that carry
          no price — are not deferred on price. They are unpriced: no published price exists and no written quote is
          on file. Any future line item citing one must first obtain a written quote. Claritas and Geocodio are
          excluded outright as unfit for the Australian proof market at any price.
        </p>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          P2 is priced from Statista&apos;s own published tier, US$199/mo billed annually (= US$2,388/yr, calculated:
          199 × 12 — the annual figure is an annualisation, not a price the vendor publishes). On the Personal tier
          the catalogue row above carries the vendor&apos;s published price of US$649/mo billed annually beside an
          earlier costing of A$922/yr for that same tier. The two are not reconciled, and the programme sponsor owns
          closing that gap. Nothing funded rests on it: P2 buys Starter, not Personal.
        </p>
      </Section>

      <Section eyebrow="Historical Depth" title="How Many Years of Each Data Type to Buy — and What an Extra Year Is Worth">
        <p className="mb-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Every recommended-history cell is a planning assumption, which the Data lead — a role the leadership team
          has still to fill — confirms at gate G1, before the first paid data purchase order is raised. The cost cells
          come from the published prices above, or are calculated from them; nothing in this table is an estimate. The
          headline finding: no recommended extra year of history costs anything, because every back-catalogue named
          here is a free official release, and the binding limits are release cadences rather than budgets.
        </p>
        <DataTable
          headers={['#', 'Data type', 'Recommended history (planning assumption)', 'Cadence anchor (why)', 'Marginal cost of each extra year', 'Marginal decision value of each extra year']}
          rows={(HISTORICAL_DEPTH ?? []).map((h: any) => [
            h?.id ?? '',
            <span key="t" className="font-semibold text-foreground">{h?.dataType ?? ''}</span>,
            h?.recommended ?? '',
            h?.cadence ?? '',
            h?.marginalCost ?? '',
            h?.marginalValue ?? '',
          ])}
        />
        <p className="mt-3 max-w-4xl text-[11px] leading-relaxed text-muted-foreground/60">
Cadence sources: ABS 2026 Census topics and data release plan (abs.gov.au — first release June 2027, with
          LANP/BPLP/ANCP as first-release items); ABS Cultural and creative activities 2021-22 header &quot;Next
          release Unknown&quot;; Eurostat ilc_scp03 — the EU-SILC module, roughly 6-yearly, 2022 latest, next planned
          update October 2029; NEA SPPA 2022; StatCan 21-10-0186-01, biennial 2014–2024; and the Apple lookup API
          release date. Depth rows stay planning assumptions until the Data lead signs them at gate G1; their cost
          cells stand on the published prices cited above and need no such confirmation.
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
              <p className="text-[13px] leading-relaxed text-muted-foreground">{s?.action ?? ''}</p>
              <p className="mt-2 text-[11px] leading-snug text-amber-300/80"><span className="font-semibold uppercase tracking-wider">Gate:</span> {s?.rule}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="What the Data Buys" title="What the Data Buys">
        <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          No quantified investment-versus-value figure is published: no primary source supports a
          reconciliation-recovery share of GTV, a campaign-conversion uplift, an avoided market-entry spend or a
          sell-through uplift, and revenue on this programme is not computable while every input — take rate, average
          transaction value, event volume, repeat rate and partnership share — is still to be confirmed. What the data
          does buy, on the evidence:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {(INSIGHTS_KEPT ?? []).map((ins: any) => (
            <GlassCard key={ins?.n} className="flex h-full flex-col">
              <div className="mb-2 flex items-center gap-2">
                {ins?.n === 1 ? <ShieldCheck className="h-4 w-4 text-primary" /> : <Lightbulb className="h-4 w-4 text-primary" />}
                <p className="t-eyebrow">{ins?.category}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{ins?.insight}</p>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{ins?.impact ?? ''}</p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">Basis: {ins?.basis}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {(INSIGHT_OPEN_ITEMS ?? []).map((item: any, i: number) => (
            <OutstandingItem key={i} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}

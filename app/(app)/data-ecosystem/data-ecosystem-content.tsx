'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, Star, ExternalLink, ListOrdered, Lightbulb } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Section, GlassCard, OrnamentDivider, EstText, StatCard } from '@/components/proposal/section';
import { PROVIDERS, CATEGORY_LABELS, ACQUISITION_SEQUENCE, type Provider, type ProviderCategory } from '@/lib/data/providers';
import { INSIGHTS, DATA_ROI } from '@/lib/data/insights';
import { Slider } from '@/components/ui/slider';

const CATS: (ProviderCategory | 'All')[] = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];
const COST_CAP = 300000;

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

  const roiChart = (DATA_ROI ?? []).map((d: any) => ({
    name: d?.category ?? '',
    'Annual cost (max)': d?.costMax ?? 0,
    'Estimated value (max)': d?.valueMax ?? 0,
  }));

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 03</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Data <span className="text-primary">Ecosystem</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Sixty data providers catalogued across six categories — from Ticketalay's own first-party database (the
        non-negotiable foundation) to premium market intelligence — the raw material for the audience intelligence,
        campaign targeting and revenue measurement set out in the Vision Statement. Filter by category, payment model,
        indicative cost and recommendation strength.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Providers Catalogued" value="60" sub="Across six categories A–F; exceeds the 40-provider minimum" />
        <StatCard label="Free / Public Sources" value={`${(PROVIDERS ?? []).filter((p: Provider) => p?.paid === 'Free').length}`} sub="Government statistics and open APIs — acquire first, at zero licence cost" />
        <StatCard label="Year-1 Data Budget" value="AUD 42K" sub="Recommended Year-1 acquisition spend [EST] vs 500K+ if premium contracts were signed prematurely" />
      </div>

      <Section eyebrow="Interactive Matrix" title="The 60-Provider Catalogue" className="mt-12">
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
                Include quote-only / internal sources
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
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= (p?.recommendation ?? 0) ? 'fill-primary text-primary' : 'text-border'}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[12px] leading-snug text-muted-foreground"><EstText text={p?.coverage ?? ''} /></p>
                <p className="mt-1.5 text-[12px] font-semibold text-primary"><EstText text={`Cost: ${p?.costLabel ?? '—'}`} /></p>
                {expanded === p?.id ? (
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
                    <p><span className="text-foreground/70 font-semibold">Quality:</span> <EstText text={p?.quality ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Refresh:</span> {p?.refresh || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">GDPR:</span> <EstText text={p?.gdpr ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Latency:</span> {p?.latency || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">Complexity:</span> {p?.complexity || '—'}</p>
                    <p><span className="text-foreground/70 font-semibold">History:</span> <EstText text={p?.historicalDepth ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">API:</span> <EstText text={p?.api ?? '—'} /></p>
                    <p><span className="text-foreground/70 font-semibold">Sample:</span> {p?.sample || '—'}</p>
                    <p className="col-span-2"><span className="text-foreground/70 font-semibold">Notes:</span> <EstText text={p?.notes ?? ''} /></p>
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
              <p className="text-[13px] leading-relaxed text-muted-foreground"><EstText text={s?.action ?? ''} /></p>
              <p className="mt-2 text-[11px] leading-snug text-amber-300/80"><span className="font-semibold uppercase tracking-wider">Gate:</span> {s?.rule}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Value Case" title="Data Investment vs Estimated Value">
        <GlassCard>
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiChart} margin={{ top: 10, right: 20, bottom: 60, left: 20 }}>
                <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={70} interval={0} />
                <YAxis tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${Math.round((v ?? 0) / 1000)}K`} label={{ value: 'AUD (max of range)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#a3a3a3' } }} />
                <Tooltip contentStyle={{ background: '#141414', border: '1px solid #C9A84C55', borderRadius: 8, fontSize: 11 }} formatter={(v: any) => `AUD ${(v ?? 0).toLocaleString('en-AU')}`} />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Annual cost (max)" fill="#FF9149" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Estimated value (max)" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Value estimates are research benchmarks [EST], not measured returns. First-party and public data dominate the
            value case at near-zero licence cost.
          </p>
        </GlassCard>
      </Section>

      <Section eyebrow="What the Data Buys" title="Six Insight Opportunities">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(INSIGHTS ?? []).map((ins: any) => (
            <GlassCard key={ins?.n} className="flex h-full flex-col">
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <p className="t-eyebrow">{ins?.category}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{ins?.insight}</p>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground"><EstText text={ins?.impact ?? ''} /></p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">Basis: {ins?.basis}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

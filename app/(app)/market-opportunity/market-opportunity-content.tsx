'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Landmark, Database, ShoppingCart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import { Tag } from '@/components/proposal/tag';
import {
  MARKETS, SEGMENTS, SEGMENTS_NOTE,
  DECISION_FRAMEWORK_INTRO, GATE_RUN_RATE_NOTE, ANCHOR_FOOTNOTE,
} from '@/lib/data/markets';
import { MAP_CALLOUTS, MARKETING_DATA_PLAN, STRATEGIC_OPTIONS } from '@/lib/data/insights';
import { GATE_SCHEDULE } from '@/lib/data/costs';
import { TOP5_MITIGATIONS } from '@/lib/data/risks';

const Globe = dynamic(() => import('@/components/three/globe'), {
  ssr: false,
  loading: () => <div className="flex h-[420px] items-center justify-center text-sm text-muted-foreground md:h-[520px]">Loading globe…</div>,
});

const CALLOUT_AU = MAP_CALLOUTS?.[0];
const CALLOUT_UK = MAP_CALLOUTS?.[1];
const CALLOUT_INDIA = MAP_CALLOUTS?.[2];

/* The five comparable India-born denominators from the callout, drawn to scale. */
const INDIA_BORN_2024 = [
  { market: 'AU', display: '876,074', value: 876074 },
  { market: 'UK', display: '1,044,779', value: 1044779 },
  { market: 'US', display: '3,165,238', value: 3165238 },
  { market: 'CA', display: '1,015,630', value: 1015630 },
  { market: 'Europe region', display: '2,021,502', value: 2021502 },
];
const INDIA_BORN_MAX = 3165238;

/* One key line per market that sits beside its headline statistic. */
const MARKET_KEY_FACTS: Record<string, string> = {
  australia: 'The 2021–22 collection window (July 2020 – June 2022) is pandemic-affected.',
  uk: 'The UN estimated 11.8 million international migrants in the UK in 2024.',
};

/* The vendor price lines inside each data pillar, lifted out for scanning. */
const PILLAR_PRICE_LINES: Record<string, string[]> = {
  'Audience & Demographic Data': [
    'US Census Bureau and Eurostat APIs — free, so no spend is incurred',
    'ABS custom tabulations and UK ONS custom data — quoted on request',
  ],
  'First-Party Transaction & Consent Data': [
    'Internal disclosure by the Ticketalay principal under NDA — nil cost',
  ],
  'Competitive & Channel Intelligence': [
    'Similarweb self-serve — USD 129–649/mo (= USD 1,548–7,788/yr, calculated: monthly rate × 12)',
    'Semrush — USD 117.33–455.67/mo billed annually (= about USD 1,408–5,468/yr, calculated: annual per-month rate × 12)',
  ],
  'Geospatial & Venue Data': [
    'Google Maps geocoding — USD 0 within the 10,000 req/mo free cap, then USD 5.00/1,000',
    'At 100,000 calls a year: USD 0–450/yr, calculated: (100,000 − 10,000) × 5.00 ÷ 1,000',
    'OpenCage X-Small — USD 50/mo (= USD 600/yr calculated: 50 × 12); Medium USD 500/mo (= USD 6,000/yr calculated: 500 × 12), oversized for this workload',
  ],
  'Partner & B2B Enrichment Data': [
    'Apollo.io Professional — USD 79/seat/mo billed annually (= USD 948/yr calculated: 79 × 12) ≈ A$1,326.80, calculated: 948 ÷ 0.7145',
    'People Data Labs Pro — USD 940/yr on annual billing, the vendor’s own yearly figure',
  ],
  'Regulatory & Compliance Data': [
    'Free regulator and government sources initially',
    'Avalara Tax Calculation and Returns Compliance Package — from USD 699, billing period not stated; full suite quote on request',
  ],
};

/* The monthly run-rate arithmetic behind the G2 line, cell by cell. */
const HOSTING_WORKING: string[][] = [
  ['S3 storage', 'US$0.025/GB-month', '5 GB stored', 'US$0.125'],
  ['Athena', 'US$5.00/TB scanned', '10 GB scanned per month', 'US$0.05'],
  ['QuickSight', 'US$24/mo per author · US$3/mo per reader', '1 author plus 3 readers', 'US$33.00'],
  ['Glue Data Catalog', 'Published free tier', '—', 'A$0'],
  ['dbt Core', 'Open source', '—', 'A$0'],
  ['Hosting total', 'US$33.175/mo ÷ 0.7145', '—', 'A$46.43/mo'],
];

/* The G2 one-off cost on each of the two IBISWorld price bases. */
const IBISWORLD_BASES: string[][] = [
  [
    'AUD $2,500 — live AU checkout cart, the price used for planning',
    'A$5,860.00 = 7.06×',
    'A$9,876.74 = 11.90×',
    '—',
  ],
  [
    'AU$2,200 — the vendor’s help centre price',
    'A$5,560.00 (2,200 + 3,360) = 6.70×',
    'A$9,576.74 (2,200 + 3,342.20 + 194.54 + 3,840) = 11.54×',
    '2.65× (2,200 ÷ 830)',
  ],
];

export default function MarketOpportunityContent() {
  const reduceMotion = useReducedMotion();
  return (
    <div>
      <p className="t-eyebrow mb-3">Section 02</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Market <span className="text-primary">Opportunity</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        This section presents the market evidence located for each of the five named markets, and the data required
        to act on it. Australia is the evidenced market and the proposed proof market; the other four carry
        population-scale context, not diaspora demand.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Tag tag="ACTUAL" />
        <Tag tag="LIST" />
        <Tag tag="DERIVED" />
        <Tag tag="OFFICIAL" />
        <span className="mx-0.5 inline-flex items-center whitespace-nowrap rounded border border-border/60 bg-secondary/30 px-1.5 py-px align-middle font-mono text-[11px] font-semibold tracking-wide text-foreground/80">
          FX: RBA, 21 Aug 2026
        </span>
      </div>
      <Disclosure label="Provenance" className="mt-3 max-w-3xl">
        Each cost below says where its figure came from: money already spent, a price the vendor publishes, or a
        calculation from those with the working shown. Official statistics carry their source lines. FX: RBA,
        21 Aug 2026.
      </Disclosure>

      <Section eyebrow="Key Market Indicators" title="The Expansion Map" className="mt-10">
        <GlassCard className="p-2 md:p-4">
          <Globe />
        </GlassCard>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <GlassCard className="flex h-full flex-col">
            <div className="mb-2 flex items-center gap-2">
              <Landmark className="h-4 w-4 text-primary" />
              <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">{CALLOUT_AU?.title}</p>
            </div>
            <p className="font-marquee text-4xl font-black leading-none text-primary md:text-5xl">64%</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              of Australian adults attended at least one cultural venue or event in 2021–22
            </p>
            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted-foreground/80">
              82.4% in 2017–18 as the pre-pandemic benchmark · greater-capital-city residents 65% against 61%
              elsewhere — a modest four-point gap, not a concentration effect
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-primary/80">Source: {CALLOUT_AU?.source}</p>
            <Disclosure label="The full reading" className="mt-3">
              {CALLOUT_AU?.body ?? ''}
            </Disclosure>
          </GlassCard>

          <GlassCard className="flex h-full flex-col">
            <div className="mb-2 flex items-center gap-2">
              <Landmark className="h-4 w-4 text-primary" />
              <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">{CALLOUT_UK?.title}</p>
            </div>
            <p className="font-marquee text-4xl font-black leading-none text-primary md:text-5xl">90.6%</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              of adults in England engaged with the arts in 2024/25 — the official statistic that stands for the UK
            </p>
            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted-foreground/80">
              A broad measure including digital engagement, down from 91.4% in 2023/24
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-primary/80">Source: {CALLOUT_UK?.source}</p>
            <Disclosure label="The full reading" className="mt-3">
              {CALLOUT_UK?.body ?? ''}
            </Disclosure>
          </GlassCard>
        </div>

        <GlassCard className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" />
            <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">{CALLOUT_INDIA?.title}</p>
          </div>
          <p className="mb-4 max-w-3xl text-[12.5px] leading-relaxed text-muted-foreground/80">
            The comparable cross-market denominators, on one consistent basis. The Europe-region count is the proxy
            for the EU market: it includes the UK and non-EU states.
          </p>

          <div className="space-y-2.5">
            {INDIA_BORN_2024.map((b, i) => (
              <div key={b.market}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{b.market}</span>
                  <span className="font-marquee text-[15px] font-bold text-primary">{b.display}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border/20">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]"
                    initial={reduceMotion ? false : { width: 0 }}
                    whileInView={{ width: `${(b.value / INDIA_BORN_MAX) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded border border-border/60 bg-secondary/30 px-2 py-0.5 text-[11.5px] font-semibold text-foreground/80">
              Global migrant stock, every origin: 304 million — not the addressable segment
            </span>
            <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11.5px] font-semibold text-primary">
              AU Marathi-at-home count: 22,263
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-secondary/20 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Australia — national measure beside the comparator
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/85">
                ABS Estimated Resident Population, 30 June 2025:{' '}
                <span className="font-semibold text-foreground">971,020</span> India-born residents — 94,946 above
                UN DESA’s mid-2024 estimate of 876,074.
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/20 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Canada — national measure beside the comparator
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/85">
                Statistics Canada 2021 Census (permanent residents, 25% sample, reference date 11 May 2021):{' '}
                <span className="font-semibold text-foreground">898,045</span> India-born immigrants — 117,585 below
                UN DESA’s mid-2024 estimate of 1,015,630.
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-primary/80">Source: {CALLOUT_INDIA?.source}</p>
          <Disclosure label="How the counts reconcile" className="mt-3">
            {CALLOUT_INDIA?.body ?? ''}
          </Disclosure>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      {/* THE DATA BEHIND SUCCESSFUL MARKETING CAMPAIGNS */}
      <Section eyebrow="From Data to Outcome" title="The Data Behind Successful Marketing Campaigns">
        <p className="mb-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Six data pillars answer the question this proposal was commissioned to address: what data is required,
          how it is acquired, and the marketing and business outcome each pillar could deliver.
        </p>
        <Disclosure label="How the figures were checked" className="mb-6 max-w-3xl">
          Every priced figure below has been checked against the vendor&apos;s own published pricing page, and every
          outcome figure against the underlying evidence.
        </Disclosure>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(MARKETING_DATA_PLAN ?? []).map((p: any, i: number) => (
            <motion.div
              key={p?.pillar ?? i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
            >
              <GlassCard className="flex h-full flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <Database className="h-4 w-4 text-primary" />
                  </span>
                  <p className="font-marquee text-[15px] font-bold uppercase leading-tight tracking-[0.1em] text-foreground">{p?.pillar}</p>
                </div>
                <div className="flex-1 space-y-3 text-[12.5px] leading-relaxed">
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                      <ShoppingCart className="h-3 w-3" /> How to acquire it
                    </p>
                    <ul className="space-y-1.5">
                      {(PILLAR_PRICE_LINES[p?.pillar] ?? []).map((line: string, j: number) => (
                        <li key={j} className="flex gap-2 text-foreground/85">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                          <span className="font-mono text-[12px] leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary/25 bg-primary/5 p-2.5">
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Business outcome</p>
                    <p className="text-foreground/85">{p?.outcome ?? ''}</p>
                  </div>
                </div>
                <Disclosure label="The full working" className="mt-3">
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">What is required</p>
                  <p>{p?.required ?? ''}</p>
                  <p className="mb-0.5 mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">How to acquire it</p>
                  <p>{p?.acquire ?? ''}</p>
                </Disclosure>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Five Markets" title="Where and Why">
        <div className="grid gap-4 md:grid-cols-2">
          {(MARKETS ?? []).map((m: any) => (
            <GlassCard key={m?.slug} className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <p className="font-marquee text-lg font-bold uppercase tracking-wide text-foreground">{m?.name}</p>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{m?.shortName}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{m?.status}</p>
              <p className="mt-3 text-sm font-semibold text-primary">{m?.heroStat ?? ''}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">Source: {m?.heroStatSource}</p>
              {MARKET_KEY_FACTS[m?.slug] ? (
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{MARKET_KEY_FACTS[m?.slug]}</p>
              ) : null}
              <div className="mt-auto pt-4">
                <Link href={`/markets/${m?.slug}`} className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
                  Full Market Deep-Dive <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
                <Disclosure label="The evidence in full" className="mt-3">
                  {m?.evidence ?? ''}
                </Disclosure>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Campaign Targeting" title="Customer Segments">
        <p className="mb-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          {SEGMENTS_NOTE}
        </p>
        <DataTable
          headers={['Segment', 'Profile', 'Primary Channels', 'Churn Risk (Qualitative)']}
          rows={(SEGMENTS ?? []).map((s: any) => [s?.name ?? '', s?.profile ?? '', s?.channel ?? '', s?.churn ?? ''])}
        />
      </Section>

      <OrnamentDivider />

      {/* RISKS, GATED SCHEDULE & RECOMMENDATION */}
      <Section eyebrow="Decision Framework" title="Investment Schedule & Recommendation">
        <div className="grid gap-6 lg:grid-cols-5">
          <GlassCard className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">Principal Risks & Mitigations</p>
            </div>
            <div className="space-y-3">
              {(TOP5_MITIGATIONS ?? []).map((r: any) => (
                <div key={r?.rank} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-marquee text-[12px] font-bold text-primary">{r?.rank}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{r?.risk}</p>
                    <p className="text-[13px] leading-snug text-muted-foreground">{r?.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/risk" className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
              Full Risk Analysis <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </GlassCard>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <p className="text-[15px] leading-relaxed text-muted-foreground">{DECISION_FRAMEWORK_INTRO}</p>
            {(STRATEGIC_OPTIONS ?? []).map((o: any) => (
              <GlassCard
                key={o?.key}
                className={o?.recommended ? 'border-primary/60 bg-primary/5' : ''}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">
                    Option {o?.key} — {o?.name}
                  </p>
                  {o?.recommended ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                      <CheckCircle2 className="h-3 w-3" /> Recommended
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-semibold text-primary/90">{o?.investment ?? ''}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{o?.detail}</p>
                <Disclosure label="The assessment" className="mt-3">
                  {o?.assessment ?? ''}
                </Disclosure>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            The recommended option carries the gated schedule below: capital is released only as each gate is
            passed, and nothing beyond the next gate is committed.
          </p>
          <DataTable
            headers={['Gate', 'What It Buys', 'Committed One-Off Cost', 'Multiple of the A$830 Anchor', 'Must Be True to Pass']}
            rows={(GATE_SCHEDULE ?? []).map((g: any) => [
              <span key="g" className="whitespace-nowrap font-semibold text-foreground">{g?.gate}</span>,
              g?.buys ?? '',
              g?.committed ?? '',
              <span key="m" className="whitespace-nowrap">{g?.multiple}</span>,
              g?.mustPass ?? '',
            ])}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="The Affordability Anchor" value="AUD 830.00" sub={ANCHOR_FOOTNOTE} />
            <StatCard
              label="Cancellable Run Rate"
              value="A$74.42/mo"
              sub="0.090× the anchor per month, for hosting and AI subscriptions — cancellable, and context rather than a committed cost."
            />
            <StatCard
              label="Hosting"
              value="A$46.43/mo"
              sub="US$33.175/mo ÷ 0.7145, at the vendors’ published Sydney prices — the working sits line by line below."
            />
            <StatCard
              label="AI Subscription"
              value="A$27.99/mo"
              sub="Claude Pro’s published price: US$20/mo ÷ 0.7145."
            />
          </div>

          <p className="t-eyebrow mb-3 mt-8">Hosting — the working</p>
          <DataTable
            headers={['Hosting line', 'Vendor rate', 'Assumed volume', 'Monthly']}
            rows={HOSTING_WORKING}
          />

          <p className="t-eyebrow mb-3 mt-8">The IBISWorld report — two published prices, one gate</p>
          <p className="mb-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            The IBISWorld line uses AUD $2,500, the price on the live AU checkout cart; the vendor’s help centre
            publishes AU$2,200 for the same single report.
          </p>
          <DataTable
            headers={['Price basis', 'G2 floor', 'G2 full', 'Data floor ÷ anchor']}
            rows={IBISWORLD_BASES}
          />
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            Statista Starter — A$3,342.20 inside the full configuration — is priced from the vendor’s own published
            tier, US$199/mo billed annually.
          </p>

          <Disclosure label="How this figure is built" className="mt-4 max-w-4xl">
            {GATE_RUN_RATE_NOTE}
          </Disclosure>

          <GlassCard className="mt-8 border-primary/60 bg-primary/5">
            <p className="flex items-start gap-2 text-[15px] leading-relaxed text-foreground/90">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Recommendation: Option B — staged, gated expansion beginning with Australia, with capital released only
                as the due-diligence &amp; terms (G0), discovery (G1) and MVP-build (G2) gates above are passed.
              </span>
            </p>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}

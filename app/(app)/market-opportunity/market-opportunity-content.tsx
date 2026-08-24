'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Landmark, Database, ShoppingCart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
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

export default function MarketOpportunityContent() {
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

      <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        Each cost below says where its figure came from: money already spent, a price the vendor publishes, or a
        calculation from those with the working shown. Official statistics carry their source lines. FX: RBA,
        21 Aug 2026.
      </p>

      <Section eyebrow="Key Market Indicators" title="The Expansion Map" className="mt-10">
        <GlassCard className="p-2 md:p-4">
          <Globe />
        </GlassCard>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {(MAP_CALLOUTS ?? []).map((c: any, i: number) => (
            <GlassCard key={i} className="h-full">
              <div className="mb-2 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-primary" />
                <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">{c?.title}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{c?.body ?? ''}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-primary/80">Source: {c?.source}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      {/* THE DATA BEHIND SUCCESSFUL MARKETING CAMPAIGNS */}
      <Section eyebrow="From Data to Outcome" title="The Data Behind Successful Marketing Campaigns">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Six data pillars answer the question this proposal was commissioned to address: what data is required,
          how it is acquired, and the marketing and business outcome each pillar could deliver. Every priced figure
          below has been checked against the vendor&apos;s own published pricing page, and every outcome figure
          against the underlying evidence.
        </p>
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
                <div className="space-y-3 text-[12.5px] leading-relaxed">
                  <div>
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">What is required</p>
                    <p className="text-muted-foreground">{p?.required}</p>
                  </div>
                  <div>
                    <p className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                      <ShoppingCart className="h-3 w-3" /> How to acquire it
                    </p>
                    <p className="text-muted-foreground">{p?.acquire ?? ''}</p>
                  </div>
                  <div className="rounded-lg border border-primary/25 bg-primary/5 p-2.5">
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Business outcome</p>
                    <p className="text-foreground/85">{p?.outcome ?? ''}</p>
                  </div>
                </div>
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
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground line-clamp-4">{m?.evidence ?? ''}</p>
              <Link href={`/markets/${m?.slug}`} className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
                Full Market Deep-Dive <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
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
                <p className="mt-2 text-[12.5px] leading-relaxed text-foreground/75">{o?.assessment ?? ''}</p>
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
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            {GATE_RUN_RATE_NOTE}
          </p>
          <p className="mt-3 max-w-4xl text-xs leading-relaxed text-muted-foreground/70">
            {ANCHOR_FOOTNOTE}
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground/85">
            Recommendation: Option B — staged, gated expansion beginning with Australia, with capital released only
            as the due-diligence &amp; terms (G0), discovery (G1) and MVP-build (G2) gates above are passed.
          </p>
        </div>
      </Section>
    </div>
  );
}

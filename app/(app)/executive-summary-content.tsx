'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Database, Globe2, TrendingUp, Megaphone, Users, BarChart3, Wallet, Ticket } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { REVENUE_STREAMS } from '@/lib/data/insights';
import { CONSOLIDATED_PL } from '@/lib/data/markets';
import { PRIORITY_RECOMMENDATIONS } from '@/lib/data/review';

const OBJECTIVES = [
  {
    n: '01',
    icon: Database,
    title: 'Build the Audience Data Platform',
    detail:
      'Establish a governed data platform across 60 catalogued sources in six categories — first-party transactions, demographics, competitive intelligence, enrichment, compliance and geospatial — as the engine behind every marketing and expansion decision.',
  },
  {
    n: '02',
    icon: Target,
    title: 'Prove the Australian Market',
    detail:
      'Scale from 48 contracted events and 19,200 tickets in Year 1 to 180 events and 90,000 tickets by Year 3 in the proof market, converting Australia’s 64% cultural attendance rate into contracted, measurable demand.',
  },
  {
    n: '03',
    icon: Globe2,
    title: 'Scale Through Partner Corridors',
    detail:
      'Extend into the United Kingdom, United States, Canada and the European Union through partner-led corridors, sequenced by evidence and released in gated stages of capital.',
  },
];

const OUTCOMES = [
  {
    icon: Megaphone,
    label: 'Campaign Conversion',
    value: '+15–25%',
    detail: 'Improvement in campaign conversion rates from consent-based audience segmentation [EST]',
  },
  {
    icon: Ticket,
    label: 'Event Sell-Through',
    value: '+10–20%',
    detail: 'Sell-through improvement for events placed using venue–audience proximity analytics [EST]',
  },
  {
    icon: Users,
    label: 'Consented Marketing Audience',
    value: '5,000 → 40,000',
    detail: 'Growth in buyers with active marketing consent from Year 1 to Year 3 [EST]',
  },
  {
    icon: Wallet,
    label: 'Settlement Recovery',
    value: '1–3% of GTV',
    detail: 'Recovered through order-to-payment reconciliation on the first-party data foundation [EST]',
  },
  {
    icon: TrendingUp,
    label: 'Platform Revenue Growth',
    value: 'AUD 124,800 → 960,950',
    detail: 'Five-market platform revenue trajectory from Year 1 to Year 3, base scenario [EST]',
  },
  {
    icon: BarChart3,
    label: 'Annual Decision Value of Data',
    value: 'AUD 285,000–950,000',
    detail: 'Estimated annual value across the six data categories, against AUD 42,000–140,000 of acquisition cost [EST]',
  },
];

export default function ExecutiveSummaryContent() {
  return (
    <div>
      {/* HERO — VISION STATEMENT */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="ambient-glow relative mb-14 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-[hsl(0_0%_7%)] to-[hsl(0_0%_4%)] px-6 py-12 md:px-12 md:py-16"
      >
        <p className="t-eyebrow mb-4">AB Entertainment — Strategic Proposal to the Board</p>
        <h1 className="font-marquee text-4xl font-black uppercase leading-[1.05] tracking-wide text-foreground md:text-6xl">
          A Global Stage for
          <br />
          <span className="gold-shimmer text-primary">Marathi Entertainment</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Ticketalay will become the leading ticketing and audience platform for Marathi and
          Indian-origin live entertainment across five international markets — powered by a governed
          data platform that converts audience intelligence into{' '}
          <span className="font-semibold text-primary">marketing precision, revenue growth and disciplined expansion</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/market-opportunity" className="btn-gold">
            Explore the Opportunity <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <Link href="/recommendations" className="btn-gold-outline">
            View Recommendations
          </Link>
        </div>
      </motion.div>

      {/* NUMBERS THAT MATTER — OBJECTIVES & THE DATA */}
      <Section eyebrow="Objectives & The Data Programme" title="The Numbers That Matter">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Target Markets" value="5" sub="Australia, United Kingdom, United States, Canada and the European Union — sequenced by evidence." />
          <StatCard label="Catalogued Data Sources" value="60" sub="Across six categories: market intelligence, demographic, financial, enrichment, compliance and geospatial." />
          <StatCard label="Verified Demand Foundation" value="100,000+" sub="Google Play Store downloads on the existing platform — the audience base the data programme builds upon." />
          <StatCard label="Three-Year Programme" value="AUD 12.62m" sub="Base programme investment, with a staged range of AUD 5.0m (Lean) to AUD 25.0m (Accelerated) [EST]." />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {OBJECTIVES.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className="h-full">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <span className="font-marquee text-2xl font-black text-primary/40">{o.n}</span>
                  </div>
                  <p className="font-marquee text-base font-bold uppercase tracking-wide text-foreground">{o.title}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{o.detail}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <OrnamentDivider />

      {/* STRATEGIC COMMITMENTS */}
      <Section eyebrow="The Ask" title="Three Sequential Commitments">
        <div className="grid gap-4 md:grid-cols-3">
          {(PRIORITY_RECOMMENDATIONS ?? []).map((r: any, i: number) => (
            <GlassCard key={r?.order ?? i} className="flex h-full flex-col">
              <p className="t-eyebrow">{r?.order}</p>
              <p className="mt-1 font-marquee text-lg font-bold uppercase tracking-wide text-foreground">{r?.title}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{r?.budget} · {r?.timeline}</p>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{r?.detail}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <OrnamentDivider />

      {/* BUSINESS OUTCOMES — FINAL SECTION */}
      <Section eyebrow="What the Data Delivers" title="Business, Marketing & Revenue Growth Outcomes">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {OUTCOMES.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <GlassCard className="h-full">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="font-marquee text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{o.label}</p>
                  </div>
                  <p className="font-marquee text-2xl font-black text-primary">{o.value}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{o.detail}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <p className="t-eyebrow mb-3">Revenue Growth Pathways</p>
          <DataTable
            headers={['Revenue Stream', 'Commercial Model', 'Sequencing']}
            rows={(REVENUE_STREAMS ?? []).map((s: any) => [s?.stream ?? '', s?.model ?? '', s?.priority ?? ''])}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Five-market platform revenue builds from AUD {CONSOLIDATED_PL?.totalRevenue?.[0]} (Year 1) to AUD{' '}
            {CONSOLIDATED_PL?.totalRevenue?.[1]} (Year 2) and AUD {CONSOLIDATED_PL?.totalRevenue?.[2]} (Year 3) under the
            base scenario [EST]. All figures AUD; estimates are tagged and sourced in the Investment &amp; Returns section.
          </p>
        </div>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Prepared for C-Suite Review · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

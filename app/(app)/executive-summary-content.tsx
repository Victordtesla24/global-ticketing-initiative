'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Database, Globe2 } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { REVENUE_STREAMS } from '@/lib/data/insights';

// All figures AUD.

const OBJECTIVES = [
  {
    n: '01',
    icon: Database,
    title: 'Build the Audience Data Platform',
    detail:
      'Establish a governed data platform across 60 catalogued sources in six categories — first-party transactions, demographics, competitive intelligence, enrichment, compliance and geospatial — as the engine behind every marketing and expansion decision.',
    provenance: 'The catalogue holds exactly 60 providers across these six categories (A–F).',
  },
  {
    n: '02',
    icon: Target,
    title: 'Prove the Australian Market',
    detail:
      'Australia is the proof market; its event and ticket volumes follow from the counterparties signed at gate G1. For context, the ABS reports that 64% of Australian adults attended at least one cultural venue or event in 2021-22 — a population-wide rate collected across the July 2020 to June 2022 COVID window, and dominated by cinema. Theatre attendance was 8.0% of adults, against 16.5% pre-pandemic in 2017-18. That is background, not a convertible demand pool for Marathi-diaspora events: no primary diaspora demand study exists.',
    provenance:
      'Source: ABS Cultural and Creative Activities 2021-22; ABS Attendance at Selected Cultural Venues and Events 2017-18 (abs.gov.au).',
  },
  {
    n: '03',
    icon: Globe2,
    title: 'Scale Through Partner Corridors',
    detail:
      'Extend into the United Kingdom, United States, Canada and the European Union through partner-led corridors, sequenced by evidence and released in gated stages of capital. No gate on the current schedule prices or schedules these markets; each would require its own decision paper after the Australian pilot reports.',
    provenance: 'The proposal’s own gated, evidence-sequenced staging; no international market is priced or scheduled on the current gate schedule.',
  },
];

// The ask — three sequential commitments, priced as gates.
const COMMITMENTS = [
  {
    order: 'First',
    title: 'Establish the Commercial Foundation',
    gate: 'Gate G0: due diligence & terms',
    detail:
      'Commission independent legal and commercial due diligence covering corporate structure, ownership, IP rights, domain and app-store account control, financial history and Australian operating credentials. Vendor cash today: none committed, because the five quote requests are free to lodge. Consultant labour: 4.0 days at A$60.00/hr — the rate actually paid — giving A$1,920.00, or 2.31x the A$830 anchor. The professional fees themselves are quoted on request.',
    provenance: 'Gate G0 of the decision schedule; consultant rate A$60.00/hr, the rate actually paid.',
  },
  {
    order: 'Second',
    title: 'Conduct Primary Market Discovery',
    gate: 'Gate G1: discovery',
    detail:
      'Building on a confirmed foundation: a programme of promoter interviews with Australian Marathi drama and cultural event producers, a first-party data audit, a technology stack assessment, and baseline unit economics — actual GTV, take rate, refund rate and repeat purchase rate. Study fee: quote on request, against the brief written during G0. Per-agreement legal review: quote on request. Outreach tooling: A$0, Apollo.io’s published free tier at 900 credits a year. Consultant labour: 6.0 days = A$2,880.00, or 3.47x the anchor.',
    provenance: 'Gate G1 of the decision schedule; Apollo.io free tier per apollo.io/pricing.',
  },
  {
    order: 'Third',
    title: 'Launch the Proof-of-Value Platform',
    gate: 'Gate G2: MVP build',
    detail:
      'With economics and inventory confirmed: a minimum viable data platform — three certified dashboards, where certification means dbt tests plus a named sign-off, a process rather than a licence; a reconciled finance mart; and basic consent management — plus a 3–5 event Australian pilot. The pilot volume is a gate deliverable to be unlocked rather than supply already in hand. G2 cannot be entered until at least three signed pilot-event agreements or dated letters of intent exist, and the volume actually pursued is whatever those agreements deliver. Priced components are set out line by line in the table below.',
    provenance:
      'The IBISWorld line uses AUD $2,500, the price on the live AU checkout cart; the vendor’s help centre publishes AU$2,200 for the same single report. Both are the vendor’s own published prices, and the transactional cart price is the one used for planning. On the A$2,200 basis the same gate reads: floor A$5,560.00 (2,200 + 3,360) = 6.70× the anchor, and full A$9,576.74 (2,200 + 3,342.20 + 194.54 + 3,840) = 11.54×; the data-floor line is 2.65× (2,200 ÷ 830). Statista Starter — A$3,342.20 inside the full configuration — is priced from the vendor’s own published tier, US$199/mo billed annually. No gate figure prices the Personal tier. Costs: Gate G2 of the decision schedule; the IBISWorld AU checkout cart, and the Statista and Semrush published tiers. FX: RBA rate 21 Aug 2026, USD 0.7145 per A$1.',
  },
];

const G2_COMPONENTS = [
  { component: 'Data, floor configuration (IBISWorld AU industry report only)', figure: 'A$2,500.00 — published price', multiple: '3.01x' },
  { component: 'Data, full day-1 configuration (adds Statista Starter year 1, Semrush one month)', figure: 'A$6,036.74 — calculated', multiple: '7.27x' },
  { component: 'Tech one-time setup, full (8.0 days)', figure: 'A$3,840.00 — calculated', multiple: '4.63x' },
  { component: 'Tech one-time setup, maximum committable before the first-party data is disclosed (7.0 days)', figure: 'A$3,360.00 — calculated', multiple: '4.05x' },
  {
    component: 'Tech run cost (monthly-cancellable)',
    figure:
      'A$46.43/mo — calculated: S3 storage 5 GB at US$0.025/GB-month = US$0.125, Athena 10 GB scanned at US$5.00/TB = US$0.05, QuickSight 1 author at US$24/mo plus 3 readers at US$3/mo = US$33.00 — all four published Sydney rates — with Glue Data Catalog on its published free tier and dbt Core, open source, at A$0; US$33.175/mo total ÷ 0.7145',
    multiple: '0.056x/mo',
  },
  {
    component: 'AI subscriptions (Claude Pro, billed monthly)',
    figure: 'A$27.99/mo — calculated: US$20/mo, the vendor’s published Pro price, ÷ 0.7145',
    multiple: '0.034x/mo',
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
        className="ambient-glow relative mb-8 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-[hsl(0_0%_7%)] to-[hsl(0_0%_4%)] px-6 py-12 md:px-12 md:py-16"
      >
        <p className="t-eyebrow mb-4">AB Entertainment — Strategic Proposal to the Board</p>
        <h1 className="font-marquee text-4xl font-black uppercase leading-[1.05] tracking-wide text-foreground md:text-6xl">
          A Global Stage for
          <br />
          <span className="gold-shimmer text-primary">Marathi Entertainment</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A proposal to build a ticketing and audience platform for Marathi and Indian-origin live entertainment, with
          Australia as the proof market. This is a greenfield international launch: live operations today are
          India-only (ticketalay.com, transacting in INR), and ticketalay.com.au is parked. Every figure it carries
          rests on{' '}
          <span className="font-semibold text-primary">actual spend, a published price or a stated calculation</span>.
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

      <p className="mb-14 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        All figures AUD. Costs are shown as actual spend, a vendor-published price, or a figure calculated from one of
        those, with the working given.
      </p>

      {/* THE NUMBERS THAT STAND */}
      <Section eyebrow="Objectives & The Data Programme" title="The Numbers That Stand">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Target Markets"
            value="5"
            sub="Australia, United Kingdom, United States, Canada and the European Union — sequenced by evidence. Australia is the only market with any evidenced basis today. Matches the five market pages of this proposal."
          />
          <StatCard
            label="Catalogued Data Sources"
            value="60"
            sub="Across six categories: first-party transactions, demographics, competitive intelligence, enrichment, compliance and geospatial. The Data Ecosystem page's section headings carry the same A–F mapping."
          />
          <StatCard
            label="Actual Spend to Date — the Affordability Anchor"
            value="A$830.00"
            sub="Actual spend: A$350.00 of AI subscriptions and API credits, plus A$480.00 of consultation (8.0 hours at A$60.00/hr). Every forward figure on this page is expressed as a multiple of this anchor."
          />
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
                  <p className="mt-3 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">{o.provenance}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <OrnamentDivider />

      {/* STRATEGIC COMMITMENTS — PRICED AS GATES */}
      <Section eyebrow="The Ask" title="Three Sequential Commitments, Priced as Gates">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Professional fees — vendor, legal, insurance, entity and QSA — are quoted on request. The costs shown below
          come from the decision schedule (gates G0/G1/G2). Each gate is a separate board decision; money committed at
          one gate buys the information for the next, and nothing is committed past the next gate.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {COMMITMENTS.map((r) => (
            <GlassCard key={r.order} className="flex h-full flex-col">
              <p className="t-eyebrow">{r.order}</p>
              <p className="mt-1 font-marquee text-lg font-bold uppercase tracking-wide text-foreground">{r.title}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{r.gate}</p>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{r.detail}</p>
              <p className="mt-3 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">
                {r.provenance}
              </p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6">
          <p className="t-eyebrow mb-3">Gate G2 — Priced Components, Per Line</p>
          <DataTable
            headers={['Component', 'Figure', 'Multiple of A$830 Anchor']}
            rows={G2_COMPONENTS.map((c) => [c.component, c.figure, c.multiple])}
          />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            One-off gate decision cost: floor configuration A$5,860.00 = 7.06x the anchor; full configuration
            A$9,876.74 = 11.90x. The two configurations are alternatives, not a range. The vendor rates behind the run
            cost are the vendors’ published prices, applied to assumed volumes of 5 GB stored, 10 GB scanned per month, and 1 author
            plus 3 dashboard readers. If a volume is exceeded the line is recalculated. Conversions use the RBA rate of
            21 August 2026, USD 0.7145 per A$1.
          </p>
        </div>
      </Section>

      <OrnamentDivider />

      {/* REVENUE GROWTH PATHWAYS */}
      <Section eyebrow="Revenue" title="Revenue Growth Pathways">
        <DataTable
          headers={['Revenue Stream', 'Commercial Model', 'Sequencing']}
          rows={(REVENUE_STREAMS ?? []).map((s: any) => [s?.stream ?? '', s?.model ?? '', s?.priority ?? ''])}
        />
        <p className="mt-3 text-xs text-muted-foreground/70">
          A sequencing table, as plan content: the take-rate target and the B2B deferral are stated targets, not
          proven results. The realised take rate stays unevidenced until the primary demand study reports.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The Investment &amp; Returns page carries the revenue identity, with each variable — event volume, tickets
          per event, average transaction value, realised take rate, repeat rate and Ticketalay&apos;s share under the
          partnership — named, its confirmer stated and its producing gate given. The partnership terms come first on
          the critical path: they are executed at gate G0, ahead of any revenue modelling.
        </p>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Prepared for C-Suite Review · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Database, Globe2, AlertTriangle } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
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
      'Australia is the proof market. Event and ticket volumes for it are still to be confirmed, and remain so until signed counterparties exist: no scale figure is given here. For context, the ABS reports that 64% of Australian adults attended at least one cultural venue or event in 2021-22 — a population-wide rate collected across the July 2020 to June 2022 COVID window, and dominated by cinema. Theatre attendance was 8.0% of adults, against 16.5% pre-pandemic in 2017-18. That is background, not a convertible demand pool for Marathi-diaspora events: no primary diaspora demand study exists.',
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
      'Commission independent legal and commercial due diligence covering corporate structure, ownership, IP rights, domain and app-store account control, financial history and Australian operating credentials. Vendor cash today: none committed, because the five quote requests are free to lodge. Consultant labour: 4.0 days at A$60.00/hr — the rate actually paid — giving A$1,920.00, or 2.31x the A$830 anchor, conditional on written confirmation of the rate and day count due 2026-09-30. The professional fees themselves are to be confirmed when the quotes arrive.',
    provenance: 'Gate G0 of the decision schedule; consultant rate A$60.00/hr, the rate actually paid.',
  },
  {
    order: 'Second',
    title: 'Conduct Primary Market Discovery',
    gate: 'Gate G1: discovery',
    detail:
      'Building on a confirmed foundation: a programme of promoter interviews with Australian Marathi drama and cultural event producers, a first-party data audit, a technology stack assessment, and baseline unit economics — actual GTV, take rate, refund rate and repeat purchase rate. The interview count is not yet set; setting it belongs to the Research lead, under the item below. Study fee: to be confirmed, since it cannot be priced without a brief, and the brief is written and quoted during G0. Per-agreement legal review: to be confirmed against the G0 legal quote. Outreach tooling: A$0, Apollo.io’s published free tier at 900 credits a year. Consultant labour: 6.0 days = A$2,880.00, or 3.47x the anchor, conditional as above.',
    provenance: 'The commitment scope is conditional plan content, and no interview count is given. Costs: Gate G1 of the decision schedule; Apollo.io free tier per apollo.io/pricing.',
  },
  {
    order: 'Third',
    title: 'Launch the Proof-of-Value Platform',
    gate: 'Gate G2: MVP build',
    detail:
      'With economics and inventory confirmed: a minimum viable data platform — three certified dashboards, where certification means dbt tests plus a named sign-off, a process rather than a licence; a reconciled finance mart; and basic consent management — plus a 3–5 event Australian pilot. The pilot volume is a gate deliverable to be unlocked, not supply already in hand: there are zero named, signed promoter or venue counterparties today, and no event volume is evidenced anywhere in this proposal. G2 cannot be entered until at least three signed pilot-event agreements or dated letters of intent exist, and the volume actually pursued is whatever those agreements deliver. Priced components are set out line by line in the table below.',
    provenance:
      'The IBISWorld line uses AUD $2,500, the price on the live AU checkout cart; the vendor’s help centre publishes AU$2,200 for the same single report. Both are the vendor’s own published prices, and the transactional cart price is the one used for planning. On the A$2,200 basis the same gate reads: floor A$5,560.00 (2,200 + 3,360) = 6.70× the anchor, and full A$9,576.74 (2,200 + 3,342.20 + 194.54 + 3,840) = 11.54×; the data-floor line is 2.65× (2,200 ÷ 830). Statista Starter — A$3,342.20 inside the full configuration — is priced from the vendor’s own published tier, US$199/mo billed annually. On the Personal tier the vendor publishes US$649/mo billed annually, while an earlier costing recorded A$922/yr for the same tier; the two are not reconciled, and the programme sponsor owns closing that gap. No gate figure prices the Personal tier, so no gate total turns on it. Costs: Gate G2 of the decision schedule; the IBISWorld AU checkout cart, and the Statista and Semrush published tiers. FX: RBA rate 21 Aug 2026, USD 0.7145 per A$1.',
  },
];

const G2_COMPONENTS = [
  { component: 'Data, floor configuration (IBISWorld AU industry report only)', figure: 'A$2,500.00 — published price', multiple: '3.01x' },
  { component: 'Data, full day-1 configuration (adds Statista Starter year 1, Semrush one month)', figure: 'A$6,036.74 — calculated', multiple: '7.27x' },
  { component: 'Tech one-time setup, full (8.0 days, conditional labour)', figure: 'A$3,840.00 — calculated', multiple: '4.63x' },
  { component: 'Tech one-time setup, maximum committable before the first-party data is disclosed (7.0 days)', figure: 'A$3,360.00 — calculated', multiple: '4.05x' },
  { component: 'Tech run cost (monthly-cancellable)', figure: 'A$46.43/mo — calculated', multiple: '0.056x/mo' },
  { component: 'AI subscriptions (Claude Pro, billed monthly)', figure: 'A$27.99/mo — calculated', multiple: '0.034x/mo' },
];

// Outstanding items, with owners.
const HOME_OPEN_ITEMS = {
  supply: {
    title: 'Contracted promoter and venue supply',
    unknown:
      'There are zero named, signed counterparties and zero letters of intent, so no event-volume figure has contracted supply behind it.',
    owner: 'Commercial lead (role currently unassigned — leadership team to appoint)',
    action: 'Secure a minimum of three signed pilot-event agreements or dated letters of intent with named promoters and venues.',
  },
  quotes: {
    title: 'Written professional-services quotes, and ownership due diligence',
    unknown:
      'No written PSP, legal, insurance, entity or QSA quotes exist, and IP, domain, trademark, source-code and merchant-account due diligence has never been performed — so who owns the thing being expanded is unestablished. What the public register checks already show, which is a lookup rather than the missing due diligence: no "Ticketalay" entity is registered in Australia; ticketalay.com.au is held by ABN 91 819 759 805 (V DESHPANDE & A KADAM family partnership trading as A&B ENTERTAINMENTS, not GST-registered); and the domain is flagged "server renew prohibited — Not Currently Eligible For Renewal" (RDAP, status changed 2026-08-16). The proof market’s named domain may lapse, which makes the memorandum time-critical.',
    owner: 'CEO / company secretary, with an appointed AU law firm',
    action:
      'Request written quotes — an AU law firm for entity and IP due diligence, Stripe AU and Adyen AU for merchant onboarding, an insurance broker, and a QSA — and commission the due-diligence memorandum, including resolution of the domain-renewal flag. Asking costs nothing: the requests themselves are free to lodge.',
  },
  demand: {
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence',
    unknown:
      'No study exists; take rate, average transaction value, repeat purchase and conversion are all unevidenced for the actual target audience.',
    owner: 'Research lead (role currently unassigned)',
    action:
      'Commission a primary study of Marathi and Indian-origin event buyers in Melbourne and Sydney — willingness to pay, fee tolerance, channel trust — with a single stated interview target for the promoter research, and obtain quotes. It cannot be priced without a brief.',
  },
  firstPartyData: {
    title: 'Ticketalay first-party data',
    unknown:
      'Schema, ownership, consent state and export rights of the first-party database are all unverified — the stated foundation of the data programme has never been inspected.',
    owner: 'Ticketalay principal',
    action:
      'Provide the database dictionary, a consent-register sample and app-console exports under NDA, at no cost — this is an internal disclosure. Until then, the eighth setup day and all India-operations finance-mart content stay uncommitted.',
  },
  partnershipTerms: {
    title: 'AB Entertainment ↔ Ticketalay partnership terms — first on the critical path',
    unknown:
      'Revenue share, cost share, capital contribution and control. No profit and loss for either party can be drawn until the terms exist on paper, and none of them may be modelled on an assumption.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal',
    action:
      'Execute a written term sheet or heads of agreement naming the actual legal counterparty, and disclose it to the leadership team — before any revenue modelling.',
  },
};

function OutstandingItem({ item }: { item: { title: string; unknown: string; owner: string; action: string } }) {
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
          India-only (ticketalay.com, transacting in INR), and ticketalay.com.au is parked. Where no source exists for a
          figure, this proposal says so and{' '}
          <span className="font-semibold text-primary">leaves it to be confirmed rather than estimating it</span>.
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
        those, with the working given. One figure sits outside that set: on the Statista Personal tier an earlier
        costing recorded A$922/yr against the vendor’s own published US$649/mo billed annually. The two are not
        reconciled, the programme sponsor owns closing that gap, and no funded line depends on it.
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
            label="Programme Spend to Date — the Affordability Anchor"
            value="A$830.00"
            sub="A$350.00 of AI subscriptions and API credits, plus A$480.00 of consultation (8.0 hours at A$60.00/hr). Every forward figure on this page is expressed as a multiple of this anchor. No cumulative three-year programme figure is published."
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
        <div className="mt-4">
          <OutstandingItem item={HOME_OPEN_ITEMS.supply} />
        </div>
      </Section>

      <OrnamentDivider />

      {/* STRATEGIC COMMITMENTS — PRICED AS GATES */}
      <Section eyebrow="The Ask" title="Three Sequential Commitments, Priced as Gates">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          No written vendor, legal, insurance, entity or QSA quotes exist on file, so no professional fee is priced
          below. The costs that are shown come from the decision schedule (gates G0/G1/G2). Each gate is a separate
          board decision; money committed at one gate buys the information for the next, and nothing is committed
          past the next gate.
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
            A$9,876.74 = 11.90x. The two configurations are alternatives, not a range. Each excludes every figure still
            to be confirmed, and the setup-labour share holds only while the consultant rate and day count remain
            planning assumptions — absent written confirmation, only the day counts stand.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <OutstandingItem item={HOME_OPEN_ITEMS.quotes} />
          <OutstandingItem item={HOME_OPEN_ITEMS.demand} />
          <OutstandingItem item={HOME_OPEN_ITEMS.firstPartyData} />
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
          No revenue or return figure is published for this programme: every revenue input — event volume, tickets per
          event, average transaction value, realised take rate, repeat rate and Ticketalay&apos;s share under the
          partnership — is still to be confirmed. The Investment &amp; Returns page carries the identity formula, with
          each variable named, its confirmer stated and its producing gate given, and it publishes no output number.
          Return on investment across the schedule: not computable.
        </p>
        <div className="mt-4">
          <OutstandingItem item={HOME_OPEN_ITEMS.partnershipTerms} />
        </div>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Prepared for C-Suite Review · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

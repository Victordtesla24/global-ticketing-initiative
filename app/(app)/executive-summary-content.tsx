'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Database, Globe2, AlertTriangle } from 'lucide-react';
import { Section, GlassCard, StatCard, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { Tag, TagText } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { REVENUE_STREAMS } from '@/lib/data/insights';

// All figures AUD. Every monetary figure carries exactly one provenance marker.

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
      'Australia is the proof market. Event and ticket volumes for the proof market are [UNKNOWN] until signed counterparties exist: no scale figure is published here. Context, correctly stated: the ABS reports 64% of Australian adults attended at least one cultural venue or event in 2021-22 — a population-wide rate collected across the July 2020 – June 2022 COVID window and dominated by cinema. Theatre attendance was 8.0% of adults (16.5% pre-pandemic, 2017-18). This is background only, not a convertible demand pool for Marathi-diaspora events: no primary diaspora demand study exists.',
    provenance:
      'ABS Cultural and Creative Activities 2021-22; ABS Attendance at Selected Cultural Venues and Events 2017-18 (abs.gov.au, verified 2026-08-23).',
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
      'Commission independent legal and commercial due diligence covering corporate structure, ownership, IP rights, domain and app-store account control, financial history and Australian operating credentials. Vendor cash today: none committed — the five quote requests are free to lodge (U-05). Consultant labour: 4.0 days [ASSUMPTION] at A$60.00/hr [ACTUAL] = A$1,920.00 [DERIVED] (2.31x the A$830 anchor), conditional on written rate and day-count confirmation due 2026-09-30. The professional fees themselves are [UNKNOWN] until the quotes arrive.',
    provenance: 'Gate G0 of the decision schedule; consultant rate per the receipted A$60.00/hr [ACTUAL].',
  },
  {
    order: 'Second',
    title: 'Conduct Primary Market Discovery',
    gate: 'Gate G1: discovery',
    detail:
      'Building on a confirmed foundation: a programme of promoter interviews (Australian Marathi drama and cultural event producers — no interview count is set anywhere on this site; setting it belongs to the Research lead under the open item below), first-party data audit, technology stack assessment, and baseline unit economics (actual GTV, take rate, refund rate, repeat purchase rate). Study fee: [UNKNOWN] — not priceable without a brief; the brief is written and quoted during G0. Per-agreement legal review: [UNKNOWN] per the G0 legal quote. Outreach tooling: A$0 [LIST] (Apollo.io free tier, 900 credits/yr). Consultant labour: 6.0 days [ASSUMPTION] = A$2,880.00 [DERIVED] (3.47x the anchor), conditional as above.',
    provenance: 'The commitment scope stands as conditional plan content; no interview count is published. Costs: Gate G1 of the decision schedule; Apollo.io free tier per apollo.io/pricing (accessed 2026-08-23).',
  },
  {
    order: 'Third',
    title: 'Launch the Proof-of-Value Platform',
    gate: 'Gate G2: MVP build',
    detail:
      'With economics and inventory confirmed: a minimum viable data platform (3 certified dashboards — certification meaning dbt tests plus named sign-off, a process, not a licence — a reconciled finance mart, basic consent management) and a 3–5 event Australian pilot. The pilot volume is a gate deliverable to be unlocked, not evidenced supply: there are zero named, signed promoter or venue counterparties today, and no event volume is evidenced anywhere on this site. G2 cannot be entered until U-03 delivers at least three signed pilot-event agreements or dated LOIs, and the volume actually pursued is whatever U-03 returns. Priced components per line in the table below.',
    provenance:
      'The IBISWorld line uses AUD $2,500 [LIST], the live AU checkout cart price (accessed 2026-08-23); the vendor’s help centre publishes AU$2,200 [LIST] for the same single report. Both are the vendor’s own published prices, and the transactional cart price is the one used for planning. On the A$2,200 basis the same gate reads: floor A$5,560.00 [DERIVED]: 2,200 + 3,360 = 6.70× the anchor, and full A$9,576.74 [DERIVED]: 2,200 + 3,342.20 + 194.54 + 3,840 = 11.54×; the data-floor line is 2.65× [DERIVED]: 2,200 ÷ 830. Statista Starter (A$3,342.20 [DERIVED] inside the full configuration) is priced from the vendor’s own published tier, US$199/mo billed annually [LIST]. For the Personal tier two published figures stand side by side — A$922/yr [LIST] and US$649/mo billed annually [LIST] — and reconciling them is an open item under U-01, owned by the programme sponsor. No gate figure on this site prices the Personal tier, so no gate total turns on it. Costs: Gate G2 of the decision schedule; IBISWorld live AU checkout cart; Statista and Semrush published tiers (all accessed 2026-08-23). FX: RBA rate 21 Aug 2026, USD 0.7145 per A$1.',
  },
];

const G2_COMPONENTS = [
  { component: 'Data, floor configuration (IBISWorld AU industry report only)', figure: 'A$2,500.00 [LIST]', multiple: '3.01x' },
  { component: 'Data, full day-1 configuration (adds Statista Starter year 1, Semrush one month)', figure: 'A$6,036.74 [DERIVED]', multiple: '7.27x' },
  { component: 'Tech one-time setup, full (8.0 days, conditional labour)', figure: 'A$3,840.00 [DERIVED]', multiple: '4.63x' },
  { component: 'Tech one-time setup, maximum committable before U-07 disclosure (7.0 days)', figure: 'A$3,360.00 [DERIVED]', multiple: '4.05x' },
  { component: 'Tech run cost (monthly-cancellable)', figure: 'A$46.43/mo [DERIVED]', multiple: '0.056x/mo' },
  { component: 'AI subscriptions (Claude Pro, billed monthly)', figure: 'A$27.99/mo [DERIVED]', multiple: '0.034x/mo' },
];

// Open-item boxes with owners.
const HOME_OPEN_ITEMS = {
  u03: {
    ref: 'U-03',
    title: 'Contracted promoter/venue supply (U-03, BLOCKING)',
    unknown:
      'There are zero named, signed counterparties and zero LOIs, so no event-volume figure has contracted supply behind it.',
    owner: 'Commercial lead (role currently unassigned — LT to appoint)',
    action: 'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues.',
  },
  u05: {
    ref: 'U-05 / U-06',
    title: 'Written professional-services quotes and ownership due diligence (U-05, U-06, both BLOCKING)',
    unknown:
      'No written PSP, legal, insurance, entity or QSA quotes exist, and IP, domain, trademark, source-code and merchant-account due diligence has never been performed — who owns the thing being expanded is unestablished. What the first-hand registry checks already show — a lookup, not the missing due diligence: no "Ticketalay" entity is registered in Australia; ticketalay.com.au is held by ABN 91 819 759 805 (V DESHPANDE & A KADAM family partnership t/a A&B ENTERTAINMENTS, not GST-registered), and the domain is flagged "server renew prohibited — Not Currently Eligible For Renewal" (RDAP, status changed 2026-08-16) — the proof market’s named domain may lapse, making the memorandum time-critical.',
    owner: 'CEO / company secretary, with an appointed AU law firm',
    action:
      'Request written quotes (AU law firm for entity + IP due diligence, Stripe AU and Adyen AU for merchant onboarding, insurance broker, QSA) and commission the due-diligence memorandum, including resolution of the domain-renewal flag. Cost of asking: nil — the requests themselves are free to lodge.',
  },
  u04: {
    ref: 'U-04',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04, BLOCKING)',
    unknown:
      'No study exists; take rate, ATV, repeat purchase and conversion are all unevidenced for the actual target audience.',
    owner: 'Research lead (role currently unassigned)',
    action:
      'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust), with a single stated interview target for the promoter research; obtain quotes — not priceable without a brief.',
  },
  u07: {
    ref: 'U-07',
    title: 'Ticketalay first-party data (U-07, BLOCKING)',
    unknown:
      'Schema, ownership, consent state and export rights of the first-party database are all unverified — the stated foundation of the data programme has never been inspected.',
    owner: 'Ticketalay principal',
    action:
      'Provide the database dictionary, a consent-register sample and app-console exports under NDA (nil cost — internal disclosure). Until then, the eighth setup day and all India-ops finance-mart content stay uncommitted.',
  },
  u02: {
    ref: 'U-02',
    title: 'AB Entertainment ↔ Ticketalay partnership terms (U-02, BLOCKING — first on the critical path)',
    unknown:
      'Revenue share, cost share, capital contribution and control; no P&L for either party can be drawn until the terms exist on paper, and modelling any of them on an assumption is prohibited.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal',
    action:
      'Execute a written term sheet or heads of agreement naming the actual legal counterparty, and disclose it to the LT — before any revenue modelling.',
  },
};

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
          India-only (ticketalay.com, transacting in INR), and ticketalay.com.au is parked. Every monetary figure on this page carries a
          provenance marker; where no source exists, the figure is{' '}
          <span className="font-semibold text-primary">marked unknown, not estimated</span>.
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
        Every monetary figure on this page carries exactly one of <Tag tag="ACTUAL" /> <Tag tag="LIST" />{' '}
        <Tag tag="QUOTE" /> <Tag tag="DERIVED" /> <Tag tag="ASSUMPTION" /> <Tag tag="UNKNOWN" />. All figures AUD.
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
            value={<TagText text="A$830.00 [ACTUAL]" />}
            sub={
              <TagText text="A$350.00 [ACTUAL] AI subscriptions and API credits, plus A$480.00 [ACTUAL] consultation (8.0 hours @ A$60.00/hr [ACTUAL]). Every forward figure on this page is expressed as a multiple of this anchor. No cumulative three-year programme figure is published: cumulative hero figures are prohibited on this site." />
            }
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
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    <TagText text={o.detail} />
                  </p>
                  <p className="mt-3 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">{o.provenance}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-4">
          <OpenItemCallout item={HOME_OPEN_ITEMS.u03} />
        </div>
      </Section>

      <OrnamentDivider />

      {/* STRATEGIC COMMITMENTS — RE-PRICED AS GATES */}
      <Section eyebrow="The Ask" title="Three Sequential Commitments, Re-Priced as Gates">
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
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                <TagText text={r.detail} />
              </p>
              <p className="mt-3 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground/60">
                <TagText text={r.provenance} />
              </p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6">
          <p className="t-eyebrow mb-3">Gate G2 — Priced Components, Per Line</p>
          <DataTable
            headers={['Component', 'Figure', 'Multiple of A$830 Anchor']}
            rows={G2_COMPONENTS.map((c) => [c.component, <TagText key="f" text={c.figure} />, c.multiple])}
          />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <TagText text="One-off gate decision cost: floor configuration A$5,860.00 [DERIVED] = 7.06x the anchor; full configuration A$9,876.74 [DERIVED] = 11.90x. The two configurations are alternatives, not a range. Each excludes every [UNKNOWN]; the setup-labour share holds only under the unconfirmed consultant-rate and day-count [ASSUMPTION]s — absent written confirmation, only the day counts stand." />
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <OpenItemCallout item={HOME_OPEN_ITEMS.u05} />
          <OpenItemCallout item={HOME_OPEN_ITEMS.u04} />
          <OpenItemCallout item={HOME_OPEN_ITEMS.u07} />
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
Sequencing table, as plan content: the take-rate target and the B2B deferral are stated targets, not
          proven results. The realised take rate remains unevidenced until the U-04 study reports.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <TagText text="No revenue or ROI figure is published for this programme: every revenue input — event volume, tickets per event, average transaction value, realised take rate, repeat rate and Ticketalay's share under the partnership — is [UNKNOWN]. The Investment & Returns page now carries the honest identity formula with each variable tagged, its confirmer named and its producing gate stated; it publishes no output number. ROI across the schedule: not computable." />
        </p>
        <div className="mt-4">
          <OpenItemCallout item={HOME_OPEN_ITEMS.u02} />
        </div>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Prepared for C-Suite Review · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

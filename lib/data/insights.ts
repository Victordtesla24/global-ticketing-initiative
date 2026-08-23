// DELIVERABLE 3 — insights, map callouts, marketing data plan, strategic options.
// Every monetary figure carries exactly one provenance marker:
// [ACTUAL] / [LIST] / [QUOTE] / [DERIVED] / [ASSUMPTION] / [OFFICIAL] / [UNKNOWN].

// "What the data buys" — the benefits that stand on evidence.
export const INSIGHTS_KEPT = [
  {
    n: 1,
    category: 'Regulatory Compliance',
    insight: 'FTC all-in pricing rule compliance prevents enforcement action',
    impact: 'The FTC Rule on Unfair or Deceptive Fees, effective 12 May 2025, applies to live-event ticketing; compliance prevents enforcement action under the rule, and the regulatory materials are free. The cost of complying is a legal-advice question — unquoted (U-05).',
    basis: 'ftc.gov — rule effective 12 May 2025 (verified first-hand 2026-08-23)',
  },
  {
    n: 2,
    category: 'Competitive Benchmarking — qualitative only',
    insight: 'Audited take-rate benchmarks, free',
    impact: "Live Nation's FY2025 10-K reports 346 million fee-bearing tickets on US$37.1 billion [OFFICIAL] of fee-bearing GTV — a statutory SEC filing, and a sanity bound on per-ticket fee economics at gate G1. The marker records how the figure enters this programme's accounts, not the source's rank: an audited filing sits one rung below an official statistic on the trust ladder. Benchmark use only: audited filings may never serve as cost comparators for an A$830 entity, and no revenue figure for this programme may be derived from them.",
    basis: 'Live Nation 10-K FY2025, SEC EDGAR',
  },
];

// Open items with named owners.
export const INSIGHT_OPEN_ITEMS = [
  {
    ref: 'U-04',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04, BLOCKING)',
    unknown: 'No primary study of the actual target audience exists, so no campaign-conversion, segmentation-uplift or sell-through benefit can be quantified.',
    owner: 'Research lead (role currently unassigned — LT to appoint)',
    action: 'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief.',
  },
  {
    ref: 'U-07',
    title: 'Payment reconciliation and segmentation on first-party data (U-07, BLOCKING)',
    unknown: "Order-to-payment reconciliation and consent-based segmentation are named as benefits, but the first-party database's schema, ownership, consent state and export rights have never been inspected — no recovery or uplift rate can be stated, and no benchmark for either is on file.",
    owner: 'Ticketalay principal',
    action: 'Complete the U-07 disclosure (database dictionary, consent-register sample, app-console exports under NDA); reconciliation and segmentation value can only be measured, not estimated, after it.',
  },
];

// Open item for the catalogue itself.
export const FIRST_PARTY_OPEN_ITEM = {
  ref: 'U-07',
  title: 'Ticketalay first-party data (U-07, BLOCKING)',
  unknown: 'Schema, ownership, consent state and export rights of the first-party database — the stated "non-negotiable foundation" of this entire data programme — have never been inspected.',
  owner: 'Ticketalay principal',
  action: 'Provide the database dictionary, a consent-register sample and app-console exports under NDA. Cost to obtain: nil — internal disclosure.',
};

// Key market indicators.
export const MAP_CALLOUTS = [
  { title: 'Australian Demand', body: '64% of Australian adults attended at least one cultural venue or event in 2021–22, with 82.4% in 2017–18 as the pre-pandemic benchmark. Greater-capital-city residents attended at 65% against 61% elsewhere — a modest four-point gap, not a concentration effect.', source: 'ABS, Cultural and creative activities 2021–22' },
  { title: 'UK Live Entertainment Scale', body: 'UK live-music market size is [UNKNOWN] on this site: the only measure located is a trade federation’s own commissioned estimate of consumer spend, which earns none of the sanctioned provenance markers, so no figure is published. It was market context only, never a TAM, and no market page on this site publishes one. What stands for the UK is the official statistic: 90.6% of adults in England engaged with the arts in 2024/25 — a broad measure including digital engagement, down from 91.4% in 2023/24.', source: 'DCMS Participation Survey 2024/25' },
  { title: 'India-Born Stock by Market, 2024', body: 'AU 876,074 · UK 1,044,779 · US 3,165,238 · CA 1,015,630 · Europe region 2,021,502 — the comparable cross-market denominators, on one consistent basis. The Europe-region count is the proxy for the “EU” market: it includes the UK and non-EU states, and no EU-27 aggregate has been extracted. Total migrant stock of every origin (304 million globally) is not the addressable segment; even these counts only bound it, because country-of-birth carries no language or demand dimension — the AU Marathi-at-home count is 22,263. These are the comparable denominators, not per-country ceilings: on Australia’s own national measure the ABS counts 971,020 India-born residents (Estimated Resident Population, 30 June 2025 — the largest overseas-born group on record), 94,946 above UN DESA’s mid-2024 estimate of 876,074. Canada is the same case in the other direction: Statistics Canada’s 2021 Census counts 898,045 India-born immigrants (permanent residents, 25% sample, reference date 11 May 2021), 117,585 below UN DESA’s mid-2024 estimate of 1,015,630 above, and it is the 898,045 figure this proposal publishes lower on this page and on the Canada market page. Different collector, different measure, different reference date in both cases; both figures in each pair are verified and neither replaces the other.', source: 'UN DESA, International Migrant Stock 2024 (destination × origin)' },
];

// What data is required, how to acquire it, and the marketing/business outcome it drives.
// Every priced figure below is checked against the vendor's own published pricing page.
export const MARKETING_DATA_PLAN = [
  {
    pillar: 'Audience & Demographic Data',
    required: 'Census ancestry and language tabulations, migration statistics and cultural participation rates for each target market and city',
    acquire: 'US Census Bureau and Eurostat APIs A$0 [LIST] (free access, no spend incurred — [ACTUAL] is reserved for the receipted A$350.00 / A$480.00 / A$830.00 figures). ABS custom-tabulation and UK ONS custom-data pricing is [UNKNOWN]: no published price could be verified.',
    outcome: 'Precise geo-targeted campaign planning by city and suburb — qualitative, and not costed: no study exists to quantify avoided market-entry spend.',
  },
  {
    pillar: 'First-Party Transaction & Consent Data',
    required: 'Order-to-payment reconciliation, CRM records, marketing consent register and repeat-purchase history from the existing platform',
    acquire: 'OPEN ITEM — first-party data readiness (U-07): whether Ticketalay\'s transaction, CRM and consent data can be accessed at all — and at what quality, size and consent status — is unknown. Owner: Ticketalay principal. Action: provide a database dictionary, consent-register sample and app-console exports under NDA.',
    outcome: 'No audience-growth, conversion-uplift or GTV-recovery rate is published: reconciliation and segmentation value can only be measured after the U-07 disclosure, not estimated.',
  },
  {
    pillar: 'Competitive & Channel Intelligence',
    required: 'Competitor web traffic, app engagement, keyword pricing and take-rate benchmarks across the five markets',
    acquire: 'Each figure is tagged at the level the vendor actually publishes: Similarweb self-serve tiers, USD 129–649/mo [LIST] (= USD 1,548–7,788/yr [DERIVED]: monthly rate × 12); Semrush, USD 117.33–455.67/mo billed annually [LIST] (= USD ~1,408–5,468/yr [DERIVED]: annual per-month rate × 12). Neither vendor publishes an annual band — the yearly figures are annualisations, tagged [DERIVED] on every route that carries them.',
    outcome: 'OPEN ITEM — revenue sensitivity to take-rate or channel-pricing improvements cannot be computed (U-04): it depends on a platform take rate this proposal marks [UNKNOWN], and no primary study of fee tolerance exists. Owner: Research lead (currently unassigned).',
  },
  {
    pillar: 'Geospatial & Venue Data',
    required: 'Geocoded venue locations, audience proximity and catchment analysis for event placement and local media buying',
    acquire: 'Google Maps geocoding at 100,000 calls/yr: USD 0–450/yr [LIST], within Google\'s free monthly cap. OpenCage: the X-Small tier at USD 50/mo [LIST] (= USD 600/yr [DERIVED]: 50 × 12) is sufficient for this workload; the Medium tier at USD 500/mo [LIST] (= USD 6,000/yr [DERIVED]: 500 × 12) is oversized for it.',
    outcome: 'Localised campaign targeting around venues, once venues are under contract — none are contracted at time of writing. No sell-through improvement rate is published: no study supports one.',
  },
  {
    pillar: 'Partner & B2B Enrichment Data',
    required: 'Verified contact and firmographic data for promoters, producers, venues and cultural associations',
    acquire: 'Apollo.io Professional: USD 948/yr [LIST] ≈ A$1,326.80 [DERIVED] (948 ÷ 0.7145, RBA rate 21 Aug 2026). People Data Labs Pro: USD 940/yr on annual billing [LIST]; PDL publishes no paid pilot tier.',
    outcome: 'OPEN ITEM — zero promoters, producers or venues are named or signed at time of writing (U-03): no qualified pipeline of organiser targets or venues exists. Owner: Commercial lead (currently unassigned — LT to appoint). Action: secure a minimum of three signed pilot-event agreements or dated LOIs.',
  },
  {
    pillar: 'Regulatory & Compliance Data',
    required: 'All-in pricing rules, privacy and consent obligations, and tax treatment for each jurisdiction in which campaigns run',
    acquire: 'Free regulator and government sources initially. Avalara\'s Tax Calculation and Returns Compliance Package is priced from USD 699 (billing period not stated on the vendor\'s page) [LIST]; the full compliance suite is quote-only [UNKNOWN].',
    outcome: 'Compliance posture in each jurisdiction has not yet been assessed by counsel, and no compliance claim is made for any jurisdiction. The one confirmed regulatory fact: the FTC\'s all-in pricing rule took effect 12 May 2025.',
  },
];

// Strategic options assessed against the risk register, with a single recommendation.
// Option B carries the gated schedule, where every dollar is either priced or explicitly
// [UNKNOWN] and no cumulative total is published.
export const STRATEGIC_OPTIONS = [
  {
    key: 'A',
    name: 'Accelerated Multi-Market Launch',
    investment: 'No figure is published — no cost build-up exists for this option',
    detail: 'Simultaneous entry into all five markets with a larger team, premium data contracts and higher event operations.',
    assessment: 'Fastest route to scale on paper, but nothing prices it, and it multiplies entity, compliance and acquisition-cost risks across five jurisdictions at once.',
    recommended: false,
  },
  {
    key: 'B',
    name: 'Staged, Data-Led Expansion — Australia First',
    investment: 'Gated stages, each priced or explicitly [UNKNOWN] — no cumulative total is published: G0 A$1,920.00 [DERIVED] (4.0 analyst-days [ASSUMPTION]); G1 A$2,880.00 [DERIVED] (6.0 analyst-days [ASSUMPTION]) + study and legal fees [UNKNOWN]; G2 A$5,860.00 or A$9,876.74 [DERIVED], whose setup-labour share (7.0 and 8.0 analyst-days) holds only under the unconfirmed consultant rate and day count [ASSUMPTION]. Every analyst-labour line on this schedule is conditional; none is a committed price.',
    detail: 'Prove the Australian market with contracted inventory and the marketing data programme, then extend through partner-led corridors to the UK, US, Canada and the EU as gates are passed.',
    assessment: 'Aligns capital with evidence: each stage is funded only when the prior gate — due diligence & terms (G0), discovery (G1), MVP build (G2) — is passed. ROI is not computable at any gate until partnership terms (U-02), contracted supply (U-03) and the primary demand study (U-04) exist.',
    recommended: true,
  },
  {
    key: 'C',
    name: 'Defer International Investment',
    investment: 'No new capital committed',
    detail: 'Maintain the existing India-focused operation and revisit expansion at a later date.',
    assessment: 'Eliminates near-term capital risk. No first-mover or competitive-displacement cost is published for deferral: no source supports one.',
    recommended: false,
  },
];

export const REVENUE_STREAMS = [
  { stream: 'Ticket Commission / Service Fee', model: 'Percentage of ticket face value (target 8–12% take rate)', priority: 'Core — must prove first' },
  { stream: 'Organiser Platform Fee', model: 'Per-event or subscription fee for organiser tools', priority: 'Pilot — test willingness-to-pay' },
  { stream: 'Promoted Placement', model: 'Featured event listings, sponsored recommendations', priority: 'Secondary — launch when inventory scales' },
  { stream: 'Advertising', model: 'Event-relevant brand advertising on platform', priority: 'Later — requires audience scale' },
  { stream: 'B2B API Licensing', model: 'Ticketing technology and inventory access for partners', priority: 'Later — requires proven, stable technology' },
  { stream: 'Dynamic Pricing', model: 'Demand-responsive pricing optimisation', priority: 'Later — requires data maturity and ML capability' },
];

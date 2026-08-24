// Deliverable 3 — insights, map callouts, marketing data plan, strategic options.

// "What the data buys" — the benefits that stand on evidence.
export const INSIGHTS_KEPT = [
  {
    n: 1,
    category: 'Regulatory Compliance',
    insight: 'FTC all-in pricing rule compliance prevents enforcement action',
    impact: 'The FTC Rule on Unfair or Deceptive Fees, effective 12 May 2025, applies to live-event ticketing; compliance prevents enforcement action under the rule, and the regulatory materials are free. What compliance costs is a legal-advice question: quote on request.',
    basis: 'Source: FTC — rule effective 12 May 2025 (ftc.gov)',
  },
  {
    n: 2,
    category: 'Competitive Benchmarking — qualitative only',
    insight: 'Audited take-rate benchmarks, free',
    impact: "Live Nation's FY2025 10-K reports 346 million fee-bearing tickets on US$37.1 billion of fee-bearing GTV — a statutory SEC filing, and a sanity bound on per-ticket fee economics at gate G1. Benchmark use only: an audited filing may never serve as a cost comparator for an entity of this size, and no revenue figure for this programme may be derived from one.",
    basis: 'Live Nation 10-K FY2025, SEC EDGAR',
  },
];

// Key market indicators.
export const MAP_CALLOUTS = [
  { title: 'Australian Demand', body: '64% of Australian adults attended at least one cultural venue or event in 2021–22, with 82.4% in 2017–18 as the pre-pandemic benchmark. Greater-capital-city residents attended at 65% against 61% elsewhere — a modest four-point gap, not a concentration effect.', source: 'ABS, Cultural and creative activities 2021–22' },
  { title: 'UK Live Entertainment Scale', body: 'What stands for the UK is the official statistic: 90.6% of adults in England engaged with the arts in 2024/25 — a broad measure including digital engagement, down from 91.4% in 2023/24.', source: 'DCMS Participation Survey 2024/25' },
  { title: 'India-Born Stock by Market, 2024', body: 'AU 876,074 · UK 1,044,779 · US 3,165,238 · CA 1,015,630 · Europe region 2,021,502 — the comparable cross-market denominators, on one consistent basis. The Europe-region count is the proxy for the “EU” market: it includes the UK and non-EU states. Total migrant stock of every origin (304 million globally) is not the addressable segment; even these counts only bound it, because country-of-birth carries no language or demand dimension — the AU Marathi-at-home count is 22,263. These are the comparable denominators, not per-country ceilings: on Australia’s own national measure the ABS counts 971,020 India-born residents (Estimated Resident Population, 30 June 2025 — the largest overseas-born group on record), 94,946 above UN DESA’s mid-2024 estimate of 876,074. Canada is the same case in the other direction: Statistics Canada’s 2021 Census counts 898,045 India-born immigrants (permanent residents, 25% sample, reference date 11 May 2021), 117,585 below UN DESA’s mid-2024 estimate of 1,015,630 above, and it is the 898,045 figure this proposal uses lower on this page and on the Canada market page. Different collector, different measure, different reference date in both cases; both figures in each pair are verified and neither replaces the other.', source: 'UN DESA, International Migrant Stock 2024 (destination × origin)' },
];

// What data is required, how to acquire it, and the marketing or business outcome it drives.
// Every priced figure below is checked against the vendor's own published pricing page.
export const MARKETING_DATA_PLAN = [
  {
    pillar: 'Audience & Demographic Data',
    required: 'Census ancestry and language tabulations, migration statistics and cultural participation rates for each target market and city',
    acquire: 'The US Census Bureau and Eurostat APIs are free, so no spend is incurred. ABS custom tabulations and UK ONS custom data are quoted on request.',
    outcome: 'Precise geo-targeted campaign planning by city and suburb — a qualitative benefit, not a costed one.',
  },
  {
    pillar: 'First-Party Transaction & Consent Data',
    required: 'Order-to-payment reconciliation, CRM records, marketing consent register and repeat-purchase history from the existing platform',
    acquire: 'An internal disclosure by the Ticketalay principal under NDA: the database dictionary, a consent-register sample and app-console exports. Nil cost.',
    outcome: 'Order-to-payment reconciliation and consent-based segmentation, measured against the disclosed data once it is in hand.',
  },
  {
    pillar: 'Competitive & Channel Intelligence',
    required: 'Competitor web traffic, app engagement, keyword pricing and take-rate benchmarks across the five markets',
    acquire: 'Each figure is given at the level the vendor actually publishes: Similarweb self-serve tiers at USD 129–649/mo (= USD 1,548–7,788/yr, calculated: monthly rate × 12); Semrush at USD 117.33–455.67/mo billed annually (= about USD 1,408–5,468/yr, calculated: annual per-month rate × 12). Neither vendor publishes an annual band, so the yearly figures are annualisations, and are described as such wherever they appear.',
    outcome: 'Take-rate and channel-pricing benchmarks to inform the fee-tolerance study at gate G1.',
  },
  {
    pillar: 'Geospatial & Venue Data',
    required: 'Geocoded venue locations, audience proximity and catchment analysis for event placement and local media buying',
    acquire: 'Google Maps geocoding is priced at USD 0 within the 10,000 req/mo free cap, then USD 5.00/1,000. At 100,000 calls a year that is USD 0–450/yr, calculated: (100,000 − 10,000) × 5.00 ÷ 1,000, depending on how the calls spread across months, on an assumed 10,000 req/mo or fewer. OpenCage publishes an X-Small tier at USD 50/mo (= USD 600/yr calculated: 50 × 12), which is sufficient for this workload; its Medium tier at USD 500/mo (= USD 6,000/yr calculated: 500 × 12) is oversized for it.',
    outcome: 'Localised campaign targeting around venues, once venues are under contract — none are contracted at time of writing.',
  },
  {
    pillar: 'Partner & B2B Enrichment Data',
    required: 'Verified contact and firmographic data for promoters, producers, venues and cultural associations',
    acquire: 'Apollo.io Professional is priced at USD 79/seat/mo billed annually (= USD 948/yr calculated: 79 × 12) ≈ A$1,326.80, calculated: 948 ÷ 0.7145 at the RBA rate for 21 Aug 2026. Apollo publishes no annual band, so the yearly figure is an annualisation and is described as one wherever it appears. People Data Labs Pro is priced at USD 940/yr on annual billing — the vendor\'s own yearly figure, not an annualisation; PDL publishes no paid pilot tier.',
    outcome: 'A qualified pipeline of organiser and venue targets, built towards the minimum of three signed pilot-event agreements or dated letters of intent that gate G1 requires.',
  },
  {
    pillar: 'Regulatory & Compliance Data',
    required: 'All-in pricing rules, privacy and consent obligations, and tax treatment for each jurisdiction in which campaigns run',
    acquire: 'Free regulator and government sources initially. Avalara publishes its Tax Calculation and Returns Compliance Package from USD 699, with the billing period not stated on the vendor\'s page; the full compliance suite is quote on request.',
    outcome: 'Compliance posture in each jurisdiction has not yet been assessed by counsel, and no compliance claim is made for any jurisdiction. The one confirmed regulatory fact: the FTC\'s all-in pricing rule took effect 12 May 2025.',
  },
];

// Strategic options assessed against the risk register, with a single recommendation.
// Option B carries the gated schedule, priced gate by gate.
export const STRATEGIC_OPTIONS = [
  {
    key: 'A',
    name: 'Accelerated Multi-Market Launch',
    investment: 'Costed on request against a defined five-market scope',
    detail: 'Simultaneous entry into all five markets with a larger team, premium data contracts and higher event operations.',
    assessment: 'Fastest route to scale on paper, but it multiplies entity, compliance and acquisition-cost risks across five jurisdictions at once.',
    recommended: false,
  },
  {
    key: 'B',
    name: 'Staged, Data-Led Expansion — Australia First',
    investment: 'Gated stages, priced gate by gate: G0 A$1,920.00 (4.0 analyst-days at A$60.00/hr); G1 A$2,880.00 (6.0 analyst-days), alongside study and legal fees quoted on request; G2 A$5,860.00 at the floor configuration or A$9,876.74 at the full one, of which 7.0 and 8.0 analyst-days respectively are setup labour.',
    detail: 'Prove the Australian market with contracted inventory and the marketing data programme, then extend through partner-led corridors to the UK, US, Canada and the EU as gates are passed.',
    assessment: 'Aligns capital with evidence: each stage is funded only when the prior gate — due diligence & terms (G0), discovery (G1), MVP build (G2) — is passed. The partnership terms, the contracted supply and the primary demand study are the deliverables that unlock the return case.',
    recommended: true,
  },
  {
    key: 'C',
    name: 'Defer International Investment',
    investment: 'No new capital committed',
    detail: 'Maintain the existing India-focused operation and revisit expansion at a later date.',
    assessment: 'Eliminates near-term capital risk, at the cost of whatever first-mover position the corridor offers.',
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

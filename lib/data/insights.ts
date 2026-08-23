// DELIVERABLE 3 — insights, data ROI, map callouts, marketing data plan, strategic options.
export const INSIGHTS = [
  { n: 1, category: 'First-Party Transactions', insight: 'Order-to-payment reconciliation identifies settlement discrepancies', impact: 'Potential recovery of 1–3% of GTV through accurate reconciliation [EST]', basis: 'Industry benchmark for payment reconciliation accuracy' },
  { n: 2, category: 'Customer Segmentation', insight: 'Consent-based audience segmentation enables targeted campaigns', impact: '15–25% improvement in campaign conversion rates [EST]', basis: 'Digital marketing benchmarks: segmented vs unsegmented campaigns' },
  { n: 3, category: 'Market Intelligence', insight: 'Cultural participation data by country enables evidence-based market prioritisation', impact: 'Avoids AUD 500,000–2,000,000 in misdirected market-entry investment [EST]', basis: 'Estimated entry costs per market from research TCO model' },
  { n: 4, category: 'Competitive Benchmarking', insight: 'Live Nation/StubHub financial data provides realistic pricing and take-rate benchmarks', impact: '1% take-rate improvement on base Year 3 GTV = AUD 64,800 additional revenue [EST]', basis: 'Calculated from base scenario: AUD 6.48m GTV × 1%' },
  { n: 5, category: 'Regulatory Compliance', insight: 'FTC all-in pricing rule compliance prevents enforcement action', impact: 'Avoids potential FTC penalties and reputational damage in US market', basis: 'FTC rule effective 12 May 2025' },
  { n: 6, category: 'Geospatial Analytics', insight: 'Venue-audience proximity analysis optimises event placement', impact: '10–20% improvement in sell-through rates for optimally placed events [EST]', basis: 'Event industry venue-matching benchmarks' },
];

export const DATA_ROI = [
  { category: 'First-party data (internal)', costMin: 0, costMax: 0, valueMin: 150000, valueMax: 400000, roi: 'Foundational' },
  { category: 'Public statistics', costMin: 0, costMax: 0, valueMin: 50000, valueMax: 200000, roi: 'High' },
  { category: 'Competitive intelligence', costMin: 15000, costMax: 45000, valueMin: 30000, valueMax: 120000, roi: 'Moderate' },
  { category: 'B2B enrichment', costMin: 10000, costMax: 40000, valueMin: 20000, valueMax: 80000, roi: 'Moderate' },
  { category: 'Geospatial', costMin: 2000, costMax: 10000, valueMin: 10000, valueMax: 50000, roi: 'High' },
  { category: 'Tax/compliance', costMin: 15000, costMax: 45000, valueMin: 25000, valueMax: 100000, roi: 'High (cost avoidance)' },
];

export const MAP_CALLOUTS = [
  { title: 'Australian Demand', body: '64% of Australian adults attended at least one cultural venue or event in 2021–22, with 82.4% in 2017–18 as the pre-pandemic benchmark. Greater-capital-city residents attend at higher rates — the exact geographies where diaspora audiences concentrate.', source: 'ABS [18][20]' },
  { title: 'UK Live Entertainment Scale', body: 'UK consumer spending on live music reached GBP 6.7 billion in 2024 (approximately AUD 13.4 billion [EST]), up 9.5% year-on-year, with 91% of adults in England engaging with the arts in 2024/25.', source: 'UK Government / DCMS [30][104]' },
  { title: 'Global Diaspora Context', body: '304 million international migrants were recorded globally in 2024 — the structural driver of demand for culturally specific live entertainment across all five target markets.', source: 'UN DESA [15]' },
];

// What data was asked for, what is required, how to acquire it, and the marketing/business outcome it drives.
// All figures from D1 (provider catalogue), D5 (costing) and the research insight benchmarks above.
export const MARKETING_DATA_PLAN = [
  {
    pillar: 'Audience & Demographic Data',
    required: 'Census ancestry and language tabulations, migration statistics and cultural participation rates for each target market and city',
    acquire: 'ABS Census custom tabulations (AUD 0–2,000), UK ONS custom data (AUD 0–1,500), US Census Bureau and Eurostat APIs (free)',
    outcome: 'Precise geo-targeted campaign planning by city and suburb; avoids AUD 500,000–2,000,000 in misdirected market-entry spend [EST]',
  },
  {
    pillar: 'First-Party Transaction & Consent Data',
    required: 'Order-to-payment reconciliation, CRM records, marketing consent register and repeat-purchase history from the existing platform',
    acquire: 'Internal exports secured in the first 30 days of the programme — no acquisition cost; ownership and access rights must be demonstrated',
    outcome: 'Consented reachable audience grown from 5,000 to 40,000 [EST]; segmented campaigns lift conversion 15–25% [EST]; reconciliation recovers 1–3% of GTV [EST]',
  },
  {
    pillar: 'Competitive & Channel Intelligence',
    required: 'Competitor web traffic, app engagement, keyword pricing and take-rate benchmarks across the five markets',
    acquire: 'Similarweb Pro (AUD 15,500–30,000/yr) and SEMrush Business (AUD 3,100–6,200/yr), trialled before contract in days 61–90',
    outcome: 'Evidence-based channel selection and pricing: each 1% take-rate improvement adds AUD 64,800 of Year-3 revenue [EST]',
  },
  {
    pillar: 'Geospatial & Venue Data',
    required: 'Geocoded venue locations, audience proximity and catchment analysis for event placement and local media buying',
    acquire: 'Google Maps Platform (AUD 775–3,100/yr) and OpenCage geocoding (AUD 930–2,800/yr)',
    outcome: '10–20% improvement in sell-through for optimally placed events [EST]; localised campaign targeting around confirmed venues',
  },
  {
    pillar: 'Partner & B2B Enrichment Data',
    required: 'Verified contact and firmographic data for promoters, producers, venues and cultural associations',
    acquire: 'Apollo.io Professional (AUD 1,800–3,600/yr) and a People Data Labs enrichment pilot (AUD 1,550–4,650)',
    outcome: 'Qualified pipeline of 50–200 organiser targets and 20–100 venues [EST] — the inventory that every consumer campaign depends on',
  },
  {
    pillar: 'Regulatory & Compliance Data',
    required: 'All-in pricing rules, privacy and consent obligations, and tax treatment for each jurisdiction in which campaigns run',
    acquire: 'Free regulator and government sources initially; Avalara starter tier (AUD 7,750–15,500/yr) when scaling',
    outcome: 'Campaigns compliant in five jurisdictions from day one; avoids FTC all-in pricing enforcement exposure in the US market',
  },
];

// Strategic options assessed against the risk register, with a single recommendation.
export const STRATEGIC_OPTIONS = [
  {
    key: 'A',
    name: 'Accelerated Multi-Market Launch',
    investment: 'AUD 25.0m over three years [EST]',
    detail: 'Simultaneous entry into all five markets with a larger team, premium data contracts and higher event operations.',
    assessment: 'Fastest route to scale, but requires 5.87 million tickets to recover cost [EST] and multiplies entity, compliance and acquisition-cost risks across five jurisdictions at once.',
    recommended: false,
  },
  {
    key: 'B',
    name: 'Staged, Data-Led Expansion — Australia First',
    investment: 'AUD 5.0m–12.6m, released in gated stages [EST]',
    detail: 'Prove the Australian market with contracted inventory and the marketing data programme, then extend through partner-led corridors to the UK, US, Canada and the EU as gates are passed.',
    assessment: 'Aligns capital with evidence: each stage is funded only when the prior gate — entity, data feasibility, pilot contribution — is met. Contains the top five register risks while preserving the full five-market ambition.',
    recommended: true,
  },
  {
    key: 'C',
    name: 'Defer International Investment',
    investment: 'No new capital committed',
    detail: 'Maintain the existing India-focused operation and revisit expansion at a later date.',
    assessment: 'Eliminates near-term capital risk but forfeits first-mover position in an unconsolidated niche while competitors such as DICE and Fever expand into culturally specific programming.',
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

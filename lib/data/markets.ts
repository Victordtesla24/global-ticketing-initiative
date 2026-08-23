// DELIVERABLE 4 — per-market entry strategies. All AUD. [EST]/[UNVERIFIED] preserved.
export interface MarketProjectionRow { label: string; y1: string; y2: string; y3: string; }
export interface MarketPhase { phase: string; period: string; actions: string; gate?: string; }
export interface Market {
  slug: string;
  name: string;
  shortName: string;
  status: string;
  heroStat: string;
  heroStatSource: string;
  hotspots: { city: string; lat: number; lon: number }[];
  evidence: string;
  tam: string;
  sam: string;
  som: string;
  entryMode: string;
  timeline: MarketPhase[];
  projections: MarketProjectionRow[];
  projectionNote: string;
  regulatory: string[];
  partnerships: { type: string; detail: string }[];
  bubble: { diaspora: number; spendLabel: string; tam: number; readiness: number };
  confidenceNote: string;
}

export const MARKETS: Market[] = [
  {
    slug: 'australia', name: 'Australia', shortName: 'AU', status: 'Deep Penetration (Proof Market)',
    heroStat: '64% of adults attended a cultural venue or event (2021–22)', heroStatSource: 'ABS [20]',
    hotspots: [ { city: 'Sydney', lat: -33.87, lon: 151.21 }, { city: 'Melbourne', lat: -37.81, lon: 144.96 } ],
    evidence: 'In 2021–22, 64% of Australian adults aged 15 and over attended at least one cultural venue or event (down from 82.4% in 2017–18). Greater-capital-city residents showed higher cultural attendance. The specific Marathi and Indian-origin segment requires bottom-up sizing. Exact Marathi-speaking population figures are not available from the research and should be obtained from ABS Census ancestry and language data.',
    tam: 'GTV AUD 6.6m–13.6m [EST] — built bottom-up: 200–400 relevant events × 300–600 seats × 60–80% sell-through × AUD 55–85 ATV',
    sam: 'GTV AUD 2.0m–6.8m [EST] — events contractable by Ticketalay, 30–50% of TAM',
    som: 'GTV AUD 0.4m–2.7m [EST] — achievable transaction share, 20–40% of SAM',
    entryMode: 'Establish or contract through a verified Australian entity only after legal advice. Begin with a local promoter-led pilot and contracted inventory rather than a broad consumer launch. Prerequisites: ABN/ASIC verification, Privacy Act assessment, GST registration, compliant payment gateway, consumer protection review.',
    timeline: [
      { phase: 'Phase 0: Verify', period: 'Months 0–3', actions: 'Legal verification; Australian structure; event inventory audit; data audit; 10–15 promoter interviews [EST]', gate: 'At least one contractable pilot event and reconciled baseline' },
      { phase: 'Phase 1: Pilot', period: 'Months 4–6', actions: 'Pilot 3–5 events [EST]; all-in pricing; support and scanning; measure contribution', gate: 'Positive contribution before fixed platform cost' },
      { phase: 'Phase 2: Expand', period: 'Months 7–12', actions: 'Expand to 12–24 events [EST]; repeat-buyer and referral tests', gate: 'Repeat purchase rate and CAC within approved threshold' },
      { phase: 'Phase 3: Deepen', period: 'Months 13–24', actions: 'Add venues and adjacent categories; organiser portal; partnerships', gate: 'Inventory concentration and reliability acceptable' },
      { phase: 'Phase 4: National', period: 'Months 25–36', actions: 'National city expansion only where contracted inventory exists', gate: 'Market-level contribution positive' },
    ],
    projections: [
      { label: 'Events (base)', y1: '48', y2: '96', y3: '180' },
      { label: 'Tickets', y1: '19,200', y2: '43,200', y3: '90,000' },
      { label: 'GTV', y1: '1,248,000', y2: '2,937,600', y3: '6,480,000' },
      { label: 'Platform Revenue (10% take rate)', y1: '124,800', y2: '293,760', y3: '648,000' },
      { label: 'Transaction Cost (2% of GTV)', y1: '(24,960)', y2: '(58,752)', y3: '(129,600)' },
      { label: 'Acquisition Cost', y1: '(53,760)', y2: '(90,720)', y3: '(135,000)' },
      { label: 'Fixed Operating Cost', y1: '(500,000)', y2: '(700,000)', y3: '(900,000)' },
      { label: 'Operating Result', y1: '(453,920)', y2: '(555,712)', y3: '(516,600)' },
    ],
    projectionNote: 'Base scenario [EST]. Conservative and optimistic AU scenarios span operating results of (576,800) to +364,000 by Year 3. Break-even requires 211,268 tickets (~423 events) against 90,000 modelled — base case does not break even within three years.',
    regulatory: [ 'ABN and ASIC registration or verification', 'Australian Privacy Act compliance assessment', 'GST registration and tax structure', 'Payment gateway integration (Australian-compliant)', 'Consumer protection compliance review' ],
    partnerships: [
      { type: 'Marathi cultural associations (Critical)', detail: 'Audience access, event promotion, community credibility' },
      { type: 'Established promoters (Critical)', detail: 'Marathi drama and Hindi comedy event inventory, production expertise' },
      { type: 'Community venues (High)', detail: 'Town halls, cultural centres, theatres — venue access and local infrastructure' },
      { type: 'Universities (Medium)', detail: 'Indian student associations — youth audience, campus events' },
      { type: 'Payment providers (Critical)', detail: 'Stripe, Square — Australian-certified transaction processing' },
      { type: 'Customer support provider (High)', detail: 'Australian-based buyer and organiser support' },
    ],
    bubble: { diaspora: 0.8, spendLabel: 'High (64% cultural attendance)', tam: 2.5, readiness: 4 },
    confidenceNote: 'Strongest-evidenced market. Cultural participation data is pandemic-affected (2021–22); use 2017–18 (82.4%) as upper bound.',
  },
  {
    slug: 'uk', name: 'United Kingdom', shortName: 'UK', status: 'Partner-Led Corridor Candidate',
    heroStat: 'GBP 6.7bn consumer spend on live music (2024); 91% arts engagement in England (2024/25)', heroStatSource: 'DCMS [30][104]',
    hotspots: [ { city: 'London', lat: 51.51, lon: -0.13 }, { city: 'Birmingham', lat: 52.49, lon: -1.89 } ],
    evidence: 'UK consumer spending on live music reached GBP 6.7 billion in 2024 (approximately AUD 13.4 billion [EST] at GBP 1 = AUD 2.00), up 9.5% year-on-year. In England, 91% of adults engaged with the arts in 2024/25. The UN estimated 11.8 million international migrants in the UK in 2024. These figures indicate strong cultural demand but do not quantify Marathi or Indian-origin event buyers.',
    tam: 'GBP 6.7bn broadly (AUD 13.4bn [EST]). Ticketalay’s addressable niche is a fraction of one percent, requiring bottom-up event inventory sizing.',
    sam: '50–150 relevant Indian-origin cultural events annually [EST], concentrated in London, Birmingham, Leicester, Manchester and Leeds',
    som: '10–30% of SAM events contractable in first three years [EST]',
    entryMode: 'Local promoter partnership and agency/distribution arrangement before entity formation. Do not establish a UK entity until positive contribution and repeat demand are demonstrated.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Remote partner discovery; two event tests [EST]; regulatory assessment' },
      { phase: 'Pilot', period: 'Months 13–24', actions: '8–15 events through one anchor promoter [EST]; pricing compliance' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Entity decision only after positive contribution and repeat demand' },
    ],
    projections: [
      { label: 'Events (base)', y1: '0 (research)', y2: '10', y3: '25' },
      { label: 'Tickets', y1: '0', y2: '4,500', y3: '12,500' },
      { label: 'GTV', y1: '0', y2: '382,500', y3: '1,125,000' },
      { label: 'Platform Revenue (10%)', y1: '0', y2: '38,250', y3: '112,500' },
      { label: 'Operating Cost (allocated)', y1: '(50,000)', y2: '(150,000)', y3: '(250,000)' },
      { label: 'Operating Result', y1: '(50,000)', y2: '(111,750)', y3: '(137,500)' },
    ],
    projectionNote: 'ATV of AUD 85 [EST] (UK pricing premium). Operating costs include partner management, compliance and allocated platform overhead.',
    regulatory: [ 'UK GDPR compliance (separate from EU GDPR post-Brexit)', 'Consumer Rights Act 2015 (refund and cancellation obligations)', 'VAT on digital services and ticket sales', 'Performer visa requirements (Tier 5 Creative and Sporting)', 'Ticket resale regulations', 'All require UK legal counsel [UNVERIFIED in detail]' ],
    partnerships: [
      { type: 'UK-based Marathi drama promoters', detail: 'Direct discovery required' },
      { type: 'Indian cultural centres', detail: 'London, Birmingham — community trust and venue access' },
      { type: 'UK arts councils and diversity programmes', detail: 'Funding and promotion support' },
      { type: 'UK payment providers', detail: 'Stripe UK, local gateway options' },
    ],
    bubble: { diaspora: 1.5, spendLabel: 'Very High (GBP 6.7bn live music)', tam: 5.0, readiness: 3 },
    confidenceNote: 'Strong demand signals; addressable niche unquantified. England-specific arts data does not cover the whole UK.',
  },
  {
    slug: 'usa', name: 'United States', shortName: 'USA', status: 'Feasibility — Highest Complexity',
    heroStat: '52.4m international migrants (2024); Ticketmaster distributed 646m tickets in 2025', heroStatSource: 'Census/NEA [15][27]; Live Nation [44]',
    hotspots: [ { city: 'New York', lat: 40.71, lon: -74.01 }, { city: 'Los Angeles', lat: 34.05, lon: -118.24 }, { city: 'Chicago', lat: 41.88, lon: -87.63 } ],
    evidence: 'The US hosted approximately 52.4 million international migrants in 2024. The NEA’s SPPA provides national arts-attendance evidence. The FTC’s all-in pricing rule took effect 12 May 2025. Ticketmaster distributed 646 million tickets (346 million fee-bearing) in 2025 — the market is dominated by vertically integrated incumbents. Niche entry requires differentiated inventory, not price competition.',
    tam: 'Diaspora concentrated in New York/New Jersey, SF Bay Area, Chicago, Los Angeles and Dallas-Fort Worth. Estimated 100–300 relevant cultural events annually in major metros [EST].',
    sam: 'Bottom-up sizing required from verified metro event inventory',
    som: '5–15% of contractable events in first three years [EST], starting with one metro corridor',
    entryMode: 'Promoter/agent partnership with local ticketing and tax support. Avoid independent artist promotion until immigration, insurance, venue and cancellation capabilities mature.',
    timeline: [
      { phase: 'Feasibility', period: 'Months 0–12', actions: 'Partner, pricing and visa feasibility; regulatory assessment' },
      { phase: 'Pilot', period: 'Months 13–24', actions: '2–5 pilot events in one metro [EST]; FTC compliance' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Scale only if contribution, compliance and partner renewal meet thresholds' },
    ],
    projections: [
      { label: 'Events (base)', y1: '0 (feasibility)', y2: '5', y3: '15' },
      { label: 'Tickets', y1: '0', y2: '3,000', y3: '10,500' },
      { label: 'GTV', y1: '0', y2: '279,000', y3: '1,039,500' },
      { label: 'Platform Revenue (10%)', y1: '0', y2: '27,900', y3: '103,950' },
      { label: 'Operating Cost (allocated)', y1: '(75,000)', y2: '(200,000)', y3: '(350,000)' },
      { label: 'Operating Result', y1: '(75,000)', y2: '(172,100)', y3: '(246,050)' },
    ],
    projectionNote: 'ATV of AUD 93 [EST] (USD 60 × 1.55). Higher operating costs reflect US regulatory complexity, immigration support and tax compliance.',
    regulatory: [ 'FTC all-in pricing rule compliance', 'BOTS Act enforcement', 'State-level consumer protection and ticket resale laws', 'Performer visa pathways: O-1B, P-1B, P-2, P-3', 'CCPA/state privacy laws', 'State and local sales tax (entertainment/amusement tax varies by jurisdiction)', 'PCI-DSS compliance', 'All require US legal counsel' ],
    partnerships: [
      { type: 'US-based Indian cultural promoters and producers (Critical)', detail: 'Event inventory and production' },
      { type: 'Marathi Mandals and cultural associations (Critical)', detail: 'NJ, CA, IL community access' },
      { type: 'Immigration attorneys (Critical)', detail: 'Entertainment visa specialists' },
      { type: 'US payment and tax compliance providers (High)', detail: 'Stripe, Avalara' },
    ],
    bubble: { diaspora: 4.5, spendLabel: 'Very High (large arts economy)', tam: 12.0, readiness: 2 },
    confidenceNote: 'Largest indicative TAM but lowest readiness among priority corridors: incumbent dominance, state-by-state regulation and immigration complexity.',
  },
  {
    slug: 'canada', name: 'Canada', shortName: 'CA', status: 'Research-Only — Least Evidenced',
    heroStat: 'Official cultural-attendance data [UNVERIFIED] — Statistics Canada required', heroStatSource: '[UNVERIFIED]',
    hotspots: [ { city: 'Toronto', lat: 43.65, lon: -79.38 }, { city: 'Vancouver', lat: 49.28, lon: -123.12 } ],
    evidence: 'No Canada-specific diaspora, cultural-attendance or official ticket-market metric was successfully supplied in the research. Canadian opportunity is therefore [UNVERIFIED] and must be modelled from Statistics Canada data, local event inventory and promoter evidence.',
    tam: 'Diaspora concentrated in Toronto, Vancouver, Calgary and Edmonton. Estimated 50–120 relevant cultural events annually [EST], requiring validation.',
    sam: 'Cannot be reliably estimated without verified inventory data',
    som: 'Cannot be reliably estimated without verified inventory data',
    entryMode: 'Research-only status, followed by a local promoter distribution pilot if the bottom-up SAM passes the hurdle rate. Do not invest in Canadian operations until Australia and one international corridor demonstrate positive economics.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Obtain Statistics Canada data; inventory local events; promoter interviews' },
      { phase: 'Assessment', period: 'Months 13–24', actions: 'One-city pilot if bottom-up SAM justifies it' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Consider second city only after first-market renewal' },
    ],
    projections: [
      { label: 'Events (base)', y1: '0 (research)', y2: '3', y3: '10' },
      { label: 'Tickets', y1: '0', y2: '1,200', y3: '5,000' },
      { label: 'GTV', y1: '0', y2: '93,600', y3: '425,000' },
      { label: 'Platform Revenue (10%)', y1: '0', y2: '9,360', y3: '42,500' },
      { label: 'Operating Cost (allocated)', y1: '(25,000)', y2: '(80,000)', y3: '(150,000)' },
      { label: 'Operating Result', y1: '(25,000)', y2: '(70,640)', y3: '(107,500)' },
    ],
    projectionNote: 'ATV of AUD 78 [EST] (CAD 55 × 1.42 [EST]). Lower confidence than other markets due to evidence gaps.',
    regulatory: [ 'PIPEDA compliance', 'Provincial consumer protection laws', 'GST/HST on digital services', 'Performer work permit requirements', 'Provincial entertainment regulations', 'All require Canadian legal counsel [UNVERIFIED in detail]' ],
    partnerships: [ { type: 'Local promoters and cultural associations', detail: 'Direct discovery required — no verified pipeline exists' } ],
    bubble: { diaspora: 1.2, spendLabel: 'Medium [UNVERIFIED]', tam: 2.0, readiness: 1 },
    confidenceNote: 'Materially incomplete evidence. The adversarial review recommends commissioning dedicated Canada research before any market-entry decision.',
  },
  {
    slug: 'eu', name: 'European Union', shortName: 'EU', status: 'Country Selection — Not One Market',
    heroStat: '94m international migrants in Europe (2024); participation varies materially by country', heroStatSource: 'Eurostat/UN [15][32]',
    hotspots: [ { city: 'Amsterdam', lat: 52.37, lon: 4.9 }, { city: 'Frankfurt', lat: 50.11, lon: 8.68 }, { city: 'Paris', lat: 48.86, lon: 2.35 } ],
    evidence: 'Europe hosted 94 million international migrants in 2024. Eurostat shows material country variation in cultural participation; Luxembourg recorded 48.5% attendance at live performances in 2022. Participation tends to be higher among younger, tertiary-educated and urban populations. Do not treat the EU as one market.',
    tam: 'Country-specific. Priority countries for assessment [EST]: Netherlands (Amsterdam), Germany (Frankfurt, Berlin), Belgium (Brussels), Ireland (Dublin).',
    sam: 'Single selected country; sized from verified event inventory, language fit, promoter readiness',
    som: 'Single-country pilot share; requires country selection first',
    entryMode: 'Country-specific promoter partnership in one selected market. Use a local distributor before establishing an entity. GDPR compliance is mandatory from day one.',
    timeline: [
      { phase: 'Country selection', period: 'Months 0–12', actions: 'Rank countries using Eurostat data, verified inventory and promoter readiness' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'One-country pilot with local promoter partner' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Second-country decision only after reusable compliance framework and positive unit economics' },
    ],
    projections: [
      { label: 'Events (base)', y1: '0 (selection)', y2: '5', y3: '12' },
      { label: 'Tickets', y1: '0', y2: '2,000', y3: '6,000' },
      { label: 'GTV', y1: '0', y2: '170,000', y3: '540,000' },
      { label: 'Platform Revenue (10%)', y1: '0', y2: '17,000', y3: '54,000' },
      { label: 'Operating Cost (allocated)', y1: '(30,000)', y2: '(100,000)', y3: '(180,000)' },
      { label: 'Operating Result', y1: '(30,000)', y2: '(83,000)', y3: '(126,000)' },
    ],
    projectionNote: 'ATV of AUD 85 [EST] (EUR 55 × 1.55 [EST]). Single-country model only.',
    regulatory: [ 'GDPR compliance (data controller registration, DPO where required)', 'Country-specific consumer protection, VAT and entertainment licensing', 'Performer visa and work permit requirements (EU Blue Card, national schemes)', 'PSD2 and Strong Customer Authentication (SCA)', 'Country-specific ticket resale regulations', 'All require local legal counsel per country' ],
    partnerships: [ { type: 'Country-specific promoter partner', detail: 'Selected via Eurostat-ranked country assessment; local distributor before entity' } ],
    bubble: { diaspora: 1.0, spendLabel: 'Variable (country-dependent)', tam: 3.5, readiness: 1 },
    confidenceNote: 'GDPR is harmonised but consumer, tax and entertainment law is not. Do not aggregate participation data across countries without harmonisation.',
  },
];

export const CONSOLIDATED_PL = {
  rows: [
    { market: 'Australia', rev: ['124,800', '293,760', '648,000'], op: ['(453,920)', '(555,712)', '(516,600)'] },
    { market: 'United Kingdom', rev: ['0', '38,250', '112,500'], op: ['(50,000)', '(111,750)', '(137,500)'] },
    { market: 'United States', rev: ['0', '27,900', '103,950'], op: ['(75,000)', '(172,100)', '(246,050)'] },
    { market: 'Canada', rev: ['0', '9,360', '42,500'], op: ['(25,000)', '(70,640)', '(107,500)'] },
    { market: 'European Union', rev: ['0', '17,000', '54,000'], op: ['(30,000)', '(83,000)', '(126,000)'] },
  ],
  totalRevenue: ['124,800', '386,270', '960,950'],
  totalOperating: ['(633,920)', '(993,202)', '(1,133,650)'],
  cumulative: ['(633,920)', '(1,627,122)', '(2,760,772)'],
};

export const KPIS = [
  { kpi: 'Gross Ticket Value (GTV)', def: 'Total face value of tickets sold through the platform', y1: '1,248,000', y3: '6,480,000' },
  { kpi: 'Platform Revenue', def: 'GTV multiplied by contracted take rate', y1: '124,800', y3: '648,000' },
  { kpi: 'Contracted Events', def: 'Events with signed organiser agreements', y1: '48', y3: '180' },
  { kpi: 'Paid Tickets Sold', def: 'Total tickets transacted', y1: '19,200', y3: '90,000' },
  { kpi: 'Average Ticket Value (ATV)', def: 'Face value revenue per ticket', y1: '65', y3: '72' },
  { kpi: 'Sell-Through Rate', def: 'Tickets sold as % of available capacity', y1: '60% [EST]', y3: '70% [EST]' },
  { kpi: 'Repeat Purchase Rate', def: 'Buyers purchasing again within 12 months', y1: '15% [EST]', y3: '30% [EST]' },
  { kpi: 'Customer Acquisition Cost (CAC)', def: 'Marketing spend per new buyer', y1: '8', y3: '6' },
  { kpi: 'Contribution per Ticket', def: 'Revenue less transaction and acquisition burden per ticket', y1: '4.26 [EST]', y3: '4.26 [EST]' },
  { kpi: 'Refund Rate', def: 'Refunds as % of GTV', y1: '<5%', y3: '<3%' },
  { kpi: 'NPS', def: 'Net Promoter Score among ticket buyers', y1: 'Baseline', y3: '40+' },
  { kpi: 'Consented Reachable Audience', def: 'Buyers with active marketing consent', y1: '5,000 [EST]', y3: '40,000 [EST]' },
];

export const SEGMENTS = [
  { name: 'Marathi Theatre Loyalists', size: '15–25% of addressable audience [EST]', profile: 'First-generation diaspora, aged 40–65, strong cultural attachment, Marathi language preference', clv: '3–4 events/yr × AUD 4.26 × 5 years = AUD 64–85 [EST]', channel: 'Organiser lists, cultural associations, community word-of-mouth', churn: 'Low intrinsic churn; high risk from inventory frequency' },
  { name: 'Family Cultural Attendees', size: '20–30% [EST]', profile: 'Family groups (2–4 members), aged 30–55, weekend availability, price-conscious', clv: '2–3 household events/yr × 3 tickets × AUD 4.26 × 4 years = AUD 102–153 [EST]', channel: 'School/community partnerships, family social media, WhatsApp groups', churn: 'Moderate; scheduling convenience and pricing' },
  { name: 'Students & Young Professionals', size: '15–20% [EST]', profile: 'Second-generation diaspora and international students, aged 18–30, mobile-first, price-sensitive', clv: '2–3 events/yr × AUD 4.26 × 3 years = AUD 26–38 [EST]', channel: 'Campus partnerships, Instagram/YouTube, referral programmes', churn: 'High; price sensitivity and competitor discovery apps' },
  { name: 'Film & Music Enthusiasts', size: '10–15% [EST]', profile: 'Mixed heritage, aged 25–45, digitally engaged, discovery-oriented', clv: '3–5 events/yr × AUD 4.26 × 4 years = AUD 51–85 [EST]', channel: 'Artist social media, music platforms, event discovery apps', churn: 'Moderate; content variety and competitor platforms (DICE, Fever)' },
  { name: 'Tour & Festival Travellers', size: '5–10% [EST]', profile: 'Multi-city attendees, aged 25–50, higher disposable income', clv: '1–2 events/yr × AUD 4.26 + partner referral × 3 years = AUD 13–26 + partner value [EST]', channel: 'Tourism networks, diaspora travel groups, event aggregators', churn: 'Low platform loyalty; event quality and travel convenience' },
  { name: 'Promoters & Producers (B2B)', size: '50–200 organisations across target markets [EST]', profile: 'Event organisers, production companies, cultural associations', clv: '3–10 events/yr × AUD 200–500/event × 3 years = AUD 1,800–15,000 [EST]', channel: 'Direct sales, industry associations, referrals', churn: 'High; multi-homing, fee pressure, competitor features' },
  { name: 'Venues & Cultural Institutions (B2B)', size: '20–100 venues across target markets [EST]', profile: 'Community halls, cultural centres, theatres, university venues', clv: 'Annual contracted contribution minus integration cost [EST]; highly variable', channel: 'Enterprise partnership, venue networks', churn: 'Low churn once integrated; high procurement friction' },
];

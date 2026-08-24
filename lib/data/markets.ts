// Deliverable 4 — per-market entry strategies. Every currency conversion is calculated from
// the RBA's published rates for 21 Aug 2026.

export interface HeroTile { label: string; value: string; note: string }
export interface MarketPhase { phase: string; period: string; actions: string; gate?: string }
export interface Partnership { type: string; criticality: string; detail: string }

export interface MarketRevenue {
  title: string;
  body: string;
  /** Australia only: show the arithmetic identity from lib/data/revenue-model.ts. */
  showIdentity?: boolean;
  note?: string;
  sources?: string[];
}

export interface Market {
  slug: string;
  name: string;
  shortName: string;
  status: string;
  heroStat: string;
  heroStatSource: string;
  heroTilesIntro?: string;
  heroTiles: HeroTile[];
  hotspots: { city: string; lat: number; lon: number }[];
  evidence: string;
  evidenceSources: string[];
  /** "What no purchase can refresh" — release cadence bounds what gate G1 can know. */
  cadence?: { title: string; body: string; source: string };
  entryMode: string;
  entryModeNote?: string;
  timeline: MarketPhase[];
  revenue?: MarketRevenue;
  regulatory: string[];
  regulatoryNote?: string;
  regulatorySources?: string[];
  partnerships: Partnership[];
  partnershipsNote?: string;
  partnershipsSources?: string[];
  confidenceNote: string;
  confidenceTile?: HeroTile;
  confidenceSources?: string[];
}

export const MARKETS: Market[] = [
  {
    slug: 'australia',
    name: 'Australia',
    shortName: 'AU',
    status: 'Deep Penetration (Proof Market)',
    heroStat: '64% of adults attended a cultural venue or event (2021–22); 22,263 people speak Marathi at home (Census 2021)',
    heroStatSource: 'ABS — Cultural and creative activities 2021–22; Census 2021 cultural diversity summary',
    heroTiles: [
      {
        label: 'Adults who attended a cultural venue or event',
        value: '64%',
        note: '2021–22, aged 15+; down from 82.4% in 2017–18. ABS official statistic — source lines below.',
      },
      {
        label: 'Marathi spoken at home, Australia',
        value: '22,263',
        note: 'Census 2021; NSW 9,753 > Vic 7,170. The only official count of the actual target segment — about 2.8% of the Indian-ancestry population.',
      },
    ],
    hotspots: [
      { city: 'Sydney', lat: -33.87, lon: 151.21 },
      { city: 'Melbourne', lat: -37.81, lon: 144.96 },
    ],
    evidence:
      'In 2021–22, 64% of Australian adults aged 15 and over attended at least one cultural venue or event, down from 82.4% in 2017–18. The 2021–22 collection window (July 2020 – June 2022) is pandemic-affected: treat 82.4% (2017–18) as the pre-pandemic upper bound and 64% as the current, COVID-contaminated floor. Greater-capital-city residents attended at a higher rate than the rest of the country — 65% versus 61%, a four-percentage-point gap. The Marathi and Indian-origin segment specifically requires bottom-up sizing from ABS Census ancestry and language data; that figure has been located. 22,263 people nationally reported speaking Marathi at home at the 2021 Census (NSW 9,753; Victoria 7,170). That is the ceiling of what is provable about Australian Marathi demand today — it counts speakers, not ticket buyers, willingness-to-pay or fee tolerance, and “Indian diaspora” size is not a proxy for it.',
    evidenceSources: [
      'ABS, Cultural and creative activities, Australia, 2021–22 — abs.gov.au',
      'ABS, Attendance at Selected Cultural Venues and Events, Australia, 2017–18 — abs.gov.au',
      'ABS Census 2021, Cultural diversity data summary, Tables 4–5 — abs.gov.au',
      'ABS, Australia’s population by country of birth (Estimated Resident Population, June 2025) — abs.gov.au',
    ],
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'The 2026 Census was collected on 11 August 2026, but its language and ancestry variables (LANP/BPLP/ANCP) are first-release items in June 2027: Census 2021 remains the only available bottom-up language dataset until then, and no money can buy fresher Australian diaspora counts before that release. The ABS attendance survey’s 2021–22 release header likewise states “Next release Unknown” — the freshest national attendance figures are the COVID-window ones above, at any price. Both cadence facts bound what gate-G1 discovery can know, and neither is a budget problem.',
      source:
        'Sources: ABS, 2026 Census topics and data release plan (“First release – June 2027”); ABS Cultural and creative activities 2021–22 release header (“Next release Unknown”).',
    },
    entryMode:
      'Establish or contract through a verified Australian entity only after legal advice. Begin with a local promoter-led pilot and contracted inventory rather than a broad consumer launch. Prerequisites: ABN/ASIC verification, Privacy Act assessment, GST registration, compliant payment gateway, consumer protection review.',
    entryModeNote:
      'A programme recommendation, rather than a claim of existing verification or supply.',
    timeline: [
      { phase: 'Phase 0: Verify', period: 'Months 0–3', actions: 'Legal verification; Australian structure; event inventory audit; data audit; promoter interviews', gate: 'At least one contractable pilot event and reconciled baseline' },
      { phase: 'Phase 1: Pilot', period: 'Months 4–6', actions: 'All-in pricing; support and scanning; measure contribution', gate: 'Positive contribution before fixed platform cost' },
      { phase: 'Phase 2: Expand', period: 'Months 7–12', actions: 'Repeat-buyer and referral tests', gate: 'Repeat purchase rate and CAC within approved threshold' },
      { phase: 'Phase 3: Deepen', period: 'Months 13–24', actions: 'Add venues and adjacent categories; organiser portal; partnerships', gate: 'Inventory concentration and reliability acceptable' },
      { phase: 'Phase 4: National', period: 'Months 25–36', actions: 'National city expansion only where contracted inventory exists', gate: 'Market-level contribution positive' },
    ],
    revenue: {
      title: 'Revenue — The Identity and Its Variables',
      body:
        'Australian pilot revenue is stated as the arithmetic identity below, with every variable named and owned. Each variable resolves at the gate that produces it: the partnership terms at G0, and contracted supply and the primary demand study at G1.',
      showIdentity: true,
    },
    regulatory: [
      'ABN and ASIC registration or verification',
      'Australian Privacy Act compliance assessment',
      'GST registration and tax structure',
      'Payment gateway integration (Australian-compliant)',
      'Consumer protection compliance review',
    ],
    regulatoryNote:
      'A structural checklist of standard Australian regulatory prerequisites, framed as work still to be done rather than work completed.',
    partnerships: [
      { type: 'Marathi cultural associations', criticality: 'Critical', detail: 'Audience access, event promotion, community credibility' },
      { type: 'Established promoters', criticality: 'Critical', detail: 'Marathi drama and Hindi comedy event inventory, production expertise' },
      { type: 'Community venues', criticality: 'High', detail: 'Town halls, cultural centres, theatres — venue access and local infrastructure' },
      { type: 'Universities', criticality: 'Medium', detail: 'Indian student associations — youth audience, campus events' },
      { type: 'Payment providers', criticality: 'Critical', detail: 'Stripe and Square both operate in Australia; onboarding terms and the fee schedule for this entity are quoted on request' },
      { type: 'Customer support provider', criticality: 'High', detail: 'Australian-based buyer and organiser support' },
    ],
    partnershipsNote:
      'Self-assessed criticality ratings of prospective, uncontracted partnership categories — no supply or commitment claim is made, and no certification or onboarding status is claimed for any payment provider.',
    confidenceNote:
      'Strongest-evidenced market. Australia is the only market in this proposal with verified official attendance statistics plus a real, if unquantified, local partnership. Cultural participation data is pandemic-affected (2021–22); use 2017–18 (82.4%) as the upper bound.',
    confidenceSources: [
      'Self-assessment, consistent with the evidence base: Australia carries verified ABS attendance and Census data that no other market in this proposal can match.',
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    status: 'Partner-Led Corridor Candidate',
    heroStat: '90.6% of adults engaged with the arts, England (2024/25) — DCMS',
    heroStatSource: 'DCMS, Participation Survey 2024/25; UN DESA, International Migrant Stock 2024',
    heroTiles: [
      {
        label: 'Adults who engaged with the arts, England, 2024/25',
        value: '90.6%',
        note: 'DCMS Participation Survey — its published headline rounds to 91%. England only; a broad measure including digital engagement, not live-event attendance. Down from 91.4% in 2023/24.',
      },
      {
        label: 'International migrants resident in the UK, 2024',
        value: '11.8m',
        note: 'UN DESA mid-2024 stock estimate (11,845,479). Country-of-birth only; total migrant stock of every origin is not the addressable segment (India-born UK stock: 1,044,779).',
      },
    ],
    hotspots: [
      { city: 'London', lat: 51.51, lon: -0.13 },
      { city: 'Birmingham', lat: 52.49, lon: -1.89 },
    ],
    evidence:
      'In England, 90.6% of adults engaged with the arts in 2024/25 — a broad engagement measure, not live-event attendance specifically. The UN estimated 11.8 million international migrants in the UK in 2024. These figures indicate strong general cultural demand; none of them quantifies Marathi or Indian-origin event buyers, and that count does not exist in any source consulted for this page.',
    evidenceSources: [
      'Arts engagement: DCMS, Participation Survey 2024/25 — gov.uk',
      'Migrant stock: UN DESA, International Migrant Stock 2024 — un.org',
      'FX rates: RBA daily rates, 21 Aug 2026 — rba.gov.au',
    ],
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'The DCMS Participation Survey is an annual series: 2024/25 is the latest annual publication and 2023/24 its predecessor, so UK arts-engagement evidence moves once a year and no payment accelerates it. Any consumer-spend series would have to be read from 2018 to the latest year — a window that opens inside the 2020–21 collapse manufactures growth out of the rebound, so a single year’s movement cannot be read as a structural rate. Both back-catalogues are free downloads — the binding limit on what gate-G1 discovery can know here is release cadence, not budget.',
      source:
        'Sources: DCMS Participation Survey 2024/25 annual publication; live-entertainment spend series read from 2018 (about 8 years, so rebound is separable from structural growth).',
    },
    entryMode:
      'Local promoter partnership and agency/distribution arrangement before entity formation. Do not establish a UK entity until positive contribution and repeat demand are demonstrated.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Remote partner discovery; regulatory assessment' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'Pricing compliance review' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Entity decision only after positive contribution and repeat demand' },
    ],
    regulatory: [
      'UK GDPR obligations post-Brexit',
      'Consumer Rights Act 2015 refund and cancellation duties',
      'VAT treatment of digital services and ticket sales',
      'Performer visa requirements — the Creative Worker (Temporary Work) route, which replaced the retired Tier 5 Creative and Sporting category in 2021',
      'Ticket-resale regulation',
    ],
    regulatoryNote:
      'A structural checklist, framed as work still to be done. This proposal commits to engaging UK legal counsel on each of these before any UK market-entry commitment. That is a prudential commitment by the proposer, not a claim that counsel is legally required: no source establishes such a requirement in any of the five markets.',
    partnerships: [
      { type: 'UK-based Marathi drama promoters', criticality: 'Prospective', detail: 'Direct discovery required — no agreement, quote or dated counterparty exists' },
    ],
    partnershipsNote:
      'No UK cultural centre, venue or payment provider has written terms on file, so none is named as a partner in the entry plan. Written terms come first.',
    confidenceNote:
      'Strong general-demand signals. The niche ceiling, by contrast, is quantified: 11,022 people in England and Wales reported Marathi as their main language at the 2021 Census — a floor-not-total count (main language only, excluding Marathi speakers whose main language is English), and smaller than Australia’s 22,263. What remains unquantified is buyer demand within that niche: no primary demand, fee-tolerance or platform-trust study exists. England-specific arts data does not cover the whole UK.',
    confidenceSources: [
      'ONS Census 2021 via Nomis API, TS024 main language — ons.gov.uk',
    ],
  },
  {
    slug: 'usa',
    name: 'United States',
    shortName: 'USA',
    status: 'Feasibility — Highest Complexity',
    heroStat: '3,165,238 India-born residents (2024) — the widest denominator the evidence supports; Ticketmaster distributed 646m tickets in 2025',
    heroStatSource: 'UN DESA, International Migrant Stock 2024; Live Nation FY2025 Form 10-K (SEC EDGAR)',
    heroTilesIntro:
      'The ticketing figures below come from Live Nation’s FY2025 Form 10-K on SEC EDGAR — a statutory filed record. They are a take-rate and unit-economics benchmark and nothing more: an audited filing still sits one rung below an official statistic on the trust ladder.',
    heroTiles: [
      {
        label: 'US international migrant stock, 2024 (all origins)',
        value: '52,375,047',
        note: 'UN DESA. Total foreign-born stock of every origin — not an India-born or diaspora figure, and not the addressable segment. Census ACS 2024 1-year (table B05006) reports a foreign-born total of 50,234,841 on its own basis.',
      },
      {
        label: 'Tickets distributed by Ticketmaster, 2025',
        value: '646,000,000',
        note: 'Of which 346,000,000 were fee-bearing, on US$37.1 billion of fee-bearing GTV. Live Nation Entertainment FY2025 Form 10-K, a statutory SEC filing. A take-rate and unit-economics benchmark only: the trust ladder still grades an audited filing one rung below an official statistic.',
      },
    ],
    hotspots: [
      { city: 'New York', lat: 40.71, lon: -74.01 },
      { city: 'Los Angeles', lat: 34.05, lon: -118.24 },
      { city: 'Chicago', lat: 41.88, lon: -87.63 },
    ],
    evidence:
      'The FTC’s Rule on Unfair or Deceptive Fees (all-in pricing) took effect 12 May 2025. Ticketmaster’s distribution scale confirms that the market is dominated by vertically integrated incumbents: niche entry requires differentiated inventory, not price competition. The diaspora is concentrated in New York/New Jersey, the SF Bay Area, Chicago, Los Angeles and Dallas–Fort Worth — a pattern consistent with the top India-born state totals: California 626,214, Texas 431,939 and New Jersey 296,806 (ACS 2024 1-year, table B05006). The NEA’s Survey of Public Participation in the Arts provides national arts-attendance evidence: the SPPA 2022 is verified and stands as a US participation baseline if a US gate is ever reached, though it carries no diaspora-specific demand data. It is a five-yearly series; 2022 is the latest edition.',
    evidenceSources: [
      'UN DESA, International Migrant Stock 2024 — un.org/development/desa/pd/content/international-migrant-stock',
      'US Census Bureau, ACS 2024 1-year, table B05006 — data.census.gov',
      'Live Nation Entertainment, FY2025 Form 10-K (SEC EDGAR) — sec.gov',
      'FTC, Rule on Unfair or Deceptive Fees — ftc.gov press release, 12 May 2025',
      'NEA, Arts Participation Patterns in 2022 (SPPA highlights) — arts.gov',
    ],
    entryMode:
      'Promoter/agent partnership with local ticketing and tax support. Avoid independent artist promotion until immigration, insurance, venue and cancellation capabilities mature.',
    timeline: [
      { phase: 'Feasibility', period: 'Months 0–12', actions: 'Partner, pricing and visa feasibility; regulatory assessment' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'FTC compliance build-out' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Scale only if contribution, compliance and partner renewal meet thresholds' },
    ],
    revenue: {
      title: 'Operating Cost — What US Entry Is Expected to Carry',
      body:
        'US entry is expected to carry higher operating costs than the other target markets, driven by regulatory complexity, immigration support requirements and multi-jurisdiction tax compliance. That is a qualitative expectation, and it is the reason the United States sits behind Australia in the entry sequence.',
    },
    regulatory: [
      'FTC all-in pricing rule compliance — effective 12 May 2025',
      'BOTS Act enforcement',
      'State-level consumer protection and ticket resale laws',
      'Performer visa pathways: O-1B, P-1B, P-2, P-3 (USCIS classifications)',
      'CCPA and state privacy laws',
      'State and local sales tax (entertainment/amusement tax varies by jurisdiction)',
      'PCI-DSS compliance',
    ],
    regulatoryNote:
      'This proposal commits to engaging US immigration counsel on each of the visa pathways above before any US market-entry commitment. That is a prudential commitment by the proposer, not a claim that counsel is legally required: USCIS petitions require a US petitioner or agent and labor-organisation consultation, and no source establishes a counsel requirement.',
    regulatorySources: [
      'FTC, Rule on Unfair or Deceptive Fees — ftc.gov',
      'O-1B, P-1B, P-2 and P-3 are USCIS performer/entertainer visa classifications — uscis.gov, performer/entertainer visa guidance',
    ],
    partnerships: [
      { type: 'US-based Indian cultural promoters and producers', criticality: 'Critical', detail: 'Event inventory and production. Not yet secured — planning stage only.' },
      { type: 'Marathi Mandals and cultural associations', criticality: 'Critical', detail: 'NJ, CA, IL community access — prospective and uncontracted. Consistent with India-born concentration: California 626,214, New Jersey 296,806 (ACS 2024 1-year, table B05006).' },
      { type: 'Immigration attorneys', criticality: 'Critical', detail: 'Entertainment visa specialists. Not yet engaged — planning stage only.' },
      { type: 'US payment and tax compliance providers', criticality: 'High', detail: 'Stripe, Avalara — named as existing providers only; no engagement, and pricing quoted on request.' },
    ],
    partnershipsSources: ['US Census Bureau, ACS 2024 1-year, table B05006, state view — data.census.gov'],
    confidenceNote:
      'Largest indicative denominator but lowest readiness among priority corridors: incumbent dominance, state-by-state regulation and immigration complexity.',
    confidenceTile: {
      label: 'India-born population, by destination (2024)',
      value: 'US 3,165,238',
      note: 'UN DESA International Migrant Stock 2024 (India as origin). Largest of the four comparator corridors: UK 1,044,779; Canada 1,015,630; Australia 876,074. The comparator figures are UN DESA’s so that all four sit on one basis; they are not per-country ceilings, and two of them have a national counterpart on a different basis. Australia’s own ABS Estimated Resident Population (30 June 2025) counts 971,020 India-born residents, and the Australia market page uses that national measure. Canada’s own 2021 Census counts 898,045 India-born immigrants (permanent residents, 25% sample, reference date 11 May 2021) — 117,585 below the UN DESA mid-2024 estimate above — and the Canada market page uses that national measure. Different collector, different measure, different reference date in both cases; neither national figure replaces the comparator, and neither is wrong.',
    },
    confidenceSources: ['UN DESA, International Migrant Stock 2024, destination × origin matrix — un.org'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    shortName: 'CA',
    status: 'Research-Only — Least Evidenced',
    heroStat: '10.37m not-for-profit performing-arts attendances (2024); 898,045 India-born residents (2021 Census)',
    heroStatSource: 'Statistics Canada, table 21-10-0186-01; Statistics Canada, 2021 Census of Population',
    heroTiles: [
      {
        label: 'Not-for-profit performing-arts attendance, 2024',
        value: '10.37m',
        note: 'Statistics Canada, table 21-10-0186-01. A national aggregate — not a diaspora count, a city split or an event inventory.',
      },
      {
        label: 'India-born population of Canada, 2021 Census',
        value: '898,045',
        note: 'Statistics Canada, 2021 Census (25% sample; reference date 11 May 2021), counting India-born immigrants — permanent residents. National figure only: no city breakdown, no Marathi split, and no attendance or spend data attached to it. UN DESA’s International Migrant Stock 2024 puts India-born migrants in Canada at 1,015,630 at mid-2024, 117,585 higher: different collector, different measure, different reference date — the comparable cross-market denominator, not a correction of this figure.',
      },
    ],
    hotspots: [
      { city: 'Toronto', lat: 43.65, lon: -79.38 },
      { city: 'Vancouver', lat: 49.28, lon: -123.12 },
    ],
    evidence:
      'The Canadian opportunity must be modelled from Statistics Canada data, local event inventory and promoter evidence. Statistics Canada publishes performing-arts attendance data and immigration statistics — not-for-profit performing-arts attendance was 10.37 million nationally in 2024, and the India-born population was 898,045 at the 2021 Census — but neither carries the diaspora, city-level or ticket-market breakdown this market would need to be sized. The two India-born counts this proposal publishes for Canada are reconciled, not competing: Statistics Canada’s 898,045 counts India-born immigrants (permanent residents) at the 2021 Census, 25% sample data, reference date 11 May 2021, while the cross-market comparison strip on /market-opportunity uses UN DESA’s International Migrant Stock 2024 estimate of 1,015,630 India-born migrants in Canada at mid-2024 — 117,585 higher (+13.1%, calculated: (1,015,630 − 898,045) ÷ 898,045). Different collector, different measure, different reference date — the same reconciliation this proposal applies to the Australian pair (ABS ERP 971,020 at 30 June 2025 against UN DESA’s 876,074 at mid-2024). Both figures are verified; the UN DESA figure is the comparable cross-market denominator, the StatCan figure is Canada’s own national measure, and neither replaces the other.',
    evidenceSources: [
      'Statistics Canada, Table 21-10-0186-01, “Performing arts, performances and attendance, not-for-profit” (2014–2024) — statcan.gc.ca',
      'Statistics Canada, 2021 Census of Population, Focus on Geography Series — India-born population — statcan.gc.ca',
    ],
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'StatCan’s performing-arts table 21-10-0186-01 is a biennial series running over reference years 2014–2024, with 2024 the latest (published in The Daily on 22 January 2026); under that cycle nothing fresher is purchasable today, at any price. The whole back-catalogue is a free CSV download, and the immigration counts refresh only on the five-yearly census cycle (2021 is the operative census now). The binding limit on Canadian evidence is release cadence, not budget — and no release at any point in the series carries the diaspora, city-level or ticket-market breakdown this market would need to be sized.',
      source:
        'Sources: StatCan Table 21-10-0186-01 (biennial, 2014–2024) CSV, and The Daily, “Performing arts, 2024”, released 2026-01-22 — statcan.gc.ca',
    },
    entryMode:
      'Research-only status, followed by a local promoter distribution pilot if the bottom-up SAM passes the hurdle rate. Do not invest in Canadian operations until Australia and one international corridor demonstrate positive economics.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Obtain Statistics Canada data; inventory local events; promoter interviews' },
      { phase: 'Assessment', period: 'Months 13–24', actions: 'One-city pilot if bottom-up SAM justifies it' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Consider second city only after first-market renewal' },
    ],
    regulatory: [
      'PIPEDA compliance',
      'Provincial consumer protection laws',
      'GST/HST on digital services',
      'Performer work permit requirements',
      'Provincial entertainment regulations',
    ],
    regulatoryNote:
      'This proposal commits to engaging Canadian legal counsel on each of these before any Canadian market-entry commitment. This is a prudential commitment by the proposer — that counsel will be engaged before entry — not a claim that counsel is legally required. No source establishes such a requirement in any of the five markets, while the commitment to engage counsel holds for all of them.',
    partnerships: [
      { type: 'Local promoters and cultural associations', criticality: 'Prospective', detail: 'Direct discovery required — no verified pipeline exists' },
    ],
    confidenceNote:
      'Materially incomplete evidence. Commission dedicated Canada research before any market-entry decision.',
  },
  {
    slug: 'eu',
    name: 'European Union',
    shortName: 'EU',
    status: 'Country Selection — Not One Market',
    heroStat: '2,021,502 India-born residents, Europe region (2024) — a region proxy that includes the UK and non-EU states',
    heroStatSource: 'UN DESA, International Migrant Stock 2024; Eurostat ilc_scp03',
    heroTilesIntro:
      'Europe is not a single market. Eurostat’s own participation data shows a wide country-level spread, and the nearest published bound on the audience is the UN DESA Europe-region India-born count below.',
    heroTiles: [
      {
        label: 'International migrants resident in Europe, 2024',
        value: '94m',
        note: 'UN DESA mid-2024 stock estimate, Europe-to-World (94,051,503). Country-of-birth only — it carries no language, ethnicity or Marathi-diaspora dimension, and is not the addressable segment.',
      },
      {
        label: 'India-born residents, Europe region, 2024 — the widest denominator the evidence supports',
        value: '2,021,502',
        note: 'UN DESA (Table 1, row 13,965). A region proxy, not an EU-27 figure: it includes the UK and non-EU states — the same Europe-region scope as the 94m tile. Country-of-birth only, so it bounds the segment without measuring Marathi identity or demand; an EU-27 aggregate would need per-member-state extraction.',
      },
      {
        label: 'Live-performance attendance, Luxembourg, 2022',
        value: '48.5%',
        note: 'Eurostat ilc_scp03, at least once in 12 months, age 16+. The EU-wide spread runs from 48.5% (Luxembourg) down to 10.4% (Romania) — a single blended “EU attendance rate” would misrepresent both ends.',
      },
    ],
    hotspots: [
      { city: 'Amsterdam', lat: 52.37, lon: 4.9 },
      { city: 'Frankfurt', lat: 50.11, lon: 8.68 },
      { city: 'Paris', lat: 48.86, lon: 2.35 },
    ],
    evidence:
      'These figures establish that Europe is populous, that its India-born population is bounded at the region level, and that cultural participation varies enormously by country. None of them says anything about Marathi or Indian-origin event buyers specifically, and no such demand figure exists in any source consulted for this page. Eurostat’s breakdowns are by sex, age, education and frequency, so no urban/rural participation gradient can be drawn from them. The EU-SILC cultural-participation module is collected roughly every six years: 2022 is the latest and the next planned update is October 2029, so no fresher EU-wide participation data can be bought at any price before then.',
    evidenceSources: [
      'Migrant stock: UN DESA, International Migrant Stock 2024, Table 1 (Europe-to-World 94,051,503; Europe → origin India 2,021,502, row 13,965) — un.org',
      'Attendance: Eurostat, ilc_scp03 (EU-SILC 2022 cultural participation module; about 6-yearly, next planned update October 2029) — ec.europa.eu/eurostat',
    ],
    entryMode:
      'Country-specific promoter partnership in one selected market. Use a local distributor before establishing an entity. GDPR compliance is mandatory from day one — Regulation (EU) 2016/679 applies from the first day of processing an EU consumer’s personal data, regardless of which country is chosen.',
    timeline: [
      { phase: 'Country selection', period: 'Months 0–12', actions: 'Rank countries using Eurostat data, verified inventory and promoter readiness' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'One-country pilot with local promoter partner' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Second-country decision only after a reusable compliance framework and positive unit economics' },
    ],
    regulatory: [
      'GDPR compliance (data controller registration, DPO where required)',
      'Country-specific consumer protection, VAT and entertainment licensing',
      'Performer visa and work permit requirements (EU Blue Card, national schemes)',
      'PSD2 and Strong Customer Authentication (SCA)',
      'Country-specific ticket resale regulations',
    ],
    regulatoryNote:
      'This proposal commits to engaging local legal counsel in each member state before any EU market-entry commitment. This is a prudential commitment by the proposer — that counsel will be engaged before entry — not a claim that counsel is legally required. No source establishes such a requirement in any of the five markets, while the commitment to engage counsel holds for all of them.',
    partnerships: [
      { type: 'Country-specific promoter partner', criticality: 'Prospective', detail: 'Selected via Eurostat-ranked country assessment; local distributor before entity' },
    ],
    confidenceNote:
      'GDPR is harmonised but consumer, tax and entertainment law is not. Do not aggregate participation data across countries without harmonisation.',
  },
];

// Campaign targeting — a qualitative typology.
export const SEGMENTS_NOTE =
  'Seven segments, as a qualitative typology: each is described by profile, channel and churn characteristics rather than by size.';

export const SEGMENTS = [
  { name: 'Marathi Theatre Loyalists', profile: 'First-generation diaspora, aged 40–65, strong cultural attachment, Marathi language preference', channel: 'Organiser lists, cultural associations, community word-of-mouth', churn: 'Low intrinsic churn; high risk from inventory frequency' },
  { name: 'Family Cultural Attendees', profile: 'Family groups (2–4 members), aged 30–55, weekend availability, price-conscious', channel: 'School/community partnerships, family social media, WhatsApp groups', churn: 'Moderate; scheduling convenience and pricing' },
  { name: 'Students & Young Professionals', profile: 'Second-generation diaspora and international students, aged 18–30, mobile-first, price-sensitive', channel: 'Campus partnerships, Instagram/YouTube, referral programmes', churn: 'High; price sensitivity and competitor discovery apps' },
  { name: 'Film & Music Enthusiasts', profile: 'Mixed heritage, aged 25–45, digitally engaged, discovery-oriented', channel: 'Artist social media, music platforms, event discovery apps', churn: 'Moderate; content variety and competitor platforms (DICE, Fever)' },
  { name: 'Tour & Festival Travellers', profile: 'Multi-city attendees, aged 25–50, higher disposable income', channel: 'Tourism networks, diaspora travel groups, event aggregators', churn: 'Low platform loyalty; event quality and travel convenience' },
  { name: 'Promoters & Producers (B2B)', profile: 'Event organisers, production companies, cultural associations', channel: 'Direct sales, industry associations, referrals', churn: 'High; multi-homing, fee pressure, competitor features' },
  { name: 'Venues & Cultural Institutions (B2B)', profile: 'Community halls, cultural centres, theatres, university venues', channel: 'Enterprise partnership, venue networks', churn: 'Low churn once integrated; high procurement friction' },
];

// The gated schedule shown on /market-opportunity. The affordability anchor is AUD 830.00,
// the programme's actual spend to date.
export const ANCHOR_FOOTNOTE =
  'The affordability anchor is AUD 830.00, the programme’s own actual spend to date — the reference point against which every proposed spend on this schedule is judged, in place of a scale-cost analogy.';

export const GATE_RUN_RATE_NOTE =
  'G2 also leaves a cancellable run rate of A$74.42/month — 0.090× the anchor per month — for hosting and AI subscriptions. That is context, not a committed cost, and both halves are calculated. Hosting is A$46.43/mo: S3 storage 5 GB at US$0.025/GB-month = US$0.125, Athena 10 GB scanned at US$5.00/TB = US$0.05, and QuickSight 1 author at US$24/mo plus 3 readers at US$3/mo = US$33.00, with Glue Data Catalog on its published free tier and dbt Core, open source, at A$0 — US$33.175/mo ÷ 0.7145; the four rates are the vendors’ published Sydney prices, applied to assumed volumes of 5 GB stored, 10 GB scanned per month, and 1 author plus 3 readers. The AI subscription is A$27.99/mo: US$20/mo, Claude Pro’s published price, ÷ 0.7145. The two add to A$74.42/mo. The IBISWorld line uses AUD $2,500, the price on the live AU checkout cart; the vendor’s help centre publishes AU$2,200 for the same single report. Both are the vendor’s own published prices, and the transactional cart price is the one used for planning. On the A$2,200 basis the same gate reads: floor A$5,560.00 (2,200 + 3,360) = 6.70× the anchor, and full A$9,576.74 (2,200 + 3,342.20 + 194.54 + 3,840) = 11.54×; the data-floor line is 2.65× (2,200 ÷ 830). Statista Starter — A$3,342.20 inside the full configuration — is priced from the vendor’s own published tier, US$199/mo billed annually.';

export const DECISION_FRAMEWORK_INTRO =
  'The gated schedule below is the investment framework: each gate is a separate board decision, priced at the point it is committed, and money committed at one gate buys the information the next one needs.';

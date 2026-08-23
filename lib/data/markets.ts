// DELIVERABLE 4 — per-market entry strategies, rebuilt under the adversarial audit.
// Authoritative sources: site/routes/markets_{australia,uk,usa,canada,eu}.html and
// market-opportunity.html (corrected editions), workflow/register_by_route/*.json and
// artifacts/financial_rebuild.md. The site’s estimate tag is abolished on these routes:
// the three-year corridor projection tables, the AU TAM/SAM/SOM cascade (T0-160/T0-161)
// and every unsourced event, ticket, GTV, take-rate and operating-cost line are deleted
// rather than re-estimated, and replaced by open items with named owners. Every currency
// conversion is [DERIVED] from the RBA’s published rates for 21 Aug 2026 — the site’s
// assumed rates (GBP 2.00, CAD 1.42, EUR 1.55) are corrected wherever they were used.

export interface OpenItem {
  ref: string;
  title: string;
  unknown: string;
  owner: string;
  action: string;
}

export interface HeroTile { label: string; value: string; note: string }
export interface SizingRow { tier: string; basis: string }
export interface MarketPhase { phase: string; period: string; actions: string; gate?: string }
export interface Partnership { type: string; criticality: string; detail: string }
export interface Blocker { item: string; owner: string }

export interface MarketRevenue {
  title: string;
  body: string;
  /** Australia only: publish the arithmetic identity (lib/data/revenue-model.ts), never an output number. */
  showIdentity?: boolean;
  blockersIntro?: string;
  blockers?: Blocker[];
  note?: string;
  openItem?: OpenItem;
  sources?: string[];
}

export interface Market {
  slug: string;
  name: string;
  shortName: string;
  status: string;
  /** Audit banner shown at the top of the market page. */
  removedNote: string;
  heroStat: string;
  heroStatSource: string;
  heroTilesIntro?: string;
  heroTiles: HeroTile[];
  hotspots: { city: string; lat: number; lon: number }[];
  evidence: string;
  evidenceSources: string[];
  evidenceOpenItem?: OpenItem;
  /** "What no purchase can refresh" — release cadence bounds what gate G1 can know. */
  cadence?: { title: string; body: string; source: string };
  sizingIntro?: string;
  sizing: SizingRow[];
  sizingOpenItems: OpenItem[];
  sizingSources?: string[];
  entryMode: string;
  entryModeNote?: string;
  timeline: MarketPhase[];
  timelineOpenItems: OpenItem[];
  revenue: MarketRevenue;
  regulatory: string[];
  regulatoryNote?: string;
  regulatorySources?: string[];
  regulatoryOpenItem?: OpenItem;
  partnerships: Partnership[];
  partnershipsNote?: string;
  partnershipsSources?: string[];
  partnershipsOpenItem?: OpenItem;
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
    removedNote:
      '17 claims removed from this page by the adversarial audit — 11 unsupported and 6 internally inconsistent of 35 claims (register: markets_australia.json). The break-even sentence was re-adjudicated internally inconsistent on the fresh pass: its ticket-volume chain and its “modelled” comparison figure had already been deleted on /investment and the home page.',
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
      'In 2021–22, 64% of Australian adults aged 15 and over attended at least one cultural venue or event, down from 82.4% in 2017–18. The 2021–22 collection window (July 2020 – June 2022) is pandemic-affected: treat 82.4% (2017–18) as the pre-pandemic upper bound and 64% as the current, COVID-contaminated floor. Greater-capital-city residents attended at a higher rate than the rest of the country — 65% versus 61%, a four-percentage-point gap. The Marathi and Indian-origin segment specifically requires bottom-up sizing from ABS Census ancestry and language data; this page originally flagged that figure as unobtained, and it has since been located. 22,263 people nationally reported speaking Marathi at home at the 2021 Census (NSW 9,753; Victoria 7,170). That is the ceiling of what is provable about Australian Marathi demand today — it counts speakers, not ticket buyers, willingness-to-pay or fee tolerance, and “Indian diaspora” size is not a proxy for it.',
    evidenceSources: [
      'ABS, Cultural and creative activities, Australia, 2021–22 — abs.gov.au',
      'ABS, Attendance at Selected Cultural Venues and Events, Australia, 2017–18 — abs.gov.au',
      'ABS Census 2021, Cultural diversity data summary, Tables 4–5 — abs.gov.au. All accessed 2026-08-23.',
    ],
    evidenceOpenItem: {
      ref: 'H-1',
      title: 'City-level (Greater Melbourne / Greater Sydney) Marathi population',
      unknown:
        'The city split of the 22,263 national Marathi-at-home count. Published ABS community profiles fold Marathi into a residual “Other Indo-Aryan” category, so the GCCSA breakdown requires ABS TableBuilder registration, not yet completed.',
      owner: 'Data lead (role, currently unassigned — LT to appoint)',
      action:
        'Register for ABS TableBuilder and confirm its access cost, then obtain the city-level split before it is used in any pilot-sizing decision.',
    },
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'The 2026 Census was collected on 11 August 2026, but its language and ancestry variables (LANP/BPLP/ANCP) are first-release items in June 2027: Census 2021 remains the only available bottom-up language dataset until then, and no money can buy fresher Australian diaspora counts before that release. The ABS attendance survey’s 2021–22 release header likewise states “Next release Unknown” — the freshest national attendance figures are the COVID-window ones above, at any price. Both cadence facts bound what gate-G1 discovery can know, and neither is a budget problem.',
      source:
        'ABS, 2026 Census topics and data release plan (“First release – June 2027”, verify/abs-census-diaspora-reaudit.md §4); ABS Cultural and creative activities 2021–22 release header (“Next release Unknown”, verify/abs-attendance.md). Accessed 2026-08-23. Carried from financial_rebuild.md §A.2, rows H-1/H-2.',
    },
    sizingIntro:
      'The original TAM/SAM/SOM figures (AUD 6.6m–13.6m / 2.0m–6.8m / 0.4m–2.7m) did not survive the audit. The TAM range contradicted its own printed bottom-up formula — 200 × 300 × 60% × AUD 55 recomputes to AUD 1.98m, and 400 × 600 × 80% × AUD 85 recomputes to AUD 16.32m, not the 6.6m–13.6m printed on the page — and none of the “30–50% of TAM” or “20–40% of SAM” capture assumptions underneath SAM and SOM had a source. All three figures are deleted rather than corrected, and the recomputed 1.98m–16.32m is not republished either: no defensible replacement figure exists.',
    sizing: [
      { tier: 'TAM — Total addressable', basis: 'Deleted — the printed figure failed its own printed formula (T0-160/T0-161). Not resized. See open item below.' },
      { tier: 'SAM — Serviceable', basis: 'Deleted — the “30–50% of TAM” capture assumption had no source and inherited a broken anchor.' },
      { tier: 'SOM — Obtainable', basis: 'Deleted — the “20–40% of SAM” capture assumption had no source and inherited the same anchor.' },
    ],
    sizingOpenItems: [
      {
        ref: 'U-04 / GT-07',
        title: 'A bottom-up Australian market size for Marathi/Indian-origin live entertainment',
        unknown:
          'TAM, SAM and SOM for the actual target segment. The only sourced inputs available today are the population denominators — 22,263 Marathi speakers at home and 971,020 India-born Australian residents — which bound the segment but do not size the market.',
        owner: 'Research lead (role, currently unassigned)',
        action:
          'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney — willingness-to-pay, fee tolerance and channel trust — before any sizing figure is published.',
      },
    ],
    sizingSources: [
      'ABS, Australia’s population by country of birth (Estimated Resident Population, June 2025) — abs.gov.au. Accessed 2026-08-23.',
    ],
    entryMode:
      'Establish or contract through a verified Australian entity only after legal advice. Begin with a local promoter-led pilot and contracted inventory rather than a broad consumer launch. Prerequisites: ABN/ASIC verification, Privacy Act assessment, GST registration, compliant payment gateway, consumer protection review.',
    entryModeNote:
      'A programme recommendation, not a claim of existing verification or supply — consistent with GT-06 (no signed promoter or venue supply exists) and GT-08 (no written PSP, legal, insurance, entity or QSA quotes on file).',
    timeline: [
      { phase: 'Phase 0: Verify', period: 'Months 0–3', actions: 'Legal verification; Australian structure; event inventory audit; data audit; promoter interviews (count removed — see open item)', gate: 'At least one contractable pilot event and reconciled baseline' },
      { phase: 'Phase 1: Pilot', period: 'Months 4–6', actions: 'All-in pricing; support and scanning; measure contribution (pilot event count removed — see open item)', gate: 'Positive contribution before fixed platform cost' },
      { phase: 'Phase 2: Expand', period: 'Months 7–12', actions: 'Repeat-buyer and referral tests (expansion event count removed — see open item)', gate: 'Repeat purchase rate and CAC within approved threshold' },
      { phase: 'Phase 3: Deepen', period: 'Months 13–24', actions: 'Add venues and adjacent categories; organiser portal; partnerships', gate: 'Inventory concentration and reliability acceptable' },
      { phase: 'Phase 4: National', period: 'Months 25–36', actions: 'National city expansion only where contracted inventory exists', gate: 'Market-level contribution positive' },
    ],
    timelineOpenItems: [
      {
        ref: 'U-03 / GT-06',
        title: 'Promoter-interview count and pilot/expansion event volumes',
        unknown:
          'The promoter-interview count (originally printed here as “10–15”) and the pilot and expansion event volumes (originally “3–5” and “12–24”) had no source. The interview count also contradicted the /recommendations route’s own figure of “15–20” for the same programme step — two different numbers for one metric, with no defensible figure recorded for either.',
        owner: 'Commercial lead (role, currently unassigned — LT to appoint)',
        action:
          'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues before any interview count or event volume is set. Reconciliation (fresh pass 5, F-P5B-04): what is deleted here is the estimate-tagged event volume as a phase-plan input (CL-0504). The Vision and Recommendations pages describe “a 3–5 event Australian pilot” as the deliverable of gate G2, adjudicated VERIFIED at CL-0017 and CL-0474 as gated plan language conditional on this same U-03 evidence — not as existing or achievable supply. Both pages now state that condition explicitly. One rule, one evidence state: no event volume is evidenced today; a target may be named only as a gate deliverable that U-03 must first unlock.',
      },
    ],
    revenue: {
      title: 'Revenue — Not Yet Computable',
      body:
        'The three-year base-scenario table (events, tickets, GTV, platform revenue, transaction cost, acquisition cost, fixed operating cost, operating result) is deleted in full. Every line either had no source — event and ticket volumes, the transaction-cost rate, the fixed operating cost — or contradicted another figure on the site with no defensible correction on record: the printed Year-3 platform revenue of AUD 648,000 contradicted the /investment route’s own model of the same programme (AUD 468,000), and the printed Year-2/Year-3 acquisition costs contradicted the model’s own stated acquisition-share assumptions. The “conservative to optimistic” span (AUD −576,800 to +364,000) likewise contradicted the /investment route’s optimistic preset, which recomputes to +90,000. None of these has a single defensible figure to resolve to, so all are removed rather than re-estimated. What can honestly be published is the identity itself, with every variable tagged and owned — and no output number.',
      showIdentity: true,
      openItem: {
        ref: 'U-02 / U-03 / U-04',
        title: 'Every input to Australian pilot revenue, and Ticketalay’s share of it',
        unknown:
          'Events per year, tickets per event, average transaction value, take rate and the partnership split are each [UNKNOWN]. The blocking dependency is the AB Entertainment ↔ Ticketalay partnership terms (revenue share, cost share, capital contribution, control), which are undisclosed and sit ahead of any revenue modelling.',
        owner: 'CEO, AB Entertainment + Ticketalay principal',
        action:
          'Execute a written term sheet or heads of agreement and disclose it to the leadership team (U-02); then deliver the discovery-gate evidence (U-03, U-04). ROI for the Australian market is not computable until all three exist.',
      },
    },
    regulatory: [
      'ABN and ASIC registration or verification',
      'Australian Privacy Act compliance assessment',
      'GST registration and tax structure',
      'Payment gateway integration (Australian-compliant)',
      'Consumer protection compliance review',
    ],
    regulatoryNote:
      'A structural checklist of standard Australian regulatory prerequisites, framed as work still to be done — not as work completed. Consistent with GT-08/GT-09 (no legal, entity or QSA due diligence performed to date).',
    partnerships: [
      { type: 'Marathi cultural associations', criticality: 'Critical', detail: 'Audience access, event promotion, community credibility' },
      { type: 'Established promoters', criticality: 'Critical', detail: 'Marathi drama and Hindi comedy event inventory, production expertise' },
      { type: 'Community venues', criticality: 'High', detail: 'Town halls, cultural centres, theatres — venue access and local infrastructure' },
      { type: 'Universities', criticality: 'Medium', detail: 'Indian student associations — youth audience, campus events' },
      { type: 'Payment providers', criticality: 'Critical', detail: 'Stripe and Square both operate in Australia; no written onboarding terms or fee schedule for this entity has been requested or received' },
      { type: 'Customer support provider', criticality: 'High', detail: 'Australian-based buyer and organiser support' },
    ],
    partnershipsNote:
      'Self-assessed criticality ratings of prospective, uncontracted partnership categories — no supply or commitment claim is made (GT-06). The “Australian-certified” characterisation originally printed against Stripe/Square is removed: no source was located for it, and no PSP quotes or engagement exist on file (GT-08).',
    partnershipsOpenItem: {
      ref: 'U-05 / GT-08',
      title: 'Written PSP onboarding terms for the actual contracting entity',
      unknown: 'Settlement currency and timing, chargeback terms and the pricing schedule — none has been requested or received.',
      owner: 'CEO / company secretary',
      action: 'Request written onboarding quotes from Stripe AU and Adyen AU. Both are free to request.',
    },
    confidenceNote:
      'Strongest-evidenced market. Australia is the only market on this site with first-hand-verified official attendance statistics plus a real, if unquantified, local partnership. Cultural participation data is pandemic-affected (2021–22); use 2017–18 (82.4%) as the upper bound.',
    confidenceSources: [
      'Self-assessment, consistent with the evidence base: Australia carries verified ABS attendance and Census data that no other market route on this site can match.',
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    status: 'Partner-Led Corridor Candidate',
    removedNote: '17 claims removed from this page by the adversarial audit — see register (markets_uk.json); a further 3 replaced with source-published figures or resolved in place, so 20 of this route’s 30 claims were defective.',
    heroStat: 'GBP 6.68bn consumer spend on live music (2024) — Trade-body estimate; 90.6% arts engagement in England (2024/25)',
    heroStatSource: 'LIVE, Annual Report 2024 (live-music trade federation) / DCMS Participation Survey 2024/25',
    heroTilesIntro:
      'Sourced to two distinct providers, corrected from the original page’s single mis-attributed citation to DCMS for both figures. Every surviving monetary figure on this page carries a provenance tag, with one labelled exception: the UK live-music consumer-spend figure is a trade federation’s own commissioned estimate, which can never earn [LIST] under the trust ladder — that tag means a vendor-published price — so it carries the explicit provenance label Trade-body estimate instead. Under the same ladder a modelled estimate may not feed a headline or a funded figure, so it is carried as market context only and no longer sizes this page’s opportunity tiers (verify/uk-stats.md §2; the mechanism is the one the Investment page applies to an aggregator salary band).',
    heroTiles: [
      {
        label: 'Live music consumer spend, UK, 2024',
        value: 'GBP 6.68bn',
        note: 'Trade-body estimate — +9.5% year-on-year. LIVE’s own commissioned analysis, not a government statistic and not [LIST] under the trust ladder: that tag means a vendor-published price, and verify/uk-stats.md grades this source “industry-body estimate”. Market context only — it feeds no headline tier and no funded figure.',
      },
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
      'UK consumer spending on live music reached GBP 6.68 billion in 2024, up 9.5% year-on-year — a Trade-body estimate, LIVE’s own commissioned figure, not a DCMS or government statistic as the original source line stated, and not [LIST] under the trust ladder, which reserves that tag for a vendor-published price. At the RBA’s rate of GBP 1 = AUD 1.9106 (21 Aug 2026) it converts to approximately AUD 12.8 billion [DERIVED]: 6.68bn × 1.9106, the conversion inheriting the trade-body tier of the figure it converts. This is whole-market consumer spend, carried as market context only: it is not a total addressable market for this programme, and no market page on this site publishes one; the original page’s AUD 13.4bn used an assumed rate of 2.00, about 4.7% above the RBA rate. In England, 90.6% of adults engaged with the arts in 2024/25 — a broad engagement measure, not live-event attendance specifically. The UN estimated 11.8 million international migrants in the UK in 2024. These figures indicate strong general cultural demand; none of them quantifies Marathi or Indian-origin event buyers, and that count does not exist in any source consulted for this page.',
    evidenceSources: [
      'Consumer spend: LIVE, Annual Report 2024 (live-music trade federation) — livemusic.biz',
      'Arts engagement: DCMS, Participation Survey 2024/25 — gov.uk',
      'Migrant stock: UN DESA, International Migrant Stock 2024 — un.org',
      'FX rate: RBA, daily exchange rates, 21 Aug 2026 — rba.gov.au. All accessed 2026-08-23.',
    ],
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'The DCMS Participation Survey is an annual series: 2024/25 is the latest annual publication and 2023/24 its predecessor, so UK arts-engagement evidence moves once a year and no payment accelerates it. The LIVE consumer-spend series must be read from 2018 to the latest year: a window that opens inside the 2020–21 collapse manufactures growth out of the rebound, so the 2024 figure’s +9.5% cannot be read as a structural rate on its own. Both back-catalogues are free downloads — the binding limit on what gate-G1 discovery can know here is release cadence, not budget.',
      source:
        'financial_rebuild.md §A.2 rows H-2 (DCMS annual comparator) and H-3 (live-entertainment spend series from 2018, ≈8 years, so rebound is separable from structural growth); DCMS 2024/25 annual publication and LIVE Annual Report 2024 (verify/uk-stats.md, accessed 2026-08-23).',
    },
    sizing: [
      { tier: 'TAM — Total addressable', basis: 'Not sized. See open item below.' },
      { tier: 'SAM — Serviceable', basis: 'Not sized — “50–150 relevant Indian-origin cultural events annually” had no source and is deleted; no event inventory exists to size from. See open item below.' },
      { tier: 'SOM — Obtainable', basis: 'Not sized — “10–30% of SAM events contractable in first three years” had no source and is deleted. See open item below.' },
    ],
    sizingOpenItems: [
      {
        ref: 'U-03',
        title: 'Addressable, serviceable and obtainable market (TAM/SAM/SOM) for the UK corridor',
        unknown:
          'No bottom-up event inventory has been built for the UK; both original ranges have been deleted rather than republished, and the whole-market consumer-spend figure previously shown as TAM has been withdrawn. It is a trade-body estimate, which the trust ladder bars from feeding a headline or a funded figure; a whole-national-market spend total is not a total addressable market for this programme in any case, since this page’s own reading is that Ticketalay’s addressable niche within it is a fraction of one percent, never sized bottom-up — published as a TAM it overstates the addressable market by more than two orders of magnitude. It also left the United Kingdom as the only market on this site carrying a whole-market headline, where Australia’s TAM/SAM/SOM are deleted outright, Canada is “Not sized”, the European Union is country-specific and not sized, and the United States TAM stands as an open item with SAM [UNKNOWN].',
        owner: 'Commercial lead (currently unassigned)',
        action: 'Build an event-inventory count from named venues and promoters, and size the addressable niche from it, before any TAM, SAM or SOM figure is republished.',
      },
    ],
    entryMode:
      'Local promoter partnership and agency/distribution arrangement before entity formation. Do not establish a UK entity until positive contribution and repeat demand are demonstrated.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Remote partner discovery; regulatory assessment (event-test count removed — see open item)' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'Pricing compliance review (pilot event count removed — see open item)' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Entity decision only after positive contribution and repeat demand' },
    ],
    timelineOpenItems: [
      {
        ref: 'U-03 / GT-06',
        title: 'Event counts for the Research and Pilot phases',
        unknown:
          'The original page specified “two event tests” for Research and “8–15 events through one anchor promoter” for Pilot — both unsourced, and both resting on a promoter relationship that does not exist. There is no named, signed promoter or venue supply for the UK.',
        owner: 'Commercial lead (currently unassigned)',
        action: 'Secure at least one dated counterparty (signed agreement or LOI) before any pilot event count is published.',
      },
    ],
    revenue: {
      title: 'Investment & Returns — Not Published',
      body:
        'A three-year financial projection is not published for this corridor. The original table’s event count, ticket volume, GTV, take rate and operating-cost lines were all unsourced assumptions, and its own Year-3 figures contradicted its stated per-ticket value (implying AUD 90 against a stated AUD 85 average). All of it is deleted under the audit’s zero-base rule. Return on investment for the UK corridor is not computable while these remain unresolved:',
      blockers: [
        { item: 'Partnership financial terms between AB Entertainment and Ticketalay (revenue share, cost share, capital, control)', owner: 'CEO, AB Entertainment + Ticketalay principal' },
        { item: 'Contracted promoter/venue supply — zero named, signed counterparties exist', owner: 'Commercial lead (currently unassigned)' },
        { item: 'Primary demand, fee-tolerance and platform-trust evidence for Marathi/Indian-origin buyers — no study exists', owner: 'Research lead (currently unassigned)' },
        { item: 'Written PSP, legal, insurance, entity and QSA quotes — none on file', owner: 'CEO / company secretary' },
      ],
      note: 'Action: resolve each item at its named gate before any UK revenue or return figure is modelled.',
      sources: ['FX rate: RBA, daily exchange rates, 21 Aug 2026 — rba.gov.au. Accessed 2026-08-23.'],
    },
    regulatory: [],
    regulatoryOpenItem: {
      ref: 'U-05',
      title: 'UK regulatory requirements have not been verified against a primary source',
      unknown:
        'Open questions include UK GDPR obligations post-Brexit, Consumer Rights Act 2015 refund and cancellation duties, VAT treatment of digital services and ticket sales, performer visa requirements, and ticket-resale regulation. On the last of these, the original wording named “Tier 5 Creative and Sporting” — a category retired in 2021 and replaced by the Creative Worker (Temporary Work) route, so even the category name needs re-checking, not just the requirement.',
      owner: 'UK legal counsel (not yet engaged)',
      action: 'Commission a UK regulatory review before any market-entry commitment.',
    },
    partnerships: [
      { type: 'UK-based Marathi drama promoters', criticality: 'Prospective', detail: 'Direct discovery required — no agreement, quote or dated counterparty exists' },
    ],
    partnershipsOpenItem: {
      ref: 'U-03 / U-05',
      title: 'No other UK ecosystem partnership is confirmed',
      unknown:
        'The original page named specific Indian cultural centres (London, Birmingham) and a specific payment provider (Stripe UK) as key partnerships; neither has a written agreement, quote or supporting source on file, so both have been removed.',
      owner: 'Commercial lead (currently unassigned) for community and venue partnerships; CEO / company secretary for payment-provider quotes',
      action: 'Obtain written terms before naming any partner as part of the entry plan.',
    },
    confidenceNote:
      'Strong general-demand signals. The niche ceiling, by contrast, is quantified: 11,022 people in England and Wales reported Marathi as their main language at the 2021 Census — a floor-not-total count (main language only, excluding Marathi speakers whose main language is English), and smaller than Australia’s 22,263. What remains unquantified is buyer demand within that niche: no primary demand, fee-tolerance or platform-trust study exists. England-specific arts data does not cover the whole UK.',
    confidenceSources: [
      'ONS Census 2021 via Nomis API, TS024 main language — reproducible query in verify/uk-stats.md; cross-reference financial_rebuild.md §A.1.1 F6 and §E.2.1 (UK row). Accessed 2026-08-23.',
    ],
  },
  {
    slug: 'usa',
    name: 'United States',
    shortName: 'USA',
    status: 'Feasibility — Highest Complexity',
    removedNote:
      '11 claims removed from this page by the adversarial audit — see register (markets_usa.json). A further 2 claims were replaced with source-published figures or resolved in place, so 13 of this route’s 28 claims were defective. One earlier removal was reversed on the fresh pass: the NEA SPPA citation was wrongly deleted as unsupported and is re-adjudicated verified; it stands below with its first-hand source.',
    heroStat: '3,165,238 India-born residents (2024) — the honest upper denominator; Ticketmaster distributed 646m tickets in 2025',
    heroStatSource: 'UN DESA, International Migrant Stock 2024; Live Nation FY2025 Form 10-K (SEC EDGAR)',
    heroTiles: [
      {
        label: 'US international migrant stock, 2024 (all origins)',
        value: '52,375,047',
        note: 'UN DESA. Total foreign-born stock of every origin — not an India-born or diaspora figure, and not the addressable segment. The original page attributed this to Census/NEA; Census ACS 2024 1-year (table B05006) instead reports a foreign-born total of 50,234,841.',
      },
      {
        label: 'Tickets distributed by Ticketmaster, 2025',
        value: '646,000,000',
        note: 'Audited filing — of which 346,000,000 were fee-bearing. Live Nation Entertainment FY2025 Form 10-K. A take-rate/unit-economics benchmark only, per the trust ladder.',
      },
    ],
    hotspots: [
      { city: 'New York', lat: 40.71, lon: -74.01 },
      { city: 'Los Angeles', lat: 34.05, lon: -118.24 },
      { city: 'Chicago', lat: 41.88, lon: -87.63 },
    ],
    evidence:
      'The FTC’s Rule on Unfair or Deceptive Fees (all-in pricing) took effect 12 May 2025. Ticketmaster’s distribution scale confirms that the market is dominated by vertically integrated incumbents: niche entry requires differentiated inventory, not price competition. The NEA’s Survey of Public Participation in the Arts provides national arts-attendance evidence — a claim this audit first deleted as unsupported and, on the fresh pass, re-adjudicated verified: the SPPA 2022 is verified first-hand and stands as a US participation baseline if a US gate is ever reached, with no diaspora-specific demand data. It is a five-yearly series; 2022 is the latest edition.',
    evidenceSources: [
      'UN DESA, International Migrant Stock 2024 — un.org/development/desa/pd/content/international-migrant-stock',
      'US Census Bureau, ACS 2024 1-year, table B05006 — data.census.gov',
      'Live Nation Entertainment, FY2025 Form 10-K (SEC EDGAR) — sec.gov',
      'FTC, Rule on Unfair or Deceptive Fees — ftc.gov press release, 12 May 2025',
      'NEA, Arts Participation Patterns in 2022 (SPPA highlights) — arts.gov (financial_rebuild.md §A.1.1 F9). All accessed 2026-08-23.',
    ],
    sizing: [
      {
        tier: 'TAM — Total addressable',
        basis:
          'Diaspora concentrated in New York/New Jersey, the SF Bay Area, Chicago, Los Angeles and Dallas–Fort Worth — a pattern consistent with the top India-born state totals: California 626,214, Texas 431,939, New Jersey 296,806 (ACS 2024 1-year, table B05006). The “100–300 relevant cultural events annually” estimate is removed. See open item below.',
      },
      {
        tier: 'SAM — Serviceable',
        basis: 'Bottom-up sizing required from verified metro event inventory. [UNKNOWN] — no such inventory exists yet; an honest statement of missing data, not a figure.',
      },
      { tier: 'SOM — Obtainable', basis: 'Deleted — “5–15% of contractable events in first three years” has no source. See open item below.' },
    ],
    sizingOpenItems: [
      {
        ref: 'U-03',
        title: 'Metro event inventory and obtainable share',
        unknown:
          'No metro-level event inventory exists anywhere in the evidence base, so neither the original TAM event range nor the obtainable-share percentage can be republished under the abolished estimate tag.',
        owner: 'Commercial lead (currently unassigned — LT to appoint)',
        action:
          'Build a bottom-up metro event count, and secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues, before any TAM or obtainable-share figure is published.',
      },
    ],
    entryMode:
      'Promoter/agent partnership with local ticketing and tax support. Avoid independent artist promotion until immigration, insurance, venue and cancellation capabilities mature.',
    timeline: [
      { phase: 'Feasibility', period: 'Months 0–12', actions: 'Partner, pricing and visa feasibility; regulatory assessment' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'FTC compliance build-out (pilot event count removed — see open item)' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Scale only if contribution, compliance and partner renewal meet thresholds' },
    ],
    timelineOpenItems: [
      {
        ref: 'U-03 / GT-06',
        title: 'Pilot event count for gate 02',
        unknown:
          'The original page set a pilot target of “2–5 pilot events in one metro”. No promoter or venue counterparty is named or signed anywhere in the evidence base, so the figure has been removed.',
        owner: 'Commercial lead (currently unassigned — LT to appoint)',
        action:
          'Secure signed pilot-event agreements or dated LOIs before a pilot count is published. “Contracted”, “secured” or “confirmed” language may not be used about inventory until a dated counterparty exists.',
      },
    ],
    revenue: {
      title: 'Three-Year Base Scenario — Removed',
      body:
        'The original page published a three-year Events / Tickets / GTV / Platform Revenue / Operating Cost / Operating Result table (0 → 5 → 15 events; up to 10,500 tickets; up to AUD 1,039,500 GTV). Every input — event count, ticket volume, take rate and operating cost — was an unsourced assumption, and the Year-3 GTV row was internally inconsistent with its own stated ATV. The rebuilt financials confirm that no gate on this market’s schedule produces the inputs needed to compute it: “ROI not computable — missing: every numerator input + US compliance costs; no producing gate exists.” The table is removed rather than corrected, because no defensible replacement figure exists for any of its rows.',
      blockersIntro: 'What is unknown, by owner:',
      blockers: [
        { item: 'Event/ticket volume and take rate — no signed promoter or venue supply exists (U-03, GT-06)', owner: 'Commercial lead (currently unassigned — LT to appoint)' },
        { item: 'Average ticket value and demand — no primary diaspora demand or fee-tolerance study exists (U-04, GT-07)', owner: 'Research lead (currently unassigned)' },
        { item: 'Operating cost — no written PSP, legal, insurance, entity or QSA quotes are on file (U-05, GT-08)', owner: 'CEO / company secretary' },
        { item: 'Revenue and cost split between AB Entertainment and Ticketalay — no partnership term sheet exists (U-02, GT-04)', owner: 'CEO, AB Entertainment + Ticketalay principal' },
      ],
      note:
        'US entry is expected to carry higher operating costs than the other target markets, driven by regulatory complexity, immigration support requirements and multi-jurisdiction tax compliance. That is a qualitative expectation only, carrying no provenance tag; no dollar figure is published until the items above are resolved.',
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
    regulatorySources: [
      'FTC, Rule on Unfair or Deceptive Fees — ftc.gov, accessed 2026-08-23',
      'O-1B, P-1B, P-2 and P-3 are USCIS performer/entertainer visa classifications — uscis.gov, performer/entertainer visa guidance',
    ],
    regulatoryOpenItem: {
      ref: 'U-05 / GT-08',
      title: 'The “all require US legal counsel” certainty claim is removed',
      unknown:
        'No source establishes that legal counsel is mandatory for all four visa categories — USCIS petitions require a US petitioner or agent and labor-organisation consultation, not counsel by rule.',
      owner: 'CEO / company secretary',
      action: 'Request written quotes and scope confirmation from immigration counsel before asserting a counsel requirement. Restated under the sitewide rule (fresh pass 5, F-P5B-05): this proposal commits to engaging US immigration counsel on each of these pathways before any US market-entry commitment. That is a prudential commitment by the proposer, not a claim that counsel is legally mandated — the same form now carried on the Canada and EU market pages, where the identical certainty claim had previously been retained uncaveated while it was deleted here.',
    },
    partnerships: [
      { type: 'US-based Indian cultural promoters and producers', criticality: 'Critical', detail: 'Event inventory and production. Not yet secured — planning stage only.' },
      { type: 'Marathi Mandals and cultural associations', criticality: 'Critical', detail: 'NJ, CA, IL community access — prospective and uncontracted. Consistent with India-born concentration: California 626,214, New Jersey 296,806 (ACS 2024 1-year, table B05006).' },
      { type: 'Immigration attorneys', criticality: 'Critical', detail: 'Entertainment visa specialists. Not yet engaged — planning stage only.' },
      { type: 'US payment and tax compliance providers', criticality: 'High', detail: 'Stripe, Avalara — named as existing providers only; no engagement, and no pricing quoted (GT-08).' },
    ],
    partnershipsSources: ['US Census Bureau, ACS 2024 1-year, table B05006, state view — data.census.gov. Accessed 2026-08-23.'],
    confidenceNote:
      'Largest indicative denominator but lowest readiness among priority corridors: incumbent dominance, state-by-state regulation and immigration complexity.',
    confidenceTile: {
      label: 'India-born population, by destination (2024)',
      value: 'US 3,165,238',
      note: 'UN DESA International Migrant Stock 2024 (India as origin). Largest of the four comparator corridors: UK 1,044,779; Canada 1,015,630; Australia 876,074. The comparator figures are UN DESA’s so that all four sit on one basis; they are not per-country ceilings — Australia’s own ABS Estimated Resident Population (30 June 2025) counts 971,020 India-born residents, and the Australia market page uses that national measure.',
    },
    confidenceSources: ['UN DESA, International Migrant Stock 2024, destination × origin matrix — un.org. Accessed 2026-08-23.'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    shortName: 'CA',
    status: 'Research-Only — Least Evidenced',
    removedNote: '8 claims removed from this page by the adversarial audit — see register (markets_canada.json).',
    heroStat: 'No Canada-specific diaspora, cultural-attendance or ticket-market metric was supplied [UNKNOWN]',
    heroStatSource: 'Gap admission — StatCan national aggregates located by the audit are shown below',
    heroTiles: [
      {
        label: 'Not-for-profit performing-arts attendance, 2024',
        value: '10.37m',
        note: 'Statistics Canada, table 21-10-0186-01. A national aggregate — not a diaspora count, a city split or an event inventory.',
      },
      {
        label: 'India-born population of Canada, 2021 Census',
        value: '898,045',
        note: 'Statistics Canada. National figure only: no city breakdown, no Marathi split, and no attendance or spend data attached to it.',
      },
    ],
    hotspots: [
      { city: 'Toronto', lat: 43.65, lon: -79.38 },
      { city: 'Vancouver', lat: 49.28, lon: -123.12 },
    ],
    evidence:
      'No Canada-specific diaspora, cultural-attendance or official ticket-market metric was successfully supplied in the research behind this proposal, so the Canadian opportunity is unverified and must be modelled from Statistics Canada data, local event inventory and promoter evidence. That gap admission is accurate. Statistics Canada does publish performing-arts attendance data and immigration statistics — not-for-profit performing-arts attendance was 10.37 million nationally in 2024, and the India-born population was 898,045 at the 2021 Census — but neither carries the diaspora, city-level or ticket-market breakdown this page would need. Declining to model an opportunity from these inputs is the correct call, not a research failure.',
    evidenceSources: [
      'Statistics Canada, Table 21-10-0186-01, “Performing arts, performances and attendance, not-for-profit” (2014–2024) — statcan.gc.ca',
      'Statistics Canada, 2021 Census of Population, Focus on Geography Series — India-born population — statcan.gc.ca. Both accessed 2026-08-23.',
    ],
    cadence: {
      title: 'Data cadence — what no purchase can refresh',
      body:
        'StatCan’s performing-arts table 21-10-0186-01 is a biennial series running over reference years 2014–2024, with 2024 the latest (published in The Daily on 22 January 2026); under that cycle nothing fresher is purchasable today, at any price. The whole back-catalogue is a free CSV download, and the immigration counts refresh only on the five-yearly census cycle (2021 is the operative census now). The binding limit on Canadian evidence is release cadence, not budget — and no release at any point in the series carries the diaspora, city-level or ticket-market breakdown this page would need.',
      source:
        'financial_rebuild.md §A.2 row H-2 (StatCan biennial, 2014–2024); StatCan Table 21-10-0186-01 CSV and The Daily, “Performing arts, 2024” (released 2026-01-22) — verify/eu-ca-stats.md §2, accessed 2026-08-23.',
    },
    sizing: [
      { tier: 'TAM — Total addressable', basis: 'Not sized. The city concentration and event-count estimate are deleted — see open item below.' },
      { tier: 'SAM — Serviceable', basis: 'Cannot be reliably estimated without verified inventory data.' },
      { tier: 'SOM — Obtainable', basis: 'Cannot be reliably estimated without verified inventory data.' },
    ],
    sizingOpenItems: [
      {
        ref: 'U-04',
        title: 'Total addressable market for Canada',
        unknown:
          'The original page stated the diaspora is “concentrated in Toronto, Vancouver, Calgary and Edmonton” with an estimated “50–120 relevant cultural events annually”; neither the city concentration nor the event count traces to any primary source in the verification packs, so both are deleted. What is known: the India-born population was 898,045 at the 2021 Census — a national figure with no city breakdown, no Marathi split and no attendance or spend data attached.',
        owner: 'Research lead (currently unassigned)',
        action: 'Commission a bottom-up event inventory by city and promoter before any TAM figure is published.',
      },
    ],
    entryMode:
      'Research-only status, followed by a local promoter distribution pilot if the bottom-up SAM passes the hurdle rate. Do not invest in Canadian operations until Australia and one international corridor demonstrate positive economics.',
    timeline: [
      { phase: 'Research', period: 'Months 0–12', actions: 'Obtain Statistics Canada data; inventory local events; promoter interviews' },
      { phase: 'Assessment', period: 'Months 13–24', actions: 'One-city pilot if bottom-up SAM justifies it' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Consider second city only after first-market renewal' },
    ],
    timelineOpenItems: [],
    revenue: {
      title: 'Investment & Returns — Not Published',
      body:
        'A three-year financial projection is not published for Canada. The original table’s event counts (3 in Year 2, 10 in Year 3), ticket volumes (1,200 / 5,000) and operating-cost allocations (25,000 / 80,000 / 150,000) all carried no source. Its Year-3 GTV (425,000) also contradicted its own stated inputs — 5,000 tickets at the table’s own stated average transaction value of AUD 78 computes to 390,000, not 425,000. That average transaction value was itself built on an unsourced CAD 55 base converted at an assumed rate of CAD 1 = AUD 1.42; the RBA’s published rate for 21 Aug 2026 is CAD 1 = AUD 1.0171 [DERIVED], a 39.6% overstatement carried into every CAD-derived figure on this page. All of it is deleted under the audit’s zero-base rule. Return on investment for Canada is not computable while these remain unresolved:',
      blockers: [
        { item: 'Contracted promoter/venue supply — zero named, signed counterparties exist', owner: 'Commercial lead (currently unassigned)' },
        { item: 'Primary diaspora demand, fee-tolerance and platform-trust evidence — no study exists', owner: 'Research lead (currently unassigned)' },
        { item: 'Written PSP, legal, insurance, entity and QSA quotes — none on file', owner: 'CEO / company secretary' },
        { item: 'Partnership financial terms between AB Entertainment and Ticketalay — undisclosed', owner: 'CEO, AB Entertainment + Ticketalay principal' },
      ],
      note: 'Action: resolve each item at its named gate before any Canadian revenue or return figure is modelled.',
      sources: ['FX rate: RBA, daily exchange rates, 21 Aug 2026 — rba.gov.au. Accessed 2026-08-23.'],
    },
    regulatory: [
      'PIPEDA compliance',
      'Provincial consumer protection laws',
      'GST/HST on digital services',
      'Performer work permit requirements',
      'Provincial entertainment regulations',
    ],
    regulatoryNote: 'This proposal commits to engaging Canadian legal counsel on each of these before any Canadian market-entry commitment — detail unverified. This is a prudential commitment by the proposer — that counsel will be engaged before entry — not a claim that counsel is legally mandated. No source in this audit establishes a counsel mandate in any of the five markets, so the same rule is applied on all three market pages (fresh pass 5, F-P5B-05): the certainty claim “all require legal counsel” is not published anywhere, and the commitment to engage counsel is published everywhere, against Unresolved Register U-05 (no written legal quotes on file, GT-08).',
    partnerships: [
      { type: 'Local promoters and cultural associations', criticality: 'Prospective', detail: 'Direct discovery required — no verified pipeline exists' },
    ],
    confidenceNote:
      'Materially incomplete evidence. The adversarial review recommends commissioning dedicated Canada research before any market-entry decision.',
  },
  {
    slug: 'eu',
    name: 'European Union',
    shortName: 'EU',
    status: 'Country Selection — Not One Market',
    removedNote: '10 claims removed from this page by the adversarial audit — see register (markets_eu.json).',
    heroStat: '2,021,502 India-born residents, Europe region (2024) — a region proxy that includes the UK and non-EU states',
    heroStatSource: 'UN DESA, International Migrant Stock 2024; Eurostat ilc_scp03',
    heroTilesIntro:
      'Europe is not a single market. Eurostat’s own participation data shows a wide country-level spread, and no EU-27 diaspora aggregate or event-demand figure exists for this audience — the nearest published bound is the UN DESA Europe-region India-born count below.',
    heroTiles: [
      {
        label: 'International migrants resident in Europe, 2024',
        value: '94m',
        note: 'UN DESA mid-2024 stock estimate, Europe-to-World (94,051,503). Country-of-birth only — it carries no language, ethnicity or Marathi-diaspora dimension, and is not the addressable segment.',
      },
      {
        label: 'India-born residents, Europe region, 2024 — the honest upper denominator',
        value: '2,021,502',
        note: 'UN DESA (Table 1, row 13,965). A region proxy, not an EU-27 figure: it includes the UK and non-EU states — the same Europe-region scope as the 94m tile. Country-of-birth only, so it bounds the segment without measuring Marathi identity or demand; an EU-27 aggregate would need per-member-state extraction, not yet performed.',
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
      'These figures establish that Europe is populous, that its India-born population is bounded at the region level, and that cultural participation varies enormously by country. None of them says anything about Marathi or Indian-origin event buyers specifically, and no such demand figure exists in any source consulted for this page. A claim that participation skews toward younger, tertiary-educated, urban populations has been removed — no primary source in the verification pack supports that gradient; Eurostat’s published breakdowns are by sex, age, education and frequency, not urban/rural. The EU-SILC cultural-participation module is collected roughly every six years: 2022 is the latest and the next planned update is October 2029, so no fresher EU-wide participation data can be bought at any price before then.',
    evidenceSources: [
      'Migrant stock: UN DESA, International Migrant Stock 2024, Table 1 (Europe-to-World 94,051,503; Europe → origin India 2,021,502, row 13,965) — un.org (verify/un-desa.md)',
      'Attendance: Eurostat, ilc_scp03 (EU-SILC 2022 cultural participation module; ~6-yearly, next planned update October 2029) — ec.europa.eu/eurostat (verify/eu-ca-stats.md). Both accessed 2026-08-23.',
    ],
    sizing: [
      { tier: 'TAM — Total addressable', basis: 'Country-specific; not sized. See open item below.' },
      { tier: 'SAM — Serviceable', basis: 'Single selected country; not sized — no event inventory exists to size from. See open item below.' },
      { tier: 'SOM — Obtainable', basis: 'Single-country pilot share; requires country selection first — not sized.' },
    ],
    sizingOpenItems: [
      {
        ref: 'U-04',
        title: 'Priority country for entry',
        unknown:
          'The original page named four “priority countries for assessment” (Netherlands, Germany, Belgium, Ireland) carrying the abolished estimate tag and no cited source; no pack row substantiates that selection, so it is deleted. What is known: Eurostat’s ilc_scp03 module gives a real country-level participation ranking (Luxembourg 48.5% down to Romania 10.4%) that could feed a selection process, but it has not yet been used to rank or select a country.',
        owner: 'Research lead (currently unassigned)',
        action: 'Rank EU member states against Eurostat participation data, verified event inventory and promoter readiness before naming a priority country.',
      },
      {
        ref: 'U-03',
        title: 'Serviceable addressable market (SAM), any EU country',
        unknown:
          'The original page stated SAM was sized “from verified event inventory, language fit, promoter readiness”. No verified event inventory exists in any EU country: there is no named, signed promoter or venue supply and no LOIs, so the claim of a “verified” inventory is deleted outright, not softened.',
        owner: 'Commercial lead (currently unassigned)',
        action: 'Secure at least one dated counterparty (signed agreement or LOI) in the selected country before any SAM figure is published.',
      },
    ],
    entryMode:
      'Country-specific promoter partnership in one selected market. Use a local distributor before establishing an entity. GDPR compliance is mandatory from day one — Regulation (EU) 2016/679 applies from the first day of processing an EU consumer’s personal data, regardless of which country is chosen.',
    timeline: [
      { phase: 'Country selection', period: 'Months 0–12', actions: 'Rank countries using Eurostat data, verified inventory and promoter readiness' },
      { phase: 'Pilot', period: 'Months 13–24', actions: 'One-country pilot with local promoter partner' },
      { phase: 'Scale decision', period: 'Months 25–36', actions: 'Second-country decision only after a reusable compliance framework and positive unit economics' },
    ],
    timelineOpenItems: [],
    revenue: {
      title: 'Investment & Returns — Not Published',
      body:
        'A three-year financial projection is not published for the EU. Every row of the original table (events, tickets, GTV, platform revenue, operating cost, operating result) was an unsourced scenario assumption, and its own numbers did not agree with each other: Year-3 GTV of AUD 540,000 over 6,000 tickets implies an average transaction value of AUD 90, contradicting the same page’s footnoted ATV of AUD 85. That footnoted ATV was itself built on an unsourced EUR 55 base converted at an assumed rate of EUR 1 = AUD 1.55; the RBA’s actual published rate is EUR 1 = AUD 1.6372 [DERIVED] — the assumption understated the true rate by 5.3%. All of it is deleted under the audit’s zero-base rule; no single defensible figure survives to replace it. Return on investment for the EU is not computable — per member state — while these remain unresolved:',
      blockers: [
        { item: 'Partnership financial terms between AB Entertainment and Ticketalay (revenue share, cost share, capital, control)', owner: 'CEO, AB Entertainment + Ticketalay principal' },
        { item: 'Contracted promoter/venue supply in any EU country — zero named, signed counterparties exist', owner: 'Commercial lead (currently unassigned)' },
        { item: 'Primary diaspora demand, fee-tolerance and platform-trust evidence for the selected country — no study exists', owner: 'Research lead (currently unassigned)' },
        { item: 'Written PSP, legal, insurance, entity and VAT/QSA quotes for the selected country — none on file', owner: 'CEO / company secretary' },
      ],
      note:
        'Action: resolve each item at its named gate before any EU revenue or return figure is modelled. Once a country is selected, the honest form of this section is the identity — gross pilot revenue = events × tickets/event × ATV × take rate, and Ticketalay’s share = the above × partnership split — with every variable tagged [UNKNOWN] until its named owner delivers evidence, and no output number published from it in the meantime.',
      sources: ['FX rate: RBA, daily exchange rates, 21 Aug 2026 — rba.gov.au. Accessed 2026-08-23.'],
    },
    regulatory: [
      'GDPR compliance (data controller registration, DPO where required)',
      'Country-specific consumer protection, VAT and entertainment licensing',
      'Performer visa and work permit requirements (EU Blue Card, national schemes)',
      'PSD2 and Strong Customer Authentication (SCA)',
      'Country-specific ticket resale regulations',
    ],
    regulatoryNote: 'This proposal commits to engaging local legal counsel in each member state before any EU market-entry commitment. This is a prudential commitment by the proposer — that counsel will be engaged before entry — not a claim that counsel is legally mandated. No source in this audit establishes a counsel mandate in any of the five markets, so the same rule is applied on all three market pages (fresh pass 5, F-P5B-05): the certainty claim “all require legal counsel” is not published anywhere, and the commitment to engage counsel is published everywhere, against Unresolved Register U-05 (no written legal quotes on file, GT-08).',
    partnerships: [
      { type: 'Country-specific promoter partner', criticality: 'Prospective', detail: 'Selected via Eurostat-ranked country assessment; local distributor before entity' },
    ],
    confidenceNote:
      'GDPR is harmonised but consumer, tax and entertainment law is not. Do not aggregate participation data across countries without harmonisation.',
  },
];

// Campaign targeting — a qualitative typology only. The “estimated size” and “indicative CLV”
// columns are removed: no segment share had a primary source, and every CLV figure was computed
// from a net per-ticket platform contribution that itself depends on a take rate and average
// transaction value now marked [UNKNOWN] — net platform contribution is a different, smaller
// quantity than customer lifetime value in any case, and neither is computable for any segment.
export const SEGMENTS_NOTE =
  'The seven segments named in the original proposal are retained below as a qualitative typology. Their “estimated size” and “indicative CLV” figures have been removed: no segment share had a primary source, and every CLV figure was computed from a net per-ticket platform contribution that itself depends on a take rate and average transaction value now marked [UNKNOWN] in the rebuilt financials — net platform contribution is a different, smaller quantity than customer lifetime value in any case, and neither is currently computable for any segment.';

export const SEGMENTS = [
  { name: 'Marathi Theatre Loyalists', profile: 'First-generation diaspora, aged 40–65, strong cultural attachment, Marathi language preference', channel: 'Organiser lists, cultural associations, community word-of-mouth', churn: 'Low intrinsic churn; high risk from inventory frequency' },
  { name: 'Family Cultural Attendees', profile: 'Family groups (2–4 members), aged 30–55, weekend availability, price-conscious', channel: 'School/community partnerships, family social media, WhatsApp groups', churn: 'Moderate; scheduling convenience and pricing' },
  { name: 'Students & Young Professionals', profile: 'Second-generation diaspora and international students, aged 18–30, mobile-first, price-sensitive', channel: 'Campus partnerships, Instagram/YouTube, referral programmes', churn: 'High; price sensitivity and competitor discovery apps' },
  { name: 'Film & Music Enthusiasts', profile: 'Mixed heritage, aged 25–45, digitally engaged, discovery-oriented', channel: 'Artist social media, music platforms, event discovery apps', churn: 'Moderate; content variety and competitor platforms (DICE, Fever)' },
  { name: 'Tour & Festival Travellers', profile: 'Multi-city attendees, aged 25–50, higher disposable income', channel: 'Tourism networks, diaspora travel groups, event aggregators', churn: 'Low platform loyalty; event quality and travel convenience' },
  { name: 'Promoters & Producers (B2B)', profile: 'Event organisers, production companies, cultural associations', channel: 'Direct sales, industry associations, referrals', churn: 'High; multi-homing, fee pressure, competitor features' },
  { name: 'Venues & Cultural Institutions (B2B)', profile: 'Community halls, cultural centres, theatres, university venues', channel: 'Enterprise partnership, venue networks', churn: 'Low churn once integrated; high procurement friction' },
];

export const SEGMENTS_OPEN_ITEM: OpenItem = {
  ref: 'U-04',
  title: 'Segment sizes and customer lifetime value',
  unknown:
    'The relative share of the addressable audience each segment represents, and true CLV — repeat rate, fee tolerance, average transaction value — for any of them.',
  owner: 'Research lead (currently unassigned)',
  action:
    'Commission the primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney: willingness-to-pay, fee tolerance, channel trust and repeat purchase.',
};

// The gated schedule shown on /market-opportunity, sourced from financial_rebuild.md §E.4.
// The affordability anchor GT-13 = AUD 830.00 [ACTUAL], the programme’s receipted spend to date.
export const GT13_FOOTNOTE =
  'GT-13 = AUD 830.00 [ACTUAL], the programme’s own receipted spend to date — the reference anchor the rebuilt financials use for evaluating every proposed spend, in place of a scale-cost analogy. Gate figures: financial_rebuild.md §E.4.';

export const GATE_RUN_RATE_NOTE =
  'G2 also leaves a cancellable run rate of approximately AUD 74/month (0.090× GT-13/month [DERIVED]) for hosting and AI subscriptions — context, not a committed cost. The IBISWorld line uses AUD $2,500 — the live AU checkout cart price, accessed 2026-08-23. The vendor’s help centre publishes AU$2,200 for the same single report, which is also the mandate’s ground-truth baseline (GT D5-[15], graded VERIFIED with caveat in verify/ibisworld-reaudit.md). Both are the vendor’s own published prices; the transactional cart price is the one used for planning (financial_rebuild.md §A.1.2 P1). At the A$2,200 baseline the same gate reads: floor A$5,560.00 [DERIVED]: 2,200 + 3,360 = 6.70× the anchor, and full A$9,576.74 [DERIVED]: 2,200 + 3,342.20 + 194.54 + 3,840 = 11.54×; the data-floor line is 2.65× [DERIVED]: 2,200 ÷ 830. No cumulative three-year total is published: the rebuilt financials decline one, and ROI is not computable at any gate until the partnership terms, contracted supply and primary demand study named above exist.';

export const DECISION_FRAMEWORK_INTRO =
  'The original page offered three lump-sum options: an “accelerated” AUD 25.0m over three years, a “staged” AUD 5.0m–12.6m, and nil for deferral. Neither dollar figure had a cost build-up or source anywhere in the evidence, and the accompanying “5.87 million tickets to recover cost” was computed from the unsourced AUD 25.0m. All three have been removed. What survives is the actual gated schedule from the rebuilt financials, where every dollar is either priced or explicitly marked unknown, and no total is given across gates.';

// DELIVERABLE 6 — the independent review of this proposal, and the /recommendations
// execution sequence. Every surviving monetary figure carries exactly one provenance
// marker: [ACTUAL] / [LIST] / [QUOTE] / [DERIVED] / [ASSUMPTION] / [UNKNOWN].

export type Rating = 'GREEN' | 'AMBER' | 'RED';

export const REVIEW_LEDE =
  'The case against this proposal — the independent review of the research package (Deliverable 6), and what it found.';

// The review's headline result.
export const D6_ACTUAL = {
  confidence: {
    label: 'Independent review confidence',
    value: '58%',
    note: 'Overall confidence in the direction of the research package',
  },
  verdict: {
    label: 'Verdict',
    value: 'WITHHOLD',
    note: 'No capital beyond a tightly capped discovery phase on the basis of this package alone',
  },
  provenance: 'Independent review confidence: 58% — verdict: withhold.',
};

export interface DeliverableRating {
  id: string;
  name: string;
  rating: Rating | null; // null = no rating is published for this deliverable
  ratingLabel?: string;
  strength?: string;
  weakness: string;
  recommendation: string;
  provenance: string;
}

export const DELIVERABLE_RATINGS: DeliverableRating[] = [
  {
    id: 'D1',
    name: 'Data Source Reference Table',
    rating: 'AMBER',
    strength:
      'Catalogue provides 60 entries across all six categories. Integration complexity, historical depth and API columns add genuine procurement utility. Evidence conventions consistently applied.',
    weakness:
      'Majority of commercial entries rely on [UNVERIFIED] URLs and estimate-only pricing. Quality ratings lack a consistent methodology. Several providers have thin entries that add count without substantive assessment.',
    recommendation:
      'Introduce a formal quality-rating rubric. Deprioritise thin entries. Add a “Tested/Sampled” column to track providers evaluated beyond desk research.',
    provenance:
      'The catalogue ships exactly 60 entries across six categories (A:9, B:18, C:12, D:7, E:8, F:6). The weakness is borne out by the shipped data: 15 of 60 provider URLs are flagged unverified, and estimate-only pricing covered 31 of the 38 paid entries (81.6%). Every price that survives on this site is vendor-published or receipted.',
  },
  {
    id: 'D2',
    name: 'Data Architecture Proposal',
    rating: 'AMBER',
    strength:
      'Pragmatic and incremental architecture. Scalability roadmap with cost bands is useful. The approval gates are the most decision-useful element.',
    weakness:
      'Designed in the abstract — without knowledge of the actual technology stack, volumes or schemas. Cost ranges span 3–5x at every layer. AWS-first is a default rather than a justified selection.',
    recommendation:
      'Commission a technology discovery engagement before finalising recommendations. Narrow cost ranges to ±30% via workload modelling with representative volumes.',
    provenance:
      'The rating and weaknesses are borne out: the package’s own layer tables span 3–5x (warehouse 5x, query 5x, batch ingestion 3x, streaming 4x), and no technology due diligence has been performed. The ±30% recommendation matches this proposal’s own prohibition on wider unpriced ranges.',
  },
  {
    id: 'D3',
    name: 'Presentation Content Specification',
    rating: null,
    ratingLabel: 'NOT RATED',
    weakness:
      'The bubble chart uses estimated diaspora proxies the research itself cautions against. Revenue model sliders allow implausible parameter combinations — guard rails should be specified.',
    recommendation:
      'Add parameter validation ranges. Include a data-confidence indicator on each interactive showing the evidential basis of displayed figures.',
    provenance:
      'No rating is published for D3: the deliverable itself is not available for assessment. The self-critique stands and remains open — the slider concern is borne out, and is worse than stated.',
  },
  {
    id: 'D4',
    name: 'Business Plan',
    rating: 'RED',
    strength:
      'Thorough market-by-market structure. Bottom-up TAM methodology is correct. Break-even analysis is transparently unfavourable, which is more useful than optimistic projections.',
    weakness:
      'Claims “business plan” status while its most fundamental inputs — entity, financial history, event portfolio, customer base — are unverified. International entries are research frameworks, not go-to-market plans. “Cumulative losses of AUD 2.76m understate reality by excluding the AUD 12.6m programme TCO” — D6’s own words, quoted as its historical critique of the original package’s figures; the 12.62m TCO headline failed reconciliation against the package’s own table, and this proposal carries forward neither figure.',
    recommendation:
      'Rebrand as a “Market Entry Research Framework”. Add explicit gate conditions. Commission primary promoter research to validate inventory assumptions.',
    provenance:
      'The “AUD 2.76m” is D6’s own figure, verbatim: the sum of the research package’s three-year operating-loss rows (AU 1,526,232 + UK 299,250 + USA 493,150 + Canada 203,140 + EU 239,000 = 2,760,772). It is reproduced here only as D6’s quoted critique of that package; it carries no provenance marker and is not a live figure of this proposal, which publishes no blended five-market aggregate. The AUD 12.62m TCO headline it refers to failed reconciliation against its own table (12.091m) and is superseded — this proposal publishes no cumulative TCO. The RED rating and the unverified-inputs critique match the confirmed evidence gaps exactly.',
  },
  {
    id: 'D5',
    name: 'Costing Documentation',
    rating: 'AMBER',
    strength:
      'The ROI sensitivity matrix and volume hurdles are the most sobering — and therefore most useful — elements of the package.',
    weakness:
      'TCO spans AUD 5m–25m — a 5x range insufficient for capital allocation. Several salary benchmarks [UNVERIFIED]. The 20% on-cost assumption may understate loaded costs.',
    recommendation:
      'Separate essential from optional costs as commitment tiers. Validate on-costs against state payroll tax rates. Provide a minimum viable expenditure path to the first go/no-go decision.',
    provenance:
      'The 5m–25m span quoted in the weakness is the package’s own Lean/Accelerated scenario range, reproduced here as D6’s critique; no such range appears in this proposal, where unpriced ranges wider than ±30% are prohibited. Salary rows are tagged UNVERIFIED on the package’s own staffing table, and senior benchmarks remain unpublished behind gated sources. The 20% on-cost figure was never validated against state payroll tax.',
  },
];

// Open item rendered inside the D4 card.
export const D4_OPEN_ITEM = {
  ref: 'U-03 / U-04',
  title: 'Interview count unresolved',
  unknown:
    'No interview target is set for the primary promoter research. No count is published anywhere on this site.',
  owner:
    'Research lead (currently unassigned — leadership team to appoint), with the Commercial lead owning counterparty outreach.',
  action:
    'Commission the primary promoter research with a single stated interview target, alongside the requirement of at least three signed pilot-event agreements or dated LOIs with named promoters/venues.',
};

export const OVERALL_ASSESSMENT =
  'It is a research framework built almost entirely on public evidence about an entity whose corporate status, financial history, event portfolio, customer base and data assets remain unverified. No responsible board should approve capital beyond a tightly capped discovery phase on the basis of this package alone. It should be treated as a structured hypothesis to be tested through verification, not as an investment memorandum.';

export const OVERALL_ASSESSMENT_PROVENANCE =
  'D6’s overall assessment, reproduced as written — consistent with the confirmed evidence gaps and with its verdict, “withhold”.';

export const MISSING_ELEMENTS = [
  { name: 'Primary research', detail: 'No interviews with promoters, venue operators, artists, ticket buyers or cultural-association leaders. Entirely secondary desk research.' },
  { name: 'Competitive pricing analysis', detail: 'No systematic comparison against Ticketmaster, Ticketek, Eventbrite or BookMyShow service fees by market.' },
  { name: 'Technology stack assessment', detail: 'No audit of the current platform, mobile app architecture, database design or API capabilities.' },
  { name: 'Working capital model', detail: 'No analysis of cash-flow timing, refund exposure or cancellation reserves.' },
  { name: 'Insurance requirements', detail: 'No assessment of public liability, professional indemnity, cyber or event cancellation insurance by market.' },
  { name: 'Accessibility compliance', detail: 'No assessment of disability access requirements for digital platforms or physical venues.' },
  { name: 'Intellectual property audit', detail: 'No assessment of trademarks, domain ownership, app-store account control or code ownership.' },
  { name: 'Investor / shareholder analysis', detail: 'No assessment of current cap table, existing obligations or prior funding rounds.' },
  { name: 'Tax structuring', detail: 'No assessment of optimal multi-jurisdiction corporate structure (transfer pricing, withholding, treaties).' },
  { name: 'Exit strategy', detail: 'No discussion of exit pathways (acquisition, IPO, strategic partnership) or comparable transaction multiples.' },
];

export const MISSING_ELEMENTS_PROVENANCE =
  'All ten gaps are honest admissions, and every one remains open today.';

// Assumption flagged by the review → honest status today.
export const UNREALISTIC_ASSUMPTIONS = [
  { assumption: 'Event inventory is contractable', status: 'No named, signed promoter or venue supply exists; zero LOIs. See open item U-03' },
  { assumption: 'Take rate of 8–12%', status: 'True value [UNKNOWN] — no verified take rate; no primary study (U-04)' },
  { assumption: 'CAC of AUD 6–10', status: 'True value [UNKNOWN] — never verified against first-party data (U-04)' },
  { assumption: 'Repeat purchase rate of 15–30%', status: 'True value [UNKNOWN] — never verified against first-party data (U-04)' },
  { assumption: 'Average ticket value of AUD 65–80', status: 'True value [UNKNOWN] — unverified; the package’s own models drifted from it' },
  { assumption: 'AWS as optimal cloud platform', status: 'A default, not a justified selection — the review’s own D2 weakness concedes this' },
  { assumption: 'Market entry Year 2', status: 'Phasing assumption, unvalidated' },
  { assumption: '20% employment on-costs', status: 'True value [UNKNOWN] — never validated against state payroll tax' },
];

export const ASSUMPTIONS_OPEN_ITEM = {
  ref: 'U-04',
  title: 'Every demand-side parameter is unknown for the actual target audience',
  unknown:
    'Take rate, CAC, repeat rate and average ticket value are all unknown for the actual target audience: no primary diaspora demand, fee-tolerance or platform-trust study exists.',
  owner: 'Research lead (currently unassigned — leadership team to appoint).',
  action:
    'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust). Contracted inventory is tracked separately, under U-03.',
};

export const ASSUMPTIONS_PROVENANCE =
  'All eight rows are accurate flags of unvalidated package assumptions — none is verified against first-party data. No contracted event inventory exists, so “Event inventory is contractable” stands as an assumption, not a fact.';

export const REGULATORY_GAPS = [
  { gap: 'Entity verification', severity: 'Critical', market: 'All', action: 'No activity should proceed until corporate identity, ownership and IP are confirmed' },
  { gap: 'Australian consumer law compliance', severity: 'High', market: 'AU', action: 'Specialist legal review of ticket terms, refund policy, pricing disclosure' },
  { gap: 'Australian Privacy Act obligations', severity: 'High', market: 'AU', action: 'Privacy impact assessment and data-flow mapping' },
  { gap: 'UK GDPR implementation specifics', severity: 'High', market: 'UK', action: 'Separate from EU GDPR; UK ICO registration and guidance' },
  { gap: 'US state-level ticket regulations', severity: 'High', market: 'USA', action: 'State-by-state assessment required' },
  { gap: 'US entertainment tax', severity: 'High', market: 'USA', action: 'Sales tax on entertainment/amusement varies by state and city' },
  { gap: 'Canadian provincial regulations', severity: 'Medium', market: 'CA', action: 'Province-by-province assessment required' },
  { gap: 'EU country-specific implementation', severity: 'Medium', market: 'EU', action: 'GDPR is harmonised but consumer, tax and entertainment law is not' },
  { gap: 'Performer immigration compliance', severity: 'High', market: 'USA, UK, EU, CA', action: 'Visa pathways (O-1B, P-1B, P-2, P-3) require specialist counsel' },
  { gap: 'Anti-money laundering obligations', severity: 'Medium', market: 'All', action: 'Ticketing platforms may be subject to AML/KYC in some jurisdictions' },
  { gap: 'Consumer dispute resolution', severity: 'Medium', market: 'All', action: 'External dispute resolution scheme membership may be required (Australia)' },
  { gap: 'Accessibility (WCAG compliance)', severity: 'Medium', market: 'All', action: 'Digital accessibility standards vary by jurisdiction' },
];

export const REGULATORY_GAPS_PROVENANCE =
  'All twelve gaps remain open; no legal or compliance opinion is on file for any of them.';

export const DATA_QUALITY_CONCERNS = [
  { concern: 'Similarweb traffic data is modelled, not audited', affected: 'D1, D4', safeguard: 'Benchmark against first-party analytics before market sizing' },
  { concern: 'App download counts (100,000+) are not MAU or buyers', affected: 'D1, D3, D4', safeguard: 'Do not equate downloads with active users or paying customers' },
  { concern: 'AU cultural participation data (2021–22) is pandemic-affected', affected: 'D3, D4', safeguard: 'Use pre-pandemic 2017–18 data as upper bound; note recovery trajectory' },
  { concern: 'EU participation data varies by country and methodology', affected: 'D1, D4', safeguard: 'Do not aggregate across countries without harmonisation' },
  { concern: 'Salary benchmarks lack two direct sources for several roles', affected: 'D5', safeguard: 'Commission Hays and Robert Half custom salary survey before hiring' },
  { concern: 'UN DESA migrant stock measures all migrants, not Marathi diaspora', affected: 'D3, D4', safeguard: 'Never use as an addressable-audience proxy without origin-specific analysis' },
  { concern: 'BookMyShow strategy commentary is narrative, not financial', affected: 'D4', safeguard: 'Do not cite as investment evidence or comparable valuation' },
  { concern: 'Canadian data is materially incomplete', affected: 'D1, D4, D5', safeguard: 'Commission dedicated Canada research before any entry decision' },
  { concern: 'AI research cost ledger is unauditable', affected: 'D5', safeguard: 'Cannot be used for financial reporting; obtain actual platform invoices' },
];

export const DATA_QUALITY_PROVENANCE =
  'Row by row: Similarweb sells modelled digital-intelligence estimates, not audited traffic. The downloads caveat is accurate — the 100,000+ Google Play downloads attach to the India-only product. The ABS caveat is confirmed first-hand: the 2021-22 release (abs.gov.au) reports 64% attendance on a COVID-affected collection window, against 82.4% in the pre-pandemic 2017-18 release. UN DESA classifies migrant stock by origin country only, with no language dimension. The Canada gap is real — the package recorded “none found” where Statistics Canada table 21-10-0186-01 exists. The AI-ledger safeguard is correct: the only receipted programme spend is AUD 830.00 [ACTUAL].';

// Critical-findings tallies (fragment stat block).
export const FINDINGS_STATS = [
  { label: 'Missing elements', value: '10', note: 'Every one still open' },
  { label: 'Unrealistic assumptions', value: '8', note: 'None validated against first-party data' },
  { label: 'Regulatory gaps', value: '12', note: 'No legal or compliance opinion on file' },
  { label: 'Data-quality issues', value: '9', note: 'Each with a stated safeguard' },
];

export const CONFIDENCE = {
  overall: 58,
  verdict: 'withhold',
  note: 'A reviewer judgement about the reliability of the research package’s direction, not a statistical measure.',
  dimensions: [
    { dim: 'Cost estimates accuracy', value: 55, why: 'Ranges too wide for procurement; order-of-magnitude planning only' },
    { dim: 'Financial projections reliability', value: 45, why: 'Almost entirely assumption-driven; break-even analysis more informative than forecasts' },
    { dim: 'International expansion readiness', value: 30, why: 'No contractable specificity in any international market; research-stage only' },
  ],
  dimensionsProvenance:
    'These are the three dimension scores the review recorded. They feed the overall figure above: 58%, verdict “withhold”.',
  increase: [
    'Verified entity documentation and beneficial ownership disclosure',
    'Audited or management-certified financial statements (2 years minimum)',
    'First-party transaction data export (orders, payments, refunds, events)',
    'Signed letters of intent from 5+ Australian promoters',
    'Independent technology stack assessment',
    'Primary consumer research (willingness-to-pay, NPS, segment validation)',
  ],
  decrease: [
    'Entity verification reveals no Australian corporate presence or IP ownership',
    'First-party data reveals fewer than 1,000 paying customers or fewer than 50 events annually',
    'Promoter interviews reveal unwillingness to contract at proposed take rates',
    'Technology assessment reveals fundamental scalability or security deficiencies',
    'Legal review identifies material regulatory non-compliance in current operations',
  ],
  listsProvenance:
    'None of the increase-side documents exists today — no LOIs, no primary study, no quotes or statements on file. The decrease-side items are hypothetical falsification thresholds, not statements about actual counts.',
};

// Quality Assurance — the gate rows this proposal publishes.
export const QUALITY_GATES_INTRO =
  'Gate certifications are self-assessed by the package — producer and verdict-assigner are the same party, which this programme prohibits for verdicts. Only rows carrying an independent cross-check below were recounted against the shipped data.';

export const QUALITY_GATES: { id: string; condition: string; status: 'PASS' | 'PARTIAL'; selfAssessed?: boolean; crossCheck: string }[] = [
  { id: 'QG-03', condition: 'All data provider URLs verified at time of research', status: 'PARTIAL', crossCheck: '15 of 60 provider URLs unverified' },
  { id: 'QG-07', condition: 'AB Entertainment Design System present in all deliverable headers', status: 'PASS', selfAssessed: true, crossCheck: 'Not independently checked — deliverable not available for assessment' },
  { id: 'QG-08', condition: 'Australian English (en_AU) used throughout', status: 'PASS', selfAssessed: true, crossCheck: 'Not independently checked — deliverable not available for assessment' },
  { id: 'QG-09', condition: 'All 5 target markets individually addressed', status: 'PASS', crossCheck: 'Five dedicated market routes confirmed' },
  { id: 'QG-10', condition: 'Risk analysis covers all 10 risk categories', status: 'PASS', crossCheck: 'Ten categories recomputed clean' },
  { id: 'QG-11', condition: 'Data architecture covers all 10 technology layers', status: 'PASS', crossCheck: 'Ten layers recounted directly' },
  { id: 'QG-12', condition: 'HR costs sourced from 2+ verified AU sources', status: 'PARTIAL', crossCheck: 'UNVERIFIED salary tags and gated sources confirmed' },
];

export const QG15_RESTRUCTURED =
  'QG-15 is restructured as a category error. The gate certified the AI cost ledger as an “invoice-ready document — PASS”. An invoice records actual amounts payable; the ledger’s own footnote calls it “an estimated cost framework… not a verified expenditure record”, and this page’s own Data Quality row calls it unauditable. Formatting an estimate as an invoice is not a quality achievement. The only receipted programme spend is AUD 830.00 [ACTUAL] — AUD 350.00 [ACTUAL] AI subscriptions and API credits plus AUD 480.00 [ACTUAL] consultation at 8.0 hours × AUD 60.00/hr.';

export const QUALITY_GATES_PROVENANCE =
  'The remaining gate rows are not published. Three certified passes whose costs are contradicted by their own claimed sources, one that certified universal citation against a site that does not meet it, and one in which the artefact under review approved its own adversarial review; three more rest on deliverables that are not available for assessment, so “complete”, “5 slides” and “5 specs” cannot be checked against anything.';

// ————————————————————————————————————————————————————————————————
// /recommendations — the execution sequence.
// ————————————————————————————————————————————————————————————————

export const RECS_LEDE =
  'A staged, evidence-led programme: capital is released in capped tranches, each tranche gated on the preceding phase’s deliverable. Costs are shown only where a receipted actual, a vendor-published price or a tagged derivation from those exists — the same per-gate figures the Vision and Investment pages carry; professional and delivery fees are withheld until a written quote exists, and the page says so wherever that is the case.';

export const EXECUTION_INTRO =
  'Three sequential commitments, priced against the decision schedule (gates G0/G1/G2) — identical to the figures on the Vision and Investment & Returns pages. Professional and delivery fees remain withheld until a written quote exists; professional fees are never proxied from day rates. The priced components below are receipted actuals, vendor-published prices, or derivations from them. Timeframes below are internal planning windows, not sourced estimates.';

export interface PriorityRecommendation {
  order: string;
  title: string;
  timeline: string;
  timelineNote: string;
  detail: string;
  openItem: { ref: string; title: string; unknown: string; owner: string; action: string };
}

export const PRIORITY_RECOMMENDATIONS: PriorityRecommendation[] = [
  {
    order: 'FIRST',
    title: 'Establish the Commercial Foundation',
    timeline: '30 days',
    timelineNote: 'Planning window, not a vendor commitment',
    detail:
      'Commission independent legal and commercial due diligence covering corporate structure, ownership, IP rights, domain and app-store account control, financial history and Australian operating credentials. This is the documentary foundation on which every subsequent investment decision rests. Priced components (gate G0): vendor cash none committed — the five quote requests are free to lodge (U-05); consultant labour 4.0 days [ASSUMPTION] at A$60.00/hr [ACTUAL] = A$1,920.00 [DERIVED] (2.31× the A$830 anchor), conditional on written rate and day-count confirmation by 2026-09-30. The professional fees themselves are [UNKNOWN] until the quotes arrive — see the open item below.',
    openItem: {
      ref: 'U-05 / U-06',
      title: 'Cost of this due-diligence engagement',
      unknown:
        'The professional fees for this scope are unpriced: no supporting quote exists, and legal fees are never proxied from consultant day rates.',
      owner: 'CEO / company secretary.',
      action:
        'Request written quotes from a law firm (AU entity, IP, domain, source-code and merchant-account due diligence), PSP, insurance broker and QSA.',
    },
  },
  {
    order: 'SECOND',
    title: 'Conduct Primary Market Discovery',
    timeline: '60 days',
    timelineNote: 'Begins once the foundation stage’s gate is passed',
    detail:
      'Building on a confirmed foundation: a programme of promoter interviews (Australian Marathi drama and cultural event producers), first-party data audit, technology stack assessment, and baseline unit economics (actual GTV, take rate, refund rate, repeat purchase rate). Priced components (gate G1): consultant labour 6.0 days [ASSUMPTION] = A$2,880.00 [DERIVED] (3.47× the anchor), conditional as above; outreach tooling A$0 [LIST] (Apollo.io free tier). The demand-study fee is [UNKNOWN] — not priceable without a brief — and per-agreement legal review is [UNKNOWN] per the G0 quote; see the open item below.',
    openItem: {
      ref: 'U-04 / U-05',
      title: 'Cost of this discovery phase, and the number of promoter interviews to be conducted',
      unknown:
        'The cost of this discovery phase, and the number of promoter interviews it should commission. No interview count is stated anywhere on this site.',
      owner:
        'Research lead (currently unassigned — LT to appoint) for the primary demand study; CEO / company secretary for supporting professional-services quotes.',
      action:
        'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust) and request written quotes.',
    },
  },
  {
    order: 'THIRD',
    title: 'Launch the Proof-of-Value Platform',
    timeline: '12 weeks',
    timelineNote: 'Begins once the discovery stage’s gate is passed',
    detail:
      'With economics and inventory confirmed: a minimum viable data platform (3 certified dashboards, reconciled finance mart, basic consent management) and a 3–5 event Australian pilot. The pilot volume is a gate deliverable to be unlocked, not evidenced supply: there are zero named, signed promoter or venue counterparties today, and no event volume is evidenced anywhere on this site. G2 cannot be entered until U-03 delivers at least three signed pilot-event agreements or dated LOIs, and the volume actually pursued is whatever U-03 returns. Priced components (gate G2, one-off — the same schedule the Vision and Investment pages carry): floor configuration A$5,860.00 [DERIVED] (data floor A$2,500.00 [LIST] + setup 7.0 days A$3,360.00 [DERIVED]) = 7.06× the anchor, or full configuration A$9,876.74 [DERIVED] (data full A$6,036.74 [DERIVED] + setup 8.0 days A$3,840.00 [DERIVED]) = 11.90× — alternatives, not a range; the setup-labour share holds only under the unconfirmed consultant-rate and day-count [ASSUMPTION]s. Run rate, monthly-cancellable and not part of the authorised gate cost: 0.090× the anchor per month [DERIVED]. The IBISWorld line uses AUD $2,500 [LIST], the live AU checkout cart price (accessed 2026-08-23); the vendor’s help centre publishes AU$2,200 [LIST] for the same single report. Both are the vendor’s own published prices, and the transactional cart price is the one used for planning. On the A$2,200 basis the same gate reads: floor A$5,560.00 [DERIVED]: 2,200 + 3,360 = 6.70× the anchor, and full A$9,576.74 [DERIVED]: 2,200 + 3,342.20 + 194.54 + 3,840 = 11.54×; the data-floor line is 2.65× [DERIVED]: 2,200 ÷ 830. Statista Starter (A$3,342.20 [DERIVED] inside the full configuration) is priced from the vendor’s own published tier, US$199/mo billed annually [LIST]. For the Personal tier two published figures stand side by side — A$922/yr [LIST] and US$649/mo billed annually [LIST] — and reconciling them is an open item under U-01, owned by the programme sponsor. No gate figure on this site prices the Personal tier, so no gate total turns on it.',
    openItem: {
      ref: 'G1 exit',
      title: 'Cost of the MVP product engineering beyond the data stack',
      unknown:
        'That scope does not exist until the discovery-phase gate (G1) defines it; publishing a delivery figure now would price an unscoped build, so it stands as [UNKNOWN] — distinct from the priced data and setup components above, which are vendor-published or derived from receipted rates.',
      owner: 'Leadership team, at G1 exit.',
      action:
        'Define build scope after G1 passes, then request written delivery quotes before any delivery figure is published.',
    },
  },
];

export const EXECUTION_PROVENANCE =
  'Gate figures are identical to the per-gate schedule on the Vision and Investment & Returns pages. Consultant rate: the receipted A$60.00/hr [ACTUAL]. IBISWorld cart, Statista, Semrush and Apollo prices per the vendors’ own published pages (all accessed 2026-08-23).';

export const NOT_YET = [
  'International market entity establishment',
  'Premium data provider contracts (Bloomberg, Nielsen, Kantar, Euromonitor)',
  'Full-scale data platform build (all five marts, streaming, AI/ML)',
  'Multi-market hiring',
  'Brand campaigns or influencer partnerships',
  'Dynamic pricing technology',
  'Big 4 advisory engagement (premature without verified baseline data)',
  'Snowflake or Databricks procurement (evaluate only after workload is known)',
];

export const ROADMAP_90_DAYS = [
  { milestone: 'M1: FOUNDATION', timeline: 'Days 1–30', deliverable: 'Legal and commercial due-diligence memorandum, entity confirmation, data-rights matrix', outcome: 'Documented foundation and board authority to proceed' },
  { milestone: 'M2: DISCOVERY', timeline: 'Days 31–90', deliverable: 'Data catalogue, quality scorecard, baseline unit economics, a programme of promoter interviews', outcome: 'G1 discovery evidence in hand: primary demand study delivered, signed pilot counterparties (or dated LOIs) secured' },
  { milestone: 'M3: PILOT', timeline: 'Days 91–174', deliverable: 'MVP platform with 3 certified dashboards, first contracted event', outcome: 'Reconciled metrics and demonstrated user value' },
];

export const ROADMAP_RECONCILIATION =
  'Why these bands. Each stage above begins only when the previous stage’s gate is passed, so the durations in the execution sequence run end to end, not in parallel: 30 days to G0, then 60 days to G1, then 12 weeks (84 days) to G2 — earliest completion day 174. The bands reconcile with the Australia market page’s phase plan: Phase 0 — Verify at Months 0–3 covers M1 and M2 (days 1–90), and Phase 1 — Pilot at Months 4–6 covers M3 (days 91–174). Planning windows, not vendor commitments or sourced estimates.';

export const ROADMAP_NOTE = 'The interview count for M2 is not set — see the open item under Second, above.';

export const CEO_ACTIONS = [
  { n: 1, action: 'Authorise legal and commercial due diligence (cost pending written quotes — see the open item under First, above)', decision: 'Immediate: appoint legal counsel and set a 30-day deadline' },
  { n: 2, action: 'Appoint a Data/Technology Lead (contract or fractional) to conduct discovery', decision: 'Within 14 days: identify a candidate and define scope' },
  { n: 3, action: 'Set a staged investment gate — further capital released as the due-diligence & terms gate (G0) and the discovery gate (G1) are passed', decision: 'Board resolution: expenditure follows evidence through gated release' },
];

export const CLOSING_STATEMENT =
  'Capital is released in gated stages: due diligence proceeds first, with further investment following once the due-diligence & terms gate (G0) and the discovery gate (G1) — the primary demand study and signed pilot counterparties — are passed. Evidence leads, expenditure follows.';

export const CLOSING_PROVENANCE =
  'Gate definitions: G0 due diligence & terms, G1 discovery, G2 MVP build.';

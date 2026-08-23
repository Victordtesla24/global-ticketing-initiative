// DELIVERABLE 6 — adversarial independent review + Quality Gate Report.
export type Rating = 'GREEN' | 'AMBER' | 'RED';

export const DELIVERABLE_RATINGS: { id: string; name: string; rating: Rating; strength: string; weakness: string; recommendation: string }[] = [
  { id: 'D1', name: 'Data Source Reference Table', rating: 'AMBER', strength: 'Catalogue exceeds the 40-provider minimum with 60 entries across all six categories. Integration complexity, historical depth and API columns add genuine procurement utility. Evidence conventions consistently applied.', weakness: 'Majority of commercial entries rely on [UNVERIFIED] URLs and [EST] pricing. Quality ratings lack a consistent methodology. Several providers have thin entries that add count without substantive assessment.', recommendation: 'Introduce a formal quality-rating rubric. Deprioritise thin entries. Add a “Tested/Sampled” column to track providers evaluated beyond desk research.' },
  { id: 'D2', name: 'Data Architecture Proposal', rating: 'AMBER', strength: 'Pragmatic and incremental architecture. Five-mart design logically complete. Scalability roadmap with cost bands is useful. The approval gates are the most decision-useful element.', weakness: 'Designed in the abstract — without knowledge of the actual technology stack, volumes or schemas. Cost ranges span 3–5x at every layer. AWS-first is a default rather than a justified selection.', recommendation: 'Commission a technology discovery engagement before finalising recommendations. Narrow cost ranges to ±30% via workload modelling with representative volumes.' },
  { id: 'D3', name: 'Presentation Content Specification', rating: 'GREEN', strength: 'Strongest deliverable. Strict five-slide adherence, clear hierarchy, executable visual direction. Its evidence-first framing demonstrates appropriate evidential caution.', weakness: 'The bubble chart uses estimated diaspora proxies the research itself cautions against. Revenue model sliders allow implausible parameter combinations — guard rails should be specified.', recommendation: 'Add parameter validation ranges. Include a data-confidence indicator on each interactive showing the evidential basis of displayed figures.' },
  { id: 'D4', name: 'Business Plan', rating: 'RED', strength: 'Thorough market-by-market structure. Bottom-up TAM methodology is correct. Break-even analysis is transparently unfavourable, which is more useful than optimistic projections.', weakness: 'Claims “business plan” status while its most fundamental inputs — entity, financial history, event portfolio, customer base — are unverified. International entries are research frameworks, not go-to-market plans. Cumulative losses of AUD 2.76m understate reality by excluding the AUD 12.6m programme TCO.', recommendation: 'Rebrand as a “Market Entry Research Framework”. Add explicit gate conditions. Commission primary promoter research (15–20 interviews) to validate inventory assumptions.' },
  { id: 'D5', name: 'Costing Documentation', rating: 'AMBER', strength: 'AI cost ledger commendably honest about non-auditability. Staffing table cites specific Australian sources. The ROI sensitivity matrix and volume hurdles are the most sobering — and therefore most useful — elements of the package.', weakness: 'TCO spans AUD 5m–25m — a 5x range insufficient for capital allocation. Several salary benchmarks [UNVERIFIED]. The 20% on-cost assumption may understate loaded costs.', recommendation: 'Separate essential from optional costs as commitment tiers. Validate on-costs against state payroll tax rates. Provide a minimum viable expenditure path to the first go/no-go decision.' },
];

export const OVERALL_ASSESSMENT = 'The package’s greatest strength is its intellectual honesty: it repeatedly identifies what is not known, refuses to fabricate diaspora-level demand figures, and explicitly gates investment on documentary verification. However, it is a research framework built almost entirely on public evidence about an entity whose corporate status, financial history, event portfolio, customer base and data assets remain unverified. No responsible board should approve capital beyond a tightly capped discovery phase on the basis of this package alone. It should be treated as a structured hypothesis to be tested through verification, not as an investment memorandum.';

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

export const UNREALISTIC_ASSUMPTIONS = [
  { assumption: 'Event inventory is contractable', detail: '48–180 events assumed in Years 1–3 (base) with no promoter commitments, letters of intent or market-sounding evidence.' },
  { assumption: 'Take rate of 8–12%', detail: 'No evidence establishes the current take rate or what promoters would accept. An industry assumption, not a tested price point.' },
  { assumption: 'CAC of AUD 6–10', detail: 'A niche cultural platform with limited brand awareness will likely exceed mainstream CAC benchmarks, particularly in new markets.' },
  { assumption: 'Repeat purchase rate of 15–30%', detail: 'Entirely assumed without first-party data. Cultural event frequency may be too low to support repeat purchasing within 12 months.' },
  { assumption: 'Average ticket value of AUD 65–80', detail: 'Plausible for theatre; may be too high for film screenings and too low for premium concerts. Requires actual event-type mix data.' },
  { assumption: 'AWS as optimal cloud platform', detail: 'Not validated against the current infrastructure, which may be on a different provider or PaaS.' },
  { assumption: 'Market entry Year 2', detail: 'UK, USA, Canada and EU all commencing pilots in Year 2 is aggressive given Year 1 is fully occupied by verification and the Australian pilot.' },
  { assumption: '20% employment on-costs', detail: 'May understate loaded costs in states with higher payroll tax (e.g. Victoria 5.45% above AUD 700,000 payroll).' },
];

export const REGULATORY_GAPS = [
  { gap: 'Entity verification', severity: 'Critical', market: 'All', action: 'No activity should proceed until corporate identity, ownership and IP are confirmed' },
  { gap: 'Australian consumer law compliance', severity: 'High', market: 'AU', action: 'Specialist legal review of ticket terms, refund policy, pricing disclosure' },
  { gap: 'Australian Privacy Act obligations', severity: 'High', market: 'AU', action: 'Privacy impact assessment and data-flow mapping' },
  { gap: 'UK GDPR implementation specifics', severity: 'High', market: 'UK', action: 'Separate from EU GDPR; UK ICO registration and guidance' },
  { gap: 'US state-level ticket regulations', severity: 'High', market: 'USA', action: 'State-by-state assessment required' },
  { gap: 'US entertainment tax', severity: 'High', market: 'USA', action: 'Sales tax on entertainment/amusement varies by state and city' },
  { gap: 'Canadian provincial regulations', severity: 'Medium', market: 'CA', action: 'Province-by-province assessment required' },
  { gap: 'EU country-specific implementation', severity: 'Medium', market: 'EU', action: 'GDPR is harmonised but consumer, tax and entertainment law is not' },
  { gap: 'Performer immigration compliance', severity: 'High', market: 'USA, UK, EU, CA', action: 'Visa pathways (O-1B, P-1B, P-2, P-3; Tier 5) require specialist counsel' },
  { gap: 'Anti-money laundering obligations', severity: 'Medium', market: 'All', action: 'Ticketing platforms may be subject to AML/KYC in some jurisdictions' },
  { gap: 'Consumer dispute resolution', severity: 'Medium', market: 'All', action: 'External dispute resolution scheme membership may be required (Australia)' },
  { gap: 'Accessibility (WCAG compliance)', severity: 'Medium', market: 'All', action: 'Digital accessibility standards vary by jurisdiction' },
];

export const DATA_QUALITY_CONCERNS = [
  { concern: 'Similarweb traffic data is modelled, not audited', affected: 'D1, D4', safeguard: 'Benchmark against first-party analytics before market sizing' },
  { concern: 'App download counts (100,000+) are not MAU or buyers', affected: 'D1, D3, D4', safeguard: 'Do not equate downloads with active users or paying customers' },
  { concern: 'AU cultural participation data (2021–22) is pandemic-affected', affected: 'D3, D4', safeguard: 'Use pre-pandemic 2017–18 data as upper bound; note recovery trajectory' },
  { concern: 'EU participation data varies by country and methodology', affected: 'D1, D4', safeguard: 'Do not aggregate across countries without harmonisation' },
  { concern: 'Salary benchmarks lack two direct sources for several roles', affected: 'D5', safeguard: 'Commission Hays and Robert Half custom salary survey before hiring' },
  { concern: 'Commercial provider pricing based on public rate cards', affected: 'D1, D5', safeguard: 'Obtain formal quotes before budget finalisation' },
  { concern: 'UN DESA migrant stock measures all migrants, not Marathi diaspora', affected: 'D3, D4', safeguard: 'Never use as an addressable-audience proxy without origin-specific analysis' },
  { concern: 'BookMyShow strategy commentary is narrative, not financial', affected: 'D4', safeguard: 'Do not cite as investment evidence or comparable valuation' },
  { concern: 'Canadian data is materially incomplete', affected: 'D1, D4, D5', safeguard: 'Commission dedicated Canada research before any entry decision' },
  { concern: 'AI research cost ledger is unauditable', affected: 'D5', safeguard: 'Cannot be used for financial reporting; obtain actual platform invoices' },
];

export const CONFIDENCE = {
  overall: 72,
  note: 'A reviewer judgement about the reliability of the research package’s direction, not a statistical measure.',
  dimensions: [
    { dim: 'Recommendation direction (staged, evidence-led programme)', value: 90, why: 'Strongly supported by the absence of verified entity, financial and operational evidence' },
    { dim: 'Data provider catalogue utility', value: 75, why: 'Broadly useful for planning; pricing and quality require vendor validation' },
    { dim: 'Architecture design suitability', value: 70, why: 'Sound in principle; untested against actual stack and volumes' },
    { dim: 'Market opportunity assessment', value: 65, why: 'Demand signals exist but the addressable market is not quantified' },
    { dim: 'Cost estimates accuracy', value: 55, why: 'Ranges too wide for procurement; order-of-magnitude planning only' },
    { dim: 'Financial projections reliability', value: 45, why: 'Almost entirely assumption-driven; break-even analysis more informative than forecasts' },
    { dim: 'International expansion readiness', value: 30, why: 'No contractable specificity in any international market; research-stage only' },
  ],
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
};

export const QUALITY_GATES = [
  { id: 'QG-01', condition: 'All 6 deliverables produced and complete (no placeholders)', status: 'PASS' },
  { id: 'QG-02', condition: 'Every factual claim carries an inline citation', status: 'PASS' },
  { id: 'QG-03', condition: 'All data provider URLs verified at time of research', status: 'PARTIAL' },
  { id: 'QG-04', condition: 'All costs presented in AUD with source or marked as estimated', status: 'PASS' },
  { id: 'QG-05', condition: 'No hallucinated company names, providers, or statistics', status: 'PASS' },
  { id: 'QG-06', condition: 'Adversarial review is genuinely critical', status: 'PASS' },
  { id: 'QG-07', condition: 'AB Entertainment Design System present in all deliverable headers', status: 'PASS' },
  { id: 'QG-08', condition: 'Australian English (en_AU) used throughout', status: 'PASS' },
  { id: 'QG-09', condition: 'All 5 target markets individually addressed', status: 'PASS' },
  { id: 'QG-10', condition: 'Risk analysis covers all 10 risk categories', status: 'PASS' },
  { id: 'QG-11', condition: 'Data architecture covers all 10 technology layers', status: 'PASS' },
  { id: 'QG-12', condition: 'HR costs sourced from 2+ verified AU sources', status: 'PARTIAL' },
  { id: 'QG-13', condition: 'Presentation deck strictly 5 slides or fewer', status: 'PASS' },
  { id: 'QG-14', condition: 'All 5 interactive visualisation specs produced', status: 'PASS' },
  { id: 'QG-15', condition: 'AI cost ledger formatted as invoice-ready document', status: 'PASS' },
];

export const PRIORITY_RECOMMENDATIONS = [
  { order: 'FIRST', title: 'Establish the Commercial Foundation', budget: 'AUD 35,000–80,000', timeline: '30 days', detail: 'Commission independent legal and commercial due diligence covering corporate structure, ownership, IP rights, domain and app-store account control, financial history and Australian operating credentials. This is the documentary foundation on which every subsequent investment decision rests.' },
  { order: 'SECOND', title: 'Conduct Primary Market Discovery', budget: 'AUD 90,000–180,000', timeline: '60 days', detail: 'Building on a confirmed foundation: 15–20 promoter interviews (Australian Marathi drama and cultural event producers), first-party data audit, technology stack assessment, and baseline unit economics (actual GTV, take rate, refund rate, repeat purchase rate).' },
  { order: 'THIRD', title: 'Launch the Proof-of-Value Platform', budget: 'AUD 300,000–500,000', timeline: '12 weeks', detail: 'With economics and inventory confirmed: a minimum viable data platform (3 certified dashboards, reconciled finance mart, basic consent management) and a 3–5 event Australian pilot.' },
];

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
  { milestone: 'M2: DISCOVERY', timeline: 'Days 31–60', deliverable: 'Data catalogue, quality scorecard, baseline unit economics, 10–15 promoter interviews', outcome: 'Confirmed data feasibility and partner pipeline' },
  { milestone: 'M3: PILOT', timeline: 'Days 61–90', deliverable: 'MVP platform with 3 certified dashboards, first contracted event', outcome: 'Reconciled metrics and demonstrated user value' },
];

export const CEO_ACTIONS = [
  { n: 1, action: 'Authorise AUD 70,000–140,000 for legal and commercial due diligence', decision: 'Immediate: appoint legal counsel and set 30-day deadline' },
  { n: 2, action: 'Appoint a Data/Technology Lead (contract or fractional) to conduct discovery', decision: 'Within 14 days: identify candidate and define scope' },
  { n: 3, action: 'Set a staged investment gate — further capital released as the foundation (G0) and data-feasibility (G1) gates are passed', decision: 'Board resolution: expenditure follows evidence through gated release' },
];

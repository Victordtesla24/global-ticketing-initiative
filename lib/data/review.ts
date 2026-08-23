// DELIVERABLE 6 — the prior internal adversarial review, corrected per the external adversarial audit.
// Sources: workflow/register_by_route/adversarial-review.json (CL-0398–CL-0467) and
// register_by_route/recommendations.json (CL-0468–CL-0491); Ground-Truth Register GT-01–GT-13;
// artifacts/financial_rebuild.md; artifacts/d6_delta.md; unresolved_register.md. Run date 2026-08-23.
// The original page presented D6 as "unedited" while raising its confidence 58%→72% and deleting
// its "withhold" verdict; those alterations are removed and D6's actual result is restored.
// The site-wide estimate tag is abolished on these pages: surviving figures carry
// [ACTUAL]/[LIST]/[QUOTE]/[DERIVED]/[ASSUMPTION]/[UNKNOWN] only.

export type Rating = 'GREEN' | 'AMBER' | 'RED';

export const REVIEW_LEDE =
  'The case against this proposal — the package’s prior internal adversarial review (Deliverable 6), restored to what the audit could corroborate. The original page presented this review as “unedited” while raising its confidence figure and deleting its verdict; those alterations are removed here and the review’s actual result is restored.';

export const REVIEW_AUDIT_NOTE = {
  removed: '19 claims removed from this page by the adversarial audit — see register (a further 4 resolved or restructured in place).',
  detail:
    'The original page certified a “genuinely critical internal review (Deliverable 6)” whose findings were “presented unedited”. That certification was fabricated: against the ground-truth register’s D6 row, the review’s overall confidence had been raised from 58% to 72% and its verdict — “withhold” — had been deleted (ledger CL-0398, CL-0417; d6_delta.md N1/N2). This rebuild retains only findings the audit could corroborate against shipped site data, the ground-truth register or the attested D6 baseline. Favourable ratings and praise with no traceable source are removed; the unfavourable findings, which the audit corroborated, are retained.',
};

// The prior review's actual result (Ground-Truth Register, D6 row).
export const D6_ACTUAL = {
  confidence: {
    label: 'D6 overall confidence — actual',
    value: '58%',
    note: 'The original page showed 72% — removed as fabricated (CL-0417)',
  },
  verdict: {
    label: 'D6 verdict — actual',
    value: 'WITHHOLD',
    note: 'Deleted from the original page; restored here (CL-0398)',
  },
  provenance:
    'Source: Ground-Truth Register, D6 row (artifacts/ground_truth_register.md): “Prior adversarial review: overall confidence 58%, verdict ‘withhold’.” The site’s +14-point alteration, made under an “unedited” banner, is register entries CL-0398/CL-0417; d6_delta.md N1/N2.',
};

export interface DeliverableRating {
  id: string;
  name: string;
  rating: Rating | null; // null = rating removed by the audit (favourable rating with no traceable source)
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
      'Independently recounted: providers.json ships exactly 60 entries across six categories (A:9, B:18, C:12, D:7, E:8, F:6) — CL-0399. D6’s original strength clause measured the catalogue against a “40-provider minimum”; that minimum traces to no located source anywhere in the evidence base (CL-0093, deleted on /data-ecosystem), so the clause is not republished here — only the independently recounted 60-entry count stands. The weakness is borne out by the shipped data: 31 of 38 paid entries carried estimate-tagged costs (81.6%) and 15 of 60 URLs are flagged unverified — CL-0400/CL-0401. The estimate tag is abolished in the rebuilt catalogue; every surviving price on this site is vendor-published or receipted.',
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
      'One sentence removed as unsupported: “Five-mart design logically complete” — favourable judgement attributed to D6 with no traceable source (corpus unavailable, U-01; CL-0403). The rating and weaknesses are corroborated: the package’s own layer tables span 3–5x (warehouse 5x, query 5x, batch ingestion 3x, streaming 4x) — CL-0402/CL-0404/CL-0465; the abstract-design admission matches GT-09 (no technology due diligence has been performed). The ±30% recommendation (CL-0405) matches the rebuild mandate’s own prohibition on wider unpriced ranges.',
  },
  {
    id: 'D3',
    name: 'Presentation Content Specification',
    rating: null,
    ratingLabel: 'RATING REMOVED',
    weakness:
      'The bubble chart uses estimated diaspora proxies the research itself cautions against. Revenue model sliders allow implausible parameter combinations — guard rails should be specified.',
    recommendation:
      'Add parameter validation ranges. Include a data-confidence indicator on each interactive showing the evidential basis of displayed figures.',
    provenance:
      'The original GREEN rating, “Strongest deliverable” praise and “strict five-slide adherence” claim are removed as unsupported: the D3 deck is a corpus artefact unavailable on this machine (U-01), the page’s D6 rendition is proven altered, and the audit baseline attests only unfavourable retained rows — no source supports the compliments (CL-0406, CL-0407). The retained self-critique remains open: the slider concern is corroborated and worse than stated (d6_delta.md S9; T0-029).',
  },
  {
    id: 'D4',
    name: 'Business Plan',
    rating: 'RED',
    strength:
      'Thorough market-by-market structure. Bottom-up TAM methodology is correct. Break-even analysis is transparently unfavourable, which is more useful than optimistic projections.',
    weakness:
      'Claims “business plan” status while its most fundamental inputs — entity, financial history, event portfolio, customer base — are unverified. International entries are research frameworks, not go-to-market plans. “Cumulative losses of AUD 2.76m understate reality by excluding the AUD 12.6m programme TCO” — D6’s own words, quoted as its historical critique of the original package’s figures; the 12.62m TCO headline failed reconciliation against the package’s own table, and the rebuilt financials carry forward neither figure.',
    recommendation:
      'Rebrand as a “Market Entry Research Framework”. Add explicit gate conditions. Commission primary promoter research to validate inventory assumptions.',
    provenance:
      'The “AUD 2.76m” is D6’s attested verbatim, adjudicated VERIFIED at that precision (CL-0409): the audit’s recount confirms it as the sum of the ORIGINAL market pages’ three-year operating-loss rows (AU 1,526,232 + UK 299,250 + USA 493,150 + Canada 203,140 + EU 239,000 = 2,760,772) — rows this audit deleted route-by-route as unsourced (e.g. CL-0273). It is reproduced here only as quoted historical critique of the original package; it carries no provenance tag and is not a live figure of this proposal — the corrected edition publishes no blended five-market aggregate (mandate prohibition; financial_rebuild.md reading guide 6, and /investment: “No blended five-market figure is published”). The AUD 12.62m TCO headline failed reconciliation against its own table (12.091m; T0-002) and is superseded: the rebuilt financials publish no cumulative TCO. The RED rating and the unverified-inputs critique match GT-01…GT-09 exactly (CL-0408, CL-0466).',
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
      'Two sentences of praise removed as fabricated: the AI cost ledger is not “commendably honest” — it inflated the receipted programme actual of AUD 830.00 [ACTUAL] (GT-13) to a 1,384.80–4,992.49 “invoice-ready” total (1.7–6.0x) and priced AUD 60/hr receipted work at 150–250/hr (CL-0467; T0-104/T0-105). The retained sentence is attested by the audit baseline (d6_delta.md F3). The 5m–25m span matches the package’s own Lean/Accelerated scenario inputs (CL-0412; T0-027/T0-028) — quoted as critique; no such range survives in the rebuilt financials, where unpriced ranges wider than ±30% are prohibited. Salary rows are tagged UNVERIFIED on the package’s own staffing table and senior benchmarks remain unpublished behind gated sources (CL-0413; au-salaries pack). The 20% on-cost figure was never validated against state payroll tax (CL-0414).',
  },
];

// Open item rendered inside the D4 card (interview-count contradiction, CL-0410).
export const D4_OPEN_ITEM = {
  ref: 'U-03 / U-04',
  title: 'Interview count unresolved',
  unknown:
    'The original site stated both 15–20 and 10–15 interviews for the same promoter research (this page and the roadmap vs /markets/australia; T0-061, CL-0410). Both figures are removed.',
  owner:
    'Research lead (currently unassigned — leadership team to appoint; unresolved_register.md U-04), with the Commercial lead (U-03) owning counterparty outreach.',
  action:
    'Commission the primary promoter research with a single stated interview target, alongside U-03’s requirement of at least three signed pilot-event agreements or dated LOIs with named promoters/venues.',
};

export const OVERALL_ASSESSMENT =
  'It is a research framework built almost entirely on public evidence about an entity whose corporate status, financial history, event portfolio, customer base and data assets remain unverified. No responsible board should approve capital beyond a tightly capped discovery phase on the basis of this package alone. It should be treated as a structured hypothesis to be tested through verification, not as an investment memorandum.';

export const OVERALL_ASSESSMENT_PROVENANCE =
  'Reproduced from the attested D6 overall assessment (d6_delta.md F2; CL-0415), consistent with GT-01…GT-09 and with D6’s actual verdict, “withhold”. The original opening sentence — praising the package’s “intellectual honesty” and claiming it “refuses to fabricate diaspora-level demand figures” — is removed as fabricated: the same site branded the India-only 100,000+ downloads a “Verified Demand Foundation” and asserted “48 contracted events” (CL-0416; GT-06, GT-10).';

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
  'All ten gaps retained as honest admissions; every one remains open today (CL-0464; d6_delta.md S13; GT-07/GT-08/GT-09).';

// Assumption flagged by the review → honest status today (fragment table; CL-0432–CL-0439).
export const UNREALISTIC_ASSUMPTIONS = [
  { assumption: 'Event inventory is contractable', status: 'No named, signed promoter or venue supply exists; zero LOIs (GT-06). See unresolved_register.md U-03' },
  { assumption: 'Take rate of 8–12%', status: 'True value [UNKNOWN] — no verified take rate; no primary study (U-04)' },
  { assumption: 'CAC of AUD 6–10', status: 'True value [UNKNOWN] — never verified against first-party data (U-04)' },
  { assumption: 'Repeat purchase rate of 15–30%', status: 'True value [UNKNOWN] — never verified against first-party data (U-04)' },
  { assumption: 'Average ticket value of AUD 65–80', status: 'True value [UNKNOWN] — unverified; the package’s own models drifted from it (T0-020)' },
  { assumption: 'AWS as optimal cloud platform', status: 'A default, not a justified selection — the review’s own D2 weakness concedes this' },
  { assumption: 'Market entry Year 2', status: 'Phasing assumption, unvalidated' },
  { assumption: '20% employment on-costs', status: 'True value [UNKNOWN] — never validated against state payroll tax' },
];

export const ASSUMPTIONS_OPEN_ITEM = {
  ref: 'U-04 / GT-07',
  title: 'Every demand-side parameter is unknown for the actual target audience',
  unknown:
    'Take rate, CAC, repeat rate and average ticket value are all unknown for the actual target audience: no primary diaspora demand, fee-tolerance or platform-trust study exists.',
  owner: 'Research lead (currently unassigned — leadership team to appoint).',
  action:
    'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust). Source: unresolved_register.md U-04 (GT-07); inventory is U-03.',
};

export const ASSUMPTIONS_PROVENANCE =
  'All eight rows retained as accurate flags of unvalidated package assumptions (CL-0432–CL-0439; the investment page’s own data-confidence note concedes none is verified). “Event inventory is contractable” was contradicted on the original site by a “48 contracted events” claim; the contradiction is resolved by GT-06 — no contracted inventory exists, and the contradicting claim is removed site-wide (CL-0432).';

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
  'All twelve gaps remain open; no legal or compliance opinion is on file for any of them (CL-0430; d6_delta.md S10; GT-08).';

// 9 of the original 10 rows survive — one removed as fabricated (CL-0444).
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
  'Row-by-row corroboration: Similarweb sells modelled digital-intelligence estimates, not audited traffic (CL-0440, web-intel pack). The downloads caveat is accurate — the 100,000+ Google Play downloads attach to the India-only product (GT-10); the original site contradicted its own safeguard with a “Verified Demand Foundation” banner, since removed site-wide (CL-0441, resolved). The ABS caveat is confirmed first-hand: 2021-22 release (abs.gov.au) — 64% attendance, COVID-affected collection window — versus the pre-pandemic 2017-18 release — 82.4% (CL-0442). UN DESA classifies migrant stock by origin country only, with no language dimension (CL-0445, un.org dataset). The Canada gap is real — the package even recorded “none found” where Statistics Canada table 21-10-0186-01 exists (CL-0447). The AI-ledger safeguard is correct: the only receipted programme spend is AUD 830.00 [ACTUAL] (GT-13; CL-0448). Salary and BookMyShow rows: CL-0443, CL-0446. One row removed as fabricated: “Commercial provider pricing based on public rate cards” — the shipped catalogue prices do not derive from any public rate card (CL-0444; T0-089).';

// Critical-findings tallies (fragment stat block).
export const FINDINGS_STATS = [
  { label: 'Missing elements', value: '10', note: 'All retained (CL-0428)' },
  { label: 'Unrealistic assumptions', value: '8', note: 'All retained (CL-0429)' },
  { label: 'Regulatory gaps', value: '12', note: 'All retained (CL-0430)' },
  { label: 'Data-quality issues', value: '9', note: 'One of the original 10 rows removed as fabricated (CL-0444)' },
];

export const CONFIDENCE = {
  overall: 58,
  verdict: 'withhold',
  note: 'D6’s actual overall confidence and verdict, restored from the Ground-Truth Register D6 row. A reviewer judgement about the reliability of the research package’s direction, not a statistical measure.',
  dimensions: [
    { dim: 'Cost estimates accuracy', value: 55, why: 'Ranges too wide for procurement; order-of-magnitude planning only' },
    { dim: 'Financial projections reliability', value: 45, why: 'Almost entirely assumption-driven; break-even analysis more informative than forecasts' },
    { dim: 'International expansion readiness', value: 30, why: 'No contractable specificity in any international market; research-stage only' },
  ],
  dimensionsProvenance:
    'Only these three rows are attested as retained D6 content (d6_delta.md F6; CL-0425–CL-0427). Four favourable rows — 90% (recommendation direction), 75% (catalogue utility), 70% (architecture suitability), 65% (market opportunity) — are removed as unsupported: the corpus is unavailable (U-01), the page’s D6 rendition is proven altered, and no source attests them (CL-0421–CL-0424). The overall figure these rows fed was 58%, verdict “withhold” — restored above.',
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
    'Retained as honest process content (CL-0418–CL-0420): none of the increase-side documents exists today (GT-06, GT-07, GT-08 — no LOIs, no primary study, no quotes or statements on file), and the decrease-side items are explicitly hypothetical falsification thresholds, not statements about actual counts.',
};

// Quality Assurance — 7 of the original 15 gate rows survive adjudication.
export const QUALITY_GATES_INTRO =
  'Seven of the original fifteen gate rows survive adjudication. Gate certifications are self-assessed by the package (producer = verdict-assigner, which the programme prohibits for verdicts); only rows carrying an audit cross-check below were independently recounted.';

export const QUALITY_GATES: { id: string; condition: string; status: 'PASS' | 'PARTIAL'; selfAssessed?: boolean; crossCheck: string }[] = [
  { id: 'QG-03', condition: 'All data provider URLs verified at time of research', status: 'PARTIAL', crossCheck: '15 of 60 URLs unverified in providers.json (CL-0453)' },
  { id: 'QG-07', condition: 'AB Entertainment Design System present in all deliverable headers', status: 'PASS', selfAssessed: true, crossCheck: 'Not adjudicated — deliverable corpus unavailable (U-01)' },
  { id: 'QG-08', condition: 'Australian English (en_AU) used throughout', status: 'PASS', selfAssessed: true, crossCheck: 'Not adjudicated — deliverable corpus unavailable (U-01)' },
  { id: 'QG-09', condition: 'All 5 target markets individually addressed', status: 'PASS', crossCheck: 'Five dedicated market routes confirmed (CL-0457; T0-050)' },
  { id: 'QG-10', condition: 'Risk analysis covers all 10 risk categories', status: 'PASS', crossCheck: 'Ten categories recomputed clean (CL-0458; T0-140…T0-149)' },
  { id: 'QG-11', condition: 'Data architecture covers all 10 technology layers', status: 'PASS', crossCheck: 'Ten layers recounted directly (CL-0459)' },
  { id: 'QG-12', condition: 'HR costs sourced from 2+ verified AU sources', status: 'PARTIAL', crossCheck: 'UNVERIFIED salary tags and gated sources corroborated (CL-0460)' },
];

export const QG15_RESTRUCTURED =
  'QG-15, restructured (category error). The original gate certified the AI cost ledger as an “invoice-ready document — PASS”. An invoice records actual amounts payable; the ledger’s own footnote calls it “an estimated cost framework… not a verified expenditure record”, and this page’s own Data Quality row calls it unauditable. Formatting an estimate as an invoice is not a quality achievement. The only receipted programme spend is AUD 830.00 [ACTUAL] — GT-11 AUD 350.00 [ACTUAL] AI subscriptions and API credits plus GT-12 AUD 480.00 [ACTUAL] consultation at 8.0 hours × AUD 60.00/hr (CL-0463; GT-13).';

export const QUALITY_GATES_PROVENANCE =
  'Seven gate rows removed: QG-04, QG-05 and QG-06 as fabricated PASS certifications — costs contradicted by their claimed sources; hallucinated statistics in evidence; and self-approval of the adversarial review by the artefact under review, on the very page that altered D6’s result (CL-0454/CL-0455/CL-0456). QG-02 removed as internally inconsistent — the universal-citation certification is refuted by the same site (CL-0452). QG-01, QG-13 and QG-14 removed as unsupported — the deliverable corpus is unavailable, so “complete”, “5 slides” and “5 specs” trace to no source (U-01; CL-0451/CL-0461/CL-0462). The original footer’s tally — “13 of 15 gates passed”, with QG-03 and QG-12 PARTIAL and disclosed — was an accurate count of the original table and is recorded here as history only (CL-0450, verified as a description of that table, not an endorsement of its passes).';

// ————————————————————————————————————————————————————————————————
// /recommendations — corrected per register_by_route/recommendations.json.
// ————————————————————————————————————————————————————————————————

export const RECS_LEDE =
  'A staged, evidence-led programme: capital is released in capped tranches, each tranche gated on the preceding phase’s deliverable. Costs are shown only where a receipted actual, a vendor-published price or a tagged derivation from those exists — the same per-gate figures the Vision and Investment pages carry; professional and delivery fees are withheld until a written quote exists, and the page says so wherever that is the case.';

export const RECS_AUDIT_NOTE = '6 claims removed from this page by the adversarial audit — see register.';

export const EXECUTION_INTRO =
  'Three sequential commitments, priced per the Financial Rebuild’s decision schedule (gates G0/G1/G2) — identical to the figures on the Vision and Investment & Returns pages. Professional and delivery fees remain withheld until a written quote exists (mandate: no proxying of professional fees from day rates); the priced components below are receipted actuals, vendor-published prices, or derivations from them. Timeframes below are internal planning windows, not sourced estimates.';

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
        'Two conflicting figures (AUD 35,000–80,000 and AUD 70,000–140,000) previously appeared on this page for the same scope; neither has a supporting quote, and the audit mandate prohibits proxying legal fees from consultant day rates.',
      owner: 'CEO / company secretary.',
      action:
        'Request written quotes from a law firm (AU entity, IP, domain, source-code and merchant-account due diligence), PSP, insurance broker and QSA. Source: unresolved register U-05/U-06.',
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
        'Two conflicting interview counts (15–20 at this stage; 10–15 in the gated roadmap below and on the Australia market page) previously appeared for the same programme step with no ledger-recorded correct figure, so no count is stated.',
      owner:
        'Research lead (currently unassigned — LT to appoint) for the primary demand study; CEO / company secretary for supporting professional-services quotes.',
      action:
        'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust) and request written quotes. Source: unresolved register U-04/U-05.',
    },
  },
  {
    order: 'THIRD',
    title: 'Launch the Proof-of-Value Platform',
    timeline: '12 weeks',
    timelineNote: 'Begins once the discovery stage’s gate is passed',
    detail:
      'With economics and inventory confirmed: a minimum viable data platform (3 certified dashboards, reconciled finance mart, basic consent management) and a 3–5 event Australian pilot. The pilot volume is a gate deliverable to be unlocked, not evidenced supply: GT-06 records zero named, signed promoter or venue counterparties, and the Australia market page deletes the same “3–5” figure where it appeared as a phase-plan input. G2 cannot be entered until U-03 delivers at least three signed pilot-event agreements or dated LOIs, and the volume actually pursued is whatever U-03 returns. Priced components (gate G2, one-off — the same schedule the Vision and Investment pages carry): floor configuration A$5,860.00 [DERIVED] (data floor A$2,500.00 [LIST] + setup 7.0 days A$3,360.00 [DERIVED]) = 7.06× the anchor, or full configuration A$9,876.74 [DERIVED] (data full A$6,036.74 + setup 8.0 days A$3,840.00) = 11.90× — alternatives, not a range; the setup-labour share holds only under the unconfirmed consultant-rate and day-count [ASSUMPTION]s. Run rate, monthly-cancellable and not part of the authorised gate cost: 0.090× the anchor per month [DERIVED]. The IBISWorld line uses AUD $2,500 — the live AU checkout cart price, accessed 2026-08-23. The vendor’s help centre publishes AU$2,200 [LIST] for the same single report, which is also the mandate’s ground-truth baseline (GT D5-[15], graded VERIFIED with caveat in verify/ibisworld-reaudit.md). Both are the vendor’s own published prices; the transactional cart price is the one used for planning (financial_rebuild.md §A.1.2 P1). At the A$2,200 baseline the same gate reads: floor A$5,560.00 [DERIVED]: 2,200 + 3,360 = 6.70× the anchor, and full A$9,576.74 [DERIVED]: 2,200 + 3,342.20 + 194.54 + 3,840 = 11.54×; the data-floor line is 2.65× [DERIVED]: 2,200 ÷ 830. Statista Starter (A$3,342.20 [DERIVED] inside the full configuration) is priced from the vendor’s own published tier, US$199/mo billed annually [LIST]. A second Statista figure is carried beside it, for a different tier: the mandate’s ground-truth register records A$922/yr [LIST] for Statista Personal (GT D5-[16]), and the vendor’s published page shows that same tier at US$649/mo billed annually [LIST]. Both are carried as they stand and neither is graded here — the register is the operative baseline, its D5 source line sits in the corpus that is not on this machine, and reconciling the two is an open item under U-01, owned by the programme sponsor (unresolved_register.md). No gate figure on this site prices the Personal tier, so no gate total turns on that reconciliation. (Closure pass, F-03: this passage previously graded GT D5-[16] itself — “deliberately NOT carried … unverifiable against its primary source”. No live page adjudicates a ground-truth entry.)',
    openItem: {
      ref: 'G1 exit',
      title: 'Cost of the MVP product engineering beyond the data stack',
      unknown:
        'That scope does not exist until the discovery-phase gate (G1) defines it; publishing a delivery figure now would price an unscoped build, so it stands as [UNKNOWN] — distinct from the priced data and setup components above, which are vendor-published or derived from receipted rates.',
      owner: 'Leadership team, at G1 exit.',
      action:
        'Define build scope after G1 passes, then request written delivery quotes (U-05 discipline). Source: financial rebuild §D.1.4 (G2 row) and §E.4 Gate G2.',
    },
  },
];

export const EXECUTION_PROVENANCE =
  'Gate figures: financial_rebuild.md §E.4 (G0/G1/G2), §A.3, §C.2–C.3, §D.1.4, §D.2.5 — identical to the per-gate schedule on the Vision and Investment & Returns pages. Rate per GT-12 (receipted); IBISWorld cart, Statista, Semrush and Apollo prices per the vendor pages cited there (all accessed 2026-08-23).';

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
  'Why these bands, and why this is no longer a 90-day plan. Each stage above begins only when the previous stage’s gate is passed, so the durations in the execution sequence run end to end, not in parallel: 30 days to G0, then 60 days to G1, then 12 weeks (84 days) to G2 — earliest completion day 174. An earlier version of this page printed the same three stages as days 1–30, 31–60 and 61–90 under a “90-Day Roadmap” heading, which is arithmetically impossible against its own gating language: it compressed a 60-day stage into 30 days and an 84-day stage into 30. The day bands are restated here to the sequence the gates actually produce, and the heading with them. This is the same treatment the interview count receives below — where a page printed two conflicting figures for one step, the conflict is resolved on the record rather than left standing. The restated bands reconcile with the Australia market page’s phase plan: Phase 0 — Verify at Months 0–3 covers M1 and M2 (days 1–90), and Phase 1 — Pilot at Months 4–6 covers M3 (days 91–174). Planning windows, not vendor commitments or sourced estimates.';

export const ROADMAP_NOTE = 'Interview count for M2 is withheld — see the open item under Second, above.';

export const CEO_ACTIONS = [
  { n: 1, action: 'Authorise legal and commercial due diligence (cost pending written quotes — see the open item under First, above)', decision: 'Immediate: appoint legal counsel and set a 30-day deadline' },
  { n: 2, action: 'Appoint a Data/Technology Lead (contract or fractional) to conduct discovery', decision: 'Within 14 days: identify a candidate and define scope' },
  { n: 3, action: 'Set a staged investment gate — further capital released as the due-diligence & terms gate (G0) and the discovery gate (G1) are passed', decision: 'Board resolution: expenditure follows evidence through gated release' },
];

export const CLOSING_STATEMENT =
  'Capital is released in gated stages: due diligence proceeds first, with further investment following once the due-diligence & terms gate (G0) and the discovery gate (G1) — the primary demand study and signed pilot counterparties — are passed. Evidence leads, expenditure follows.';

export const CLOSING_PROVENANCE =
  'Gate definitions (G0 due diligence & terms, G1 discovery, G2 MVP build) per financial rebuild §Gate vocabulary.';

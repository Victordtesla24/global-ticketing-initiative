// DELIVERABLE 3 — insights, map callouts, marketing data plan, strategic options.
// Corrected per the adversarial audit (workflow/register_by_route/data-ecosystem.json and
// market-opportunity.json; artifacts/site_change_specification.md). The estimate tag is
// abolished; every surviving figure carries [ACTUAL]/[LIST]/[QUOTE]/[DERIVED]/[ASSUMPTION]/
// [UNKNOWN]. The six unsupported insight-value quantifications (settlement-recovery share of
// GTV, campaign-conversion uplift, avoided market-entry spend, take-rate sensitivity figure,
// sell-through uplift and the consented-audience growth path) are removed: each is now either
// the corrected statement from the audit's rebuilt page or an open item with a named owner.

// "What the data buys" — only what honestly survives (CL-0168 VERIFIED; CL-0129/CL-0130
// audited-filing benchmarks). The original page's quantified value chart and four of its six
// benefit quantifications were deleted: each carried the abolished estimate tag and a basis
// line that named no identifiable source (CL-0163–CL-0166, CL-0169); the take-rate tile was
// deleted because the programme carried two contradictory base-GTV values for one metric
// (CL-0167, INTERNALLY-INCONSISTENT).
export const INSIGHTS_KEPT = [
  {
    n: 1,
    category: 'Regulatory Compliance — kept',
    insight: 'FTC all-in pricing rule compliance prevents enforcement action',
    impact: 'The FTC Rule on Unfair or Deceptive Fees, effective 12 May 2025, applies to live-event ticketing; compliance prevents enforcement action under the rule, and the regulatory materials are free. The cost of complying is a legal-advice question — unquoted (U-05).',
    basis: 'ftc.gov — rule effective 12 May 2025 (verified first-hand 2026-08-23); adjudicated VERIFIED (CL-0168)',
  },
  {
    n: 2,
    category: 'Competitive Benchmarking — kept, qualitative only',
    insight: 'Audited take-rate benchmarks, free',
    impact: "Live Nation's FY2025 10-K reports 346 million fee-bearing tickets on US$37.1 billion of fee-bearing GTV — provenance label: Audited filing, the labelled exception declared in this page's tag rule above — a sanity bound on per-ticket fee economics at gate G1. Benchmark use only: audited filings may never serve as cost comparators for an A$830 entity, and no revenue figure for this programme may be derived from them.",
    basis: 'Live Nation 10-K FY2025, SEC EDGAR (verify/us-stats.md)',
  },
];

// Open items replacing the deleted benefit quantifications — bordered callouts with owners.
export const INSIGHT_OPEN_ITEMS = [
  {
    ref: 'U-04',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04, BLOCKING)',
    unknown: 'No primary study of the actual target audience exists, so every campaign-conversion, segmentation-uplift and sell-through benefit previously claimed here is unevidenced.',
    owner: 'Research lead (role currently unassigned — LT to appoint)',
    action: 'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief (GT-08).',
  },
  {
    ref: 'U-07',
    title: 'Payment reconciliation and segmentation on first-party data (U-07, BLOCKING)',
    unknown: "Order-to-payment reconciliation and consent-based segmentation were claimed as benefits, but the first-party database's schema, ownership, consent state and export rights have never been inspected — no recovery or uplift rate can be stated, and no benchmark for either is on file.",
    owner: 'Ticketalay principal',
    action: 'Complete the U-07 disclosure (database dictionary, consent-register sample, app-console exports under NDA); reconciliation and segmentation value can only be measured, not estimated, after it.',
  },
];

// Open item for the catalogue itself (site_change_specification.md, /data-ecosystem ADD #1).
export const FIRST_PARTY_OPEN_ITEM = {
  ref: 'U-07',
  title: 'Ticketalay first-party data (U-07, BLOCKING)',
  unknown: 'Schema, ownership, consent state and export rights of the first-party database — the stated "non-negotiable foundation" of this entire data programme — have never been inspected.',
  owner: 'Ticketalay principal',
  action: 'Provide the database dictionary, a consent-register sample and app-console exports under NDA. Cost to obtain: nil — internal disclosure.',
};

// Key market indicators. Corrected per the audit: the England arts-engagement figure is the
// DCMS survey's own 90.6% (its published headline rounds to 91%), the UK spend figure is
// re-attributed from DCMS to LIVE, and the global migrant-stock tile (304 million, all
// origins) is replaced by the India-born per-market denominators — UN DESA blocks
// total-migrant-stock framing as a market indicator (financial_rebuild.md §A.1.1 F5).
export const MAP_CALLOUTS = [
  { title: 'Australian Demand', body: '64% of Australian adults attended at least one cultural venue or event in 2021–22, with 82.4% in 2017–18 as the pre-pandemic benchmark. Greater-capital-city residents attended at 65% against 61% elsewhere — a modest four-point gap, not the concentration effect originally claimed.', source: 'ABS, Cultural and creative activities 2021–22' },
  { title: 'UK Live Entertainment Scale', body: 'UK consumer spending on live music reached GBP 6.68 billion in 2024, up 9.5% year-on-year — a Trade-body estimate: LIVE (the trade federation) Annual Report & Economic Highlights 2024, not a government statistic as originally cited, and not [LIST] under the trust ladder, which reserves that tag for a vendor-published price. At the RBA rate of 1.9106 the AUD equivalent is approximately 12.8 billion [DERIVED], the conversion inheriting the trade-body tier of the figure it converts. This is whole-market consumer spend, market context only: it is not a TAM for this programme, and no market page on this site publishes one. 90.6% of adults in England engaged with the arts in 2024/25 — a broad measure including digital engagement, down from 91.4% in 2023/24.', source: 'LIVE Annual Report 2024 (trade body) / DCMS Participation Survey 2024/25' },
  { title: 'India-Born Stock by Market, 2024', body: 'AU 876,074 · UK 1,044,779 · US 3,165,238 · CA 1,015,630 · Europe region 2,021,502 — the comparable cross-market denominators, on one consistent basis. The Europe-region count is the proxy for the “EU” market: it includes the UK and non-EU states, and no EU-27 aggregate has been extracted. Total migrant stock of every origin (304 million globally) is not the addressable segment; even these counts only bound it, because country-of-birth carries no language or demand dimension — the AU Marathi-at-home count is 22,263. These are the comparable denominators, not per-country ceilings: on Australia’s own national measure the ABS counts 971,020 India-born residents (Estimated Resident Population, 30 June 2025 — the largest overseas-born group on record), 94,946 above UN DESA’s mid-2024 estimate of 876,074. Canada is the same case in the other direction: Statistics Canada’s 2021 Census counts 898,045 India-born immigrants (permanent residents, 25% sample, reference date 11 May 2021), 117,585 below UN DESA’s mid-2024 estimate of 1,015,630 above, and it is the 898,045 figure this proposal publishes lower on this page and on the Canada market page. Different collector, different measure, different reference date in both cases; both figures in each pair are verified and neither replaces the other.', source: 'UN DESA, International Migrant Stock 2024 (destination × origin)' },
];

// What data was asked for, what is required, how to acquire it, and the marketing/business
// outcome it drives — corrected per the audit: every priced figure below has been checked
// against the vendor's own published pricing page; every outcome figure has been checked
// against the underlying evidence (site/routes/market-opportunity.html, corrected edition).
export const MARKETING_DATA_PLAN = [
  {
    pillar: 'Audience & Demographic Data',
    required: 'Census ancestry and language tabulations, migration statistics and cultural participation rates for each target market and city',
    acquire: 'US Census Bureau and Eurostat APIs A$0 [LIST] (free access, no spend incurred — [ACTUAL] is reserved for the receipted A$350.00/A$480.00/A$830.00 figures, GT-11/12/13). ABS custom-tabulation and UK ONS custom-data pricing could not be verified from any source on file and has been removed.',
    outcome: 'Precise geo-targeted campaign planning by city and suburb (qualitative; not costed). The original estimate that this avoids AUD 500,000–2,000,000 in misdirected market-entry spend had no study or source and has been removed.',
  },
  {
    pillar: 'First-Party Transaction & Consent Data',
    required: 'Order-to-payment reconciliation, CRM records, marketing consent register and repeat-purchase history from the existing platform',
    acquire: 'OPEN ITEM — first-party data readiness (U-07): whether Ticketalay\'s transaction, CRM and consent data can be accessed at all — and at what quality, size and consent status — is unknown. Owner: Ticketalay principal. Action: provide a database dictionary, consent-register sample and app-console exports under NDA.',
    outcome: 'The original claims — a consented audience grown from 5,000 to 40,000, segmented campaigns lifting conversion 15–25%, reconciliation recovering 1–3% of GTV — had no source and have been removed. Reconciliation and segmentation value can only be measured after the U-07 disclosure, not estimated.',
  },
  {
    pillar: 'Competitive & Channel Intelligence',
    required: 'Competitor web traffic, app engagement, keyword pricing and take-rate benchmarks across the five markets',
    acquire: 'The original page named a Similarweb “Pro” plan and a Semrush “Business” plan with specific AUD prices — neither plan exists on either vendor\'s current price list. The corrected figures, each tagged at the level the vendor actually publishes: Similarweb self-serve tiers, USD 129–649/mo [LIST] (= USD 1,548–7,788/yr [DERIVED]: monthly rate × 12); Semrush, USD 117.33–455.67/mo billed annually [LIST] (= USD ~1,408–5,468/yr [DERIVED]: annual per-month rate × 12). Neither vendor publishes an annual band — the yearly figures are this audit\'s own annualisation and are tagged [DERIVED] on every route that carries them.',
    outcome: 'OPEN ITEM — revenue sensitivity to take-rate or channel-pricing improvements cannot be computed (U-04): the original claim that each 1% take-rate improvement adds AUD 64,800 of Year-3 revenue conflicted with a second, different Year-3 GTV used elsewhere on this proposal, and both depend on a platform take rate the rebuilt financials mark [UNKNOWN] — no primary study of fee tolerance exists. Owner: Research lead (currently unassigned).',
  },
  {
    pillar: 'Geospatial & Venue Data',
    required: 'Geocoded venue locations, audience proximity and catchment analysis for event placement and local media buying',
    acquire: 'Google Maps geocoding at 100,000 calls/yr: USD 0–450/yr [LIST] — within Google\'s free monthly cap, which the original page\'s AUD 775 floor ignored. OpenCage: the X-Small tier at USD 50/mo [LIST] (= USD 600/yr [DERIVED]: 50 × 12) is sufficient for this workload — the “Medium” tier the original page priced at AUD 930–2,800 is actually USD 500/mo [LIST] (= USD 6,000/yr [DERIVED]: 500 × 12) and is oversized for it.',
    outcome: 'Localised campaign targeting around venues, once venues are under contract — none are contracted at time of writing. The original claim of a 10–20% improvement in sell-through for optimally placed events had no study or source and has been removed.',
  },
  {
    pillar: 'Partner & B2B Enrichment Data',
    required: 'Verified contact and firmographic data for promoters, producers, venues and cultural associations',
    acquire: 'Apollo.io Professional: USD 948/yr [LIST] ≈ A$1,326.80 [DERIVED] (948 ÷ 0.7145, RBA rate 21 Aug 2026) — no published Apollo plan reaches the AUD 3,600 the original page stated, and none does even under the site\'s retired 1.55 FX assumption, at which USD 948 converts only to ≈ AUD 1,470. People Data Labs Pro: USD 940/yr annual [LIST] — PDL publishes no paid “pilot” tier of the kind the original page priced at AUD 1,550–4,650.',
    outcome: 'OPEN ITEM — zero promoters, producers or venues are named or signed at time of writing (U-03): the original claim of a qualified pipeline of organiser targets and venues named no counterparty and has been removed. Owner: Commercial lead (currently unassigned — LT to appoint). Action: secure a minimum of three signed pilot-event agreements or dated LOIs.',
  },
  {
    pillar: 'Regulatory & Compliance Data',
    required: 'All-in pricing rules, privacy and consent obligations, and tax treatment for each jurisdiction in which campaigns run',
    acquire: 'Free regulator and government sources initially. Avalara\'s Tax Calculation and Returns Compliance Package is priced from USD 699 (billing period not stated on the vendor\'s page) [LIST]; the full compliance suite is quote-only [UNKNOWN]. The original page\'s “starter tier AUD 7,750–15,500/yr” appears on no Avalara page and contradicted a different Avalara figure quoted elsewhere in this proposal — both have been resolved to the vendor\'s own published price.',
    outcome: 'Compliance posture in each jurisdiction has not yet been assessed by counsel; the original claim of being "compliant in five jurisdictions from day one" was an unearned certainty claim and has been removed. The one confirmed regulatory fact: the FTC\'s all-in pricing rule took effect 12 May 2025.',
  },
];

// Strategic options assessed against the risk register, with a single recommendation.
// Corrected per CL-0083–CL-0090: the unsourced lump-sum figures and their derivatives are
// removed; Option B carries the gated schedule from the rebuilt financials (financial_rebuild.md
// §E.4), where every dollar is either priced or explicitly [UNKNOWN] and no cumulative total
// is published.
export const STRATEGIC_OPTIONS = [
  {
    key: 'A',
    name: 'Accelerated Multi-Market Launch',
    investment: 'Figure removed — the original three-year lump sum had no cost build-up or source anywhere in the evidence (≈30,000× the receipted programme spend of AUD 830 [ACTUAL], GT-13)',
    detail: 'Simultaneous entry into all five markets with a larger team, premium data contracts and higher event operations.',
    assessment: 'Fastest route to scale on paper, but the lump-sum figure and its tickets-to-recover-cost companion were computed from an unsourced input and have been removed; multiplies entity, compliance and acquisition-cost risks across five jurisdictions at once.',
    recommended: false,
  },
  {
    key: 'B',
    name: 'Staged, Data-Led Expansion — Australia First',
    investment: 'Gated stages, each priced or explicitly [UNKNOWN] — no cumulative total is published: G0 A$1,920.00 [DERIVED] (4.0 analyst-days [ASSUMPTION]); G1 A$2,880.00 [DERIVED] (6.0 analyst-days [ASSUMPTION]) + study and legal fees [UNKNOWN]; G2 A$5,860.00 or A$9,876.74 [DERIVED], whose setup-labour share (7.0 and 8.0 analyst-days) holds only under the unconfirmed consultant rate and day count [ASSUMPTION]. Every analyst-labour line on this schedule is conditional; none is a committed price.',
    detail: 'Prove the Australian market with contracted inventory and the marketing data programme, then extend through partner-led corridors to the UK, US, Canada and the EU as gates are passed.',
    assessment: 'Aligns capital with evidence: each stage is funded only when the prior gate — due diligence & terms (G0), discovery (G1), MVP build (G2) — is passed. The original claim that this option "contains the top five register risks" had no demonstrated mapping to the risk register and has been removed. ROI is not computable at any gate until partnership terms (U-02), contracted supply (U-03) and the primary demand study (U-04) exist.',
    recommended: true,
  },
  {
    key: 'C',
    name: 'Defer International Investment',
    investment: 'No new capital committed',
    detail: 'Maintain the existing India-focused operation and revisit expansion at a later date.',
    assessment: 'Eliminates near-term capital risk. The original claim that deferral forfeits first-mover position while named competitors expand into culturally specific programming had no source located in any verification pack and has been removed.',
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

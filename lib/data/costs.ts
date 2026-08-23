// Investment & Returns — corrected per the adversarial audit.
// Sources: workflow/register_by_route/investment.json (CL-0234–CL-0369),
// Ground-Truth Register GT-01–GT-13, artifacts/financial_rebuild.md. Run date 2026-08-23.
// The site-wide estimate tag is abolished on this page: every surviving monetary figure
// carries exactly one of [ACTUAL] [LIST] [QUOTE] [DERIVED] [ASSUMPTION] [UNKNOWN].
// FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.

// Receipted actuals — the affordability anchor (GT-11, GT-12, GT-13).
export const ACTUALS = {
  total: {
    label: 'Total programme spend to date',
    value: 'A$830.00 [ACTUAL]',
    note: 'The only demonstrated, receipted capacity in evidence. Every forward figure on this page is expressed as a multiple of this anchor and must justify that multiple.',
  },
  ai: {
    label: 'AI subscriptions and API credits, incurred',
    value: 'A$350.00 [ACTUAL]',
    note: 'Cumulative, receipted. This replaces the deleted AI cost ledger, whose invoice-ready total of A$1,384.80–4,992.49 was 1.7–6.0x the A$830.00 [ACTUAL] total programme spend (GT-13) — not 1.7–6.0x the A$350.00 shown on this tile, which is only its AI component — and carried a fabricated invoice number.',
  },
  consultation: {
    label: 'Consultation & feasibility study, incurred',
    value: 'A$480.00 [ACTUAL]',
    note: '8.0 hours at A$60.00/hr [ACTUAL] — the only labour price in evidence. The deleted "Consulting Rate Basis: AUD 150–250/hr" was 2.5–4.2x the rate actually paid on this programme.',
  },
  ledgerFooterRetained:
    'The deleted ledger’s own footer conceded that no platform invoices, token measurements, cache or search records, labour timesheets or tax figures supported it, and that it was "an estimated cost framework … not a verified expenditure record". That disclosure was accurate and is retained; the ledger it disclaimed is not. The receipted record above is the verified expenditure record.',
};

// Per-gate decision schedule replacing the deleted cumulative TCO (financial_rebuild.md §E.4).
export const GATE_SCHEDULE = [
  {
    gate: 'G0 — due diligence & terms',
    buys:
      'Ownership memorandum (code, brand, app-store accounts, .com.au domain), executed partnership term sheet, all five written professional-services quotes on file',
    priced:
      'Vendor cash: none committed (quote requests are free to lodge). Fractional analyst 4.0 days [ASSUMPTION] at A$60.00/hr [ACTUAL] = A$1,920.00 [DERIVED], conditional on written rate and day-count confirmation by 2026-09-30. Legal and entity fees [UNKNOWN] until the quotes arrive.',
    multiple: '2.31x (analyst line, conditional)',
    committed: 'A$1,920.00 [DERIVED] — 4.0 analyst-days under the unconfirmed rate [ASSUMPTION]',
    mustPass: 'All five quotes received in writing; ownership established; term sheet executed and disclosed',
  },
  {
    gate: 'G1 — discovery',
    buys:
      '≥3 signed, dated pilot-event agreements or LOIs; the primary demand, fee-tolerance and trust study; the evidence that converts every revenue variable from [UNKNOWN] to a fact tag',
    priced:
      'Study fee [UNKNOWN] — not priceable without a brief; brief written and quoted during G0. Per-agreement legal review [UNKNOWN] per the G0 quote. Outreach tooling A$0 [LIST] (Apollo.io free tier). Fractional analyst 6.0 days [ASSUMPTION] = A$2,880.00 [DERIVED], conditional as above.',
    multiple: '3.47x (analyst line, conditional)',
    committed: 'A$2,880.00 [DERIVED] — 6.0 analyst-days, plus study and legal-review fees [UNKNOWN]',
    mustPass: 'G0 passed; ≥3 signed, dated pilot-event agreements; primary demand study delivered with take-rate, ATV and repeat findings',
  },
  {
    gate: 'G2 — MVP build',
    buys:
      'Day-1 data bill of materials; ingest, reconciled finance mart, three certified dashboards, consent register; the day-1 AI stack',
    priced:
      'One-off: floor configuration A$5,860.00 [DERIVED] (data floor A$2,500.00 [LIST] + setup 7.0 days A$3,360.00 [DERIVED], pre-U-07 maximum) or full configuration A$9,876.74 [DERIVED] (data full A$6,036.74 + setup 8.0 days A$3,840.00) — alternatives, not a range; setup labour holds only under the unconfirmed rate and day-count [ASSUMPTION]s. Run rate, monthly-cancellable and not part of the authorised gate cost: tech A$46.43/mo [DERIVED] + AI (Claude Pro, billed monthly) A$27.99/mo [DERIVED].',
    multiple: '7.06x floor / 11.90x full one-off; run rate 0.090x/month',
    committed:
      'Floor configuration A$5,860.00 [DERIVED] or full configuration A$9,876.74 [DERIVED] — alternatives, not a range',
    mustPass: 'G1 passed; first-party data disclosed under NDA; consultant-rate confirmation in writing',
  },
];

export const GATE_SCHEDULE_NOTES = {
  intro:
    'No cumulative programme total is published: a cumulative total would manufacture a budget for a business state that does not exist (the AU domain is parked, there is zero contracted inventory, and the partnership terms are unwritten). Each gate below is a separate board decision; money committed at one gate buys the information for the next, and nothing is committed past the next gate. Committable today in third-party vendor cash: none — the five professional-services quote requests are free to lodge.',
  noG3:
    'There is no G3 on this schedule: a pilot-launch gate can only be drafted from G1’s outputs, and pricing it now would require the very numbers this page records as [UNKNOWN]. The deleted 15-seat team bench (A$2.0–2.8m/yr, whose own envelope failed to sum by A$200,000 against its own rows), the deleted phase cards (A$350K–650K through A$2.8m–5.0m+), the deleted consulting and legal ranges, and the deleted cloud cost bands are out of scope until the gates pass; any post-G2 proposal must be rebuilt line by line from written quotes and published prices, not carried forward from the deleted figures.',
};

// Data acquisition — vendor-published prices replacing the deleted estimates
// (CL-0310 resolved; CL-0311, CL-0315–CL-0319, CL-0321–CL-0325).
export const VENDOR_PRICES = [
  {
    provider: 'IBISWorld — "Musical & Theatre Productions in Australia", single report',
    deleted: '"3,000–8,000" here; "15,500–46,500" on /data-ecosystem — a ~5x internal contradiction',
    published: 'AUD $2,500 live AU checkout cart; AU$2,200 on the vendor’s help centre [LIST] — the cart price is used for planning',
    disposition: 'Recommended G1 buy: A$2,500.00 = 3.01x anchor. The only priced source of AU live-theatre industry structure.',
  },
  {
    provider: 'Statista',
    deleted: '"annual access 7,750–15,500" — matches no published tier (deleted)',
    published: 'Starter US$199/mo billed annually = US$2,388/yr; Personal US$649/mo = US$7,788/yr; Professional quote-only [LIST]',
    disposition:
      'Starter conditionally in the G2 full tranche at A$3,342.20/yr [DERIVED] — purchase order only against a written gap-list of statistics the free sources failed to supply. Aggregator: every figure must be re-cited to its primary source.',
  },
  {
    provider: 'Semrush',
    deleted: '"Business plan 3,100–6,200" — no Business plan exists in the live lineup',
    published: 'SEO US$139 / Starter US$199 / Pro+ US$299 / Advanced US$549 per month [LIST]',
    disposition: 'One month of SEO at the entry decision: A$194.54 [DERIVED] = 0.23x anchor. Web data decays in months — buy fresh, not backfill.',
  },
  {
    provider: 'Similarweb',
    deleted: '"Pro plan 15,500–30,000" — no plan named "Pro" exists',
    published: 'Self-serve US$129–649/mo; Business/Enterprise quote-only [LIST]',
    disposition: 'Deferred — panel data adds nothing to a market with zero AU operations; revisit post-launch.',
  },
  {
    provider: 'Apollo.io',
    deleted: '"Professional 1,800–3,600/yr" — top ~2.4x the published annual price',
    published: 'Professional US$79/seat/mo billed annually = US$948/yr [LIST] = A$1,326.80 [DERIVED]: 948 ÷ 0.7145, the one FX rate used sitewide — the same treatment the Market Opportunity page gives this vendor; Free tier 900 credits/seat/yr at US$0 [LIST]',
    disposition: 'Free tier recommended (A$0 [LIST], the vendor’s published free tier) — 900 credits cover the pilot outreach universe. Step up only when free credits are demonstrably exhausted.',
  },
  {
    provider: 'People Data Labs',
    deleted: '"(trial) 1,550–4,650" — no paid trial band exists at any price',
    published: 'Free tier US$0/mo (100 records); Pro US$98/mo (US$940/yr annual); then custom [LIST]',
    disposition: 'Deferred — Apollo Free covers the outreach need.',
  },
  {
    provider: 'OpenCage',
    deleted: '"Medium plan 930–2,800" — Medium is US$500/mo; the claimed range matches no Medium price',
    published: 'Medium US$6,000/yr; X-Small US$50/mo = US$600/yr [LIST]',
    disposition: 'Not required — Google’s free cap covers pilot geocoding volume.',
  },
  {
    provider: 'Google Maps Platform (Geocoding)',
    deleted: '"775–3,100 for 100k–400k calls" — the floor exceeded even the single-month worst case and ignored the free cap',
    published:
      '10,000 requests/month free, then US$5.00/1,000: 100k calls/yr costs US$0 spread evenly, at most ~US$450 in a single-month worst case [LIST]',
    disposition: 'A$0 [LIST] at pilot volume, under the ≤10,000 requests/month volume [ASSUMPTION] (confirmer: programme sponsor, against the first month’s metered billing).',
  },
  {
    provider: 'Avalara',
    deleted: '"starter tier 7,750–15,500" — no starter tier exists; contradicted the site’s own catalogue entry',
    published: '"Pricing starts at $699" (billing period unstated); suite quote-only [LIST]',
    disposition: 'Deferred — overweight for a pre-revenue single-market pilot; a written quote (U-05 discipline) before any commitment.',
  },
  {
    provider: 'US Census Bureau API',
    deleted: 'Free with registration — retained',
    published: 'A$0 [LIST] — free access demonstrated first-hand (ACS pull, free registration key)',
    disposition: 'Kept (adjudicated VERIFIED).',
  },
  {
    provider: 'Eurostat API',
    deleted: 'Free — retained',
    published: 'A$0 [LIST] — free access demonstrated first-hand (public dissemination API)',
    disposition: 'Kept (adjudicated VERIFIED).',
  },
  {
    provider: 'US BLS / BEA APIs',
    deleted: 'Free — retained',
    published:
      'A$0 [LIST] — free by statute; the official portals are the only distribution channel (BEA responds 200 to this audit’s probe, BLS bot-blocks it on an otherwise public page)',
    disposition:
      'Kept (re-adjudicated VERIFIED on the fresh pass — this row had been deleted while the two rows above it, and the same BLS/BEA claim in the catalogue, were kept; see the amendment note in the deletion register).',
  },
];

export const VENDOR_PRICES_NOTE =
  'The deleted tab’s subtotal rows (one-time A$10,750–27,000; subscriptions A$29,080–58,100; usage APIs A$2,325–7,750) summed correctly from their own rows, but a correct sum of unsourced, misattributed and overstated components is still unsupported — all three totals are deleted. The rebuilt day-1 data spend is A$6,036.74 [DERIVED] full / A$2,500.00 [LIST] floor, per the G2 line above. The BLS/BEA free-access row, deleted on the first pass, was restored on the fresh pass under the free-status rule recorded in the deletion register (F-P3-03): a non-monetary free/public-access status claim about an official government or intergovernmental statistical source is verified on a live official URL — or a bot-block on an otherwise public page — plus that source’s statutory free-access basis. Every priced claim still requires a vendor-published price on file, and a priced band containing a zero remains a priced claim.';

// People — what a salary claim survives on (CL-0275/CL-0277/CL-0285 replaced; the rest deleted).
export const PEOPLE_CORRECTIONS = [
  {
    item: 'Data Analyst, base salary',
    deleted: 'AUD 100,000–130,000/yr',
    corrected:
      'Aggregator benchmark — AUD 95,000–115,000/yr (SEEK, employer-disclosed job-ad salaries; not [LIST] under the trust ladder — see the tag rule above)',
    standing:
      'Context only, feeds no funded figure; no fact-tagged salary figure is publishable for this role. The deleted band’s top exceeded every SEEK industry average.',
  },
  {
    item: 'Demonstrated labour rate',
    deleted: '"Consulting Rate Basis: AUD 150–250/hr" (deleted — fabricated against the receipted rate)',
    corrected: 'A$60.00/hr [ACTUAL] (A$480.00/day [DERIVED] at 8.0 h)',
    standing:
      'The only labour price in evidence; carrying it forward is an [ASSUMPTION] confirmed in writing by the CEO and the incumbent consultant by 2026-09-30.',
  },
  {
    item: 'Day-1 headcount',
    deleted: '15-seat bench, A$2.0–2.8m/yr (deleted)',
    corrected: '0.0 FTE permanent; one fractional analyst line per gate (4.0 days at G0, 6.0 days at G1, per the schedule above)',
    standing: 'Commercial lead and Research lead are named but unassigned — appointments, not numbers.',
  },
];

export const PEOPLE_INTRO =
  'The deleted staffing table carried twelve role bands; not one was supported by a published Australian source at the claimed level. The bands the audit could check against a published page are corrected below; every other role (fractional CDO, Data Engineering Lead, Senior Data Engineer, Data Architect, BI Developer, Marketing Data Analyst, Data Governance Analyst, Cloud/DevOps Engineer, Privacy Consultant, Project Manager, UX/UI Designer) has no published AU band for the exact title and is [UNKNOWN] — not proxied. Rates enter only via the U-05 written-quote round.';

// What this page no longer claims (deletion summary, verbatim from the corrected edition).
export const REMOVED_SUMMARY = {
  para1:
    'Deleted, not softened: the Base three-year TCO, which this page stated two irreconcilable ways (a A$12.62M headline against its own table’s A$12.09m cumulative — a A$529,000 unexplained gap); the Lean A$5.0M and Accelerated A$25.0M scenario envelope, unsourced at both ends; the "Year-0 commitment" of A$1.09M, which was the same A$1,092,000 the page’s own table booked in the Year-1 column; the 986K tickets/yr break-even headline, resting on a contribution chain (A$5.76 − A$1.50 = A$4.26 per ticket) that the model’s own parameters contradicted (they yield A$5.20 − A$2.00 = A$3.20); the entire revenue projection sandbox and its presets; the ROI sensitivity and scenario tables, which carried a third revenue series conflicting with both the sandbox and the market pages; the one-analyst benchmark; the staffing, consulting, legal, data-acquisition and cloud cost tabs; and an AI cost ledger fronted by an invented invoice number for an invoice that does not exist.',
  para2:
    'Two verified findings from the original page are retained because they explain the deletions. First, the page’s own reviewer caution — a 5x TCO range is insufficient for capital allocation; narrow to ±30% before committing — was accurate, and the corrected edition enforces it: no unpriced range wider than ±30% appears anywhere on this page. Second, the sandbox’s own slider bounds capped the maximum representable demand at 288,000 tickets/yr — below the 986,000 tickets/yr the same page said were needed each year to recover its Base TCO. The model could not display its own break-even; it has been deleted rather than repaired, because every one of its parameters was an admitted, unverified assumption.',
};

// ROI verdict (financial_rebuild.md §E.2.1, §E.4).
export const ROI_VERDICT =
  'An ROI may be published only when its numerator and denominator are built entirely from fact-tagged inputs. Here the numerator inputs — take rate, ATV, event volume, tickets per event, repeat rate and the partnership share — are all [UNKNOWN], and the denominator is only partially fact-tagged (the priced gate components above; professional services [UNKNOWN] pending quotes). Verdict for Australia: ROI not computable — missing: take rate, ATV, event volume, tickets/event, repeat rate (U-03/U-04), partnership share (U-02) and professional-services costs (U-05); gates G0–G2 are the actions that produce them. For the United Kingdom, United States, Canada and the EU the verdict is the same with a harder edge: no gate on the current schedule produces their inputs, and none is scheduled. No blended five-market figure is published. The deleted ROI sensitivity table (−92% to +500%) computed correct percentages from hypothetical benefits and unsourced denominators — arithmetic is not a source.';

// Open items — bordered callouts with owner roles (site_change_specification.md, /investment ADD #1–#5).
export const INVESTMENT_OPEN_ITEMS = [
  {
    ref: 'U-05 / GT-08',
    title: 'Written PSP, legal, insurance, entity and QSA quotes (U-05 / GT-08, BLOCKING)',
    unknown:
      'None exist on file; every professional-services figure previously on this page (for example A$35,000–80,000 due diligence, A$100,000–240,000/yr "Security, Privacy and Legal") was unquoted, and the mandate prohibits proxying legal fees from consultant day rates. What the audit’s own first-hand registry checks already establish for the G0 ownership memorandum (a lookup, not the GT-09 due diligence — which remains unperformed): ABN Lookup shows no entity named "Ticketalay" registered in Australia and no active ABN named exactly "AB Entertainment"; the ticketalay.com.au registrant is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership t/a A&B ENTERTAINMENTS (VIC 3030), not registered for GST; and the domain’s RDAP status is "server renew prohibited — Not Currently Eligible For Renewal" (status last changed 2026-08-16) — the proof market’s named domain may lapse, a time-critical item on the G0 critical path.',
    owner: 'CEO / company secretary',
    action:
      'Request written quotes — AU law firm (entity + IP due diligence, including resolving the domain-renewal flag and naming the actual legal counterparty), Stripe AU and Adyen AU (merchant onboarding), insurance broker, QSA. Quote requests are free.',
  },
  {
    ref: 'U-07',
    title: 'Ticketalay first-party data (U-07, BLOCKING)',
    unknown: 'Schema, ownership, consent state and export rights of the first-party database are all unverified.',
    owner: 'Ticketalay principal',
    action:
      'Provide the database dictionary, a consent-register sample and app-console exports under NDA (nil cost — internal disclosure). Until then, the eighth setup day and all India-ops finance-mart content stay uncommitted.',
  },
  {
    ref: 'U-02 / GT-04',
    title: 'AB Entertainment ↔ Ticketalay partnership terms (U-02 / GT-04, BLOCKING — first on the critical path)',
    unknown:
      'Revenue share, cost share, capital contribution and control. No P&L for either party can be drawn until the terms exist on paper, and modelling any of them on an assumption is prohibited.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal',
    action: 'Execute a written term sheet or heads of agreement naming the actual legal counterparty, and disclose it to the LT.',
  },
  {
    ref: 'U-03 / GT-06',
    title: 'Contracted promoter/venue supply (U-03 / GT-06, BLOCKING)',
    unknown:
      'Zero named, signed counterparties; zero LOIs. Every ticket-volume figure previously on this page derived from a modelling default, not supply.',
    owner: 'Commercial lead (role currently unassigned — LT to appoint)',
    action: 'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues.',
  },
  {
    ref: 'U-04 / GT-07',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04 / GT-07, BLOCKING)',
    unknown:
      'No study exists; take rate, ATV, repeat purchase and conversion are all unevidenced for the actual target audience.',
    owner: 'Research lead (role currently unassigned)',
    action:
      'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief.',
  },
];

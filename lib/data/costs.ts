// Investment & Returns. Every monetary figure on this page carries exactly one provenance
// marker: [ACTUAL] [LIST] [QUOTE] [DERIVED] [ASSUMPTION] [UNKNOWN].
// FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.

// Receipted actuals — the affordability anchor.
export const ACTUALS = {
  total: {
    label: 'Total programme spend to date',
    value: 'A$830.00 [ACTUAL]',
    note: 'The only demonstrated, receipted capacity in evidence. Every forward figure on this page is expressed as a multiple of this anchor and must justify that multiple.',
  },
  ai: {
    label: 'AI subscriptions and API credits, incurred',
    value: 'A$350.00 [ACTUAL]',
    note: 'Cumulative and receipted — the AI component of the A$830.00 [ACTUAL] total above.',
  },
  consultation: {
    label: 'Consultation & feasibility study, incurred',
    value: 'A$480.00 [ACTUAL]',
    note: '8.0 hours at A$60.00/hr [ACTUAL] — the only labour price in evidence on this programme.',
  },
  ledgerFooterRetained:
    'No platform invoices, token measurements, cache or search records, labour timesheets or tax figures exist beyond the receipts above. The receipted record above is the verified expenditure record for this programme; nothing else is.',
};

// Per-gate decision schedule. No cumulative TCO is published.
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
    committed: 'A$2,880.00 [DERIVED] — 6.0 analyst-days [ASSUMPTION], conditional on the same unconfirmed consultant rate and day count as G0, plus study and legal-review fees [UNKNOWN]',
    mustPass: 'G0 passed; ≥3 signed, dated pilot-event agreements; primary demand study delivered with take-rate, ATV and repeat findings',
  },
  {
    gate: 'G2 — MVP build',
    buys:
      'Day-1 data bill of materials; ingest, reconciled finance mart, three certified dashboards, consent register; the day-1 AI stack',
    priced:
      'One-off: floor configuration A$5,860.00 [DERIVED] (data floor A$2,500.00 [LIST] + setup 7.0 days A$3,360.00 [DERIVED], pre-U-07 maximum) or full configuration A$9,876.74 [DERIVED] (data full A$6,036.74 [DERIVED] + setup 8.0 days A$3,840.00 [DERIVED]) — alternatives, not a range; setup labour holds only under the unconfirmed rate and day-count [ASSUMPTION]s. Run rate, monthly-cancellable and not part of the authorised gate cost: tech A$46.43/mo [DERIVED] + AI (Claude Pro, billed monthly) A$27.99/mo [DERIVED].',
    multiple: '7.06x floor / 11.90x full one-off (setup-labour share conditional); run rate 0.090x/month',
    committed:
      'Floor configuration A$5,860.00 [DERIVED] or full configuration A$9,876.74 [DERIVED] — alternatives, not a range. The setup-labour share of each (7.0 and 8.0 analyst-days) holds only under the unconfirmed consultant rate and day count [ASSUMPTION]; the data lines carry their own markers — [LIST] on each vendor-published unit, [DERIVED] on every conversion or annualisation computed from one — and stand on their own.',
    mustPass: 'G1 passed; first-party data disclosed under NDA; consultant-rate confirmation in writing',
  },
];

export const GATE_SCHEDULE_NOTES = {
  intro:
    'No cumulative programme total is published: a cumulative total would manufacture a budget for a business state that does not exist (the AU domain is parked, there is zero contracted inventory, and the partnership terms are unwritten). Each gate below is a separate board decision; money committed at one gate buys the information for the next, and nothing is committed past the next gate. Committable today in third-party vendor cash: none — the five professional-services quote requests are free to lodge.',
  noG3:
    'There is no G3 on this schedule: a pilot-launch gate can only be drafted from G1’s outputs, and pricing it now would require the very numbers this page records as [UNKNOWN]. Any post-G2 proposal must be built line by line from written quotes and published prices.',
};

// Data acquisition — the price each vendor actually publishes, and this programme's disposition.
export const VENDOR_PRICES = [
  {
    provider: 'IBISWorld — "Musical & Theatre Productions in Australia", single report',
    published: 'AUD $2,500 live AU checkout cart; AU$2,200 on the vendor’s help centre [LIST] — the cart price is used for planning',
    disposition: 'Recommended G1 buy: A$2,500.00 = 3.01x anchor. The only priced source of AU live-theatre industry structure.',
  },
  {
    provider: 'Statista',
    published: 'Starter US$199/mo billed annually [LIST] (= US$2,388/yr [DERIVED]); Personal US$649/mo billed annually [LIST] (= US$7,788/yr [DERIVED]); Professional quote-only [UNKNOWN]',
    disposition:
      'Starter conditionally in the G2 full tranche at A$3,342.20/yr [DERIVED] — purchase order only against a written gap-list of statistics the free sources failed to supply. Aggregator: every figure must be re-cited to its primary source. For the Personal tier the vendor’s published price, US$649/mo billed annually [LIST], is carried beside the mandate’s ground-truth register baseline for that same tier, A$922/yr (GT D5-[16]) — Ground-truth baseline, no provenance marker, because [LIST] would assert a vendor publication that does not exist and a ground-truth entry is graded nowhere on this site; reconciling them is open item U-01, owned by the programme sponsor. No funded line on this page prices the Personal tier: the G2 tranche buys Starter.',
  },
  {
    provider: 'Semrush',
    published: 'SEO US$139 / Starter US$199 / Pro+ US$299 / Advanced US$549 per month [LIST]',
    disposition: 'One month of SEO at the entry decision: A$194.54 [DERIVED] = 0.23x anchor. Web data decays in months — buy fresh, not backfill.',
  },
  {
    provider: 'Similarweb',
    published: 'Self-serve US$129–649/mo [LIST] (= US$1,548–7,788/yr [DERIVED]: monthly rate × 12 — the annual band is an annualisation, not a vendor-published price); Business/Enterprise quote-only [UNKNOWN]',
    disposition: 'Deferred — panel data adds nothing to a market with zero AU operations; revisit post-launch.',
  },
  {
    provider: 'Apollo.io',
    published: 'Professional US$79/seat/mo billed annually [LIST] (= US$948/yr [DERIVED]: 79 × 12) = A$1,326.80 [DERIVED]: 948 ÷ 0.7145, the one FX rate used sitewide; Free tier 900 credits/seat/yr at US$0 [LIST]',
    disposition: 'Free tier recommended (A$0 [LIST], the vendor’s published free tier) — 900 credits cover the pilot outreach universe. Step up only when free credits are demonstrably exhausted.',
  },
  {
    provider: 'People Data Labs',
    published: 'Free tier US$0/mo (100 records) [LIST]; Pro US$98/mo or US$940/yr on annual billing [LIST] — both published units, the yearly figure the vendor\u2019s own; then custom [UNKNOWN]',
    disposition: 'Deferred — Apollo Free covers the outreach need.',
  },
  {
    provider: 'OpenCage',
    published: 'X-Small US$50/mo [LIST] (= US$600/yr [DERIVED]: 50 × 12); Medium US$500/mo [LIST] (= US$6,000/yr [DERIVED]: 500 × 12)',
    disposition: 'Not required — Google’s free cap covers pilot geocoding volume.',
  },
  {
    provider: 'Google Maps Platform (Geocoding)',
    published:
      '10,000 requests/month free [LIST], then US$5.00/1,000 [LIST]: 100k calls/yr costs US$0 spread evenly, at most ~US$450 in a single-month worst case [DERIVED]: (100,000 − 10,000) × 5.00 ÷ 1,000. Google publishes no yearly price — the worst-case figure is this audit\'s own arithmetic over an assumed workload',
    disposition: 'A$0 [LIST] at pilot volume, under the ≤10,000 requests/month volume [ASSUMPTION] (confirmer: programme sponsor, against the first month’s metered billing).',
  },
  {
    provider: 'Avalara',
    published: '"Pricing starts at $699" (billing period unstated) [LIST]; suite quote-only [UNKNOWN]',
    disposition: 'Deferred — overweight for a pre-revenue single-market pilot; a written quote before any commitment.',
  },
  {
    provider: 'US Census Bureau API',
    published: 'A$0 [LIST] — free access demonstrated first-hand (ACS pull, free registration key)',
    disposition: 'Acquire first, at zero licence cost.',
  },
  {
    provider: 'Eurostat API',
    published: 'A$0 [LIST] — free access demonstrated first-hand (public dissemination API)',
    disposition: 'Acquire first, at zero licence cost.',
  },
  {
    provider: 'US BLS / BEA APIs',
    published:
      'A$0 [LIST] — free by statute; the official portals are the only distribution channel (BEA responds 200 to a live probe, BLS bot-blocks it on an otherwise public page)',
    disposition: 'Acquire first, at zero licence cost.',
  },
];

export const VENDOR_PRICES_NOTE =
  'No subtotal is published across this table: these are per-vendor published prices and dispositions, not a budget. The day-1 data spend is A$6,036.74 [DERIVED] full / A$2,500.00 [LIST] floor, per the G2 line above. A free or public-access status for an official government or intergovernmental statistical source stands on a live official URL — or a bot-block on an otherwise public page — plus that source’s statutory free-access basis. Every priced claim requires a vendor-published price on file, and a priced band containing a zero is still a priced claim.';

// People — what a salary claim stands on.
export const PEOPLE_CORRECTIONS = [
  {
    item: 'Data Analyst, base salary',
    corrected:
      'Aggregator benchmark — AUD 95,000–115,000/yr (SEEK, employer-disclosed job-ad salaries; not [LIST] under the trust ladder — see the marker rule above)',
    standing:
      'Context only, feeds no funded figure; no fact-tagged salary figure is publishable for this role.',
  },
  {
    item: 'Demonstrated labour rate',
    corrected: 'A$60.00/hr [ACTUAL] (A$480.00/day [DERIVED] at 8.0 h)',
    standing:
      'The only labour price in evidence; carrying it forward is an [ASSUMPTION] confirmed in writing by the CEO and the incumbent consultant by 2026-09-30.',
  },
  {
    item: 'Day-1 headcount',
    corrected: '0.0 FTE permanent; one fractional analyst line per gate (4.0 days at G0, 6.0 days at G1, per the schedule above)',
    standing: 'Commercial lead and Research lead are named but unassigned — appointments, not numbers.',
  },
];

export const PEOPLE_INTRO =
  'Only roles with a published Australian source behind them carry a figure. Every other role on the programme roster (fractional CDO, Data Engineering Lead, Senior Data Engineer, Data Architect, BI Developer, Marketing Data Analyst, Data Governance Analyst, Cloud/DevOps Engineer, Privacy Consultant, Project Manager, UX/UI Designer) has no published AU band for the exact title and stands as [UNKNOWN] — not proxied. Rates enter only via the U-05 written-quote round.';

// ROI verdict.
export const ROI_VERDICT =
  'An ROI may be published only when its numerator and denominator are built entirely from fact-tagged inputs. Here the numerator inputs — take rate, ATV, event volume, tickets per event, repeat rate and the partnership share — are all [UNKNOWN], and the denominator is only partially fact-tagged (the priced gate components above; professional services [UNKNOWN] pending quotes). Verdict for Australia: ROI not computable — missing: take rate, ATV, event volume, tickets/event, repeat rate (U-03/U-04), partnership share (U-02) and professional-services costs (U-05); gates G0–G2 are the actions that produce them. For the United Kingdom, United States, Canada and the EU the verdict is the same with a harder edge: no gate on the current schedule produces their inputs, and none is scheduled. No blended five-market figure is published.';

// Open items — bordered callouts with owner roles.
export const INVESTMENT_OPEN_ITEMS = [
  {
    ref: 'U-05',
    title: 'Written PSP, legal, insurance, entity and QSA quotes (U-05, BLOCKING)',
    unknown:
      'None exist on file, so every professional-services cost on this programme is unquoted; legal fees are never proxied from consultant day rates. What the first-hand registry checks already establish for the G0 ownership memorandum — a lookup, not the full due diligence, which remains unperformed: ABN Lookup shows no entity named "Ticketalay" registered in Australia and no active ABN named exactly "AB Entertainment"; the ticketalay.com.au registrant is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership t/a A&B ENTERTAINMENTS (VIC 3030), not registered for GST; and the domain’s RDAP status is "server renew prohibited — Not Currently Eligible For Renewal" (status last changed 2026-08-16) — the proof market’s named domain may lapse, a time-critical item on the G0 critical path.',
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
    ref: 'U-02',
    title: 'AB Entertainment ↔ Ticketalay partnership terms (U-02, BLOCKING — first on the critical path)',
    unknown:
      'Revenue share, cost share, capital contribution and control. No P&L for either party can be drawn until the terms exist on paper, and modelling any of them on an assumption is prohibited.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal',
    action: 'Execute a written term sheet or heads of agreement naming the actual legal counterparty, and disclose it to the LT.',
  },
  {
    ref: 'U-03',
    title: 'Contracted promoter/venue supply (U-03, BLOCKING)',
    unknown:
      'Zero named, signed counterparties; zero LOIs. No ticket-volume figure has contracted supply behind it.',
    owner: 'Commercial lead (role currently unassigned — LT to appoint)',
    action: 'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues.',
  },
  {
    ref: 'U-04',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04, BLOCKING)',
    unknown:
      'No study exists; take rate, ATV, repeat purchase and conversion are all unevidenced for the actual target audience.',
    owner: 'Research lead (role currently unassigned)',
    action:
      'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief.',
  },
];

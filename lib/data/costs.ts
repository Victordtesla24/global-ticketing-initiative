// Investment & Returns. All figures AUD unless the source currency is shown.
// FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.

// Actual spend to date — the affordability anchor.
export const ACTUALS = {
  total: {
    label: 'Total programme spend to date',
    value: 'A$830.00',
    note: 'The only demonstrated spending capacity in evidence, and every dollar of it supported by a receipt. Every forward figure on this page is expressed as a multiple of this anchor and must justify that multiple.',
  },
  ai: {
    label: 'AI subscriptions and API credits, incurred',
    value: 'A$350.00',
    note: 'Cumulative actual spend — the AI component of the A$830.00 total above.',
  },
  consultation: {
    label: 'Consultation & feasibility study, incurred',
    value: 'A$480.00',
    note: '8.0 hours at A$60.00/hr — the only labour price in evidence on this programme.',
  },
  ledgerFooterRetained:
    'No platform invoices, token measurements, cache or search records, labour timesheets or tax figures exist beyond the receipts above. That record is the whole of the verified expenditure on this programme.',
};

// Per-gate decision schedule. No cumulative total cost of ownership is published.
export const GATE_SCHEDULE = [
  {
    gate: 'G0 — due diligence & terms',
    buys:
      'Ownership memorandum (code, brand, app-store accounts, .com.au domain), executed partnership term sheet, all five written professional-services quotes on file',
    priced:
      'Vendor cash: none committed, because quote requests are free to lodge. Fractional analyst 4.0 days at A$60.00/hr — the actual rate paid to date — giving A$1,920.00, conditional on written confirmation of the rate and the day count by 2026-09-30. Legal and entity fees are to be confirmed when the quotes arrive.',
    multiple: '2.31x (analyst line, conditional)',
    committed: 'A$1,920.00 — 4.0 analyst-days at a rate that is still a planning assumption until confirmed in writing',
    mustPass: 'All five quotes received in writing; ownership established; term sheet executed and disclosed',
  },
  {
    gate: 'G1 — discovery',
    buys:
      '≥3 signed, dated pilot-event agreements or letters of intent; the primary demand, fee-tolerance and trust study; the evidence that turns every revenue variable from an unknown into a fact',
    priced:
      'The study fee is to be confirmed — it cannot be priced without a brief, and the brief is written and quoted during G0. Per-agreement legal review is to be confirmed against the G0 quote. Outreach tooling A$0, Apollo.io’s published free tier. Fractional analyst 6.0 days = A$2,880.00, conditional as above.',
    multiple: '3.47x (analyst line, conditional)',
    committed: 'A$2,880.00 — 6.0 analyst-days, on the same unconfirmed consultant rate and day count as G0, plus study and legal-review fees still to be confirmed',
    mustPass: 'G0 passed; ≥3 signed, dated pilot-event agreements; primary demand study delivered with take-rate, average transaction value and repeat findings',
  },
  {
    gate: 'G2 — MVP build',
    buys:
      'Day-1 data bill of materials; ingest, reconciled finance mart, three certified dashboards, consent register; the day-1 AI stack',
    priced:
      'One-off: floor configuration A$5,860.00 (data floor A$2,500.00 + setup 7.0 days A$3,360.00, the maximum committable before the first-party data is disclosed) or full configuration A$9,876.74 (data full A$6,036.74 + setup 8.0 days A$3,840.00) — alternatives, not a range. The setup labour holds only while the consultant rate and day count remain planning assumptions. Run rate, monthly-cancellable and not part of the authorised gate cost: tech A$46.43/mo plus AI (Claude Pro, billed monthly) A$27.99/mo. Both are calculated. The tech line is S3 storage 5 GB at US$0.025/GB-month = US$0.125, Athena 10 GB scanned at US$5.00/TB = US$0.05, and QuickSight 1 author at US$24/mo plus 3 readers at US$3/mo = US$33.00, with Glue Data Catalog on its published free tier and dbt Core, open source, at A$0 — US$33.175/mo ÷ 0.7145; the four rates are published Sydney prices and the three volumes are planning assumptions, to be confirmed by the Ticketalay principal and the CEO by 30 September 2026 and against the first metered month after go-live. The AI line is US$20/mo, the vendor’s published Pro price, ÷ 0.7145.',
    multiple: '7.06x floor / 11.90x full one-off (setup-labour share conditional); run rate 0.090x/month',
    committed:
      'Floor configuration A$5,860.00 or full configuration A$9,876.74 — alternatives, not a range. The setup-labour share of each (7.0 and 8.0 analyst-days) holds only while the consultant rate and day count are planning assumptions; the data lines are vendor-published prices, or conversions and annualisations calculated from them, and stand on their own.',
    mustPass: 'G1 passed; first-party data disclosed under NDA; consultant-rate confirmation in writing',
  },
];

export const GATE_SCHEDULE_NOTES = {
  intro:
    'No cumulative programme total is published: a cumulative total would manufacture a budget for a business state that does not exist — the AU domain is parked, there is zero contracted inventory, and the partnership terms are unwritten. Each gate below is a separate board decision; money committed at one gate buys the information for the next, and nothing is committed past the next gate. Committable today in third-party vendor cash: none, because the five professional-services quote requests are free to lodge.',
  noG3:
    'There is no G3 on this schedule. A pilot-launch gate can only be drafted from G1’s outputs, and pricing it now would require the very figures this page records as still to be confirmed. Any post-G2 proposal must be built line by line from written quotes and published prices.',
};

// Data acquisition — the price each vendor actually publishes, and this programme's disposition.
export const VENDOR_PRICES = [
  {
    provider: 'IBISWorld — "Musical & Theatre Productions in Australia", single report',
    published: 'AUD $2,500 on the live AU checkout cart, and AU$2,200 on the vendor’s help centre — both published prices; the cart price is the one used for planning',
    disposition: 'Recommended G1 buy at the published A$2,500.00 = 3.01x the anchor. The only priced source of AU live-theatre industry structure.',
  },
  {
    provider: 'Statista',
    published: 'Starter US$199/mo billed annually (= US$2,388/yr); Personal US$649/mo billed annually (= US$7,788/yr) — both published prices, with the yearly figures calculated from them. Professional is quote-only and remains to be confirmed',
    disposition:
      'Starter sits conditionally in the G2 full tranche at A$3,342.20/yr — a purchase order only against a written gap-list of statistics the free sources failed to supply. Statista is an aggregator: every figure must be re-cited to its primary source. On the Personal tier the vendor publishes US$649/mo billed annually, while an earlier costing recorded A$922/yr for the same tier; the two are not reconciled, and the programme sponsor owns closing that gap. No funded line on this page prices the Personal tier — the G2 tranche buys Starter.',
  },
  {
    provider: 'Semrush',
    published: 'SEO US$139, Starter US$199, Pro+ US$299 and Advanced US$549 per month — the vendor’s published prices',
    disposition: 'One month of SEO at the entry decision: A$194.54 = 0.23x the anchor. Web data decays in months — buy fresh, not backfill.',
  },
  {
    provider: 'Similarweb',
    published: 'Self-serve US$129–649/mo, the published prices (= US$1,548–7,788/yr, calculated from them: the annual band is an annualisation, not a price the vendor publishes). Business and Enterprise are quote-only and remain to be confirmed',
    disposition: 'Deferred — panel data adds nothing to a market with zero AU operations; revisit post-launch.',
  },
  {
    provider: 'Apollo.io',
    published: 'Professional US$79/seat/mo billed annually, the published price (= US$948/yr calculated: 79 × 12) = A$1,326.80, calculated: 948 ÷ 0.7145, the one FX rate used across this proposal. The free tier is 900 credits/seat/yr at a published US$0',
    disposition: 'Free tier recommended — A$0, the vendor’s own published free tier; 900 credits cover the pilot outreach universe. Step up only when free credits are demonstrably exhausted.',
  },
  {
    provider: 'People Data Labs',
    published: 'Free tier US$0/mo (100 records); Pro US$98/mo or US$940/yr on annual billing — all published prices, and the yearly figure is the vendor’s own rather than an annualisation. Above Pro the price is custom and remains to be confirmed',
    disposition: 'Deferred — the Apollo free tier covers the outreach need.',
  },
  {
    provider: 'OpenCage',
    published: 'X-Small US$50/mo (= US$600/yr calculated: 50 × 12); Medium US$500/mo (= US$6,000/yr calculated: 500 × 12) — the monthly rates are the vendor’s published prices',
    disposition: 'Not required — Google’s free cap covers pilot geocoding volume.',
  },
  {
    provider: 'Google Maps Platform (Geocoding)',
    published:
      '10,000 requests/month free, then US$5.00/1,000 — both published prices. At 100k calls/yr that costs US$0 if the calls spread evenly, and at most about US$450 in a single-month worst case, calculated: (100,000 − 10,000) × 5.00 ÷ 1,000. Google publishes no yearly price, so the worst-case figure is arithmetic over an assumed workload',
    disposition: 'A$0 at pilot volume, on the planning assumption of 10,000 requests/month or fewer, which the programme sponsor confirms against the first month’s metered billing.',
  },
  {
    provider: 'Avalara',
    published: '"Pricing starts at $699", with the billing period unstated — the vendor’s published price. The full suite is quote-only and remains to be confirmed',
    disposition: 'Deferred — overweight for a pre-revenue single-market pilot; obtain a written quote before any commitment.',
  },
  {
    provider: 'US Census Bureau API',
    published: 'A$0 — free access, demonstrated by an ACS pull on a free registration key',
    disposition: 'Acquire first, at zero licence cost.',
  },
  {
    provider: 'Eurostat API',
    published: 'A$0 — free access, demonstrated against the public dissemination API',
    disposition: 'Acquire first, at zero licence cost.',
  },
  {
    provider: 'US BLS / BEA APIs',
    published:
      'A$0 — free by statute, and the official portals are the only distribution channel (BEA responds 200 to a live probe; BLS bot-blocks it on an otherwise public page)',
    disposition: 'Acquire first, at zero licence cost.',
  },
];

export const VENDOR_PRICES_NOTE =
  'No subtotal is published across this table: these are per-vendor published prices and dispositions, not a budget. The day-1 data spend is A$6,036.74 in the full configuration and A$2,500.00 at the floor, per the G2 line above. A free or public-access status for an official government or intergovernmental statistical source rests on a live official URL — or a bot-block on an otherwise public page — plus that source’s statutory free-access basis. Every priced claim requires a vendor-published price on file, and a priced band containing a zero is still a priced claim.';

// People — what a salary claim stands on.
export const PEOPLE_CORRECTIONS = [
  {
    item: 'Data Analyst, base salary',
    corrected:
      'Aggregator benchmark — AUD 95,000–115,000/yr (SEEK, employer-disclosed job-ad salaries). An aggregator’s compilation is not a published price, so it is labelled as a benchmark rather than one.',
    standing:
      'Context only. It feeds no funded figure, and no confirmed salary figure is publishable for this role.',
  },
  {
    item: 'Demonstrated labour rate',
    corrected: 'A$60.00/hr, the rate actually paid (A$480.00/day at 8.0 hours)',
    standing:
      'The only labour price in evidence. Carrying it forward is a planning assumption, to be confirmed in writing by the CEO and the incumbent consultant by 2026-09-30.',
  },
  {
    item: 'Day-1 headcount',
    corrected: '0.0 FTE permanent; one fractional analyst line per gate (4.0 days at G0, 6.0 days at G1, per the schedule above)',
    standing: 'Commercial lead and Research lead are named but unassigned — appointments, not numbers.',
  },
];

export const PEOPLE_INTRO =
  'Only roles with a published Australian source behind them carry a figure. Every other role on the programme roster — fractional CDO, Data Engineering Lead, Senior Data Engineer, Data Architect, BI Developer, Marketing Data Analyst, Data Governance Analyst, Cloud/DevOps Engineer, Privacy Consultant, Project Manager, UX/UI Designer — has no published AU band for the exact title, so its rate is to be confirmed rather than proxied. Rates enter only through the written-quote round.';

// ROI verdict.
export const ROI_VERDICT =
  'A return on investment can be published only when its numerator and denominator are built entirely from confirmed inputs. Here the numerator inputs — take rate, average transaction value, event volume, tickets per event, repeat rate and the partnership share — are all still to be confirmed, and the denominator is only partly settled: the priced gate components above stand, while professional services await their quotes. Verdict for Australia: return on investment is not computable, and what is missing is the take rate, average transaction value, event volume, tickets per event, repeat rate, the partnership share and professional-services costs. Gates G0–G2 are the actions that produce them. For the United Kingdom, United States, Canada and the EU the verdict is the same with a harder edge: no gate on the current schedule produces their inputs, and none is scheduled. No blended five-market figure is published.';

// Outstanding items — bordered callouts with owner roles.
export const INVESTMENT_OPEN_ITEMS = [
  {
    ref: 'quotes',
    title: 'Written PSP, legal, insurance, entity and QSA quotes',
    unknown:
      'None exist on file, so every professional-services cost on this programme is unquoted; legal fees are never proxied from consultant day rates. What the register checks already establish for the G0 ownership memorandum — a lookup, not the full due diligence, which remains to be done: ABN Lookup shows no entity named "Ticketalay" registered in Australia and no active ABN named exactly "AB Entertainment"; the ticketalay.com.au registrant is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership trading as A&B ENTERTAINMENTS (VIC 3030), not registered for GST; and the domain’s RDAP status is "server renew prohibited — Not Currently Eligible For Renewal", last changed 2026-08-16. The proof market’s named domain may lapse, which makes the memorandum time-critical on the G0 path.',
    owner: 'CEO / company secretary',
    action:
      'Request written quotes — AU law firm (entity and IP due diligence, including resolving the domain-renewal flag and naming the actual legal counterparty), Stripe AU and Adyen AU (merchant onboarding), insurance broker, QSA. Quote requests are free.',
  },
  {
    ref: 'first-party-data',
    title: 'Ticketalay first-party data',
    unknown: 'Schema, ownership, consent state and export rights of the first-party database are all unverified.',
    owner: 'Ticketalay principal',
    action:
      'Provide the database dictionary, a consent-register sample and app-console exports under NDA, at no cost — this is an internal disclosure. Until then, the eighth setup day and all India-operations finance-mart content stay uncommitted.',
  },
  {
    ref: 'partnership-terms',
    title: 'AB Entertainment ↔ Ticketalay partnership terms — first on the critical path',
    unknown:
      'Revenue share, cost share, capital contribution and control. No profit and loss for either party can be drawn until the terms exist on paper, and modelling any of them on an assumption is not permitted.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal',
    action: 'Execute a written term sheet or heads of agreement naming the actual legal counterparty, and disclose it to the leadership team.',
  },
  {
    ref: 'supply',
    title: 'Contracted promoter and venue supply',
    unknown:
      'Zero named, signed counterparties; zero letters of intent. No ticket-volume figure has contracted supply behind it.',
    owner: 'Commercial lead (role currently unassigned — leadership team to appoint)',
    action: 'Secure a minimum of three signed pilot-event agreements or dated letters of intent with named promoters and venues.',
  },
  {
    ref: 'demand',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence',
    unknown:
      'No study exists; take rate, average transaction value, repeat purchase and conversion are all unevidenced for the actual target audience.',
    owner: 'Research lead (role currently unassigned)',
    action:
      'Commission a primary study of Marathi and Indian-origin event buyers in Melbourne and Sydney — willingness to pay, fee tolerance, channel trust — and obtain quotes for it. It cannot be priced without a brief.',
  },
];

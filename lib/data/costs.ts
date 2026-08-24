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
    'The receipts above are the whole of the verified expenditure on this programme.',
};

// Per-gate decision schedule — each gate priced at the point it is committed.
export const GATE_SCHEDULE = [
  {
    gate: 'G0 — due diligence & terms',
    buys:
      'Ownership memorandum (code, brand, app-store accounts, .com.au domain), executed partnership term sheet, all five written professional-services quotes on file',
    priced:
      'Vendor cash: none committed, because quote requests are free to lodge. Fractional analyst 4.0 days at A$60.00/hr — the actual rate paid to date — giving A$1,920.00. Legal and entity fees: quote on request.',
    multiple: '2.31x (analyst line)',
    committed: 'A$1,920.00 — 4.0 analyst-days at A$60.00/hr, the rate actually paid',
    mustPass: 'All five quotes received in writing; ownership established; term sheet executed and disclosed',
  },
  {
    gate: 'G1 — discovery',
    buys:
      '≥3 signed, dated pilot-event agreements or letters of intent; the primary demand, fee-tolerance and trust study; the evidence that turns every revenue variable from an unknown into a fact',
    priced:
      'The study fee is quoted on request, against the brief written during G0. Per-agreement legal review: quote on request. Outreach tooling A$0, Apollo.io’s published free tier. Fractional analyst 6.0 days = A$2,880.00.',
    multiple: '3.47x (analyst line)',
    committed: 'A$2,880.00 — 6.0 analyst-days at the same rate as G0, alongside study and legal-review fees quoted on request',
    mustPass: 'G0 passed; ≥3 signed, dated pilot-event agreements; primary demand study delivered with take-rate, average transaction value and repeat findings',
  },
  {
    gate: 'G2 — MVP build',
    buys:
      'Day-1 data bill of materials; ingest, reconciled finance mart, three certified dashboards, consent register; the day-1 AI stack',
    priced:
      'One-off: floor configuration A$5,860.00 (data floor A$2,500.00 + setup 7.0 days A$3,360.00, the maximum committable before the first-party data is disclosed) or full configuration A$9,876.74 (data full A$6,036.74 + setup 8.0 days A$3,840.00) — alternatives, not a range. Run rate, monthly-cancellable and not part of the authorised gate cost: tech A$46.43/mo plus AI (Claude Pro, billed monthly) A$27.99/mo. Both are calculated. The tech line is S3 storage 5 GB at US$0.025/GB-month = US$0.125, Athena 10 GB scanned at US$5.00/TB = US$0.05, and QuickSight 1 author at US$24/mo plus 3 readers at US$3/mo = US$33.00, with Glue Data Catalog on its published free tier and dbt Core, open source, at A$0 — US$33.175/mo ÷ 0.7145; the four rates are the vendors’ published Sydney prices, applied to assumed volumes of 5 GB stored, 10 GB scanned per month, and 1 author plus 3 readers. The AI line is US$20/mo, the vendor’s published Pro price, ÷ 0.7145.',
    multiple: '7.06x floor / 11.90x full one-off; run rate 0.090x/month',
    committed:
      'Floor configuration A$5,860.00 or full configuration A$9,876.74 — alternatives, not a range. The setup-labour share of each is 7.0 and 8.0 analyst-days respectively; the data lines are vendor-published prices, or conversions and annualisations calculated from them.',
    mustPass: 'G1 passed; first-party data disclosed under NDA',
  },
];

export const GATE_SCHEDULE_NOTES = {
  intro:
    'This is a per-gate decision schedule rather than a cumulative budget: the AU domain is parked, there is zero contracted inventory, and the partnership terms are unwritten. Each gate below is a separate board decision; money committed at one gate buys the information for the next, and nothing is committed past the next gate. Committable today in third-party vendor cash: none, because the five professional-services quote requests are free to lodge.',
  noG3:
    'There is no G3 on this schedule. A pilot-launch gate can only be drafted from G1’s outputs. Any post-G2 proposal must be built line by line from written quotes and published prices.',
};

// Data acquisition — the price each vendor actually publishes, and this programme's disposition.
export const VENDOR_PRICES = [
  {
    provider: 'IBISWorld — "Musical & Theatre Productions in Australia", single report',
    published: 'AUD $2,500 on the live AU checkout cart, and AU$2,200 on the vendor’s help centre — both published prices; the cart price is the one used for planning',
    disposition: 'Recommended G2 floor-configuration buy at the published A$2,500.00 = 3.01x the anchor — it is the data floor inside the G2 line above, and it is committed at no earlier gate. The only priced source of AU live-theatre industry structure.',
  },
  {
    provider: 'Statista',
    published: 'Starter US$199/mo billed annually (= US$2,388/yr); Personal US$649/mo billed annually (= US$7,788/yr) — both published prices, with the yearly figures calculated from them. Professional: quote on request',
    disposition:
      'Starter sits conditionally in the G2 full tranche at A$3,342.20/yr — a purchase order only against a written list of statistics the free sources do not supply. Statista is an aggregator: every figure must be re-cited to its primary source. No funded line on this page prices the Personal tier — the G2 tranche buys Starter.',
  },
  {
    provider: 'Semrush',
    published: 'SEO US$139, Starter US$199, Pro+ US$299 and Advanced US$549 per month — the vendor’s published prices',
    disposition: 'One month of SEO at the entry decision: A$194.54 = 0.23x the anchor. Web data decays in months — buy fresh, not backfill.',
  },
  {
    provider: 'Similarweb',
    published: 'Self-serve US$129–649/mo, the published prices (= US$1,548–7,788/yr, calculated from them: the annual band is an annualisation, not a price the vendor publishes). Business and Enterprise: quote on request',
    disposition: 'Deferred — panel data adds nothing to a market with zero AU operations; revisit post-launch.',
  },
  {
    provider: 'Apollo.io',
    published: 'Professional US$79/seat/mo billed annually, the published price (= US$948/yr calculated: 79 × 12) = A$1,326.80, calculated: 948 ÷ 0.7145, the one FX rate used across this proposal. The free tier is 900 credits/seat/yr at a published US$0',
    disposition: 'Free tier recommended — A$0, the vendor’s own published free tier; 900 credits cover the pilot outreach universe. Step up only when free credits are demonstrably exhausted.',
  },
  {
    provider: 'People Data Labs',
    published: 'Free tier US$0/mo (100 records); Pro US$98/mo or US$940/yr on annual billing — all published prices, and the yearly figure is the vendor’s own rather than an annualisation. Above Pro the price is custom: quote on request',
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
    disposition: 'A$0 at pilot volume, on an assumed 10,000 requests/month or fewer.',
  },
  {
    provider: 'Avalara',
    published: '"Pricing starts at $699", with the billing period unstated — the vendor’s published price. The full suite: quote on request',
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
  'These are per-vendor published prices and dispositions rather than a budget subtotal. The day-1 data spend is A$6,036.74 in the full configuration and A$2,500.00 at the floor, per the G2 line above. A free or public-access status for an official government or intergovernmental statistical source rests on a live official URL — or a bot-block on an otherwise public page — plus that source’s statutory free-access basis. Every priced claim requires a vendor-published price on file, and a priced band containing a zero is still a priced claim.';

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
      'The only labour price in evidence, and the rate assumed for the analyst lines on the gate schedule above.',
  },
  {
    item: 'Day-1 headcount',
    corrected: '0.0 FTE permanent; one fractional analyst line per gate (4.0 days at G0, 6.0 days at G1, per the schedule above)',
    standing: 'Commercial lead and Research lead are roles in the programme structure, not day-1 headcount.',
  },
];

export const PEOPLE_INTRO =
  'Only roles with a published Australian source behind them carry a figure. Every other role on the programme roster — fractional CDO, Data Engineering Lead, Senior Data Engineer, Data Architect, BI Developer, Marketing Data Analyst, Data Governance Analyst, Cloud/DevOps Engineer, Privacy Consultant, Project Manager, UX/UI Designer — has no published AU band for the exact title, so its rate is quoted rather than proxied. Rates enter only through the written-quote round.';

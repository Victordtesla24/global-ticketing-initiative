// DELIVERABLE 5 — costing documentation. All AUD [EST].
export const TCO_BASE = {
  oneTime: [
    { item: 'Corporate, IP and contract diligence', y0: 70000, y1: 0, y2: 0, y3: 0 },
    { item: 'Privacy and regulatory assessment', y0: 55000, y1: 0, y2: 0, y3: 0 },
    { item: 'Data discovery and reconciliation', y0: 90000, y1: 0, y2: 0, y3: 0 },
    { item: 'Cloud/security foundation', y0: 120000, y1: 0, y2: 0, y3: 0 },
    { item: 'Data pipelines and marts', y0: 240000, y1: 0, y2: 0, y3: 0 },
    { item: 'BI and dashboards', y0: 80000, y1: 0, y2: 0, y3: 0 },
    { item: 'Product localisation', y0: 100000, y1: 0, y2: 50000, y3: 50000 },
    { item: 'Pilot integration', y0: 130000, y1: 0, y2: 0, y3: 0 },
    { item: 'Penetration testing', y0: 55000, y1: 0, y2: 0, y3: 0 },
    { item: 'Training and change management', y0: 35000, y1: 15000, y2: 15000, y3: 15000 },
    { item: 'Contingency (12%)', y0: 117000, y1: 0, y2: 0, y3: 0 },
  ],
  recurring: [
    { item: 'People (loaded)', y0: 0, y1: 1200000, y2: 1850000, y3: 2500000 },
    { item: 'Cloud, data and technology', y0: 0, y1: 250000, y2: 450000, y3: 750000 },
    { item: 'Data acquisition (licences and APIs)', y0: 0, y1: 42000, y2: 65000, y3: 90000 },
    { item: 'Security, privacy and legal maintenance', y0: 0, y1: 100000, y2: 160000, y3: 240000 },
    { item: 'Market entry and pilot operations', y0: 0, y1: 300000, y2: 650000, y3: 1000000 },
    { item: 'Consulting and professional services', y0: 0, y1: 200000, y2: 300000, y3: 200000 },
    { item: 'Operational contingency (10%)', y0: 0, y1: 209200, y2: 347500, y3: 478000 },
  ],
  annualTotals: { y0: 1092000, y1: 2316200, y2: 3887500, y3: 5323000 },
  cumulative: { y0: 1092000, y1: 3408200, y2: 7295700, y3: 12618700 },
};

export const TCO_SCENARIOS = [
  { name: 'Lean / Conditional', y0: 462000, y1: 1200000, y2: 1500000, y3: 1838000, total: 5000000, desc: 'Australia only, contractors, limited platform, no international entity' },
  { name: 'Base Programme', y0: 1092000, y1: 2316200, y2: 3887500, y3: 5323000, total: 12618700, desc: 'Australia depth plus one corridor and production platform' },
  { name: 'Accelerated', y0: 2398000, y1: 4500000, y2: 7500000, y3: 10600000, total: 24998000, desc: 'Multiple countries, larger team, premium data, higher event operations' },
];

export const STAFFING = [
  { role: 'Chief Data Officer (CDO) — Fractional', seniority: 'Executive', engagement: 'Contract (0.2 FTE)', rate: '2,000–3,000/day', duration: '12 months (1 day/wk)', total: '104,000–156,000', source: 'Proxy: Technology Director rates [UNVERIFIED — fractional CDO market is thin]' },
  { role: 'Data Engineering Lead / Principal', seniority: 'Senior', engagement: 'FTE or 12-mo contract', rate: '160,000–195,000/yr; 1,000–1,245/day', duration: '12 months', total: '192,000–234,000 (loaded)', source: 'Clicks; Morgan McKinley' },
  { role: 'Senior Data Engineer (x2)', seniority: 'Senior', engagement: 'FTE', rate: '130,000–160,000/yr each', duration: '12 months', total: '312,000–384,000 (loaded, x2)', source: 'Clicks; Hays' },
  { role: 'Data Architect', seniority: 'Senior', engagement: 'Contract 6 mo then fractional', rate: '155,000–195,000/yr; 1,000–1,200/day', duration: '6 mo full + 6 mo fractional', total: '130,000–175,000', source: 'Robert Half; second source [UNVERIFIED]' },
  { role: 'BI Developer / Analyst (x2)', seniority: 'Mid-Senior', engagement: 'FTE', rate: '120,000–150,000/yr each', duration: '12 months', total: '288,000–360,000 (loaded, x2)', source: 'SEEK Technical BA proxy; Robert Half [UNVERIFIED]' },
  { role: 'Data Analyst (x2)', seniority: 'Mid', engagement: 'FTE', rate: '100,000–130,000/yr each', duration: '12 months', total: '240,000–312,000 (loaded, x2)', source: 'SEEK Technical BA proxy; Robert Half [UNVERIFIED]' },
  { role: 'Marketing Data Analyst', seniority: 'Mid', engagement: 'FTE', rate: '100,000–130,000/yr', duration: '12 months', total: '120,000–156,000 (loaded)', source: 'General analyst proxy [UNVERIFIED]' },
  { role: 'Data Governance Analyst', seniority: 'Mid', engagement: 'FTE', rate: '100,000–130,000/yr', duration: '12 months', total: '120,000–156,000 (loaded)', source: 'General analyst proxy [UNVERIFIED]' },
  { role: 'Cloud / DevOps Engineer', seniority: 'Senior', engagement: 'FTE', rate: '150,000–180,000/yr', duration: '12 months', total: '180,000–216,000 (loaded)', source: 'Hays; Robert Half [UNVERIFIED — direct DevOps benchmark not sourced]' },
  { role: 'Privacy / Compliance Consultant', seniority: 'Specialist', engagement: 'Contract (2 days/wk)', rate: '1,200–2,000/day', duration: '12 months', total: '124,800–208,000', source: 'Consulting/legal rates' },
  { role: 'Project Manager (Data & Technology)', seniority: 'Senior', engagement: 'FTE or contract', rate: '120,000–150,000/yr', duration: '12 months', total: '144,000–180,000 (loaded)', source: 'Clicks; general PM market' },
  { role: 'UX/UI Designer (Reporting & Dashboards)', seniority: 'Mid-Senior', engagement: 'Contract 6 mo then fractional', rate: '100,000–135,000/yr; 700–1,000/day', duration: '6 mo full + 6 mo fractional', total: '70,000–105,000', source: 'SEEK; Hays' },
];
export const STAFFING_TOTAL = '2,024,800–2,842,000';

export const STAFFING_PHASES = [
  { stage: 'Verification / Discovery (Months 0–3)', team: 'Fractional CDO, PM, 1 Data Engineer, Privacy Consultant, Legal', cost: '350,000–650,000' },
  { stage: 'MVP Build (Months 4–12)', team: 'PM, 2 Data Engineers, Architect (fractional), Designer (fractional), Privacy Consultant', cost: '900,000–1,500,000' },
  { stage: 'Australia Scale (Year 2)', team: 'Add: BI Developer, 2 Data Analysts, Marketing Analyst, Operations, Growth, QA', cost: '1,600,000–2,700,000' },
  { stage: 'Multi-Country (Year 3)', team: 'Add: Local market operations, dedicated compliance/security, governance', cost: '2,800,000–5,000,000+' },
];

export const CONSULTING = {
  strategy: [
    { service: 'Market entry strategy (Australia deep-dive)', provider: 'Boutique strategy consultancy', cost: '50,000–120,000', duration: '4–8 weeks' },
    { service: 'Market entry strategy (international corridor)', provider: 'Boutique or Big 4 advisory', cost: '80,000–200,000', duration: '6–12 weeks per market' },
    { service: 'Brand and go-to-market strategy', provider: 'Specialist marketing consultancy', cost: '40,000–100,000', duration: '4–8 weeks' },
  ],
  legal: [
    { market: 'Australia', scope: 'Entity verification, consumer law, privacy, tax, ABR/ASIC', cost: '35,000–80,000' },
    { market: 'United Kingdom', scope: 'UK GDPR, consumer law, VAT, performer visas, entity options', cost: '40,000–100,000' },
    { market: 'United States', scope: 'FTC compliance, state laws, CCPA, tax, immigration, entity', cost: '60,000–150,000' },
    { market: 'Canada', scope: 'PIPEDA, provincial laws, tax, immigration, entity', cost: '30,000–80,000' },
    { market: 'European Union', scope: 'GDPR, country-specific consumer/tax law, entity options', cost: '50,000–120,000' },
  ],
  advisory: [
    { service: 'Data strategy and architecture review', provider: 'Big 4 (Deloitte, PwC, KPMG, EY)', cost: '150,000–400,000', duration: '6–10 weeks' },
    { service: 'Technology due diligence', provider: 'Specialist technology advisory', cost: '50,000–150,000', duration: '4–6 weeks' },
    { service: 'Privacy impact assessment (multi-jurisdiction)', provider: 'Privacy specialist', cost: '60,000–150,000', duration: '6–10 weeks' },
  ],
  totals: { low: '645,000', base: '1,147,500', high: '1,650,000' },
};

export const DATA_ACQUISITION = {
  oneTime: [
    { item: 'IBISWorld industry reports (AU live entertainment)', cat: 'A', purpose: 'Market sizing baseline', cost: '3,000–8,000' },
    { item: 'Statista annual access', cat: 'A', purpose: 'Cross-market statistics reference', cost: '7,750–15,500' },
    { item: 'ABS Census custom tabulations', cat: 'B', purpose: 'Diaspora demographic profiling', cost: '0–2,000' },
    { item: 'UK Census / ONS custom data', cat: 'B', purpose: 'UK diaspora profiling', cost: '0–1,500' },
  ],
  oneTimeTotal: '10,750–27,000',
  annual: [
    { item: 'Similarweb (Pro plan)', cat: 'C', cost: '15,500–30,000', why: 'Competitor traffic analysis across target markets' },
    { item: 'SEMrush (Business plan)', cat: 'C', cost: '3,100–6,200', why: 'SEO/SEM intelligence for cultural entertainment keywords' },
    { item: 'Apollo.io (Professional)', cat: 'D', cost: '1,800–3,600', why: 'B2B promoter and venue prospecting' },
    { item: 'OpenCage (Medium plan)', cat: 'F', cost: '930–2,800', why: 'Geocoding for venue/audience analytics' },
    { item: 'Avalara (starter tier)', cat: 'E', cost: '7,750–15,500', why: 'Multi-jurisdiction tax compliance (when scaling)' },
  ],
  annualTotal: '29,080–58,100',
  apis: [
    { item: 'Google Maps Platform', cat: 'F', cost: '775–3,100', basis: '100k–400k geocoding calls' },
    { item: 'Census Bureau API', cat: 'B', cost: '0', basis: 'Free with registration' },
    { item: 'BLS/BEA APIs', cat: 'B', cost: '0', basis: 'Free' },
    { item: 'Eurostat API', cat: 'B', cost: '0', basis: 'Free' },
    { item: 'People Data Labs (trial)', cat: 'D', cost: '1,550–4,650', basis: 'Enrichment pilot' },
  ],
  apiTotal: '2,325–7,750',
};

export const CLOUD = {
  setup: [
    { item: 'AWS account structure and IAM configuration', cost: '5,000–15,000' },
    { item: 'Networking (VPC, subnets, security groups)', cost: '3,000–8,000' },
    { item: 'Logging and monitoring baseline', cost: '2,000–5,000' },
    { item: 'S3 bucket structure and encryption', cost: '1,000–3,000' },
    { item: 'Redshift Serverless initial configuration', cost: '2,000–5,000' },
    { item: 'CI/CD pipeline setup', cost: '3,000–8,000' },
    { item: 'Security baseline (WAF, Secrets Manager, KMS)', cost: '5,000–12,000' },
    { item: 'Development and test environment setup', cost: '5,000–10,000' },
  ],
  setupTotal: '26,000–66,000',
  monthlyTiers: [
    { component: 'Compute (EC2/Lambda/ECS)', t10k: '500–2,000', t100k: '3,000–10,000', t1m: '15,000–50,000' },
    { component: 'Storage (S3, EBS)', t10k: '200–800', t100k: '1,000–4,000', t1m: '5,000–20,000' },
    { component: 'Database (RDS/Redshift)', t10k: '500–2,500', t100k: '3,000–15,000', t1m: '15,000–60,000' },
    { component: 'Data processing (Glue/EMR)', t10k: '300–1,500', t100k: '2,000–8,000', t1m: '10,000–40,000' },
    { component: 'Networking (CloudFront, ALB, NAT)', t10k: '200–800', t100k: '1,000–5,000', t1m: '5,000–25,000' },
    { component: 'Monitoring and logging', t10k: '100–500', t100k: '500–2,000', t1m: '2,000–8,000' },
  ],
  monthlyTotals: { t10k: '1,800–8,100', t100k: '10,500–44,000', t1m: '52,000–203,000' },
  annualTotals: { t10k: '21,600–97,200', t100k: '126,000–528,000', t1m: '624,000–2,436,000' },
};

export const AI_LEDGER = {
  lines: [
    { line: 1, desc: 'AI model input tokens (prompt and context)', unit: 'Million tokens', qty: '0.15–0.25', unitCost: '15.50–46.50', total: '2.33–11.63' },
    { line: 2, desc: 'AI model output tokens (deliverable generation)', unit: 'Million tokens', qty: '0.30–0.50', unitCost: '46.50–93.00', total: '13.95–46.50' },
    { line: 3, desc: 'Web search and grounding queries', unit: 'Queries', qty: '50–150', unitCost: '0.08–0.31', total: '3.88–46.50' },
    { line: 4, desc: 'Extended research sessions (deep research mode)', unit: 'Sessions', qty: '3–8', unitCost: '7.75–15.50', total: '23.25–124.00' },
    { line: 5, desc: 'Human research direction, review and quality assurance', unit: 'Hours', qty: '8–16', unitCost: '150.00–250.00', total: '1,200.00–4,000.00' },
    { line: 6, desc: 'Platform subscription (pro-rata allocation)', unit: 'Monthly', qty: '0.5–1.0', unitCost: '31.00–310.00', total: '15.50–310.00' },
  ],
  subtotal: '1,258.91–4,538.63', gst: '125.89–453.86', total: '1,384.80–4,992.49',
  invoiceNo: 'ABE-2026-TKT-001', terms: '14 days from date of invoice',
  limitation: 'Actual platform invoices, token measurements, cache utilisation, search charges, labour timesheets and applicable tax were not provided. This is an estimated cost framework based on publicly available AI platform pricing, not a verified expenditure record.',
};

export const ROI_MATRIX = {
  benefits: [2000000, 5000000, 8000000, 12600000, 20000000, 30000000],
  rows: [
    { benefit: '2,000,000', lean: '-60%', base: '-84%', accel: '-92%' },
    { benefit: '5,000,000', lean: '0%', base: '-60%', accel: '-80%' },
    { benefit: '8,000,000', lean: '60%', base: '-37%', accel: '-68%' },
    { benefit: '12,600,000', lean: '152%', base: '0%', accel: '-50%' },
    { benefit: '20,000,000', lean: '300%', base: '59%', accel: '-20%' },
    { benefit: '30,000,000', lean: '500%', base: '138%', accel: '20%' },
  ],
};

export const VOLUME_HURDLES = [
  { target: 'Recover Lean TCO (5.0m)', tickets: '1,174,000', annual: '391,000' },
  { target: 'Recover Base TCO (12.6m)', tickets: '2,958,000', annual: '986,000' },
  { target: 'Recover Accelerated TCO (25.0m)', tickets: '5,869,000', annual: '1,956,000' },
];

// One-analyst capacity framing (user requirement) built strictly from D5 benchmarks
export const ANALYST_FRAMING = {
  analystSalary: 'AUD 100,000–130,000/yr (Data Analyst, mid level — SEEK Technical BA proxy / Robert Half [UNVERIFIED])',
  analystLoaded: 'AUD 120,000–156,000/yr loaded (20% on-cost assumption [EST])',
  consultingRate: 'AUD 150–250/hr (Australian consulting rates, AI research ledger basis)',
  seniorEngineerLoaded: 'AUD 156,000–192,000/yr loaded (Senior Data Engineer 130,000–160,000 base)',
  note: 'The Base Programme TCO of AUD 12.62m over three years is equivalent to roughly 81–105 analyst-years at the loaded mid-level analyst benchmark — the correct comparison is capability: the platform substitutes repeatable, governed pipelines for manual analyst effort that a single analyst could not sustain across five markets and 60 data sources.',
};

export const INVESTMENT_SUMMARY_D3 = {
  rows: [
    { cat: 'Verification and One-Time Implementation', y1: 1092000, y2: 250000, y3: 200000 },
    { cat: 'People (loaded)', y1: 1200000, y2: 1850000, y3: 2500000 },
    { cat: 'Cloud, Data and Technology', y1: 250000, y2: 450000, y3: 750000 },
    { cat: 'Security, Privacy and Legal', y1: 100000, y2: 160000, y3: 240000 },
    { cat: 'Market Entry and Pilot Operations', y1: 300000, y2: 650000, y3: 1000000 },
    { cat: 'Contingency (10–15%)', y1: 294000, y2: 336000, y3: 469000 },
  ],
  totals: { y1: 3236000, y2: 3696000, y3: 5159000, cumulative: 12091000 },
};

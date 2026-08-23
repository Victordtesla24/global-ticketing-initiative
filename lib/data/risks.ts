// Risk Analysis — ten self-assessed risk categories, the registry findings behind the two
// highest-scored rows, and the blocking unknowns that gate the programme.
// Colour scale: green 1–8, amber 9–16, red 17–25.

export interface Risk { id: number; name: string; likelihood: number; impact: number; score: number; mitigation: string; }

export const RISK_LEDE =
  'Ten risk categories, each self-assessed on likelihood and impact (1–5 on each axis, giving a score out of 25). Two risks sit at the maximum score — entity ambiguity and the financial evidence gap — and they are the direct basis for the staged, evidence-led investment sequence set out on this site. Select any marker to inspect its mitigation.';

export const RISK_BASIS_NOTE =
  'This page’s risk scores are the promoter’s own self-assessment (likelihood × impact, 1–5 each), not a third-party or actuarial rating — every score on this page is presented on that basis.';

export const RISK_LANDSCAPE = {
  stats: [
    { label: 'Risk categories assessed', value: '10', note: 'Likelihood × Impact, 1–5 each' },
    { label: 'Risks at the maximum score (25)', value: '2', note: 'Entity ambiguity; financial evidence gap' },
    { label: 'Risks scoring 20 or higher', value: '6', note: 'Rows 1–4, 6 and 7 of the register below (row 5 scores 16)' },
  ],
  provenance:
    'Counted from the risk register below: rows 1–4 and 6–7 score 25, 25, 20, 20, 20, 20 — two at the maximum and four more at 20, six at or near it. Row 5 scores 16 and does not qualify.',
};

export const RISKS: Risk[] = [
  { id: 1, name: 'Entity ambiguity', likelihood: 5, impact: 5, score: 25, mitigation: 'Obtain certified registry documents, cap table, IP assignments' },
  { id: 2, name: 'Financial evidence gap', likelihood: 5, impact: 5, score: 25, mitigation: 'Commission audited statements and settlement reconciliation' },
  { id: 3, name: 'Privacy/consent failure', likelihood: 4, impact: 5, score: 20, mitigation: 'Data map, purpose review, consent remediation' },
  { id: 4, name: 'Cybersecurity/fraud', likelihood: 4, impact: 5, score: 20, mitigation: 'Secure SDLC, MFA, WAF, bot defence' },
  { id: 5, name: 'Pricing non-compliance', likelihood: 4, impact: 4, score: 16, mitigation: 'All-in pricing engine and legal review' },
  { id: 6, name: 'Weak inventory', likelihood: 4, impact: 5, score: 20, mitigation: 'Partner-led pilot, minimum inventory commitments' },
  { id: 7, name: 'CAC exceeds contribution', likelihood: 4, impact: 5, score: 20, mitigation: 'Channel caps, incrementality tests, referral loops' },
  { id: 8, name: 'Scalability failure', likelihood: 3, impact: 5, score: 15, mitigation: 'Load tests, queues, rate limits, recovery drills' },
  { id: 9, name: 'Immigration disruption', likelihood: 3, impact: 4, score: 12, mitigation: 'Local sponsor, lead times, cancellation cover' },
  { id: 10, name: 'Competitive retaliation', likelihood: 4, impact: 4, score: 16, mitigation: 'Niche inventory, non-exclusive partnerships' },
];

export const RISK_REGISTER_PROVENANCE =
  'Row scores are self-assessed ratings with the arithmetic recomputed (likelihood × impact). Mitigation wording (“certified,” “audited,” “secure,” “committed”) describes documents and controls yet to be obtained, not documents that already exist: no written PSP, legal, insurance, entity or QSA quotes are on file, and no IP, domain, trademark, source-code or merchant-account due diligence has been performed.';

export function riskColour(score: number): string {
  if (score >= 17) return '#DC2626';
  if (score >= 9) return '#F59E0B';
  return '#22C55E';
}

// Registry findings behind the two maximum-score risks. They change no risk score.
export const REGISTRY_CHECKS = {
  title: 'What the Public Registers Show Behind the Two Maximum-Score Risks',
  rows: [
    {
      heading: 'Row 1 — entity ambiguity (25) — is not hypothetical; it is documented in the public registers.',
      body:
        'First-hand searches on 2026-08-23 — a registry lookup, not the full ownership due diligence, which remains unperformed: ABN Lookup returns “No matching names found” for Ticketalay — no entity of that name is registered in Australia — and no active ABN is named exactly “AB Entertainment”. The registrant of ticketalay.com.au is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership trading as A&B ENTERTAINMENTS (VIC 3030, active since 07 Nov 2022), not registered for GST — not any Ticketalay or PAC Theatre Entertainment entity. The domain’s auDA RDAP record carries status “server renew prohibited” — “Not Currently Eligible For Renewal” (last changed 2026-08-16): the proof market’s named domain may lapse. This is a time-critical adverse fact on the G0 critical path — the ownership memorandum must resolve the renewal flag and name the actual legal counterparty before any agreement is signed.',
    },
    {
      heading: 'Row 2 — financial evidence gap (25) — the engagement reality behind the install band.',
      body:
        'The 100,000+ Google Play downloads attach to the India-only product and count cumulative installs, not users or buyers. The engagement actually visible first-hand: 386 Google Play ratings at 3.36 stars and 45 App Store ratings at 2.62 stars (both India storefronts, accessed 2026-08-23). No audited statements, settlement records or first-party exports are on file; the install band is the only platform-metered figure in evidence, and it is not financial evidence.',
    },
  ],
  provenance:
    'All items fetched first-hand on 2026-08-23: ABN Lookup active search (abr.business.gov.au), ABN 91 819 759 805 detail, auDA RDAP via rdap.org/domain/ticketalay.com.au, the Google Play listing and the Apple lookup API.',
};

export const TOP5_INTRO = 'Ranked by the promoter’s own assessment of urgency and leverage across the programme.';

export const TOP5_MITIGATIONS = [
  { rank: 1, risk: 'Legal-entity and ownership ambiguity', mitigation: 'Obtain certified registry documents, cap table and IP assignments' },
  { rank: 2, risk: 'Insufficient first-party financial evidence', mitigation: 'Commission audited statements and settlement reconciliation' },
  { rank: 3, risk: 'Data privacy or consent failure', mitigation: 'Complete data map, purpose review and consent remediation' },
  { rank: 4, risk: 'Weak promoter or venue inventory', mitigation: 'Secure minimum three contracted pilot events' },
  { rank: 5, risk: 'Customer acquisition costs exceed contribution', mitigation: 'Set channel caps, measure incrementality, build referral loops' },
];

// Open item attached to the Top Five Mitigations.
export const RISK_OPEN_ITEM = {
  ref: 'U-03',
  title: 'Zero named, signed promoter or venue counterparties exist today',
  unknown:
    'Row 4’s “minimum three contracted pilot events” is a target to secure, not existing inventory.',
  owner: 'Commercial lead (currently unassigned — leadership team to appoint).',
  action:
    'Secure a minimum of three signed pilot-event agreements or dated letters of intent with named promoters/venues before any pilot is scheduled, priced or insured.',
};

// Blocking unknowns (U-02–U-07) — every one gates the programme, and none is priced or
// resolved. U-02 is the AB partnership terms: modelling revenue share, cost share, capital
// contribution or control on an assumption is fabrication and is prohibited.
export const RISK_BLOCKING_UNKNOWNS = [
  {
    ref: 'U-02',
    title: 'AB Entertainment ↔ Ticketalay partnership terms (U-02, BLOCKING)',
    unknown:
      'The financial terms of the AB Entertainment ↔ Ticketalay partnership — revenue share, cost share, capital contribution, control — have never been disclosed. No P&L for either party can be drawn until they exist on paper, and modelling any of them on an assumption is fabrication and is prohibited.',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal.',
    action: 'Execute a written term sheet or heads of agreement; disclose it to the leadership team. Legal drafting cost per the U-05 quote round.',
  },
  {
    ref: 'U-03',
    title: 'Contracted promoter/venue supply (U-03, BLOCKING)',
    unknown:
      'Zero named, signed counterparties; zero LOIs. No ticket-volume figure has contracted supply behind it, and the pilot cannot be scheduled, priced or insured without at least one dated counterparty.',
    owner: 'Commercial lead (currently unassigned — leadership team to appoint).',
    action: 'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues.',
  },
  {
    ref: 'U-04',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04, BLOCKING)',
    unknown:
      'No study exists. Take rate (8–12%), ATV, repeat purchase and conversion assumptions are all unevidenced for the actual target audience.',
    owner: 'Research lead (currently unassigned).',
    action:
      'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief.',
  },
  {
    ref: 'U-05',
    title: 'Written PSP, legal, insurance, entity and QSA quotes (U-05, BLOCKING)',
    unknown:
      'None on file. Every professional-services cost on this programme is therefore unquoted, and legal fees are never proxied from consultant day rates.',
    owner: 'CEO / company secretary.',
    action:
      'Request written quotes: AU entity + IP due diligence (law firm), PSP onboarding (Stripe/Adyen AU), insurance broker, QSA. Quote requests are free.',
  },
  {
    ref: 'U-06',
    title: 'IP, domain, trademark, source-code and merchant-account due diligence (U-06, BLOCKING)',
    unknown:
      'Never performed. Ownership of the thing being expanded is unestablished: who owns the Ticketalay code, brand, app-store accounts and the .com.au domain is unknown.',
    owner: 'CEO together with the appointed law firm.',
    action: 'Commission the due-diligence memorandum — this proposal’s own “FIRST” commitment. Cost per the U-05 quote.',
  },
  {
    ref: 'U-07',
    title: 'Ticketalay first-party data (U-07, BLOCKING)',
    unknown:
      'Schema, ownership, consent state and export rights are all unverified — the “non-negotiable foundation” of the entire data programme has never been inspected.',
    owner: 'Ticketalay principal.',
    action: 'Provide the database dictionary, a consent-register sample and app-console exports under NDA (nil cost — internal disclosure).',
  },
];

export const FOUNDATION_STATEMENT =
  'The two highest risks — entity ambiguity and financial evidence, both scored 25 — cannot be mitigated by product design or marketing spend, only by documentary evidence. This is why the foundation work (legal-entity confirmation, audited financials, signed pilot agreements) leads the programme sequence, ahead of any market-entry or platform spend.';

export const FOUNDATION_PROVENANCE =
  'Self-assessment, and an accurate description of the register above — consistent with the acknowledged gaps: no written professional-services quotes on file, and no ownership due diligence performed.';

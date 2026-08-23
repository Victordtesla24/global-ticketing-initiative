// Risk Analysis — corrected per the adversarial audit.
// Sources: workflow/register_by_route/risk.json (CL-0370–CL-0397, cross-referenced to
// T0-140…T0-149); Ground-Truth Register GT-04–GT-13; unresolved_register.md U-02–U-07.
// Scores are unchanged (all 28 register claims verified); the audit corrected one
// internally-inconsistent summary line (CL-0371), added the U-03 open item, first-hand
// registry findings, and the blocking unknowns from the unresolved register.
// Colour scale: green 1–8, amber 9–16, red 17–25.

export interface Risk { id: number; name: string; likelihood: number; impact: number; score: number; mitigation: string; }

export const RISK_LEDE =
  'Ten risk categories, each self-assessed on likelihood and impact (1–5 on each axis, giving a score out of 25). Two risks sit at the maximum score — entity ambiguity and the financial evidence gap — and they are the direct basis for the staged, evidence-led investment sequence set out on this site. Select any marker to inspect its mitigation.';

export const RISK_AUDIT_NOTE = {
  removed: '0 claims removed from this page by the adversarial audit — see register.',
  detail:
    'This page’s risk scores are the promoter’s own self-assessment (likelihood × impact, 1–5 each), not a third-party or actuarial rating — every score on this page is presented on that basis. The audit found one internally-inconsistent summary line, corrected below; every other claim on this page verified against the site’s own register. Ledger: CL-0370–CL-0397, cross-referenced to T0-140…T0-149.',
};

// The Risk Landscape stat tiles (corrected tally, CL-0371).
export const RISK_LANDSCAPE = {
  stats: [
    { label: 'Risk categories assessed', value: '10', note: 'Likelihood × Impact, 1–5 each' },
    { label: 'Risks at the maximum score (25)', value: '2', note: 'Entity ambiguity; financial evidence gap' },
    { label: 'Risks scoring 20 or higher', value: '6', note: 'Rows 1–4, 6 and 7 of the register below (row 5 scores 16)' },
  ],
  provenance:
    'Corrected from the original page, which stated “Four risks sit at or near the maximum score” — the site’s own register (reproduced below) shows two risks at 25 and four more at 20, six at or near the maximum, matching neither reading of “four.” Ledger ID CL-0371, cross-ref: RISK REGISTER rows 1–4 and 6–7 (25, 25, 20, 20, 20, 20); row 5 scores 16 and does not qualify.',
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
  'Row scores verified as self-assessed ratings with correct arithmetic (likelihood × impact) against T0-140…T0-149. Mitigation wording (“certified,” “audited,” “secure,” “committed”) describes documents and controls yet to be obtained, not documents that already exist — consistent with the confirmed gaps at GT-08 (no written PSP/legal/insurance/entity/QSA quotes on file) and GT-09 (no IP, domain, trademark, source-code or merchant-account due diligence performed). See unresolved_register.md U-05, U-06.';

export function riskColour(score: number): string {
  if (score >= 17) return '#DC2626';
  if (score >= 9) return '#F59E0B';
  return '#22C55E';
}

// Audit additions supporting the promoter's own two highest-scored risks.
// They change no risk score and remove no claim.
export const REGISTRY_CHECKS = {
  title: 'What the Audit’s First-Hand Registry Checks Add to the Two Maximum-Score Risks',
  rows: [
    {
      heading: 'Row 1 — entity ambiguity (25) — is not hypothetical; it is documented in the public registers.',
      body:
        'First-hand searches on 2026-08-23 (audit addition; a registry lookup, not the full GT-09 due diligence, which remains unperformed): ABN Lookup returns “No matching names found” for Ticketalay — no entity of that name is registered in Australia — and no active ABN is named exactly “AB Entertainment”. The registrant of ticketalay.com.au is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership trading as A&B ENTERTAINMENTS (VIC 3030, active since 07 Nov 2022), not registered for GST — not any Ticketalay or PAC Theatre Entertainment entity. The domain’s auDA RDAP record carries status “server renew prohibited” — “Not Currently Eligible For Renewal” (last changed 2026-08-16): the proof market’s named domain may lapse. This is a time-critical adverse fact on the G0 critical path — the ownership memorandum (U-06) must resolve the renewal flag and name the actual legal counterparty before any agreement is signed.',
    },
    {
      heading: 'Row 2 — financial evidence gap (25) — the engagement reality behind the install band.',
      body:
        'The 100,000+ Google Play downloads attach to the India-only product (GT-10) and count cumulative installs, not users or buyers. The engagement actually visible first-hand: 386 Google Play ratings at 3.36 stars and 45 App Store ratings at 2.62 stars (both India storefronts, accessed 2026-08-23). No audited statements, settlement records or first-party exports are on file (U-07); the install band is the only platform-metered figure in evidence, and it is not financial evidence.',
    },
  ],
  provenance:
    'Source: workflow/verify/entity-reality-reaudit.md (all items fetched first-hand 2026-08-23) — ABN Lookup active search (abr.business.gov.au), ABN 91 819 759 805 detail, auDA RDAP via rdap.org/domain/ticketalay.com.au, the Google Play listing and the Apple lookup API. These facts are audit additions supporting the promoter’s own two highest-scored risks; they change no risk score and remove no claim.',
};

export const TOP5_INTRO = 'Ranked by the promoter’s own assessment of urgency and leverage across the programme.';

export const TOP5_MITIGATIONS = [
  { rank: 1, risk: 'Legal-entity and ownership ambiguity', mitigation: 'Obtain certified registry documents, cap table and IP assignments' },
  { rank: 2, risk: 'Insufficient first-party financial evidence', mitigation: 'Commission audited statements and settlement reconciliation' },
  { rank: 3, risk: 'Data privacy or consent failure', mitigation: 'Complete data map, purpose review and consent remediation' },
  { rank: 4, risk: 'Weak promoter or venue inventory', mitigation: 'Secure minimum three contracted pilot events' },
  { rank: 5, risk: 'Customer acquisition costs exceed contribution', mitigation: 'Set channel caps, measure incrementality, build referral loops' },
];

// Open item attached to the Top Five Mitigations (spec /risk ADD #1; U-03 / GT-06).
export const RISK_OPEN_ITEM = {
  ref: 'U-03 / GT-06',
  title: 'Zero named, signed promoter or venue counterparties exist today',
  unknown:
    'Row 4’s “minimum three contracted pilot events” is a target to secure, not existing inventory.',
  owner: 'Commercial lead (currently unassigned — leadership team to appoint).',
  action:
    'Secure a minimum of three signed pilot-event agreements or dated letters of intent with named promoters/venues before any pilot is scheduled, priced or insured. Source: unresolved_register.md U-03 (GT-06).',
};

// Blocking unknowns from the unresolved register (U-02–U-07) — every one gates the
// programme, and none is priced or resolved. U-02 is the AB partnership terms (GT-04):
// modelling revenue share, cost share, capital contribution or control on an assumption
// is fabrication and is prohibited.
export const RISK_BLOCKING_UNKNOWNS = [
  {
    ref: 'U-02 / GT-04',
    title: 'AB Entertainment ↔ Ticketalay partnership terms (U-02 / GT-04, BLOCKING)',
    unknown:
      'The financial terms of the AB Entertainment ↔ Ticketalay partnership — revenue share, cost share, capital contribution, control — have never been disclosed. Every revenue, cost and ROI line on the original site implicitly assumed an economic split that has never existed on paper; no P&L for either party can be drawn until the terms do. Modelling any of them on an assumption is fabrication and is prohibited (GT-04).',
    owner: 'CEO, AB Entertainment, together with the Ticketalay principal.',
    action: 'Execute a written term sheet or heads of agreement; disclose it to the leadership team. Legal drafting cost per the U-05 quote round.',
  },
  {
    ref: 'U-03 / GT-06',
    title: 'Contracted promoter/venue supply (U-03 / GT-06, BLOCKING)',
    unknown:
      'Zero named, signed counterparties; zero LOIs. Every ticket-volume figure previously published derived from a modelling default, not supply. The pilot cannot be scheduled, priced or insured without at least one dated counterparty.',
    owner: 'Commercial lead (currently unassigned — leadership team to appoint).',
    action: 'Secure a minimum of three signed pilot-event agreements or dated LOIs with named promoters/venues.',
  },
  {
    ref: 'U-04 / GT-07',
    title: 'Primary diaspora demand, fee-tolerance and platform-trust evidence (U-04 / GT-07, BLOCKING)',
    unknown:
      'No study exists. Take rate (8–12%), ATV, repeat purchase and conversion assumptions are all unevidenced for the actual target audience.',
    owner: 'Research lead (currently unassigned).',
    action:
      'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (willingness-to-pay, fee tolerance, channel trust); obtain quotes — not priceable without a brief (GT-08).',
  },
  {
    ref: 'U-05 / GT-08',
    title: 'Written PSP, legal, insurance, entity and QSA quotes (U-05 / GT-08, BLOCKING)',
    unknown:
      'None on file. Every professional-services figure previously published was unquoted, and the mandate prohibits proxying legal fees from consultant day rates.',
    owner: 'CEO / company secretary.',
    action:
      'Request written quotes: AU entity + IP due diligence (law firm), PSP onboarding (Stripe/Adyen AU), insurance broker, QSA. Quote requests are free.',
  },
  {
    ref: 'U-06 / GT-09',
    title: 'IP, domain, trademark, source-code and merchant-account due diligence (U-06 / GT-09, BLOCKING)',
    unknown:
      'Never performed. Ownership of the thing being expanded is unestablished: who owns the Ticketalay code, brand, app-store accounts and the .com.au domain is unknown.',
    owner: 'CEO together with the appointed law firm.',
    action: 'Commission the due-diligence memorandum (the site’s own “FIRST” commitment, correctly scoped). Cost per the U-05 quote.',
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
  'Self-assessment, verified as an accurate description of the register above and consistent with the acknowledged evidence gaps at GT-08 and GT-09.';

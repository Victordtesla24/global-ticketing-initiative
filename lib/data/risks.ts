// Risk Analysis — ten self-assessed risk categories and the register findings behind the
// two highest-scored rows.
// Colour scale: green 1–8, amber 9–16, red 17–25.

export interface Risk { id: number; name: string; likelihood: number; impact: number; score: number; mitigation: string; }

export const RISK_LEDE =
  'Ten risk categories, each self-assessed on likelihood and impact (1–5 on each axis, giving a score out of 25). Two risks sit at the maximum score — entity ambiguity and the financial evidence gap — and they are the direct basis for the staged, evidence-led investment sequence this proposal sets out. Select any marker to inspect its mitigation.';

export const RISK_BASIS_NOTE =
  'The risk scores on this page are the promoter’s own self-assessment — likelihood × impact, 1–5 on each axis — not a third-party or actuarial rating. Every score here is presented on that basis.';

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
  'Row scores are self-assessed ratings with the arithmetic recomputed (likelihood × impact). Mitigation wording (“certified,” “audited,” “secure,” “committed”) describes the documents and controls each mitigation would put in place, not documents that already exist.';

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
        'Public register searches — a lookup rather than full ownership due diligence. ABN Lookup returns “No matching names found” for Ticketalay — no entity of that name is registered in Australia — and no active ABN is named exactly “AB Entertainment”. The registrant of ticketalay.com.au is ABN 91 819 759 805 — V DESHPANDE & A KADAM, a two-person family partnership trading as A&B ENTERTAINMENTS (VIC 3030, active since 07 Nov 2022), not registered for GST — not any Ticketalay or PAC Theatre Entertainment entity. The domain’s auDA RDAP record carries status “server renew prohibited” — “Not Currently Eligible For Renewal” (last changed 2026-08-16): the proof market’s named domain may lapse. This is a time-critical adverse fact on the G0 critical path — the ownership memorandum must resolve the renewal flag and name the actual legal counterparty before any agreement is signed.',
    },
    {
      heading: 'Row 2 — financial evidence gap (25) — the engagement reality behind the install band.',
      body:
        'The 100,000+ Google Play downloads attach to the India-only product and count cumulative installs, not users or buyers. The engagement actually visible in public: 386 Google Play ratings at 3.36 stars and 45 App Store ratings at 2.62 stars, both on India storefronts. No audited statements, settlement records or first-party exports are on file; the install band is the only platform-metered figure in evidence, and it is not financial evidence.',
    },
  ],
  provenance:
    'Sources: ABN Lookup active search (abr.business.gov.au); the ABN 91 819 759 805 detail record; auDA RDAP via rdap.org/domain/ticketalay.com.au; the Google Play listing; and the Apple lookup API.',
};

export const TOP5_INTRO = 'Ranked by the promoter’s own assessment of urgency and leverage across the programme.';

export const TOP5_MITIGATIONS = [
  { rank: 1, risk: 'Legal-entity and ownership ambiguity', mitigation: 'Obtain certified registry documents, cap table and IP assignments' },
  { rank: 2, risk: 'Insufficient first-party financial evidence', mitigation: 'Commission audited statements and settlement reconciliation' },
  { rank: 3, risk: 'Data privacy or consent failure', mitigation: 'Complete data map, purpose review and consent remediation' },
  { rank: 4, risk: 'Weak promoter or venue inventory', mitigation: 'Secure minimum three contracted pilot events' },
  { rank: 5, risk: 'Customer acquisition costs exceed contribution', mitigation: 'Set channel caps, measure incrementality, build referral loops' },
];

export const FOUNDATION_STATEMENT =
  'The two highest risks — entity ambiguity and financial evidence, both scored 25 — cannot be mitigated by product design or marketing spend, only by documentary evidence. This is why the foundation work (legal-entity confirmation, audited financials, signed pilot agreements) leads the programme sequence, ahead of any market-entry or platform spend.';

export const FOUNDATION_PROVENANCE =
  'Self-assessment, and an accurate description of the register above.';

// DELIVERABLE 3 — 10-risk dataset (verbatim). Colour scale: green 1–8, amber 9–16, red 17–25.
export interface Risk { id: number; name: string; likelihood: number; impact: number; score: number; mitigation: string; }

export const RISKS: Risk[] = [
  { id: 1, name: 'Entity ambiguity', likelihood: 5, impact: 5, score: 25, mitigation: 'Certified registry documents, cap table, IP assignments' },
  { id: 2, name: 'Financial evidence gap', likelihood: 5, impact: 5, score: 25, mitigation: 'Audited statements and settlement reconciliation' },
  { id: 3, name: 'Privacy/consent failure', likelihood: 4, impact: 5, score: 20, mitigation: 'Data map, purpose review, consent remediation' },
  { id: 4, name: 'Cybersecurity/fraud', likelihood: 4, impact: 5, score: 20, mitigation: 'Secure SDLC, MFA, WAF, bot defence' },
  { id: 5, name: 'Pricing non-compliance', likelihood: 4, impact: 4, score: 16, mitigation: 'All-in pricing engine and legal review' },
  { id: 6, name: 'Weak inventory', likelihood: 4, impact: 5, score: 20, mitigation: 'Partner-led pilot, minimum inventory commitments' },
  { id: 7, name: 'CAC exceeds contribution', likelihood: 4, impact: 5, score: 20, mitigation: 'Channel caps, incrementality tests, referral loops' },
  { id: 8, name: 'Scalability failure', likelihood: 3, impact: 5, score: 15, mitigation: 'Load tests, queues, rate limits, recovery drills' },
  { id: 9, name: 'Immigration disruption', likelihood: 3, impact: 4, score: 12, mitigation: 'Local sponsor, lead times, cancellation cover' },
  { id: 10, name: 'Competitive retaliation', likelihood: 4, impact: 4, score: 16, mitigation: 'Niche inventory, non-exclusive partnerships' },
];

export function riskColour(score: number): string {
  if (score >= 17) return '#DC2626';
  if (score >= 9) return '#F59E0B';
  return '#22C55E';
}

export const TOP5_MITIGATIONS = [
  { rank: 1, risk: 'Legal-entity and ownership ambiguity', mitigation: 'Obtain certified registry documents, cap table and IP assignments' },
  { rank: 2, risk: 'Insufficient first-party financial evidence', mitigation: 'Commission audited statements and settlement reconciliation' },
  { rank: 3, risk: 'Data privacy or consent failure', mitigation: 'Complete data map, purpose review and consent remediation' },
  { rank: 4, risk: 'Weak promoter or venue inventory', mitigation: 'Secure minimum three contracted pilot events' },
  { rank: 5, risk: 'Customer acquisition costs exceed contribution', mitigation: 'Set channel caps, measure incrementality, build referral loops' },
];

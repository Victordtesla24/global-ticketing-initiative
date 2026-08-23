// The revenue model — the honest identity, publishing no output number.

export const REVENUE_IDENTITY = {
  intro:
    'No take rate, CAC, ATV or repeat-purchase figure has been verified against first-party data, so no revenue projection is published. The only publishable revenue statement for Australia is the arithmetic identity itself:',
  formulaGross: 'Gross AU pilot revenue / yr = E × T × ATV × f',
  formulaShare: 'Ticketalay’s share of that gross = the above × s',
  outro:
    'No output number is published — every right-hand variable is [UNKNOWN], so any product of them would be fabrication. When U-02, U-03 and U-04 have each delivered, every variable graduates to a fact tag and the identity becomes computable per event and per gate — never as a cumulative hero number.',
};

export interface IdentityVariable {
  symbol: string;
  meaning: string;
  tag: string;
  confirms: string;
  when: string;
}

export const IDENTITY_VARIABLES: IdentityVariable[] = [
  {
    symbol: 'E',
    meaning: 'Events per year',
    tag: '[UNKNOWN]',
    confirms:
      'Commercial lead (role currently unassigned — LT to appoint) via U-03: ≥3 signed, dated pilot-event agreements or LOIs. E is then the contracted count, not a target.',
    when: 'Gate G1',
  },
  {
    symbol: 'T',
    meaning: 'Tickets per event (contracted capacity × evidenced sell-through)',
    tag: '[UNKNOWN]',
    confirms: 'Commercial lead via U-03 (capacity) + Research lead via U-04 (sell-through evidence)',
    when: 'Gate G1',
  },
  {
    symbol: 'ATV',
    meaning: 'Average transaction value, AUD',
    tag: '[UNKNOWN]',
    confirms:
      'Research lead via the U-04 willingness-to-pay study. The India INR ATV (gated by U-07) may serve only as a labelled India-only operational benchmark — never as AU demand evidence.',
    when: 'Gate G1; U-07 disclosure due 2026-09-30',
  },
  {
    symbol: 'f',
    meaning: 'Platform take rate',
    tag: '[UNKNOWN]',
    confirms:
      'Research lead via the U-04 fee-tolerance study. The 8–12% figure in the monetisation table is a stated target, not evidence. Audited ticketing-major filings are admissible only as a take-rate sanity benchmark, so labelled.',
    when: 'Gate G1',
  },
  {
    symbol: 's',
    meaning: 'Ticketalay’s share of gross (partnership split)',
    tag: '[UNKNOWN] — BLOCKING',
    confirms:
      'CEO, AB Entertainment + Ticketalay principal: executed written term sheet, disclosed to the LT. Not modelled at any value.',
    when: 'Gate G0 — before any revenue modelling',
  },
  {
    symbol: 'Repeat rate (multi-year only)',
    meaning: 'Share of buyers purchasing again in year 2+',
    tag: '[UNKNOWN]',
    confirms: 'Research lead via U-04; later validated against pilot transaction data',
    when: 'Gate G1 (study); post-pilot (actuals)',
  },
];

export const DATA_CONFIDENCE_NOTE =
  'Data-confidence note: every parameter in the research package’s revenue model was an assumption — no take rate, CAC, ATV or repeat-purchase figure has been verified against first-party data.';

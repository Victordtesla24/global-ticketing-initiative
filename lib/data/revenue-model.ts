// The revenue model — the honest identity, publishing no output number.
// Corrected per the adversarial audit: the interactive revenue projection sandbox, its
// presets and every model output were deleted (CL-0250–CL-0254, CL-0256–CL-0262,
// CL-0356–CL-0365, CL-0367); the data-confidence disclosure was retained (CL-0255,
// VERIFIED) and is now acted on. Source: artifacts/financial_rebuild.md §E.2.2, §E.3.

export const REVENUE_IDENTITY = {
  intro:
    'The deleted sandbox’s own data-confidence note said it plainly: every parameter in the model was an assumption, and no take rate, CAC, ATV or repeat-purchase figure had been verified against first-party data. That disclosure was accurate (adjudicated VERIFIED) and is now acted on rather than displayed beside the outputs it disclaimed. The only publishable revenue statement for Australia is the arithmetic identity itself:',
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
      'Commercial lead (role currently unassigned — LT to appoint) via U-03: ≥3 signed, dated pilot-event agreements or LOIs. E is then the contracted count, not a target. The deleted "48 events Year 1" was a slider default, not supply.',
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

// The retained (VERIFIED) data-confidence disclosure from the deleted sandbox (CL-0255).
export const DATA_CONFIDENCE_NOTE =
  'Data-confidence note (retained from the deleted model, adjudicated VERIFIED): every parameter in that model was an assumption from the research package — no take rate, CAC, ATV or repeat-purchase figure has been verified against first-party data.';

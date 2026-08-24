// The revenue model — the identity itself, publishing no output number.

export const REVENUE_IDENTITY = {
  intro:
    'No take rate, customer acquisition cost, average transaction value or repeat-purchase figure has been verified against first-party data, so no revenue projection is published. The only revenue statement that can be made for Australia is the arithmetic identity itself:',
  formulaGross: 'Gross AU pilot revenue / yr = E × T × ATV × f',
  formulaShare: 'Ticketalay’s share of that gross = the above × s',
  outro:
    'No output number is published: every right-hand variable is still to be confirmed, so any product of them would be invented. Once the partnership terms, the contracted supply and the primary demand study have each been delivered, every variable becomes a fact and the identity becomes computable per event and per gate — never as a single cumulative headline.',
};

export interface IdentityVariable {
  symbol: string;
  meaning: string;
  status: string;
  confirms: string;
  when: string;
}

export const IDENTITY_VARIABLES: IdentityVariable[] = [
  {
    symbol: 'E',
    meaning: 'Events per year',
    status: 'To be confirmed',
    confirms:
      'Commercial lead (role currently unassigned — leadership team to appoint), through at least three signed, dated pilot-event agreements or letters of intent. E is then the contracted count, not a target.',
    when: 'Gate G1',
  },
  {
    symbol: 'T',
    meaning: 'Tickets per event (contracted capacity × evidenced sell-through)',
    status: 'To be confirmed',
    confirms: 'Commercial lead for contracted capacity, and Research lead for sell-through evidence from the primary demand study',
    when: 'Gate G1',
  },
  {
    symbol: 'ATV',
    meaning: 'Average transaction value, AUD',
    status: 'To be confirmed',
    confirms:
      'Research lead, through the willingness-to-pay study. The India INR figure — itself dependent on the first-party data disclosure — may serve only as a labelled India-only operational benchmark, never as Australian demand evidence.',
    when: 'Gate G1; first-party data disclosure due 2026-09-30',
  },
  {
    symbol: 'f',
    meaning: 'Platform take rate',
    status: 'To be confirmed',
    confirms:
      'Research lead, through the fee-tolerance study. The 8–12% figure in the monetisation table is a stated target, not evidence. The audited filings of the ticketing majors are admissible only as a take-rate sanity benchmark, and are labelled as such.',
    when: 'Gate G1',
  },
  {
    symbol: 's',
    meaning: 'Ticketalay’s share of gross (partnership split)',
    status: 'To be confirmed — outstanding before any revenue modelling',
    confirms:
      'CEO, AB Entertainment, with the Ticketalay principal: an executed written term sheet, disclosed to the leadership team. Not modelled at any value.',
    when: 'Gate G0 — before any revenue modelling',
  },
  {
    symbol: 'Repeat rate (multi-year only)',
    meaning: 'Share of buyers purchasing again in year 2+',
    status: 'To be confirmed',
    confirms: 'Research lead, through the primary demand study; later validated against pilot transaction data',
    when: 'Gate G1 (study); post-pilot (actuals)',
  },
];

export const DATA_CONFIDENCE_NOTE =
  'Data-confidence note: every parameter in the research package’s revenue model was an assumption. No take rate, customer acquisition cost, average transaction value or repeat-purchase figure has been verified against first-party data.';

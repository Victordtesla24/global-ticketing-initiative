// DELIVERABLE 3, Visualisation 1 — revenue projection calculation engine (verbatim).
export interface ModelParams {
  cac: number;            // AUD 5–15, step 1
  atv: number;            // AUD 40–100, step 5
  takeRate: number;       // 5–15 (%), step 1
  ticketsPerEvent: number;// 200–800, step 50
  events: [number, number, number]; // per-year events, 12–360, step 12
}

export const NEW_BUYER_SHARE = [0.35, 0.3, 0.25];
export const FIXED_COST = [500000, 700000, 900000];
export const TX_RATE = 0.02;

export interface YearResult {
  year: string; gtv: number; revenue: number; txCost: number; acqCost: number; fixedCost: number; operatingResult: number; tickets: number;
}

export function computeModel(p: ModelParams): YearResult[] {
  return [0, 1, 2].map((i) => {
    const events = p?.events?.[i] ?? 0;
    const tickets = events * (p?.ticketsPerEvent ?? 0);
    const gtv = tickets * (p?.atv ?? 0);
    const revenue = gtv * ((p?.takeRate ?? 0) / 100);
    const txCost = gtv * TX_RATE;
    const acqCost = tickets * (NEW_BUYER_SHARE?.[i] ?? 0) * (p?.cac ?? 0);
    const fixedCost = FIXED_COST?.[i] ?? 0;
    return { year: `Year ${i + 1}`, gtv, revenue, txCost, acqCost, fixedCost, operatingResult: revenue - txCost - acqCost - fixedCost, tickets };
  });
}

// Scenario presets derived from D4 revenue projection tables (Australia)
export const PRESETS: { name: string; params: ModelParams; note: string }[] = [
  { name: 'Conservative', params: { cac: 10, atv: 60, takeRate: 8, ticketsPerEvent: 300, events: [24, 48, 72] }, note: 'D4 conservative: 8% take rate, ATV 60, 24→72 events' },
  { name: 'Base', params: { cac: 8, atv: 65, takeRate: 10, ticketsPerEvent: 400, events: [48, 96, 180] }, note: 'D4 base: 10% take rate, ATV 65, 48→180 events' },
  { name: 'Optimistic', params: { cac: 6, atv: 70, takeRate: 12, ticketsPerEvent: 500, events: [72, 180, 360] }, note: 'D4 optimistic: 12% take rate, ATV 70, 72→360 events' },
];

export const D3_CHART_SERIES = {
  years: ['Year 1', 'Year 2', 'Year 3'],
  conservative: [34560, 83328, 149760],
  base: [124800, 293760, 648000],
  optimistic: [302400, 972000, 2419200],
  breakEven: 900000,
};

export const ROI_SCENARIOS = [
  { scenario: 'Conservative', tco: '4,500,000–6,500,000', revenue: '267,648', result: '(1,510,104)', roi: 'Negative' },
  { scenario: 'Base', tco: '10,000,000–13,000,000', revenue: '1,066,560', result: '(1,526,232)', roi: 'Negative' },
  { scenario: 'Optimistic', tco: '18,000,000–28,000,000', revenue: '3,693,600', result: '(361,600) cumulative; Year 3 positive at 364,000', roi: 'Approaching break-even' },
];

export const BREAK_EVEN = {
  contributionPerTicket: 5.76, acquisitionBurden: 1.5, netContribution: 4.26,
  breakEvenTickets: 211268, equivalentEvents: 423,
  assessment: 'The base Year 3 break-even threshold (211,268 tickets) is more than twice the modelled 90,000 tickets. Break-even within three years requires either the optimistic scenario or material improvements in take rate, repeat purchasing or fixed-cost management.',
};

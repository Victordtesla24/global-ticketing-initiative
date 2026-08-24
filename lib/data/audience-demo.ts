// AUDIENCE DEMO — one small person-level file, run end to end before the eyes.
//
// Eighteen synthetic audience records in the shape a promoter's contact export
// actually takes: first name, last name, email address, phone number, mobile
// number, age, demography, state and county. Every person is fictional. Emails
// use the reserved example.com domain; both numbers sit inside the ranges the
// Australian regulator sets aside for fiction ((0x) 5550 xxxx landlines,
// 0491 57x xxx mobiles). In Australia the county column carries the local
// government area, the direct equivalent.
//
// The file ships as /sample-data/audience-sample.csv and .json. It is the
// walkthrough's own demonstration record set — deliberately outside the
// 60-provider catalogue and its control totals, so those figures stand
// untouched. Two rows carry deliberate defects and one person appears twice:
// the pipeline has to visibly earn its keep. Every count, chart and KPI on the
// demo is computed from this array at render time — nothing is hard-coded, so
// the visuals cannot drift from the file.

export interface AudienceRecord {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile: string;
  age: number;
  demography: string;
  state: string;
  county: string;
}

export const AUDIENCE_RECORDS: AudienceRecord[] = [
  { id: 'mock-aud-001', first_name: 'Ananya', last_name: 'Kulkarni', email: 'ananya.kulkarni@example.com', phone: '(03) 5550 1401', mobile: '0491 570 156', age: 34, demography: 'Marathi speaker', state: 'VIC', county: 'City of Monash' },
  { id: 'mock-aud-002', first_name: 'Rohan', last_name: 'Deshpande', email: 'rohan.deshpande@example.com', phone: '(03) 5550 1402', mobile: '0491 570 157', age: 41, demography: 'Marathi speaker', state: 'VIC', county: 'City of Wyndham' },
  { id: 'mock-aud-003', first_name: 'Priya', last_name: 'Joshi', email: 'priya.joshi@example.com', phone: '(02) 5550 1403', mobile: '0491 570 158', age: 29, demography: 'Marathi speaker', state: 'NSW', county: 'City of Parramatta' },
  { id: 'mock-aud-004', first_name: 'Aditya', last_name: 'Sathe', email: 'aditya.sathe@example.com', phone: '(02) 5550 1404', mobile: '0491 570 159', age: 52, demography: 'Marathi speaker', state: 'NSW', county: 'City of Blacktown' },
  { id: 'mock-aud-005', first_name: 'Sneha', last_name: 'Patil', email: 'sneha.patil@example.com', phone: '(03) 5550 1405', mobile: '0491 570 110', age: 26, demography: 'Marathi speaker', state: 'VIC', county: 'City of Melbourne' },
  { id: 'mock-aud-006', first_name: 'Vikrant', last_name: 'Gokhale', email: 'vikrant.gokhale.example.com', phone: '(03) 5550 1406', mobile: '0491 571 266', age: 47, demography: 'Marathi speaker', state: 'VIC', county: 'City of Casey' },
  { id: 'mock-aud-007', first_name: 'Meera', last_name: 'Bhosale', email: 'meera.bhosale@example.com', phone: '(07) 5550 1407', mobile: '0491 571 491', age: 38, demography: 'Hindi speaker', state: 'QLD', county: 'City of Brisbane' },
  { id: 'mock-aud-008', first_name: 'Arjun', last_name: 'Nair', email: 'arjun.nair@example.com', phone: '(02) 5550 1408', mobile: '0491 571 804', age: 31, demography: 'Indian ancestry', state: 'NSW', county: 'City of Sydney' },
  { id: 'mock-aud-009', first_name: 'Kavita', last_name: 'Rane', email: 'kavita.rane@example.com', phone: '(08) 5550 1409', mobile: '0491 572 549', age: 44, demography: 'Marathi speaker', state: 'WA', county: 'City of Stirling' },
  { id: 'mock-aud-010', first_name: 'Nikhil', last_name: 'Phadke', email: 'nikhil.phadke@example.com', phone: '(08) 5550 1410', mobile: '0491 572 665', age: 36, demography: 'Marathi speaker', state: 'SA', county: 'City of Salisbury' },
  { id: 'mock-aud-011', first_name: 'Ishaan', last_name: 'Kelkar', email: 'ishaan.kelkar@example.com', phone: '(03) 5550 1411', mobile: '0491 573 087', age: 23, demography: 'Indian ancestry', state: 'VIC', county: 'City of Greater Dandenong' },
  { id: 'mock-aud-012', first_name: 'Radhika', last_name: 'Apte', email: 'radhika.apte@example.com', phone: '(02) 5550 1412', mobile: '0491 573 331', age: 132, demography: 'Marathi speaker', state: 'NSW', county: 'City of Ryde' },
  { id: 'mock-aud-013', first_name: 'Sanjay', last_name: 'Kale', email: 'sanjay.kale@example.com', phone: '(03) 5550 1413', mobile: '0491 574 118', age: 58, demography: 'Marathi speaker', state: 'VIC', county: 'City of Whitehorse' },
  { id: 'mock-aud-014', first_name: 'Tanvi', last_name: 'Gadre', email: 'tanvi.gadre@example.com', phone: '(02) 5550 1414', mobile: '0491 574 632', age: 27, demography: 'Hindi speaker', state: 'NSW', county: 'City of Cumberland' },
  { id: 'mock-aud-015', first_name: 'Priya', last_name: 'Joshi', email: 'priya.joshi@example.com', phone: '', mobile: '0491 575 209', age: 29, demography: 'Marathi speaker', state: 'NSW', county: 'City of Parramatta' },
  { id: 'mock-aud-016', first_name: 'Devika', last_name: 'Shirke', email: 'devika.shirke@example.com', phone: '(07) 5550 1416', mobile: '0491 575 774', age: 49, demography: 'General audience', state: 'QLD', county: 'City of Logan' },
  { id: 'mock-aud-017', first_name: 'Omkar', last_name: 'Lele', email: 'omkar.lele@example.com', phone: '(03) 5550 1417', mobile: '0491 576 358', age: 33, demography: 'Marathi speaker', state: 'VIC', county: 'City of Boroondara' },
  { id: 'mock-aud-018', first_name: 'Anushka', last_name: 'Dixit', email: 'anushka.dixit@example.com', phone: '(08) 5550 1418', mobile: '0491 576 940', age: 21, demography: 'Indian ancestry', state: 'WA', county: 'City of Canning' },
];

/* ------------------------------------------------------------------ rules */

const AU_STATES = new Set(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^04\d{2} \d{3} \d{3}$/;

export interface RowCheck {
  ok: boolean;
  /** Names of the checks this row fails — empty when the row passes. */
  failures: string[];
}

/** The same four tests every row faces, in the order they run. */
export const VALIDATION_RULES = [
  { rule: 'Email format', what: 'email must parse as name@domain.tld' },
  { rule: 'Age range', what: 'age must sit between 15 and 110' },
  { rule: 'State code', what: 'state must be one of the eight AU states and territories' },
  { rule: 'Mobile format', what: 'mobile must match the 04xx xxx xxx pattern' },
] as const;

export function checkRecord(r: AudienceRecord): RowCheck {
  const failures: string[] = [];
  if (!EMAIL_RE.test(r.email)) failures.push('Email format');
  if (!(r.age >= 15 && r.age <= 110)) failures.push('Age range');
  if (!AU_STATES.has(r.state)) failures.push('State code');
  if (!MOBILE_RE.test(r.mobile)) failures.push('Mobile format');
  return { ok: failures.length === 0, failures };
}

/* ------------------------------------------------------- pipeline results */

export interface GoldenRecord extends AudienceRecord {
  /** ids of the source rows folded into this person. */
  mergedFrom: string[];
}

export interface PipelineResult {
  landed: AudienceRecord[];
  valid: AudienceRecord[];
  quarantined: { record: AudienceRecord; failures: string[] }[];
  golden: GoldenRecord[];
  /** Golden records assembled from more than one source row. */
  merged: GoldenRecord[];
  segments: { label: string; count: number }[];
  states: { label: string; count: number }[];
  ageBands: { label: string; count: number }[];
  medianAge: number;
}

/** Runs the whole pipeline over the array above. Pure arithmetic — no state. */
export function runPipeline(records: AudienceRecord[] = AUDIENCE_RECORDS): PipelineResult {
  const landed = records ?? [];

  const valid: AudienceRecord[] = [];
  const quarantined: { record: AudienceRecord; failures: string[] }[] = [];
  for (const r of landed) {
    const c = checkRecord(r);
    if (c.ok) valid.push(r);
    else quarantined.push({ record: r, failures: c.failures });
  }

  // Identity resolution: one person per lower-cased email. Later rows update
  // the golden record field-by-field; an empty field never overwrites a value.
  const byEmail = new Map<string, GoldenRecord>();
  for (const r of valid) {
    const key = r.email.toLowerCase();
    const prior = byEmail.get(key);
    if (!prior) {
      byEmail.set(key, { ...r, mergedFrom: [r.id] });
    } else {
      byEmail.set(key, {
        ...prior,
        phone: r.phone || prior.phone,
        mobile: r.mobile || prior.mobile,
        age: r.age ?? prior.age,
        mergedFrom: [...prior.mergedFrom, r.id],
      });
    }
  }
  const golden = Array.from(byEmail.values());
  const merged = golden.filter((g) => g.mergedFrom.length > 1);

  const tally = (items: string[]): { label: string; count: number }[] => {
    const m = new Map<string, number>();
    for (const s of items) m.set(s, (m.get(s) ?? 0) + 1);
    return Array.from(m.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  };

  const band = (age: number): string =>
    age <= 24 ? '15–24' : age <= 34 ? '25–34' : age <= 44 ? '35–44' : age <= 54 ? '45–54' : '55+';
  const BAND_ORDER = ['15–24', '25–34', '35–44', '45–54', '55+'];

  const ages = golden.map((g) => g.age).sort((a, b) => a - b);
  const mid = Math.floor(ages.length / 2);
  const medianAge = ages.length === 0 ? 0 : ages.length % 2 === 1 ? ages[mid] : Math.round((ages[mid - 1] + ages[mid]) / 2);

  return {
    landed,
    valid,
    quarantined,
    golden,
    merged,
    segments: tally(golden.map((g) => g.demography)),
    states: tally(golden.map((g) => g.state)),
    ageBands: BAND_ORDER.map((label) => ({
      label,
      count: golden.filter((g) => band(g.age) === label).length,
    })),
    medianAge,
  };
}

export const AUDIENCE_CSV_HREF = '/sample-data/audience-sample.csv';
export const AUDIENCE_JSON_HREF = '/sample-data/audience-sample.json';

/** The nine columns of the file, in file order, with the demo's short labels. */
export const AUDIENCE_COLUMNS: { key: keyof AudienceRecord; label: string }[] = [
  { key: 'first_name', label: 'First name' },
  { key: 'last_name', label: 'Last name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'age', label: 'Age' },
  { key: 'demography', label: 'Demography' },
  { key: 'state', label: 'State' },
  { key: 'county', label: 'County' },
];

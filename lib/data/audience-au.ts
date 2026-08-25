// AUSTRALIAN CONSENTED EVENT-MARKETING AUDIENCE — the prototype dataset.
//
// The rows live in ./audience-au.generated.ts, written by the same generator
// that writes the three downloads under /public/sample-data, so the page and
// the files cannot drift apart.
//
// Everything below is arithmetic over those rows: the validation rules, the
// consent gate, identity resolution and every aggregate the page draws. No
// figure on the page is typed by hand.

import { AU_AUDIENCE, type AudienceRow } from './audience-au.generated';

export type { AudienceRow };
export { AU_AUDIENCE };

export const DATASET_SLUG = 'au-audience-consented';
export const CSV_HREF = `/sample-data/${DATASET_SLUG}.csv`;
export const XLSX_HREF = `/sample-data/${DATASET_SLUG}.xlsx`;
export const JSON_HREF = `/sample-data/${DATASET_SLUG}.json`;

/* ----------------------------------------------------------------- columns */

export interface ColumnSpec {
  /** Column name as it appears in all three files. */
  column: string;
  type: 'text' | 'number' | 'flag' | 'date' | 'code';
  /** What the column is, in a few words. */
  meaning: string;
  /** Where its shape or its distribution comes from. */
  basis: string;
  /** Set where the column attracts a specific legal obligation. */
  legal?: string;
}

export const COLUMN_SPEC: ColumnSpec[] = [
  { column: 'record_id', type: 'code', meaning: 'Stable key for the record', basis: 'Generated surrogate key — the natural key a warehouse hashes on' },
  { column: 'first_name', type: 'text', meaning: 'Given name', basis: 'Fictional. Marathi, wider Indian and general given-name pools' },
  { column: 'last_name', type: 'text', meaning: 'Family name', basis: 'Fictional. Marathi and wider Indian family-name pools' },
  { column: 'email', type: 'text', meaning: 'Email address', basis: 'Fictional, on the reserved example.com domain (RFC 2606)' },
  { column: 'phone', type: 'text', meaning: 'Landline number', basis: 'Fictional, inside the (0x) 5550 xxxx drama range' },
  { column: 'mobile', type: 'text', meaning: 'Mobile number', basis: 'Fictional, inside the 0491 57x xxx drama range' },
  { column: 'age', type: 'number', meaning: 'Age in years', basis: 'Weighted to the 25–44 band that dominates recent India-born arrivals' },
  { column: 'state', type: 'code', meaning: 'State or territory', basis: 'Mix follows the ABS Census 2021 counts of Marathi used at home' },
  { column: 'suburb', type: 'text', meaning: 'Suburb / locality', basis: 'Real locality, resolved against the Australia Post postcode reference' },
  { column: 'postcode', type: 'code', meaning: 'Postcode', basis: 'Real postcode for that locality' },
  { column: 'sa2_code_2021', type: 'code', meaning: 'ABS statistical area level 2', basis: 'Real ASGS 2021 code the postcode resolves to — the geography join key' },
  { column: 'sa2_name_2021', type: 'text', meaning: 'SA2 name', basis: 'Real ASGS 2021 name for that code' },
  {
    column: 'ethnicity_nationality',
    type: 'text',
    meaning: 'Ancestry, on ABS categories',
    basis: 'ABS Census ancestry categories — Indian, Other Indian subcontinent, Australian, Other',
    legal: 'Sensitive information — s 6, Privacy Act 1988 (Cth)',
  },
  { column: 'marathi_speaking', type: 'flag', meaning: 'Marathi used at home', basis: 'Mirrors the ABS Census variable Language used at home (LANP)' },
  {
    column: 'consented_for_marketing',
    type: 'flag',
    meaning: 'Current marketing consent',
    basis: 'Derived state — the current position of the consent event history',
    legal: 'APP 7.4 — sensitive information may be used for direct marketing only with consent',
  },
  {
    column: 'contact_preference',
    type: 'flag',
    meaning: 'Channel the person chose — E email, M mobile',
    basis: 'Channel consent, enforced at send time by the preference join',
    legal: 'Spam Act 2003 (Cth) — consent, sender identification and a working unsubscribe',
  },
  { column: 'consent_timestamp', type: 'date', meaning: 'When the current consent state was set', basis: 'The date the latest consent event was recorded' },
  { column: 'consent_source', type: 'text', meaning: 'Where the consent came from', basis: 'Checkout opt-in, waitlist, newsletter, ballot, box office or a permission-based partner list' },
  { column: 'consent_purpose', type: 'text', meaning: 'What the person consented to', basis: 'The stated purpose the consent was given for' },
  { column: 'data_status', type: 'flag', meaning: 'Real extract or synthetic sample', basis: 'Required column — travels to every downstream table and tile' },
];

/* ------------------------------------------------------------------- rules */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^04\d{2} \d{3} \d{3}$/;
const POSTCODE_RE = /^\d{4}$/;

/** The postcode ranges each state and territory actually holds. */
const STATE_POSTCODES: Record<string, [number, number][]> = {
  NSW: [[1000, 2599], [2619, 2899], [2921, 2999]],
  ACT: [[200, 299], [2600, 2618], [2900, 2920]],
  VIC: [[3000, 3999], [8000, 8999]],
  QLD: [[4000, 4999], [9000, 9999]],
  SA: [[5000, 5999]],
  WA: [[6000, 6999]],
  TAS: [[7000, 7999]],
  NT: [[800, 999]],
};

export const VALIDATION_RULES = [
  { rule: 'Email format', what: 'email must parse as name@domain.tld' },
  { rule: 'Age range', what: 'age must sit between 15 and 110' },
  { rule: 'State code', what: 'state must be one of the eight states and territories' },
  { rule: 'Mobile format', what: 'mobile must match 04xx xxx xxx' },
  { rule: 'Postcode format', what: 'postcode must be four digits' },
  { rule: 'Postcode in state', what: 'the postcode must fall in a range that state actually holds' },
] as const;

export function checkRow(r: AudienceRow): string[] {
  const f: string[] = [];
  if (!EMAIL_RE.test(r.email)) f.push('Email format');
  if (!(r.age >= 15 && r.age <= 110)) f.push('Age range');
  const ranges = STATE_POSTCODES[r.state];
  if (!ranges) f.push('State code');
  if (!POSTCODE_RE.test(r.postcode)) f.push('Postcode format');
  // A well-formed postcode in the wrong state is the defect a format check
  // waves through, so it is tested separately and only where both parts parse.
  else if (ranges) {
    const n = Number(r.postcode);
    if (!ranges.some(([lo, hi]) => n >= lo && n <= hi)) f.push('Postcode in state');
  }
  return f;
}

/* ---------------------------------------------------------------- pipeline */

export interface GoldenRow extends AudienceRow {
  mergedFrom: string[];
}

export interface Bucket {
  label: string;
  count: number;
}

export interface AuPipeline {
  landed: AudienceRow[];
  valid: AudienceRow[];
  quarantined: { row: AudienceRow; failures: string[] }[];
  golden: GoldenRow[];
  merged: GoldenRow[];
  /** Golden records whose current consent state allows marketing. */
  marketable: GoldenRow[];
  suppressed: GoldenRow[];
  byState: Bucket[];
  bySuburb: Bucket[];
  byAgeBand: Bucket[];
  byAncestry: Bucket[];
  byPreference: Bucket[];
  byConsentSource: Bucket[];
  marathiSpeakers: number;
  medianAge: number;
  reachableEmail: number;
  reachableMobile: number;
}

const AGE_BANDS = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'];
const bandOf = (age: number): string =>
  age <= 24 ? '18–24' : age <= 34 ? '25–34' : age <= 44 ? '35–44' : age <= 54 ? '45–54' : age <= 64 ? '55–64' : '65+';

function tally(values: string[], limit?: number): Bucket[] {
  const m = new Map<string, number>();
  for (const v of values) m.set(v, (m.get(v) ?? 0) + 1);
  const out = Array.from(m.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return typeof limit === 'number' ? out.slice(0, limit) : out;
}

export function runAuPipeline(rows: AudienceRow[] = AU_AUDIENCE): AuPipeline {
  const landed = rows ?? [];

  const valid: AudienceRow[] = [];
  const quarantined: { row: AudienceRow; failures: string[] }[] = [];
  for (const r of landed) {
    const failures = checkRow(r);
    if (failures.length === 0) valid.push(r);
    else quarantined.push({ row: r, failures });
  }

  // Identity resolution: one person per lower-cased email. A later record
  // updates the golden row field by field, and an empty field never overwrites
  // a value that is already there.
  const byEmail = new Map<string, GoldenRow>();
  for (const r of valid) {
    const key = r.email.toLowerCase();
    const prior = byEmail.get(key);
    if (!prior) {
      byEmail.set(key, { ...r, mergedFrom: [r.record_id] });
    } else {
      const newer = r.consent_timestamp >= prior.consent_timestamp;
      byEmail.set(key, {
        ...prior,
        phone: r.phone || prior.phone,
        mobile: r.mobile || prior.mobile,
        age: r.age ?? prior.age,
        contact_preference: newer ? r.contact_preference : prior.contact_preference,
        consented_for_marketing: newer ? r.consented_for_marketing : prior.consented_for_marketing,
        consent_timestamp: newer ? r.consent_timestamp : prior.consent_timestamp,
        consent_source: newer ? r.consent_source : prior.consent_source,
        mergedFrom: [...prior.mergedFrom, r.record_id],
      });
    }
  }
  const golden = Array.from(byEmail.values());
  const merged = golden.filter((g) => g.mergedFrom.length > 1);

  const marketable = golden.filter((g) => g.consented_for_marketing === 'Y');
  const suppressed = golden.filter((g) => g.consented_for_marketing !== 'Y');

  const ages = marketable.map((g) => g.age).sort((a, b) => a - b);
  const mid = Math.floor(ages.length / 2);
  const medianAge =
    ages.length === 0 ? 0 : ages.length % 2 === 1 ? ages[mid] : Math.round((ages[mid - 1] + ages[mid]) / 2);

  return {
    landed,
    valid,
    quarantined,
    golden,
    merged,
    marketable,
    suppressed,
    byState: tally(marketable.map((g) => g.state)),
    bySuburb: tally(
      marketable.map((g) => `${g.suburb} ${g.postcode}`),
      8
    ),
    byAgeBand: AGE_BANDS.map((label) => ({
      label,
      count: marketable.filter((g) => bandOf(g.age) === label).length,
    })),
    byAncestry: tally(marketable.map((g) => g.ethnicity_nationality)),
    byPreference: tally(marketable.map((g) => (g.contact_preference === 'E' ? 'Email' : 'Mobile'))),
    byConsentSource: tally(marketable.map((g) => g.consent_source)),
    marathiSpeakers: marketable.filter((g) => g.marathi_speaking === 'Y').length,
    medianAge,
    reachableEmail: marketable.filter((g) => g.contact_preference === 'E').length,
    reachableMobile: marketable.filter((g) => g.contact_preference === 'M').length,
  };
}

/* ------------------------------------------------------------- data marts */

export interface MartColumn {
  name: string;
  key?: 'pk' | 'fk' | 'nk';
  note?: string;
}

export interface MartTable {
  id: string;
  name: string;
  kind: 'dim' | 'fact' | 'xref' | 'view';
  grain: string;
  columns: MartColumn[];
}

export interface MartJoin {
  from: string;
  to: string;
  on: string;
  cardinality: '1:1' | '1:M' | 'M:M';
  note?: string;
}

export const MART_TABLES: MartTable[] = [
  {
    id: 'dim_person',
    name: 'dim_person',
    kind: 'dim',
    grain: 'One row per person per change — history kept, one row current',
    columns: [
      { name: 'person_sk', key: 'pk' },
      { name: 'record_id', key: 'nk' },
      { name: 'first_name' },
      { name: 'last_name' },
      { name: 'age' },
      { name: 'ethnicity_nationality', note: 'sensitive' },
      { name: 'marathi_speaking' },
      { name: 'geo_sk', key: 'fk' },
      { name: 'valid_from' },
      { name: 'valid_to' },
      { name: 'is_current' },
    ],
  },
  {
    id: 'dim_geography',
    name: 'dim_geography',
    kind: 'dim',
    grain: 'One row per suburb and postcode',
    columns: [
      { name: 'geo_sk', key: 'pk' },
      { name: 'postcode', key: 'nk' },
      { name: 'suburb' },
      { name: 'state' },
      { name: 'sa2_code_2021' },
      { name: 'sa2_name_2021' },
    ],
  },
  {
    id: 'xref_postcode_sa2',
    name: 'xref_postcode_sa2',
    kind: 'xref',
    grain: 'One row per postcode and SA2 pair, with its share',
    columns: [
      { name: 'postcode', key: 'fk' },
      { name: 'sa2_code_2021', key: 'fk' },
      { name: 'ratio', note: 'share of the postcode in that SA2' },
    ],
  },
  {
    id: 'dim_contact_point',
    name: 'dim_contact_point',
    kind: 'dim',
    grain: 'One row per person per channel',
    columns: [
      { name: 'contact_sk', key: 'pk' },
      { name: 'person_sk', key: 'fk' },
      { name: 'channel', note: 'E or M' },
      { name: 'address', note: 'email or mobile' },
      { name: 'is_preferred' },
    ],
  },
  {
    id: 'fact_consent_event',
    name: 'fact_consent_event',
    kind: 'fact',
    grain: 'One row per consent event — granted or withdrawn',
    columns: [
      { name: 'consent_event_sk', key: 'pk' },
      { name: 'person_sk', key: 'fk' },
      { name: 'date_sk', key: 'fk' },
      { name: 'channel' },
      { name: 'purpose' },
      { name: 'action', note: 'GRANT or WITHDRAW' },
      { name: 'source' },
    ],
  },
  {
    id: 'dim_campaign',
    name: 'dim_campaign',
    kind: 'dim',
    grain: 'One row per campaign',
    columns: [
      { name: 'campaign_sk', key: 'pk' },
      { name: 'campaign_id', key: 'nk' },
      { name: 'name' },
      { name: 'market' },
      { name: 'channel' },
    ],
  },
  {
    id: 'fact_campaign_send',
    name: 'fact_campaign_send',
    kind: 'fact',
    grain: 'One row per person per send',
    columns: [
      { name: 'send_sk', key: 'pk' },
      { name: 'person_sk', key: 'fk' },
      { name: 'campaign_sk', key: 'fk' },
      { name: 'date_sk', key: 'fk' },
      { name: 'channel' },
      { name: 'delivered' },
      { name: 'opened' },
      { name: 'clicked' },
    ],
  },
  {
    id: 'fact_ticket_sale',
    name: 'fact_ticket_sale',
    kind: 'fact',
    grain: 'One row per ticket transaction',
    columns: [
      { name: 'sale_sk', key: 'pk' },
      { name: 'person_sk', key: 'fk' },
      { name: 'campaign_sk', key: 'fk' },
      { name: 'date_sk', key: 'fk' },
      { name: 'tickets' },
      { name: 'amount_aud' },
    ],
  },
  {
    id: 'vw_marketable_audience',
    name: 'vw_marketable_audience',
    kind: 'view',
    grain: 'One row per contactable person, per channel they chose',
    columns: [
      { name: 'person_sk', key: 'fk' },
      { name: 'channel' },
      { name: 'address' },
      { name: 'state' },
      { name: 'sa2_code_2021' },
      { name: 'marathi_speaking' },
    ],
  },
];

export const MART_JOINS: MartJoin[] = [
  { from: 'dim_person', to: 'dim_geography', on: 'dim_person.geo_sk = dim_geography.geo_sk', cardinality: '1:M' },
  {
    from: 'dim_geography',
    to: 'xref_postcode_sa2',
    on: 'dim_geography.postcode = xref_postcode_sa2.postcode',
    cardinality: 'M:M',
    note: 'A postcode can span several SA2s and an SA2 several postcodes, so the correspondence carries a ratio rather than a single code',
  },
  { from: 'dim_person', to: 'dim_contact_point', on: 'dim_person.person_sk = dim_contact_point.person_sk', cardinality: '1:M' },
  {
    from: 'dim_person',
    to: 'fact_consent_event',
    on: 'dim_person.person_sk = fact_consent_event.person_sk',
    cardinality: '1:M',
    note: 'Consent is an event with a timestamp, a purpose and a source. The Y/N column on the file is the current position of this history, not the record of it',
  },
  { from: 'dim_person', to: 'fact_campaign_send', on: 'dim_person.person_sk = fact_campaign_send.person_sk', cardinality: '1:M' },
  { from: 'dim_campaign', to: 'fact_campaign_send', on: 'dim_campaign.campaign_sk = fact_campaign_send.campaign_sk', cardinality: '1:M' },
  { from: 'dim_person', to: 'fact_ticket_sale', on: 'dim_person.person_sk = fact_ticket_sale.person_sk', cardinality: '1:M' },
  { from: 'dim_campaign', to: 'fact_ticket_sale', on: 'dim_campaign.campaign_sk = fact_ticket_sale.campaign_sk', cardinality: '1:M' },
  {
    from: 'fact_consent_event',
    to: 'vw_marketable_audience',
    on: 'latest GRANT per person and channel, with no later WITHDRAW',
    cardinality: '1:1',
    note: 'The view is the only object a campaign may send from',
  },
  { from: 'dim_contact_point', to: 'vw_marketable_audience', on: 'dim_contact_point.person_sk = vw_marketable_audience.person_sk and is_preferred', cardinality: '1:1' },
];

/* --------------------------------------------------------- provider refs */

export interface ProviderRef {
  provider: string;
  product: string;
  /** What it actually supplies. */
  supplies: string;
  /** Person-level and contactable, or an area/household classification, or a survey panel. */
  grain: 'Person-level' | 'Household / area' | 'Survey panel' | 'Official statistics' | 'Reference data' | 'Regulator';
  /** Which columns of this dataset it stands behind. */
  columns: string[];
  url: string;
}

export const PROVIDER_REFS: ProviderRef[] = [
  {
    provider: 'Australian Bureau of Statistics',
    product: 'Census 2021 — Language used at home (LANP)',
    supplies: 'Marathi used at home: 22,263 nationally, 9,753 New South Wales, 7,170 Victoria — the counts the state mix follows',
    grain: 'Official statistics',
    columns: ['state', 'marathi_speaking'],
    url: 'https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/cultural-diversity/language-used-home-lanp',
  },
  {
    provider: 'Australian Bureau of Statistics',
    product: 'Census 2021 QuickStats — suburb (SAL)',
    supplies: 'Suburb-level ancestry and country of birth. Tarneit, for one: 56,370 people, Indian ancestry 15,199 (27.0%), India-born 16,231 (28.8%)',
    grain: 'Official statistics',
    columns: ['suburb', 'ethnicity_nationality'],
    url: 'https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL22451',
  },
  {
    provider: 'Australia Post',
    product: 'Postcode reference',
    supplies: 'The authoritative locality-to-postcode list every suburb and postcode in this file was resolved against',
    grain: 'Reference data',
    columns: ['suburb', 'postcode'],
    url: 'https://auspost.com.au/postcode',
  },
  {
    provider: 'Australian Bureau of Statistics',
    product: 'ASGS 2021 — statistical areas and correspondences',
    supplies: 'The SA2 code each postcode resolves to, and the correspondence that makes postcode-to-SA2 many-to-many',
    grain: 'Reference data',
    columns: ['sa2_code_2021', 'sa2_name_2021'],
    url: 'https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026',
  },
  {
    provider: 'Experian Australia',
    product: 'Mosaic',
    supplies: 'Consumer classification into 14 Groups and 52 Types, covering 99% of Australian households — a segment on the household, not an ethnicity on a named person',
    grain: 'Household / area',
    columns: ['ethnicity_nationality'],
    url: 'https://www.experian.com.au/business/solutions/marketing-services/mosaic',
  },
  {
    provider: 'Experian',
    product: 'ConsumerView',
    supplies: 'Over 5,000 behavioural, demographic, geographic and lifestyle attributes used to enrich an existing customer record',
    grain: 'Household / area',
    columns: ['age', 'ethnicity_nationality'],
    url: 'https://www.experian.com/marketing/consumer-view',
  },
  {
    provider: 'Roy Morgan',
    product: 'Single Source Australia',
    supplies: 'Over 60,000 interviews a year, carrying language used at home among its variables — a survey panel that sizes a segment, never a list to send to',
    grain: 'Survey panel',
    columns: ['marathi_speaking', 'age'],
    url: 'https://www.roymorgan.com/products-and-tools/single-source',
  },
  {
    provider: 'Roy Morgan',
    product: 'Helix Personas',
    supplies: '54 Personas in 6 Communities, geo-projected down to mesh block — again an area classification, not a person attribute',
    grain: 'Household / area',
    columns: ['suburb', 'postcode'],
    url: 'https://www.roymorgan.com/products-and-tools/helix-personas',
  },
  {
    provider: 'Audience Republic',
    product: 'Event audience and campaign attribution',
    supplies: 'The field shape a promoter’s own opted-in list takes — the only lawful route to person-level contact details with a marketing consent',
    grain: 'Person-level',
    columns: ['email', 'mobile', 'consented_for_marketing', 'contact_preference'],
    url: 'https://audiencerepublic.com',
  },
  {
    provider: 'Office of the Australian Information Commissioner',
    product: 'APP 7 — Direct marketing',
    supplies: 'Sensitive information, which includes racial or ethnic origin, may be used for direct marketing only with the individual’s consent',
    grain: 'Regulator',
    columns: ['ethnicity_nationality', 'consented_for_marketing'],
    url: 'https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-7-app-7-direct-marketing',
  },
  {
    provider: 'Australian Communications and Media Authority',
    product: 'Spam Act 2003 — commercial electronic messages',
    supplies: 'Consent, sender identification and a working unsubscribe on every commercial email or SMS',
    grain: 'Regulator',
    columns: ['contact_preference', 'consent_source'],
    url: 'https://www.acma.gov.au/rules-sending-marketing-emails-sms-and-faxes',
  },
];

/** The tests a dbt project puts on this mart. */
export const MART_TESTS = [
  { test: 'unique', on: 'dim_person.person_sk, dim_geography.geo_sk', why: 'one row per key' },
  { test: 'not_null', on: 'every surrogate and foreign key', why: 'no orphan rows' },
  { test: 'relationships', on: 'fact_*.person_sk → dim_person.person_sk', why: 'referential integrity' },
  { test: 'accepted_values', on: 'channel in (E, M) · action in (GRANT, WITHDRAW) · state in the eight codes', why: 'no free text in a controlled column' },
  { test: 'expression_is_true', on: 'vw_marketable_audience has no person whose latest event is WITHDRAW', why: 'consent is enforced by a test, not by convention' },
];

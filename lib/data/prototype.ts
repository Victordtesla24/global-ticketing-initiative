// PROTOTYPE — the data programme run end-to-end on sample files.
//
// Every dataset below ships as a matched .csv / .json pair under /public/sample-data,
// alongside the manifest that generated this index (/sample-data/manifest.json).
//
// TWO MODES, NEVER MIXED:
//   REAL      — a real extract, captured first-hand from the named publisher on the stated
//               access date. Carries source_url and access_date on every row of the file.
//   SYNTHETIC — a synthetic sample that mirrors the provider's published field specification.
//               Illustrative values only; not vendor data, not a Ticketalay record, and never
//               evidence of demand, supply or revenue in any market.
//
// Category letters and country tags are the same ones the provider catalogue uses
// (lib/data/providers.ts); the manifest's 'Europe' tag is carried here as 'EU'.

import type { ProviderCategory, ProviderCountry } from '@/lib/data/providers';

export type DatasetMode = 'REAL' | 'SYNTHETIC';

export interface PrototypeDataset {
  id: number;
  name: string;
  slug: string;
  category: ProviderCategory;
  countries: ProviderCountry[];
  mode: DatasetMode;
  /** Data rows in the file, excluding the header and the provider notice comment. */
  rows: number;
}

export const PROTOTYPE_DATASETS: PrototypeDataset[] = [
  { id: 1, name: 'Ticketalay First-Party Database', slug: 'ticketalay-first-party-database', category: 'A', countries: ['AU', 'IN'], mode: 'REAL', rows: 17 },
  { id: 2, name: 'Google Play Console', slug: 'google-play-console', category: 'A', countries: ['Global'], mode: 'REAL', rows: 16 },
  { id: 3, name: 'Apple App Store Connect', slug: 'apple-app-store-connect', category: 'A', countries: ['Global'], mode: 'REAL', rows: 14 },
  { id: 4, name: 'Nielsen / NielsenIQ', slug: 'nielsen-nielseniq', category: 'A', countries: ['AU', 'Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 5, name: 'Kantar', slug: 'kantar', category: 'A', countries: ['AU', 'Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 6, name: 'Statista', slug: 'statista', category: 'A', countries: ['Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 7, name: 'IBISWorld', slug: 'ibisworld', category: 'A', countries: ['AU', 'Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 8, name: 'Euromonitor International', slug: 'euromonitor-international', category: 'A', countries: ['AU', 'Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 9, name: 'Mintel', slug: 'mintel', category: 'A', countries: ['UK', 'Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 10, name: 'UN DESA Migrant Stock', slug: 'un-desa-migrant-stock', category: 'B', countries: ['Global'], mode: 'REAL', rows: 24 },
  { id: 11, name: 'Australian Bureau of Statistics (ABS)', slug: 'australian-bureau-of-statistics-abs', category: 'B', countries: ['AU'], mode: 'REAL', rows: 22 },
  { id: 12, name: 'UK ONS / DCMS', slug: 'uk-ons-dcms', category: 'B', countries: ['UK'], mode: 'REAL', rows: 15 },
  { id: 13, name: 'US Census Bureau', slug: 'us-census-bureau', category: 'B', countries: ['US'], mode: 'REAL', rows: 16 },
  { id: 14, name: 'US Bureau of Labor Statistics (BLS)', slug: 'us-bureau-of-labor-statistics-bls', category: 'B', countries: ['US'], mode: 'SYNTHETIC', rows: 12 },
  { id: 15, name: 'US Bureau of Economic Analysis (BEA)', slug: 'us-bureau-of-economic-analysis-bea', category: 'B', countries: ['US'], mode: 'SYNTHETIC', rows: 10 },
  { id: 16, name: 'US National Endowment for the Arts (NEA)', slug: 'us-national-endowment-for-the-arts-nea', category: 'B', countries: ['US'], mode: 'REAL', rows: 8 },
  { id: 17, name: 'Eurostat', slug: 'eurostat', category: 'B', countries: ['EU'], mode: 'REAL', rows: 15 },
  { id: 18, name: 'Statistics Canada', slug: 'statistics-canada', category: 'B', countries: ['CA'], mode: 'REAL', rows: 12 },
  { id: 19, name: 'World Bank', slug: 'world-bank', category: 'B', countries: ['Global'], mode: 'SYNTHETIC', rows: 12 },
  { id: 20, name: 'OECD', slug: 'oecd', category: 'B', countries: ['Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 21, name: 'Claritas (PRIZM)', slug: 'claritas-prizm', category: 'B', countries: ['US'], mode: 'SYNTHETIC', rows: 8 },
  { id: 22, name: 'Experian Data', slug: 'experian-data', category: 'B', countries: ['UK', 'US', 'Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 23, name: 'Acxiom', slug: 'acxiom', category: 'B', countries: ['AU', 'UK', 'US', 'EU'], mode: 'SYNTHETIC', rows: 8 },
  { id: 24, name: 'GWI (GlobalWebIndex)', slug: 'gwi-globalwebindex', category: 'B', countries: ['UK', 'Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 25, name: 'YouGov', slug: 'yougov', category: 'B', countries: ['UK', 'Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 26, name: 'Qualtrics', slug: 'qualtrics', category: 'B', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 27, name: 'Similarweb', slug: 'similarweb', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 28, name: 'SEMrush', slug: 'semrush', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 29, name: 'Ahrefs', slug: 'ahrefs', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 30, name: 'AppsFlyer', slug: 'appsflyer', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 31, name: 'Live Nation / Ticketmaster (Investor Reporting)', slug: 'live-nation-ticketmaster-investor-reporting', category: 'C', countries: ['Global'], mode: 'REAL', rows: 10 },
  { id: 32, name: 'StubHub / viagogo (Investor Reporting)', slug: 'stubhub-viagogo-investor-reporting', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 33, name: 'PitchBook', slug: 'pitchbook', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 34, name: 'Crunchbase', slug: 'crunchbase', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 35, name: 'Snowflake Data Marketplace', slug: 'snowflake-data-marketplace', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 36, name: 'AWS Data Exchange', slug: 'aws-data-exchange', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 37, name: 'Bloomberg / Bloomberg Second Measure', slug: 'bloomberg-bloomberg-second-measure', category: 'C', countries: ['US', 'Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 38, name: 'Dun & Bradstreet (D&B)', slug: 'dun-bradstreet-d-b', category: 'D', countries: ['Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 39, name: 'ZoomInfo', slug: 'zoominfo', category: 'D', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 40, name: 'Cognism', slug: 'cognism', category: 'D', countries: ['UK', 'EU', 'Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 41, name: 'People Data Labs (PDL)', slug: 'people-data-labs-pdl', category: 'D', countries: ['AU', 'Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 42, name: 'Apollo.io', slug: 'apollo-io', category: 'D', countries: ['Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 43, name: 'Audience Republic', slug: 'audience-republic', category: 'D', countries: ['AU', 'UK', 'US'], mode: 'SYNTHETIC', rows: 8 },
  { id: 44, name: 'ABR / ABN Lookup', slug: 'abr-abn-lookup', category: 'E', countries: ['AU'], mode: 'REAL', rows: 9 },
  { id: 45, name: 'ASIC Connect', slug: 'asic-connect', category: 'E', countries: ['AU'], mode: 'REAL', rows: 6 },
  { id: 46, name: 'FTC Regulatory Materials', slug: 'ftc-regulatory-materials', category: 'E', countries: ['US'], mode: 'REAL', rows: 5 },
  { id: 47, name: 'USCIS Performer Guidance', slug: 'uscis-performer-guidance', category: 'E', countries: ['US'], mode: 'SYNTHETIC', rows: 5 },
  { id: 48, name: 'Data Privacy Framework', slug: 'data-privacy-framework', category: 'E', countries: ['UK', 'US', 'EU'], mode: 'SYNTHETIC', rows: 6 },
  { id: 49, name: 'Avalara', slug: 'avalara', category: 'E', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 50, name: 'Quaderno', slug: 'quaderno', category: 'E', countries: ['US', 'Global'], mode: 'SYNTHETIC', rows: 6 },
  { id: 51, name: 'TaxCloud', slug: 'taxcloud', category: 'E', countries: ['US'], mode: 'SYNTHETIC', rows: 12 },
  { id: 52, name: 'Google Maps Platform', slug: 'google-maps-platform', category: 'F', countries: ['Global'], mode: 'SYNTHETIC', rows: 10 },
  { id: 53, name: 'Mapbox', slug: 'mapbox', category: 'F', countries: ['Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 54, name: 'HERE Technologies', slug: 'here-technologies', category: 'F', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 55, name: 'OpenCage', slug: 'opencage', category: 'F', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 56, name: 'Geoapify', slug: 'geoapify', category: 'F', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
  { id: 57, name: 'Geocodio', slug: 'geocodio', category: 'F', countries: ['US', 'CA'], mode: 'SYNTHETIC', rows: 10 },
  { id: 58, name: 'IMF Data', slug: 'imf-data', category: 'B', countries: ['Global'], mode: 'REAL', rows: 20 },
  { id: 59, name: 'AppBrain', slug: 'appbrain', category: 'C', countries: ['Global'], mode: 'SYNTHETIC', rows: 9 },
  { id: 60, name: 'Coresignal', slug: 'coresignal', category: 'D', countries: ['Global'], mode: 'SYNTHETIC', rows: 8 },
];

/** Country tags offered as table filters — the same tag set the files carry. */
export const PROTOTYPE_COUNTRY_FILTERS: ProviderCountry[] = ['AU', 'UK', 'US', 'CA', 'EU', 'IN', 'Global'];

/** Control totals for the whole sample set, recomputed from the manifest. */
export const PROTOTYPE_TOTALS = {
  datasets: 60,
  files: 120,
  rows: 601,
  real: 15,
  realRows: 209,
  synthetic: 45,
  syntheticRows: 392,
};

export const SAMPLE_DIR = '/sample-data';

export function csvHref(slug: string): string {
  return `${SAMPLE_DIR}/${slug}.csv`;
}

export function jsonHref(slug: string): string {
  return `${SAMPLE_DIR}/${slug}.json`;
}

export const MODE_LABEL: Record<DatasetMode, string> = {
  REAL: 'REAL EXTRACT',
  SYNTHETIC: 'SYNTHETIC SAMPLE',
};

/* ------------------------------------------------------------------------- */
/* AUSTRALIA END-TO-END WALKTHROUGH                                          */
/* Five steps, each one run on the actual rows of the files listed above.    */
/* ------------------------------------------------------------------------- */

export interface StepSource {
  slug: string;
  label: string;
  mode: DatasetMode;
  /** What this file contributes to this step, and — for real extracts — its publisher. */
  role: string;
}

export interface StepTable {
  caption: string;
  headers: string[];
  rows: string[][];
  /** Which of the two labels applies to every row of this table. */
  mode: DatasetMode;
  note?: string;
  /** Row indices to render as routed-out / excluded (dimmed with an amber rule). */
  excludedRows?: number[];
}

export interface WalkStep {
  n: number;
  id: string;
  eyebrow: string;
  title: string;
  /** The question a Leadership reader is actually asking at this step. */
  question: string;
  /** What the pipeline is doing here, in plain terms. */
  what: string;
  sources: StepSource[];
  tables: StepTable[];
  /** Arithmetic checks, shown as a control-total ledger (Step 4). */
  checks?: { label: string; result: string; variance: string }[];
  /** The three certified dashboards (Step 5). */
  dashboards?: {
    name: string;
    mode: DatasetMode;
    kpis: { metric: string; value: string; basis: string }[];
    source: { slug: string; label: string }[];
    certifies: string;
  }[];
  gateG1: string;
  gateG2: string;
  /** The honest limit of what this step can claim. */
  limit: string;
}

export const WALKTHROUGH: WalkStep[] = [
  {
    n: 1,
    id: 'denominators',
    eyebrow: 'Step 01 · Denominators',
    title: 'Who is actually there — and do they go out?',
    question:
      'How many Marathi-speaking people live in Australia, and what share of Australian adults attend a live cultural event at all?',
    what:
      'Denominators come from official statistics and nothing else. Two ABS releases are extracted verbatim — the Census 2021 cultural-diversity tables for language, ancestry and country of birth, and the Cultural and creative activities survey for attendance. No value is modelled, interpolated or estimated, and every row of the file carries its own source URL and access date.',
    sources: [
      {
        slug: 'australian-bureau-of-statistics-abs',
        label: 'Australian Bureau of Statistics (ABS)',
        mode: 'REAL',
        role: 'Real extract — abs.gov.au, accessed 2026-08-23. Language, ancestry, country of birth and cultural-attendance rates.',
      },
      {
        slug: 'un-desa-migrant-stock',
        label: 'UN DESA Migrant Stock',
        mode: 'REAL',
        role: 'Real extract — un.org, accessed 2026-08-23. Independent India→Australia corroboration on a different basis.',
      },
    ],
    tables: [
      {
        caption: 'Rows copied verbatim from australian-bureau-of-statistics-abs.csv',
        mode: 'REAL',
        headers: ['Metric', 'Value', 'Unit', 'Reference period', 'Geography'],
        rows: [
          ['Marathi used at home', '22,263', 'persons', 'Census 2021', 'Australia (national)'],
          ['Marathi used at home', '9,753', 'persons', 'Census 2021', 'New South Wales'],
          ['Marathi used at home', '7,170', 'persons', 'Census 2021', 'Victoria'],
          ['Adults attended ≥1 cultural venue/event', '64', '% of adults', '2021-22', 'Australia'],
          ['Theatre performances attendance', '8.0', '% of persons', '2021-22', 'Australia'],
          ['Indian ancestry', '783,953', 'responses', 'Census 2021', 'Australia (national)'],
          ['India-born (estimated resident population)', '971,020', 'persons', '30 Jun 2025', 'Australia (national)'],
        ],
        note:
          'The 2021-22 attendance figures cover a COVID-affected collection window (Jul 2020 – Jun 2022); the pre-pandemic comparators are in the same file (82.4% all venues, 16.5% theatre, 2017-18). Greater Melbourne and Greater Sydney Marathi counts are not published by the ABS — they require TableBuilder — so they are absent from the file rather than estimated into it.',
      },
      {
        caption: 'Cross-check on a second publisher — un-desa-migrant-stock.csv',
        mode: 'REAL',
        headers: ['Destination', 'Origin', 'Year', 'Migrant stock'],
        rows: [
          ['Australia', 'India', '2010', '326,913'],
          ['Australia', 'India', '2015', '448,940'],
          ['Australia', 'India', '2020', '707,980'],
          ['Australia', 'India', '2024', '876,074'],
        ],
        note:
          'Different collector, different measure, different reference date: UN DESA estimates mid-2024 migrant stock at 876,074 where the ABS counts 971,020 India-born residents at 30 June 2025. Both are verified and neither replaces the other — the pair is a corroboration of direction, not an equality check.',
      },
    ],
    gateG1:
      'Supplies the population and attendance denominators against which the primary demand study (U-04) is sized and sampled — fixed to official statistics before a single survey question is written.',
    gateG2:
      'Becomes the addressable-population dimension of the demand dashboard: a fixed, reproducible table whose every row carries a publisher URL and an access date.',
    limit:
      'A denominator is not demand. 22,263 Marathi speakers and a 64% national attendance rate bound the population; neither evidences willingness to buy a ticket at any price. That evidence is the G1 primary demand study, and it does not exist yet.',
  },
  {
    n: 2,
    id: 'inventory',
    eyebrow: 'Step 02 · Supply',
    title: 'What Ticketalay actually has — and what a campaign file looks like',
    question:
      'What is on the platform today, and what shape does the event and campaign inventory take when it lands in the warehouse?',
    what:
      'Two files, two different labels, and they are never mixed. The first-party file is a real extract: externally verifiable facts about the entity, the live product and its listings, recovered from the public site, the app stores, ABN Lookup and RDAP on 2026-08-23. It deliberately contains no internal user, order, seat or payment counts — those are not externally accessible, and they are not fabricated. The synthetic campaign file stands in for that missing inventory, in the exact field shape the provider publishes, so the pipeline downstream can be built and tested now.',
    sources: [
      {
        slug: 'ticketalay-first-party-database',
        label: 'Ticketalay First-Party Database',
        mode: 'REAL',
        role: 'Real extract — ticketalay.com, Google Play, App Store, ABN Lookup, RDAP; accessed 2026-08-23. Entity, product, live listings and engagement.',
      },
      {
        slug: 'google-play-console',
        label: 'Google Play Console',
        mode: 'REAL',
        role: 'Real extract — play.google.com, accessed 2026-08-23. Public listing metrics for the India-only product.',
      },
      {
        slug: 'audience-republic',
        label: 'Audience Republic',
        mode: 'SYNTHETIC',
        role: 'Synthetic sample — mirrors provider spec. Campaign, channel, segment, audience size, open/click rate, ticket attribution and revenue.',
      },
    ],
    tables: [
      {
        caption: 'Rows copied verbatim from ticketalay-first-party-database.csv',
        mode: 'REAL',
        headers: ['Category', 'Finding', 'Value'],
        rows: [
          ['product', 'Default city on the homepage', 'Mumbai (India); nav items Natak / Cinema / Musicals / Other / Natyagruha'],
          ['event', 'Sample live listing', 'Katkon Trikon — Marathi thriller play, 2h30m, cast Sharad Ponkshe, Suyash Tilak, Priyanka Tendolkar'],
          ['event', 'Sample live listing', 'Sankarshan Via Spruha — Marathi play/performance listing'],
          ['entity', 'ticketalay.com.au (AU domain) status', 'Hostinger parked page over HTTP; HTTPS not served (TLS handshake fails, no certificate)'],
          ['engagement', 'Google Play install band', '“100K+ Downloads” — an install-count band, not verified ticket buyers or active users'],
          ['engagement', 'Google Play rating', '3.36 / 5 from 386 ratings'],
          ['payments', 'Currency', 'INR confirmed via store listings; pricing sits behind login and is not publicly visible'],
        ],
        note:
          'Seventeen such rows are in the file. There is no orders table, no seat map and no payment ledger, because none of it is externally accessible — obtaining it under NDA is open item U-07 and a G2 entry condition.',
      },
      {
        caption: 'All eight rows of audience-republic.csv — the stand-in inventory',
        mode: 'SYNTHETIC',
        headers: ['Campaign', 'Market', 'Channel', 'Audience', 'Open %', 'Click %', 'Tickets', 'Revenue A$'],
        rows: [
          ['mock-ar-c001 · Katkon Trikon presale', 'Melbourne, AU', 'Email', '2,450', '38.2', '6.1', '112', '6,160'],
          ['mock-ar-c002 · Katkon Trikon presale', 'Melbourne, AU', 'SMS', '610', '94.5', '19.8', '54', '2,970'],
          ['mock-ar-c003 · Sydney Marathi Natak Night', 'Sydney, AU', 'Email', '3,100', '29.7', '4.4', '88', '4,840'],
          ['mock-ar-c004 · Sydney Marathi Natak Night', 'Sydney, AU', 'Paid Social', '18,500', '—', '2.3', '41', '2,255'],
          ['mock-ar-c005 · Referral competition', 'Melbourne, AU', 'Referral', '890', '—', '—', '63', '3,465'],
          ['mock-ar-c006 · Diwali season push', 'Sydney, AU', 'Email', '4,200', '33.5', '5.6', '140', '7,700'],
          ['mock-ar-c007 · Diwali season push', 'Melbourne, AU', 'SMS', '520', '91.0', '22.4', '71', '3,905'],
          ['mock-ar-c008 · London expansion test', 'London, UK', 'Email', '1,350', '25.1', '3.2', '19', '1,045'],
        ],
        excludedRows: [7],
        note:
          'Synthetic sample — mirrors provider spec. Field names follow Audience Republic’s published campaign-attribution specification; every campaign name, audience size, rate, ticket count and revenue value is an illustrative mock figure. Row c008 (London) is the non-Australian row Step 03 routes out of the AU mart.',
      },
    ],
    gateG1:
      'Names precisely what the G1 first-party data review must retrieve — schema, ownership, consent state and export rights (U-07) — by showing which fields are missing today rather than describing them in the abstract.',
    gateG2:
      'The synthetic file is the build target. Ingest, conform and mart logic are written and tested against this shape, so real extracts can be swapped in without the pipeline changing.',
    limit:
      'Nothing in the synthetic file evidences Australian demand, Australian supply or Australian revenue, and nothing in the real extract supplies a ticket count. The AU domain is parked and there are zero contracted counterparties — the inventory here is a shape to build against, not a book of business.',
  },
  {
    n: 3,
    id: 'ingest',
    eyebrow: 'Step 03 · Ingest & conform',
    title: 'What the pipeline does to these exact files',
    question: 'A CSV lands in the bucket. What happens between the file and the mart?',
    what:
      'Seven rules, applied to the 120 files above and nothing else. The rules are deliberately dull: land raw, never lose the mode flag, conform tags rather than inventing them, quarantine instead of dropping, and carry provenance all the way to the dashboard. The right-hand column is not a description of intent — it is the result of running these rules over this sample set.',
    sources: [
      {
        slug: 'manifest',
        label: 'manifest.json',
        mode: 'REAL',
        role: 'The index that drives ingestion: 60 datasets, 120 files, per-dataset mode, country tags and row counts.',
      },
      {
        slug: 'imf-data',
        label: 'IMF Data (RBA rate table)',
        mode: 'REAL',
        role: 'Real extract — rba.gov.au, accessed 2026-08-23. The single currency-conformance rate table.',
      },
    ],
    tables: [
      {
        caption: 'The conform rules, and their result on this sample set',
        mode: 'REAL',
        headers: ['#', 'Rule', 'What it does', 'Result on these files'],
        rows: [
          [
            '1',
            'Land raw',
            'Both the .csv and the .json for each dataset are stored byte-for-byte, provider notice comment intact.',
            '120 files, 60 datasets, 601 data rows landed. Nothing rewritten.',
          ],
          [
            '2',
            'Carry the mode flag',
            'data_status (REAL_EXTRACT / SYNTHETIC_SAMPLE) is a required column and propagates to every downstream table and tile.',
            '209 rows flagged REAL_EXTRACT, 392 SYNTHETIC_SAMPLE. No row can reach a dashboard unlabelled.',
          ],
          [
            '3',
            'Conform country tags',
            'The manifest tag “Europe” maps to the site’s “EU”. “Global” stays its own tag and is never expanded into AU/UK/US/CA/EU.',
            '1 dataset remapped (Cognism). No Global row inherits a market.',
          ],
          [
            '4',
            'Conform currency',
            'Vendor figures stay in the currency the vendor publishes; one rate table converts, and the rate date travels with the conversion.',
            'RBA table, 2026-08-21: USD 0.7145, GBP 0.5234, EUR 0.6108, CAD 0.9832, INR 68.40 per A$1.',
          ],
          [
            '5',
            'Quarantine, never silently drop',
            'Rows failing a type, range or required-field test go to a quarantine table with the failing rule named.',
            '0 rows quarantined. Three blank cells across two rows are legitimate nulls — paid-social and referral channels have no open-rate metric — not failures.',
          ],
          [
            '6',
            'Route by jurisdiction',
            'market is parsed to a country and each row is routed to its own tax jurisdiction before it can reach a mart.',
            '7 rows → AU mart. 1 row (London) → UK jurisdiction, excluded from the AU finance mart.',
          ],
          [
            '7',
            'Preserve provenance',
            'source_url and access_date travel with the row into the mart and out onto the dashboard tile.',
            'Every real-extract figure on this page traces back to its publisher without leaving the warehouse.',
          ],
        ],
        note:
          'Rules 2 and 3 are the two that matter most for this programme: a synthetic row that loses its label becomes a false claim, and a “Global” tag silently read as “Australia” manufactures a market.',
      },
    ],
    gateG1:
      'Answers the technical feasibility check with the evidence that gate actually asks for — representative extracts, data dictionaries and control totals — rather than with a vendor’s assurance.',
    gateG2:
      'This is the ingest layer G2 funds. It is written once against these shapes and does not change when real extracts replace the synthetic ones.',
    limit:
      'A clean pipeline over sample files proves the mechanism, not the data. Zero quarantined rows here is a statement about seven small, well-formed files — not a quality claim about any vendor’s production feed.',
  },
  {
    n: 4,
    id: 'finance',
    eyebrow: 'Step 04 · Finance mart',
    title: 'A reconciliation that actually reconciles',
    question: 'Does the money add up, line by line, from the source rows to the mart?',
    what:
      'The Australian finance mart is built from the seven Australian campaign rows in the synthetic Audience Republic sample and the two Australian GST rows in the synthetic Avalara sample (10.0% GST, performing-arts ticket, Victoria and New South Wales). Every figure below is arithmetic on those rows. Nothing is forecast, nothing is grossed up, and no period beyond the sample exists.',
    sources: [
      {
        slug: 'audience-republic',
        label: 'Audience Republic',
        mode: 'SYNTHETIC',
        role: 'Synthetic sample — mirrors provider spec. Supplies tickets_sold_attributed and revenue_attributed_aud.',
      },
      {
        slug: 'avalara',
        label: 'Avalara',
        mode: 'SYNTHETIC',
        role: 'Synthetic sample — mirrors provider spec. Supplies the AU GST rate and jurisdiction routing; the 10.0% headline rate is the real statutory rate used as a realistic input.',
      },
    ],
    tables: [
      {
        caption: 'AU finance mart — Illustrative, prototype sample data only',
        mode: 'SYNTHETIC',
        headers: ['Line', 'Basis', 'Tickets', 'A$'],
        rows: [
          ['Melbourne campaigns', 'rows c001, c002, c005, c007', '300', '16,500.00'],
          ['Sydney campaigns', 'rows c003, c004, c006', '269', '14,795.00'],
          ['Gross attributed ticket revenue (GST-inclusive)', 'sum of the 7 AU rows', '569', '31,295.00'],
          ['GST at 10.0%', 'Avalara AU rows; GST-inclusive gross ÷ 11', '—', '2,845.00'],
          ['Net of GST', 'gross − GST', '569', '28,450.00'],
          ['Routed out of the AU mart', 'row c008, London — UK VAT jurisdiction (20.0%, not registered)', '19', '1,045.00'],
        ],
        excludedRows: [5],
        note:
          'Illustrative — prototype sample data only. These are not Ticketalay revenues, not a forecast, and not a basis for any return figure. Download both files and re-add every line.',
      },
    ],
    checks: [
      {
        label: 'Row completeness',
        result: '8 source rows → 7 in the AU mart + 1 routed to the UK jurisdiction = 8',
        variance: '0 unallocated',
      },
      {
        label: 'Ticket control total',
        result: '300 (Melbourne) + 269 (Sydney) = 569 = sum of tickets_sold_attributed',
        variance: '0 tickets',
      },
      {
        label: 'Revenue control total',
        result: 'A$16,500.00 + A$14,795.00 = A$31,295.00 = sum of revenue_attributed_aud',
        variance: 'A$0.00',
      },
      {
        label: 'GST cross-foot',
        result: 'A$28,450.00 × 10.0% = A$2,845.00, and A$31,295.00 ÷ 11 = A$2,845.00',
        variance: 'A$0.00',
      },
      {
        label: 'Implied average ticket',
        result: 'A$31,295.00 ÷ 569 = A$55.00, flat across all seven rows',
        variance: 'A$0.00 dispersion',
      },
    ],
    gateG1:
      'Nothing here substitutes for G1’s unit economics. Take rate, average transaction value, refund rate and repeat purchase rate are the study’s outputs; the mart has columns waiting for them and no values in those columns today.',
    gateG2:
      'This is the “reconciliation above an agreed threshold” that gate TG-2 asks for — demonstrated at zero variance, on downloadable files, with the arithmetic shown rather than asserted.',
    limit:
      'Illustrative — prototype sample data only. The purpose is to prove the reconciliation mechanism (control totals, zero variance, nothing unallocated), not to state a revenue. The flat A$55.00 average across all seven rows is itself the tell: a generated sample, not a real price distribution. Every real revenue variable — take rate, average transaction value, event volume, repeat rate — remains unknown until G1 delivers it.',
  },
  {
    n: 5,
    id: 'decisions',
    eyebrow: 'Step 05 · Decision outputs',
    title: 'Three certified dashboards, every KPI traceable to a file',
    question: 'What does Leadership actually look at — and can any number on it be checked?',
    what:
      'Certification here means dbt tests plus a named sign-off — a process, not a licence. Each KPI below names the file it came from and the test that guards it. Every tile inherits its file’s label: a synthetic-sourced tile cannot render without its amber marker, because the mode flag is a required column all the way through.',
    sources: [
      {
        slug: 'australian-bureau-of-statistics-abs',
        label: 'Australian Bureau of Statistics (ABS)',
        mode: 'REAL',
        role: 'Real extract — abs.gov.au, accessed 2026-08-23. Feeds the demand dashboard.',
      },
      {
        slug: 'audience-republic',
        label: 'Audience Republic',
        mode: 'SYNTHETIC',
        role: 'Synthetic sample — mirrors provider spec. Feeds the campaign and finance dashboards.',
      },
      {
        slug: 'avalara',
        label: 'Avalara',
        mode: 'SYNTHETIC',
        role: 'Synthetic sample — mirrors provider spec. Feeds the tax lines of the finance dashboard.',
      },
    ],
    tables: [],
    dashboards: [
      {
        name: 'Demand & Diaspora — Australia',
        mode: 'REAL',
        kpis: [
          { metric: 'Marathi spoken at home, Australia', value: '22,263', basis: 'Census 2021' },
          { metric: 'Marathi spoken at home, NSW / VIC', value: '9,753 / 7,170', basis: 'Census 2021' },
          { metric: 'Adult cultural attendance', value: '64%', basis: 'ABS 2021-22' },
          { metric: 'Theatre attendance', value: '8.0%', basis: 'ABS 2021-22' },
        ],
        source: [{ slug: 'australian-bureau-of-statistics-abs', label: 'australian-bureau-of-statistics-abs' }],
        certifies:
          'Not-null and range tests on every value; source_url and access_date required on every row; published state rows must not exceed the national total (9,753 + 7,170 ≤ 22,263).',
      },
      {
        name: 'Campaign & Channel — Australia',
        mode: 'SYNTHETIC',
        kpis: [
          { metric: 'Addressable records reached', value: '30,270', basis: '7 AU campaign rows' },
          { metric: 'Attributed tickets', value: '569', basis: 'sum of tickets_sold_attributed' },
          { metric: 'Best channel by click rate', value: 'SMS — 22.4%', basis: 'row c007, VIP past buyers' },
          { metric: 'Email open-rate range', value: '29.7% – 38.2%', basis: 'rows c001, c003, c006' },
        ],
        source: [{ slug: 'audience-republic', label: 'audience-republic' }],
        certifies:
          'Rate columns constrained to 0–100; ticket and revenue columns non-negative; every row carries data_status = SYNTHETIC_SAMPLE, so no tile can render without its amber label.',
      },
      {
        name: 'Finance & Reconciliation — Australia',
        mode: 'SYNTHETIC',
        kpis: [
          { metric: 'Gross attributed (GST-inclusive)', value: 'A$31,295.00', basis: '7 AU rows' },
          { metric: 'GST at 10.0%', value: 'A$2,845.00', basis: 'Avalara AU rows' },
          { metric: 'Net of GST', value: 'A$28,450.00', basis: 'gross − GST' },
          { metric: 'Reconciliation variance', value: 'A$0.00', basis: 'control totals, Step 04' },
        ],
        source: [
          { slug: 'audience-republic', label: 'audience-republic' },
          { slug: 'avalara', label: 'avalara' },
        ],
        certifies:
          'Control-total test: campaign rows must sum to the mart total. Jurisdiction test: no non-AU row may enter the AU mart. GST cross-foot must agree to the cent.',
      },
    ],
    gateG1:
      'Gives the G1 conversation a fixed set of numbers to argue with. Every KPI names a file, so a disagreement becomes a check somebody can run rather than an opinion somebody holds.',
    gateG2:
      'Gate TG-2’s exit evidence is three certified dashboards, reconciliation above an agreed threshold, and named users. The first two are demonstrated above on downloadable files; named users is an appointment, not a build.',
    limit:
      'Two of the three dashboards are amber for a reason: they are built on synthetic samples and are illustrative only. The demand dashboard is the sole one carrying real figures today, and even it reports denominators rather than demand.',
  },
];

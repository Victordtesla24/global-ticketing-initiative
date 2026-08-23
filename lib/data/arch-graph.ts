// Interactive end-to-end architecture graph — node-by-node explainers for a
// non-engineering reader.
//
// RULES THIS FILE OBEYS:
//  • Every cost anchor below is a figure already published on the architecture page
//    (the MVP reconciliation) or a charging basis already published in its technology
//    options table. No new monetary figure is introduced, and no forward revenue,
//    return or ROI figure appears anywhere in this file.
//  • Every artefact link points at a file that actually ships under /public/sample-data
//    or at a section of the prototype walkthrough that is built on those files.
//  • Synthetic sample rows are named as such wherever they are cited.

import { csvHref } from '@/lib/data/prototype';

export type ArchStageId = 'sources' | 'ingestion' | 'lakehouse' | 'marts' | 'activation' | 'governance';

export interface ArchStage {
  id: ArchStageId;
  label: string;
  /** One line on what this whole stage is for. */
  blurb: string;
}

export const ARCH_STAGES: ArchStage[] = [
  { id: 'sources', label: 'Source Systems', blurb: 'Where the data is born — nothing here is owned by the warehouse.' },
  { id: 'ingestion', label: 'Ingestion', blurb: 'The only doors into the platform. Everything else is downstream of these two.' },
  { id: 'lakehouse', label: 'Governed Lakehouse', blurb: 'Raw is kept, validated is derived, business-ready is published. Never the other way round.' },
  { id: 'marts', label: 'Data Marts', blurb: 'One governed subset per business question, with its own access list.' },
  { id: 'activation', label: 'Activation', blurb: 'Where a number stops being data and starts being a decision.' },
  { id: 'governance', label: 'Governance Spine', blurb: 'Runs underneath every stage above. Not a stage — a set of controls each stage must satisfy.' },
];

export type ArtefactKind = 'dataset' | 'walkthrough' | 'page';

export interface ArchArtefact {
  label: string;
  href: string;
  kind: ArtefactKind;
  mode?: 'REAL' | 'SYNTHETIC';
  /** Set for links that download a file rather than navigate. */
  download?: boolean;
}

export interface ArchNode {
  id: string;
  stage: ArchStageId;
  name: string;
  sub?: string;
  /** Plain-language "what this is" — one sentence a non-engineer gets. */
  plain: string;
  /** What happens to the data at this node. */
  happens: string;
  /** The concrete prototype artefact(s) behind this node. */
  artefacts: ArchArtefact[];
  /** Cost anchor — only figures and charging bases already published on this page. */
  cost: string;
  /** What can go wrong here. */
  risk: string;
  /** Medallion tint, where one applies. */
  tint?: 'landing' | 'bronze' | 'silver' | 'gold';
  /** Matching ARCH_LAYERS id, so the layer's technology and complexity can be shown. */
  layer?: string;
}

const A = {
  walk: (n: number, label: string): ArchArtefact => ({ label, href: `/prototype#walk-step-${n}`, kind: 'walkthrough' }),
  data: (slug: string, label: string, mode: 'REAL' | 'SYNTHETIC'): ArchArtefact => ({
    label, href: csvHref(slug), kind: 'dataset', mode, download: true,
  }),
  page: (href: string, label: string): ArchArtefact => ({ label, href, kind: 'page' }),
};

/** The whole-stack anchor, repeated in several node costs so no node invents its own. */
const MVP_BILL = 'The committed MVP bill of materials is A$46.43/mo [DERIVED] for the whole stack, at 8.0 setup days.';

export const ARCH_NODES: ArchNode[] = [
  /* ------------------------------------------------------------ SOURCES */
  {
    id: 'src-platform',
    stage: 'sources',
    name: 'First-Party Platform DB',
    sub: 'Orders · users · events · seats',
    layer: 'sources',
    plain:
      'The ticketing app’s own database — the single place where a sale actually happens and the only system that knows a real buyer bought a real seat.',
    happens:
      'Nothing is transformed here. The requirement at this node is documentation: who owns each table, how often it updates, what format it arrives in and what the platform is permitted to do with it.',
    artefacts: [
      A.data('ticketalay-first-party-database', 'ticketalay-first-party-database.csv', 'REAL'),
      A.walk(2, 'Walkthrough Step 02 — what the platform actually has today'),
    ],
    cost: `No purchase — these are existing systems, charged as internal labour / managed usage. No cost line is published for this layer. ${MVP_BILL}`,
    risk:
      'Financial evidence gap — self-assessed 25/25, the joint-highest risk on the register. There is no orders table, seat map or payment ledger in evidence today; obtaining them under NDA is open item U-07 and a G2 entry condition.',
  },
  {
    id: 'src-payments',
    stage: 'sources',
    name: 'Payments & Settlement',
    sub: 'Gateway · refunds · payouts',
    layer: 'sources',
    plain:
      'The payment provider’s record of what money moved — authorisations, refunds and the payouts that eventually land in the bank.',
    happens:
      'Settlement records are captured so that every order can later be matched against the money that actually arrived. Payment tokens travel; card numbers never do.',
    artefacts: [
      A.walk(4, 'Walkthrough Step 04 — the reconciliation this feed has to satisfy'),
      A.data('avalara', 'avalara.csv — jurisdiction and GST routing', 'SYNTHETIC'),
    ],
    cost: `No cost line is published for this layer; the charging basis is internal labour / managed usage. ${MVP_BILL}`,
    risk:
      'Cybersecurity and fraud — self-assessed 20/25. Payment tokens are restricted-access fields, and a settlement feed that cannot be matched to orders makes every revenue figure downstream unverifiable.',
  },
  {
    id: 'src-marketing',
    stage: 'sources',
    name: 'Marketing Platforms',
    sub: 'Meta · Google · email · CRM',
    layer: 'sources',
    plain:
      'The advertising and messaging tools — what was sent, to whom, what it cost and which ticket sale the platform claims it caused.',
    happens:
      'Campaign, channel, audience-size and attribution fields are collected in the shape each platform publishes them, so acquisition cost can later be compared against contribution.',
    artefacts: [
      A.data('audience-republic', 'audience-republic.csv — 8 campaign rows', 'SYNTHETIC'),
      A.walk(2, 'Walkthrough Step 02 — the stand-in campaign inventory'),
    ],
    cost: `No cost line is published for this layer; the charging basis is internal labour / managed usage. ${MVP_BILL}`,
    risk:
      'Acquisition cost exceeding contribution — self-assessed 20/25. Platform-reported attribution without incrementality testing flatters every channel it touches.',
  },
  {
    id: 'src-public',
    stage: 'sources',
    name: 'Public & Government Data',
    sub: 'ABS · ONS · Eurostat · census',
    layer: 'sources',
    plain:
      'Official statistics — the census and survey releases that supply the denominators no company can produce for itself.',
    happens:
      'Releases are extracted verbatim from the publisher, with the source URL and access date carried on every single row. Nothing is modelled, interpolated or rounded on the way in.',
    artefacts: [
      A.data('australian-bureau-of-statistics-abs', 'australian-bureau-of-statistics-abs.csv', 'REAL'),
      A.data('eurostat', 'eurostat.csv', 'REAL'),
      A.walk(1, 'Walkthrough Step 01 — denominators'),
    ],
    cost: `Publicly available at no charge; no cost line is published for this layer. ${MVP_BILL}`,
    risk:
      'A country tag read too generously. A “Global” row silently treated as “Australia” manufactures a market that was never measured — which is why tag conformance is an explicit ingest rule rather than an analyst’s judgement.',
  },
  {
    id: 'src-partner',
    stage: 'sources',
    name: 'Partner & Promoter Feeds',
    sub: 'Venues · producers · B2B',
    layer: 'sources',
    plain:
      'What the people who actually own the shows send in — venue capacities, performance dates, allocations and settlement terms.',
    happens:
      'Partner records are landed against the contract that permits them, so that inventory and B2B contact records inherit their permitted use rather than acquiring one later.',
    artefacts: [
      A.data('abr-abn-lookup', 'abr-abn-lookup.csv — counterparty registry checks', 'REAL'),
      A.page('/data-ecosystem', 'Data ecosystem — the full provider catalogue'),
    ],
    cost: `Enrichment vendors in this class are charged per record or per seat; no cost line is published for this layer and no written quote is on file for any of them. ${MVP_BILL}`,
    risk:
      'Weak inventory — self-assessed 20/25. There are zero named, signed promoter or venue counterparties today, so this feed currently has no contracted supply behind it.',
  },

  /* ---------------------------------------------------------- INGESTION */
  {
    id: 'ing-batch',
    stage: 'ingestion',
    name: 'Batch ETL',
    sub: 'AWS-native jobs · Airbyte · dbt',
    layer: 'ingestion',
    plain:
      'The scheduled collection round — once a night (or once an hour) it fetches whole files from each source and brings them in together.',
    happens:
      'Each file’s schema is checked, it is scanned for anything malformed or hostile, and it is routed to the Landing Zone unmodified. Rows that fail a type, range or required-field test are quarantined with the failing rule named — never silently dropped.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03 — the seven conform rules and their result'),
      A.page('/prototype#walkthrough', 'Prototype — 120 files, 601 rows, 0 quarantined'),
    ],
    cost: `Charged on compute / infrastructure, or per Monthly Active Row for the premium alternative. No cost line is published for this layer. ${MVP_BILL}`,
    risk:
      'Dropping instead of quarantining. A row deleted for failing a test removes a data problem from view without fixing it — the quarantine table exists so that failures stay countable.',
  },
  {
    id: 'ing-stream',
    stage: 'ingestion',
    name: 'Event Streaming',
    sub: 'Amazon Kinesis · real-time',
    layer: 'ingestion',
    plain:
      'The live wire — transactions and app events arrive the second they happen instead of waiting for the nightly run.',
    happens:
      'Events are buffered, ordered and written continuously, so inventory and settlement exceptions can be seen in near real time rather than the following morning.',
    artefacts: [A.walk(3, 'Walkthrough Step 03 — ingest rules apply identically to streamed rows')],
    cost:
      'Charged on throughput / storage. Not in the committed MVP bill of materials: streaming is post-G2 growth design and is re-proposable only against a measured trigger, not on preference.',
    risk:
      'Scalability failure — self-assessed 15/25. Unbuffered streams fail first and loudest under load; queues, rate limits and recovery drills are the stated mitigation, and none of them exist yet.',
  },

  /* ---------------------------------------------------------- LAKEHOUSE */
  {
    id: 'landing',
    stage: 'lakehouse',
    name: 'Landing Zone',
    sub: 'Raw quarantine · encrypted',
    tint: 'landing',
    layer: 'landing',
    plain:
      'A locked room where every incoming file is kept exactly as it arrived — encrypted, timestamped and untouched.',
    happens:
      'Both the .csv and the .json for each dataset are stored byte-for-byte with the provider’s own notice comment intact. Nothing is rewritten here, which is what makes everything after it re-provable.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03, rule 1 — land raw'),
      A.page('/prototype', 'Prototype — download all 60 datasets and 120 files'),
    ],
    cost: `Amazon S3 is inside the committed MVP bill of materials and is charged on storage + requests. ${MVP_BILL} A heavier storage tier is re-proposable only above 100 GB sustained.`,
    risk:
      'Correcting a file on the way in. The moment a landed file is edited, nothing downstream can be reprocessed or re-proven, and the source’s own version is gone.',
  },
  {
    id: 'bronze',
    stage: 'lakehouse',
    name: 'Bronze — Raw',
    sub: 'Immutable · full fidelity',
    tint: 'bronze',
    layer: 'bronze',
    plain:
      'The permanent raw record: every field the source sent, kept in full, so the business can change its mind later and recompute from scratch.',
    happens:
      'Landed files become queryable raw tables with full source fidelity. Analyst access is prohibited by default — Bronze is a reprocessing asset, not a reporting one.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03 — 209 rows flagged as real extracts, 392 as synthetic samples'),
      { label: 'manifest.json — the index that drives ingestion', href: '/sample-data/manifest.json', kind: 'dataset', mode: 'REAL', download: true },
    ],
    cost: `Storage is bundled with the Landing Zone’s S3 spend inside the committed MVP bill; no separate cost line is published for this layer. ${MVP_BILL}`,
    risk:
      'A raw row read as fact. Bronze rows are unvalidated by definition, and a synthetic-sample row that loses its mode flag on the way out of here becomes a false claim further downstream.',
  },
  {
    id: 'silver',
    stage: 'lakehouse',
    name: 'Silver — Validated',
    sub: 'Conformed · consented',
    tint: 'silver',
    layer: 'silver',
    plain:
      'Where messy raw data becomes trustworthy data — same facts, made consistent, de-duplicated and legally usable.',
    happens:
      'Quality rules run; timestamps and currencies are conformed against one dated rate table; duplicates are removed; personal identifiers are tokenised; consent status is mapped onto every customer row; and orders are reconciled to payments. Rows are routed to their own tax jurisdiction before they can reach any mart.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03 — rules 3 to 6, currency, consent and jurisdiction'),
      A.data('imf-data', 'imf-data.csv — the single dated rate table', 'REAL'),
    ],
    cost: `dbt Core is inside the committed MVP bill of materials. Managed Spark is not — a Spark-only transform is the named trigger to re-propose it, charged on job compute / credits. ${MVP_BILL}`,
    risk:
      'Privacy and consent failure — self-assessed 20/25. This is the highest-consequence node on the page: tokenisation and consent mapping happen here or they do not happen at all, and everything downstream inherits the omission.',
  },
  {
    id: 'gold',
    stage: 'lakehouse',
    name: 'Gold — Business-Ready',
    sub: 'The agreed measures',
    tint: 'gold',
    layer: 'gold',
    plain:
      'The one version of each number the business argues from — revenue, refund rate, contribution per ticket — defined once and computed the same way every time.',
    happens:
      'Validated rows are aggregated into the proposed business measures: gross transaction value, platform revenue, refund rate, contribution per ticket, repeat purchase rate and consented reachable audience.',
    artefacts: [
      A.walk(4, 'Walkthrough Step 04 — the measures computed line by line'),
      A.walk(5, 'Walkthrough Step 05 — every KPI traced back to its file'),
    ],
    cost: `Athena is inside the committed MVP bill of materials and is charged on bytes scanned; Redshift Serverless is not — scans above 1 TB/month is the named trigger to re-propose it. ${MVP_BILL}`,
    risk:
      'Treating these measures as settled. They are proposed definitions, not yet a board-approved reporting standard — this proposal is itself what goes to the board.',
  },

  /* -------------------------------------------------------------- MARTS */
  {
    id: 'mart-finance',
    stage: 'marts',
    name: 'Finance & Unit Economics',
    layer: 'marts',
    plain: 'The money view: what was sold, what was refunded, what tax is owed and what actually settled.',
    happens:
      'Orders, payments, refunds, settlements, fees and currency are assembled into reconciled financial truth, with control totals that must agree to the cent before anything is published.',
    artefacts: [
      A.walk(4, 'Walkthrough Step 04 — AU finance mart, zero variance'),
      A.data('audience-republic', 'audience-republic.csv', 'SYNTHETIC'),
      A.data('avalara', 'avalara.csv', 'SYNTHETIC'),
    ],
    cost: `No mart carries its own cost line, and none is published for this layer. ${MVP_BILL} The five marts are post-G2 growth design.`,
    risk:
      'A reconciliation that does not reconcile. Variance above the agreed threshold fails engineering gate TG-2 outright — the mart is the gate’s exit evidence, not a report.',
  },
  {
    id: 'mart-customer',
    stage: 'marts',
    name: 'Customer & Consent',
    layer: 'marts',
    plain: 'Who the buyers are, what they have agreed to, and what the business is therefore allowed to send them.',
    happens:
      'Accounts, interactions, consent events, deletion requests and segments are joined so that reachable audience is always a consented number, and deletion requests are provably honoured.',
    artefacts: [
      A.walk(5, 'Walkthrough Step 05 — the demand dashboard and its tests'),
      A.data('australian-bureau-of-statistics-abs', 'australian-bureau-of-statistics-abs.csv', 'REAL'),
    ],
    cost: `No mart carries its own cost line, and none is published for this layer. ${MVP_BILL}`,
    risk:
      'A stale consent state. Consent has to be event-driven: a reachable-audience figure computed on yesterday’s consent is wrong the day after it is published, and a missed deletion request is a reportable breach rather than a data-quality issue.',
  },
  {
    id: 'mart-events',
    stage: 'marts',
    name: 'Events, Venues & Inventory',
    layer: 'marts',
    plain: 'What is on sale, where, how much of it is left, and how much of the room actually filled.',
    happens:
      'Events, performances, seat allocations, venues, artists, promoters and scan records are combined into sell-through, capacity utilisation and lead-time measures.',
    artefacts: [
      A.data('ticketalay-first-party-database', 'ticketalay-first-party-database.csv — live listings', 'REAL'),
      A.walk(2, 'Walkthrough Step 02 — supply'),
    ],
    cost: `No mart carries its own cost line, and none is published for this layer. ${MVP_BILL}`,
    risk:
      'Weak inventory — self-assessed 20/25. With no contracted supply, sell-through and utilisation have no denominator, and the mart reports on an inventory that does not yet exist.',
  },
  {
    id: 'mart-marketing',
    stage: 'marts',
    name: 'Marketing & Growth',
    layer: 'marts',
    plain: 'What it costs to win a buyer, and whether the campaign actually caused the sale.',
    happens:
      'Campaigns, creative, impressions, clicks, attributions and purchases are joined to produce acquisition cost, return on ad spend, conversion rate and incrementality.',
    artefacts: [
      A.walk(5, 'Walkthrough Step 05 — the campaign dashboard'),
      A.data('audience-republic', 'audience-republic.csv — 7 AU rows, 1 routed to the UK', 'SYNTHETIC'),
    ],
    cost: `No mart carries its own cost line, and none is published for this layer. ${MVP_BILL}`,
    risk:
      'Acquisition cost exceeding contribution — self-assessed 20/25. Attribution without incrementality testing overstates return; channel caps and referral loops are the stated mitigation.',
  },
  {
    id: 'mart-markets',
    stage: 'marts',
    name: 'Markets, Partners & Risk',
    layer: 'marts',
    plain: 'The board’s view: which market to enter next, who the counterparty is, and what is currently going wrong.',
    happens:
      'Country indicators, prospects, contracts, incidents and compliance status are assembled to support market-entry decisions and counterparty due diligence.',
    artefacts: [
      A.data('abr-abn-lookup', 'abr-abn-lookup.csv — registry lookups', 'REAL'),
      A.page('/risk', 'Risk analysis — the register behind these scores'),
      A.page('/markets', 'Market opportunity — the country indicators'),
    ],
    cost: `No mart carries its own cost line, and none is published for this layer. ${MVP_BILL}`,
    risk:
      'Entity ambiguity — self-assessed 25/25, the joint-highest risk on the register. The public-register checks show the counterparty is not yet the entity this programme assumes, and the AU domain carries a renewal-prohibited flag.',
  },

  /* --------------------------------------------------------- ACTIVATION */
  {
    id: 'act-campaign',
    stage: 'activation',
    name: 'Campaign Activation',
    sub: 'Segments · audiences · ROAS',
    layer: 'consumption',
    plain: 'Turning a governed segment into an actual audience the marketing tools can send to.',
    happens:
      'Consented segments are pushed to advertising and messaging platforms, and the resulting spend and conversions are read back so that the loop closes inside the warehouse rather than inside a vendor dashboard.',
    artefacts: [
      A.data('audience-republic', 'audience-republic.csv — campaign attribution shape', 'SYNTHETIC'),
      A.walk(5, 'Walkthrough Step 05 — channel performance'),
    ],
    cost: `Charged per user / session / capacity at the tool, on top of media spend. No cost line is published for this layer. ${MVP_BILL}`,
    risk:
      'Activating an audience whose consent state was never mapped. That is a privacy failure rather than a marketing mistake, and it is the fastest route from a data problem to a regulatory one.',
  },
  {
    id: 'act-dashboards',
    stage: 'activation',
    name: 'Dashboards & BI',
    sub: 'Board and Leadership reporting',
    layer: 'consumption',
    plain: 'The screens Leadership actually looks at — every tile carrying the file it came from and the label of what kind of data it is.',
    happens:
      'Certified dashboards are published: dbt tests plus a named sign-off. Each tile inherits its file’s mode flag, so a synthetic-sourced tile cannot render without its amber marker.',
    artefacts: [
      A.walk(5, 'Walkthrough Step 05 — three certified dashboards'),
      A.page('/prototype#walkthrough', 'Prototype — the full end-to-end run'),
    ],
    cost: `QuickSight is inside the committed MVP bill of materials; self-hosted Metabase OSS is the A$0 [LIST] alternative. Charged per user / session / capacity — more than 8 dashboard readers is the named trigger to re-propose. ${MVP_BILL}`,
    risk:
      'A tile that loses its label. A synthetic-sample figure rendered without its marker becomes a false claim on a Leadership screen, which is exactly why the mode flag is a required column end to end.',
  },
  {
    id: 'act-api',
    stage: 'activation',
    name: 'APIs & ML Models',
    sub: 'Pricing · propensity · partners',
    layer: 'consumption',
    plain: 'Machine-to-machine delivery — governed data feeds for partners, and models that price or predict.',
    happens:
      'Gold-layer tables are exposed through a governed API for partner sharing, and become the training inputs for pricing and propensity models where a model is justified.',
    artefacts: [A.page('/recommendations', 'Recommendations — the sequencing this sits behind')],
    cost:
      'Charged on compute / inference. Not in the committed MVP bill of materials: this layer sits beyond the financial decision schedule and would require its own decision paper.',
    risk:
      'Building the model before the data is trustworthy. The stated rule is explicit — do not build AI before baseline data quality is demonstrated.',
  },

  /* --------------------------------------------------------- GOVERNANCE */
  {
    id: 'gov-consent',
    stage: 'governance',
    name: 'Consent & Privacy Enforcement',
    plain: 'The control that decides, for every row, whether the business is legally allowed to use it for this purpose.',
    happens:
      'Consent state is mapped in the Silver layer and enforced at every read after it. Personal identifiers are tokenised; deletion requests are executed and the proof of execution is retained as metadata.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03 — consent and jurisdiction rules'),
      A.page('/risk', 'Risk analysis — privacy and consent'),
    ],
    cost: `Enforced through the catalogue and permissions layer, charged on cloud use / platform / quote. No cost line is published for this control. ${MVP_BILL}`,
    risk:
      'Privacy and consent failure — self-assessed 20/25. Consent is either enforced at this spine or it is not enforced anywhere; a purpose review after the fact cannot retro-fit a permission that was never given.',
  },
  {
    id: 'gov-quality',
    stage: 'governance',
    name: 'Data-Quality Gates',
    plain: 'Automated tests that stop a bad number reaching a dashboard, instead of someone spotting it afterwards.',
    happens:
      'Type, range and required-field tests run on every load; failures go to a quarantine table with the failing rule named; control totals must agree before a mart publishes.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03 — 601 rows, 0 quarantined'),
      A.walk(4, 'Walkthrough Step 04 — the control-total ledger'),
    ],
    cost: `Implemented in dbt Core, which is inside the committed MVP bill of materials. No separate cost line is published for this control. ${MVP_BILL}`,
    risk:
      'Over-reading a clean run. Zero quarantined rows across seven small, well-formed sample files is a statement about the mechanism working — not a quality claim about any vendor’s production feed.',
  },
  {
    id: 'gov-lineage',
    stage: 'governance',
    name: 'Lineage & Traceability',
    plain: 'The paper trail: for any number on any screen, which file it came from and when that file was captured.',
    happens:
      'source_url and access_date travel with the row from landing all the way onto the dashboard tile, so a figure can be traced back to its publisher without leaving the warehouse.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03, rule 7 — preserve provenance'),
      A.page('/prototype', 'Prototype — every dataset labelled at source'),
    ],
    cost: `Carried by the catalogue, whose free tier is inside the committed MVP bill of materials. No separate cost line is published for this control. ${MVP_BILL}`,
    risk:
      'Losing provenance in transit. If the source URL and access date do not reach the tile, a disagreement about a number becomes an opinion somebody holds instead of a check somebody can run.',
  },
  {
    id: 'gov-residency',
    stage: 'governance',
    name: 'Residency & Transfer Controls',
    plain: 'The rules about where data is allowed to physically sit, and what has to be signed before it crosses a border.',
    happens:
      'Each row is routed to its own jurisdiction before it can enter a mart, and every cross-border route is bound to a named legal mechanism with a transfer impact assessment completed first.',
    artefacts: [
      A.walk(3, 'Walkthrough Step 03, rule 6 — route by jurisdiction'),
      A.data('data-privacy-framework', 'data-privacy-framework.csv', 'SYNTHETIC'),
    ],
    cost: `No cost line is published for this control; it is a design and legal obligation rather than a purchase. ${MVP_BILL}`,
    risk:
      'Citing the wrong instrument. The Australia-to-Canada route is governed by Australian Privacy Principle 8 of the Privacy Act 1988 (Cth) — the EU adequacy decision has no force over an Australian-origin disclosure, and a transfer impact assessment is required before any production data flows.',
  },
];

export const NODES_BY_STAGE: Record<ArchStageId, ArchNode[]> = {
  sources: ARCH_NODES.filter((n) => n.stage === 'sources'),
  ingestion: ARCH_NODES.filter((n) => n.stage === 'ingestion'),
  lakehouse: ARCH_NODES.filter((n) => n.stage === 'lakehouse'),
  marts: ARCH_NODES.filter((n) => n.stage === 'marts'),
  activation: ARCH_NODES.filter((n) => n.stage === 'activation'),
  governance: ARCH_NODES.filter((n) => n.stage === 'governance'),
};

export function findNode(id: string): ArchNode | undefined {
  return ARCH_NODES.find((n) => n?.id === id);
}

/* ------------------------------------------------------------------------- */
/* FOLLOW ONE TICKET                                                         */
/* One synthetic sample transaction, traced source to dashboard. Every figure */
/* quoted below is arithmetic already published in the prototype walkthrough  */
/* on the downloadable sample files — nothing here is a forecast.             */
/* ------------------------------------------------------------------------- */

export interface TicketStep {
  nodeId: string;
  /** Short caption — the decision-maker's mental model at this node. */
  caption: string;
}

export const TICKET_LABEL = 'Synthetic sample — mirrors provider spec';

/**
 * The marker rule this panel declares, in the same form the routes declare the
 * provenance set. The mode badge beside it labels the *file*; [ILLUSTRATIVE]
 * labels each *figure*, and the two are not interchangeable.
 */
export const TICKET_MARKER_RULE =
  'Every figure in this walkthrough carries [ILLUSTRATIVE] — computed from the downloadable sample files; ' +
  'an illustration of the pipeline, not a forecast or a commitment.';

export const TICKET_INTRO =
  'One ticket from row mock-ar-c001 of audience-republic.csv — a Melbourne buyer, Katkon Trikon presale, reached by email. ' +
  'Illustrative — prototype sample data only.';

export const TICKET_PATH: TicketStep[] = [
  {
    nodeId: 'src-platform',
    caption:
      'The sale happens. One seat, one buyer, one payment — written by the platform’s own database, the only system in the world that knows this ticket exists.',
  },
  {
    nodeId: 'ing-batch',
    caption:
      'The night’s file arrives. Its shape is checked against the schema the source promised, and it is stamped with where it came from and when. Not one value is edited.',
  },
  {
    nodeId: 'landing',
    caption:
      'The file is parked byte-for-byte, encrypted and timestamped. If anything downstream is ever disputed, this untouched copy is what settles it.',
  },
  {
    nodeId: 'bronze',
    caption:
      'The ticket becomes a raw row with every field the source sent. It is deliberately unreadable to analysts — its job is to make next year’s recomputation possible.',
  },
  {
    nodeId: 'silver',
    caption:
      'This is where the ticket becomes trustworthy: currency conformed against one dated rate table, buyer identifiers tokenised, consent state attached, order matched to payment, and the row routed to the Australian jurisdiction. A London row leaves the Australian path here.',
  },
  {
    nodeId: 'gold',
    caption:
      'The ticket now carries the measures Leadership argues about — gross, GST and net — computed from the row rather than asserted over it.',
  },
  {
    nodeId: 'mart-finance',
    caption:
      'It joins 568 others in the Australian finance mart, where the totals have to agree: 569 tickets, A$31,295.00 [ILLUSTRATIVE] gross, A$2,845.00 [ILLUSTRATIVE] GST at 10.0%, A$28,450.00 [ILLUSTRATIVE] net, A$0.00 [ILLUSTRATIVE] variance.',
  },
  {
    nodeId: 'act-dashboards',
    caption:
      'It surfaces as a fraction of one certified tile — carrying its own synthetic-sample label, the file it came from and the test that guards it. A reader who disbelieves the tile can download the file and re-add the line.',
  },
];

export const TICKET_CLOSE =
  'That is the whole mental model: eight nodes, one row, and a number a reader can check. The path above is run on downloadable sample files — it proves the mechanism, not the market.';

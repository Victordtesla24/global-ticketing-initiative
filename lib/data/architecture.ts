// DELIVERABLE 2 — data architecture. No AUD figure is published for any layer, stage or
// procurement option on this page: none had a published unit rate or a workload basis behind
// it. The committed MVP bill of materials, with prices, is the reconciliation below.

export const ARCH_LEDE =
  'The engine room of the Vision Statement. Every campaign audience, revenue metric and market-entry decision the ' +
  'vision depends on is meant to be produced here — a medallion lakehouse on AWS, serverless-first and deliberately ' +
  'staged so that spend scales with proven value, with consent and data-residency controls built in from day one. ' +
  'No cost figures appear on this page; the committed MVP stack is costed in the reconciliation below.';

export const ARCH_RECONCILIATION = {
  label: 'Which stack is actually committed — the reconciliation',
  value: 'MVP: S3 · Glue Data Catalog · Athena · dbt Core · QuickSight',
  note:
    'At MVP scale the committed bill of materials is S3, Glue Data Catalog free tier, Athena, dbt Core and QuickSight ' +
    '(Metabase OSS self-hosted as the A$0 [LIST] alternative — the vendor’s own pricing page publishes “Free unlimited ' +
    'users” for the self-hosted Open Source edition) at A$46.43/mo [DERIVED] run cost and 8.0 setup days, 7.0 of them ' +
    'committable before the U-07 disclosure. That is the funded day-1 system, and it supersedes the design on this ' +
    'page. The full lakehouse shown below (Kinesis streaming, Airbyte, Redshift Serverless, SageMaker, the five marts) ' +
    'is post-G2, trigger-gated growth design: a 10-layer stack is a category error for this entity at MVP scale, and ' +
    'each heavier layer may be re-proposed only against a measured trigger — storage > 100 GB sustained, scans > 1 ' +
    'TB/month, dashboard readers > 8, a Spark-only transform, or the first AU customer record. The Stage 1–3 teams ' +
    'below are likewise growth design: the day-1 roster prices no data-engineering hires — one fractional analyst, ' +
    'not “2–3 data engineers”.',
  provenance:
    'The MVP sizing statement, bill of materials and run cost; the growth layers and their re-proposal triggers; and ' +
    'the day-1 roster.',
};

export interface ArchLayer {
  id: string;
  name: string;
  medallion?: 'bronze' | 'silver' | 'gold' | 'landing';
  what: string;
  tech: string;
  complexity: string;
}

export const ARCH_LAYERS: ArchLayer[] = [
  { id: 'sources', name: 'Source Systems', what: 'Systems that generate or supply raw data — the ticketing app, payment gateway, CRM, public statistical sources and commercial APIs. Requirement: document every source’s owner, update frequency, data format and permitted use.', tech: 'No specific purchase — existing systems', complexity: 'Documentation discipline' },
  { id: 'ingestion', name: 'Ingestion Layer', what: 'Receives data from all sources, validates schema, checks for security threats and routes to the Landing Zone. Batch handles periodic loads; event streaming handles real-time transactions.', tech: 'AWS-native transfer and API jobs; Amazon Kinesis for streaming; Airbyte where connectors are needed. Fivetran is a premium alternative charging by Monthly Active Rows.', complexity: 'Medium' },
  { id: 'landing', name: 'Landing Zone', medallion: 'landing', what: 'Secure quarantine area where incoming data is stored in its original form. Encrypted, timestamped, uniquely identified. Nothing is modified at this stage.', tech: 'Amazon S3 — durable, low-cost object storage with encryption at rest', complexity: 'Low' },
  { id: 'bronze', name: 'Bronze Layer (Raw)', medallion: 'bronze', what: 'Stores raw records with full source fidelity, enabling reprocessing if business rules change. Analyst access prohibited by default. Its storage cost is bundled with the Landing Zone’s S3 spend.', tech: 'Amazon S3 with Apache Iceberg or Delta Lake table format', complexity: 'Low–Medium' },
  { id: 'silver', name: 'Silver Layer (Validated)', medallion: 'silver', what: 'Applies quality rules, standardises timestamps and currencies, deduplicates, tokenises personal identifiers, maps consent status and reconciles orders to payments.', tech: 'AWS Glue (managed Spark) with dbt Core for version-controlled transformations', complexity: 'Medium–High' },
  { id: 'gold', name: 'Gold Layer (Business-Ready)', medallion: 'gold', what: 'Proposed business measures: GTV, platform revenue, refund rate, contribution per ticket, repeat purchase rate, consented reachable audience. Not yet a board-approved reporting standard — this proposal is itself what goes to the board.', tech: 'Amazon Redshift Serverless plus Amazon Athena; dbt manages Silver-to-Gold transformation', complexity: 'Medium' },
  { id: 'marts', name: 'Data Marts', what: 'Purpose-built subsets of Gold data for specific business teams, each with its own access controls, retention policies and metric definitions.', tech: 'Logical schemas within Redshift Serverless, governed by AWS Lake Formation', complexity: 'Medium' },
  { id: 'consumption', name: 'Consumption Layer', what: 'Delivers insights to human users (dashboards, reports) and automated systems (APIs, ML models).', tech: 'Amazon QuickSight for BI; SageMaker for AI/ML when justified; API Gateway with Lambda for governed sharing. Do not build AI before baseline data quality is demonstrated.', complexity: 'Medium' },
];

export const DATA_MARTS = [
  { name: 'Finance & Unit Economics', purpose: 'Reconciled financial truth for revenue recognition, settlement tracking and unit-economics analysis', tables: 'Orders, Payments, Refunds, Settlements, Fees, Currency', metrics: 'GTV, Recognised Revenue, Take Rate, Refund Rate, Settlement Variance, Contribution per Ticket', access: 'CFO, Finance team, External auditors (read-only)', sensitive: 'Payment tokens, tax fields (restricted)', refresh: 'Daily reconciliation; real-time for settlement exceptions' },
  { name: 'Customer & Consent', purpose: 'Understand buyer behaviour under strict consent and privacy controls', tables: 'Accounts, Interactions, Consent Events, Deletion Requests, Segments', metrics: 'Active Buyers, Repeat Rate, Consented Reachable Audience, Deletion SLA Compliance', access: 'Customer team, Marketing (consented attributes only), Privacy officer', sensitive: 'Name, email, phone, location (tokenised)', refresh: 'Event-driven for consent; daily for behavioural aggregates' },
  { name: 'Events, Venues & Inventory', purpose: 'Track event supply, venue utilisation and operational performance', tables: 'Events, Performances, Seats/Allocations, Venues, Artists, Promoters, Scan Records', metrics: 'Sell-Through Rate, Venue Capacity Utilisation, Lead Time to Purchase, Scan Rate', access: 'Operations team, Event managers, Promoter portal (filtered)', sensitive: 'Operational access tokens (restricted)', refresh: 'Real-time inventory; daily performance metrics' },
  { name: 'Marketing & Growth', purpose: 'Measure acquisition efficiency and campaign performance', tables: 'Campaigns, Creative, Impressions, Clicks, Attributions, Purchases', metrics: 'CAC, ROAS, Conversion Rate, Incrementality', access: 'Marketing team, Growth team, CMO', sensitive: 'Ad identifiers and audience membership (no raw PII)', refresh: 'Daily campaign metrics; weekly attribution models' },
  { name: 'Markets, Partners & Risk', purpose: 'Support market-entry decisions, partner due diligence and risk monitoring', tables: 'Country Indicators, Prospects, Contracts, Incidents, Compliance Status', metrics: 'Market Opportunity Score, Partner Pipeline Value, Control Status, Incident Count', access: 'CEO, Strategy team, Legal/compliance, Board (summary)', sensitive: 'B2B contacts and due-diligence records (restricted)', refresh: 'Monthly market indicators; event-driven incidents' },
];

// Growth path. No user, session, order or run-cost figure is published for any stage.
// Infrastructure and team shape stand as design intent.
export const SCALABILITY_OPEN_ITEM = {
  ref: 'U-03 / U-04',
  title: 'Growth-stage user, order and run-cost figures',
  unknown:
    'No monthly-active-user, session, annual-order or run-cost figure is published for any of the three growth stages ' +
    'below. No primary diaspora demand, fee-tolerance or platform-trust study exists to size active users, sessions or ' +
    'orders for this audience, and there are zero named, signed promoter or venue counterparties, so no ticket-volume ' +
    'figure has contracted supply behind it.',
  owner: 'Research lead and Commercial lead (both roles currently unassigned — LT to appoint)',
  action:
    'Commission a primary study of Marathi/Indian-origin event buyers in Melbourne/Sydney (U-04), and secure at least ' +
    'three signed pilot-event agreements or dated letters of intent (U-03), before any user, order or run-cost figure ' +
    'is set for any stage.',
};

export const SCALABILITY = [
  { stage: 'Stage 1', posture: 'Serverless, scheduled processing, one BI environment', infra: 'Single AWS account; S3, Glue, Redshift Serverless, QuickSight', team: '2–3 data engineers (can be contractors); fractional architect', trigger: 'Prove reconciled metrics and demonstrate user value' },
  { stage: 'Stage 2', posture: 'Autoscaling ingestion, separated dev/test/prod, stronger observability', infra: 'Multi-environment AWS; dedicated networking; monitoring and alerting', team: '4–6 data/platform engineers; dedicated BI developer; data analyst', trigger: 'Add availability guarantees, private networking and formal on-call support' },
  { stage: 'Stage 3', posture: 'Multi-account, queue buffering, load testing, regional recovery design', infra: 'Multi-account AWS; cross-region recovery; CDN; advanced security', team: '8–12+ platform, data and security engineers; dedicated governance', trigger: 'Dedicated platform/security team and negotiated cloud commitments' },
];

export const TECH_COMPARISON_NOTE =
  'No indicative AUD/yr price is published against any row below: none could cite a published vendor rate or a ' +
  'workload assumption to ground it, and no written quote is on file for any of these vendors. What each row gives ' +
  'instead is the basis on which that layer is actually charged. The recommended, alternative and premium-alternative ' +
  'products are this proposal’s own technology choices.';

export const TECH_COMPARISON = [
  { layer: 'Source Contracts', opt1: 'Open JSON schemas', opt2: 'AWS Glue Schema Registry', opt3: 'Confluent Schema Registry', pricing: 'Internal labour / managed usage' },
  { layer: 'Batch Ingestion', opt1: 'AWS-native jobs', opt2: 'Airbyte (open-source)', opt3: 'Fivetran (MAR-based)', pricing: 'Compute / infra / MAR' },
  { layer: 'Streaming', opt1: 'Amazon Kinesis', opt2: 'Amazon MSK (Kafka)', opt3: 'Confluent Cloud', pricing: 'Throughput / storage' },
  { layer: 'Landing/Raw Storage', opt1: 'Amazon S3', opt2: 'Azure Data Lake Storage Gen2', opt3: 'Google Cloud Storage', pricing: 'Storage + requests' },
  { layer: 'Processing', opt1: 'AWS Glue/Spark', opt2: 'Databricks', opt3: 'Snowflake Processing', pricing: 'Job compute / DBU / credits' },
  { layer: 'Warehouse/Query', opt1: 'Redshift Serverless + Athena', opt2: 'Snowflake', opt3: 'BigQuery', pricing: 'RPU / credits / bytes' },
  { layer: 'Orchestration', opt1: 'AWS Step Functions + dbt Core', opt2: 'Prefect', opt3: 'dbt Cloud', pricing: 'Usage / workspace / seats' },
  { layer: 'Governance', opt1: 'Lake Formation + Glue Catalogue', opt2: 'Databricks Unity Catalog', opt3: 'Alation/Collibra', pricing: 'Cloud use / platform / quote' },
  { layer: 'BI', opt1: 'Amazon QuickSight', opt2: 'Power BI', opt3: 'Looker', pricing: 'User / session / capacity' },
  { layer: 'AI/API', opt1: 'SageMaker + API Gateway', opt2: 'Databricks ML', opt3: 'BigQuery ML + API', pricing: 'Compute / inference' },
];

// TG-0…TG-4 are engineering approval gates, numbered distinctly from the financial decision
// schedule, which runs G0–G2 only.
export const APPROVAL_GATES_NOTE =
  'These are engineering approval gates, numbered TG-0…TG-4 so they cannot be confused with the financial decision ' +
  'schedule, which runs G0–G2 only: G0 due diligence & terms, G1 discovery — the primary demand study, not data ' +
  'feasibility — and G2 MVP build. There is no G3 on that schedule. Mapping: TG-0 sits inside G0’s scope; TG-1 is a ' +
  'technical check consumed within G1’s discovery scope, not G1 itself; TG-2 is G2’s exit test; TG-3 and TG-4 lie ' +
  'beyond the financial schedule and would each require a new decision paper.';

export const APPROVAL_GATES = [
  { gate: 'TG-0: Entity and Rights', evidence: 'Certified entity, ownership, IP, data and contract rights', outcome: 'Stop all work' },
  { gate: 'TG-1: Data Feasibility', evidence: 'Representative extracts, data dictionaries, control totals and consent samples', outcome: 'Do not build' },
  { gate: 'TG-2: MVP Value', evidence: 'Three certified dashboards, reconciliation above agreed threshold, named users', outcome: 'Fix or stop' },
  { gate: 'TG-3: Production', evidence: 'Security review, recovery test, retention policies, vendor DPAs, runbook', outcome: 'No production PII' },
  { gate: 'TG-4: Scale', evidence: 'Demonstrated unit economics, reliability and procurement case', outcome: 'Avoid committed licences' },
];

export const SANKEY_FLOWS = [
  { source: 'First-Party Data', target: 'Ingestion Layer', value: 40, label: 'Transactions, app events' },
  { source: 'Public Statistics', target: 'Ingestion Layer', value: 20, label: 'ABS, Census, Eurostat' },
  { source: 'Commercial APIs', target: 'Ingestion Layer', value: 15, label: 'Similarweb, geocoding' },
  { source: 'B2B Enrichment', target: 'Ingestion Layer', value: 10, label: 'Cognism, Apollo' },
  { source: 'Regulatory Sources', target: 'Ingestion Layer', value: 15, label: 'FTC, USCIS, ABR' },
  { source: 'Ingestion Layer', target: 'Bronze (Raw)', value: 100, label: 'All validated sources' },
  { source: 'Bronze (Raw)', target: 'Silver (Cleaned)', value: 95, label: '5% quarantined' },
  { source: 'Silver (Cleaned)', target: 'Gold (Business)', value: 90, label: 'Quality-tested' },
  { source: 'Gold (Business)', target: 'Finance Mart', value: 25, label: 'Revenue, settlements' },
  { source: 'Gold (Business)', target: 'Customer Mart', value: 25, label: 'Buyers, consent' },
  { source: 'Gold (Business)', target: 'Events Mart', value: 20, label: 'Inventory, venues' },
  { source: 'Gold (Business)', target: 'Marketing Mart', value: 15, label: 'Campaigns, CAC' },
  { source: 'Gold (Business)', target: 'Market/Risk Mart', value: 15, label: 'Opportunities, compliance' },
];

export const RETENTION = [
  { type: 'Transaction records', retention: '7 years', why: 'Tax and audit obligations' },
  { type: 'Customer consent records', retention: 'Relationship + 3 years', why: 'Regulatory evidence' },
  { type: 'Marketing campaign data', retention: '3 years', why: 'Performance analysis and attribution' },
  { type: 'Raw Bronze data', retention: '3 years minimum', why: 'Reprocessing capability' },
  { type: 'Operational logs', retention: '2 years', why: 'Security and incident investigation' },
  { type: 'Deletion request records', retention: 'Permanent (metadata only)', why: 'Proof of compliance' },
];

export const TRANSFER_ROUTES = [
  { route: 'Australia to EU', mechanism: 'Standard Contractual Clauses (SCCs) or adequacy decision' },
  { route: 'Australia to UK', mechanism: 'UK International Data Transfer Agreement or UK SCCs' },
  { route: 'Australia to USA', mechanism: 'EU-US Data Privacy Framework (participating vendors); SCCs otherwise' },
  { route: 'Australia to Canada', mechanism: 'APP 8 (Privacy Act 1988 (Cth)) reasonable-steps assessment before disclosure' },
  { route: 'Any transfer', mechanism: 'Transfer Impact Assessment required before production data flows' },
];

export const TRANSFER_ROUTES_NOTE =
  'On the Australia-to-Canada route, the EU adequacy decision for Canada’s PIPEDA is not the legal basis: it is a GDPR ' +
  'instrument governing EU-to-Canada transfers only, and it has no legal force over an Australian-origin disclosure. ' +
  'That disclosure is governed instead by Australian Privacy Principle 8 of the Privacy Act 1988 (Cth).';

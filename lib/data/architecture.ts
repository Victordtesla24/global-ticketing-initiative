// DELIVERABLE 2 — data architecture. All AUD [EST].
export interface ArchLayer {
  id: string; name: string; medallion?: 'bronze' | 'silver' | 'gold' | 'landing';
  what: string; tech: string; complexity: string;
  costs: { label: string; t10k: string; t100k: string; t1m: string }[];
  costNote?: string;
}

export const ARCH_LAYERS: ArchLayer[] = [
  { id: 'sources', name: 'Source Systems', what: 'Systems that generate or supply raw data — the ticketing app, payment gateway, CRM, public statistical sources and commercial APIs. Requirement: document every source’s owner, update frequency, data format and permitted use.', tech: 'No specific purchase — existing systems', complexity: 'Documentation discipline', costs: [], costNote: 'Internal operational cost only' },
  { id: 'ingestion', name: 'Ingestion Layer', what: 'Receives data from all sources, validates schema, checks for security threats and routes to the Landing Zone. Batch handles periodic loads; event streaming handles real-time transactions.', tech: 'AWS-native transfer and API jobs; Amazon Kinesis for streaming; Airbyte where connectors needed. Fivetran is a premium alternative charging by Monthly Active Rows.', complexity: 'Medium', costs: [
    { label: 'Batch ingestion', t10k: '500–1,500', t100k: '2,000–6,000', t1m: '8,000–25,000' },
    { label: 'Streaming (Kinesis)', t10k: '250–1,000', t100k: '1,500–5,000', t1m: '6,000–20,000' },
    { label: 'Connectors (Airbyte/managed)', t10k: '250–1,500', t100k: '1,000–6,000', t1m: '5,000–20,000' },
  ] },
  { id: 'landing', name: 'Landing Zone', medallion: 'landing', what: 'Secure quarantine area where incoming data is stored in its original form. Encrypted, timestamped, uniquely identified. Nothing is modified at this stage.', tech: 'Amazon S3 — durable, low-cost object storage with encryption at rest', complexity: 'Low', costs: [ { label: 'Storage', t10k: '150–1,000', t100k: '—', t1m: '2,000–10,000' } ], costNote: 'Depending on volume and retention' },
  { id: 'bronze', name: 'Bronze Layer (Raw)', medallion: 'bronze', what: 'Stores raw records with full source fidelity, enabling reprocessing if business rules change. Analyst access prohibited by default.', tech: 'Amazon S3 with Apache Iceberg or Delta Lake table format', complexity: 'Low–Medium', costs: [], costNote: 'Included in storage costs' },
  { id: 'silver', name: 'Silver Layer (Validated)', medallion: 'silver', what: 'Applies quality rules, standardises timestamps and currencies, deduplicates, tokenises personal identifiers, maps consent status and reconciles orders to payments.', tech: 'AWS Glue (managed Spark) with dbt Core for version-controlled transformations', complexity: 'Medium–High', costs: [
    { label: 'Processing (Glue/Spark)', t10k: '500–2,500', t100k: '3,000–12,000', t1m: '12,000–45,000' },
    { label: 'Orchestration', t10k: '200–800', t100k: '500–2,000', t1m: '2,000–8,000' },
  ] },
  { id: 'gold', name: 'Gold Layer (Business-Ready)', medallion: 'gold', what: 'Board-approved business measures: GTV, platform revenue, refund rate, contribution per ticket, repeat purchase rate, consented reachable audience. The single source of truth for reporting.', tech: 'Amazon Redshift Serverless plus Amazon Athena; dbt manages Silver-to-Gold transformation', complexity: 'Medium', costs: [
    { label: 'Warehouse (Redshift Serverless)', t10k: '500–2,500', t100k: '3,000–15,000', t1m: '15,000–60,000' },
    { label: 'Ad-hoc queries (Athena)', t10k: '100–500', t100k: '500–2,000', t1m: '2,000–8,000' },
  ] },
  { id: 'marts', name: 'Data Marts', what: 'Purpose-built subsets of Gold data for specific business teams, each with its own access controls, retention policies and metric definitions.', tech: 'Logical schemas within Redshift Serverless, governed by AWS Lake Formation', complexity: 'Medium', costs: [], costNote: 'Included in warehouse costs' },
  { id: 'consumption', name: 'Consumption Layer', what: 'Delivers insights to human users (dashboards, reports) and automated systems (APIs, ML models).', tech: 'Amazon QuickSight for BI; SageMaker for AI/ML when justified; API Gateway with Lambda for governed sharing. Do not build AI before baseline data quality is demonstrated.', complexity: 'Medium', costs: [
    { label: 'BI (QuickSight)', t10k: '500–2,000', t100k: '2,000–8,000', t1m: '8,000–25,000' },
    { label: 'API services', t10k: '200–800', t100k: '1,000–5,000', t1m: '5,000–20,000' },
    { label: 'AI/ML (when justified)', t10k: '0', t100k: '1,000–5,000', t1m: '5,000–30,000' },
  ] },
];

export const DATA_MARTS = [
  { name: 'Finance & Unit Economics', purpose: 'Reconciled financial truth for revenue recognition, settlement tracking and unit-economics analysis', tables: 'Orders, Payments, Refunds, Settlements, Fees, Currency', metrics: 'GTV, Recognised Revenue, Take Rate, Refund Rate, Settlement Variance, Contribution per Ticket', access: 'CFO, Finance team, External auditors (read-only)', sensitive: 'Payment tokens, tax fields (restricted)', refresh: 'Daily reconciliation; real-time for settlement exceptions' },
  { name: 'Customer & Consent', purpose: 'Understand buyer behaviour under strict consent and privacy controls', tables: 'Accounts, Interactions, Consent Events, Deletion Requests, Segments', metrics: 'Active Buyers, Repeat Rate, Consented Reachable Audience, Deletion SLA Compliance', access: 'Customer team, Marketing (consented attributes only), Privacy officer', sensitive: 'Name, email, phone, location (tokenised)', refresh: 'Event-driven for consent; daily for behavioural aggregates' },
  { name: 'Events, Venues & Inventory', purpose: 'Track event supply, venue utilisation and operational performance', tables: 'Events, Performances, Seats/Allocations, Venues, Artists, Promoters, Scan Records', metrics: 'Sell-Through Rate, Venue Capacity Utilisation, Lead Time to Purchase, Scan Rate', access: 'Operations team, Event managers, Promoter portal (filtered)', sensitive: 'Operational access tokens (restricted)', refresh: 'Real-time inventory; daily performance metrics' },
  { name: 'Marketing & Growth', purpose: 'Measure acquisition efficiency and campaign performance', tables: 'Campaigns, Creative, Impressions, Clicks, Attributions, Purchases', metrics: 'CAC, ROAS, Conversion Rate, Incrementality', access: 'Marketing team, Growth team, CMO', sensitive: 'Ad identifiers and audience membership (no raw PII)', refresh: 'Daily campaign metrics; weekly attribution models' },
  { name: 'Markets, Partners & Risk', purpose: 'Support market-entry decisions, partner due diligence and risk monitoring', tables: 'Country Indicators, Prospects, Contracts, Incidents, Compliance Status', metrics: 'Market Opportunity Score, Partner Pipeline Value, Control Status, Incident Count', access: 'CEO, Strategy team, Legal/compliance, Board (summary)', sensitive: 'B2B contacts and due-diligence records (restricted)', refresh: 'Monthly market indicators; event-driven incidents' },
];

export const SCALABILITY = [
  { stage: 'Stage 1', mau: '10,000 MAU', posture: 'Serverless, scheduled processing, one BI environment', workload: '50,000 sessions/month; 20,000 orders/year; daily batch; limited event stream [EST]', infra: 'Single AWS account; S3, Glue, Redshift Serverless, QuickSight', team: '2–3 data engineers (can be contractors); fractional architect', cost: 'AUD 60,000–150,000/yr [EST]', trigger: 'Prove reconciled metrics and demonstrate user value' },
  { stage: 'Stage 2', mau: '100,000 MAU', posture: 'Autoscaling ingestion, separated dev/test/prod, stronger observability', workload: '500,000 sessions/month; 250,000 orders/year; near-real-time transactions [EST]', infra: 'Multi-environment AWS; dedicated networking; monitoring and alerting', team: '4–6 data/platform engineers; dedicated BI developer; data analyst', cost: 'AUD 180,000–450,000/yr [EST]', trigger: 'Add availability guarantees, private networking and formal on-call support' },
  { stage: 'Stage 3', mau: '1,000,000 MAU', posture: 'Multi-account, queue buffering, load testing, regional recovery design', workload: '5m sessions/month; 3m orders/year; burst ticket launches [EST]', infra: 'Multi-account AWS; cross-region recovery; CDN; advanced security', team: '8–12+ platform, data and security engineers; dedicated governance', cost: 'AUD 600,000–1,800,000/yr [EST]', trigger: 'Dedicated platform/security team and negotiated cloud commitments' },
];

export const TECH_COMPARISON = [
  { layer: 'Source Contracts', opt1: 'Open JSON schemas', opt2: 'AWS Glue Schema Registry', opt3: 'Confluent Schema Registry', pricing: 'Internal labour / managed usage', cost: '5,000–20,000' },
  { layer: 'Batch Ingestion', opt1: 'AWS-native jobs', opt2: 'Airbyte (open-source)', opt3: 'Fivetran (MAR-based)', pricing: 'Compute / infra / MAR', cost: '6,000–35,000' },
  { layer: 'Streaming', opt1: 'Amazon Kinesis', opt2: 'Amazon MSK (Kafka)', opt3: 'Confluent Cloud', pricing: 'Throughput / storage', cost: '3,000–25,000' },
  { layer: 'Landing/Raw Storage', opt1: 'Amazon S3', opt2: 'Azure Data Lake Storage Gen2', opt3: 'Google Cloud Storage', pricing: 'Storage + requests', cost: '2,000–12,000' },
  { layer: 'Processing', opt1: 'AWS Glue/Spark', opt2: 'Databricks', opt3: 'Snowflake Processing', pricing: 'Job compute / DBU / credits', cost: '10,000–80,000' },
  { layer: 'Warehouse/Query', opt1: 'Redshift Serverless + Athena', opt2: 'Snowflake', opt3: 'BigQuery', pricing: 'RPU / credits / bytes', cost: '8,000–70,000' },
  { layer: 'Orchestration', opt1: 'AWS Step Functions + dbt Core', opt2: 'Prefect', opt3: 'dbt Cloud', pricing: 'Usage / workspace / seats', cost: '5,000–35,000' },
  { layer: 'Governance', opt1: 'Lake Formation + Glue Catalogue', opt2: 'Databricks Unity Catalog', opt3: 'Alation/Collibra', pricing: 'Cloud use / platform / quote', cost: '8,000–100,000' },
  { layer: 'BI', opt1: 'Amazon QuickSight', opt2: 'Power BI', opt3: 'Looker', pricing: 'User / session / capacity', cost: '8,000–40,000' },
  { layer: 'AI/API', opt1: 'SageMaker + API Gateway', opt2: 'Databricks ML', opt3: 'BigQuery ML + API', pricing: 'Compute / inference', cost: '5,000–60,000' },
];

export const APPROVAL_GATES = [
  { gate: 'G0: Entity and Rights', evidence: 'Certified entity, ownership, IP, data and contract rights', outcome: 'Stop all work' },
  { gate: 'G1: Data Feasibility', evidence: 'Representative extracts, data dictionaries, control totals and consent samples', outcome: 'Do not build' },
  { gate: 'G2: MVP Value', evidence: 'Three certified dashboards, reconciliation above agreed threshold, named users', outcome: 'Fix or stop' },
  { gate: 'G3: Production', evidence: 'Security review, recovery test, retention policies, vendor DPAs, runbook', outcome: 'No production PII' },
  { gate: 'G4: Scale', evidence: 'Demonstrated unit economics, reliability and procurement case', outcome: 'Avoid committed licences' },
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
  { route: 'Australia to Canada', mechanism: 'Adequacy decision (PIPEDA deemed adequate by EU)' },
  { route: 'Any transfer', mechanism: 'Transfer Impact Assessment required before production data flows' },
];

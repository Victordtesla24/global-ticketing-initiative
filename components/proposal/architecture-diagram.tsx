'use client';

import { useId } from 'react';

/* Professional end-to-end architecture diagram: sources -> ingestion -> governed
   lakehouse (bronze/silver/gold) -> data marts -> activation, with animated data
   flows and a governance strip. Pure SVG so it is crisp, printable and fast. */

const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C96A';
const PANEL = '#141414';
const PANEL_EDGE = 'rgba(201,168,76,0.35)';
const TEXT = '#EDEDED';
const MUTED = '#9C9C94';

const SOURCES = [
  { name: 'First-Party Platform DB', sub: 'Orders · users · events · seats' },
  { name: 'Payments & Settlement', sub: 'Gateway · refunds · payouts' },
  { name: 'Marketing Platforms', sub: 'Meta · Google · email · CRM' },
  { name: 'Public & Government Data', sub: 'ABS · ONS · Eurostat · census' },
  { name: 'Partner & Promoter Feeds', sub: 'Venues · producers · B2B' },
];

const INGESTION = [
  { name: 'Batch ETL', sub: 'AWS Glue · Airbyte · dbt' },
  { name: 'Event Streaming', sub: 'Amazon Kinesis · real-time' },
];

const MEDALLION = [
  { name: 'BRONZE', sub: 'Raw, immutable', tint: '#B07B3E' },
  { name: 'SILVER', sub: 'Validated, consented', tint: '#BFC5CC' },
  { name: 'GOLD', sub: 'Business-ready truth', tint: GOLD_LIGHT },
];

const MARTS = [
  'Finance & Unit Economics',
  'Customer & Consent',
  'Events & Inventory',
  'Marketing & Growth',
  'Markets, Partners & Risk',
];

const CONSUMPTION = [
  { name: 'Campaign Activation', sub: 'Segments · audiences · ROAS' },
  { name: 'Dashboards & BI', sub: 'QuickSight · board reporting' },
  { name: 'APIs & ML Models', sub: 'Pricing · propensity · partners' },
];

// Layout constants (viewBox 1400 x 620)
const SRC_X = 8, SRC_W = 196, SRC_H = 62;
const ING_X = 268, ING_W = 168, ING_H = 84;
const LAKE_X = 496, LAKE_W = 428, LAKE_Y = 96, LAKE_H = 336;
const MED_W = 122, MED_H = 150, MED_Y = 200;
const MART_X = 988, MART_W = 190, MART_H = 56;
const CONS_X = 1242, CONS_W = 150, CONS_H = 92;

const srcY = (i: number) => 66 + i * 88;
const ingY = (i: number) => 152 + i * 156;
const medX = (i: number) => LAKE_X + 20 + i * 138;
const martY = (i: number) => 78 + i * 78;
const consY = (i: number) => 108 + i * 128;

function curve(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function Node({ x, y, w, h, title, sub, edge, titleFill }: {
  x: number; y: number; w: number; h: number; title: string; sub?: string; edge?: string; titleFill?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={PANEL} stroke={edge ?? PANEL_EDGE} strokeWidth={1} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 6 : y + h / 2 + 4} textAnchor="middle" fill={titleFill ?? TEXT}
        style={{ font: '600 12.5px Arial, sans-serif', letterSpacing: '0.04em' }}>{title}</text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fill={MUTED}
          style={{ font: '400 10px Arial, sans-serif' }}>{sub}</text>
      ) : null}
    </g>
  );
}

function Flow({ d, delay = 0, dur = 3.6, r = 3.2 }: { d: string; delay?: number; dur?: number; r?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={GOLD} strokeOpacity={0.28} strokeWidth={1.2} />
      <circle r={r} fill={GOLD_LIGHT}>
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </>
  );
}

function ColLabel({ x, text }: { x: number; text: string }) {
  return (
    <text x={x} y={34} textAnchor="middle" fill={GOLD}
      style={{ font: '700 11px Arial, sans-serif', letterSpacing: '0.22em' }}>{text}</text>
  );
}

export default function ArchitectureDiagram() {
  const uid = useId().replace(/[:]/g, '');
  return (
    <div className="w-full overflow-x-auto" aria-label="End-to-end data architecture: sources, ingestion, governed lakehouse, data marts and activation">
      <svg viewBox="0 0 1400 620" className="h-auto w-full min-w-[980px]" role="img">
        <defs>
          <linearGradient id={`lake-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(201,168,76,0.10)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.02)" />
          </linearGradient>
          <marker id={`arr-${uid}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={GOLD} fillOpacity={0.8} />
          </marker>
        </defs>

        {/* Column headers */}
        <ColLabel x={SRC_X + SRC_W / 2} text="SOURCE SYSTEMS" />
        <ColLabel x={ING_X + ING_W / 2} text="INGESTION" />
        <ColLabel x={LAKE_X + LAKE_W / 2} text="GOVERNED LAKEHOUSE" />
        <ColLabel x={MART_X + MART_W / 2} text="DATA MARTS" />
        <ColLabel x={CONS_X + CONS_W / 2} text="ACTIVATION" />

        {/* Lakehouse panel */}
        <rect x={LAKE_X} y={LAKE_Y} width={LAKE_W} height={LAKE_H} rx={14} fill={`url(#lake-${uid})`} stroke={PANEL_EDGE} strokeDasharray="5 4" strokeWidth={1} />
        <text x={LAKE_X + LAKE_W / 2} y={LAKE_Y + 24} textAnchor="middle" fill={MUTED} style={{ font: '400 10.5px Arial, sans-serif', letterSpacing: '0.1em' }}>
          S3 + ICEBERG · GLUE + DBT · REDSHIFT SERVERLESS
        </text>

        {/* Flows: sources -> ingestion */}
        {SOURCES.map((_, i) => {
          const toBatch = i !== 1; // payments stream in real time
          const y2 = toBatch ? ingY(0) + ING_H / 2 : ingY(1) + ING_H / 2;
          return <Flow key={`sf-${i}`} d={curve(SRC_X + SRC_W, srcY(i) + SRC_H / 2, ING_X, y2)} delay={i * 0.7} />;
        })}
        {/* first-party DB also streams */}
        <Flow d={curve(SRC_X + SRC_W, srcY(0) + SRC_H / 2, ING_X, ingY(1) + ING_H / 2)} delay={2.2} />

        {/* Flows: ingestion -> bronze */}
        {INGESTION.map((_, i) => (
          <Flow key={`if-${i}`} d={curve(ING_X + ING_W, ingY(i) + ING_H / 2, medX(0), MED_Y + MED_H / 2)} delay={0.5 + i * 1.1} />
        ))}

        {/* Medallion arrows bronze -> silver -> gold */}
        {[0, 1].map((i) => (
          <g key={`ma-${i}`}>
            <line x1={medX(i) + MED_W} y1={MED_Y + MED_H / 2} x2={medX(i + 1) - 4} y2={MED_Y + MED_H / 2}
              stroke={GOLD} strokeOpacity={0.55} strokeWidth={1.4} markerEnd={`url(#arr-${uid})`} />
            <circle r={3} fill={GOLD_LIGHT}>
              <animateMotion dur="2.4s" begin={`${i * 1.2}s`} repeatCount="indefinite"
                path={`M ${medX(i) + MED_W} ${MED_Y + MED_H / 2} L ${medX(i + 1) - 4} ${MED_Y + MED_H / 2}`} />
            </circle>
          </g>
        ))}

        {/* Flows: gold -> marts */}
        {MARTS.map((_, i) => (
          <Flow key={`gm-${i}`} d={curve(medX(2) + MED_W, MED_Y + MED_H / 2, MART_X, martY(i) + MART_H / 2)} delay={0.4 + i * 0.8} />
        ))}

        {/* Flows: marts -> consumption */}
        <Flow d={curve(MART_X + MART_W, martY(3) + MART_H / 2, CONS_X, consY(0) + CONS_H / 2)} delay={0.9} />
        <Flow d={curve(MART_X + MART_W, martY(0) + MART_H / 2, CONS_X, consY(1) + CONS_H / 2)} delay={1.6} />
        <Flow d={curve(MART_X + MART_W, martY(4) + MART_H / 2, CONS_X, consY(2) + CONS_H / 2)} delay={2.3} />
        <Flow d={curve(MART_X + MART_W, martY(2) + MART_H / 2, CONS_X, consY(2) + CONS_H / 2)} delay={3.0} />

        {/* Source nodes */}
        {SOURCES.map((s, i) => (
          <Node key={s.name} x={SRC_X} y={srcY(i)} w={SRC_W} h={SRC_H} title={s.name} sub={s.sub} />
        ))}

        {/* Ingestion nodes */}
        {INGESTION.map((s, i) => (
          <Node key={s.name} x={ING_X} y={ingY(i)} w={ING_W} h={ING_H} title={s.name} sub={s.sub} edge="rgba(201,168,76,0.55)" />
        ))}

        {/* Medallion nodes */}
        {MEDALLION.map((m, i) => (
          <g key={m.name}>
            <rect x={medX(i)} y={MED_Y} width={MED_W} height={MED_H} rx={12} fill={PANEL} stroke={m.tint} strokeOpacity={0.75} strokeWidth={1.4} />
            <circle cx={medX(i) + MED_W / 2} cy={MED_Y + 44} r={17} fill="none" stroke={m.tint} strokeWidth={1.6} />
            <circle cx={medX(i) + MED_W / 2} cy={MED_Y + 44} r={8} fill={m.tint} fillOpacity={0.85} />
            <text x={medX(i) + MED_W / 2} y={MED_Y + 88} textAnchor="middle" fill={m.tint}
              style={{ font: '800 13px Arial, sans-serif', letterSpacing: '0.18em' }}>{m.name}</text>
            <text x={medX(i) + MED_W / 2} y={MED_Y + 108} textAnchor="middle" fill={MUTED}
              style={{ font: '400 9.5px Arial, sans-serif' }}>{m.sub}</text>
          </g>
        ))}

        {/* Mart nodes */}
        {MARTS.map((m, i) => (
          <Node key={m} x={MART_X} y={martY(i)} w={MART_W} h={MART_H} title={m} edge="rgba(201,168,76,0.5)" />
        ))}

        {/* Consumption nodes */}
        {CONSUMPTION.map((c, i) => (
          <Node key={c.name} x={CONS_X} y={consY(i)} w={CONS_W} h={CONS_H} title={c.name} sub={c.sub} edge="rgba(201,168,76,0.65)" titleFill={GOLD_LIGHT} />
        ))}

        {/* Governance strip */}
        <rect x={ING_X} y={540} width={CONS_X + CONS_W - ING_X} height={52} rx={10} fill="rgba(201,168,76,0.05)" stroke={PANEL_EDGE} strokeDasharray="4 4" />
        <text x={ING_X + (CONS_X + CONS_W - ING_X) / 2} y={562} textAnchor="middle" fill={GOLD}
          style={{ font: '700 10.5px Arial, sans-serif', letterSpacing: '0.2em' }}>GOVERNANCE SPINE</text>
        <text x={ING_X + (CONS_X + CONS_W - ING_X) / 2} y={580} textAnchor="middle" fill={MUTED}
          style={{ font: '400 10px Arial, sans-serif' }}>Consent &amp; privacy enforcement · data-quality gates · lineage &amp; audit · residency and cross-border transfer controls</text>
      </svg>
    </div>
  );
}

'use client';

/* Column spec, data mart and geography strips for the Australian audience file. */

import { useMemo } from 'react';
import { Scale, MapPin, Table2, KeyRound, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfoTip } from '@/components/proposal/info-tip';
import { Legend } from '@/components/proposal/legend';
import { Tag } from '@/components/proposal/tag';
import {
  SOURCE_COLOUR,
  SOURCE_LEGEND,
  KIND_STYLE,
  KIND_LEGEND,
  SourceCode,
  Tile,
} from '@/components/proposal/au-shared';
import {
  COLUMN_SPEC,
  COLUMN_SOURCES,
  MART_TABLES,
  MART_JOINS,
  MART_TESTS,
  runAuPipeline,
} from '@/lib/data/audience-au';

const TYPE_LEGEND = [
  { term: 'text', meaning: 'Free-text or name field', swatch: 'border-border/60 text-muted-foreground' },
  { term: 'number', meaning: 'Numeric measure such as age', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
  { term: 'flag', meaning: 'Controlled Y/N or E/M code', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
  { term: 'date', meaning: 'Calendar date on the consent event', swatch: 'border-violet-500/40 bg-violet-500/10 text-violet-300' },
  { term: 'code', meaning: 'Stable key or geographic code', swatch: 'border-primary/40 bg-primary/10 text-primary' },
];

const KEY_LEGEND = [
  { term: 'pk', meaning: 'Surrogate primary key', swatch: 'bg-primary/25 text-primary border-primary/40' },
  { term: 'nk', meaning: 'Natural business key', swatch: 'bg-white/[0.06] text-muted-foreground border-border/60' },
  { term: 'fk', meaning: 'Foreign key to another table', swatch: 'bg-white/10 text-foreground/70 border-border/60' },
];

const CARD_LEGEND = [
  { term: '1:1', meaning: 'One row maps to exactly one row', swatch: 'border-border/60 text-muted-foreground' },
  { term: '1:M', meaning: 'One parent, many children', swatch: 'border-border/60 text-muted-foreground' },
  { term: 'M:M', meaning: 'Many-to-many — needs a correspondence with a ratio', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
];

const TEST_LEGEND = [
  { term: 'unique', meaning: 'One row per key', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { term: 'not_null', meaning: 'No orphan surrogate or foreign key', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { term: 'relationships', meaning: 'Referential integrity to the parent dimension', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { term: 'accepted_values', meaning: 'Controlled vocabulary only', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { term: 'expression_is_true', meaning: 'Business rule enforced by a test', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
];

const PROVENANCE_LEGEND = [
  { term: 'Actual spend', meaning: 'Money already spent on this programme', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
  { term: 'Published price', meaning: 'The price the vendor lists', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
  { term: 'Quoted', meaning: 'A written quote held on file', swatch: 'border-primary/40 bg-primary/10 text-primary' },
  { term: 'Calculated', meaning: 'Worked out from the figures beside it', swatch: 'border-violet-500/40 bg-violet-500/10 text-violet-300' },
  { term: 'Official statistic', meaning: 'An official statistic or statutory record', swatch: 'border-teal-500/40 bg-teal-500/10 text-teal-300' },
  { term: 'Illustrative — from sample data', meaning: 'Computed from the downloadable sample files', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
];

function MartTableCard({ t }: { t: (typeof MART_TABLES)[number] }) {
  return (
    <div className={cn('rounded-xl border p-3.5', KIND_STYLE[t.kind])}>
      <div className="flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 font-mono text-[12.5px] font-bold tracking-tight">
          {t.name}
          <InfoTip content={t.grain} />
        </p>
        <span className="rounded-full border border-current/30 px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.14em] opacity-80">
          {t.kind}
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{t.grain}</p>
      <ul className="mt-2.5 space-y-0.5">
        {t.columns.map((c) => (
          <li key={c.name} className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/75">
            {c.key ? (
              <span
                className={cn(
                  'inline-flex w-[22px] shrink-0 justify-center rounded px-1 text-[9px] font-bold uppercase',
                  c.key === 'pk' ? 'bg-primary/25 text-primary' : c.key === 'fk' ? 'bg-white/10 text-foreground/70' : 'bg-white/[0.06] text-muted-foreground'
                )}
              >
                {c.key}
              </span>
            ) : (
              <span className="w-[22px] shrink-0" aria-hidden />
            )}
            <span className={cn('inline-flex items-center gap-1', c.note === 'sensitive' && 'text-amber-400')}>
              {c.name}
              {c.note ? <InfoTip content={c.note} /> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CARD_ORDER: Record<string, number> = { dim: 0, xref: 1, fact: 2, view: 3 };

export function AuColumnSpec() {
  return (
    <div className="space-y-4">
      <Legend
        title="Source codes on each column"
        items={SOURCE_LEGEND.map((s) => ({
          term: s.code,
          meaning: s.meaning,
          swatch: SOURCE_COLOUR[s.code] ?? 'border-border/60 text-muted-foreground',
        }))}
      />
      <Legend title="Column types" items={TYPE_LEGEND} />
      <Legend
        title="Legal mark"
        items={[
          {
            term: 'Scale icon',
            meaning: 'Sensitive information or a statutory obligation on the column',
            swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
            mark: '§',
          },
        ]}
      />
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/40">
              {['Column', 'Type', 'Source', 'What it is', 'Where it comes from'].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-3 py-2.5 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COLUMN_SPEC.map((c) => (
              <tr key={c.column} className="border-b border-border/30 transition-colors last:border-0 hover:bg-secondary/30">
                <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[11.5px] text-foreground/90">
                  <span className="inline-flex items-center gap-1">
                    {c.column}
                    <InfoTip content={c.meaning} />
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 align-top">
                  <span className="rounded border border-border/60 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 align-top">
                  <span className="flex flex-wrap gap-0.5">
                    {(COLUMN_SOURCES[c.column] ?? []).map((code) => (
                      <span key={code} className="inline-flex items-center gap-0.5">
                        <SourceCode code={code} className="px-1.5 py-0.5 text-[9.5px]" />
                        <InfoTip
                          content={SOURCE_LEGEND.find((s) => s.code === code)?.meaning ?? code}
                          className="h-3 w-3"
                        />
                      </span>
                    ))}
                  </span>
                </td>
                <td className="px-3 py-2 align-top leading-snug text-foreground/85">{c.meaning}</td>
                <td className="px-3 py-2 align-top leading-snug text-muted-foreground">
                  {c.basis}
                  {c.legal ? (
                    <span className="mt-1 flex items-start gap-1 text-[11px] text-amber-400">
                      <Scale className="mt-0.5 h-3 w-3 shrink-0" />
                      {c.legal}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
        What this buys — every campaign segment and Leadership Team report below names the columns it consumes from this
        dictionary.
      </p>
    </div>
  );
}

export function AuDataMart() {
  const tables = useMemo(() => [...MART_TABLES].sort((a, b) => CARD_ORDER[a.kind] - CARD_ORDER[b.kind]), []);
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(['dim', 'xref', 'fact', 'view'] as const).map((k) => {
          const item = KIND_LEGEND.find((x) =>
            k === 'dim' ? x.term === 'Dimension' : k === 'xref' ? x.term === 'Correspondence' : k === 'fact' ? x.term === 'Fact' : x.term === 'Serving view'
          );
          return (
            <span
              key={k}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
                KIND_STYLE[k]
              )}
            >
              <Table2 className="h-3 w-3" />
              {item?.term}
              <InfoTip content={item?.meaning ?? k} />
            </span>
          );
        })}
      </div>

      <Legend title="Table kinds" items={KIND_LEGEND} className="mb-4" />
      <Legend title="Key badges" items={KEY_LEGEND} className="mb-4" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <MartTableCard key={t.id} t={t} />
        ))}
      </div>

      <p className="t-eyebrow mb-2 mt-8">The joins</p>
      <Legend title="Cardinality" items={CARD_LEGEND} className="mb-3" />
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/40">
              {['From', '', 'To', 'On', 'Card.'].map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-3 py-2.5 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MART_JOINS.map((j, i) => (
              <tr key={i} className="border-b border-border/30 transition-colors last:border-0 hover:bg-secondary/30">
                <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[11.5px] text-foreground/90">{j.from}</td>
                <td className="px-2 py-2 align-top text-primary">
                  <Link2 className="h-3.5 w-3.5" />
                </td>
                <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[11.5px] text-foreground/90">{j.to}</td>
                <td className="px-3 py-2 align-top font-mono text-[11px] leading-snug text-muted-foreground">
                  <span className="inline-flex items-start gap-1">
                    {j.on}
                    {j.note ? <InfoTip content={j.note} /> : null}
                  </span>
                  {j.note ? <span className="mt-1 block font-sans text-[11px] not-italic text-muted-foreground/70">{j.note}</span> : null}
                </td>
                <td className="whitespace-nowrap px-3 py-2 align-top">
                  <span
                    className={cn(
                      'rounded border px-1.5 py-px font-mono text-[10px] font-bold',
                      j.cardinality === 'M:M'
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                        : 'border-border/60 text-muted-foreground'
                    )}
                  >
                    {j.cardinality}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-eyebrow mb-2 mt-8">The tests that guard it</p>
      <Legend title="Test types" items={TEST_LEGEND} className="mb-3" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {MART_TESTS.map((t) => (
          <div key={t.test} className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] p-3">
            <p className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-emerald-300">
              <KeyRound className="h-3 w-3 shrink-0" />
              {t.test}
              <InfoTip content={t.why} />
            </p>
            <p className="mt-1 font-mono text-[11px] leading-snug text-foreground/75">{t.on}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{t.why}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="t-eyebrow">Provenance chips used on this page</p>
        <Legend title="Provenance" items={PROVENANCE_LEGEND} />
        <div className="flex flex-wrap gap-2 pt-1">
          <Tag tag="ILLUSTRATIVE" />
          <Tag tag="OFFICIAL" />
          <Tag tag="DERIVED" />
        </div>
      </div>

      <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
        What this buys — Leadership Team reports read from these tables. Campaign send and ticket sale facts fill once
        the pilot transacts; audience size and reach resolve from today&apos;s file.
      </p>
    </div>
  );
}

export function AuGeographyStrip() {
  const g = useMemo(() => {
    const golden = runAuPipeline().golden;
    return {
      suburbs: new Set(golden.map((r) => r.suburb)).size,
      postcodes: new Set(golden.map((r) => r.postcode)).size,
      sa2s: new Set(golden.map((r) => r.sa2_code_2021)).size,
      states: new Set(golden.map((r) => r.state)).size,
    };
  }, []);
  return (
    <div className="space-y-4">
      <Legend
        title="Geography vs people"
        items={[
          {
            term: 'Real reference',
            meaning: 'Suburb, postcode, state and SA2 from ABS and Australia Post',
            swatch: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
          },
          {
            term: 'Fictional people',
            meaning: 'Names, emails and phones are synthetic — never a live contact list',
            swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
          },
        ]}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          value={String(g.suburbs)}
          label="Suburbs"
          sub="real localities"
          tip="Distinct suburbs among resolved people — one denominator for every tile on this strip."
        />
        <Tile
          value={String(g.postcodes)}
          label="Postcodes"
          sub="Australia Post reference"
          tip="Distinct postcodes among resolved people."
        />
        <Tile
          value={String(g.sa2s)}
          label="ABS SA2 areas"
          sub="ASGS 2021 codes"
          tip="Distinct SA2 codes among resolved people."
        />
        <Tile
          value={String(g.states)}
          label="States and territories"
          sub="all eight are in scope"
          tip="Distinct states among resolved people. Eight jurisdictions are in scope for the programme."
        />
      </div>
      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
        What this buys — suburb-level out-of-home and geo-targeted social use these localities; see Marketing materials
        and Social activation.
      </p>
    </div>
  );
}

export function AuMapNote() {
  return (
    <p className="flex items-start gap-1.5 text-[12px] leading-snug text-muted-foreground">
      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      Suburb, postcode, state and SA2 are real reference geography; the people are fictional.
    </p>
  );
}

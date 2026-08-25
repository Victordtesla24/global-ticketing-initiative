'use client';

/* The Australian consented event-marketing audience, run end to end.
 *
 * Every count, bar, tile and percentage below is computed from the rows in
 * lib/data/audience-au.generated.ts at render time — the same rows the three
 * downloads carry. Nothing here is typed by hand.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FileSpreadsheet,
  FileJson,
  Sheet,
  ShieldCheck,
  Fingerprint,
  Scale,
  Send,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  ExternalLink,
  Library,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/proposal/tag';
import { InfoTip } from '@/components/proposal/info-tip';
import { Legend } from '@/components/proposal/legend';
import { FoldGroup, FoldPanel } from '@/components/proposal/fold-panel';
import {
  EASE,
  SOURCE_COLOUR,
  SOURCE_LEGEND,
  TRUST_STYLE,
  TRUST_LEGEND,
  SyntheticBadge,
  SourceCode,
  Bars,
  Tile,
} from '@/components/proposal/au-shared';
import {
  AU_AUDIENCE,
  COLUMN_SPEC,
  VALIDATION_RULES,
  PROVIDER_REFS,
  BUILD_SOURCES,
  LEGAL_SOURCES,
  BENCHMARK_SOURCES,
  COLUMN_SOURCES,
  checkRow,
  runAuPipeline,
  CSV_HREF,
  XLSX_HREF,
  JSON_HREF,
  type AudienceRow,
} from '@/lib/data/audience-au';

export { AuColumnSpec, AuDataMart, AuGeographyStrip, AuMapNote } from '@/components/proposal/au-reference';
export { AuActivation } from '@/components/proposal/au-activation';

function DownloadBtn({ href, icon: Icon, label }: { href: string; icon: typeof FileJson; label: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </a>
  );
}

const PREVIEW_COLUMNS: { key: keyof AudienceRow; label: string; mono?: boolean }[] = [
  { key: 'first_name', label: 'First name' },
  { key: 'last_name', label: 'Last name' },
  { key: 'email', label: 'Email', mono: true },
  { key: 'phone', label: 'Phone', mono: true },
  { key: 'mobile', label: 'Mobile', mono: true },
  { key: 'age', label: 'Age' },
  { key: 'ethnicity_nationality', label: 'Ethnicity' },
  { key: 'marathi_speaking', label: 'Marathi' },
  { key: 'consented_for_marketing', label: 'Consent' },
  { key: 'contact_preference', label: 'Pref' },
  { key: 'suburb', label: 'Suburb' },
  { key: 'postcode', label: 'Postcode', mono: true },
  { key: 'state', label: 'State' },
];

function RowsTable({ rows, showChecks, highlight }: { rows: AudienceRow[]; showChecks?: boolean; highlight?: Set<string> }) {
  const specByCol = useMemo(() => {
    const m = new Map(COLUMN_SPEC.map((c) => [c.column, c]));
    return m;
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <div className="max-h-[380px] overflow-y-auto">
        <table className="w-full text-[12px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-border/60 bg-[#141414]">
              {PREVIEW_COLUMNS.map((c) => {
                const spec = specByCol.get(String(c.key));
                return (
                  <th
                    key={String(c.key)}
                    className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary"
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.label}
                      {spec ? (
                        <InfoTip
                          content={
                            <>
                              <span className="font-semibold text-primary">{spec.meaning}</span>
                              <br />
                              {spec.basis}
                              {spec.legal ? (
                                <>
                                  <br />
                                  <span className="text-amber-400">{spec.legal}</span>
                                </>
                              ) : null}
                            </>
                          }
                        />
                      ) : null}
                    </span>
                    <span className="mt-1 flex gap-0.5">
                      {(COLUMN_SOURCES[String(c.key)] ?? []).map((code) => (
                        <SourceCode key={code} code={code} />
                      ))}
                    </span>
                  </th>
                );
              })}
              {showChecks ? (
                <th className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary">
                  Checks
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const failures = checkRow(r);
              const held = Boolean(showChecks) && failures.length > 0;
              const lit = highlight?.has(r.record_id);
              return (
                <tr
                  key={r.record_id}
                  className={cn(
                    'border-b border-border/30 transition-colors last:border-0',
                    held
                      ? 'bg-amber-500/[0.06] text-muted-foreground/70'
                      : lit
                        ? 'bg-primary/[0.08] text-foreground/85'
                        : 'text-foreground/85 hover:bg-secondary/30'
                  )}
                >
                  {PREVIEW_COLUMNS.map((c) => {
                    const v = String(r[c.key] === '' ? '—' : r[c.key]);
                    const flagged =
                      held &&
                      ((c.key === 'email' && failures.includes('Email format')) ||
                        (c.key === 'age' && failures.includes('Age range')) ||
                        (c.key === 'state' && failures.includes('State code')) ||
                        (c.key === 'mobile' && failures.includes('Mobile format')) ||
                        (c.key === 'postcode' && failures.includes('Postcode range')));
                    return (
                      <td
                        key={String(c.key)}
                        className={cn(
                          'whitespace-nowrap px-2.5 py-1.5 align-top leading-snug',
                          c.mono && 'font-mono text-[11px]',
                          flagged && 'font-semibold text-amber-400'
                        )}
                      >
                        {c.key === 'consented_for_marketing' ? (
                          <span
                            className={cn(
                              'inline-flex items-center rounded px-1.5 py-px text-[10.5px] font-semibold',
                              v === 'Y' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                            )}
                          >
                            {v}
                          </span>
                        ) : (
                          v
                        )}
                      </td>
                    );
                  })}
                  {showChecks ? (
                    <td className="whitespace-nowrap px-2.5 py-1.5">
                      {failures.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-amber-400">
                          <AlertTriangle className="h-3 w-3" /> {failures.join(' · ')}
                        </span>
                      )}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MergeCard({ r, dim }: { r: AudienceRow; dim?: boolean }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-3 text-[12px] leading-relaxed">
      <p className="font-marquee text-[14px] font-bold uppercase tracking-wide text-foreground">
        {r.first_name} {r.last_name}
      </p>
      <p className="font-mono text-[11px] text-primary/90">{r.email}</p>
      <p className={cn('font-mono text-[11px]', dim ? 'text-muted-foreground/50' : 'text-foreground/75')}>
        {r.phone === '' ? 'phone —' : `phone ${r.phone}`}
      </p>
      <p className="font-mono text-[11px] text-foreground/75">mobile {r.mobile}</p>
      <p className="font-mono text-[11px] text-foreground/75">
        pref {r.contact_preference} · {r.consent_timestamp}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">{r.record_id}</p>
    </div>
  );
}

function SourceCardBody({ s }: { s: (typeof PROVIDER_REFS)[number] }) {
  return (
    <>
      <p className="text-[12px] leading-snug text-muted-foreground">{s.supplies}</p>
      <dl className="mt-3 space-y-2 border-t border-border/40 pt-2.5">
        <div>
          <dt className="t-eyebrow text-[10px] inline-flex items-center gap-1">
            Validity
            <InfoTip content="Where this source sits on the trust ladder — official statistic down to modelled estimate." />
          </dt>
          <dd className="mt-0.5">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tracking-wide',
                TRUST_STYLE[s.trust] ?? 'border-border/60 text-muted-foreground'
              )}
            >
              {s.trust}
            </span>
          </dd>
        </div>
        <div>
          <dt className="t-eyebrow text-[10px]">How to authenticate it</dt>
          <dd className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{s.authenticity}</dd>
        </div>
        <div>
          <dt className="t-eyebrow text-[10px]">Cost</dt>
          <dd className="mt-0.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-foreground/85">
            <Coins className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            <span>
              {s.cost}
              {s.costUrl && s.costUrl !== s.url ? (
                <a
                  href={s.costUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-0.5 whitespace-nowrap text-primary hover:underline"
                >
                  price page
                  <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                </a>
              ) : null}
            </span>
          </dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-1">
        {s.columns.map((c) => (
          <span key={c} className="rounded border border-border/50 px-1.5 py-px font-mono text-[9.5px] text-foreground/70">
            {c}
          </span>
        ))}
      </div>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/50 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary/20"
      >
        Verify at the source
        <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    </>
  );
}

function SourcesPanel() {
  const groups = [
    { title: 'Builds the file', list: BUILD_SOURCES, note: 'Every value in the file traces to one of these.' },
    { title: 'Sets the rules it must obey', list: LEGAL_SOURCES, note: 'The law the consent and ancestry columns answer to.' },
    {
      title: 'Measured and set aside',
      list: BENCHMARK_SOURCES,
      note: 'Commercial sources checked against the requirement. None can supply a person-level ancestry or language field.',
    },
  ];
  return (
    <div className="space-y-4">
      <Legend
        title="Source codes"
        items={SOURCE_LEGEND.map((s) => ({
          term: s.code,
          meaning: s.meaning,
          swatch: SOURCE_COLOUR[s.code] ?? 'border-border/60 text-muted-foreground',
        }))}
      />
      <Legend title="Trust ladder" items={TRUST_LEGEND} />
      <FoldGroup>
        {groups.map((g) => (
          <FoldPanel key={g.title} title={g.title} subtitle={g.note} count={g.list.length} defaultOpen={false}>
            <FoldGroup>
              <div className="space-y-2">
                {g.list.map((s) => (
                  <FoldPanel
                    key={s.id}
                    title={
                      <span className="inline-flex flex-wrap items-center gap-1.5">
                        <SourceCode code={s.code} className="px-1.5 py-0.5 text-[10px]" />
                        {s.provider}
                      </span>
                    }
                    subtitle={s.product}
                    badge={
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide',
                          TRUST_STYLE[s.trust] ?? 'border-border/60 text-muted-foreground'
                        )}
                      >
                        {s.trust}
                      </span>
                    }
                    defaultOpen={false}
                  >
                    <SourceCardBody s={s} />
                  </FoldPanel>
                ))}
              </div>
            </FoldGroup>
          </FoldPanel>
        ))}
      </FoldGroup>
    </div>
  );
}

const STAGE_ICONS = [Library, FileSpreadsheet, ShieldCheck, Fingerprint, Scale, Send];

const STAGE_TIPS = [
  'Named sources that build the file, set the law it must obey, or were measured and set aside.',
  'The landed rows — the same records the CSV, Excel and JSON downloads carry.',
  'Format and range checks applied row by row before identity resolution.',
  'One golden person per email; a blank field never overwrites a filled one.',
  'Current marketing consent — the only people a campaign may address.',
  'Channel reach and composition of the contactable audience.',
];

export function AuAudienceDemo() {
  const reduceMotion = useReducedMotion();
  const p = useMemo(() => runAuPipeline(), []);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const STAGES = useMemo(
    () => [
      { id: 'sources', label: 'Sources', count: `${BUILD_SOURCES.length} build · ${BENCHMARK_SOURCES.length} set aside` },
      { id: 'file', label: 'The File', count: `${p.landed.length} rows` },
      { id: 'validate', label: 'Validate', count: `${p.valid.length} pass · ${p.quarantined.length} held` },
      { id: 'resolve', label: 'Resolve', count: `${p.golden.length} people` },
      { id: 'consent', label: 'Consent', count: `${p.marketable.length} may be sent to` },
      { id: 'activate', label: 'Activate', count: `${p.reachableEmail} E · ${p.reachableMobile} M` },
    ],
    [p]
  );

  useEffect(() => {
    if (!playing) return;
    if (stage >= STAGES.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), reduceMotion ? 900 : 2300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, stage, STAGES.length, reduceMotion]);

  const mergedIds = useMemo(() => new Set(p.merged.flatMap((g) => g.mergedFrom)), [p]);
  const consentRate = p.golden.length ? Math.round((p.marketable.length / p.golden.length) * 100) : 0;

  const preview = useMemo(() => {
    const defects = p.quarantined.map((q) => q.row);
    const dupes = AU_AUDIENCE.filter((r) => mergedIds.has(r.record_id));
    const chosen = new Map<string, AudienceRow>();
    [...defects, ...dupes].forEach((r) => chosen.set(r.record_id, r));
    for (const r of AU_AUDIENCE) {
      if (chosen.size >= 40) break;
      if (!chosen.has(r.record_id)) chosen.set(r.record_id, r);
    }
    return AU_AUDIENCE.filter((r) => chosen.has(r.record_id));
  }, [p, mergedIds]);

  const stageBodies = [
    <SourcesPanel key="sources" />,
    <div key="file" className="space-y-3">
      <Legend
        title="Row states"
        items={[
          { term: 'Clean', meaning: 'Passes every validation rule', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
          { term: 'Held', meaning: 'Fails at least one rule — quarantined', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
          { term: 'Highlighted', meaning: 'Part of an identity merge', swatch: 'border-primary/40 bg-primary/10 text-primary' },
        ]}
      />
      <RowsTable rows={preview} />
    </div>,
    <div key="validate">
      <div className="mb-3 flex flex-wrap gap-2">
        {VALIDATION_RULES.map((v) => {
          const fails = p.quarantined.filter((q) => q.failures.includes(v.rule)).length;
          return (
            <span
              key={v.rule}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold tracking-wide',
                fails === 0
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              )}
            >
              {fails === 0 ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              {v.rule} · {p.landed.length - fails}/{p.landed.length}
              <InfoTip content={v.what} />
            </span>
          );
        })}
      </div>
      <RowsTable rows={preview} showChecks />
    </div>,
    <div key="resolve">
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-3">
          {AU_AUDIENCE.filter((r) => mergedIds.has(r.record_id)).map((r) => (
            <MergeCard key={r.record_id} r={r} dim={r.phone === ''} />
          ))}
        </div>
        <div className="flex justify-center text-primary">
          <ArrowRight className="hidden h-6 w-6 md:block" />
          <ArrowDown className="h-6 w-6 md:hidden" />
        </div>
        {p.merged.map((g) => (
          <div
            key={g.email}
            className="rounded-lg border border-primary/50 bg-primary/[0.08] p-4 shadow-[0_0_24px_rgba(201,168,76,0.15)]"
          >
            <p className="t-eyebrow mb-1.5 inline-flex items-center gap-1.5">
              One golden record
              <InfoTip content="Matched on email. The newer consent event wins; a blank field never overwrites one that is filled." />
            </p>
            <p className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">
              {g.first_name} {g.last_name}
            </p>
            <p className="font-mono text-[12px] text-primary">{g.email}</p>
            <p className="font-mono text-[12px] text-foreground/85">phone {g.phone || '—'}</p>
            <p className="font-mono text-[12px] text-foreground/85">mobile {g.mobile}</p>
            <p className="font-mono text-[12px] text-foreground/85">
              pref {g.contact_preference} · {g.consent_timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>,
    <div key="consent">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Tile value={String(p.golden.length)} label="Resolved people" tip="After identity resolution — one person per email." />
        <Tile
          value={String(p.marketable.length)}
          label="Consent current"
          sub={`${consentRate}%`}
          tone="emerald"
          tip="consented_for_marketing = Y on the golden record."
        />
        <Tile
          value={String(p.suppressed.length)}
          label="Suppressed"
          sub="withdrawn — never sent to"
          tone="amber"
          tip="Latest consent state is not Y — excluded from every send."
        />
      </div>
      <Bars
        title="Where the consent came from"
        data={p.byConsentSource}
        tip="Counts of marketable people by consent_source on the golden record."
      />
      <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-snug text-muted-foreground">
        <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        Ethnicity is sensitive information; APP 7.4 allows its use for direct marketing only with the individual&apos;s
        consent.
      </p>
    </div>,
    <div key="activate">
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile value={String(p.reachableEmail)} label="Email reachable" sub="preference E" tip="Marketable people whose preferred channel is email." />
        <Tile value={String(p.reachableMobile)} label="Mobile reachable" sub="preference M" tip="Marketable people whose preferred channel is mobile." />
        <Tile value={String(p.medianAge)} label="Median age" tip="Median age of the marketable audience." />
        <Tile
          value={`${p.byState[0]?.label ?? '—'} · ${p.byState[0]?.count ?? 0}`}
          label="Top state"
          tip="State with the largest share of the marketable audience."
        />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Bars title="By state" data={p.byState} tip="Marketable people by state." />
        <Bars title="By age band" data={p.byAgeBand} tip="Marketable people by age band." />
        <Bars title="By ancestry" data={p.byAncestry} tip="Self-declared ancestry on the marketable audience." />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Bars title="Top suburbs — real localities and postcodes" data={p.bySuburb} tip="Top suburbs among marketable people." />
        <Bars title="Channel the person chose" data={p.byPreference} accent="amber" tip="Preferred contact channel." />
      </div>
      <div className="mt-3">
        <Tag tag="ILLUSTRATIVE" />
      </div>
    </div>,
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            setStage(0);
            setPlaying(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20"
        >
          <Play className="h-3.5 w-3.5" />
          Run end to end
        </button>
        <SyntheticBadge />
        <span className="ml-auto flex flex-wrap gap-1.5">
          <DownloadBtn href={CSV_HREF} icon={FileSpreadsheet} label="CSV" />
          <DownloadBtn href={XLSX_HREF} icon={Sheet} label="Excel" />
          <DownloadBtn href={JSON_HREF} icon={FileJson} label="JSON" />
        </span>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          value={String(p.landed.length)}
          label="Records"
          sub={`${COLUMN_SPEC.length} columns`}
          tip="Rows in the sample file before any gate — the same count the downloads carry."
        />
        <Tile
          value={String(p.marketable.length)}
          label="May be sent to"
          sub={`${consentRate}% of resolved people`}
          tone="emerald"
          tip="Resolved people whose current consent allows marketing."
        />
        <Tile
          value={String(p.marathiSpeakers)}
          label="Marathi at home"
          sub="of the contactable audience"
          tip="Marketable people with marathi_speaking = Y."
        />
        <Tile
          value={String(new Set(p.golden.map((r) => r.state)).size)}
          label="States covered"
          sub={`${new Set(p.golden.map((r) => r.postcode)).size} postcodes`}
          tip="Distinct states and postcodes among resolved people."
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute left-[10%] right-[10%] top-6 h-px bg-border/30" aria-hidden />
        <motion.div
          className="absolute left-[10%] top-6 h-px origin-left bg-gradient-to-r from-primary/20 via-primary/70 to-primary"
          style={{ right: '10%' }}
          initial={false}
          animate={{ scaleX: STAGES.length > 1 ? stage / (STAGES.length - 1) : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
          aria-hidden
        />
        <ol className="relative grid grid-cols-6 gap-1 sm:gap-2">
          {STAGES.map((s, i) => {
            const Icon = STAGE_ICONS[i] ?? FileSpreadsheet;
            const active = stage === i;
            const passed = stage > i;
            return (
              <li key={s.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setStage(i);
                  }}
                  aria-current={active ? 'step' : undefined}
                  className="flex w-full flex-col items-center gap-1.5 text-center"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                    {active ? (
                      <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-primary/10 [animation-duration:3s]" aria-hidden />
                    ) : null}
                    <span
                      className={cn(
                        'relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
                        active
                          ? 'border-primary/70 bg-primary/20 text-primary shadow-[0_0_18px_rgba(201,168,76,0.25)]'
                          : passed
                            ? 'border-primary/40 bg-primary/10 text-primary/70'
                            : 'border-border bg-background text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </span>
                  <span
                    className={cn(
                      'hidden font-marquee text-[13px] font-bold uppercase leading-tight tracking-wide transition-colors sm:inline-flex sm:items-center sm:gap-1 sm:text-[14px]',
                      active ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {s.label}
                    <InfoTip content={STAGE_TIPS[i]} className="hidden sm:inline-flex" />
                  </span>
                  <span className="sr-only">{s.label}</span>
                  <span
                    className={cn(
                      'hidden font-mono text-[10px] uppercase tracking-wider sm:block',
                      stage >= i ? 'text-primary/80' : 'text-transparent'
                    )}
                  >
                    {stage >= i ? s.count : '·'}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-center sm:hidden">
          <span className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">{STAGES[stage]?.label}</span>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-primary/80">{STAGES[stage]?.count}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="glass-card rounded-xl border border-primary/40 p-5"
          initial={reduceMotion ? false : { opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: EASE }}
        >
          <FoldGroup>
            <FoldPanel
              title={STAGES[stage]?.label ?? 'Stage'}
              subtitle={STAGE_TIPS[stage]}
              count={STAGES[stage]?.count}
              defaultOpen={false}
            >
              {stageBodies[stage]}
            </FoldPanel>
          </FoldGroup>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
        What this buys — named campaign segments, channel kits and Leadership Team report specs are built from the same
        contactable audience below. Open Campaign segments to see the live counts.
      </p>
    </div>
  );
}

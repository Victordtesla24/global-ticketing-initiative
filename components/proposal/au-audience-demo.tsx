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
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  MapPin,
  Table2,
  KeyRound,
  Link2,
  ExternalLink,
  Library,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/proposal/tag';
import {
  AU_AUDIENCE,
  COLUMN_SPEC,
  VALIDATION_RULES,
  PROVIDER_REFS,
  BUILD_SOURCES,
  LEGAL_SOURCES,
  BENCHMARK_SOURCES,
  COLUMN_SOURCES,
  MART_TABLES,
  MART_JOINS,
  MART_TESTS,
  checkRow,
  runAuPipeline,
  CSV_HREF,
  XLSX_HREF,
  JSON_HREF,
  type AudienceRow,
  type GoldenRow,
  type Bucket,
} from '@/lib/data/audience-au';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ----------------------------------------------------------------- pieces */

function SyntheticBadge() {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-amber-400">
      <FlaskConical className="h-3 w-3 shrink-0" />
      Synthetic sample
    </span>
  );
}

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

function Bars({ title, data, max, accent = 'gold' }: { title: string; data: Bucket[]; max?: number; accent?: 'gold' | 'amber' }) {
  const reduceMotion = useReducedMotion();
  const top = Math.max(1, max ?? Math.max(...data.map((d) => d.count), 1));
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
      <p className="t-eyebrow mb-3">{title}</p>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate text-[12.5px] text-foreground/85">{d.label}</span>
              <span className="shrink-0 font-marquee text-[15px] font-bold text-primary">{d.count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  accent === 'gold'
                    ? 'bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]'
                    : 'bg-gradient-to-r from-amber-600 to-amber-400'
                )}
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.count / top) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : i * 0.06, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tile({ value, label, sub, tone = 'gold' }: { value: string; label: string; sub?: string; tone?: 'gold' | 'emerald' | 'amber' }) {
  const colour = tone === 'emerald' ? 'text-emerald-400' : tone === 'amber' ? 'text-amber-400' : 'text-primary';
  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-secondary/20 p-4">
      <p className="t-eyebrow">{label}</p>
      <p className={cn('mt-1 font-marquee text-2xl font-bold leading-tight md:text-3xl', colour)}>{value}</p>
      {sub ? <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------ rows table */

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

/** Colour per source code, so a column header and its source card read as one thing. */
const SOURCE_COLOUR: Record<string, string> = {
  LANP: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  SAL: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  AP: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  ASGS: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  '1P': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  APP7: 'bg-primary/20 text-primary border-primary/40',
  SPAM: 'bg-primary/20 text-primary border-primary/40',
};

function SourceCode({ code, className }: { code: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1 py-px font-mono text-[9px] font-bold leading-none tracking-wider',
        SOURCE_COLOUR[code] ?? 'border-border/60 text-muted-foreground',
        className
      )}
    >
      {code}
    </span>
  );
}

function RowsTable({ rows, showChecks, highlight }: { rows: AudienceRow[]; showChecks?: boolean; highlight?: Set<string> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <div className="max-h-[380px] overflow-y-auto">
        <table className="w-full text-[12px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-border/60 bg-[#141414]">
              {PREVIEW_COLUMNS.map((c) => (
                <th
                  key={String(c.key)}
                  className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {c.label}
                  {/* Every column carries the code of the source it came from. */}
                  <span className="mt-1 flex gap-0.5">
                    {(COLUMN_SOURCES[String(c.key)] ?? []).map((code) => (
                      <SourceCode key={code} code={code} />
                    ))}
                  </span>
                </th>
              ))}
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
                              v === 'Y'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-red-500/15 text-red-400'
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

/* --------------------------------------------------------------- merge */

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
      <p className="font-mono text-[11px] text-foreground/75">pref {r.contact_preference} · {r.consent_timestamp}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">{r.record_id}</p>
    </div>
  );
}

/* ----------------------------------------------------------- mart visual */

const KIND_STYLE: Record<string, string> = {
  dim: 'border-sky-500/40 bg-sky-500/[0.06] text-sky-300',
  fact: 'border-primary/50 bg-primary/[0.07] text-primary',
  xref: 'border-violet-500/40 bg-violet-500/[0.06] text-violet-300',
  view: 'border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-300',
};

function MartTableCard({ t }: { t: (typeof MART_TABLES)[number] }) {
  return (
    <div className={cn('rounded-xl border p-3.5', KIND_STYLE[t.kind])}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[12.5px] font-bold tracking-tight">{t.name}</p>
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
                  c.key === 'pk'
                    ? 'bg-primary/25 text-primary'
                    : c.key === 'fk'
                      ? 'bg-white/10 text-foreground/70'
                      : 'bg-white/[0.06] text-muted-foreground'
                )}
              >
                {c.key}
              </span>
            ) : (
              <span className="w-[22px] shrink-0" aria-hidden />
            )}
            <span className={cn(c.note === 'sensitive' && 'text-amber-400')}>{c.name}</span>
            {c.note ? <span className="text-[10px] text-muted-foreground/60">· {c.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------- source provenance */

const TRUST_STYLE: Record<string, string> = {
  'Official statistic': 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  'Reference standard': 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  'Primary record — first party': 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  Regulator: 'border-primary/40 bg-primary/10 text-primary',
  'Licensed panel': 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  Aggregator: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

/** One source, with the four things a reader needs to trust or reject it. */
function SourceCard({ s }: { s: (typeof PROVIDER_REFS)[number] }) {
  const usable = s.role !== 'Benchmark — cannot supply the file';
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-xl border p-4 transition-colors',
        usable ? 'border-border/60 bg-secondary/20' : 'border-border/40 bg-secondary/10'
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <SourceCode code={s.code} className="px-1.5 py-0.5 text-[10px]" />
        <span className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">{s.provider}</span>
      </div>
      <p className="mt-1 font-mono text-[11.5px] text-primary/90">{s.product}</p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{s.supplies}</p>

      <dl className="mt-3 space-y-2 border-t border-border/40 pt-2.5">
        <div>
          <dt className="t-eyebrow text-[10px]">Validity</dt>
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
    </div>
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
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="t-eyebrow">{g.title}</p>
            <p className="text-[12px] text-muted-foreground">{g.note}</p>
            <span className="ml-auto font-marquee text-[15px] font-bold text-primary">{g.list.length}</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {g.list.map((s) => (
              <SourceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- the demo */

const STAGE_ICONS = [Library, FileSpreadsheet, ShieldCheck, Fingerprint, Scale, Send];

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

  // The table preview shows the rows that actually carry the story: the defective
  // rows, the duplicated person, and enough clean rows for context.
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

  return (
    <div>
      {/* controls */}
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

      {/* headline tiles */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile value={String(p.landed.length)} label="Records" sub={`${COLUMN_SPEC.length} columns`} />
        <Tile value={String(p.marketable.length)} label="May be sent to" sub={`${consentRate}% of resolved people`} tone="emerald" />
        <Tile value={String(p.marathiSpeakers)} label="Marathi at home" sub="of the contactable audience" />
        <Tile
          value={String(new Set(p.golden.map((r) => r.state)).size)}
          label="States covered"
          sub={`${new Set(p.golden.map((r) => r.postcode)).size} postcodes`}
        />
      </div>

      {/* stage rail */}
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
                      'hidden font-marquee text-[13px] font-bold uppercase leading-tight tracking-wide transition-colors sm:block sm:text-[14px]',
                      active ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {s.label}
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

      {/* stage panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="glass-card rounded-xl border border-primary/40 p-5"
          initial={reduceMotion ? false : { opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: EASE }}
        >
          {stage === 0 ? <SourcesPanel /> : null}

          {stage === 1 ? <RowsTable rows={preview} /> : null}

          {stage === 2 ? (
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {VALIDATION_RULES.map((v) => {
                  const fails = p.quarantined.filter((q) => q.failures.includes(v.rule)).length;
                  return (
                    <span
                      key={v.rule}
                      title={v.what}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold tracking-wide',
                        fails === 0
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      )}
                    >
                      {fails === 0 ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {v.rule} · {p.landed.length - fails}/{p.landed.length}
                    </span>
                  );
                })}
              </div>
              <RowsTable rows={preview} showChecks />
            </div>
          ) : null}

          {stage === 3 ? (
            <div>
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
                  <div key={g.email} className="rounded-lg border border-primary/50 bg-primary/[0.08] p-4 shadow-[0_0_24px_rgba(201,168,76,0.15)]">
                    <p className="t-eyebrow mb-1.5">One golden record</p>
                    <p className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">
                      {g.first_name} {g.last_name}
                    </p>
                    <p className="font-mono text-[12px] text-primary">{g.email}</p>
                    <p className="font-mono text-[12px] text-foreground/85">phone {g.phone || '—'}</p>
                    <p className="font-mono text-[12px] text-foreground/85">mobile {g.mobile}</p>
                    <p className="font-mono text-[12px] text-foreground/85">pref {g.contact_preference} · {g.consent_timestamp}</p>
                    <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">
                      Matched on email. The newer consent event wins; a blank field never overwrites one that is filled.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {stage === 4 ? (
            <div>
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <Tile value={String(p.golden.length)} label="Resolved people" />
                <Tile value={String(p.marketable.length)} label="Consent current" sub={`${consentRate}%`} tone="emerald" />
                <Tile value={String(p.suppressed.length)} label="Suppressed" sub="withdrawn — never sent to" tone="amber" />
              </div>
              <Bars title="Where the consent came from" data={p.byConsentSource} />
              <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-snug text-muted-foreground">
                <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                Ethnicity is sensitive information; APP 7.4 allows its use for direct marketing only with the
                individual&apos;s consent.
              </p>
            </div>
          ) : null}

          {stage === 5 ? (
            <div>
              <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Tile value={String(p.reachableEmail)} label="Email reachable" sub="preference E" />
                <Tile value={String(p.reachableMobile)} label="Mobile reachable" sub="preference M" />
                <Tile value={String(p.medianAge)} label="Median age" />
                <Tile value={`${p.byState[0]?.label ?? '—'} · ${p.byState[0]?.count ?? 0}`} label="Top state" />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Bars title="By state" data={p.byState} />
                <Bars title="By age band" data={p.byAgeBand} />
                <Bars title="By ancestry" data={p.byAncestry} />
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <Bars title="Top suburbs — real localities and postcodes" data={p.bySuburb} />
                <Bars title="Channel the person chose" data={p.byPreference} accent="amber" />
              </div>
              <div className="mt-3">
                <Tag tag="ILLUSTRATIVE" />
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------- column spec table */

export function AuColumnSpec() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-[12.5px]">
        <thead>
          <tr className="border-b border-border/60 bg-secondary/40">
            {['Column', 'Type', 'Source', 'What it is', 'Where it comes from'].map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2.5 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLUMN_SPEC.map((c) => (
            <tr key={c.column} className="border-b border-border/30 transition-colors last:border-0 hover:bg-secondary/30">
              <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[11.5px] text-foreground/90">{c.column}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">
                <span className="rounded border border-border/60 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.type}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-2 align-top">
                <span className="flex flex-wrap gap-0.5">
                  {(COLUMN_SOURCES[c.column] ?? []).map((code) => (
                    <SourceCode key={code} code={code} className="px-1.5 py-0.5 text-[9.5px]" />
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
  );
}

/* ------------------------------------------------------------- data marts */

const CARD_ORDER: Record<string, number> = { dim: 0, xref: 1, fact: 2, view: 3 };

export function AuDataMart() {
  const tables = useMemo(() => [...MART_TABLES].sort((a, b) => CARD_ORDER[a.kind] - CARD_ORDER[b.kind]), []);
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(['dim', 'xref', 'fact', 'view'] as const).map((k) => (
          <span key={k} className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider', KIND_STYLE[k])}>
            <Table2 className="h-3 w-3" />
            {k === 'dim' ? 'Dimension' : k === 'xref' ? 'Correspondence' : k === 'fact' ? 'Fact' : 'Serving view'}
          </span>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <MartTableCard key={t.id} t={t} />
        ))}
      </div>

      <p className="t-eyebrow mb-2 mt-8">The joins</p>
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/40">
              {['From', '', 'To', 'On', 'Card.'].map((h, i) => (
                <th key={i} className="whitespace-nowrap px-3 py-2.5 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
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
                  {j.on}
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
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {MART_TESTS.map((t) => (
          <div key={t.test} className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] p-3">
            <p className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-emerald-300">
              <KeyRound className="h-3 w-3 shrink-0" />
              {t.test}
            </p>
            <p className="mt-1 font-mono text-[11px] leading-snug text-foreground/75">{t.on}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{t.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- geography strip */

export function AuGeographyStrip() {
  // All four counts come from the same set — the resolved people — so the
  // figures sit on one denominator rather than three.
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile value={String(g.suburbs)} label="Suburbs" sub="real localities" />
      <Tile value={String(g.postcodes)} label="Postcodes" sub="Australia Post reference" />
      <Tile value={String(g.sa2s)} label="ABS SA2 areas" sub="ASGS 2021 codes" />
      <Tile value={String(g.states)} label="States and territories" sub="all eight are in scope" />
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

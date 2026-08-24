'use client';

/* One audience file, run end to end before the eyes.
 *
 * Five stages — the file, validation, identity resolution, segmentation and
 * the decision tiles — each drawn from the same eighteen synthetic records in
 * lib/data/audience-demo.ts. Every count, bar and KPI is computed from that
 * array at render time; the panels only display what runPipeline() returns.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FileSpreadsheet,
  FileJson,
  ShieldCheck,
  Fingerprint,
  PieChart,
  Gauge,
  Play,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/proposal/tag';
import {
  AUDIENCE_RECORDS,
  AUDIENCE_COLUMNS,
  AUDIENCE_CSV_HREF,
  AUDIENCE_JSON_HREF,
  VALIDATION_RULES,
  checkRecord,
  runPipeline,
  type AudienceRecord,
  type GoldenRecord,
} from '@/lib/data/audience-demo';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ----------------------------------------------------------------- badges */

function SyntheticBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-amber-400',
        className
      )}
    >
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
      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="h-3 w-3 shrink-0" />
      {label}
    </a>
  );
}

/* ---------------------------------------------------------- records table */

function RecordsTable({ stage }: { stage: number }) {
  const pipeline = useMemo(() => runPipeline(), []);
  const mergedIds = useMemo(
    () => new Set(pipeline.merged.flatMap((g) => g.mergedFrom)),
    [pipeline]
  );
  const showChecks = stage >= 1;
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full text-[12.5px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-border/60 bg-[#141414]">
              <th className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                #
              </th>
              {AUDIENCE_COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {c.label}
                </th>
              ))}
              {showChecks ? (
                <th className="whitespace-nowrap px-2.5 py-2 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  Checks
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {AUDIENCE_RECORDS.map((r, i) => {
              const check = checkRecord(r);
              const held = showChecks && !check.ok;
              const isDupe = stage >= 2 && mergedIds.has(r.id);
              return (
                <tr
                  key={r.id}
                  className={cn(
                    'border-b border-border/30 transition-colors last:border-0',
                    held
                      ? 'bg-amber-500/[0.06] text-muted-foreground/70'
                      : isDupe
                        ? 'bg-primary/[0.07] text-foreground/85'
                        : 'text-foreground/85 hover:bg-secondary/30'
                  )}
                >
                  <td className="px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground/70">{i + 1}</td>
                  {AUDIENCE_COLUMNS.map((c) => (
                    <td
                      key={c.key}
                      className={cn(
                        'whitespace-nowrap px-2.5 py-1.5 align-top leading-snug',
                        (c.key === 'email' || c.key === 'phone' || c.key === 'mobile') && 'font-mono text-[11.5px]',
                        held && check.failures.length > 0 &&
                          ((c.key === 'email' && check.failures.includes('Email format')) ||
                            (c.key === 'age' && check.failures.includes('Age range')))
                          ? 'font-semibold text-amber-400'
                          : ''
                      )}
                    >
                      {String(r[c.key] === '' ? '—' : r[c.key])}
                    </td>
                  ))}
                  {showChecks ? (
                    <td className="whitespace-nowrap px-2.5 py-1.5">
                      {check.ok ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                          <AlertTriangle className="h-3 w-3" /> {check.failures.join(' · ')}
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

/* ------------------------------------------------------------- bar charts */

function BarBlock({
  title,
  data,
  accent = 'gold',
}: {
  title: string;
  data: { label: string; count: number }[];
  accent?: 'gold' | 'amber';
}) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
      <p className="t-eyebrow mb-3">{title}</p>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate text-[12.5px] text-foreground/85">{d.label}</span>
              <span className="font-marquee text-[15px] font-bold text-primary">{d.count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border/20">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  accent === 'gold'
                    ? 'bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]'
                    : 'bg-gradient-to-r from-amber-600 to-amber-400'
                )}
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${(d.count / max) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ merge visual */

function PersonCard({ r, dimPhone }: { r: AudienceRecord; dimPhone?: boolean }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-3 text-[12.5px] leading-relaxed">
      <p className="font-marquee text-[14px] font-bold uppercase tracking-wide text-foreground">
        {r.first_name} {r.last_name}
      </p>
      <p className="font-mono text-[11.5px] text-primary/90">{r.email}</p>
      <p className={cn('font-mono text-[11.5px]', dimPhone ? 'text-muted-foreground/50' : 'text-foreground/75')}>
        {r.phone === '' ? 'phone —' : `phone ${r.phone}`}
      </p>
      <p className="font-mono text-[11.5px] text-foreground/75">mobile {r.mobile}</p>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground/60">{r.id}</p>
    </div>
  );
}

function MergePanel({ golden }: { golden: GoldenRecord }) {
  const sources = AUDIENCE_RECORDS.filter((r) => golden.mergedFrom.includes(r.id));
  return (
    <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
      <div className="grid gap-3">
        {sources.map((s) => (
          <PersonCard key={s.id} r={s} dimPhone={s.phone === ''} />
        ))}
      </div>
      <div className="flex justify-center text-primary">
        <ArrowRight className="hidden h-6 w-6 md:block" />
        <ArrowDown className="h-6 w-6 md:hidden" />
      </div>
      <div className="rounded-lg border border-primary/50 bg-primary/[0.08] p-4 shadow-[0_0_24px_rgba(201,168,76,0.15)]">
        <p className="t-eyebrow mb-1.5">One golden record</p>
        <p className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">
          {golden.first_name} {golden.last_name}
        </p>
        <p className="font-mono text-[12px] text-primary">{golden.email}</p>
        <p className="font-mono text-[12px] text-foreground/85">phone {golden.phone || '—'}</p>
        <p className="font-mono text-[12px] text-foreground/85">mobile {golden.mobile}</p>
        <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
          Matched on email. The newer mobile wins; the blank phone never overwrites the kept one.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- the demo */

const STAGE_ICONS = [FileSpreadsheet, ShieldCheck, Fingerprint, PieChart, Gauge];

export function AudienceDemo() {
  const reduceMotion = useReducedMotion();
  const pipeline = useMemo(() => runPipeline(), []);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const STAGES = useMemo(
    () => [
      { id: 'file', label: 'The File', count: `${pipeline.landed.length} rows` },
      {
        id: 'validate',
        label: 'Validate',
        count: `${pipeline.valid.length} pass · ${pipeline.quarantined.length} held`,
      },
      { id: 'resolve', label: 'Resolve', count: `${pipeline.golden.length} people` },
      { id: 'segment', label: 'Segment', count: `${pipeline.segments.length} segments` },
      { id: 'decide', label: 'Decide', count: '4 tiles' },
    ],
    [pipeline]
  );

  useEffect(() => {
    if (!playing) return;
    if (stage >= STAGES.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), reduceMotion ? 900 : 2100);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, stage, STAGES.length, reduceMotion]);

  const run = () => {
    setStage(0);
    setPlaying(true);
  };

  const pick = (n: number) => {
    setPlaying(false);
    setStage(n);
  };

  const kpis = [
    {
      metric: 'Audience size',
      value: `${pipeline.golden.length} people`,
      basis: `${pipeline.landed.length} rows − ${pipeline.quarantined.length} held − ${
        pipeline.valid.length - pipeline.golden.length
      } duplicate`,
    },
    {
      metric: 'Median age',
      value: String(pipeline.medianAge),
      basis: `middle of the ${pipeline.golden.length} golden-record ages`,
    },
    {
      metric: 'Largest segment',
      value: `${pipeline.segments[0]?.label ?? '—'} · ${pipeline.segments[0]?.count ?? 0}`,
      basis: 'count of golden records by demography',
    },
    {
      metric: 'Top state',
      value: `${pipeline.states[0]?.label ?? '—'} · ${pipeline.states[0]?.count ?? 0}`,
      basis: 'count of golden records by state',
    },
  ];

  return (
    <div>
      {/* control row */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={run}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20"
        >
          <Play className="h-3.5 w-3.5" />
          Run end to end
        </button>
        <SyntheticBadge />
        <DownloadBtn href={AUDIENCE_CSV_HREF} icon={FileSpreadsheet} label="CSV" />
        <DownloadBtn href={AUDIENCE_JSON_HREF} icon={FileJson} label="JSON" />
      </div>

      {/* stage rail */}
      <div className="relative mb-6">
        <div className="absolute left-[10%] right-[10%] top-6 h-px bg-border/30" aria-hidden />
        <motion.div
          className="absolute left-[10%] top-6 h-px origin-left bg-gradient-to-r from-primary/20 via-primary/70 to-primary"
          style={{ right: '10%' }}
          initial={false}
          animate={{ scaleX: STAGES.length > 1 ? stage / (STAGES.length - 1) : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: EASE }}
          aria-hidden
        />
        <ol className="relative grid grid-cols-5 gap-1 sm:gap-3">
          {STAGES.map((s, i) => {
            const Icon = STAGE_ICONS[i] ?? FileSpreadsheet;
            const active = stage === i;
            const passed = stage > i;
            return (
              <li key={s.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={active ? 'step' : undefined}
                  className="flex w-full flex-col items-center gap-1.5 text-center"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                    {active ? (
                      <span
                        className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-primary/10 [animation-duration:3s]"
                        aria-hidden
                      />
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
                  {/* Five labels will not sit side by side on a phone. Below sm the
                      rail is icons only and the active stage is named beneath it. */}
                  <span
                    className={cn(
                      'hidden font-marquee text-[13px] font-bold uppercase leading-tight tracking-wide transition-colors sm:block sm:text-[14px]',
                      active ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="sr-only">{s.label}</span>
                  <AnimatePresence>
                    {stage >= i ? (
                      <motion.span
                        className="hidden font-mono text-[10.5px] uppercase tracking-wider text-primary/80 sm:block"
                        initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {s.count}
                      </motion.span>
                    ) : (
                      <span
                        className="hidden font-mono text-[10.5px] uppercase tracking-wider text-transparent sm:block"
                        aria-hidden
                      >
                        ·
                      </span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-center sm:hidden">
          <span className="font-marquee text-[15px] font-bold uppercase tracking-wide text-foreground">
            {STAGES[stage]?.label}
          </span>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-primary/80">
            {STAGES[stage]?.count}
          </span>
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
          {stage === 0 ? (
            <div>
              <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Eighteen fictional records, nine fields each — the shape of a promoter&apos;s contact export. Both
                downloads above carry exactly these rows.
              </p>
              <RecordsTable stage={stage} />
            </div>
          ) : null}

          {stage === 1 ? (
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {VALIDATION_RULES.map((v) => {
                  const fails = pipeline.quarantined.filter((q) => q.failures.includes(v.rule)).length;
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
                      {v.rule} · {pipeline.landed.length - fails}/{pipeline.landed.length}
                    </span>
                  );
                })}
              </div>
              <RecordsTable stage={stage} />
              <p className="mt-3 flex items-start gap-1.5 text-[12.5px] leading-snug text-muted-foreground">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                {pipeline.quarantined.length} rows held in quarantine with the failing rule named — never silently
                dropped. {pipeline.valid.length} rows continue.
              </p>
            </div>
          ) : null}

          {stage === 2 ? (
            <div>
              <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">
                One person arrived twice. Matching on email folds {pipeline.valid.length} valid rows into{' '}
                {pipeline.golden.length} people.
              </p>
              {pipeline.merged.map((g) => (
                <MergePanel key={g.email} golden={g} />
              ))}
            </div>
          ) : null}

          {stage === 3 ? (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Tag tag="ILLUSTRATIVE" />
                <p className="text-[12.5px] text-muted-foreground">
                  {pipeline.golden.length} golden records, cut three ways.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <BarBlock title="By demography" data={pipeline.segments} />
                <BarBlock title="By state" data={pipeline.states} />
                <BarBlock title="By age band" data={pipeline.ageBands} />
              </div>
            </div>
          ) : null}

          {stage === 4 ? (
            <div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((k) => (
                  <div key={k.metric} className="flex h-full flex-col rounded-xl border border-border/60 bg-secondary/20 p-4">
                    <p className="text-[11.5px] uppercase tracking-wider text-muted-foreground">{k.metric}</p>
                    <p className="mt-1 font-marquee text-xl font-bold leading-tight text-foreground">{k.value}</p>
                    <p className="mt-1.5 flex-1 font-mono text-[11px] leading-snug text-muted-foreground/70">{k.basis}</p>
                    <div className="mt-2.5 border-t border-border/40 pt-2">
                      <Tag tag="ILLUSTRATIVE" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] leading-snug text-muted-foreground">
                Every tile names its arithmetic and carries the amber label — the same certification pattern as the
                three dashboards in the walkthrough below.
              </p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-[12.5px] leading-snug text-muted-foreground/70">
        A mechanism demonstration on eighteen fictional rows — evidence of the pipeline, and of nothing else.
      </p>
    </div>
  );
}

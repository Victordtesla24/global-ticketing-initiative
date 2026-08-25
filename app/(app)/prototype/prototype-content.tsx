'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  ShieldCheck,
  FlaskConical,
  Users,
  Ticket,
  Workflow,
  Coins,
  Gauge,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  FileJson,
} from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, StatCard, DataTable } from '@/components/proposal/section';
import {
  AuAudienceDemo,
  AuColumnSpec,
  AuProviderRefs,
  AuDataMart,
  AuGeographyStrip,
  AuMapNote,
} from '@/components/proposal/au-audience-demo';
import { Disclosure } from '@/components/proposal/disclosure';
import { cn } from '@/lib/utils';
import { CATEGORY_LABELS, type ProviderCategory, type ProviderCountry } from '@/lib/data/providers';
import {
  PROTOTYPE_DATASETS,
  PROTOTYPE_COUNTRY_FILTERS,
  PROTOTYPE_TOTALS,
  WALKTHROUGH,
  MODE_LABEL,
  csvHref,
  jsonHref,
  type DatasetMode,
  type PrototypeDataset,
  type StepTable,
  type WalkStep,
} from '@/lib/data/prototype';

const CATS: (ProviderCategory | 'All')[] = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];
const MODES: (DatasetMode | 'All')[] = ['All', 'REAL', 'SYNTHETIC'];

const STEP_ICONS = [Users, Ticket, Workflow, Coins, Gauge];

/* ------------------------------------------------------- curtain reveal */

/* Each part of the walkthrough is unveiled top-to-bottom behind a clip edge
   that travels down over it, carried on a short descent and a decelerating
   ease — a curtain dropping rather than a fade-in. The rail draws itself from
   the left first, then the five markers fall one after another, then the panel
   beneath them. Every element animates on its own timing, so the section
   assembles rather than appearing all at once. */
const CURTAIN_EASE = [0.22, 1, 0.36, 1] as const;

const curtainStage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const curtainDrop = {
  hidden: { opacity: 0, y: -24, clipPath: 'inset(0% 0% 100% 0%)' },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.62, ease: CURTAIN_EASE },
  },
};

/* ---------------------------------------------------------------- badges */

function ModeBadge({ mode, className }: { mode: DatasetMode; className?: string }) {
  const real = mode === 'REAL';
  const Icon = real ? ShieldCheck : FlaskConical;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide',
        real
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
          : 'border-amber-500/40 bg-amber-500/10 text-amber-400',
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {MODE_LABEL[mode]}
    </span>
  );
}

function CountryTags({ countries }: { countries: ProviderCountry[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {(countries ?? []).map((c) => (
        <span
          key={c}
          className="inline-flex items-center rounded border border-primary/30 bg-primary/10 px-1.5 py-px font-mono text-[11px] font-semibold uppercase tracking-wider text-primary/80"
        >
          {c}
        </span>
      ))}
    </span>
  );
}

function DownloadPair({ slug }: { slug: string }) {
  const cls =
    'inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary';
  return (
    <span className="flex gap-1.5">
      <a href={csvHref(slug)} download className={cls}>
        <FileSpreadsheet className="h-3 w-3 shrink-0" />
        CSV
      </a>
      <a href={jsonHref(slug)} download className={cls}>
        <FileJson className="h-3 w-3 shrink-0" />
        JSON
      </a>
    </span>
  );
}

/* --------------------------------------------------- walkthrough tables */

function StepDataTable({ table }: { table: StepTable }) {
  const excluded = new Set(table?.excludedRows ?? []);
  return (
    <div className="mt-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ModeBadge mode={table?.mode ?? 'SYNTHETIC'} />
        <p className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{table?.caption}</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/40">
              {(table?.headers ?? []).map((h: string, i: number) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-3 py-2.5 text-left font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(table?.rows ?? []).map((r: string[], i: number) => (
              <tr
                key={i}
                className={cn(
                  'border-b border-border/30 transition-colors last:border-0',
                  excluded.has(i)
                    ? 'bg-amber-500/[0.04] text-muted-foreground/70'
                    : 'text-foreground/85 hover:bg-secondary/30'
                )}
              >
                {(r ?? []).map((c: string, j: number) => (
                  <td key={j} className="px-3 py-2.5 align-top leading-snug">
                    {j === 0 && excluded.has(i) ? (
                      <span className="flex items-start gap-1.5">
                        <span className="mt-1 inline-block h-3 w-0.5 shrink-0 rounded bg-amber-500/70" aria-hidden />
                        {c}
                      </span>
                    ) : (
                      c
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table?.note ? (
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/80">{table.note}</p>
      ) : null}
    </div>
  );
}

function SourceChip({ slug, label, mode, role }: { slug: string; label: string; mode: DatasetMode; role: string }) {
  const downloadable = slug !== 'manifest';
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[15px] font-bold text-foreground">{label}</p>
        {/* The manifest is the file index, not a publisher extract — it carries neither label. */}
        {downloadable ? <ModeBadge mode={mode} /> : null}
      </div>
      <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">{role}</p>
      <div className="mt-2.5">
        {downloadable ? (
          <DownloadPair slug={slug} />
        ) : (
          <a
            href="/sample-data/manifest.json"
            download
            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
          >
            <FileJson className="h-3 w-3 shrink-0" />
            manifest.json
          </a>
        )}
      </div>
    </div>
  );
}

function StepPanel({ step, onNext }: { step: WalkStep; onNext?: () => void }) {
  const next = WALKTHROUGH.find((s) => s?.n === (step?.n ?? 0) + 1);
  return (
    <div className="border-t border-border/40 pt-5">
      <p className="max-w-3xl text-[16px] font-semibold leading-relaxed text-foreground/90">{step?.question}</p>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{step?.what}</p>

      <p className="t-eyebrow mt-6 mb-2">Datasets feeding this step</p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {(step?.sources ?? []).map((s) => (
          <SourceChip key={`${step?.id}-${s?.slug}`} slug={s?.slug} label={s?.label} mode={s?.mode} role={s?.role} />
        ))}
      </div>

      {(step?.tables ?? []).map((t: StepTable, i: number) => (
        <StepDataTable key={`${step?.id}-t${i}`} table={t} />
      ))}

      {step?.checks ? (
        <div className="mt-6">
          <p className="t-eyebrow mb-2">Reconciliation controls — every line re-addable from the two files above</p>
          {step?.checksHeader ? (
            <div className="mb-1.5 flex flex-col gap-1 px-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="shrink-0 font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-primary sm:w-48">
                {step.checksHeader.label}
              </span>
              <span className="min-w-0 flex-1 font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
                {step.checksHeader.result}
              </span>
              <span className="shrink-0 font-marquee text-[12px] font-bold uppercase tracking-[0.14em] text-primary sm:w-36 sm:text-right">
                {step.checksHeader.variance}
              </span>
            </div>
          ) : null}
          <div className="grid gap-2">
            {step.checks.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] p-3 sm:flex-row sm:items-start sm:gap-4"
              >
                <span className="flex shrink-0 items-start gap-1.5 sm:w-48">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span className="text-[13px] font-semibold uppercase tracking-wider text-emerald-300/90">
                    {c?.label}
                  </span>
                </span>
                <span className="min-w-0 flex-1 break-words font-mono text-[13px] leading-snug text-foreground/85">
                  {c?.result}
                </span>
                <span className="shrink-0 font-mono text-[12px] uppercase tracking-wider text-emerald-400/80 sm:w-36 sm:text-right">
                  {c?.variance}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {step?.dashboards ? (
        <div className="mt-6">
          <p className="t-eyebrow mb-2">The three certified dashboards</p>
          <div className="grid gap-3 lg:grid-cols-3">
            {step.dashboards.map((d) => (
              <div key={d?.name} className="flex h-full flex-col rounded-xl border border-border/60 bg-secondary/20 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-marquee text-[15px] font-bold uppercase tracking-wide text-primary">{d?.name}</p>
                  <ModeBadge mode={d?.mode ?? 'SYNTHETIC'} />
                </div>
                <div className="mt-3 flex-1 space-y-2">
                  {(d?.kpis ?? []).map((k) => (
                    <div key={k?.metric} className="border-b border-border/30 pb-2 last:border-0 last:pb-0">
                      <p className="text-[12px] uppercase tracking-wider text-muted-foreground">{k?.metric}</p>
                      <p className="font-marquee text-lg font-bold leading-tight text-foreground">{k?.value ?? ''}</p>
                      <p className="text-[12px] leading-snug text-muted-foreground/70">{k?.basis}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 border-t border-border/40 pt-2.5 text-[12px] leading-snug text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-foreground/70">Certified by: </span>
                  {d?.certifies}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {(d?.source ?? []).map((s) => (
                    <DownloadPair key={s?.slug} slug={s?.slug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-3.5">
          <p className="t-eyebrow mb-1.5">What this proves at gate G1</p>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">{step?.gateG1}</p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-3.5">
          <p className="t-eyebrow mb-1.5">What this proves at gate G2</p>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">{step?.gateG2}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/[0.05] p-3.5">
        <p className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5" />
          The limit of this step
        </p>
        <p className="text-[12.5px] leading-relaxed text-muted-foreground">{step?.limit ?? ''}</p>
      </div>

      {next ? (
        <button
          type="button"
          onClick={onNext}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20"
        >
          Step {String(next.n).padStart(2, '0')} — {next.title}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------- the page */

export default function PrototypeContent() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<DatasetMode | 'All'>('All');
  const [country, setCountry] = useState<ProviderCountry | 'All'>('All');
  const [cat, setCat] = useState<ProviderCategory | 'All'>('All');
  const [activeStep, setActiveStep] = useState<number>(1);
  const reduceMotion = useReducedMotion();

  // The curtain plays when the walkthrough comes into view. `revealed` latches
  // on and never returns to false, and a timer arms it regardless — an observer
  // that never fires (a jump-scroll straight past the section, a restored
  // scroll position, a browser without IntersectionObserver) must never be able
  // to leave the section sitting there invisible.
  const walkRef = useRef<HTMLDivElement>(null);
  const walkInView = useInView(walkRef, { once: true, amount: 0.15 });
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (walkInView) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 4000);
    return () => clearTimeout(t);
  }, [walkInView]);
  const shown = reduceMotion || revealed;

  const filtered = useMemo(() => {
    return (PROTOTYPE_DATASETS ?? []).filter((d: PrototypeDataset) => {
      if (mode !== 'All' && d?.mode !== mode) return false;
      if (country !== 'All' && !(d?.countries ?? []).includes(country)) return false;
      if (cat !== 'All' && d?.category !== cat) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${d?.name ?? ''} ${d?.slug ?? ''} ${CATEGORY_LABELS?.[d?.category] ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, mode, country, cat]);

  const shownRows = useMemo(
    () => (filtered ?? []).reduce((acc: number, d: PrototypeDataset) => acc + (d?.rows ?? 0), 0),
    [filtered]
  );

  const goto = (n: number) => {
    // Clamp so the last step's "next" cannot select a step that does not exist.
    const total = (WALKTHROUGH ?? []).length || 1;
    setActiveStep(Math.min(Math.max(n, 1), total));
    if (typeof document !== 'undefined') {
      document.getElementById('walk-viz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <p className="t-eyebrow mb-3">Working Prototype</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        The <span className="text-primary">Prototype</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        The data programme run on sample data, Australia first — every file downloadable, every figure labelled real
        or synthetic. All currency figures AUD.
      </p>
      <Disclosure label="What the sample set holds" className="mt-4 max-w-3xl">
        A working prototype of the data programme on sample data — Australia first. Every dataset below is downloadable
        for analyst validation. Sixty datasets, one per catalogued provider, each shipped as a matched CSV and JSON pair — 120 files, 601 rows.
        Fifteen are real extracts taken from the named publisher, carrying a source URL and an access date on every
        row. The other forty-five are synthetic samples that mirror each provider&apos;s published field specification
        so the pipeline can be built and tested before a single licence is bought. The two are labelled on every
        table, tile and file, and they are never mixed. Nothing on this page is a forecast, and no figure here is
        evidence of demand, supply or revenue in any market.
      </Disclosure>

      <Section eyebrow="End to End, In Motion" title="An Australian Consented Audience, Run End to End" className="mt-12 mb-12">
        <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Landed, checked, resolved, consent-gated, activated. Every figure below is computed from the file itself.
        </p>
        <AuAudienceDemo />
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Reference Geography" title="Where These People Sit">
        <AuGeographyStrip />
        <div className="mt-3">
          <AuMapNote />
        </div>
      </Section>

      <Section eyebrow="The Columns" title="Every Field, and What Stands Behind It">
        <AuColumnSpec />
      </Section>

      <Section eyebrow="Sources" title="The Providers Behind Each Column">
        <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          The commercial person-level lists carry the contact columns but no ancestry or language field; the
          classification products are area-level and the panels size a segment. Ancestry and language reach a record
          one way only — the person declaring them at opt-in.
        </p>
        <AuProviderRefs />
      </Section>

      <Section eyebrow="Warehouse" title="Data Mart Tables and Their Joins">
        <AuDataMart />
      </Section>

      <OrnamentDivider />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Datasets · Files · Rows"
          value={`${PROTOTYPE_TOTALS.datasets} · ${PROTOTYPE_TOTALS.files} · ${PROTOTYPE_TOTALS.rows}`}
          sub="One dataset per catalogued provider, each as a CSV and a JSON. Every file downloadable from the table below."
        />
        <GlassCard className="flex flex-col gap-2">
          <p className="t-eyebrow">Real Extracts</p>
          <p className="font-marquee text-2xl font-bold uppercase leading-tight text-emerald-400 md:text-3xl">
            {PROTOTYPE_TOTALS.real} datasets
          </p>
          <p className="text-sm leading-snug text-muted-foreground">
            {PROTOTYPE_TOTALS.realRows} rows taken from the named publisher, with a source URL and an access date on
            every row.
          </p>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <p className="t-eyebrow">Synthetic Samples</p>
          <p className="font-marquee text-2xl font-bold uppercase leading-tight text-amber-400 md:text-3xl">
            {PROTOTYPE_TOTALS.synthetic} datasets
          </p>
          <p className="text-sm leading-snug text-muted-foreground">
            {PROTOTYPE_TOTALS.syntheticRows} rows that mirror each provider&apos;s published field spec. Illustrative
            values only — not vendor data, and evidence of nothing.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="mt-6">
        <p className="t-eyebrow mb-3">How to read the two labels</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <ModeBadge mode="REAL" />
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Real extract. Taken from the publisher named in the file, on the access date recorded in the file. Every
              row carries <span className="font-mono text-foreground/80">source_url</span> and{' '}
              <span className="font-mono text-foreground/80">access_date</span>, so any figure can be traced back to its
              publisher without leaving the spreadsheet.
            </p>
          </div>
          <div>
            <ModeBadge mode="SYNTHETIC" />
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Synthetic sample — mirrors provider spec. Field names follow the provider&apos;s own published data
              specification; every value is an illustrative mock figure. Not licensed vendor data, not a Ticketalay
              record, and never evidence of demand, supply or revenue in any market.
            </p>
          </div>
        </div>
      </GlassCard>

      <Section eyebrow="Downloadable Sample Set" title="All 60 Datasets" className="mt-12">
        <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Filter, then download any dataset in either format. Each row&apos;s full catalogue entry lives on the{' '}
          <Link href="/data-ecosystem" className="text-primary hover:underline">
            Data Ecosystem
          </Link>{' '}
          page.
        </p>
        <Disclosure label="What the catalogue entry holds" className="mb-4 max-w-3xl">
          Search and filter the set, then download any dataset in either format. The catalogue entry behind each row —
          cost, trust tier, refresh cadence and full assessment — lives on the Data Ecosystem page; this page ships the
          files.
        </Disclosure>

        <GlassCard className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                  mode === m
                    ? 'border-primary/60 bg-primary/20 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'All' ? 'All Modes' : MODE_LABEL[m as DatasetMode]}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              Country Coverage
            </p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...PROTOTYPE_COUNTRY_FILTERS] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCountry(c)}
                  className={`rounded-md border px-3 py-1 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                    country === c
                      ? 'border-primary/60 bg-primary/20 text-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {c === 'All' ? 'All Countries' : c}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] leading-snug text-muted-foreground/70">
              A country tag records where a source has coverage — not that it evidences demand in that market.
              &quot;Global&quot; is its own tag: a global source is not thereby an AU, UK, US, CA or EU source.
            </p>
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-[2fr_1fr]">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={`rounded-md border px-3 py-1 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                      cat === c
                        ? 'border-primary/60 bg-primary/20 text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {c === 'All' ? 'All Categories' : `${c} · ${CATEGORY_LABELS?.[c as ProviderCategory] ?? ''}`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Search</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value ?? '')}
                  placeholder="Search datasets…"
                  className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs text-foreground outline-none focus:border-primary/60"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Showing <span className="font-semibold text-primary">{filtered?.length ?? 0}</span> of{' '}
          {PROTOTYPE_TOTALS.datasets} datasets · <span className="font-semibold text-primary">{shownRows}</span> rows
        </p>

        {(filtered?.length ?? 0) === 0 ? (
          <GlassCard className="py-12 text-center text-sm text-muted-foreground">
            No datasets match the selected filters. Clear the search or widen the mode, country and category filters.
          </GlassCard>
        ) : (
          <DataTable
            headers={['Dataset', 'Category', 'Countries', 'Mode', 'Rows', 'Download']}
            rows={(filtered ?? []).map((d: PrototypeDataset) => [
              <span key="n" className="block">
                <span className="text-[15px] font-semibold text-foreground">
                  {d?.id}. {d?.name}
                </span>
                <span className="mt-0.5 block font-mono text-[10.5px] text-muted-foreground/70">{d?.slug}</span>
              </span>,
              <span key="c" className="block text-[13px] leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground/80">{d?.category}</span> ·{' '}
                {CATEGORY_LABELS?.[d?.category] ?? ''}
              </span>,
              <CountryTags key="co" countries={d?.countries ?? []} />,
              <ModeBadge key="m" mode={d?.mode ?? 'SYNTHETIC'} />,
              <span key="r" className="font-mono text-[13px] text-foreground/80">
                {d?.rows}
              </span>,
              <DownloadPair key="d" slug={d?.slug ?? ''} />,
            ])}
          />
        )}

        <p className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
          <Download className="h-3.5 w-3.5 shrink-0 text-primary" />
          CSV opens directly in Excel. The JSON carries the same rows plus the provider description and the
          specification note behind the sample. The index that generated this table is downloadable too —{' '}
          <a href="/sample-data/manifest.json" download className="text-primary hover:underline">
            manifest.json
          </a>
          .
        </p>
      </Section>

      <OrnamentDivider />

      <Section
        eyebrow="Australia, End to End"
        title="From Census Row to Board Dashboard — on Files You Can Download"
        id="walkthrough"
      >
        <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Five steps on the actual rows of the files above — each names its datasets, shows its rows, and states where
          it stops.
        </p>
        <Disclosure label="How to read the five steps" className="mb-6 max-w-3xl">
          Each step names the datasets that feed it, shows the rows themselves, states what it proves at gate G1 and at
          gate G2, and — just as importantly — where it stops. Two of the five steps run on synthetic samples and are
          labelled illustrative throughout; they demonstrate the mechanism, never a result.
        </Disclosure>

        {/* The five steps read left-to-right along one rail; selecting a node
            opens that step's detail full-width beneath it, so the sequence stays
            visible as a whole instead of scrolling past as a vertical stack. */}
        <div id="walk-viz" ref={walkRef} className="scroll-mt-24">
          <div className="relative">
            <motion.div
              className="absolute left-[10%] right-[10%] top-6 h-px origin-left bg-gradient-to-r from-primary/10 via-primary/45 to-primary/10"
              initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={shown ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: CURTAIN_EASE }}
              aria-hidden
            />
            <motion.ol
              className="relative grid grid-cols-5 gap-1 sm:gap-3"
              variants={reduceMotion ? undefined : curtainStage}
              initial={reduceMotion ? false : 'hidden'}
              animate={shown ? 'show' : 'hidden'}
            >
              {(WALKTHROUGH ?? []).map((step: WalkStep, i: number) => {
                const Icon = STEP_ICONS[i] ?? Users;
                const active = activeStep === step?.n;
                const passed = activeStep > (step?.n ?? 0);
                return (
                  <motion.li
                    key={step?.id}
                    className="min-w-0"
                    variants={reduceMotion ? undefined : curtainDrop}
                  >
                    <button
                      type="button"
                      onClick={() => goto(step?.n ?? 1)}
                      aria-current={active ? 'step' : undefined}
                      className="flex w-full flex-col items-center gap-2 text-center"
                    >
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                        <span
                          className="absolute inline-flex h-12 w-12 rounded-full border border-primary/25 bg-background"
                          aria-hidden
                        />
                        {active ? (
                          <span
                            className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-primary/10 [animation-duration:3s]"
                            aria-hidden
                          />
                        ) : null}
                        <span
                          className={cn(
                            'relative flex h-9 w-9 items-center justify-center rounded-full border font-marquee text-[15px] font-black transition-colors',
                            active
                              ? 'border-primary/70 bg-primary/20 text-primary shadow-[0_0_18px_rgba(201,168,76,0.25)]'
                              : passed
                                ? 'border-primary/40 bg-primary/10 text-primary/70'
                                : 'border-border bg-background text-muted-foreground'
                          )}
                        >
                          {String(step?.n).padStart(2, '0')}
                        </span>
                      </span>
                      <span
                        className={cn(
                          't-eyebrow hidden items-center gap-1.5 sm:flex',
                          active ? '' : 'opacity-70'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                      </span>
                      <span
                        className={cn(
                          'hidden font-marquee text-[15px] font-bold uppercase leading-snug tracking-wide transition-colors sm:block',
                          active ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {step?.title}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>

          <AnimatePresence mode="wait">
            {(() => {
              const step =
                (WALKTHROUGH ?? []).find((s: WalkStep) => s?.n === activeStep) ?? (WALKTHROUGH ?? [])[0];
              if (!step) return null;
              const idx = (WALKTHROUGH ?? []).findIndex((s: WalkStep) => s?.n === step?.n);
              const Icon = STEP_ICONS[idx] ?? Users;
              return (
                <motion.div
                  key={step?.id}
                  className="glass-card mt-6 rounded-xl border border-primary/40 p-5"
                  initial={reduceMotion ? false : { opacity: 0, y: -16, clipPath: 'inset(0% 0% 100% 0%)' }}
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
                  }
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.52, ease: CURTAIN_EASE }}
                >
                  <span className="t-eyebrow flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {step?.eyebrow}
                  </span>
                  <p className="mt-1.5 font-marquee text-lg font-bold uppercase tracking-wide text-foreground md:text-xl">
                    {String(step?.n).padStart(2, '0')} — {step?.title}
                  </p>
                  <StepPanel step={step} onNext={() => goto((step?.n ?? 0) + 1)} />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </Section>

      <Section eyebrow="Scope" title="The Two Things This Prototype Cannot Settle">
        <div className="grid gap-4">
          <GlassCard className="border-amber-500/30">
            <p className="t-eyebrow mb-2 text-amber-300">Ticketalay first-party data</p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              The real extract in Step 02 contains entity, product and engagement facts recovered from public sources.
              It contains no orders, no seats and no payments, because none of that is externally accessible. The
              first-party database — its schema, ownership, consent state and export rights — is disclosed by the
              Ticketalay principal under NDA at gate G0, at nil cost, as an internal disclosure. Until then the
              synthetic campaign file in Step 02 is a build target and nothing more.
            </p>
          </GlassCard>

          <GlassCard className="border-amber-500/30">
            <p className="t-eyebrow mb-2 text-amber-300">Primary diaspora demand evidence</p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Step 01 fixes the denominators — 22,263 Marathi speakers and 64% adult cultural attendance, both official
              statistics — but a denominator is a population, not a buyer. Willingness to pay, fee tolerance and channel
              trust come from the primary study of Marathi and Indian-origin event buyers in Melbourne and Sydney,
              commissioned by the Research lead at gate G1.
            </p>
          </GlassCard>
        </div>

        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          What it does establish: the pipeline runs, the labels survive end to end, and the mart reconciles to zero
          variance on files anyone can re-add.
        </p>
        <Disclosure label="What the prototype establishes, in full" className="mt-2 max-w-3xl">
          What the prototype does establish is narrower and more useful than a forecast: the pipeline runs, the labels
          survive it end to end, the finance mart reconciles to zero variance on files anyone can re-add, and every
          number a decision would rest on names the file it came from. The gate schedule and its priced components are
          on the Investment &amp; Returns page; the platform this pipeline would run on is on the Architecture page; the
          Australian market evidence behind Step 01 is on the Australia market page.
        </Disclosure>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/investment" className="btn-gold-outline">
            Gate Schedule <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <Link href="/architecture" className="btn-gold-outline">
            Architecture <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <Link href="/markets/australia" className="btn-gold-outline">
            Australia Evidence <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}

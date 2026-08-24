'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Wallet, Users, ReceiptText, Calculator } from 'lucide-react';
import {
  Section, GlassCard, OrnamentDivider, DataTable, StatCard, StatusBadge,
} from '@/components/proposal/section';
import { Disclosure } from '@/components/proposal/disclosure';
import {
  ACTUALS, GATE_SCHEDULE, GATE_SCHEDULE_NOTES, VENDOR_PRICES, VENDOR_PRICES_NOTE,
  PEOPLE_CORRECTIONS, PEOPLE_INTRO,
} from '@/lib/data/costs';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import { REVENUE_STREAMS } from '@/lib/data/insights';

/* Small gold or amber pill for the headline facts a section leads with. */
function FactChip({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'amber' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold tracking-wide ${
        tone === 'amber'
          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
          : 'border-primary/30 bg-primary/10 text-foreground/85'
      }`}
    >
      {children}
    </span>
  );
}

/* The A$830.00 anchor as a two-segment bar — AI spend beside consultation spend. */
function AnchorBar() {
  const reduceMotion = useReducedMotion();
  const segments = [
    {
      label: 'AI subscriptions and API credits',
      value: 'A$350.00',
      pct: (350 / 830) * 100,
      cls: 'bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]',
    },
    {
      label: 'Consultation — 8.0 hours × A$60.00/hr',
      value: 'A$480.00',
      pct: (480 / 830) * 100,
      cls: 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]',
    },
  ];
  return (
    <div className="mt-4 rounded-xl border border-border/60 bg-secondary/20 p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="t-eyebrow">How the anchor is made up</p>
        <p className="font-marquee text-lg font-bold uppercase text-primary">A$830.00 in total</p>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-border/20">
        {segments.map((s, i) => (
          <motion.div
            key={s.label}
            className={`h-full ${s.cls}`}
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: `${s.pct}%` }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-1">
        {segments.map((s) => (
          <p key={s.label} className="text-[12.5px] leading-snug text-muted-foreground">
            <span className="font-marquee text-[14px] font-bold text-primary">{s.value}</span> {s.label}
          </p>
        ))}
      </div>
    </div>
  );
}

/* Roles whose rates enter only through the written-quote round. */
const QUOTE_ROUND_ROLES = [
  'fractional CDO',
  'Data Engineering Lead',
  'Senior Data Engineer',
  'Data Architect',
  'BI Developer',
  'Marketing Data Analyst',
  'Data Governance Analyst',
  'Cloud/DevOps Engineer',
  'Privacy Consultant',
  'Project Manager',
  'UX/UI Designer',
];

export default function InvestmentContent() {
  return (
    <div>
      <p className="t-eyebrow mb-3">Section 05</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Investment & <span className="text-primary">Returns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Actual spend to date, a per-gate decision schedule, vendor-published prices and the revenue identity — every
        forward figure expressed as a multiple of the A$830.00 anchor.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <FactChip>All figures AUD</FactChip>
        <FactChip>FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1</FactChip>
        <FactChip tone="amber">Aggregator benchmark — context only, feeding no funded figure</FactChip>
      </div>
      <Disclosure label="What this page sets out" className="mt-4 max-w-3xl">
        <p>
          This page sets out the actual spend to date, a per-gate decision schedule in which every figure is expressed
          as a multiple of the affordability anchor, vendor-published prices for the data tools the programme might
          actually buy, and the revenue identity, with every variable named and its confirmer stated.
        </p>
        <p className="mt-2">
          All figures AUD; source-currency prices are shown with their conversion. One figure sits outside the usual
          pattern of actual spend, published price and calculation: a salary band compiled by an aggregator is not a
          published price, so it is labelled{' '}
          <span className="font-semibold text-foreground/80">Aggregator benchmark</span> — context only, feeding no
          funded figure. FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.
        </p>
      </Disclosure>

      <Section eyebrow="Actual Spend to Date" title="The Affordability Anchor" className="mt-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label={ACTUALS?.total?.label ?? ''}
            value={ACTUALS?.total?.value ?? ''}
            sub={ACTUALS?.total?.note}
          />
          <StatCard
            label={ACTUALS?.ai?.label ?? ''}
            value={ACTUALS?.ai?.value ?? ''}
            sub={ACTUALS?.ai?.note}
          />
          <StatCard
            label={ACTUALS?.consultation?.label ?? ''}
            value={ACTUALS?.consultation?.value ?? ''}
            sub={ACTUALS?.consultation?.note}
          />
        </div>
        <AnchorBar />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{ACTUALS?.ledgerFooterRetained}</p>
        <Disclosure label="How this figure is built" className="mt-3 max-w-3xl">
          Actual spend: A$350.00 of AI subscriptions and API credits, plus A$480.00 of consultation at 8.0 hours ×
          A$60.00/hr — A$830.00 in total.
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Cost Structure, Rebuilt" title="A Per-Gate Decision Schedule, Not a TCO">
        <div className="mb-4 flex flex-wrap gap-2">
          <FactChip>Committable today in third-party vendor cash: none</FactChip>
          <FactChip>AU domain: parked</FactChip>
          <FactChip>Contracted inventory: zero</FactChip>
          <FactChip>Partnership terms: unwritten</FactChip>
          <FactChip>Five professional-services quote requests: free to lodge</FactChip>
        </div>
        <p className="mb-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Each gate below is a separate board decision; money committed at one gate buys the information for the next.
        </p>
        <Disclosure label="How to read this schedule" className="mb-4 max-w-3xl">
          {GATE_SCHEDULE_NOTES?.intro}
        </Disclosure>
        <DataTable
          headers={['Gate', 'What It Buys', 'Priced Components', 'Multiple of the A$830 Anchor']}
          rows={(GATE_SCHEDULE ?? []).map((g: any) => [
            <span key="g" className="font-semibold text-foreground whitespace-nowrap">{g?.gate}</span>,
            g?.buys ?? '',
            g?.priced ?? '',
            <span key="m" className="font-marquee text-[14px] font-bold text-primary">{g?.multiple ?? ''}</span>,
          ])}
        />
        <div className="mt-4 rounded-lg border border-primary/25 bg-primary/[0.05] p-4">
          <p className="t-eyebrow mb-1.5">No G3 on this schedule</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{GATE_SCHEDULE_NOTES?.noG3}</p>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Data Acquisition" title="Vendor-Published Prices">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Recommended near-term purchase"
            value="IBISWorld"
            sub="The single report — the only recommended near-term purchase."
          />
          <StatCard
            label="Free official statistics — acquire first"
            value="A$0"
            sub="ABS, UN DESA, ONS, US Census, Eurostat, StatCan and the statutory registers cost nothing and come first."
          />
          <StatCard label="Day-1 data spend — floor" value="A$2,500.00" sub="Per the G2 line above." />
          <StatCard label="Day-1 data spend — full configuration" value="A$6,036.74" sub="Per the G2 line above." />
        </div>
        <div className="mt-4 flex items-start gap-2">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            What each vendor actually publishes, and this programme&apos;s disposition of each line.
          </p>
        </div>
        <Disclosure label="What to buy first" className="mt-3 max-w-3xl">
          What each vendor actually publishes, and this programme&apos;s disposition of each line. Only the
          IBISWorld report is a recommended near-term purchase; the free official-statistics sources — ABS, UN DESA,
          ONS, US Census, Eurostat, StatCan and the statutory registers — cost nothing and come first.
        </Disclosure>
        <DataTable
          className="mt-4"
          headers={['Provider', 'Vendor-Published Price', 'Disposition']}
          rows={(VENDOR_PRICES ?? []).map((v: any) => [
            <span key="p" className="font-semibold text-foreground">{v?.provider}</span>,
            v?.published ?? '',
            v?.disposition ?? '',
          ])}
        />
        <Disclosure label="Pricing rules behind this table" className="mt-4 max-w-3xl">
          {VENDOR_PRICES_NOTE}
        </Disclosure>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="People" title="What a Salary Claim Survives On">
        <div className="mb-4 flex items-start gap-2">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Only roles with a published Australian source behind them carry a figure.
          </p>
        </div>
        <DataTable
          headers={['Item', 'Figure', 'Standing']}
          rows={(PEOPLE_CORRECTIONS ?? []).map((p: any) => [
            <span key="i" className="font-semibold text-foreground">{p?.item}</span>,
            p?.corrected ?? '',
            p?.standing ?? '',
          ])}
        />
        <div className="mt-4 rounded-xl border border-border/60 bg-secondary/20 p-4">
          <p className="t-eyebrow mb-1">Rates enter only through the written-quote round</p>
          <p className="mb-3 text-[12.5px] leading-snug text-muted-foreground">
            No published AU band exists for the exact title of any role below, so each rate is quoted rather than
            proxied.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUOTE_ROUND_ROLES.map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded border border-border/60 bg-secondary/40 px-2 py-0.5 text-[11.5px] font-semibold tracking-wide text-foreground/80"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <Disclosure label="The full working" className="mt-3 max-w-3xl">
          {PEOPLE_INTRO}
        </Disclosure>
        <p className="mt-3 text-xs text-muted-foreground/70">
          Source: SEEK Data Analyst salary page. Labour rate: A$60.00/hr, the rate actually paid.
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="The Revenue Model" title="The Revenue Identity, Variable by Variable">
        <GlassCard className="border-primary/30">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">The Identity</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{REVENUE_IDENTITY?.intro}</p>
          <div className="mt-4 rounded-lg border border-primary/25 bg-secondary/40 p-5 text-center font-mono">
            <p className="text-base font-semibold text-primary md:text-lg">{REVENUE_IDENTITY?.formulaGross}</p>
            <p className="mt-1.5 text-base font-semibold text-primary md:text-lg">{REVENUE_IDENTITY?.formulaShare}</p>
          </div>
          <DataTable
            className="mt-4"
            headers={['Variable', 'Meaning', 'Who Confirms / What Produces It', 'By When']}
            rows={(IDENTITY_VARIABLES ?? []).map((v: any) => [
              <span key="s" className="font-bold text-primary">{v?.symbol}</span>,
              v?.meaning ?? '',
              v?.confirms ?? '',
              v?.when ?? '',
            ])}
          />
          <Disclosure label="How the identity resolves" className="mt-4">
            <p>{REVENUE_IDENTITY?.outro}</p>
            <p className="mt-2 italic">{DATA_CONFIDENCE_NOTE}</p>
          </Disclosure>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Monetisation" title="Revenue Streams — In Priority Order">
        <DataTable
          headers={['Stream', 'Model', 'Priority']}
          rows={(REVENUE_STREAMS ?? []).map((r: any) => {
            const [tier, ...rest] = String(r?.priority ?? '').split(' — ');
            return [
              <span key="s" className="font-semibold text-foreground">{r?.stream ?? ''}</span>,
              r?.model ?? '',
              <span key="p" className="flex flex-wrap items-center gap-2">
                <StatusBadge status={tier ?? ''} />
                {rest.length ? <span className="text-[13px] text-muted-foreground">{rest.join(' — ')}</span> : null}
              </span>,
            ];
          })}
        />
        <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground/70">
          <ReceiptText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            The take-rate row, the B2B deferral and the dynamic-pricing deferral are stated targets and deferrals —
            nothing in this table is claimed proven. The 8–12% band stays unevidenced until the primary demand study
            reports (variable f above).
          </span>
        </p>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[12px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Section 05 · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

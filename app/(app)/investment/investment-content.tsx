'use client';

import { Wallet, Users, ReceiptText, Calculator } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable, StatCard } from '@/components/proposal/section';
import {
  ACTUALS, GATE_SCHEDULE, GATE_SCHEDULE_NOTES, VENDOR_PRICES, VENDOR_PRICES_NOTE,
  PEOPLE_CORRECTIONS, PEOPLE_INTRO,
} from '@/lib/data/costs';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import { REVENUE_STREAMS } from '@/lib/data/insights';

export default function InvestmentContent() {
  return (
    <div>
      <p className="t-eyebrow mb-3">Section 05</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Investment & <span className="text-primary">Returns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        This page sets out the actual spend to date, a per-gate decision schedule in which every figure is expressed
        as a multiple of the affordability anchor, vendor-published prices for the data tools the programme might
        actually buy, and the revenue identity, with every variable named and its confirmer stated.
      </p>

      <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        All figures AUD; source-currency prices are shown with their conversion. One figure sits outside the usual
        pattern of actual spend, published price and calculation: a salary band compiled by an aggregator is not a
        published price, so it is labelled{' '}
        <span className="font-semibold text-foreground/80">Aggregator benchmark</span> — context only, feeding no
        funded figure. FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.
      </p>

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
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{ACTUALS?.ledgerFooterRetained}</p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Actual spend: A$350.00 of AI subscriptions and API credits, plus A$480.00 of consultation at 8.0 hours ×
          A$60.00/hr — A$830.00 in total.
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Cost Structure, Rebuilt" title="A Per-Gate Decision Schedule, Not a TCO">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{GATE_SCHEDULE_NOTES?.intro}</p>
        <DataTable
          headers={['Gate', 'What It Buys', 'Priced Components', 'Multiple of the A$830 Anchor']}
          rows={(GATE_SCHEDULE ?? []).map((g: any) => [
            <span key="g" className="font-semibold text-foreground whitespace-nowrap">{g?.gate}</span>,
            g?.buys ?? '',
            g?.priced ?? '',
            g?.multiple ?? '',
          ])}
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{GATE_SCHEDULE_NOTES?.noG3}</p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Data Acquisition" title="Vendor-Published Prices">
        <div className="mb-4 flex items-start gap-2">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            What each vendor actually publishes, and this programme&apos;s disposition of each line. Only the
            IBISWorld report is a recommended near-term purchase; the free official-statistics sources — ABS, UN DESA,
            ONS, US Census, Eurostat, StatCan and the statutory registers — cost nothing and come first.
          </p>
        </div>
        <DataTable
          headers={['Provider', 'Vendor-Published Price', 'Disposition']}
          rows={(VENDOR_PRICES ?? []).map((v: any) => [
            <span key="p" className="font-semibold text-foreground">{v?.provider}</span>,
            v?.published ?? '',
            v?.disposition ?? '',
          ])}
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{VENDOR_PRICES_NOTE}</p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="People" title="What a Salary Claim Survives On">
        <div className="mb-4 flex items-start gap-2">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PEOPLE_INTRO}
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
          <div className="mt-4 rounded-lg border border-primary/25 bg-secondary/40 p-4 font-mono text-sm text-foreground">
            <p className="font-semibold text-primary">{REVENUE_IDENTITY?.formulaGross}</p>
            <p className="mt-1 font-semibold text-primary">{REVENUE_IDENTITY?.formulaShare}</p>
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
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{REVENUE_IDENTITY?.outro}</p>
          <p className="mt-3 text-xs italic text-muted-foreground/70">{DATA_CONFIDENCE_NOTE}</p>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Monetisation" title="Revenue Streams — In Priority Order">
        <DataTable
          headers={['Stream', 'Model', 'Priority']}
          rows={(REVENUE_STREAMS ?? []).map((r: any) => [r?.stream ?? '', r?.model ?? '', r?.priority ?? ''])}
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

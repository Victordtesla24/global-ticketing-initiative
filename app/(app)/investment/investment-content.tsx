'use client';

import { Wallet, Users, ReceiptText, AlertTriangle, Calculator, TrendingDown } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable, StatCard } from '@/components/proposal/section';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  ACTUALS, GATE_SCHEDULE, GATE_SCHEDULE_NOTES, VENDOR_PRICES, VENDOR_PRICES_NOTE,
  PEOPLE_CORRECTIONS, PEOPLE_INTRO, ROI_VERDICT, INVESTMENT_OPEN_ITEMS,
} from '@/lib/data/costs';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import { REVENUE_STREAMS } from '@/lib/data/insights';

function OutstandingItem({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">Outstanding before decision — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What must be obtained:</span> {item?.unknown}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

const outstanding = (ref: string) => (INVESTMENT_OPEN_ITEMS ?? []).find((i: any) => i?.ref === ref);

export default function InvestmentContent() {
  const quotes = outstanding('quotes');
  const firstPartyData = outstanding('first-party-data');
  const partnershipTerms = outstanding('partnership-terms');
  const supply = outstanding('supply');
  const demand = outstanding('demand');

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 05</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Investment & <span className="text-primary">Returns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        No three-year total cost of ownership, return on investment or break-even volume is published on this page:
        none of them is computable from the evidence that exists. What stands instead is the actual spend to date, a
        per-gate decision schedule in which every figure is expressed as a multiple of the affordability anchor,
        vendor-published prices for the data tools the programme might actually buy, and the revenue identity — every
        variable named, its confirmer stated, and no output number published.
      </p>

      <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        All figures AUD; source-currency prices are shown with their conversion. Two figures sit outside the usual
        pattern of actual spend, published price and calculation. A salary band compiled by an aggregator is not a
        published price, so it is labelled{' '}
        <span className="font-semibold text-foreground/80">Aggregator benchmark</span> — context only, feeding no
        funded figure. And on the Statista Personal tier an earlier costing recorded A$922/yr against the vendor&apos;s
        own published US$649/mo billed annually; the two are not reconciled, the programme sponsor owns closing that
        gap, and no funded line depends on it. FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.
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
        <div className="mt-4 space-y-4">
          {quotes ? <OutstandingItem item={quotes} /> : null}
          {firstPartyData ? <OutstandingItem item={firstPartyData} /> : null}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Data Acquisition" title="Vendor-Published Prices">
        <div className="mb-4 flex items-start gap-2">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            What each vendor actually publishes, and this programme&apos;s disposition of each line. Only the
            IBISWorld report is a recommended near-term purchase; the free official-statistics sources — ABS, UN DESA,
            ONS, US Census, Eurostat, StatCan and the statutory registers — are published free and come first.
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

      <Section eyebrow="The Revenue Model" title="The Honest Identity — Publishing No Output Number">
        <GlassCard className="border-primary/30">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">The Identity, Variable by Variable</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{REVENUE_IDENTITY?.intro}</p>
          <div className="mt-4 rounded-lg border border-primary/25 bg-secondary/40 p-4 font-mono text-sm text-foreground">
            <p className="font-semibold text-primary">{REVENUE_IDENTITY?.formulaGross}</p>
            <p className="mt-1 font-semibold text-primary">{REVENUE_IDENTITY?.formulaShare}</p>
          </div>
          <DataTable
            className="mt-4"
            headers={['Variable', 'Meaning', 'Status', 'Who Confirms / What Produces It', 'By When']}
            rows={(IDENTITY_VARIABLES ?? []).map((v: any) => [
              <span key="s" className="font-bold text-primary">{v?.symbol}</span>,
              v?.meaning ?? '',
              v?.status ?? '',
              v?.confirms ?? '',
              v?.when ?? '',
            ])}
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{REVENUE_IDENTITY?.outro}</p>
          <p className="mt-3 text-xs italic text-muted-foreground/70">{DATA_CONFIDENCE_NOTE}</p>
        </GlassCard>
        <div className="mt-4 space-y-4">
          {partnershipTerms ? <OutstandingItem item={partnershipTerms} /> : null}
          {supply ? <OutstandingItem item={supply} /> : null}
          {demand ? <OutstandingItem item={demand} /> : null}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Returns" title="Return on Investment Is Not Yet Computable">
        <GlassCard>
          <div className="mb-3 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">Verdict, Per Market</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{ROI_VERDICT}</p>
        </GlassCard>
      </Section>

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

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Section 05 · All figures AUD · Australian English · Confidential
      </p>
    </div>
  );
}

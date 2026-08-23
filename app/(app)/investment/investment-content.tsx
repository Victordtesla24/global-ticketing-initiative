'use client';

import { Wallet, Users, ReceiptText, AlertTriangle, Calculator, TrendingDown } from 'lucide-react';
import { Section, GlassCard, OrnamentDivider, DataTable, StatCard } from '@/components/proposal/section';
import { Tag, TagText } from '@/components/proposal/tag';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  ACTUALS, GATE_SCHEDULE, GATE_SCHEDULE_NOTES, VENDOR_PRICES, VENDOR_PRICES_NOTE,
  PEOPLE_CORRECTIONS, PEOPLE_INTRO, REMOVED_SUMMARY, ROI_VERDICT, INVESTMENT_OPEN_ITEMS,
} from '@/lib/data/costs';
import { REVENUE_IDENTITY, IDENTITY_VARIABLES, DATA_CONFIDENCE_NOTE } from '@/lib/data/revenue-model';
import { REVENUE_STREAMS } from '@/lib/data/insights';

function OpenItemCallout({ item }: { item: { ref: string; title: string; unknown: string; owner: string; action: string } }) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 !text-amber-400" />
      <AlertTitle className="text-amber-300">OPEN ITEM — {item?.title}</AlertTitle>
      <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">What is unknown:</span> {item?.unknown}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Owner:</span> {item?.owner}</p>
        <p className="mt-1"><span className="font-semibold text-foreground/80">Action:</span> {item?.action}</p>
      </AlertDescription>
    </Alert>
  );
}

const openItem = (ref: string) => (INVESTMENT_OPEN_ITEMS ?? []).find((i: any) => i?.ref?.startsWith?.(ref));

export default function InvestmentContent() {
  const u05 = openItem('U-05');
  const u07 = openItem('U-07');
  const u02 = openItem('U-02');
  const u03 = openItem('U-03');
  const u04 = openItem('U-04');

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 05</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Investment & <span className="text-primary">Returns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        This page no longer publishes a three-year total cost of ownership, an ROI, a break-even volume or an
        interactive revenue sandbox. The audit found the originals unsourced, internally contradictory or fabricated,
        and deleted them. What stands instead: the receipted actual spend to date, a per-gate decision schedule in
        which every figure carries a provenance tag and a multiple of the affordability anchor, vendor-published
        prices for the data tools the programme might actually buy, and the honest revenue identity — every variable
        tagged, its confirmer named, and no output number published.
      </p>

      <Alert className="mt-6 max-w-3xl border-red-500/40 bg-red-500/5">
        <AlertTriangle className="h-4 w-4 !text-red-400" />
        <AlertTitle className="text-red-300">Adversarial audit — corrections applied to this page</AlertTitle>
        <AlertDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          115 claims removed from this page by the adversarial audit — see register (a further 10 replaced with
          vendor-published figures; 11 verified disclosures retained or restructured). All figures AUD;
          source-currency prices shown with their conversion. The site&apos;s estimate tag is abolished on this page:
          every surviving monetary figure carries exactly one of <Tag tag="ACTUAL" /> <Tag tag="LIST" />{' '}
          <Tag tag="QUOTE" /> <Tag tag="DERIVED" /> <Tag tag="ASSUMPTION" /> <Tag tag="UNKNOWN" />, with one labelled
          exception: a published salary band from an aggregator can never earn <Tag tag="LIST" /> under the trust
          ladder, so it carries the explicit provenance label <span className="font-semibold text-foreground/80">Aggregator benchmark</span>{' '}
          instead — context only, feeding no funded figure. FX: RBA, 21 Aug 2026 — USD 0.7145 per A$1.
        </AlertDescription>
      </Alert>

      <Section eyebrow="What Was Removed" title="What This Page No Longer Claims" className="mt-12">
        <GlassCard>
          <p className="text-sm leading-relaxed text-muted-foreground">{REMOVED_SUMMARY?.para1}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{REMOVED_SUMMARY?.para2}</p>
        </GlassCard>
      </Section>

      <Section eyebrow="Actual Spend to Date" title="The Affordability Anchor">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label={ACTUALS?.total?.label ?? ''}
            value={<TagText text={ACTUALS?.total?.value ?? ''} />}
            sub={ACTUALS?.total?.note}
          />
          <StatCard
            label={ACTUALS?.ai?.label ?? ''}
            value={<TagText text={ACTUALS?.ai?.value ?? ''} />}
            sub={ACTUALS?.ai?.note}
          />
          <StatCard
            label={ACTUALS?.consultation?.label ?? ''}
            value={<TagText text={ACTUALS?.consultation?.value ?? ''} />}
            sub={<TagText text={ACTUALS?.consultation?.note ?? ''} />}
          />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{ACTUALS?.ledgerFooterRetained}</p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Ground-Truth Register GT-11, GT-12, GT-13 (receipted actuals). Ledger deletion: CL-0343/CL-0348/CL-0350
          (FABRICATED — direct GT-12/GT-13 conflict); footer disclosure retained per CL-0351 (VERIFIED).
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Cost Structure, Rebuilt" title="A Per-Gate Decision Schedule, Not a TCO">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{GATE_SCHEDULE_NOTES?.intro}</p>
        <DataTable
          headers={['Gate', 'What It Buys', 'Priced Components', 'Multiple of the A$830 Anchor']}
          rows={(GATE_SCHEDULE ?? []).map((g: any) => [
            <span key="g" className="font-semibold text-foreground whitespace-nowrap">{g?.gate}</span>,
            <TagText key="b" text={g?.buys ?? ''} />,
            <TagText key="p" text={g?.priced ?? ''} />,
            g?.multiple ?? '',
          ])}
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <TagText text={GATE_SCHEDULE_NOTES?.noG3 ?? ''} />
        </p>
        <div className="mt-4 space-y-4">
          {u05 ? <OpenItemCallout item={u05} /> : null}
          {u07 ? <OpenItemCallout item={u07} /> : null}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Data Acquisition" title="Vendor-Published Prices Replacing the Deleted Estimates">
        <div className="mb-4 flex items-start gap-2">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The deleted data-acquisition tab attributed prices to plans that do not exist and ranges no vendor
            publishes. The corrected table shows what each vendor actually publishes, and the rebuild&apos;s disposition of
            each line. Only the IBISWorld report is a recommended near-term purchase; the free official-statistics
            sources (ABS, UN DESA, ONS, US Census, Eurostat, StatCan and the statutory registers) cost A$0 and come first.
          </p>
        </div>
        <DataTable
          headers={['Provider', 'Deleted Claim', 'Vendor-Published Price', 'Disposition']}
          rows={(VENDOR_PRICES ?? []).map((v: any) => [
            <span key="p" className="font-semibold text-foreground">{v?.provider}</span>,
            <span key="d" className="text-muted-foreground line-through decoration-red-400/50">{v?.deleted}</span>,
            <TagText key="v" text={v?.published ?? ''} />,
            <TagText key="s" text={v?.disposition ?? ''} />,
          ])}
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <TagText text={VENDOR_PRICES_NOTE ?? ''} />
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="People" title="What a Salary Claim Survives On">
        <div className="mb-4 flex items-start gap-2">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <TagText text={PEOPLE_INTRO ?? ''} />
          </p>
        </div>
        <DataTable
          headers={['Item', 'Deleted Claim', 'Corrected Figure', 'Standing']}
          rows={(PEOPLE_CORRECTIONS ?? []).map((p: any) => [
            <span key="i" className="font-semibold text-foreground">{p?.item}</span>,
            <span key="d" className="text-muted-foreground line-through decoration-red-400/50">{p?.deleted}</span>,
            <TagText key="c" text={p?.corrected ?? ''} />,
            <TagText key="s" text={p?.standing ?? ''} />,
          ])}
        />
        <p className="mt-3 text-xs text-muted-foreground/70">
          SEEK Data Analyst salary page (accessed 2026-08-23; adjudicated OVERSTATED at CL-0275/CL-0285, replaced).
          Rate: GT-12. The deleted Year-1 staffing envelope also failed to sum from its own rows (T0-121).
        </p>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="The Revenue Model" title="The Honest Identity — Publishing No Output Number">
        <GlassCard className="border-primary/30">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">The Tagged Identity Formula</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{REVENUE_IDENTITY?.intro}</p>
          <div className="mt-4 rounded-lg border border-primary/25 bg-secondary/40 p-4 font-mono text-sm text-foreground">
            <p className="font-semibold text-primary">{REVENUE_IDENTITY?.formulaGross}</p>
            <p className="mt-1 font-semibold text-primary">{REVENUE_IDENTITY?.formulaShare}</p>
          </div>
          <DataTable
            className="mt-4"
            headers={['Variable', 'Meaning', 'Tag', 'Who Confirms / What Produces It', 'By When']}
            rows={(IDENTITY_VARIABLES ?? []).map((v: any) => [
              <span key="s" className="font-bold text-primary">{v?.symbol}</span>,
              v?.meaning ?? '',
              <TagText key="t" text={v?.tag ?? ''} />,
              <TagText key="c" text={v?.confirms ?? ''} />,
              v?.when ?? '',
            ])}
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <TagText text={REVENUE_IDENTITY?.outro ?? ''} />
          </p>
          <p className="mt-3 text-xs italic text-muted-foreground/70">{DATA_CONFIDENCE_NOTE}</p>
        </GlassCard>
        <div className="mt-4 space-y-4">
          {u02 ? <OpenItemCallout item={u02} /> : null}
          {u03 ? <OpenItemCallout item={u03} /> : null}
          {u04 ? <OpenItemCallout item={u04} /> : null}
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Returns" title="ROI Is Not Computable — and This Page Says So">
        <GlassCard>
          <div className="mb-3 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">Verdict, Per Market</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <TagText text={ROI_VERDICT ?? ''} />
          </p>
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
            Retained: the take-rate row (CL-0352), the B2B deferral (CL-0353) and the dynamic-pricing deferral
            (CL-0354) were adjudicated VERIFIED as honestly caveated targets and deferrals — nothing in this table is
            claimed proven. The 8–12% band remains unevidenced until the U-04 study reports (variable f above).
          </span>
        </p>
      </Section>

      <p className="mt-10 border-t border-border/40 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
        AB Entertainment · Section 05 · All figures AUD · Australian English · Confidential
      </p>
      <p className="mt-2 text-center text-[11px] text-muted-foreground/50">
        Corrected edition — third-party adversarial audit, 2026-08-23. Deletion is recorded, not disguised: see
        artifacts/deletion_register.md and workflow/register_by_route/investment.json.
      </p>
    </div>
  );
}

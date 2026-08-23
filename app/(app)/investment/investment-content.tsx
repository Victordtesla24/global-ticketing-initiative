'use client';

import { useMemo, useState } from 'react';
import { Wallet, Users, Scale, Cloud, ReceiptText, AlertTriangle, Calculator, UserRound } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ReferenceLine,
} from 'recharts';
import { Section, GlassCard, OrnamentDivider, EstText, DataTable, StatCard } from '@/components/proposal/section';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  TCO_BASE, TCO_SCENARIOS, STAFFING, STAFFING_TOTAL, STAFFING_PHASES, CONSULTING,
  DATA_ACQUISITION, CLOUD, AI_LEDGER, ROI_MATRIX, VOLUME_HURDLES, ANALYST_FRAMING, INVESTMENT_SUMMARY_D3,
} from '@/lib/data/costs';
import { computeModel, PRESETS, D3_CHART_SERIES, ROI_SCENARIOS, BREAK_EVEN, type ModelParams } from '@/lib/data/revenue-model';
import { REVENUE_STREAMS } from '@/lib/data/insights';

const fmt = (n: number) => `${n < 0 ? '(' : ''}${Math.abs(Math.round(n ?? 0)).toLocaleString('en-AU')}${n < 0 ? ')' : ''}`;

export default function InvestmentContent() {
  const [params, setParams] = useState<ModelParams>(PRESETS?.[1]?.params ?? { cac: 8, atv: 65, takeRate: 10, ticketsPerEvent: 400, events: [48, 96, 180] });
  const [presetName, setPresetName] = useState('Base');

  const results = useMemo(() => computeModel(params), [params]);

  const implausible =
    (params?.takeRate ?? 0) >= 14 ||
    ((params?.ticketsPerEvent ?? 0) >= 700 && (params?.atv ?? 0) >= 90) ||
    ((params?.events?.[0] ?? 0) >= 300);

  const set = (key: keyof ModelParams, v: number) => {
    setPresetName('Custom');
    setParams((prev) => ({ ...(prev ?? {}), [key]: v } as ModelParams));
  };
  const setEvents = (i: number, v: number) => {
    setPresetName('Custom');
    setParams((prev) => {
      const e = [...(prev?.events ?? [48, 96, 180])] as [number, number, number];
      e[i] = v;
      return { ...(prev ?? {}), events: e } as ModelParams;
    });
  };

  const tcoChart = ['y0', 'y1', 'y2', 'y3'].map((y, i) => {
    const oneTime = (TCO_BASE?.oneTime ?? []).reduce((a: number, r: any) => a + (r?.[y] ?? 0), 0);
    const recurring = (TCO_BASE?.recurring ?? []).reduce((a: number, r: any) => a + (r?.[y] ?? 0), 0);
    return { year: i === 0 ? 'Year 0' : `Year ${i}`, 'One-time': oneTime, Recurring: recurring };
  });

  const projChart = (D3_CHART_SERIES?.years ?? []).map((y: string, i: number) => ({
    year: y,
    Conservative: D3_CHART_SERIES?.conservative?.[i] ?? 0,
    Base: D3_CHART_SERIES?.base?.[i] ?? 0,
    Optimistic: D3_CHART_SERIES?.optimistic?.[i] ?? 0,
  }));

  const modelChart = (results ?? []).map((r: any) => ({
    year: r?.year ?? '',
    Revenue: Math.round(r?.revenue ?? 0),
    'Operating Result': Math.round(r?.operatingResult ?? 0),
  }));

  return (
    <div>
      <p className="t-eyebrow mb-3">Section 05</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        Investment & <span className="text-primary">Returns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        The full three-year cost of ownership, an interactive revenue model with disciplined guard rails, and the
        volume thresholds the programme must clear. All figures AUD and estimated unless stated.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Base 3-Year TCO" value="AUD 12.62m" sub="Cumulative Years 0–3, base programme [EST]" />
        <StatCard label="Lean Alternative" value="AUD 5.0m" sub="Australia only, contractors, capped platform [EST]" />
        <StatCard label="Year-0 Commitment" value="AUD 1.09m" sub="Verification, foundation and pilot build [EST]" />
        <StatCard label="Break-Even Volume" value="986K tickets/yr" sub="Annual tickets to recover Base TCO over three years [EST]" />
      </div>

      <Section eyebrow="Cost Structure" title="Three-Year Total Cost of Ownership" className="mt-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <p className="t-eyebrow mb-3">Annual Spend — Base Programme (AUD) [EST]</p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tcoChart} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                  <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${((v ?? 0) / 1000000).toFixed(1)}m`} />
                  <Tooltip contentStyle={{ background: '#141414', border: '1px solid #C9A84C55', borderRadius: 8, fontSize: 11 }} formatter={(v: any) => `AUD ${(v ?? 0).toLocaleString('en-AU')}`} />
                  <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="One-time" stackId="a" fill="#C9A84C" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Recurring" stackId="a" fill="#60B5FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="t-eyebrow mb-3">Scenario Envelope</p>
            <div className="space-y-3">
              {(TCO_SCENARIOS ?? []).map((s: any, i: number) => (
                <div key={i} className="rounded-lg bg-secondary/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-marquee text-sm font-bold uppercase tracking-wide text-foreground">{s?.name}</p>
                    <p className="font-marquee text-lg font-black text-primary">AUD {((s?.total ?? 0) / 1000000).toFixed(1)}m</p>
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground">{s?.desc}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/50">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary" style={{ width: `${Math.min(100, ((s?.total ?? 0) / 25000000) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-amber-300/80">
              Reviewer caution: a 5x TCO range is insufficient for capital allocation — narrow to ±30% via workload modelling before committing.
            </p>
          </GlassCard>
        </div>
        <div className="mt-4">
          <DataTable
            headers={['Investment Category', 'Year 1', 'Year 2', 'Year 3']}
            rows={[
              ...(INVESTMENT_SUMMARY_D3?.rows ?? []).map((r: any) => [r?.cat ?? '', fmt(r?.y1 ?? 0), fmt(r?.y2 ?? 0), fmt(r?.y3 ?? 0)]),
              [
                <span key="t" className="font-bold text-primary">Total (cumulative AUD {((INVESTMENT_SUMMARY_D3?.totals?.cumulative ?? 0) / 1000000).toFixed(2)}m)</span>,
                fmt(INVESTMENT_SUMMARY_D3?.totals?.y1 ?? 0),
                fmt(INVESTMENT_SUMMARY_D3?.totals?.y2 ?? 0),
                fmt(INVESTMENT_SUMMARY_D3?.totals?.y3 ?? 0),
              ],
            ]}
          />
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Interactive Model" title="Revenue Projection Sandbox">
        <GlassCard>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            <p className="font-marquee text-xs font-bold uppercase tracking-[0.16em] text-foreground">Scenario Presets</p>
            {(PRESETS ?? []).map((p: any) => (
              <button
                key={p?.name}
                type="button"
                onClick={() => { setParams(p?.params); setPresetName(p?.name ?? ''); }}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  presetName === p?.name ? 'border-primary/60 bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                }`}
                title={p?.note}
              >
                {p?.name}
              </button>
            ))}
            {presetName === 'Custom' ? <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Custom parameters</span> : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              {[
                { label: `Customer Acquisition Cost: AUD ${params?.cac ?? 0}`, min: 5, max: 15, step: 1, value: params?.cac ?? 8, key: 'cac' as const },
                { label: `Average Ticket Value: AUD ${params?.atv ?? 0}`, min: 40, max: 100, step: 5, value: params?.atv ?? 65, key: 'atv' as const },
                { label: `Take Rate: ${params?.takeRate ?? 0}%`, min: 5, max: 15, step: 1, value: params?.takeRate ?? 10, key: 'takeRate' as const },
                { label: `Tickets per Event: ${params?.ticketsPerEvent ?? 0}`, min: 200, max: 800, step: 50, value: params?.ticketsPerEvent ?? 400, key: 'ticketsPerEvent' as const },
              ].map((s) => (
                <div key={s.key}>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <Slider value={[s.value]} min={s.min} max={s.max} step={s.step} onValueChange={(v: number[]) => set(s.key, v?.[0] ?? s.value)} />
                </div>
              ))}
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Events Year {i + 1}: {params?.events?.[i] ?? 0}
                  </p>
                  <Slider value={[params?.events?.[i] ?? 12]} min={12} max={360} step={12} onValueChange={(v: number[]) => setEvents(i, v?.[0] ?? 12)} />
                </div>
              ))}
            </div>

            <div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modelChart} margin={{ top: 10, right: 20, bottom: 10, left: 25 }}>
                    <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${((v ?? 0) / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ background: '#141414', border: '1px solid #C9A84C55', borderRadius: 8, fontSize: 11 }} formatter={(v: any) => `AUD ${(v ?? 0).toLocaleString('en-AU')}`} />
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine y={0} stroke="#666" />
                    <Bar dataKey="Revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Operating Result" fill="#FF6363" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <DataTable
                className="mt-3"
                headers={['', 'Year 1', 'Year 2', 'Year 3']}
                rows={[
                  ['Tickets', ...(results ?? []).map((r: any) => (r?.tickets ?? 0).toLocaleString('en-AU'))],
                  ['GTV', ...(results ?? []).map((r: any) => fmt(r?.gtv ?? 0))],
                  ['Platform revenue', ...(results ?? []).map((r: any) => fmt(r?.revenue ?? 0))],
                  ['Operating result', ...(results ?? []).map((r: any) => (
                    <span key={r?.year} className={(r?.operatingResult ?? 0) >= 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>{fmt(r?.operatingResult ?? 0)}</span>
                  ))],
                ]}
              />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="text-[13px] leading-relaxed text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Data-confidence note:</span> every parameter in this model is an
                assumption from the research package — no take rate, CAC, ATV or repeat-purchase figure has been verified against
                first-party data. New-buyer share is fixed at 35% / 30% / 25% and fixed costs at AUD 500K / 700K / 900K per year.
              </p>
              {implausible ? (
                <p className="mt-2 font-semibold text-amber-400">
                  Guard rail: the current combination sits outside the plausible envelope identified by the adversarial review
                  (e.g. near-maximum take rate, capacity or event counts). Treat this output as illustrative only.
                </p>
              ) : null}
            </div>
          </div>
        </GlassCard>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <p className="t-eyebrow mb-3">D4 Scenario Revenue vs Year-3 Fixed Cost</p>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projChart} margin={{ top: 10, right: 20, bottom: 10, left: 25 }}>
                  <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${((v ?? 0) / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#141414', border: '1px solid #C9A84C55', borderRadius: 8, fontSize: 11 }} formatter={(v: any) => `AUD ${(v ?? 0).toLocaleString('en-AU')}`} />
                  <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={D3_CHART_SERIES?.breakEven ?? 900000} stroke="#DC2626" strokeDasharray="6 4" label={{ value: 'Year-3 fixed cost 900K', fontSize: 10, fill: '#f87171', position: 'insideTopRight' }} />
                  <Line type="monotone" dataKey="Conservative" stroke="#FF9149" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Base" stroke="#C9A84C" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Optimistic" stroke="#80D8C3" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Only the optimistic scenario clears Year-3 fixed cost. [EST]</p>
          </GlassCard>
          <GlassCard>
            <p className="t-eyebrow mb-3">Break-Even Mathematics</p>
            <DataTable
              headers={['Measure', 'Value']}
              rows={[
                ['Contribution per ticket (before acquisition)', `AUD ${BREAK_EVEN?.contributionPerTicket ?? 5.76}`],
                ['Acquisition burden per ticket', `AUD ${BREAK_EVEN?.acquisitionBurden ?? 1.5}`],
                ['Net contribution per ticket', `AUD ${BREAK_EVEN?.netContribution ?? 4.26}`],
                ['Break-even tickets (Year-3 fixed cost)', (BREAK_EVEN?.breakEvenTickets ?? 211268).toLocaleString('en-AU')],
                ['Equivalent events (~500 tickets each)', `~${BREAK_EVEN?.equivalentEvents ?? 423}`],
              ]}
            />
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{BREAK_EVEN?.assessment}</p>
          </GlassCard>
        </div>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Capital Discipline" title="ROI Sensitivity & Volume Thresholds">
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <p className="t-eyebrow mb-3">3-Year ROI by Benefit Level vs TCO Scenario [EST]</p>
            <DataTable
              headers={['3-Year Benefit (AUD)', 'Lean 5.0m', 'Base 12.6m', 'Accelerated 25.0m']}
              rows={(ROI_MATRIX?.rows ?? []).map((r: any) => [
                r?.benefit ?? '',
                <span key="l" className={r?.lean?.startsWith?.('-') ? 'text-red-400' : 'text-emerald-400'}>{r?.lean}</span>,
                <span key="b" className={r?.base?.startsWith?.('-') ? 'text-red-400' : 'text-emerald-400'}>{r?.base}</span>,
                <span key="a" className={r?.accel?.startsWith?.('-') ? 'text-red-400' : 'text-emerald-400'}>{r?.accel}</span>,
              ])}
            />
          </GlassCard>
          <div className="flex flex-col gap-4">
            <GlassCard>
              <p className="t-eyebrow mb-3">Ticket Volume Required to Recover TCO</p>
              <DataTable
                headers={['Target', '3-Year Tickets', 'Annual Tickets']}
                rows={(VOLUME_HURDLES ?? []).map((v: any) => [v?.target ?? '', v?.tickets ?? '', v?.annual ?? ''])}
              />
            </GlassCard>
            <GlassCard>
              <p className="t-eyebrow mb-3">Programme ROI Scenarios (Revenue-Only View)</p>
              <DataTable
                headers={['Scenario', '3-Year TCO', 'Cumulative Revenue', 'Operating Result', 'ROI']}
                rows={(ROI_SCENARIOS ?? []).map((r: any) => [r?.scenario ?? '', r?.tco ?? '', r?.revenue ?? '', r?.result ?? '', r?.roi ?? ''])}
              />
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section eyebrow="Perspective" title="The One-Analyst Benchmark">
        <GlassCard className="border-primary/30">
          <div className="mb-3 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />
            <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">What One Senior Data Analyst Costs — and What It Buys</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary/40 p-3"><p className="t-eyebrow mb-1">Analyst Base Salary</p><p className="text-[13px] text-foreground/85"><EstText text={ANALYST_FRAMING?.analystSalary ?? ''} /></p></div>
            <div className="rounded-lg bg-secondary/40 p-3"><p className="t-eyebrow mb-1">Loaded Cost</p><p className="text-[13px] text-foreground/85"><EstText text={ANALYST_FRAMING?.analystLoaded ?? ''} /></p></div>
            <div className="rounded-lg bg-secondary/40 p-3"><p className="t-eyebrow mb-1">Consulting Rate Basis</p><p className="text-[13px] text-foreground/85"><EstText text={ANALYST_FRAMING?.consultingRate ?? ''} /></p></div>
            <div className="rounded-lg bg-secondary/40 p-3"><p className="t-eyebrow mb-1">Senior Engineer (Loaded)</p><p className="text-[13px] text-foreground/85"><EstText text={ANALYST_FRAMING?.seniorEngineerLoaded ?? ''} /></p></div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><EstText text={ANALYST_FRAMING?.note ?? ''} /></p>
        </GlassCard>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Cost Detail" title="Where the Money Goes">
        <Tabs defaultValue="staffing">
          <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-1 bg-secondary/40">
            <TabsTrigger value="staffing" className="text-xs"><Users className="mr-1.5 h-3.5 w-3.5" />Staffing</TabsTrigger>
            <TabsTrigger value="consulting" className="text-xs"><Scale className="mr-1.5 h-3.5 w-3.5" />Consulting & Legal</TabsTrigger>
            <TabsTrigger value="data" className="text-xs"><Wallet className="mr-1.5 h-3.5 w-3.5" />Data Acquisition</TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs"><Cloud className="mr-1.5 h-3.5 w-3.5" />Cloud</TabsTrigger>
            <TabsTrigger value="ai" className="text-xs"><ReceiptText className="mr-1.5 h-3.5 w-3.5" />AI Cost Ledger</TabsTrigger>
          </TabsList>

          <TabsContent value="staffing">
            <DataTable
              headers={['Role', 'Seniority', 'Engagement', 'Rate (AUD)', 'Duration', 'Year-1 Total (AUD)', 'Source']}
              rows={(STAFFING ?? []).map((s: any) => [s?.role ?? '', s?.seniority ?? '', s?.engagement ?? '', s?.rate ?? '', s?.duration ?? '', s?.total ?? '', s?.source ?? ''])}
            />
            <p className="mt-3 text-sm text-primary font-semibold">Year-1 staffing envelope: AUD {STAFFING_TOTAL} [EST]</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {(STAFFING_PHASES ?? []).map((p: any, i: number) => (
                <GlassCard key={i} className="!p-4">
                  <p className="t-eyebrow mb-1">{p?.stage}</p>
                  <p className="text-[12px] leading-snug text-muted-foreground">{p?.team}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">AUD {p?.cost}</p>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consulting">
            <div className="space-y-6">
              <div>
                <p className="t-eyebrow mb-2">Strategy Consulting</p>
                <DataTable headers={['Service', 'Provider Type', 'Cost (AUD) [EST]', 'Duration']} rows={(CONSULTING?.strategy ?? []).map((c: any) => [c?.service ?? '', c?.provider ?? '', c?.cost ?? '', c?.duration ?? ''])} />
              </div>
              <div>
                <p className="t-eyebrow mb-2">Legal & Regulatory by Market</p>
                <DataTable headers={['Market', 'Scope', 'Cost (AUD) [EST]']} rows={(CONSULTING?.legal ?? []).map((c: any) => [c?.market ?? '', c?.scope ?? '', c?.cost ?? ''])} />
              </div>
              <div>
                <p className="t-eyebrow mb-2">Advisory & Assurance</p>
                <DataTable headers={['Service', 'Provider Type', 'Cost (AUD) [EST]', 'Duration']} rows={(CONSULTING?.advisory ?? []).map((c: any) => [c?.service ?? '', c?.provider ?? '', c?.cost ?? '', c?.duration ?? ''])} />
              </div>
              <p className="text-sm font-semibold text-primary">
                Consulting envelope: low AUD {CONSULTING?.totals?.low} · base AUD {CONSULTING?.totals?.base} · high AUD {CONSULTING?.totals?.high} [EST]
              </p>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="space-y-6">
              <div>
                <p className="t-eyebrow mb-2">One-Time Purchases (Total AUD {DATA_ACQUISITION?.oneTimeTotal})</p>
                <DataTable headers={['Item', 'Category', 'Purpose', 'Cost (AUD) [EST]']} rows={(DATA_ACQUISITION?.oneTime ?? []).map((d: any) => [d?.item ?? '', d?.cat ?? '', d?.purpose ?? '', d?.cost ?? ''])} />
              </div>
              <div>
                <p className="t-eyebrow mb-2">Annual Subscriptions (Total AUD {DATA_ACQUISITION?.annualTotal})</p>
                <DataTable headers={['Item', 'Category', 'Cost (AUD/yr) [EST]', 'Rationale']} rows={(DATA_ACQUISITION?.annual ?? []).map((d: any) => [d?.item ?? '', d?.cat ?? '', d?.cost ?? '', d?.why ?? ''])} />
              </div>
              <div>
                <p className="t-eyebrow mb-2">Usage-Based APIs (Total AUD {DATA_ACQUISITION?.apiTotal})</p>
                <DataTable headers={['API', 'Category', 'Cost (AUD/yr) [EST]', 'Basis']} rows={(DATA_ACQUISITION?.apis ?? []).map((d: any) => [d?.item ?? '', d?.cat ?? '', d?.cost ?? '', d?.basis ?? ''])} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cloud">
            <div className="space-y-6">
              <div>
                <p className="t-eyebrow mb-2">One-Time Setup (Total AUD {CLOUD?.setupTotal})</p>
                <DataTable headers={['Item', 'Cost (AUD) [EST]']} rows={(CLOUD?.setup ?? []).map((c: any) => [c?.item ?? '', c?.cost ?? ''])} />
              </div>
              <div>
                <p className="t-eyebrow mb-2">Monthly Run Cost by Scale (AUD) [EST]</p>
                <DataTable
                  headers={['Component', '10K MAU', '100K MAU', '1M MAU']}
                  rows={[
                    ...(CLOUD?.monthlyTiers ?? []).map((c: any) => [c?.component ?? '', c?.t10k ?? '', c?.t100k ?? '', c?.t1m ?? '']),
                    [<span key="t" className="font-bold text-primary">Monthly total</span>, CLOUD?.monthlyTotals?.t10k ?? '', CLOUD?.monthlyTotals?.t100k ?? '', CLOUD?.monthlyTotals?.t1m ?? ''],
                    [<span key="a" className="font-bold text-primary">Annual total</span>, CLOUD?.annualTotals?.t10k ?? '', CLOUD?.annualTotals?.t100k ?? '', CLOUD?.annualTotals?.t1m ?? ''],
                  ]}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <GlassCard className="border-primary/30">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground">AI Research Cost Ledger</p>
                  <p className="text-xs text-muted-foreground">Invoice {AI_LEDGER?.invoiceNo} · Terms: {AI_LEDGER?.terms}</p>
                </div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Invoice-Ready Format</span>
              </div>
              <DataTable
                headers={['#', 'Description', 'Unit', 'Qty', 'Unit Cost (AUD)', 'Line Total (AUD)']}
                rows={[
                  ...(AI_LEDGER?.lines ?? []).map((l: any) => [String(l?.line ?? ''), l?.desc ?? '', l?.unit ?? '', l?.qty ?? '', l?.unitCost ?? '', l?.total ?? '']),
                  ['', <span key="s" className="font-semibold">Subtotal</span>, '', '', '', AI_LEDGER?.subtotal ?? ''],
                  ['', 'GST (10%)', '', '', '', AI_LEDGER?.gst ?? ''],
                  ['', <span key="t" className="font-bold text-primary">Total (AUD)</span>, '', '', '', <span key="tv" className="font-bold text-primary">{AI_LEDGER?.total ?? ''}</span>],
                ]}
              />
              <p className="mt-3 text-xs italic leading-relaxed text-amber-300/80">{AI_LEDGER?.limitation}</p>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </Section>

      <Section eyebrow="Monetisation" title="Revenue Streams — In Priority Order">
        <DataTable
          headers={['Stream', 'Model', 'Priority']}
          rows={(REVENUE_STREAMS ?? []).map((r: any) => [r?.stream ?? '', r?.model ?? '', r?.priority ?? ''])}
        />
      </Section>
    </div>
  );
}

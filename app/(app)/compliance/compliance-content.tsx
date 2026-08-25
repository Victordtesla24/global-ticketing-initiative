'use client';

/* The consent evidence file: which law reaches a marketing send, which column
 * answers it, and what happens in the five days after someone complains.
 * Audience figures come from the same pipeline as the prototype walkthrough. */

import { useMemo } from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Gavel,
  Timer,
  Share2,
  Database,
  MessageSquareWarning,
  ExternalLink,
  ArrowUpRight,
  CircleAlert,
} from 'lucide-react';
import { Section, OrnamentDivider, DataTable } from '@/components/proposal/section';
import { FoldGroup, FoldPanel } from '@/components/proposal/fold-panel';
import { InfoTip } from '@/components/proposal/info-tip';
import { Legend } from '@/components/proposal/legend';
import { Tag } from '@/components/proposal/tag';
import { Tile } from '@/components/proposal/au-shared';
import { buildCompliance, formatAud, PENALTY_UNIT_AUD } from '@/lib/data/compliance';

/** One swatch per instrument, used by both the chips and the legend below. */
export const INSTRUMENT_STYLE: Record<string, string> = {
  SPAM: 'border-primary/40 bg-primary/10 text-primary',
  APP7: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  DNCR: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  SMSID: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  POLA: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  ACL: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  TERMS: 'border-border/60 bg-secondary/40 text-muted-foreground',
};

function InstrumentChip({ code, className }: { code: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-px font-mono text-[9.5px] font-bold leading-none tracking-wider ${
        INSTRUMENT_STYLE[code] ?? 'border-border/60 text-muted-foreground'
      } ${className ?? ''}`}
    >
      {code}
    </span>
  );
}

function Evidence({ items }: { items: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {items.map((e) => (
        <span
          key={e}
          className="rounded border border-border/50 px-1.5 py-px font-mono text-[9.5px] text-foreground/70"
        >
          {e}
        </span>
      ))}
    </div>
  );
}

function Outbound({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[12px] text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
    </a>
  );
}

/** Link back to the part of the prototype a duty is visible on. */
function SeeOnPrototype({ anchor, children }: { anchor: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/prototype#${anchor}`}
      className="inline-flex items-center gap-1 text-[12px] text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden />
    </Link>
  );
}

const PROTOTYPE_ANCHOR: Record<string, string> = {
  'consent-before-send': 'audience-run',
  'prove-consent': 'audience-run',
  'channel-consent': 'audience-run',
  'sender-identity': 'marketing-materials',
  unsubscribe: 'audience-run',
  'collect-sensitive': 'columns',
  'use-sensitive': 'social-activation',
  'simple-opt-out': 'marketing-materials',
  'collection-notice': 'columns',
  'data-quality': 'audience-run',
  security: 'warehouse',
  'access-correction': 'audience-run',
  'dnc-wash': 'columns',
  'branded-sender': 'marketing-materials',
  'truthful-claims': 'leadership-reports',
  'platform-warranty': 'social-activation',
};

export default function ComplianceContent() {
  const c = useMemo(() => buildCompliance(), []);
  const instrumentById = useMemo(() => new Map(c.instruments.map((i) => [i.id, i])), [c.instruments]);

  return (
    <div>
      <p className="t-eyebrow mb-3">Marketing Compliance</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        The <span className="text-primary">Consent Evidence</span> File
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        If a person complains about a message they received, three questions decide the outcome: was there consent,
        can it be proved, and was the opt-out honoured in time. This page names the law that asks each question and
        the column or table in the{' '}
        <Link href="/prototype" className="text-primary hover:underline">
          Australian audience file
        </Link>{' '}
        that answers it. Audience figures are computed from that same file. All currency figures AUD.
      </p>
      <p className="mt-3 max-w-3xl rounded-lg border border-amber-500/25 bg-amber-500/[0.05] px-3 py-2.5 text-[12.5px] leading-relaxed text-amber-400/90">
        <CircleAlert className="mr-1.5 inline h-3.5 w-3.5 shrink-0 align-[-2px]" aria-hidden />
        Reference material for this proposal, not legal advice. Every instrument below links to the regulator or the
        legislation itself, and the operating platform will need counsel sign-off in each market before it sends.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          value={String(c.totals.instrumentCount)}
          label="Instruments in scope"
          tip="Statutes, registers and contract terms that reach a marketing message sent to an Australian audience."
        />
        <Tile
          value={`${c.totals.dutiesEvidenced} / ${c.totals.dutyCount}`}
          label="Duties with evidence held"
          tip="Duties mapped to a named column, table or template artefact rather than to an intention."
          tone="emerald"
        />
        <Tile
          value={`${c.totals.consentRate}%`}
          label="Consent rate on the file"
          sub={`${c.totals.marketable} of ${c.totals.resolvedPeople} resolved people`}
          tip="Marketable people divided by resolved people. The rest are suppressed by their own consent state."
        />
        <Tile
          value={String(c.totals.suppressed)}
          label="Suppressed, not sent to"
          sub={`${c.totals.consentSources} consent sources`}
          tip="People whose latest consent event withdraws permission. The serving view excludes them by test, not by habit."
          tone="amber"
        />
      </div>
      <p className="mt-2 text-[11.5px] text-muted-foreground">
        Audience figures computed from the sample file <Tag tag="ILLUSTRATIVE" />
      </p>

      <OrnamentDivider />

      {/* ------------------------------------------------------ instruments */}
      <Section
        id="instruments"
        eyebrow="What Reaches Us"
        title="The Instruments That Reach a Marketing Send"
      >
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Two statutes do most of the work and they do not overlap: the Spam Act governs the message, the Privacy Act
          governs the data behind it. The rest bind narrower surfaces — the phone, the sender ID, the claim in the
          creative, and the contract with each ad platform.
        </p>
        <Legend
          title="Instrument"
          items={c.instruments.map((i) => ({
            term: i.code,
            meaning: i.name,
            swatch: INSTRUMENT_STYLE[i.code] ?? 'border-border/60 text-muted-foreground',
          }))}
          className="mb-3"
        />
        <FoldGroup>
          {c.instruments.map((i) => (
            <FoldPanel
              key={i.id}
              title={i.name}
              subtitle={i.reaches}
              badge={<InstrumentChip code={i.code} />}
              count={i.duties.length}
              defaultOpen={false}
            >
              <p className="text-[12px] text-muted-foreground">
                <span className="font-semibold text-foreground/80">Regulator: </span>
                {i.regulator}
              </p>
              <p className="t-eyebrow mb-1.5 mt-3 text-[10px]">Core duties</p>
              <ul className="space-y-1">
                {i.duties.map((d) => (
                  <li key={d} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-foreground/85">
                    <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-primary" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] leading-snug text-amber-400/90">{i.note}</p>
              <p className="mt-3">
                <Outbound href={i.href}>Regulator guidance and the text of the law</Outbound>
              </p>
            </FoldPanel>
          ))}
        </FoldGroup>
      </Section>

      {/* --------------------------------------------------------- duty map */}
      <Section
        id="duty-map"
        eyebrow="Duty To Evidence"
        title="Every Duty, and the Column That Answers It"
      >
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          A duty with no evidence behind it is a hope. Each row below names the clause, what it requires, and the
          column, table or template artefact that would be produced if a regulator asked. Where a warehouse test
          holds the duty in place, the test is named too — {c.consentTests.length} of them touch consent directly.
        </p>
        <Legend
          title="Instrument"
          items={c.instruments.map((i) => ({
            term: i.code,
            meaning: i.regulator,
            swatch: INSTRUMENT_STYLE[i.code] ?? 'border-border/60 text-muted-foreground',
          }))}
          className="mb-3"
        />
        <FoldGroup>
          {c.duties.map((d) => {
            const inst = instrumentById.get(d.instrumentId);
            return (
              <FoldPanel
                key={d.id}
                title={d.duty}
                subtitle={`${inst?.name.split(' — ')[0] ?? ''} · ${d.clause}`}
                badge={
                  <span className="inline-flex items-center gap-1">
                    <InstrumentChip code={inst?.code ?? '—'} />
                    <InfoTip content={`${inst?.name} · ${d.clause}`} />
                  </span>
                }
                count={d.evidence.length}
                defaultOpen={false}
              >
                <p className="text-[12.5px] leading-relaxed text-foreground/85">{d.how}</p>
                <p className="t-eyebrow mb-0 mt-3 text-[10px]">
                  Evidence held
                  <InfoTip
                    content="Columns and tables from the audience file and the warehouse, plus template artefacts where the duty lives in the creative."
                    className="ml-1"
                  />
                </p>
                <Evidence items={d.evidence} />
                {d.test ? (
                  <p className="mt-3 text-[12px] leading-snug text-emerald-400/90">
                    <span className="font-semibold">Test that holds it: </span>
                    <code className="font-mono text-[11px]">{d.test}</code>
                  </p>
                ) : null}
                {d.seeOn ? (
                  <p className="mt-3 text-[12px] text-muted-foreground">
                    <span className="font-semibold text-foreground/80">Visible on the prototype: </span>
                    <SeeOnPrototype anchor={PROTOTYPE_ANCHOR[d.id] ?? 'audience-run'}>{d.seeOn}</SeeOnPrototype>
                  </p>
                ) : null}
              </FoldPanel>
            );
          })}
        </FoldGroup>
      </Section>

      {/* -------------------------------------------------------- sensitive */}
      <Section
        id="sensitive"
        eyebrow="Sensitive Information"
        title="Why Ancestry and Language Sit Under a Stricter Rule"
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Tile
            value={String(c.totals.legalColumnCount)}
            label="Columns carrying a legal duty"
            tip="Columns on the audience file whose use is constrained by a named instrument."
          />
          <Tile
            value={String(c.sensitiveColumns.length)}
            label="Warehouse columns flagged sensitive"
            tip="Columns marked sensitive where they sit in the warehouse, so the flag travels with the data."
            tone="amber"
          />
          <Tile
            value={String(c.pipeline.marathiSpeakers)}
            label="Marathi at home, consented"
            sub="A language-led send needs consent for the language flag itself"
            tip="Marketable people whose language flag is set. The flag travels under the same consent as the ancestry column."
          />
        </div>
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Racial or ethnic origin is sensitive information under s 6 of the Privacy Act, which changes the test twice
          over. APP 3.3 requires consent before it is collected at all. APP 7.4 then requires consent before it is
          used for direct marketing — and unlike the rules for ordinary personal information, there is no
          impracticability escape and no allowance for an existing customer relationship. An ancestry-led campaign
          therefore stands or falls on consent alone.
        </p>
        <div className="space-y-2">
          {c.legalColumns.map((col) => (
            <div key={col.column} className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] px-3.5 py-3">
              <p className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-[12px] font-bold text-amber-400">{col.column}</code>
                <span className="text-[12px] text-muted-foreground">{col.meaning}</span>
              </p>
              <p className="mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-snug text-foreground/85">
                <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden />
                {col.legal}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
          The practical consequence is a collection rule: ancestry and language are self-declared by the person at
          opt-in, on ABS Census categories. A bought-in ancestry append cannot be used for marketing however it was
          collected, which is why the file has no route for one.{' '}
          <SeeOnPrototype anchor="columns">See these columns on the prototype</SeeOnPrototype>
        </p>
      </Section>

      {/* ----------------------------------------------------- sender/optout */}
      <Section
        id="sender-optout"
        eyebrow="In the Creative"
        title="Sender Identity, the Unsubscribe and the Sender ID"
      >
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Three duties cannot be satisfied by data at all — they live in the template. They are also the three that
          ACMA can establish without any argument about consent, because a message either carries them or it does
          not.
        </p>
        <div className="space-y-2">
          {c.duties
            .filter((d) => ['sender-identity', 'unsubscribe', 'simple-opt-out', 'branded-sender'].includes(d.id))
            .map((d) => {
              const inst = instrumentById.get(d.instrumentId);
              return (
                <div key={d.id} className="rounded-xl border border-border/60 bg-secondary/15 px-3.5 py-3">
                  <p className="flex flex-wrap items-center gap-2">
                    <InstrumentChip code={inst?.code ?? '—'} />
                    <span className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">
                      {d.duty}
                    </span>
                    <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">{d.clause}</span>
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-foreground/85">{d.how}</p>
                </div>
              );
            })}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
          <MessageSquareWarning className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-amber-400" aria-hidden />
          One opt-out path serves both regimes: the link that satisfies the Spam Act unsubscribe writes the
          withdrawal event that satisfies APP 7. Two mechanisms would mean two chances to drift apart.{' '}
          <SeeOnPrototype anchor="marketing-materials">See the material kit on the prototype</SeeOnPrototype>
        </p>
      </Section>

      {/* -------------------------------------------------------- platforms */}
      <Section id="platforms" eyebrow="Ad Platforms" title="What Goes Up, and What Stays Behind">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Tile
            value={String(c.pipeline.reachableEmail + c.pipeline.reachableMobile)}
            label="Uploadable contact points"
            sub={`Email ${c.pipeline.reachableEmail} · mobile ${c.pipeline.reachableMobile}`}
            tip="Hashed contact points from the serving view, respecting each person's channel preference."
          />
          <Tile
            value={String(c.sensitiveColumns.length)}
            label="Columns withheld from the upload"
            sub="Ancestry and language segment owned sends only"
            tip="Sensitive columns stay in the warehouse. Consent for an ad-platform use cannot be evidenced downstream."
            tone="amber"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] px-3.5 py-3">
            <p className="t-eyebrow mb-2 text-[10px] text-emerald-400">Goes up</p>
            <ul className="space-y-1.5 text-[12.5px] leading-snug text-foreground/85">
              <li>Hashed email and hashed mobile, drawn from the serving view</li>
              <li>Only records whose latest consent event grants permission</li>
              <li>A fresh upload per campaign, so a withdrawal drops out of the next one</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] px-3.5 py-3">
            <p className="t-eyebrow mb-2 text-[10px] text-amber-400">Stays behind</p>
            <ul className="space-y-1.5 text-[12.5px] leading-snug text-foreground/85">
              <li>Ancestry and the language flag — sensitive information under s 6</li>
              <li>Any lookalike or expansion built on a sensitive attribute</li>
              <li>Suppressed people, in every upload and every segment</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[12.5px] leading-relaxed text-muted-foreground">
          <Share2 className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-primary" aria-hidden />
          The custom-audience terms at Meta, Google and TikTok each require the uploader to warrant that it holds the
          rights and consents to share every contact point, and each restricts sensitive-category targeting on its
          own account. Those terms sit on top of the statutes rather than instead of them, so a breach is a contract
          claim and an account risk as well as a privacy question.{' '}
          <SeeOnPrototype anchor="social-activation">See the platform uploads on the prototype</SeeOnPrototype>
        </p>
      </Section>

      {/* ---------------------------------------------------- evidence store */}
      <Section id="evidence-store" eyebrow="Where It Lives" title="The Record a Regulator Would Ask For">
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Consent is stored as an event, not as a tick. The flag on the file is the current position of that history,
          which is what lets a single person be traced back to the moment and the form they opted in through — and
          what makes a withdrawal a fact in the record rather than a manual deletion someone has to remember.
        </p>
        {c.consentTable ? (
          <div className="mb-3 rounded-xl border border-primary/25 bg-primary/[0.04] px-3.5 py-3">
            <p className="flex flex-wrap items-center gap-2">
              <Database className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              <code className="font-mono text-[12.5px] font-bold text-primary">{c.consentTable.name}</code>
              <InfoTip content={c.consentTable.grain} />
            </p>
            <p className="mt-1.5 text-[12px] text-muted-foreground">{c.consentTable.grain}</p>
            <Evidence items={c.consentTable.columns.map((col) => col.name)} />
          </div>
        ) : null}
        {c.servingView ? (
          <div className="mb-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] px-3.5 py-3">
            <p className="flex flex-wrap items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
              <code className="font-mono text-[12.5px] font-bold text-emerald-400">{c.servingView.name}</code>
              <InfoTip content="The only object a campaign may send from. Every segment is a filter over this view." />
            </p>
            <p className="mt-1.5 text-[12px] text-muted-foreground">{c.servingView.grain}</p>
          </div>
        ) : null}
        <p className="t-eyebrow mb-2 mt-4 text-[10px]">
          Tests that hold consent in place
          <InfoTip
            content="Warehouse tests run on every build. A failing test stops the send rather than reporting on it afterwards."
            className="ml-1"
          />
        </p>
        <ul className="space-y-1.5">
          {c.consentTests.map((t) => (
            <li key={`${t.test}-${t.on}`} className="rounded-lg border border-border/50 bg-secondary/15 px-3 py-2">
              <p className="flex flex-wrap items-baseline gap-2">
                <code className="font-mono text-[11px] font-bold text-primary">{t.test}</code>
                <span className="text-[12px] text-foreground/85">{t.on}</span>
              </p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{t.why}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Records that fail one of the {c.validationRuleCount} validation rules are quarantined rather than mailed —
          {' '}{c.totals.quarantined} of them on the sample file. <Tag tag="ILLUSTRATIVE" />{' '}
          <SeeOnPrototype anchor="warehouse">See the warehouse tables on the prototype</SeeOnPrototype>
        </p>
      </Section>

      <OrnamentDivider />

      {/* ------------------------------------------------- complaint response */}
      <Section
        id="complaint-response"
        eyebrow="If Someone Complains"
        title="The Seven Steps, and the Clock on Each"
      >
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          A complaint is not the problem; a slow or undocumented response is. The Spam Act unsubscribe duty is strict
          — the clock starts when the request arrives, and intent is not a defence — while the OAIC expects a person
          to raise a privacy complaint with the business first and gives it 30 days to answer. Both clocks run from
          the same moment.
        </p>
        <Legend
          title="Clock"
          items={[
            { term: 'Same day', meaning: 'Logged and suppressed before anything else', swatch: 'border-red-500/40 bg-red-500/10 text-red-400' },
            { term: '5 days', meaning: 'Business days, under the Spam Act', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
            { term: '30 days', meaning: 'Written answer, per OAIC guidance', swatch: 'border-primary/40 bg-primary/10 text-primary' },
            { term: 'Later', meaning: 'Escalation and retention', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
          ]}
          className="mb-3"
        />
        <FoldGroup>
          {c.steps.map((s) => (
            <FoldPanel
              key={s.id}
              title={`${s.order}. ${s.step}`}
              subtitle={s.record}
              badge={
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-3 w-3 shrink-0 text-primary" aria-hidden />
                  <span className="font-mono text-[10px] font-bold text-primary">{s.clock}</span>
                </span>
              }
              defaultOpen={false}
            >
              <p className="text-[12.5px] leading-relaxed text-foreground/85">{s.what}</p>
              <p className="mt-2 text-[12px] text-muted-foreground">
                <span className="font-semibold text-foreground/80">What it puts on the file: </span>
                {s.record}
              </p>
            </FoldPanel>
          ))}
        </FoldGroup>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
          <Outbound href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/more-guidance/handling-privacy-complaints">
            OAIC — handling privacy complaints
          </Outbound>
          <Outbound href="https://www.oaic.gov.au/privacy/privacy-complaints/complain-to-an-organisation-or-agency">
            OAIC — what a complainant is told to do first
          </Outbound>
          <Outbound href="https://www.acma.gov.au/avoid-sending-spam">ACMA — avoid sending spam</Outbound>
        </p>
      </Section>

      {/* ------------------------------------------------------------ clocks */}
      <Section id="clocks" eyebrow="The Timers" title="Every Clock in One Place">
        <DataTable
          headers={['Duration', 'What it governs', 'Where it comes from']}
          rows={c.clocks.map((k) => [
            <span key={k.id} className="font-marquee text-[13px] font-bold text-primary">
              {k.duration}
            </span>,
            k.what,
            <span key={`${k.id}-src`} className="text-[12px] text-muted-foreground">
              {k.source}
            </span>,
          ])}
        />
        <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
          Two of these are easy to miss. A withdrawal of consent takes effect at the end of five business days, so a
          send queued on day four is still a send to a person who has withdrawn. And the retention window is set by
          the limitation periods, not by the marketing calendar: the statutory tort runs one year from the day the
          person became aware or three years from the invasion, whichever comes first.
        </p>
      </Section>

      {/* ---------------------------------------------------------- exposure */}
      <Section id="exposure" eyebrow="The Downside" title="What It Costs to Get This Wrong">
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Spam Act maximums scale on three things: whether there is a prior record for that provision, whether the
          sender is a body corporate, and whether the higher-tier consent rule or a lower-tier rule was broken. The
          figures below are section 25 penalty units multiplied by the Commonwealth penalty unit of{' '}
          {formatAud(PENALTY_UNIT_AUD)}, which has applied since 1 July 2026.
        </p>
        <DataTable
          headers={['Sender', 'Prior record', 'Rule broken', 'Per contravention', 'Same-day maximum']}
          rows={c.penalties.map((b) => [
            b.party,
            b.priorRecord ? 'Yes' : 'No',
            b.rule,
            <span key={`${b.id}-per`} className="font-marquee font-bold text-foreground">
              {formatAud(b.perContraventionAud)}
            </span>,
            <span key={`${b.id}-cap`} className="font-marquee font-bold text-primary">
              {formatAud(b.sameDayAud)}
            </span>,
          ])}
        />
        <p className="mt-2 text-[11.5px] text-muted-foreground">
          Derived from Spam Act s 25 penalty units <Tag tag="DERIVED" />
        </p>
        <FoldGroup className="mt-4">
          {c.exposureNotes.map((n) => (
            <FoldPanel
              key={n.id}
              title={n.heading}
              badge={<Gavel className="h-3.5 w-3.5 text-amber-400" aria-hidden />}
              defaultOpen={false}
            >
              <p className="text-[12.5px] leading-relaxed text-foreground/85">{n.detail}</p>
            </FoldPanel>
          ))}
        </FoldGroup>
        <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
          This is why consent health is a standing Leadership Team report rather than an operational detail: the
          downside is measured in penalty units and the evidence is a query.{' '}
          <SeeOnPrototype anchor="leadership-reports">See the report specs on the prototype</SeeOnPrototype>
        </p>
      </Section>

      {/* -------------------------------------------------------- before send */}
      <Section id="before-send" eyebrow="Before Going Live" title="What the Pilot Needs Before Its First Send">
        <p className="mb-4 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          The data side of this is built. What remains is the operating side — the entity details in the footer, the
          sender ID registration, and the opt-in wording that has to carry consent for two sensitive fields.
        </p>
        <ol className="space-y-2">
          {c.beforeFirstSend.map((b, idx) => (
            <li key={b.id} className="rounded-xl border border-border/60 bg-secondary/15 px-3.5 py-3">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-marquee text-[13px] font-bold text-primary">{idx + 1}</span>
                <span className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">
                  {b.item}
                </span>
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{b.why}</p>
            </li>
          ))}
        </ol>
      </Section>

      <OrnamentDivider />

      <Section eyebrow="Sources" title="Where Each Statement Comes From">
        <ul className="grid gap-2 sm:grid-cols-2">
          {c.instruments.map((i) => (
            <li key={i.id} className="rounded-lg border border-border/50 bg-secondary/15 px-3 py-2">
              <p className="flex items-center gap-2">
                <InstrumentChip code={i.code} />
                <span className="text-[12px] font-semibold text-foreground/85">{i.regulator}</span>
              </p>
              <p className="mt-1">
                <Outbound href={i.href}>{i.name}</Outbound>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-muted-foreground">
          Statutory text is linked to the regulator that enforces it or to the consolidated legislation. Figures
          drawn from the audience file carry the sample-data label, and figures worked out from penalty units carry
          the calculated label, so a reader can tell at a glance which numbers move when the file changes and which
          move when the law does.
        </p>
      </Section>
    </div>
  );
}

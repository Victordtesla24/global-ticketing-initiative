'use client';

/* Campaigns, materials, social destinations and Leadership Team reports —
 * every count computed from the Australian audience file. */

import { useMemo } from 'react';
import Link from 'next/link';
import { Megaphone, Palette, Share2, ClipboardList, ArrowUpRight } from 'lucide-react';
import { Tag } from '@/components/proposal/tag';
import { InfoTip } from '@/components/proposal/info-tip';
import { Legend } from '@/components/proposal/legend';
import { FoldGroup, FoldPanel } from '@/components/proposal/fold-panel';
import { ComplianceLink } from '@/components/proposal/compliance-link';
import { Tile, Bars, SourceCode } from '@/components/proposal/au-shared';
import { buildActivation } from '@/lib/data/audience-activation';
import { OrnamentDivider, Section } from '@/components/proposal/section';

export function AuActivation() {
  const a = useMemo(() => buildActivation(), []);

  return (
    <div>
      <OrnamentDivider />

      <Section
        eyebrow="Commercial Activation"
        title="Campaigns, Materials, Social and Leadership Reports"
        id="activation"
      >
        <p className="mb-5 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Named segments, asset kits, ad-platform uploads and Leadership Team report specs — each figure below is
          computed from the same consented file as the walkthrough above. Revenue and engagement figures resolve once
          the pilot transacts; audience size and reach resolve today. See also the{' '}
          <Link href="/data-ecosystem" className="text-primary hover:underline">
            data ecosystem
          </Link>{' '}
          and{' '}
          <Link href="/investment" className="text-primary hover:underline">
            investment
          </Link>{' '}
          pages for the wider monetisation sequence.
        </p>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Tile
            value={String(a.totals.segmentCount)}
            label="Named segments"
            tip="Filters over the marketable audience, each with a live count from the file."
          />
          <Tile
            value={String(a.totals.materialCount)}
            label="Material kits"
            tip="Channel assets tied to the columns and segments they consume."
          />
          <Tile
            value={String(a.totals.socialCount)}
            label="Social destinations"
            tip="Ad platforms that accept hashed email and mobile from this file."
          />
          <Tile
            value={String(a.totals.reportCount)}
            label="Leadership reports"
            tip="Report specifications for the Leadership Team — questions, tables, cadence and decisions."
          />
        </div>

        {/* Campaign segments */}
        <div className="mb-10" id="campaign-segments">
          <p className="t-eyebrow mb-2 inline-flex items-center gap-1.5">
            <Megaphone className="h-3.5 w-3.5 text-primary" />
            Campaign segments
            <InfoTip content="Each segment is a filter over marketable people. The count is live from the sample file." />
          </p>
          <h3 className="mb-3 font-marquee text-xl font-bold uppercase tracking-wide text-foreground">
            Named Audiences Ready to Send
          </h3>
          <Legend
            title="Channel"
            items={[
              { term: 'E', meaning: 'Email preferred', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
              { term: 'M', meaning: 'Mobile preferred', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
              { term: 'Both', meaning: 'Either channel, respecting preference at send', swatch: 'border-primary/40 bg-primary/10 text-primary' },
            ]}
            className="mb-3"
          />
          <FoldGroup>
            {a.segments.map((s) => (
              <FoldPanel
                key={s.id}
                title={s.name}
                subtitle={s.purpose}
                count={s.count}
                badge={
                  <span className="inline-flex items-center gap-1">
                    <span className="rounded border border-border/60 px-1.5 py-px font-mono text-[10px] font-bold text-muted-foreground">
                      {s.channel}
                    </span>
                    <Tag tag="ILLUSTRATIVE" />
                  </span>
                }
                defaultOpen={false}
              >
                <p className="mb-2 text-[12px] leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Filter: </span>
                  <code className="font-mono text-[11px] text-primary/90">{s.filter}</code>
                  <InfoTip content={s.filter} className="ml-1" />
                </p>
                <div className="mb-3 flex flex-wrap gap-1">
                  {s.columns.map((c) => (
                    <span key={c} className="rounded border border-border/50 px-1.5 py-px font-mono text-[9.5px] text-foreground/70">
                      {c}
                    </span>
                  ))}
                </div>
                {s.byState && s.byState.length > 0 ? (
                  <Bars title="Breakdown" data={s.byState} tip="Counts inside this segment, from the same file." />
                ) : null}
              </FoldPanel>
            ))}
          </FoldGroup>
          <ComplianceLink section="segments" />
        </div>

        {/* Marketing materials */}
        <div className="mb-10" id="marketing-materials">
          <p className="t-eyebrow mb-2 inline-flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-primary" />
            Marketing materials
          </p>
          <h3 className="mb-3 font-marquee text-xl font-bold uppercase tracking-wide text-foreground">
            Asset Kit Per Channel
          </h3>
          <Legend
            title="Channel kit"
            items={[
              { term: 'Email', meaning: 'Nurture and on-sale templates', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
              { term: 'SMS', meaning: 'Short-window mobile creative', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
              { term: 'Out-of-home', meaning: 'Suburb-keyed poster and transit', swatch: 'border-violet-500/40 bg-violet-500/10 text-violet-300' },
              { term: 'Partner', meaning: 'Co-brand with venues and promoters', swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
              { term: 'Web', meaning: 'Event landing variants', swatch: 'border-primary/40 bg-primary/10 text-primary' },
            ]}
            className="mb-3"
          />
          <FoldGroup>
            {a.materials.map((m) => {
              const seg = a.segments.find((s) => s.id === m.segmentId);
              return (
                <FoldPanel
                  key={m.id}
                  title={m.name}
                  subtitle={m.channel}
                  count={seg ? seg.count : undefined}
                  badge={<Tag tag="ILLUSTRATIVE" />}
                  defaultOpen={false}
                >
                  <p className="text-[12.5px] leading-snug text-foreground/85">{m.uses}</p>
                  <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
                    <span className="font-semibold text-foreground/80">Outcome: </span>
                    {m.outcome}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
                    <span className="font-semibold text-foreground/80">Segment: </span>
                    {seg?.name ?? m.segmentId}
                    {seg ? ` · ${seg.count} people` : null}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.columns.map((c) => (
                      <span key={c} className="rounded border border-border/50 px-1.5 py-px font-mono text-[9.5px] text-foreground/70">
                        {c}
                      </span>
                    ))}
                  </div>
                </FoldPanel>
              );
            })}
          </FoldGroup>
          <ComplianceLink section="materials" />
        </div>

        {/* Social */}
        <div className="mb-10" id="social-activation">
          <p className="t-eyebrow mb-2 inline-flex items-center gap-1.5">
            <Share2 className="h-3.5 w-3.5 text-primary" />
            Social and platform activation
          </p>
          <h3 className="mb-3 font-marquee text-xl font-bold uppercase tracking-wide text-foreground">
            Hashed Uploads to Ad Platforms
          </h3>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <Tile
              value={String(a.totals.email)}
              label="Email matchable"
              tip="Marketable people with preference E — the email side of a Customer Match / Custom Audience file."
            />
            <Tile
              value={String(a.totals.mobile)}
              label="Mobile matchable"
              tip="Marketable people with preference M — the mobile side of the same upload."
              tone="amber"
            />
          </div>
          <Legend
            title="Match keys"
            items={[
              { term: 'Email', meaning: 'Hashed email from the preferred channel', swatch: 'border-sky-500/40 bg-sky-500/10 text-sky-300' },
              { term: 'Mobile', meaning: 'Hashed mobile from the preferred channel', swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
            ]}
            className="mb-3"
          />
          <FoldGroup>
            {a.social.map((s) => (
              <FoldPanel
                key={s.id}
                title={`${s.platform} — ${s.product}`}
                subtitle={s.matchOn}
                count={s.uploadable}
                badge={<Tag tag="ILLUSTRATIVE" />}
                defaultOpen={false}
              >
                <p className="text-[12.5px] leading-snug text-foreground/85">
                  Uploadable records from this file: <span className="font-marquee font-bold text-primary">{s.uploadable}</span>
                  {' '}(email {a.totals.email} + mobile {a.totals.mobile}, respecting preference).
                </p>
                <p className="mt-2 text-[12px] leading-snug text-amber-400/90">{s.constraint}</p>
                <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">
                  Ancestry and language stay on owned sends. The match file carries only hashed contact points with
                  current marketing consent.
                </p>
              </FoldPanel>
            ))}
          </FoldGroup>
          <ComplianceLink section="social" />
        </div>

        {/* Leadership Team reports */}
        <div className="mb-4" id="leadership-reports">
          <p className="t-eyebrow mb-2 inline-flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5 text-primary" />
            Leadership Team reports
          </p>
          <h3 className="mb-3 font-marquee text-xl font-bold uppercase tracking-wide text-foreground">
            Report Specs the Warehouse Already Supports
          </h3>
          <Legend
            title="Figure status"
            items={[
              {
                term: 'Available now',
                meaning: 'Computed from today’s consented file',
                swatch: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
              },
              {
                term: 'Resolves later',
                meaning: 'Needs campaign send and ticket sale facts from the pilot',
                swatch: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
              },
            ]}
            className="mb-3"
          />
          <FoldGroup>
            {a.reports.map((r) => (
              <FoldPanel
                key={r.id}
                title={r.title}
                subtitle={r.question}
                badge={<Tag tag="ILLUSTRATIVE" />}
                defaultOpen={false}
              >
                <dl className="space-y-2 text-[12.5px]">
                  <div>
                    <dt className="t-eyebrow text-[10px]">Grain</dt>
                    <dd className="text-foreground/85">{r.grain}</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow text-[10px]">Cadence</dt>
                    <dd className="text-foreground/85">{r.cadence}</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow text-[10px]">Decision it drives</dt>
                    <dd className="text-foreground/85">{r.decision}</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow text-[10px]">Tables</dt>
                    <dd className="mt-1 flex flex-wrap gap-1">
                      {r.tables.map((t) => (
                        <span key={t} className="rounded border border-border/50 px-1.5 py-px font-mono text-[10px] text-primary/90">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow text-[10px]">Columns</dt>
                    <dd className="mt-1 flex flex-wrap gap-1">
                      {r.columns.map((c) => (
                        <span key={c} className="rounded border border-border/50 px-1.5 py-px font-mono text-[9.5px] text-foreground/70">
                          {c}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <p className="t-eyebrow mb-2 mt-4 text-[10px]">Available now</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {r.availableNow.map((f) => (
                    <div key={f.label} className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] p-2.5">
                      <p className="t-eyebrow text-[10px]">{f.label}</p>
                      <p className="font-marquee text-[16px] font-bold text-emerald-400">{f.value}</p>
                    </div>
                  ))}
                </div>

                <p className="t-eyebrow mb-2 mt-4 text-[10px]">Resolves once the pilot transacts</p>
                <ul className="space-y-1">
                  {r.resolvesLater.map((line) => (
                    <li key={line} className="flex items-start gap-1.5 text-[12px] text-amber-400/90">
                      <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </FoldPanel>
            ))}
          </FoldGroup>
          <ComplianceLink section="reports" />
        </div>
      </Section>
    </div>
  );
}

/** Re-export for callers that only need SourceCode from this module path. */
export { SourceCode };

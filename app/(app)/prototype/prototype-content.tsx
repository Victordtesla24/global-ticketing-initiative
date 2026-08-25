'use client';

import Link from 'next/link';
import { Section, OrnamentDivider } from '@/components/proposal/section';
import { ComplianceLink } from '@/components/proposal/compliance-link';
import {
  AuAudienceDemo,
  AuColumnSpec,
  AuDataMart,
  AuGeographyStrip,
  AuMapNote,
  AuActivation,
} from '@/components/proposal/au-audience-demo';

export default function PrototypeContent() {
  return (
    <div>
      <p className="t-eyebrow mb-3">Working Prototype</p>
      <h1 className="font-marquee text-3xl font-black uppercase tracking-wide text-foreground md:text-5xl">
        The <span className="text-primary">Prototype</span>
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        One Australian audience file, named at source and run end to end. Every figure is computed from the file, and
        every source opens to the page that proves it. Campaign segments, marketing materials, social uploads and
        Leadership Team reports are built from the same file. All currency figures AUD.
      </p>
      <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Each section below links to the duty it has to satisfy on the{' '}
        <Link href="/compliance" className="text-primary hover:underline">
          marketing compliance page
        </Link>
        , where the Spam Act, the Privacy Principles and the complaint response steps are set against the columns that
        evidence them.
      </p>

      <Section
        id="audience-run"
        eyebrow="End to End, In Motion"
        title="An Australian Consented Audience, Run End to End"
        className="mt-10 mb-12"
      >
        <AuAudienceDemo />
        <ComplianceLink section="audienceRun" />
      </Section>

      <OrnamentDivider />

      <Section id="geography" eyebrow="Reference Geography" title="Where These People Sit">
        <AuGeographyStrip />
        <div className="mt-3">
          <AuMapNote />
        </div>
        <ComplianceLink section="geography" />
      </Section>

      <Section id="columns" eyebrow="The Columns" title="Every Field, and What Stands Behind It">
        <AuColumnSpec />
        <ComplianceLink section="columns" />
      </Section>

      <Section id="warehouse" eyebrow="Warehouse" title="Data Mart Tables and Their Joins">
        <AuDataMart />
        <ComplianceLink section="warehouse" />
      </Section>

      <AuActivation />
    </div>
  );
}

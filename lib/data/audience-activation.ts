// Commercial activation layer over the Australian consented audience file.
// Every count is derived from runAuPipeline() — nothing here is typed by hand.

import { runAuPipeline, type GoldenRow } from './audience-au';

export interface CampaignSegment {
  id: string;
  name: string;
  purpose: string;
  /** Exact filter described for the tooltip. */
  filter: string;
  columns: string[];
  channel: 'E' | 'M' | 'Both';
  count: number;
  /** Optional breakdown for the fold body. */
  byState?: { label: string; count: number }[];
}

export interface MarketingMaterial {
  id: string;
  name: string;
  channel: string;
  uses: string;
  columns: string[];
  segmentId: string;
  outcome: string;
}

export interface SocialDestination {
  id: string;
  platform: string;
  product: string;
  matchOn: string;
  uploadable: number;
  constraint: string;
}

export interface LeadershipReport {
  id: string;
  title: string;
  question: string;
  tables: string[];
  columns: string[];
  grain: string;
  cadence: string;
  decision: string;
  /** Figures that resolve from today's file. */
  availableNow: { label: string; value: string }[];
  /** Figures that resolve once the pilot transacts. */
  resolvesLater: string[];
}

function tally(rows: GoldenRow[], key: (r: GoldenRow) => string): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return Array.from(m.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function buildActivation() {
  const p = runAuPipeline();
  const m = p.marketable;

  const marathiEmail = m.filter((r) => r.marathi_speaking === 'Y' && r.contact_preference === 'E');
  const youngMetro = m.filter((r) => r.age >= 25 && r.age <= 44 && (r.state === 'VIC' || r.state === 'NSW'));
  const smsOnSale = m.filter((r) => r.contact_preference === 'M');
  const boxOffice = m.filter((r) => r.consent_source.includes('box office'));
  const ballot = m.filter((r) => r.consent_source.toLowerCase().includes('ballot'));
  const waitlist = m.filter((r) => r.consent_source.toLowerCase().includes('waitlist'));

  const segments: CampaignSegment[] = [
    {
      id: 'marathi-email-by-state',
      name: 'Marathi at home — email preferred',
      purpose: 'Language-led email nurture for Marathi-language live events',
      filter: "marketable AND marathi_speaking = 'Y' AND contact_preference = 'E'",
      columns: ['marathi_speaking', 'contact_preference', 'email', 'state', 'consented_for_marketing'],
      channel: 'E',
      count: marathiEmail.length,
      byState: tally(marathiEmail, (r) => r.state),
    },
    {
      id: 'young-metro-vic-nsw',
      name: '25–44 metro Victoria and New South Wales',
      purpose: 'Suburb-targeted on-sale for Melbourne and Sydney venues',
      filter: 'marketable AND age between 25 and 44 AND state in (VIC, NSW)',
      columns: ['age', 'state', 'suburb', 'postcode', 'email', 'mobile'],
      channel: 'Both',
      count: youngMetro.length,
      byState: tally(youngMetro, (r) => `${r.suburb} ${r.postcode}`).slice(0, 8),
    },
    {
      id: 'sms-onsale',
      name: 'SMS — on-sale day',
      purpose: 'Short-window mobile alerts when tickets go live',
      filter: "marketable AND contact_preference = 'M'",
      columns: ['contact_preference', 'mobile', 'consented_for_marketing', 'consent_timestamp'],
      channel: 'M',
      count: smsOnSale.length,
    },
    {
      id: 'box-office-reengage',
      name: 'Box-office re-engagement',
      purpose: 'Win-back from venue desk consent forms',
      filter: "marketable AND consent_source contains 'box office'",
      columns: ['consent_source', 'email', 'mobile', 'contact_preference'],
      channel: 'Both',
      count: boxOffice.length,
    },
    {
      id: 'ballot-presale',
      name: 'Presale ballot follow-up',
      purpose: 'Convert ballot entrants who have not yet bought',
      filter: "marketable AND consent_source contains 'ballot'",
      columns: ['consent_source', 'email', 'contact_preference'],
      channel: 'E',
      count: ballot.length,
    },
    {
      id: 'waitlist-release',
      name: 'Waitlist release',
      purpose: 'Notify waitlisted people when inventory frees',
      filter: "marketable AND consent_source contains 'waitlist'",
      columns: ['consent_source', 'email', 'mobile', 'contact_preference'],
      channel: 'Both',
      count: waitlist.length,
    },
  ];

  const materials: MarketingMaterial[] = [
    {
      id: 'email-nurture',
      name: 'Email nurture template',
      channel: 'Email',
      uses: 'Subject, preview and body personalised to ancestry and language flags, with unsubscribe and sender identity',
      columns: ['first_name', 'email', 'marathi_speaking', 'ethnicity_nationality', 'consent_source'],
      segmentId: 'marathi-email-by-state',
      outcome: 'Repeat opens and click-to-purchase on language-led tours',
    },
    {
      id: 'sms-creative',
      name: 'SMS on-sale creative',
      channel: 'SMS',
      uses: '160-character on-sale alert with stop path; mobile only where preference is M',
      columns: ['first_name', 'mobile', 'contact_preference'],
      segmentId: 'sms-onsale',
      outcome: 'Same-day ticket conversion on release windows',
    },
    {
      id: 'ooh-suburb',
      name: 'Suburb-level out-of-home',
      channel: 'Out-of-home',
      uses: 'Poster and transit creative keyed to real suburbs and postcodes in the file',
      columns: ['suburb', 'postcode', 'state', 'sa2_code_2021'],
      segmentId: 'young-metro-vic-nsw',
      outcome: 'Awareness in high-density India-origin localities ahead of on-sale',
    },
    {
      id: 'partner-cobrand',
      name: 'Community-partner co-brand',
      channel: 'Partner',
      uses: 'Co-branded landing and email for permission-based partner lists',
      columns: ['consent_source', 'email', 'first_name'],
      segmentId: 'box-office-reengage',
      outcome: 'Trusted introduction through venues and community promoters',
    },
    {
      id: 'event-landing',
      name: 'Event landing page',
      channel: 'Web',
      uses: 'Geo and language variants of the event page, fed by SA2 and language flags',
      columns: ['state', 'sa2_code_2021', 'marathi_speaking', 'age'],
      segmentId: 'young-metro-vic-nsw',
      outcome: 'Higher landing-to-checkout rate for the right city and language cut',
    },
  ];

  const social: SocialDestination[] = [
    {
      id: 'meta-ca',
      platform: 'Meta',
      product: 'Custom Audiences',
      matchOn: 'Hashed email and mobile',
      uploadable: p.reachableEmail + p.reachableMobile,
      constraint:
        'APP 7.4 consent required for ancestry-derived targeting; Spam Act unsubscribe must remain available on owned channels; Meta policy limits apply to sensitive attributes.',
    },
    {
      id: 'google-cm',
      platform: 'Google',
      product: 'Customer Match',
      matchOn: 'Hashed email and mobile',
      uploadable: p.reachableEmail + p.reachableMobile,
      constraint:
        'Upload only records with current marketing consent. Ancestry and language fields stay off the match file — they segment owned sends, not the ad platform upload.',
    },
    {
      id: 'tiktok-ca',
      platform: 'TikTok',
      product: 'Custom Audiences',
      matchOn: 'Hashed email and mobile',
      uploadable: p.reachableEmail + p.reachableMobile,
      constraint:
        'Same consent gate as Meta and Google. Platform sensitive-category rules further restrict ethnicity-based lookalikes.',
    },
  ];

  const reports: LeadershipReport[] = [
    {
      id: 'lt-audience-ready',
      title: 'Audience readiness pack',
      question: 'How large is the lawfully contactable Australian audience, and where does it sit?',
      tables: ['vw_marketable_audience', 'dim_person', 'dim_geography'],
      columns: ['person_sk', 'channel', 'state', 'sa2_code_2021', 'marathi_speaking'],
      grain: 'One row per contactable person per preferred channel',
      cadence: 'Weekly during the pilot; monthly thereafter',
      decision: 'Whether the Australian proof market has enough consented reach to proceed past gate G1',
      availableNow: [
        { label: 'Marketable people', value: String(p.marketable.length) },
        { label: 'Email reachable', value: String(p.reachableEmail) },
        { label: 'Mobile reachable', value: String(p.reachableMobile) },
        { label: 'States covered', value: String(new Set(p.golden.map((r) => r.state)).size) },
        { label: 'Marathi at home', value: String(p.marathiSpeakers) },
      ],
      resolvesLater: ['Campaign open and click rates', 'Ticket sell-through by segment'],
    },
    {
      id: 'lt-campaign-performance',
      title: 'Campaign performance pack',
      question: 'Which named segments converted, and at what cost per ticket?',
      tables: ['dim_campaign', 'fact_campaign_send', 'fact_ticket_sale', 'vw_marketable_audience'],
      columns: ['campaign_id', 'channel', 'delivered', 'opened', 'clicked', 'tickets', 'amount_aud'],
      grain: 'One row per person per send, joined to ticket sales',
      cadence: 'Per campaign within 72 hours of send; weekly roll-up for Leadership',
      decision: 'Which segments to scale, pause or redesign before the next on-sale',
      availableNow: [
        { label: 'Named segments ready', value: String(segments.length) },
        {
          label: 'Largest segment',
          value: (() => {
            const top = [...segments].sort((a, b) => b.count - a.count)[0];
            return top ? `${top.name} (${top.count})` : '—';
          })(),
        },
      ],
      resolvesLater: ['Delivered / opened / clicked', 'Tickets and amount_aud per campaign', 'Cost per ticket by channel'],
    },
    {
      id: 'lt-consent-health',
      title: 'Consent health pack',
      question: 'Is the consent register clean enough to send without regulatory exposure?',
      tables: ['fact_consent_event', 'dim_person', 'vw_marketable_audience'],
      columns: ['action', 'purpose', 'source', 'channel', 'person_sk'],
      grain: 'One row per consent event; serving view is the sendable cut',
      cadence: 'Daily automated test; weekly Leadership summary',
      decision: 'Go / no-go on each send; remediation if WITHDRAW events are not suppressed',
      availableNow: [
        { label: 'Consent rate', value: `${p.golden.length ? Math.round((p.marketable.length / p.golden.length) * 100) : 0}%` },
        { label: 'Suppressed', value: String(p.suppressed.length) },
        { label: 'Consent sources', value: String(p.byConsentSource.length) },
      ],
      resolvesLater: ['Grant / withdraw event volume over time', 'Unsubscribe rate after each send'],
    },
    {
      id: 'lt-geo-expansion',
      title: 'Geography expansion pack',
      question: 'Which suburbs and SA2s justify the next venue booking?',
      tables: ['dim_geography', 'xref_postcode_sa2', 'vw_marketable_audience', 'fact_ticket_sale'],
      columns: ['suburb', 'postcode', 'sa2_code_2021', 'ratio', 'tickets', 'amount_aud'],
      grain: 'One row per suburb / SA2 with audience and, later, sales',
      cadence: 'Monthly; before each venue commitment',
      decision: 'Where to book the next three to five pilot events',
      availableNow: [
        { label: 'Suburbs', value: String(new Set(p.golden.map((r) => r.suburb)).size) },
        { label: 'Postcodes', value: String(new Set(p.golden.map((r) => r.postcode)).size) },
        { label: 'SA2 areas', value: String(new Set(p.golden.map((r) => r.sa2_code_2021)).size) },
      ],
      resolvesLater: ['Tickets and revenue by suburb and SA2', 'Sell-through versus audience density'],
    },
  ];

  return {
    pipeline: p,
    segments,
    materials,
    social,
    reports,
    totals: {
      marketable: p.marketable.length,
      email: p.reachableEmail,
      mobile: p.reachableMobile,
      segmentCount: segments.length,
      materialCount: materials.length,
      socialCount: social.length,
      reportCount: reports.length,
    },
  };
}

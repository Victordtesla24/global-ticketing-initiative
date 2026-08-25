// The defence file for Australian marketing communications.
//
// If a person complains about a message they received, three questions decide
// the outcome: was there consent, can it be proved, and was the opt-out
// honoured in time. This module names the instruments that ask those questions,
// maps each duty to the column or table in the audience file that answers it,
// and sets out the response steps and their clocks.
//
// Every count and dollar figure here is computed — from runAuPipeline() for
// audience figures, and from the Commonwealth penalty unit for exposure.
// Nothing is typed by hand. This is reference material for the proposal, not
// legal advice; the operating platform needs its own counsel sign-off.

import {
  runAuPipeline,
  COLUMN_SPEC,
  MART_TABLES,
  MART_TESTS,
  VALIDATION_RULES,
} from './audience-au';

/* -------------------------------------------------------------- instruments */

export interface Instrument {
  id: string;
  /** Short name used on chips and in the duty map. */
  code: string;
  name: string;
  regulator: string;
  reaches: string;
  duties: string[];
  href: string;
  /** Why this one matters to an ancestry-led ticketing campaign. */
  note: string;
}

export const INSTRUMENTS: Instrument[] = [
  {
    id: 'spam-act',
    code: 'SPAM',
    name: 'Spam Act 2003 (Cth) and Spam Regulations 2021',
    regulator: 'Australian Communications and Media Authority',
    reaches: 'Every commercial electronic message — email, SMS, MMS and instant message — with an Australian link',
    duties: [
      'Consent before the message is sent, express or reasonably inferred (s 16 and Schedule 2)',
      'Accurate sender identification and contact details, correct for at least 30 days after the send (s 17)',
      'A working unsubscribe facility, live at least 30 days, free, and honoured within 5 business days (s 18)',
    ],
    href: 'https://www.acma.gov.au/avoid-sending-spam',
    note:
      'The onus of proving consent sits with the sender, not the complainant. Consent cannot be inferred from the mere fact that an address has been published (Schedule 2, clause 4), and a withdrawal takes effect at the end of 5 business days (Schedule 2, clause 6).',
  },
  {
    id: 'privacy-act',
    code: 'APP7',
    name: 'Privacy Act 1988 (Cth) — Australian Privacy Principles',
    regulator: 'Office of the Australian Information Commissioner',
    reaches: 'Collection, use, disclosure, quality, security and correction of personal information',
    duties: [
      'APP 3.3 — consent before sensitive information is collected',
      'APP 5 — notice at collection: what is taken, why, and who receives it',
      'APP 7.1 — no use or disclosure for direct marketing unless an exception applies',
      'APP 7.2 and 7.3 — for information that is not sensitive: a reasonable expectation or consent, a simple opt-out, and a prominent statement in each message',
      'APP 7.4 — sensitive information may be used for direct marketing only with consent',
      'APP 10, 11, 12 and 13 — quality, security, access and correction',
    ],
    href: 'https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-7-app-7-direct-marketing',
    note:
      'APP 7.4 has no impracticability escape and it applies even where the person and the business already have a relationship. Ancestry is sensitive information, so an ancestry-led send stands or falls on consent alone.',
  },
  {
    id: 'dncr-act',
    code: 'DNCR',
    name: 'Do Not Call Register Act 2006 (Cth)',
    regulator: 'Australian Communications and Media Authority',
    reaches: 'Marketing voice calls and faxes — not marketing email or SMS, which the Spam Act covers',
    duties: [
      'Wash any calling list against the register and keep the wash current',
      'Observe the calling-hours and disclosure rules in the telemarketing industry standard',
    ],
    href: 'https://www.donotcall.gov.au/',
    note:
      'This one is dormant while the pilot sends only email and SMS. It binds the moment anyone picks up a phone against the landline column, which is why no segment in the prototype uses that column as a channel.',
  },
  {
    id: 'sender-id',
    code: 'SMSID',
    name: 'SMS Sender ID Register',
    regulator: 'Australian Communications and Media Authority',
    reaches: 'Branded alphanumeric sender IDs on text messages to Australian numbers',
    duties: [
      'Register each branded sender ID through the sending telco',
      'Authorise every provider that sends messages under that sender ID',
    ],
    href: 'https://www.acma.gov.au/1-introduction-businesses-and-organisations',
    note:
      'In force from 1 July 2026. An unregistered branded sender ID is labelled Unverified by the carriers, which turns a compliance gap into a visible trust problem on the handset.',
  },
  {
    id: 'privacy-amendment',
    code: 'POLA',
    name: 'Privacy and Other Legislation Amendment Act 2024',
    regulator: 'Office of the Australian Information Commissioner and the Federal Court',
    reaches: 'Enforcement, individual litigation and privacy-policy transparency',
    duties: [
      'Tiered civil penalties and infringement-notice powers, from 11 December 2024',
      'A statutory tort for serious invasions of privacy, from 10 June 2025 (Schedule 2 of the Privacy Act)',
      'Automated-decision disclosure in privacy policies, and the Children’s Online Privacy Code, from 10 December 2026',
    ],
    href: 'https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/statutory-tort-for-serious-invasions-of-privacy',
    note:
      'A person can now sue directly, without proving damage. Consent and lawful authority are defences to the tort — which is precisely what a dated, sourced consent record supplies.',
  },
  {
    id: 'acl',
    code: 'ACL',
    name: 'Australian Consumer Law — Schedule 2, Competition and Consumer Act 2010 (Cth)',
    regulator: 'Australian Competition and Consumer Commission',
    reaches: 'The claims inside the creative — pricing, availability and event descriptions',
    duties: [
      's 18 — no misleading or deceptive conduct',
      's 29 — no false or misleading representations about price, availability or endorsement',
    ],
    href: 'https://www.austlii.edu.au/au/legis/cth/consol_act/caca2010265/sch2.html',
    note:
      'Consent makes a send lawful; it does not make the claim inside it true. Ticket pricing, seat availability and artist billing all sit here.',
  },
  {
    id: 'platform-terms',
    code: 'TERMS',
    name: 'Ad-platform custom audience terms',
    regulator: 'Contractual — Meta, Google and TikTok',
    reaches: 'Hashed email and mobile uploaded for Custom Audiences or Customer Match',
    duties: [
      'Warrant that the rights and consents needed to share each contact point are held',
      'Respect the platform restrictions on sensitive-category targeting',
    ],
    href: 'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/direct-marketing',
    note:
      'These terms sit on top of the statutes, not instead of them. A breach is a contract claim and an account risk as well as a privacy question, which is why ancestry and language stay off the match file.',
  },
];

/* ------------------------------------------------------------------- duties */

export interface Duty {
  id: string;
  instrumentId: string;
  clause: string;
  duty: string;
  /** How the audience file answers the duty. */
  how: string;
  /** Columns and tables that carry the evidence. */
  evidence: string[];
  /** The warehouse test that holds it, where one exists. */
  test?: string;
  /** Where this duty is visible on the prototype page. */
  seeOn?: string;
}

export const DUTIES: Duty[] = [
  {
    id: 'consent-before-send',
    instrumentId: 'spam-act',
    clause: 's 16 and Schedule 2',
    duty: 'Consent exists before a commercial message is sent',
    how: 'The marketing flag on the file is the current position of a consent event history, not a standalone tick. Any single record resolves back to the moment, the form and the stated purpose it was given under.',
    evidence: ['consented_for_marketing', 'consent_timestamp', 'consent_source', 'consent_purpose', 'fact_consent_event'],
    test: 'vw_marketable_audience has no person whose latest event is WITHDRAW',
    seeOn: 'The consent gate stage of the end-to-end run',
  },
  {
    id: 'prove-consent',
    instrumentId: 'spam-act',
    clause: 's 16 — onus on the sender',
    duty: 'The sender can prove consent for the specific address',
    how: 'Consent is stored as an event with a source, so the answer to “where did you get my address” is a row, not an assertion. Each consent source in the file is a real opt-in route: checkout, waitlist, newsletter, ballot, box office or a permission-based partner list.',
    evidence: ['fact_consent_event', 'consent_source', 'record_id', 'person_sk'],
    test: 'not_null on the consent event grain — one row per grant or withdrawal',
    seeOn: 'Consent sources in the audience run, and the consent-event table in the warehouse',
  },
  {
    id: 'channel-consent',
    instrumentId: 'spam-act',
    clause: 's 16',
    duty: 'The message goes only to the channel the person chose',
    how: 'The channel preference is consent in its own right and is enforced by a join at send time, not by a filter in a spreadsheet. Email-preferred people are never texted and mobile-preferred people are never emailed.',
    evidence: ['contact_preference', 'email', 'mobile', 'vw_marketable_audience'],
    test: 'accepted_values on contact_preference — E or M only',
    seeOn: 'The channel split on the audience run and every campaign segment',
  },
  {
    id: 'sender-identity',
    instrumentId: 'spam-act',
    clause: 's 17',
    duty: 'Every message identifies the sender and carries current contact details',
    how: 'This is a property of the template rather than the audience file. It lives in the material kit: the email and SMS creatives carry the legal entity name, the ABN and a contact route that stays correct for at least 30 days after the send.',
    evidence: ['Email nurture template', 'SMS on-sale creative'],
    seeOn: 'The marketing materials section',
  },
  {
    id: 'unsubscribe',
    instrumentId: 'spam-act',
    clause: 's 18 and s 18(5)',
    duty: 'A working, free unsubscribe, honoured within 5 business days',
    how: 'An unsubscribe writes a withdrawal event, which flips the marketing flag and removes the person from the serving view. Suppression is therefore a consequence of the record rather than a manual step someone can forget.',
    evidence: ['fact_consent_event', 'consented_for_marketing', 'vw_marketable_audience'],
    test: 'expression_is_true — the serving view excludes every withdrawal',
    seeOn: 'The suppressed count on the audience run',
  },
  {
    id: 'collect-sensitive',
    instrumentId: 'privacy-act',
    clause: 'APP 3.3',
    duty: 'Sensitive information is collected only with consent',
    how: 'Ancestry and language are self-declared by the person at opt-in on ABS Census categories. A bought-in ancestry append cannot be used for marketing however it was collected, so the file has no route for one.',
    evidence: ['ethnicity_nationality', 'marathi_speaking', 'consent_purpose'],
    seeOn: 'The ancestry and language rows in the column reference',
  },
  {
    id: 'use-sensitive',
    instrumentId: 'privacy-act',
    clause: 'APP 7.4',
    duty: 'Sensitive information is used for direct marketing only with consent',
    how: 'The ancestry and language columns are gated by the same consent flag as the contact points, and they stay on owned sends. They never travel to an ad platform, where consent cannot be evidenced downstream.',
    evidence: ['ethnicity_nationality', 'marathi_speaking', 'consented_for_marketing'],
    seeOn: 'The social and platform activation section',
  },
  {
    id: 'simple-opt-out',
    instrumentId: 'privacy-act',
    clause: 'APP 7.2(c) and 7.3(c)',
    duty: 'A simple means to request no further direct marketing, stated in each message',
    how: 'One opt-out path serves both regimes: the same link that satisfies the Spam Act unsubscribe writes the withdrawal event that satisfies the privacy obligation.',
    evidence: ['fact_consent_event', 'Email nurture template', 'SMS on-sale creative'],
    seeOn: 'The marketing materials section',
  },
  {
    id: 'collection-notice',
    instrumentId: 'privacy-act',
    clause: 'APP 5',
    duty: 'The person is told at collection what is taken, why, and who receives it',
    how: 'The consent purpose is stored beside the consent itself, so the notice given at opt-in and the use made later can be compared on the same row.',
    evidence: ['consent_purpose', 'consent_source', 'consent_timestamp'],
    seeOn: 'The consent columns in the column reference',
  },
  {
    id: 'data-quality',
    instrumentId: 'privacy-act',
    clause: 'APP 10',
    duty: 'Personal information is accurate, up to date and complete',
    how: 'Records that fail a validation rule are quarantined rather than mailed, and identity resolution collapses duplicates to one person per email so the same person is not contacted twice under two records.',
    evidence: ['Validation rules', 'record_id', 'dim_person'],
    test: 'unique on the person key — one row per resolved person',
    seeOn: 'The validate and resolve stages of the audience run',
  },
  {
    id: 'security',
    instrumentId: 'privacy-act',
    clause: 'APP 11',
    duty: 'Personal information is protected from misuse and unauthorised access',
    how: 'Sensitive columns are flagged where they sit, and contact points are hashed before any platform upload, so the outbound artefact carries no readable address.',
    evidence: ['dim_person', 'Hashed match file'],
    seeOn: 'The warehouse tables and the social activation section',
  },
  {
    id: 'access-correction',
    instrumentId: 'privacy-act',
    clause: 'APP 12 and APP 13',
    duty: 'A person can get access to their information and have it corrected',
    how: 'The record key and the person key make a single person findable in one query, and the merge lineage shows which source records were folded into their golden row.',
    evidence: ['record_id', 'person_sk', 'Merge lineage'],
    seeOn: 'The resolve stage of the audience run',
  },
  {
    id: 'dnc-wash',
    instrumentId: 'dncr-act',
    clause: 'Do Not Call Register Act 2006',
    duty: 'Marketing calls go only to numbers washed against the register',
    how: 'The landline column exists on the file but is not a channel in any segment, and the channel preference carries only email and mobile. Nothing in the prototype dials, so nothing needs a wash until a call programme is added.',
    evidence: ['phone', 'contact_preference'],
    seeOn: 'The channel preference row in the column reference',
  },
  {
    id: 'branded-sender',
    instrumentId: 'sender-id',
    clause: 'From 1 July 2026',
    duty: 'A branded SMS sender ID is registered and each sending provider is authorised',
    how: 'A registration step before the first SMS campaign, taken through the sending telco. It sits with the SMS creative in the material kit rather than in the data.',
    evidence: ['SMS on-sale creative'],
    seeOn: 'The marketing materials section',
  },
  {
    id: 'truthful-claims',
    instrumentId: 'acl',
    clause: 's 18 and s 29',
    duty: 'Claims about price, availability and line-up are accurate',
    how: 'Campaign copy draws its event facts from the ticket sale and campaign tables rather than from the creative brief, so a price or an on-sale date in an email can be traced to the row it came from.',
    evidence: ['dim_campaign', 'fact_ticket_sale'],
    seeOn: 'The Leadership Team report specs',
  },
  {
    id: 'platform-warranty',
    instrumentId: 'platform-terms',
    clause: 'Custom Audience and Customer Match terms',
    duty: 'Only records with current consent are uploaded, and no sensitive category is used to target',
    how: 'The upload is built from the serving view, so a withdrawal removes a person from the next upload as well as the next email. Ancestry and language segment the owned send only.',
    evidence: ['vw_marketable_audience', 'Hashed match file'],
    seeOn: 'The social and platform activation section',
  },
];

/* ------------------------------------------------------- complaint response */

export interface ResponseStep {
  id: string;
  order: number;
  step: string;
  clock: string;
  what: string;
  /** What the step produces for the file. */
  record: string;
}

export const RESPONSE_STEPS: ResponseStep[] = [
  {
    id: 'log',
    order: 1,
    step: 'Log the complaint the day it arrives',
    clock: 'Same day',
    what: 'Record who complained, the address they were reached on, what they received and the date. A person must raise a privacy complaint with the business before the Commissioner will consider it, so this record is the start of the defence rather than an internal note.',
    record: 'Complaint reference, contact point, message identifier',
  },
  {
    id: 'stop',
    order: 2,
    step: 'Stop sending to that person before investigating',
    clock: 'Immediate',
    what: 'Suppress the address first and work out what happened second. The suppression costs one person from one campaign; getting the order wrong turns a single message into a repeated contravention.',
    record: 'Withdrawal event against the person key',
  },
  {
    id: 'unsubscribe',
    order: 3,
    step: 'Honour the opt-out inside 5 business days',
    clock: '5 business days',
    what: 'The Spam Act unsubscribe duty is strict: the clock starts when the request is received, not when someone reads it, and intent is not a defence.',
    record: 'Timestamped withdrawal, and the serving view rebuilt without the person',
  },
  {
    id: 'pull-record',
    order: 4,
    step: 'Pull the consent record',
    clock: 'Within days',
    what: 'One query on the consent event table returns the grant, its timestamp, the form it came from and the purpose stated, plus any later withdrawal. That extract is the answer to the complaint.',
    record: 'Consent extract for the person, with source and purpose',
  },
  {
    id: 'respond',
    order: 5,
    step: 'Answer in writing within 30 days',
    clock: '30 days',
    what: 'The OAIC treats 30 days as a reasonable time for a business to respond. State the information relied on, invite a reply, and apologise where an obligation was missed rather than defending the indefensible.',
    record: 'Written response, kept alongside the consent extract',
  },
  {
    id: 'escalation',
    order: 6,
    step: 'Handle escalation to the regulator',
    clock: 'On referral',
    what: 'A message complaint goes to ACMA under the Spam Act; a personal-information complaint goes to the OAIC in writing once the 30 days have run. The OAIC seeks to resolve by conciliation first, and the complainant has to supply the business response — so a clear, dated answer shapes the case before it starts.',
    record: 'Regulator correspondence, joined to the original complaint reference',
  },
  {
    id: 'retain',
    order: 7,
    step: 'Retain the whole file',
    clock: 'Through the limitation window',
    what: 'The OAIC will generally decline a complaint raised more than 12 months after the person became aware of the issue. The statutory tort runs one year from awareness or three years from the event, whichever comes first, and a court may extend that to no later than six years.',
    record: 'Complaint, consent extract, response and suppression proof held together',
  },
];

/* ------------------------------------------------------------------- clocks */

export interface Clock {
  id: string;
  duration: string;
  what: string;
  source: string;
}

export const CLOCKS: Clock[] = [
  { id: 'unsub-action', duration: '5 business days', what: 'Act on an unsubscribe request', source: 'Spam Act s 18(5)' },
  { id: 'withdraw-effect', duration: '5 business days', what: 'A withdrawal of consent takes effect', source: 'Spam Act Schedule 2, clause 6' },
  { id: 'unsub-live', duration: '30 days', what: 'The unsubscribe facility stays functional after a send', source: 'Spam Act s 18' },
  { id: 'sender-details', duration: '30 days', what: 'Sender contact details stay accurate after a send', source: 'Spam Act s 17' },
  { id: 'complaint-response', duration: '30 days', what: 'Respond to a complaint before the person may go to the Commissioner', source: 'OAIC complaint guidance' },
  { id: 'dnc-wash', duration: '30 days', what: 'A Do Not Call Register wash stays current', source: 'Do Not Call Register Act 2006' },
  { id: 'oaic-window', duration: '12 months', what: 'The window in which the OAIC will generally accept a complaint', source: 'Privacy Act s 41 practice' },
  { id: 'tort-limit', duration: '1 year, or 3 years', what: 'Limitation on the statutory tort — from awareness, or from the invasion, whichever is earlier', source: 'Privacy Act Schedule 2' },
];

/* ----------------------------------------------------------------- exposure */

/**
 * Commonwealth penalty unit, $364 from 1 July 2026 under the Crimes (Amount of
 * a Penalty Unit) Instrument 2026. Every dollar figure below is this number
 * times the penalty units in Spam Act s 25 — so the table updates with one edit
 * when the unit is next indexed.
 */
export const PENALTY_UNIT_AUD = 364;

interface PenaltyBandSpec {
  id: string;
  party: 'Body corporate' | 'Individual';
  priorRecord: boolean;
  rule: 'Consent rule' | 'Sender identity or unsubscribe';
  perContraventionUnits: number;
  sameDayUnits: number;
}

/** Spam Act s 25 — maximum civil penalties, in penalty units. */
const PENALTY_BANDS: PenaltyBandSpec[] = [
  { id: 'bc-first-consent', party: 'Body corporate', priorRecord: false, rule: 'Consent rule', perContraventionUnits: 100, sameDayUnits: 2000 },
  { id: 'bc-first-other', party: 'Body corporate', priorRecord: false, rule: 'Sender identity or unsubscribe', perContraventionUnits: 50, sameDayUnits: 1000 },
  { id: 'bc-prior-consent', party: 'Body corporate', priorRecord: true, rule: 'Consent rule', perContraventionUnits: 500, sameDayUnits: 10000 },
  { id: 'bc-prior-other', party: 'Body corporate', priorRecord: true, rule: 'Sender identity or unsubscribe', perContraventionUnits: 250, sameDayUnits: 5000 },
];

export interface PenaltyBand extends PenaltyBandSpec {
  perContraventionAud: number;
  sameDayAud: number;
}

const AUD = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

export const formatAud = (n: number): string => AUD.format(n);

export const PENALTY_TABLE: PenaltyBand[] = PENALTY_BANDS.map((b) => ({
  ...b,
  perContraventionAud: b.perContraventionUnits * PENALTY_UNIT_AUD,
  sameDayAud: b.sameDayUnits * PENALTY_UNIT_AUD,
}));

export interface ExposureNote {
  id: string;
  heading: string;
  detail: string;
}

export const EXPOSURE_NOTES: ExposureNote[] = [
  {
    id: 'spam-ceiling',
    heading: 'The Spam Act ceiling is a Federal Court maximum',
    detail:
      'Section 25 scales on three things: whether there is a prior record for that provision, whether the sender is a body corporate, and whether the higher-tier consent rule or a lower-tier rule was broken. ACMA more often uses infringement notices paired with court-enforceable undertakings, and it lists enforcement outcomes publicly — the reputational cost travels further than the penalty.',
  },
  {
    id: 'privacy-tiers',
    heading: 'Privacy Act penalties now run in three tiers',
    detail:
      'Since 11 December 2024 there is a penalty for serious interference with privacy, a middle tier for interference below that threshold, and a lower tier carrying infringement notices for administrative breaches of the principles. For a serious interference the maximum is the greater of $50 million, three times the benefit obtained, or 30 per cent of adjusted turnover for the relevant period.',
  },
  {
    id: 'first-judgment',
    heading: 'The first civil penalty judgment has landed',
    detail:
      'On 8 October 2025 the Federal Court ordered Australian Clinical Labs to pay $5.8 million over its handling of a data breach — the first civil penalty decision in the history of the Privacy Act. Conduct does not have to be deliberate, and relying on an external provider does not transfer the duty.',
  },
  {
    id: 'individual-claims',
    heading: 'Individuals can now sue without proving damage',
    detail:
      'The statutory tort covers intentional or reckless serious invasions of privacy, including misuse of information. Damages for non-economic loss are capped at the level that applies to defamation, and a court may order an apology or an injunction instead of or alongside damages. Consent and lawful authority are defences.',
  },
];

/* ------------------------------------------------------ before the first send */

export interface PreSendItem {
  id: string;
  item: string;
  why: string;
}

export const BEFORE_FIRST_SEND: PreSendItem[] = [
  {
    id: 'entity-footer',
    item: 'Legal entity name, ABN and a contact route in the footer of every template',
    why: 'Section 17 asks who sent this and how the person reaches them, and the answer has to stay correct for 30 days after the send.',
  },
  {
    id: 'sender-id-reg',
    item: 'Branded SMS sender ID registered through each sending telco, and each provider authorised',
    why: 'From 1 July 2026 an unregistered branded ID is shown as Unverified on the handset.',
  },
  {
    id: 'opt-in-wording',
    item: 'Opt-in wording reviewed for the ancestry and language fields',
    why: 'Consent under APP 3.3 and APP 7.4 has to be informed, voluntary, current and specific. A bundled tick inside a general privacy policy does not reach that bar for sensitive information.',
  },
  {
    id: 'policy-notice',
    item: 'A privacy policy and a collection notice for the operating platform, per jurisdiction',
    why: 'APP 1 and APP 5, and the automated-decision disclosure that applies from 10 December 2026.',
  },
  {
    id: 'complaint-route',
    item: 'A written complaint procedure naming a privacy contact and an address',
    why: 'The OAIC directs people to the business first, using the route set out in its privacy policy. A missing route becomes a complaint about the complaint.',
  },
  {
    id: 'platform-terms',
    item: 'Ad-platform audience terms accepted by the entity that holds the consent',
    why: 'The upload warranty binds whoever clicks accept. If that is an agency rather than the consent holder, the warranty is given by a party that cannot evidence it.',
  },
];

/* -------------------------------------------------- prototype cross-linking */

/** One anchor on this page per section of the prototype walkthrough. */
export interface ComplianceLink {
  /** Anchor on the compliance page. */
  anchor: string;
  /** Short label for the link. */
  label: string;
  /** The specific legal point that section raises. */
  point: string;
}

/** One key per section of the prototype walkthrough, so a typo fails the build. */
export type ComplianceLinkKey =
  | 'audienceRun'
  | 'geography'
  | 'columns'
  | 'warehouse'
  | 'segments'
  | 'materials'
  | 'social'
  | 'reports';

export const COMPLIANCE_LINKS: Record<ComplianceLinkKey, ComplianceLink> = {
  audienceRun: {
    anchor: 'duty-map',
    label: 'Consent duties and the columns that evidence them',
    point: 'The consent gate is what answers a complaint: which duty, which column, which test.',
  },
  geography: {
    anchor: 'instruments',
    label: 'The instruments a locality-targeted campaign has to satisfy',
    point: 'Targeting a suburb uses reference geography, not a personal attribute — but the send still sits under the Spam Act and APP 7.',
  },
  columns: {
    anchor: 'sensitive',
    label: 'Why ancestry and language are treated as sensitive information',
    point: 'Two columns on this list carry a consent requirement that the others do not.',
  },
  warehouse: {
    anchor: 'evidence-store',
    label: 'Where the consent evidence lives, and the tests that hold it',
    point: 'The consent event table is the record a regulator asks for; the tests keep the serving view honest.',
  },
  segments: {
    anchor: 'duty-map',
    label: 'Each segment sends only from the consented view',
    point: 'A segment is a filter over the serving view, so a withdrawal removes a person from every segment at once.',
  },
  materials: {
    anchor: 'sender-optout',
    label: 'Sender identity, the unsubscribe and the SMS sender ID',
    point: 'Three duties live in the creative rather than the data, and every template has to carry them.',
  },
  social: {
    anchor: 'platforms',
    label: 'What may be uploaded to an ad platform, and what may not',
    point: 'Hashed contact points with current consent go up. Ancestry and language stay on owned sends.',
  },
  reports: {
    anchor: 'exposure',
    label: 'The exposure these reports keep visible',
    point: 'Consent health is a Leadership Team report because the downside is measured in penalty units.',
  },
};

/* ------------------------------------------------------------ derived figures */

export function buildCompliance() {
  const p = runAuPipeline();

  const legalColumns = COLUMN_SPEC.filter((c) => c.legal);
  const consentTable = MART_TABLES.find((t) => t.id === 'fact_consent_event');
  const servingView = MART_TABLES.find((t) => t.kind === 'view');
  const sensitiveColumns = MART_TABLES.flatMap((t) =>
    (t.columns ?? []).filter((c) => c.note === 'sensitive').map((c) => `${t.name}.${c.name}`)
  );
  const consentTests = MART_TESTS.filter((t) => /consent|withdraw/i.test(`${t.on} ${t.why}`));

  const dutiesEvidenced = DUTIES.filter((d) => d.evidence.length > 0).length;
  const consentRate = p.golden.length ? Math.round((p.marketable.length / p.golden.length) * 100) : 0;

  return {
    pipeline: p,
    instruments: INSTRUMENTS,
    duties: DUTIES,
    steps: [...RESPONSE_STEPS].sort((a, b) => a.order - b.order),
    clocks: CLOCKS,
    penalties: PENALTY_TABLE,
    exposureNotes: EXPOSURE_NOTES,
    beforeFirstSend: BEFORE_FIRST_SEND,
    legalColumns,
    sensitiveColumns,
    consentTable,
    servingView,
    consentTests,
    validationRuleCount: VALIDATION_RULES.length,
    totals: {
      instrumentCount: INSTRUMENTS.length,
      dutyCount: DUTIES.length,
      dutiesEvidenced,
      consentRate,
      marketable: p.marketable.length,
      suppressed: p.suppressed.length,
      consentSources: p.byConsentSource.length,
      resolvedPeople: p.golden.length,
      quarantined: p.quarantined.length,
      legalColumnCount: legalColumns.length,
      stepCount: RESPONSE_STEPS.length,
      clockCount: CLOCKS.length,
    },
  };
}

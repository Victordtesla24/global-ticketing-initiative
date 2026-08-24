import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ticketalay Global Expansion Proposal',
  description: 'Privacy policy for the Ticketalay Global Expansion proposal site.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-semibold tracking-tight text-primary">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: 23 August 2026</p>

      <section className="space-y-3 text-sm leading-6 text-foreground/90">
        <p>
          This website is an interactive strategy proposal published by Global Initiative - Ticketing
          Platform, a product of V<sup>2</sup> Group Pty. Ltd. It presents research and planning material only.
        </p>
        <h2 className="pt-2 text-lg font-medium text-primary">Information we collect</h2>
        <p>
          The site does not offer user accounts, forms, or payment functions, and it does not itself
          collect personal information from visitors. Standard technical logs (such as IP address,
          browser type and pages requested) may be processed by the hosting infrastructure for
          security and operational purposes.
        </p>
        <h2 className="pt-2 text-lg font-medium text-primary">Cookies and analytics</h2>
        <p>
          The site does not set marketing or advertising cookies and does not run third-party
          advertising trackers.
        </p>
        <h2 className="pt-2 text-lg font-medium text-primary">Contact</h2>
        <p>
          Privacy questions and requests can be sent to{' '}
          <a className="text-primary underline-offset-4 hover:underline" href="mailto:sarkar.vikram@gmail.com">
            sarkar.vikram@gmail.com
          </a>
          .
        </p>
        <p className="text-xs text-muted-foreground">
          This statement describes the proposal site only. Any operating ticketing platform will
          require its own privacy policy prepared with legal counsel for each operating
          jurisdiction (Australian Privacy Act, UK GDPR, GDPR, CCPA/state laws and PIPEDA as
          applicable) before collecting customer data.
        </p>
      </section>
    </div>
  );
}

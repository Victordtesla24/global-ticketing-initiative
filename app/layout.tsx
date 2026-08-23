import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Ticketalay Global Expansion Proposal | AB Entertainment',
  description:
    'Interactive executive proposal for Ticketalay.com.au global expansion: market opportunity, data ecosystem, solution architecture, investment analysis, risk and recommendations.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'Ticketalay Global Expansion Proposal',
    description: 'C-Suite strategic proposal prepared by AB Entertainment.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body>
        <ChunkLoadErrorHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

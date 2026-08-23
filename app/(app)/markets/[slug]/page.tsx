import { notFound } from 'next/navigation';
import { MARKETS } from '@/lib/data/markets';
import MarketContent from './market-content';

export function generateStaticParams() {
  return (MARKETS ?? []).map((m) => ({ slug: m.slug }));
}

export default function MarketPage({ params }: { params: { slug: string } }) {
  const market = MARKETS?.find?.((m) => m?.slug === params?.slug);
  if (!market) notFound();
  return <MarketContent market={market} />;
}

'use client';

/* The legal footing under a prototype section: the point it raises, and a link
 * to the section of the compliance page that answers it. */

import Link from 'next/link';
import { Scale, ArrowUpRight } from 'lucide-react';
import { COMPLIANCE_LINKS, type ComplianceLinkKey } from '@/lib/data/compliance';
import { cn } from '@/lib/utils';

export function ComplianceLink({
  section,
  className,
}: {
  section: ComplianceLinkKey;
  className?: string;
}) {
  const link = COMPLIANCE_LINKS[section];

  return (
    <p
      className={cn(
        'mt-4 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2.5 text-[12.5px] leading-relaxed text-muted-foreground',
        className
      )}
    >
      <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 self-start text-primary" aria-hidden />
      <span className="min-w-0">
        <span className="font-semibold text-foreground/80">Legal footing. </span>
        {link.point}{' '}
        <Link
          href={`/compliance#${link.anchor}`}
          className="inline-flex items-baseline gap-0.5 text-primary underline-offset-4 hover:underline"
        >
          {link.label}
          <ArrowUpRight className="h-3 w-3 shrink-0 self-center" aria-hidden />
        </Link>
      </span>
    </p>
  );
}

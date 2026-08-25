'use client';

/* A compact key for colour-coded chips so a legend can never drift from the
 * thing it explains — pass the same className map the UI already uses. */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface LegendItem {
  term: string;
  meaning: string;
  /** Tailwind classes for the swatch — reuse SOURCE_COLOUR / TRUST_STYLE / KIND_STYLE. */
  swatch: string;
  /** Optional override for the swatch body (e.g. a mono code chip). */
  mark?: ReactNode;
}

export function Legend({
  items,
  title = 'Key',
  className,
}: {
  items: LegendItem[];
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('rounded-lg border border-border/50 bg-secondary/15 px-3 py-2.5', className)}
      role="group"
      aria-label={title}
    >
      <p className="t-eyebrow mb-2 text-[10px]">{title}</p>
      <ul className="flex flex-wrap gap-x-3 gap-y-2">
        {items.map((item) => (
          <li key={item.term} className="inline-flex max-w-full items-start gap-1.5">
            <span
              className={cn(
                'mt-0.5 inline-flex shrink-0 items-center justify-center rounded border px-1.5 py-px font-mono text-[9.5px] font-bold leading-none tracking-wider',
                item.swatch
              )}
            >
              {item.mark ?? item.term}
            </span>
            <span className="text-[11.5px] leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground/80">{item.term}</span>
              {' — '}
              {item.meaning}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

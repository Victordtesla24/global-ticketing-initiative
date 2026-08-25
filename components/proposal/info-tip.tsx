'use client';

/* A short explanation that opens on hover, keyboard focus and click —
 * Radix Tooltip alone is pointer-only, so touch readers get a click path. */

import { ReactNode, useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function InfoTip({
  content,
  label = 'More about this',
  className,
  side = 'top',
}: {
  content: ReactNode;
  label?: string;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={200}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className={cn(
            'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
            className
          )}
        >
          <Info className="h-2.5 w-2.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="max-w-xs border-primary/30 bg-[#1A1A1A] px-3 py-2 text-[12px] leading-snug text-foreground/90 shadow-lg"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

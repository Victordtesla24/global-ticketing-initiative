'use client';

/* A quiet fold for supporting prose. The visible layer of a page carries the
 * figure and a short line; the full working, provenance and caveats sit here,
 * one tap away — kept word for word, not deleted. */

import { ReactNode, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Disclosure({
  label = 'The full working',
  children,
  className,
  defaultOpen = false,
}: {
  label?: string;
  children?: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn('border-t border-border/30 pt-2', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition-colors hover:text-primary"
      >
        <ChevronDown className={cn('h-3 w-3 shrink-0 transition-transform duration-200', open && 'rotate-180')} />
        {label}
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2 text-[12.5px] leading-relaxed text-muted-foreground/80">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

'use client';

/* A fold whose header stays visible and whose body starts collapsed.
 * forceMount keeps the body in the DOM so print still carries the content. */

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';

type FoldGroupCtx = {
  register: (id: string, setOpen: (v: boolean) => void) => () => void;
  expandAll: () => void;
  collapseAll: () => void;
};

const FoldGroupContext = createContext<FoldGroupCtx | null>(null);

export function FoldGroup({
  children,
  className,
  controls = true,
}: {
  children: ReactNode;
  className?: string;
  controls?: boolean;
}) {
  const [setters, setSetters] = useState<Map<string, (v: boolean) => void>>(new Map());

  const register = useCallback((id: string, setOpen: (v: boolean) => void) => {
    setSetters((prev) => {
      const next = new Map(prev);
      next.set(id, setOpen);
      return next;
    });
    return () => {
      setSetters((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    };
  }, []);

  const expandAll = useCallback(() => {
    setters.forEach((set) => set(true));
  }, [setters]);

  const collapseAll = useCallback(() => {
    setters.forEach((set) => set(false));
  }, [setters]);

  const value = useMemo(() => ({ register, expandAll, collapseAll }), [register, expandAll, collapseAll]);

  return (
    <FoldGroupContext.Provider value={value}>
      <div className={cn('space-y-2', className)}>
        {controls ? (
          <div className="mb-1 flex flex-wrap justify-end gap-2 no-print">
            <button
              type="button"
              onClick={expandAll}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition-colors hover:text-primary"
            >
              Expand all
            </button>
            <span className="text-muted-foreground/30" aria-hidden>
              ·
            </span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition-colors hover:text-primary"
            >
              Collapse all
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </FoldGroupContext.Provider>
  );
}

let foldSeq = 0;

export function FoldPanel({
  title,
  subtitle,
  count,
  badge,
  children,
  className,
  defaultOpen = false,
  id,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  count?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const group = useContext(FoldGroupContext);
  const [foldId] = useState(() => id ?? `fold-${++foldSeq}`);

  useEffect(() => {
    if (!group) return;
    return group.register(foldId, setOpen);
  }, [group, foldId]);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className={cn('rounded-xl border border-border/60 bg-secondary/15', className)}>
      <Collapsible.Trigger
        className="flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
        aria-expanded={open}
      >
        <ChevronDown
          className={cn('mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-marquee text-[13px] font-bold uppercase tracking-wide text-foreground">{title}</span>
            {badge}
            {count !== undefined && count !== null ? (
              <span className="ml-auto font-marquee text-[14px] font-bold text-primary">{count}</span>
            ) : null}
          </span>
          {subtitle ? <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{subtitle}</span> : null}
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content
        forceMount
        className={cn(
          'fold-panel-body overflow-hidden data-[state=closed]:h-0 data-[state=closed]:opacity-0 data-[state=open]:h-auto data-[state=open]:opacity-100'
        )}
        data-state={open ? 'open' : 'closed'}
      >
        <div className="border-t border-border/40 px-3.5 py-3">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

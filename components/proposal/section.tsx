'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Section({
  eyebrow,
  title,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn('mb-16', className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow ? <p className="t-eyebrow mb-3">{eyebrow}</p> : null}
      {title ? (
        <h2 className="font-marquee text-2xl md:text-3xl font-bold uppercase tracking-wide text-foreground mb-6">
          {title}
        </h2>
      ) : null}
      {children}
    </motion.section>
  );
}

export function GlassCard({
  children,
  className,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn('glass-card rounded-xl p-6', onClick ? 'cursor-pointer' : '', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: any) => { if (e?.key === 'Enter' || e?.key === ' ') onClick?.(); } : undefined}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <GlassCard className={cn('flex flex-col gap-2', className)}>
      <p className="t-eyebrow">{label}</p>
      <p className="font-marquee text-2xl md:text-3xl font-bold text-primary uppercase leading-tight">{value}</p>
      {sub ? <p className="text-sm text-muted-foreground leading-snug">{sub}</p> : null}
    </GlassCard>
  );
}

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div className={cn('ornament my-12', className)} aria-hidden="true">
      <span className="ornament-diamond" />
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  GREEN: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  AMBER: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  RED: 'bg-red-500/15 text-red-400 border-red-500/40',
  PASS: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  PARTIAL: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  FAIL: 'bg-red-500/15 text-red-400 border-red-500/40',
  GOLD: 'bg-primary/15 text-primary border-primary/40',
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const style = BADGE_STYLES[status?.toUpperCase?.() ?? ''] ?? BADGE_STYLES.GOLD;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]',
        style,
        className
      )}
    >
      {status}
    </span>
  );
}

/** Renders text, highlighting [EST] and [UNVERIFIED] tags in gold/amber. */
export function EstText({ text, className }: { text: string; className?: string }) {
  const parts = (text ?? '').split(/(\[EST\]|\[UNVERIFIED\])/g);
  return (
    <span className={className}>
      {parts.map((p: string, i: number) =>
        p === '[EST]' ? (
          <span key={i} className="mx-0.5 rounded border border-primary/40 bg-primary/10 px-1 py-px text-[10px] font-semibold tracking-wider text-primary align-middle">EST</span>
        ) : p === '[UNVERIFIED]' ? (
          <span key={i} className="mx-0.5 rounded border border-amber-500/40 bg-amber-500/10 px-1 py-px text-[10px] font-semibold tracking-wider text-amber-400 align-middle">UNVERIFIED</span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}

export function DataTable({
  headers,
  rows,
  className,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-border/60', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-secondary/40">
            {(headers ?? []).map((h: string, i: number) => (
              <th key={i} className="px-4 py-3 text-left font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r: (string | ReactNode)[], i: number) => (
            <tr key={i} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
              {(r ?? []).map((c: any, j: number) => (
                <td key={j} className="px-4 py-3 align-top text-foreground/85">
                  {typeof c === 'string' ? <EstText text={c} /> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

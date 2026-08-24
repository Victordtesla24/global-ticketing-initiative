'use client';

import { motion } from 'framer-motion';

export type TimelineItem = {
  marker: string; // e.g. "01" or "M1"
  period: string; // e.g. "Days 1–30"
  title: string;
  blocks: { label: string; text: string }[];
  gate?: string;
};

/* A proper vertical programme timeline: gold spine, pulsing milestone nodes,
   period badges and structured content — replaces plain stacked cards. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* spine */}
      <div className="absolute bottom-6 left-[23px] top-3 w-px bg-gradient-to-b from-primary/80 via-primary/35 to-primary/10" aria-hidden />
      <div className="space-y-8">
        {(items ?? []).map((m, i) => (
          <motion.div
            key={`${m?.marker}-${i}`}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative pl-16"
          >
            {/* node */}
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
              <span className="absolute inline-flex h-12 w-12 rounded-full border border-primary/25" aria-hidden />
              <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-primary/10 [animation-duration:3s]" aria-hidden />
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/70 bg-background font-marquee text-[13px] font-black text-primary shadow-[0_0_18px_rgba(201,168,76,0.25)]">
                {m?.marker}
              </span>
            </div>

            <div className="glass-card rounded-xl border border-border/60 p-5 transition-colors hover:border-primary/40">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <p className="font-marquee text-base font-bold uppercase tracking-wide text-primary">{m?.title}</p>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {m?.period}
                </span>
              </div>
              <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                {(m?.blocks ?? []).map((b, j) => (
                  <div key={j}>
                    <p className="t-eyebrow mb-1">{b?.label}</p>
                    <p className="text-sm leading-relaxed text-foreground/85">{b?.text ?? ''}</p>
                  </div>
                ))}
              </div>
              {m?.gate ? (
                <p className="mt-3 border-t border-border/40 pt-3 text-xs text-amber-300/90">
                  <span className="font-semibold uppercase tracking-wider">Gate: </span>{m.gate}
                </p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

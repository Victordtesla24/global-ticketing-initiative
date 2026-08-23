'use client';

/**
 * Interactive end-to-end architecture — a node graph a non-engineer can read.
 *
 * Every node opens a plain-language explainer on hover (Radix HoverCard) and pins
 * it as a floating, dismissable panel on click, so two nodes can be compared side
 * by side. "Follow one ticket" traces a single sample transaction from the source
 * system to the dashboard, one node and one caption at a time.
 *
 * Layout is CSS grid/flex; motion is framer-motion. No new dependencies.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle, ArrowDown, ArrowRight, Box, CalendarClock, ChevronLeft, ChevronRight, Coins,
  CheckCircle2, CreditCard, Cpu, Database, Download, ExternalLink, Fingerprint, Filter, FlaskConical, Gem,
  Globe, Handshake, Inbox, Landmark, LayoutDashboard, MapPin, Megaphone, Pause, Pin, Play,
  Route, Send, ShieldCheck, Ticket, TrendingUp, Users, X, Zap,
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { TagText } from '@/components/proposal/tag';
import { cn } from '@/lib/utils';
import { ARCH_LAYERS, type ArchLayer } from '@/lib/data/architecture';
import {
  ARCH_NODES, NODES_BY_STAGE, TICKET_CLOSE, TICKET_INTRO, TICKET_LABEL, TICKET_PATH,
  findNode, type ArchArtefact, type ArchNode,
} from '@/lib/data/arch-graph';

type IconType = typeof Database;

const NODE_ICONS: Record<string, IconType> = {
  'src-platform': Database,
  'src-payments': CreditCard,
  'src-marketing': Megaphone,
  'src-public': Landmark,
  'src-partner': Handshake,
  'ing-batch': CalendarClock,
  'ing-stream': Zap,
  landing: Inbox,
  bronze: Box,
  silver: Filter,
  gold: Gem,
  'mart-finance': Coins,
  'mart-customer': Users,
  'mart-events': Ticket,
  'mart-marketing': TrendingUp,
  'mart-markets': Globe,
  'act-campaign': Send,
  'act-dashboards': LayoutDashboard,
  'act-api': Cpu,
  'gov-consent': ShieldCheck,
  'gov-quality': CheckCircle2,
  'gov-lineage': Fingerprint,
  'gov-residency': MapPin,
};

const TINT_RING: Record<string, string> = {
  landing: 'border-slate-400/45',
  bronze: 'border-orange-700/60',
  silver: 'border-slate-300/45',
  gold: 'border-primary/70',
};

const TINT_ICON: Record<string, string> = {
  landing: 'text-slate-300',
  bronze: 'text-orange-400',
  silver: 'text-slate-200',
  gold: 'text-primary',
};

const MAX_PINS = 2;
const STEP_MS = 6200;

function layerFor(node: ArchNode | undefined): ArchLayer | undefined {
  if (!node?.layer) return undefined;
  return (ARCH_LAYERS ?? []).find((l: ArchLayer) => l?.id === node.layer);
}

/* ------------------------------------------------------------------ panel */

function ArtefactLink({ artefact }: { artefact: ArchArtefact }) {
  const isDownload = artefact?.download === true;
  const Icon = isDownload ? Download : ExternalLink;
  const cls =
    'group flex items-start gap-1.5 rounded-md border border-border/70 bg-secondary/30 px-2 py-1.5 text-[11px] leading-snug text-foreground/80 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary';
  const body = (
    <>
      <Icon className="mt-0.5 h-3 w-3 shrink-0 text-primary/70 group-hover:text-primary" />
      <span className="min-w-0 flex-1">
        {artefact?.label}
        {artefact?.mode ? (
          <span
            className={cn(
              'ml-1.5 whitespace-nowrap rounded border px-1 py-px font-mono text-[9px] font-semibold uppercase tracking-wider',
              artefact.mode === 'REAL'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
            )}
          >
            {artefact.mode === 'REAL' ? 'Real extract' : 'Synthetic sample'}
          </span>
        ) : null}
      </span>
    </>
  );
  if (isDownload) {
    return (
      <a href={artefact?.href ?? '#'} download className={cls}>
        {body}
      </a>
    );
  }
  return (
    <Link href={artefact?.href ?? '#'} className={cls}>
      {body}
    </Link>
  );
}

function PanelRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 font-marquee text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80">{label}</p>
      <div className="text-[12px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function NodePanel({ node, onClose }: { node: ArchNode; onClose?: () => void }) {
  const Icon = NODE_ICONS[node?.id ?? ''] ?? Database;
  const layer = layerFor(node);
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
          <Icon className={cn('h-4 w-4', TINT_ICON[node?.tint ?? ''] ?? 'text-primary')} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-marquee text-[13px] font-bold uppercase leading-tight tracking-[0.08em] text-foreground">
            {node?.name}
          </p>
          {node?.sub ? <p className="text-[10.5px] leading-tight text-muted-foreground">{node.sub}</p> : null}
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={`Dismiss ${node?.name} panel`}
            className="shrink-0 rounded-md border border-border/70 p-1 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <p className="text-[12.5px] leading-relaxed text-foreground/90">{node?.plain}</p>

      <PanelRow label="What happens to the data here">{node?.happens}</PanelRow>

      {layer ? (
        <PanelRow label="Technology & complexity">
          {layer?.tech} <span className="text-foreground/60">·</span> {layer?.complexity}
        </PanelRow>
      ) : null}

      <PanelRow label="Prototype artefact">
        <div className="mt-1 flex flex-col gap-1.5">
          {(node?.artefacts ?? []).map((a: ArchArtefact, i: number) => (
            <ArtefactLink key={`${a?.href}-${i}`} artefact={a} />
          ))}
        </div>
      </PanelRow>

      <PanelRow label="Cost anchor">
        <TagText text={node?.cost ?? ''} />
      </PanelRow>

      <div className="rounded-md border border-amber-500/30 bg-amber-500/[0.06] p-2.5">
        <p className="mb-1 flex items-center gap-1.5 font-marquee text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400">
          <AlertTriangle className="h-3 w-3" />
          What can go wrong here
        </p>
        <p className="text-[12px] leading-relaxed text-muted-foreground">{node?.risk}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- node */

type NodeState = 'idle' | 'dim' | 'path' | 'current';

function NodeCard({
  node,
  state,
  pinned,
  onToggle,
}: {
  node: ArchNode;
  state: NodeState;
  pinned: boolean;
  onToggle: (id: string) => void;
}) {
  const Icon = NODE_ICONS[node?.id ?? ''] ?? Database;
  return (
    <HoverCard openDelay={90} closeDelay={90}>
      <HoverCardTrigger asChild>
        <motion.button
          type="button"
          layout
          onClick={() => onToggle(node?.id ?? '')}
          aria-pressed={pinned}
          aria-label={`${node?.name} — open explainer`}
          animate={{ opacity: state === 'dim' ? 0.28 : 1, scale: state === 'current' ? 1.035 : 1 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className={cn(
            'relative w-full rounded-lg border bg-white/[0.02] px-2.5 py-2 text-left backdrop-blur-sm',
            'transition-colors duration-300 hover:border-primary/60 hover:bg-primary/10',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
            TINT_RING[node?.tint ?? ''] ?? 'border-border/70',
            state === 'current' && 'border-primary bg-primary/15 shadow-[0_0_0_1px_rgba(201,168,76,0.45),0_8px_28px_rgba(0,0,0,0.45)]',
            state === 'path' && 'border-primary/55 bg-primary/[0.07]',
            pinned && 'border-primary bg-primary/15'
          )}
        >
          <span className="flex items-start gap-1.5">
            <Icon className={cn('mt-px h-3.5 w-3.5 shrink-0', TINT_ICON[node?.tint ?? ''] ?? 'text-primary')} />
            <span className="min-w-0 flex-1">
              <span className="block font-marquee text-[10.5px] font-bold uppercase leading-tight tracking-[0.07em] text-foreground">
                {node?.name}
              </span>
              {node?.sub ? (
                <span className="mt-0.5 block text-[9.5px] leading-tight text-muted-foreground">{node.sub}</span>
              ) : null}
            </span>
            {pinned ? <Pin className="mt-px h-3 w-3 shrink-0 text-primary" /> : null}
          </span>
        </motion.button>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        collisionPadding={16}
        className="z-50 w-[21rem] max-w-[calc(100vw-2rem)] rounded-xl border-primary/25 bg-popover/95 p-4 shadow-2xl backdrop-blur-xl"
      >
        <NodePanel node={node} />
        <p className="mt-3 border-t border-border/60 pt-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Click the node to pin this panel
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

/* -------------------------------------------------------------- connector */

function Connector({ dim, delay = 0 }: { dim?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  const pips = [0, 1];
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex shrink-0 items-center justify-center transition-opacity duration-500',
        'h-6 w-full xl:h-auto xl:w-8',
        dim ? 'opacity-20' : 'opacity-100'
      )}
    >
      {/* xl and up: horizontal rail */}
      <div className="relative hidden h-px w-full bg-gradient-to-r from-primary/10 via-primary/45 to-primary/10 xl:block">
        <ArrowRight className="absolute -right-0.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-primary/50" />
        {reduce
          ? null
          : pips.map((i: number) => (
              <motion.span
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(201,168,76,0.4)]"
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.8, delay: delay + i * 1.4, repeat: Infinity, ease: 'linear' }}
              />
            ))}
      </div>
      {/* below xl: vertical rail */}
      <div className="relative h-full w-px bg-gradient-to-b from-primary/10 via-primary/45 to-primary/10 xl:hidden">
        <ArrowDown className="absolute -bottom-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-primary/50" />
        {reduce ? null : (
          <motion.span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(201,168,76,0.4)]"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
}

function StageHeading({ label }: { label: string }) {
  return (
    <p className="mb-2 text-center font-marquee text-[9.5px] font-bold uppercase tracking-[0.18em] text-primary/75">
      {label}
    </p>
  );
}

/* ------------------------------------------------------------------- main */

export default function ArchitectureGraph() {
  const [pins, setPins] = useState<string[]>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true);
  // The graph sits inside a backdrop-filtered card, which becomes the containing
  // block for fixed-position descendants — so the floating tray is portalled out.
  const [mounted, setMounted] = useState<boolean>(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathIds = useMemo<string[]>(() => (TICKET_PATH ?? []).map((s) => s?.nodeId ?? ''), []);
  const currentId = follow ? pathIds[step] ?? '' : '';

  const togglePin = useCallback((id: string) => {
    setPins((prev: string[]) => {
      if (prev.includes(id)) return prev.filter((p: string) => p !== id);
      const next = [...prev, id];
      return next.length > MAX_PINS ? next.slice(next.length - MAX_PINS) : next;
    });
  }, []);

  const stateFor = useCallback(
    (id: string): NodeState => {
      if (!follow) return 'idle';
      if (id === currentId) return 'current';
      return pathIds.includes(id) ? 'path' : 'dim';
    },
    [follow, currentId, pathIds]
  );

  useEffect(() => {
    if (!follow || !playing || reduce) return;
    const t = setInterval(() => {
      setStep((s: number) => (s + 1) % (TICKET_PATH?.length ?? 1));
    }, STEP_MS);
    return () => clearInterval(t);
  }, [follow, playing, reduce]);

  const startFollow = useCallback(() => {
    setFollow(true);
    setStep(0);
    setPlaying(true);
  }, []);

  const stepNode = findNode(currentId);
  const pinnedNodes = pins.map((id: string) => findNode(id)).filter(Boolean) as ArchNode[];

  const tray = (
    <AnimatePresence>
      {pinnedNodes.length > 0 ? (
        <motion.div
          key="pins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:pl-[17rem]"
        >
          <div className="mx-auto mb-1.5 flex w-full max-w-5xl justify-end">
            <span className="pointer-events-auto rounded-full border border-primary/30 bg-popover/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-xl">
              Pinned {pinnedNodes.length} of {MAX_PINS} — click a node to pin, dismiss to clear
            </span>
          </div>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 sm:flex-row sm:items-end">
            {pinnedNodes.map((n: ArchNode) => (
              <motion.div
                key={n?.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="pointer-events-auto max-h-[46vh] flex-1 overflow-y-auto rounded-xl border border-primary/30 bg-popover/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              >
                <NodePanel node={n} onClose={() => togglePin(n?.id ?? '')} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const renderColumn = (label: string, nodes: ArchNode[], extra?: string) => (
    <div className={cn('flex min-w-0 flex-1 flex-col', extra)}>
      <StageHeading label={label} />
      <div className="flex flex-1 flex-col justify-center gap-2">
        {(nodes ?? []).map((n: ArchNode) => (
          <NodeCard
            key={n?.id}
            node={n}
            state={stateFor(n?.id ?? '')}
            pinned={pins.includes(n?.id ?? '')}
            onToggle={togglePin}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* ------------------------------------------------------- toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Hover any node for a plain-language explainer. Click to pin it — pin two to compare them side by side.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {pins.length > 0 ? (
            <button
              type="button"
              onClick={() => setPins([])}
              className="rounded-md border border-border/70 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Clear pins
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => (follow ? setFollow(false) : startFollow())}
            aria-pressed={follow}
            className={cn(
              'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors',
              follow
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-primary/40 bg-primary/5 text-primary/90 hover:bg-primary/15'
            )}
          >
            <Route className="h-3.5 w-3.5" />
            {follow ? 'Exit follow mode' : 'Follow one ticket'}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- the graph */}
      <div className="rounded-xl border border-border/50 bg-black/20 p-3 md:p-4">
        <div className="flex flex-col xl:flex-row xl:items-stretch">
          {renderColumn('Source Systems', NODES_BY_STAGE.sources, 'xl:basis-[21%]')}
          <Connector dim={follow} delay={0} />
          {renderColumn('Ingestion', NODES_BY_STAGE.ingestion, 'xl:basis-[17%]')}
          <Connector dim={follow} delay={0.5} />

          {/* Governed lakehouse — the medallion progression */}
          <div className="flex min-w-0 flex-1 flex-col xl:basis-[23%]">
            <StageHeading label="Governed Lakehouse" />
            <div className="flex flex-1 flex-col rounded-xl border border-dashed border-primary/25 bg-primary/[0.03] p-2">
              <p className="mb-2 text-center text-[8.5px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                S3 + Iceberg · Glue + dbt · Athena / Redshift Serverless
              </p>
              <div className="flex flex-1 flex-col justify-center gap-1.5">
                {(NODES_BY_STAGE.lakehouse ?? []).map((n: ArchNode, i: number) => (
                  <div key={n?.id}>
                    {i > 0 ? (
                      <div className="flex justify-center py-0.5" aria-hidden="true">
                        <ArrowDown className="h-3 w-3 text-primary/45" />
                      </div>
                    ) : null}
                    <NodeCard
                      node={n}
                      state={stateFor(n?.id ?? '')}
                      pinned={pins.includes(n?.id ?? '')}
                      onToggle={togglePin}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Connector dim={follow} delay={1} />
          {renderColumn('Data Marts', NODES_BY_STAGE.marts, 'xl:basis-[21%]')}
          <Connector dim={follow} delay={1.5} />
          {renderColumn('Activation', NODES_BY_STAGE.activation, 'xl:basis-[18%]')}
        </div>

        {/* -------------------------------------------- governance spine */}
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="font-marquee text-[9.5px] font-bold uppercase tracking-[0.2em] text-primary/75">
              Governance Spine
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
          <div className="grid gap-2 rounded-xl border border-dashed border-primary/25 bg-primary/[0.03] p-2 sm:grid-cols-2 lg:grid-cols-4">
            {(NODES_BY_STAGE.governance ?? []).map((n: ArchNode) => (
              <NodeCard
                key={n?.id}
                node={n}
                state={follow ? 'path' : 'idle'}
                pinned={pins.includes(n?.id ?? '')}
                onToggle={togglePin}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[10.5px] leading-relaxed text-muted-foreground">
            These four controls are not a stage — they run underneath every node above, and each one is a condition the
            stage has to satisfy before data moves on.
          </p>
        </div>
      </div>

      {/* --------------------------------------------- follow-one-ticket */}
      <AnimatePresence initial={false}>
        {follow && stepNode ? (
          <motion.div
            key="follow"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/[0.05] p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-400">
                  <FlaskConical className="h-3 w-3" />
                  {TICKET_LABEL}
                </span>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{TICKET_INTRO}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous step"
                    onClick={() => {
                      setPlaying(false);
                      setStep((s: number) => (s - 1 + TICKET_PATH.length) % TICKET_PATH.length);
                    }}
                    className="rounded-md border border-border/70 p-1.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
                    onClick={() => setPlaying((p: boolean) => !p)}
                    className="rounded-md border border-primary/50 bg-primary/10 p-1.5 text-primary transition-colors hover:bg-primary/20"
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    aria-label="Next step"
                    onClick={() => {
                      setPlaying(false);
                      setStep((s: number) => (s + 1) % TICKET_PATH.length);
                    }}
                    className="rounded-md border border-border/70 p-1.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      <p className="font-marquee text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                        Step {step + 1} of {TICKET_PATH.length} — {stepNode?.name}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/90">
                        {TICKET_PATH[step]?.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(TICKET_PATH ?? []).map((s, i: number) => (
                      <button
                        key={s?.nodeId}
                        type="button"
                        aria-label={`Go to step ${i + 1} — ${findNode(s?.nodeId ?? '')?.name ?? ''}`}
                        aria-current={i === step}
                        onClick={() => {
                          setPlaying(false);
                          setStep(i);
                        }}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300',
                          i === step ? 'w-7 bg-primary' : 'w-3 bg-primary/25 hover:bg-primary/50'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-3 border-t border-primary/20 pt-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
                {TICKET_CLOSE}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ------------------------------------------ pinned floating panels */}
      {/* Casts bridge the two @types/react copies that @types/react-dom pulls in. */}
      {mounted && typeof document !== 'undefined'
        ? (createPortal(tray as never, document.body) as unknown as ReactNode)
        : null}

      <p className="sr-only">
        {(ARCH_NODES ?? []).map((n: ArchNode) => `${n?.name}: ${n?.plain}`).join(' ')}
      </p>
    </div>
  );
}

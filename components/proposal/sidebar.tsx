'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe2,
  Database,
  FlaskConical,
  Layers,
  Wallet,
  ShieldAlert,
  ShieldCheck,
  Map,
  Scale,
  Flag,
  Menu,
  X,
  ChevronDown,
  Printer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Vision Statement', icon: LayoutDashboard },
  { href: '/market-opportunity', label: 'Market Opportunity', icon: Globe2 },
  { href: '/data-ecosystem', label: 'Data Ecosystem', icon: Database },
  { href: '/prototype', label: 'Prototype', icon: FlaskConical },
  { href: '/compliance', label: 'Marketing Compliance', icon: ShieldCheck },
  { href: '/architecture', label: 'Architecture', icon: Layers },
  { href: '/investment', label: 'Investment & Returns', icon: Wallet },
  { href: '/risk', label: 'Risk Analysis', icon: ShieldAlert },
];

const MARKET_LINKS = [
  { href: '/markets/australia', label: 'Australia' },
  { href: '/markets/uk', label: 'United Kingdom' },
  { href: '/markets/usa', label: 'United States' },
  { href: '/markets/canada', label: 'Canada' },
  { href: '/markets/eu', label: 'European Union' },
];

const NAV_TAIL = [
  { href: '/adversarial-review', label: 'Adversarial Review', icon: Scale },
  { href: '/recommendations', label: 'Recommendations', icon: Flag },
];

export function Sidebar() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(pathname?.startsWith?.('/markets') ?? false);

  const linkCls = (active: boolean) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors',
      active
        ? 'bg-primary/15 text-primary border border-primary/30'
        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground border border-transparent'
    );

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={linkCls(active)} onClick={() => setOpen(false)}>
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => setMarketsOpen((v) => !v)}
        className={cn(linkCls(pathname?.startsWith?.('/markets') ?? false), 'w-full justify-between')}
      >
        <span className="flex items-center gap-3">
          <Map className="h-4 w-4 shrink-0" />
          Target Markets
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', marketsOpen ? 'rotate-180' : '')} />
      </button>
      {marketsOpen ? (
        <div className="ml-5 flex flex-col gap-0.5 border-l border-border/50 pl-3">
          {MARKET_LINKS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-md px-3 py-2 text-[12.5px] transition-colors',
                pathname === m.href
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
              )}
            >
              {m.label}
            </Link>
          ))}
        </div>
      ) : null}

      {NAV_TAIL.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={linkCls(active)} onClick={() => setOpen(false)}>
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="border-t border-border/50 px-3 py-3 flex flex-col gap-1">
      <button
        type="button"
        onClick={() => window?.print?.()}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
      >
        <Printer className="h-4 w-4" />
        Print This Page
      </button>
      <p className="px-3 pt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
        AB Entertainment — Confidential
      </p>
    </div>
  );

  const header = (
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="relative h-10 w-10 shrink-0">
        <Image src="/brand/AB_Logo_transparent.png" alt="AB Entertainment logo" fill className="object-contain" sizes="40px" />
      </div>
      <div>
        <p className="font-marquee text-sm font-bold uppercase tracking-[0.16em] text-foreground leading-tight">Ticketalay</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Global Expansion Proposal</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="no-print fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <Image src="/brand/AB_Logo_transparent.png" alt="AB Entertainment logo" fill className="object-contain" sizes="28px" />
          </div>
          <span className="font-marquee text-xs font-bold uppercase tracking-[0.16em]">Ticketalay Proposal</span>
        </div>
        <button type="button" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)} className="rounded-md border border-border/60 p-2 text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="no-print fixed inset-0 z-30 bg-background/95 pt-16 backdrop-blur-md lg:hidden flex flex-col">
          {nav}
          {footer}
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/50 bg-[hsl(0_0%_5%)]/90 backdrop-blur-md lg:flex">
        {header}
        {nav}
        {footer}
      </aside>
    </>
  );
}

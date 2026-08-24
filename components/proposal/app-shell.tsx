'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/proposal/sidebar';
import { SiteFooter } from '@/components/proposal/site-footer';

const ParticlesBg = dynamic(() => import('@/components/three/particles-bg'), { ssr: false });

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ParticlesBg />
      <Sidebar />
      {/* The content column fills the viewport rather than sitting in a 1152px
          band: prose blocks keep their own max-w-3xl measure, so the extra width
          goes to the tables, grids and cards that actually need it. */}
      <main className="relative z-10 px-4 pb-20 pt-20 sm:px-5 lg:ml-64 lg:px-10 lg:pt-10 2xl:px-14">
        <div className="mx-auto w-full max-w-[1800px]">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

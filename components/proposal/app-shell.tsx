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
      <main className="relative z-10 px-5 pb-20 pt-20 lg:ml-64 lg:px-10 lg:pt-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

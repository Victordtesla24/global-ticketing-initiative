'use client';

import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#1A1A1A', color: '#FFFFFF', border: '1px solid rgba(201,168,76,0.25)' },
        }}
      />
    </TooltipProvider>
  );
}

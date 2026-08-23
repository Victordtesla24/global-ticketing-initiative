'use client';

import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#1A1A1A', color: '#FFFFFF', border: '1px solid rgba(201,168,76,0.25)' },
        }}
      />
    </>
  );
}

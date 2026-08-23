import { ReactNode } from 'react';
import { AppShell } from '@/components/proposal/app-shell';

export default function ProposalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

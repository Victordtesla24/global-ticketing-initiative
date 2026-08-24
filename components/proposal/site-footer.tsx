import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/60 px-4 pb-10 pt-6 sm:px-5 lg:ml-64 lg:px-10 2xl:px-14">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 Global Initiative - Ticketing Platform · A Product of V<sup>2</sup> Group Pty. Ltd. · All rights
          reserved.
        </p>
        <nav className="flex gap-5">
          <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <a href="mailto:sarkar.vikram@gmail.com" className="transition-colors hover:text-foreground">
            Contact Support
          </a>
        </nav>
      </div>
    </footer>
  );
}

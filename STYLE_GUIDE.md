# Style guide

The visual conventions of this site, as the code actually implements them. Sources of truth:
[`app/globals.css`](app/globals.css), [`tailwind.config.ts`](tailwind.config.ts) and
[`components/`](components/). If you change one of those, change this file with it.

The site is **single-theme**: a dark black-and-gold canvas. There is no light mode and no theme
switching at runtime — `app/providers.tsx` mounts no theme provider, and nothing toggles a `dark`
class. Design for the dark canvas only.

---

## Layout

| File | Role |
|------|------|
| `app/layout.tsx` | Root layout. Metadata, `<Providers>`, and `ChunkLoadErrorHandler` — the last is required and prevents a known ChunkLoadError race; do not remove it. |
| `app/providers.tsx` | Client providers. Currently just `Toaster` from **react-hot-toast**, styled to the brand. |
| `app/(app)/layout.tsx` | Wraps every proposal route in `AppShell`. |
| `components/proposal/app-shell.tsx` | The real page frame: particle background, sidebar, `max-w-6xl` main column, site footer. |

`components/layouts/app-shell.tsx` is a separate generic shell (sidebar/header props) and is **not**
what the proposal routes use.

---

## Typography

Two self-hosted families, declared as `@font-face` in `globals.css` from `public/fonts/`, in Light
(300) through Black (900):

| Role | Family | CSS variable | How to apply |
|------|--------|--------------|--------------|
| Display / headings | **AB Marquee** | `--font-display` | `font-display` (Tailwind) or `.font-marquee` |
| Body | **AB Sans** | `--font-body` | Inherited — `body` sets `font-family: var(--font-body)`. `.font-absans` applies it explicitly. |
| Mono | — | — | `font-mono` |

Headings are uppercase with wide tracking; the house heading is
`font-marquee text-2xl md:text-3xl font-bold uppercase tracking-wide`.
Use `.t-eyebrow` for the small gold uppercase label above a section title.

**Two caveats in the current config.** `tailwind.config.ts` maps `font-sans` to `var(--font-sans)`
and `font-mono` to `var(--font-mono)`, and `globals.css` defines neither. So `font-mono` renders
through its fallback (`ui-monospace, monospace`) — fine, and used throughout for slugs, field names
and tabular figures — while `font-sans` would drop body text to `system-ui`. **Do not use
`font-sans`**: leave body text to inherit AB Sans.

---

## Colour

All colours are CSS variables in `globals.css`. Prefer the semantic Tailwind tokens over raw hex.

### Semantic tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `background` / `foreground` | `#0A0A0A` / white | Page canvas and text |
| `card` / `card-foreground` | `#111111` / white | Card surfaces |
| `popover` / `popover-foreground` | `#1A1A1A` / white | Overlays |
| `primary` / `primary-foreground` | `#C9A84C` gold / black | Brand accent, headings, links, active nav |
| `secondary` / `secondary-foreground` | `#1A1A1A` / white | Subtle fills, table header rows |
| `muted` / `muted-foreground` | `#1A1A1A` / 65% white | Helper and secondary text |
| `accent` / `accent-foreground` | gold / black | Hover and active states |
| `destructive` / `destructive-foreground` | `#DC2626` / white | Errors |
| `border` | gold | Borders and dividers — usually at low opacity, e.g. `border-border/60` |
| `input` | `#222` | Form input borders |
| `ring` | gold | Focus rings |

Used as `bg-card`, `text-muted-foreground`, `border-border/60`, `text-primary`, and so on.

### Brand variables

`globals.css` also exposes raw brand values for CSS that needs them directly:

`--color-bg` `#0A0A0A` · `--color-bg-deep` `#050505` · `--color-surface` `#111111` ·
`--color-surface-2` `#1A1A1A` · `--color-surface-3` `#222222` · `--color-gold` `#C9A84C` ·
`--color-gold-light` `#D4B65C` · `--color-gold-pale` `#E8D5A3` · `--color-gold-dark` `#B0923F` ·
`--color-burgundy` `#722F37` · `--color-success` `#22C55E` · `--color-warning` `#F59E0B` ·
`--color-danger` `#DC2626` · `--color-fg-1/2/3` (white at 100 / 65 / 50%) ·
`--color-gold-08/15/25` (gold at 8 / 15 / 25%).

**Charts:** `tailwind.config.ts` declares `chart-1` … `chart-5` colours, but `globals.css` defines
no `--chart-*` variables, so those utilities resolve to nothing. Nothing in the codebase uses them.
Pass explicit brand colours to Recharts and Plotly instead.

**Status colours** are Tailwind palette colours at fixed opacities, applied consistently by
`StatusBadge` and by the provenance chips: emerald = pass/green, amber = partial/planning,
red = fail, gold = neutral or default.

---

## Radius

`--radius` is **0.375rem**. Tailwind derives three utilities from it:

| Utility | Resolves to |
|---------|-------------|
| `rounded-lg` | `var(--radius)` → 0.375rem |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |

`globals.css` additionally defines `--radius-sm` (0.25rem), `--radius-lg` (0.5rem) and
`--radius-full` (9999px) as CSS variables only — they are not wired to Tailwind utilities. For
pills and circles use `rounded-full`. Glass cards use `rounded-xl` from Tailwind's own scale.

---

## Spacing and shadows

There are no custom spacing or shadow tokens — use Tailwind's default scales (`p-4`, `gap-6`,
`shadow-md`, …). Vary the rhythm rather than repeating one gap: the page shell supplies the outer
padding, and `Section` supplies `mb-16` between sections.

---

## Motion

| What | Where | Notes |
|------|-------|-------|
| `--ease-brand` | `globals.css` | `cubic-bezier(0.25, 1, 0.5, 1)` — the house easing, used by `.glass-card`, `.btn-gold` and friends. |
| `animate-fade-in` / `animate-fade-out` | `tailwind.config.ts` | 0.4s / 0.2s ease-out. |
| `animate-accordion-down` / `-up` | `tailwind.config.ts` | For Radix accordion content. |
| Scroll reveal | `components/proposal/section.tsx` | `Section` animates itself in with framer-motion (`opacity`/`y`, once, 0.6s). Wrapping a page section in `Section` is all that is needed. |
| `@/components/ui/animate` | framer-motion helpers | `FadeIn`, `ScaleIn`, `SlideIn`, `Stagger` + `StaggerItem`, `HoverLift`, `PressScale`, `SkeletonPulse`. |

`tailwind.config.ts` maps `duration-fast`, `duration-normal` and `duration-slow` to `--duration-*`
variables that `globals.css` does not define, so those three utilities produce no duration. Use
Tailwind's numeric durations (`duration-200`, `duration-300`) in new code.

---

## Brand utility classes

Defined in `globals.css` and used across the proposal pages:

| Class | Effect |
|-------|--------|
| `.glass-card` | Translucent white fill, 12px backdrop blur, hairline gold border; on hover lifts 4px with a gold-tinted shadow. |
| `.t-eyebrow` | 0.75rem, semibold, `0.25em` tracking, uppercase, gold. |
| `.ambient-glow` | Soft radial gold wash for hero backgrounds. |
| `.section-divider` | 1px gold gradient rule, transparent at both ends. |
| `.ornament` / `.ornament-diamond` | Centred rule pair with a rotated diamond — the `◆ ───` motif. |
| `.gold-shimmer` | Animated gold gradient clipped to text (3s loop). |
| `.btn-gold` / `.btn-gold-outline` | Uppercase gold gradient button and its outline counterpart. |
| `.font-marquee` / `.font-absans` | Apply the display and body families directly. |
| `.no-print` | Hidden in the print stylesheet, which also forces a white background. |

Focus is a 2px gold outline at 2px offset, site-wide. Selection and scrollbars are gold-tinted.

---

## Proposal components — `@/components/proposal/`

These are the building blocks the pages are actually made of.

| Component | Props | Use |
|-----------|-------|-----|
| `Section` | `eyebrow?`, `title?`, `id?`, `className?` | Standard page section: eyebrow, uppercase heading, scroll-reveal. |
| `GlassCard` | `className?`, `onClick?` | `.glass-card` surface at `rounded-xl p-6`. Passing `onClick` adds button semantics and keyboard handling. |
| `StatCard` | `label`, `value`, `sub?` | Headline figure in a glass card — eyebrow label, large gold value, optional note. |
| `DataTable` | `headers`, `rows` | Horizontally scrollable table with gold uppercase headers and hover rows. |
| `StatusBadge` | `status` | Pill for `GREEN`/`AMBER`/`RED`, `PASS`/`PARTIAL`/`FAIL`; anything else renders gold. |
| `OrnamentDivider` | `className?` | The `◆` divider between major blocks. |
| `Tag` | `tag: ProvenanceTag` | Provenance chip — see below. |
| `Timeline` | `items` | Vertical phase timeline. |
| `Disclosure` | `label?`, `className?`, `defaultOpen?` | Collapsible fold for supporting prose. The visible layer of a page leads with the visual and a short line; the full working, provenance and caveats sit verbatim inside a `Disclosure`, one tap away. |
| `AudienceDemo` | — | The `/prototype` end-to-end pipeline demo over `lib/data/audience-demo.ts` — stage rail, records table, validation chips, merge visual, bar blocks and KPI tiles, all computed from the record array at render time. |
| `ArchitectureGraph` | — | The interactive architecture graph. |
| `AppShell`, `Sidebar`, `SiteFooter` | — | Page frame; mounted by `app/(app)/layout.tsx`. |

### Provenance chips

Every figure that needs a source carries a `<Tag>`. The six values and the plain-word labels they
render are defined in `components/proposal/tag.tsx`: `ACTUAL` → "Actual spend", `LIST` → "Published
price", `QUOTE` → "Quoted", `DERIVED` → "Calculated", `OFFICIAL` → "Official statistic",
`ILLUSTRATIVE` → "Illustrative — from sample data". Where a sentence has room, say it in words
instead; the chip is for table cells and headline figures.

---

## UI primitives — `@/components/ui/`

Radix-based primitives with `class-variance-authority` variants.

| Component | Variants / props |
|-----------|------------------|
| `Button` | `variant`: `default` \| `secondary` \| `outline` \| `ghost` \| `destructive` \| `link` \| `glass-dark` \| `glass-light`. `size`: `default` \| `xs` \| `sm` \| `lg` \| `icon` \| `icon-sm`. `loading` boolean. `link` focuses with an underline, not a ring. |
| `Card` | `variant`: `default` \| `interactive` \| `glass-dark` \| `glass-dark-interactive` \| `glass-light` \| `glass-light-interactive` \| `ghost`. Composed of `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Wrap `interactive` in an `<a>` or `<button>` for keyboard access. |
| `Badge` | `variant`: `default` \| `secondary` \| `outline` \| `destructive`. |
| `Input` | `variant`: `default` \| `error` \| `success` \| `ghost`. `size`: `default` \| `sm` \| `lg`. |
| `Textarea` | `variant`: `default` \| `error` \| `success` \| `ghost`. |

The `glass-light` variants of `Button` and `Card` are built for pale backgrounds and will read
poorly on this site's black canvas — prefer `glass-dark`, or `GlassCard` from the proposal set.

Also available, unstyled beyond the tokens above: `Accordion`, `Alert`, `AlertDialog`,
`AspectRatio`, `Avatar`, `Breadcrumb`, `Calendar`, `Carousel`, `Checkbox`, `Collapsible`,
`Command`, `ContextMenu`, `DateRangePicker`, `Dialog`, `Drawer`, `DropdownMenu`, `Form`,
`HoverCard`, `InputOTP`, `Label`, `Menubar`, `NavigationMenu`, `Pagination`, `Popover`, `Progress`,
`RadioGroup`, `Resizable`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`,
`Switch`, `Table`, `Tabs`, `Toggle`, `ToggleGroup`, `Tooltip`.

Toasts come from **react-hot-toast** (`import toast from 'react-hot-toast'`), whose `Toaster` is
mounted in `app/providers.tsx`.

---

## SSR / hydration safety

Server-rendered HTML must match the client's first render. Use these primitives rather than
hand-rolling fixes:

| Primitive | Import | Use for |
|-----------|--------|---------|
| `ClientOnly` | `@/components/client-only` | Anything browser-only or non-deterministic: `window`/`localStorage` reads, live clocks, random values, third-party widgets. Pass a `fallback` sized like the content. |
| `useMounted()` | `@/components/client-only` | Hook variant when you need the boolean directly. |
| `SafeDate` / `SafeTime` | `@/components/safe-format` | Dates and times — formatted with an explicit locale and UTC so SSR matches the client. `localize` re-renders in the visitor's timezone after mount. |
| `SafeNumber` | `@/components/safe-format` | Numbers and currency (`currency="AUD"`), same guarantees. |

Rules of thumb: never touch `window`/`document` at module scope; never seed `useState` with
`Date.now()`, `Math.random()` or `new Date()`; never call a `toLocaleString`-style method without an
explicit locale (and `timeZone` for dates). The three.js components (`components/three/`) are
client-only and are loaded with `dynamic(..., { ssr: false })`.

---

## Copy

The rendered surface — `app/`, `lib/`, `components/` — is gated by
[`scripts/no-chrome-gate.sh`](scripts/no-chrome-gate.sh), which fails the build on review-process
and working-notes vocabulary. Write page copy as prose addressed to the reader of the proposal.
Spelling and figures are Australian English (`en-AU`, set on `<html lang>`).

**Content pattern — visual first.** Every section leads with its visual: stat cards, tables,
badges, timelines, bar blocks, the graph. Visible supporting text is one or two short sentences.
The full working, provenance and caveats are kept word for word inside a `Disclosure` fold —
nothing is deleted to make a page shorter; it is folded. Figures never move into a fold: a number
visible before stays visible.

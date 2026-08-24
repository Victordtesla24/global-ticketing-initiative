<div align="center">

<h1 style="color:#C9A84C;text-transform:uppercase;letter-spacing:0.18em;font-weight:800">AB&nbsp;ENTERTAINMENT</h1>

<p style="color:#C9A84C;letter-spacing:0.1em">◆ ─────────────────────────────────────────────────────── ◆</p>

<h3 style="color:#A0A0A0;text-transform:uppercase;letter-spacing:0.14em">Ticketalay Global Expansion — Strategic Proposal</h3>

<p style="color:#A0A0A0">An interactive proposal website · Black &amp; Gold · Formal en&#8209;AU</p>

</div>

<br />

## What this is

This repository holds the source of an interactive proposal website for the Ticketalay global
expansion — a staged expansion across Australia, the United Kingdom, the United States, Canada
and the European Union. Every page is a read-only presentation of proposal content that is
authored in TypeScript under `lib/data/`. The site has no accounts, no forms, no database and no
API routes; nothing is submitted and nothing is stored.

It is presented in the **AB Entertainment design system**: a deep black canvas (`#0A0A0A`), a gold
primary (`#C9A84C`), the self-hosted AB Marquee and AB Sans typefaces, glass-card surfaces and
gold ornament dividers.

**Production — the only deployed URL:**

| Environment | URL |
| :--- | :--- |
| Production | <https://ticketalay.abacusai.cloud> |

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Stack

Versions are those pinned in [`package.json`](package.json).

| Layer | Package | Version |
| :--- | :--- | :--- |
| Framework | `next` (App Router) | 14.2.28 |
| UI runtime | `react` / `react-dom` | 18.2.0 |
| Language | `typescript` | 5.2.2 |
| Styling | `tailwindcss` (+ `tailwindcss-animate`, `tailwind-merge`) | 3.3.3 |
| Primitives | `@radix-ui/react-*` | 1.x / 2.x |
| Variants | `class-variance-authority` / `clsx` | 0.7.0 / 2.1.1 |
| Motion | `framer-motion` | 10.18.0 |
| Charts | `recharts` | 2.15.3 |
| Charts | `plotly.js` / `react-plotly.js` | 2.35.3 / 2.6.0 |
| 3D | `three` | 0.185.x |
| Icons | `lucide-react` | 0.446.0 |
| Toasts | `react-hot-toast` | 2.4.1 |

Runtime and tooling: **Node 22** and **Yarn classic (1.x)** with the committed `yarn.lock`.
Type-checking runs as part of `next build` (`typescript.ignoreBuildErrors` is `false` in
[`next.config.js`](next.config.js)); ESLint is skipped during builds.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Routes

Every route lives under `app/(app)/`, which is wrapped by
`components/proposal/app-shell.tsx` — particle background, sidebar navigation and site footer.

| Route | Source | Page |
| :--- | :--- | :--- |
| `/` | `app/(app)/page.tsx` → `executive-summary-content.tsx` | Vision Statement |
| `/market-opportunity` | `app/(app)/market-opportunity/` | Market Opportunity |
| `/data-ecosystem` | `app/(app)/data-ecosystem/` | Data Ecosystem |
| `/prototype` | `app/(app)/prototype/` | Prototype |
| `/architecture` | `app/(app)/architecture/` | Architecture |
| `/investment` | `app/(app)/investment/` | Investment &amp; Returns |
| `/risk` | `app/(app)/risk/` | Risk Analysis |
| `/markets/[slug]` | `app/(app)/markets/[slug]/` | Market deep-dives |
| `/adversarial-review` | `app/(app)/adversarial-review/` | Adversarial Review |
| `/recommendations` | `app/(app)/recommendations/` | Recommendations |
| `/privacy-policy` | `app/(app)/privacy-policy/page.tsx` | Privacy Policy |

`/markets/[slug]` is statically generated from `MARKETS` in `lib/data/markets.ts`, producing five
pages: `/markets/australia`, `/markets/uk`, `/markets/usa`, `/markets/canada`, `/markets/eu`.

All routes except `/markets/[slug]` render dynamically (`export const dynamic = 'force-dynamic'`
in the root layout). `/privacy-policy` is reached from the footer; the remaining pages are listed
in the sidebar.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Data layer

All page content is typed TypeScript in `lib/data/`. There is no database and no fetch at runtime.

| Module | Contents |
| :--- | :--- |
| `arch-graph.ts` | Stages, nodes and artefact links for the interactive architecture graph, plus the step-by-step ticket path through the stack. |
| `architecture.ts` | Architecture page copy: lakehouse layers, data marts, the MVP bill-of-materials reconciliation, scalability path, technology comparison, approval gates, flow, retention and transfer routes. |
| `costs.ts` | Investment page: actual spend to date, the per-gate decision schedule, vendor published prices, the people/salary basis, the returns verdict and outstanding items. |
| `insights.ts` | What the data buys, market indicator callouts, the marketing data plan, strategic options and revenue streams. |
| `markets.ts` | The `Market` type and the five market records behind `/markets/[slug]`, plus campaign segments and the decision framework shown on `/market-opportunity`. |
| `prototype.ts` | Index of the 60 sample datasets, their control totals, CSV/JSON link helpers and the Australia end-to-end walkthrough. |
| `providers.ts` | The 60-provider catalogue — category, trust tier, country tags and cost metadata — with the acquisition sequence, day-one bill and history-depth table. |
| `revenue-model.ts` | The revenue identity and its variables. |
| `review.ts` | Deliverable ratings, overall assessment, missing elements, assumptions, regulatory gaps, data-quality concerns, confidence and quality gates. |
| `risks.ts` | The risk register with likelihood/impact scores, the colour-scale helper, top-five mitigations and items outstanding before a decision. |

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Provenance vocabulary

Figures on the site carry a short chip saying where the number came from. The chip is rendered by
[`components/proposal/tag.tsx`](components/proposal/tag.tsx); these are the labels it renders, in
plain words:

| Label | Meaning |
| :--- | :--- |
| **Actual spend** | Money this programme has already spent. |
| **Published price** | The price the vendor publishes. |
| **Quoted** | A written quote held on file. |
| **Calculated** | Worked out from the figures beside it. |
| **Official statistic** | An official statistic or a statutory filed record. |
| **Illustrative — from sample data** | Computed from the downloadable sample files. |

Where a sentence has room for it, the running text says the same thing in words; the chip is for
table cells and headline figures.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Sample data

[`public/sample-data/`](public/sample-data/) ships **60 datasets**, each as a matched `.csv` /
`.json` pair — **120 files, 601 rows** — alongside
[`manifest.json`](public/sample-data/manifest.json), which lists every dataset's id, name, slug,
mode, country tags, filenames and row count.

Two modes, never mixed:

| Mode | Datasets | Rows | What it is |
| :--- | ---: | ---: | :--- |
| **Real extract** | 15 | 209 | A real extract from the named publisher; every row carries `source_url` and `access_date`. |
| **Synthetic sample** | 45 | 392 | A synthetic sample mirroring the provider's published field specification — illustrative values only, not vendor data and not a Ticketalay record. |

The files are served as static assets and linked for download from `/prototype`.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Local development

```bash
yarn install     # Node 22, Yarn classic — installs from the committed yarn.lock
yarn dev         # development server on http://localhost:3000
yarn build       # production build, with type-checking
yarn start       # serve the production build
```

No environment variables are required: the app reads none at runtime.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## CI and deployment

**CI** — [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and pull
request to `main`: install on Node 22, then the production-language gate, then `yarn build`.

**Deployment** — the production host tracks `main` and redeploys automatically when it advances,
serving <https://ticketalay.abacusai.cloud>. There is no second deployment target.

### Production-language gate

[`scripts/no-chrome-gate.sh`](scripts/no-chrome-gate.sh) is a build gate over the production
surface — `app/`, `lib/` and `components/`. The site is written to be read by its intended
audience as a proposal, so the gate fails the build if the shipped `.ts`/`.tsx` sources contain
review-process or working-notes language: internal register and finding identifiers, bracketed
provenance codes, pass and revision markers, access or verification dates, and similar scaffolding
vocabulary that belongs to how the document was prepared rather than to what it says. It prints
the offending file and line for each violation, or `production-language gate: clean`. Run it
locally with `bash scripts/no-chrome-gate.sh`.

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Repository layout

```
app/
  (app)/            proposal routes, wrapped by the proposal app shell
  globals.css       AB font faces, design tokens, glass-card and gold utilities
  layout.tsx        root layout — metadata, providers, chunk-load error handler
  providers.tsx     react-hot-toast Toaster
components/
  proposal/         app shell, sidebar, footer, section, tag, timeline, architecture graph
  three/            globe and particle background (three.js, client-only)
  ui/               Radix-based primitives
  layouts/          generic container, section, page-header, app-shell, auth-layout
hooks/              use-toast
lib/
  data/             all proposal content (see Data layer)
  utils.ts          cn() class merger
public/
  brand/ fonts/     AB Entertainment logo and the AB Marquee / AB Sans font files
  sample-data/      60 datasets as CSV + JSON, plus manifest.json
scripts/
  no-chrome-gate.sh production-language gate
```

<p align="center" style="color:#C9A84C">◆ ─────────────────────────────────────────────────────── ◆</p>

## Licence and ownership

Released under the MIT Licence — see [`LICENSE`](LICENSE).

The site footer reads: © 2026 Global Initiative - Ticketing Platform · A product of
**V2 Group Pty. Ltd.** · All rights reserved.

<div align="center">

<p style="color:#C9A84C;letter-spacing:0.1em">◆ ─────────────────────────────────────────────────────── ◆</p>

</div>

# Plan: Rename Investors → Collab + Dual Tracks

## 1. Route & navigation
- Add new route `/collab` rendering the renamed page; keep `/investors` as a redirect to `/collab` so old links/deck QR codes don't break.
- Update `src/components/FooterSectionV2.tsx` link label "Investors" → "Collab".
- Rename `src/pages/Investors.tsx` → `src/pages/Collab.tsx` (update import in `App.tsx`).

## 2. Collab page structure
Top of page: a single hero with a tab/segmented switcher: **Event Partners** | **Investors**. Each track shows its own narrative, CTA, and download.

### Event Partners track
- Audience copy: venues (BEXCO, COEX), conference organizers, corporate event teams.
- Value props: pilot SENS at your next event, 8+ avg connections, 9.5/10 satisfaction, AI-driven matching, contact passport across your event series.
- CTA: "Partner with us" → mailto `info@sensai.cc?subject=Event%20Partnership`.
- Secondary CTA: download the existing one-pager HTML (`public/sens-onepager.html` — to be added by user, or we reference whatever file they provide; placeholder path noted).

### Investors track
- Keep the existing 11-section deck narrative already built (Team, Problem, Solution, Flywheel, Market, Competition, Traction, Roadmap, Ask, Contact).
- CTA: "Download pitch deck" → `/sens-pitch-deck.pdf` (existing).
- Secondary CTA: mailto `info@sensai.cc?subject=Investment`.

## 3. Home page (landing) dual CTAs
- In the existing hero section of the landing page, add a second CTA so the primary pair becomes:
  - Primary: **"Partner with us"** → `/collab?track=partners`
  - Secondary: **"Invest in SENS"** → `/collab?track=investors`
- The Collab page reads `?track=` query param to preselect the correct tab.

## 4. Assets to confirm
- Confirm the existing one-pager HTML filename so we can wire the download button (e.g. `public/sens-onepager.html`). If you tell me the filename, I'll point the button at it; otherwise I'll use `sens-partner-onepager.html` as the expected path.

## Technical notes
- React Router redirect: `<Route path="/investors" element={<Navigate to="/collab" replace />} />`.
- Tab state: `useState<'partners' | 'investors'>` initialized from `useSearchParams()`.
- Reuse existing animation/section components inside the Investors track; build a sibling `<PartnersTrack />` component in the same file for now.
- No backend/business-logic changes.

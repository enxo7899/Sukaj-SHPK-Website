# Sukaj SHPK Industrial Luxury Redesign

Date: 2026-02-15
Status: Approved for implementation

## Objective

Transform the current site into a premium "industrial luxury" portfolio experience that communicates scale, precision, and modern engineering while preserving performance, accessibility, and SEO.

## Design Direction

- Visual language: dark steel surfaces, restrained safety orange accents, hydraulic cyan technical accents, glass/metal UI layers.
- Typography: massive uppercase display headlines paired with technical mono body/caption text.
- Motion: mechanical and deliberate, not playful; include panel split reveals, magnetic controls, and staged scroll choreography.
- Narrative: hero > ecosystem > drill-down categories > technical catalog > fluid timeline > CTA.

## Asset Strategy (Option 1)

- Source license-safe premium assets:
  - 3D spiral/corrugated pipe GLB model for hero.
  - Cinematic industrial logistics/truck hero loop video.
  - Partner tile hover videos for ecosystem cards.
  - Sprite sequence fallback rendered from the same 3D model for mobile.
- Introduce centralized asset manifest to manage URLs/paths and fallback behavior.
- Keep graceful fallback visuals if any media fails to load.

## Hero Experience

- Full-bleed cinematic video background with dot-matrix/noise overlays.
- Headline "SUKAJ INFRASTRUCTURE" with mechanical split-on-scroll reveal.
- 3D pipe in an inspection-bay style frame with tuned PBR materials and controlled reflections.
- Interaction:
  - Desktop: drag-to-rotate with damped inertia; conditional auto-rotate.
  - Mobile: sprite-sheet sequence fallback (no heavy WebGL path).
- Bottom floating dock with industrialized macOS-style magnetic interaction.

## Partners Ecosystem (Bento)

- Asymmetric bento:
  - Konti: 2x2
  - FITT: 1x2
  - Plastika-ks: 1x1
- Hover behavior: play media in active tile, dim/desaturate inactive tiles.
- Click behavior: expand tile to mini-app detail panel.
- Mobile behavior: horizontal snap-scroll feed with active-card focus.

## Smart Catalog

- Sidebar filters: Material, Application, Diameter (12-2000mm slider).
- Replace generic card feel with blueprint aesthetics:
  - technical grid lines
  - measurement callouts
  - structured spec hierarchy
- Konti scale reference: human silhouette overlay with clear ratio annotation.
- Better filter UX: chips, clear-all, count feedback, useful empty states.

## Timeline Story

- Center vertical pipe as progress conduit.
- Animated "fluid fill" tied to scroll progress.
- Milestones unlock as fill reaches each stage.
- 2024 Arol-Plast event visually emphasized as Trader -> Manufacturer transition.

## Performance and Technical Requirements

- Lazy-load heavy media and 3D layers.
- Ensure responsive behavior and 60fps target on mobile by using sprite fallback.
- Keep `next/image` for image assets and optimized loading strategy for videos.
- Maintain and extend JSON-LD for `Corporation` and `WholesaleStore`.
- Validate WCAG AA contrast for accent combinations.

## Implementation Notes

- Preserve existing project structure and tech stack (Next.js App Router, TypeScript, Tailwind, Framer Motion, R3F, shadcn).
- Add only necessary libraries if required for safe media handling.
- Avoid introducing visual purple bias; keep palette anchored in steel/orange/cyan/green.

## Validation Plan

- Build must pass (`npm run build`).
- Verify responsive behavior on mobile and desktop.
- Confirm no runtime errors in hero media/3D fallback pathways.
- Start local server on `localhost:3000` for user review.

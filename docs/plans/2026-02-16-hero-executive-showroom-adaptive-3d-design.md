# Hero Redesign Design: Executive Showroom Adaptive 3D

## Goal

Deliver a flawless first-screen hero that feels premium and professional while loading reliably on real devices. The hero must preserve high-end 3D product storytelling on capable devices and degrade gracefully to an equally polished fallback on constrained devices.

## Product Direction

- Visual tone: Executive Industrial (luxury B2B, not flashy).
- Conversion priority: `Explore Catalog` as primary CTA.
- Experience priority: stable, fast, intentional rendering across laptop and mobile.

## Hero Composition

- First-frame occupancy: full viewport (`100svh`) with no clipping in the primary scroll frame.
- Vertical hierarchy:
  - credibility strip,
  - two-column core content,
  - enlarged quick-access dock.
- Left column content:
  - H1 `SUKAJ SHPK`,
  - H2 `Industrial Plastic Pipe Systems`,
  - structured “who / what / why” body copy,
  - CTA pair (`Explore Catalog` primary, `Contact Sales` secondary),
  - proof statements.
- Right column content:
  - premium product theater panel with 3D or premium fallback,
  - technical labels for product context.

## Adaptive 3D Strategy

- Two 3D quality tiers:
  - **Premium tier (desktop/high capability)** for richest model and lighting.
  - **Lite tier (mobile capable)** with reduced geometry/material cost and lower DPR.
- Capability gate inputs:
  - WebGL availability,
  - network conditions,
  - device memory / CPU cores,
  - reduced-motion preference.
- Decision matrix:
  - capable desktop -> premium 3D,
  - capable mobile -> lite 3D,
  - constrained devices -> premium fallback preview.
- Fail-safe behavior:
  - timeout, load failure, context loss -> immediate fallback.
  - no blank panel state allowed.

## 3D Panel Information Design

- Title label: `PIPE SYSTEM PREVIEW`.
- Technical markers: `HDPE / PVC`, `DN 20-2000`.
- Interaction label:
  - `Drag to Inspect` when 3D is active,
  - `Preview Mode` when fallback is active.
- Branding on product: subtle premium `SUKAJ SHPK` mark with elegant material treatment.

## Motion and Interaction

- Auto-loop by default with slow showroom cadence.
- User drag/touch inspection enabled when 3D is active.
- Motion quality: restrained, smooth, non-gimmicky.
- Reduced-motion mode:
  - disable/flatten continuous movement,
  - keep visual hierarchy and clarity intact.

## Mobile Fallback Quality

- Fallback must look premium, not “missing feature.”
- Maintain same panel structure and metadata chips.
- Keep animated product preview feel with high visual consistency to desktop hero.

## Performance and Reliability Targets

- Reduce model transfer and render burden for mobile tier.
- Avoid eager heavy 3D loading on constrained devices.
- Keep hero first paint stable and avoid visual pop-in.
- Ensure robust runtime resilience for production deployment conditions.

## Acceptance Criteria

- On capable phones: 3D appears quickly and remains smooth.
- On constrained phones: polished fallback appears immediately.
- On desktop/laptop: premium 3D remains visually rich and responsive.
- Hero hierarchy reads as premium and conversion-ready.
- Dock controls are visibly larger and easier to scan.
- No blank or broken 3D states in deployment.

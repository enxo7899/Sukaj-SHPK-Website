# Hero Redesign Design: Executive Product Showcase

## Goal

Deliver a premium, executive-grade hero section for Sukaj SHPK that feels credible, high-value, and conversion-focused for B2B buyers. The hero must be full-screen on first view, visually polished, and product-authentic with a refined 3D pipe preview.

## Design Direction

- Tone: Executive Industrial (clean, premium, restrained).
- Conversion priority: `Explore Catalog` as primary CTA.
- Emotional target: confidence, competence, and quality.
- Visual target: dark luxury base with precise accent use, no noisy/gimmicky effects.

## Layout Blueprint

- Full-screen frame: hero occupies first viewport (`100svh`) with balanced vertical rhythm.
- Three vertical zones:
  - Top: compact credibility strip.
  - Middle: two-column core (message left, product stage right).
  - Bottom: enlarged quick-access dock (CIVIL / AGRI / INDUSTRIAL / ABOUT).

### Left Column (Message)

- H1: `SUKAJ SHPK`.
- H2: `Industrial Plastic Pipe Systems`.
- Tagline line for technical clarity.
- Structured body paragraph with three points:
  - who we are,
  - what we deliver,
  - why it matters for project outcomes.
- CTA row:
  - Primary: `Explore Catalog`.
  - Secondary: `Contact Sales`.
- Two compact proof cards:
  - `Diameter Coverage: DN 20-2000`.
  - `Execution Model: Import + Local Production Support`.

### Right Column (3D Product Stage)

- Premium single-pipe presentation.
- Fully centered and fully visible in initial camera framing.
- Product labels:
  - `HDPE / PVC`,
  - `DN 20-2000`,
  - `Interactive Preview`.
- Model branding: subtle luxury `SUKAJ SHPK` mark integrated on pipe surface.

## Visual Language

- Background: layered navy/black industrial gradient with subtle grid/dot technical texture.
- Accent strategy:
  - warm accent for key actions and premium highlight,
  - cool accent for technical context only.
- Borders and surfaces: refined low-contrast separators and glass-depth used sparingly.
- Typography hierarchy:
  - H1 authority-heavy,
  - H2 engineered elegance (tracking control),
  - readable body with strict line-length discipline.

## 3D Behavior and Interaction

- Default mode: continuous, smooth showroom loop (professional low-speed rotation).
- Interaction mode: user drag rotates model with damping and constrained camera angles.
- Post-interaction: auto-loop should remain graceful and continuous.
- Lighting: controlled key/fill/rim setup to preserve body detail and branding readability.

## Motion System

- Entry sequence (staggered):
  1) headline,
  2) support copy,
  3) CTAs,
  4) proof cards,
  5) 3D panel,
  6) dock.
- Timing: restrained (roughly 400-700ms blocks), no playful bouncing.
- Hover behavior: subtle lift/contrast changes only.

## Responsive Behavior

- Desktop: full two-column composition with maximum clarity.
- Large screens: widened shell and spacing to avoid narrow appearance.
- Tablet/mobile: simplified hierarchy with preserved CTA clarity and sprite fallback for model.
- First-screen objective: no awkward overflow or clipped core content.

## Success Criteria

- Hero looks premium and intentional at first glance.
- 3D preview appears product-authentic and centered.
- Branding on pipe is visible yet elegant.
- Dock labels/icons are clearly legible and larger.
- Primary CTA (`Explore Catalog`) is visually dominant and business-appropriate.

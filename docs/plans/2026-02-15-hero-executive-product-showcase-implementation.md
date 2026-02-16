# Hero Executive Product Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a premium full-screen executive hero for Sukaj SHPK with stronger information hierarchy, improved 3D product presentation, refined branding, and larger/clearer quick-access dock controls.

**Architecture:** Update hero composition in-place using existing App Router component boundaries. Keep the custom generated GLB pipeline, but refine geometry/material/branding details through the model generation script and viewer settings. Use progressive enhancement: desktop WebGL pipeline with controlled interaction, mobile sprite fallback unchanged.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, React Three Fiber, Drei, Three.js GLTFExporter.

---

### Task 1: Full-Screen Hero Frame and Spacing Rhythm

**Files:**
- Modify: `src/components/hero.tsx`

**Step 1: Write the failing test**

Reference a new layout utility class `hero-first-screen` in `src/components/hero.tsx` before defining it.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for missing class usage contract/visual regression target.

**Step 3: Write minimal implementation**

Implement full-screen first-frame behavior and vertical rhythm:
- ensure hero root uses `100svh` behavior,
- ensure content stack fits first viewport cleanly,
- tighten top/middle/bottom spacing for no overflow clipping.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat: enforce full-screen executive hero frame"
```

### Task 2: Informative Executive Copy and Structured Messaging

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/lib/data.ts`

**Step 1: Write the failing test**

Add references to two new copy blocks (`heroValueStatement`, `heroSupportPoints`) before defining or using final content structure.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL due to undefined references.

**Step 3: Write minimal implementation**

Implement structured informative copy:
- concise technical tagline,
- 2-3 sentence value paragraph,
- two compact proof cards for coverage and execution model,
- maintain `Explore Catalog` primary CTA emphasis.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/lib/data.ts
git commit -m "feat: structure hero messaging for executive b2b clarity"
```

### Task 3: 3D Preview Information Layer and Interaction Quality

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/hero/pipe-viewer-3d.tsx`

**Step 1: Write the failing test**

Add references to preview metadata overlays (`DN 20-2000`, `HDPE/PVC`, interaction hint) and interaction tuning constants before wiring them.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for missing constants or unresolved JSX references.

**Step 3: Write minimal implementation**

Implement:
- clean, non-intrusive technical labels in 3D panel,
- continuous professional auto-rotation loop,
- drag rotation with damping and constrained controls,
- balanced camera framing to preserve full model visibility.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/components/hero/pipe-viewer-3d.tsx
git commit -m "feat: improve hero 3d preview information and interaction polish"
```

### Task 4: Premium Pipe Branding and Geometry Refinement

**Files:**
- Modify: `scripts/generate-premium-pipe-glb.mjs`
- Regenerate: `public/media/models/sukaj-premium-pipe.glb`

**Step 1: Write the failing test**

Introduce a new branding style target in script variables (subtle luxury mark settings) before applying them.

**Step 2: Run test to verify it fails**

Run: `node "scripts/generate-premium-pipe-glb.mjs"`
Expected: FAIL or incomplete output if variable not wired.

**Step 3: Write minimal implementation**

Refine generated model:
- keep open pipe interior,
- ensure connector/socket shapes are complete and realistic,
- tune branding text geometry/material for subtle luxury look,
- keep only `SUKAJ SHPK` mark.

**Step 4: Run test to verify it passes**

Run:
- `node "scripts/generate-premium-pipe-glb.mjs"`
- `npm run build`
Expected: GLB regenerated and build PASS.

**Step 5: Commit**

```bash
git add scripts/generate-premium-pipe-glb.mjs public/media/models/sukaj-premium-pipe.glb
git commit -m "feat: refine premium pipe model geometry and brand mark"
```

### Task 5: Enlarged Dock Controls and Final Hero Polish

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**

Reference enlarged dock sizing tokens/classes before defining final values.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for missing class tokens/references.

**Step 3: Write minimal implementation**

Implement final dock polish:
- larger icon containers and larger labels,
- improved spacing and click targets,
- cleaner contrast and hover states consistent with executive tone.

**Step 4: Run test to verify it passes**

Run:
- `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/app/globals.css
git commit -m "feat: finalize hero dock scale and executive polish"
```

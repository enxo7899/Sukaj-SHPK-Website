# Sukaj SHPK Industrial Luxury Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver a high-end industrial luxury redesign with real media assets, upgraded hero 3D/sprite fallback, richer bento interactions, blueprint catalog visuals, and fluid timeline while preserving performance, accessibility, and SEO.

**Architecture:** Introduce a centralized asset manifest and progressive enhancement strategy: cinematic media + 3D on capable devices, sprite fallback on mobile/low-power paths. Keep App Router structure and refactor sections in isolated component updates to reduce risk.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, React Three Fiber/Drei, shadcn/ui.

---

### Task 1: Asset Manifest + Local Media Structure

**Files:**
- Create: `src/lib/assets.ts`
- Create: `public/media/hero/README.md`
- Create: `public/media/partners/README.md`
- Create: `public/media/models/README.md`
- Create: `public/media/sprites/README.md`
- Modify: `src/lib/data.ts`

**Step 1: Write the failing test**

Add a TypeScript usage in `src/components/hero.tsx` that imports `heroMedia` from `src/lib/assets.ts` before creating the file.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with module not found for `@/lib/assets`.

**Step 3: Write minimal implementation**

Create `src/lib/assets.ts` with typed media descriptors:
- hero video sources (`mp4`, optional `webm`)
- 3D model path (`glb`)
- sprite sheet metadata (`frameCount`, `columns`, `rows`, `width`, `height`)
- partner tile video map by partner id.

Add README placeholder contracts in `public/media/**` directories.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS import resolution for assets module.

**Step 5: Commit**

```bash
git add src/lib/assets.ts public/media src/lib/data.ts
git commit -m "chore: add typed media manifest and asset structure"
```

### Task 2: Hero Cinematic Refactor + 3D GLB Loader

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/hero/pipe-viewer-3d.tsx`
- Create: `src/components/hero/pipe-viewer-sprite.tsx`

**Step 1: Write the failing test**

Replace current procedural torus scene usage with imports of `PipeViewer3D` and `PipeViewerSprite` components before they exist.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with missing component files.

**Step 3: Write minimal implementation**

Implement:
- cinematic hero video background with overlay stack
- split-on-scroll headline choreography
- `PipeViewer3D` using `useGLTF` + tuned materials/lights
- mobile fallback `PipeViewerSprite` (frame-animated sheet)
- dock magnetic interaction and mechanical button feedback.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS with no R3F type/runtime compile issues.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/components/hero src/app/globals.css
git commit -m "feat: redesign hero with cinematic media and 3d/sprite viewers"
```

### Task 3: Partners Bento Media Interactions

**Files:**
- Modify: `src/components/bento-grid.tsx`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**

Introduce `partnerVideos` manifest usage in bento tiles before wiring fallback logic.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL due to missing null-safe map access or unresolved keys.

**Step 3: Write minimal implementation**

Add:
- hover playback video in tile
- dim/desaturate non-hovered tiles
- expanded mini-app panel on click with motion layout
- mobile snap-scroll feed behavior.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS with no hydration/type issues.

**Step 5: Commit**

```bash
git add src/components/bento-grid.tsx src/app/globals.css
git commit -m "feat: upgrade partner bento with interactive media behavior"
```

### Task 4: Blueprint Catalog Visual Upgrade + Scale Overlay

**Files:**
- Modify: `src/components/catalog.tsx`
- Modify: `src/app/catalog/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**

Add references to new CSS utility classes for blueprint cards before adding those utilities.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL due to undefined class usage or compile issues from missing structures.

**Step 3: Write minimal implementation**

Implement:
- stronger blueprint spec-card style
- refined 12-2000 diameter UI semantics
- Konti scale reference silhouette and dimension callouts
- improved empty/filter states and chip clarity.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS with catalog route rendering cleanly.

**Step 5: Commit**

```bash
git add src/components/catalog.tsx src/app/catalog/page.tsx src/app/globals.css
git commit -m "feat: redesign catalog as blueprint-driven technical interface"
```

### Task 5: Fluid Timeline Story Emphasis

**Files:**
- Modify: `src/components/timeline.tsx`
- Modify: `src/lib/data.ts`

**Step 1: Write the failing test**

Reference new milestone emphasis fields for trader/manufacturer transition before adding data fields.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with type errors on missing fields.

**Step 3: Write minimal implementation**

Implement:
- improved fluid fill animation behavior
- unlock transitions tied to viewport progress
- highlighted 2024 transition block with explicit copy.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS with timeline rendering on home/about.

**Step 5: Commit**

```bash
git add src/components/timeline.tsx src/lib/data.ts
git commit -m "feat: enhance timeline with fluid unlock storytelling"
```

### Task 6: SEO, Accessibility, and Final Verification

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/navigation.tsx`
- Modify: `src/components/cta.tsx`

**Step 1: Write the failing test**

Add `WholesaleStore` schema generation call before implementing the schema object.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for undefined schema helper/object.

**Step 3: Write minimal implementation**

Implement:
- complete `Corporation` + `WholesaleStore` JSON-LD
- contrast-sensitive class adjustments for AA compliance
- final responsive polish and nav/cta consistency.

**Step 4: Run test to verify it passes**

Run:
- `npm run lint`
- `npm run build`
Expected: PASS for both.

**Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/navigation.tsx src/components/cta.tsx
git commit -m "feat: finalize seo accessibility and polish for industrial luxury redesign"
```

### Task 7: Local Runtime Verification

**Files:**
- No source changes required.

**Step 1: Run dev server**

Run: `npm run dev -- --port 3000`
Expected: app boots at `http://localhost:3000`.

**Step 2: Manual verification checklist**

- Hero video plays and overlays render.
- 3D viewer works on desktop.
- Sprite fallback appears on mobile viewport.
- Bento hover/click interactions work.
- Catalog filters and scale overlay work.
- Timeline fluid unlock behavior is smooth.

**Step 3: Report status**

Document results and any remaining asset swaps.

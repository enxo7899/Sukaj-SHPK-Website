# Hero Executive Showroom Adaptive 3D Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a premium, full-screen executive hero that preserves high-end quality while delivering reliable adaptive 3D behavior across desktop and mobile devices.

**Architecture:** Keep the current hero component architecture but split product preview rendering into deterministic capability tiers: desktop premium 3D, mobile lite 3D, and polished fallback preview. Improve hero visual hierarchy and structured copy without changing core route structure. Add runtime safety and performance guardrails so deployment behavior stays consistent under weak networks and constrained devices.

**Tech Stack:** Next.js App Router, React/TypeScript, Tailwind CSS v4, Framer Motion, React Three Fiber, Drei, Three.js GLTFExporter.

---

### Task 1: Capability Matrix and Preview Mode Controller

**Files:**
- Modify: `src/components/hero.tsx`
- Create: `src/lib/preview-capability.ts`

**Step 1: Write the failing test**

Reference a new helper `resolvePreviewMode()` in `src/components/hero.tsx` before creating `src/lib/preview-capability.ts`.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with unresolved import for `@/lib/preview-capability`.

**Step 3: Write minimal implementation**

Create capability helper that returns one of:
- `desktop-premium-3d`
- `mobile-lite-3d`
- `fallback-preview`

Use inputs:
- viewport bucket,
- WebGL support,
- network/save-data,
- device memory/cores,
- reduced-motion.

Wire mode selection into `src/components/hero.tsx` and use this mode as single source of truth for labels and renderer selection.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/lib/preview-capability.ts
git commit -m "feat: add deterministic preview capability mode selector"
```

### Task 2: Premium and Lite 3D Viewer Split

**Files:**
- Modify: `src/components/hero/pipe-viewer-3d.tsx`
- Modify: `src/lib/assets.ts`
- Modify: `scripts/generate-premium-pipe-glb.mjs`
- Create/Regenerate: `public/media/models/sukaj-premium-pipe.glb`
- Create/Regenerate: `public/media/models/sukaj-lite-pipe.glb`

**Step 1: Write the failing test**

Reference `pipeModel.liteGlb` in `pipe-viewer-3d.tsx` before adding it to `src/lib/assets.ts`.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with missing `liteGlb` property.

**Step 3: Write minimal implementation**

Implement dual model rendering path:
- `premium` model path for desktop,
- `lite` model path for capable mobile.

Update generation script to output both models with different geometry densities.
Keep brand mark quality and open-pipe visual authenticity in both tiers.

**Step 4: Run test to verify it passes**

Run:
- `node "scripts/generate-premium-pipe-glb.mjs"`
- `npm run build`

Expected: both GLBs generated and build PASS.

**Step 5: Commit**

```bash
git add scripts/generate-premium-pipe-glb.mjs src/lib/assets.ts src/components/hero/pipe-viewer-3d.tsx public/media/models/sukaj-premium-pipe.glb public/media/models/sukaj-lite-pipe.glb
git commit -m "feat: add adaptive premium and lite 3d pipe model tiers"
```

### Task 3: Premium Fallback Preview Redesign

**Files:**
- Modify: `src/components/hero/pipe-viewer-sprite.tsx`
- Modify: `src/components/hero.tsx`

**Step 1: Write the failing test**

Add references in hero to a new fallback label variant (`Preview Mode`) and premium fallback card state classes before implementing fallback styling updates.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with unresolved class/reference usage.

**Step 3: Write minimal implementation**

Redesign fallback to feel premium:
- stronger product framing,
- smoother animation cadence,
- aligned metadata chips,
- no misleading interactive instruction text.

Ensure fallback appears instantly when selected mode is `fallback-preview`.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero/pipe-viewer-sprite.tsx src/components/hero.tsx
git commit -m "feat: redesign fallback preview with premium hero panel styling"
```

### Task 4: Hero Visual Polish and Information Architecture

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/lib/data.ts`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**

Introduce references for revised hero copy tokens and updated dock sizing utility classes before implementing them.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for unresolved references/classes.

**Step 3: Write minimal implementation**

Implement final executive polish:
- stronger structured copy (who/what/why),
- refined proof cards,
- calibrated spacing and typography,
- larger dock controls with premium hover states,
- maintain first-screen fit across breakpoints.

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/hero.tsx src/lib/data.ts src/app/globals.css
git commit -m "feat: finalize executive hero structure and visual hierarchy"
```

### Task 5: Runtime Resilience and Validation Pass

**Files:**
- Modify: `src/components/hero/pipe-viewer-3d.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `docs/assets-sources.md`

**Step 1: Write the failing test**

Reference explicit runtime status labels for preview mode diagnostics in hero before wiring status handling.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL for unresolved diagnostic/status references.

**Step 3: Write minimal implementation**

Finalize resilience:
- timeout + context-loss + render error fallbacks verified,
- ensure no blank state regardless of mode,
- update asset docs with premium/lite model details.

**Step 4: Run test to verify it passes**

Run:
- `npm run build`
- `npm run dev -- --port 3000`

Expected: build PASS and manual checks validate:
- capable mobile uses lite 3D,
- constrained mobile uses premium fallback,
- desktop uses premium 3D.

**Step 5: Commit**

```bash
git add src/components/hero/pipe-viewer-3d.tsx src/components/hero.tsx docs/assets-sources.md
git commit -m "fix: harden adaptive hero preview runtime behavior"
```

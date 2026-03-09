# Hero Animation Implementation - Session Context

## Overview

This document summarizes the complete implementation of the hero section animation for Sukaj SH.P.K website. It serves as context for future development sessions.

---

## Initial Problem

The hero section animation was:
- Very slow and glitchy
- Using React state updates every frame (causing 60 re-renders per second)
- Had 25+ DOM nodes per pipe (individual rib elements)
- Variable timestep physics causing inconsistent behavior
- No branding on pipes
- Background animations competing for GPU resources

---

## Final Solution Architecture

### Files Modified/Created

#### 1. Physics Engine - `src/hooks/use-matter-physics.ts`
**Complete rewrite** - New architecture:
- **Direct DOM manipulation via refs** - Zero React re-renders per frame
- **Fixed timestep accumulator** - 16.667ms steps, max 4 sub-steps for stable physics
- **Looping mechanism** - Pipes drop → settle → fade out → reset → repeat (3.2s pause, 700ms fade)
- **Resize observer** - Restarts simulation on container resize
- **Proper cleanup** - Disposed flags, RAF cancellation, timeout clearing

Key constants:
```typescript
gravityY: 1.4
timeScale: 1.15
fixedDt: 16.667
maxSubSteps: 4
loopPauseMs: 3200
loopFadeMs: 700
```

#### 2. Pipe Visuals - `src/components/ui/corrugated-pipe.tsx`
**Complete rewrite** - CSS-based industrial pipe rendering:
- **CSS `repeating-linear-gradient`** for corrugation ribs (0 extra DOM nodes vs 25+)
- **7-stop cylindrical gradient** for realistic pipe shading
- **Industrial markings** per pipe with brand name, material type, and standards
- **Dual cyan marking stripes** at 68%/72% height (authentic pipe marking lines)
- **Small realistic end caps** (0.28 ratio with 4% top/bottom inset)
- **Darker grey branding text** (`rgba(71,85,105,0.5)`) for better contrast

#### 3. Physics Configuration - `src/lib/physics-config.ts`
**Complete rewrite** - 6 desktop / 4 mobile pipe presets:

**Desktop pipes (6 total):**
- Heights: 76-90px
- Widths: 400-490px
- Lower restitution (0.21-0.26) for faster settling, less bouncing
- Authentic industrial markings:
  - `SUKAJ SH.P.K — PE100 HDPE`
  - `M&L SUKAJ · EN 13476 · SN8`
  - `SUKAJ — PP · ISO 9001`
  - `HDPE PE100 — SUKAJ SH.P.K`
  - `SUKAJ · PVC · EN 12201`
  - `M&L SUKAJ — HDPE DN/OD 315`

**Mobile pipes (4 total):**
- Heights: 52-58px
- Widths: 240-270px
- Same physics properties, scaled down

#### 4. Background - `src/components/ui/background-paths.tsx`
**Complete rewrite** - Pure CSS animations:
- Replaced all framer-motion animations with CSS `@keyframes`
- Removed animated SVG pattern (major GPU drain)
- 2 CSS-animated ambient orbs + static dot grid + 2 light streaks
- Zero JavaScript animation overhead

#### 5. Hero Container - `src/components/hero-ultimate.tsx`
**Cleanup** - Removed redundant elements:
- Removed 3 redundant framer-motion aurora blobs (duplicated BackgroundPaths)
- Kept scroll parallax and stagger animations for content
- Simplified background layers

#### 6. Pipe Container - `src/components/ui/falling-pipes.tsx`
**Complete rewrite** - Ref-based architecture:
- SSR-safe `isMobile` detection via `useState` + `useEffect`
- `pipeCount` trigger ensures physics restarts when pipe count changes
- Wrapper ref for fade transitions during loops

---

## Cleanup - Removed Dead Code

### Deleted Files:
- `src/lib/assets.ts` (unused pipe model references)
- `src/lib/performance.ts` (unused performance context)
- `public/media/models/` (4 GLB files - replaced by CSS)
- `public/media/sprites/` (unused sprite sheet)
- `scripts/generate-premium-pipe-glb.mjs` (obsolete)
- `docs/plans/` (old planning documents)
- `LOGO_BACKGROUND_REMOVAL.md`
- `TRANSFORMATION_SUMMARY.md`
- `WEBSITE_REDESIGN_COMPLETE.md`
- `PROJECT_DOCUMENTATION.md`

---

## Build Verification

All changes verified with:
```bash
rm -rf .next node_modules/.cache
npx next build
npm run dev
```

**Result:** Zero errors, zero warnings. Clean production build.

---

## Performance Characteristics

| Aspect | Before | After |
|--------|--------|-------|
| React re-renders/frame | 60+ | 0 |
| DOM nodes per pipe | ~25 | 1 |
| Physics stability | Variable timestep | Fixed timestep |
| Total desktop pipes | 5 | 6 |
| Animation type (bg) | JS framer-motion | CSS keyframes |
| Loop mechanism | None | Fade in/out loop |
| Branding visibility | None | Dark grey, visible |
| End cap realism | 50% ratio | 28% ratio |

---

## Technical Stack

- **Framework:** Next.js 16.1.6 (Turbopack)
- **Physics:** Matter.js (fixed timestep, sleeping enabled)
- **Animation:** CSS @keyframes (background), direct DOM transforms (pipes)
- **Rendering:** Ref-based, zero React state during animation
- **Styling:** Tailwind CSS + inline styles for dynamic dimensions

---

## Key Insights for Future Development

1. **Never use React state for per-frame animation** - Always use refs + direct DOM manipulation
2. **Fixed timestep physics** is essential for consistent behavior across devices
3. **CSS gradients** can replace complex DOM structures (25 divs → 1 gradient)
4. **Industrial authenticity** matters - real pipe markings, realistic proportions
5. **Cache clearing** is often necessary when HMR gets stuck on old versions

---

## Current State

- ✅ Build passes with zero errors
- ✅ Dev server running on http://localhost:3000
- ✅ 6 desktop pipes, 4 mobile pipes
- ✅ Realistic physics with looping animation
- ✅ Visible industrial branding on all pipes
- ✅ Clean file structure (dead code removed)
- ✅ Ready for production deployment

---

## Next Steps (User's Decision)

User indicated moving on to other parts of the website. Hero section is finalized.

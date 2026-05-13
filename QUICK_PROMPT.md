# Quick Analysis Prompt (Copy & Paste This)

Analyze the Sukaj SHPK Website (https://github.com/enxo7899/Sukaj-SHPK-Website.git) and create a comprehensive improvement plan.

## Your Task:

1. **Pull latest code**: `git pull origin main`

2. **Deep analysis of entire codebase**:
   - Read ALL files in `/src/app/`, `/src/components/`, `/src/hooks/`, `/src/lib/`
   - Analyze architecture, code quality, performance, accessibility, UX/UI
   - Identify what makes it feel "vibe-coded" vs professional

3. **Critical focus: Hero Section**
   - Current implementation uses Matter.js physics for falling pipes animation
   - Files: `hero-ultimate.tsx`, `use-matter-physics.ts`, `falling-pipes.tsx`, `corrugated-pipe.tsx`, `physics-config.ts`
   - **Problem**: Feels gimmicky, not professional enough for a portfolio piece
   - **Your job**: Design a sophisticated, modern hero section that's fast, accessible, and impressive

4. **Deliver comprehensive plan**:
   - Executive summary of findings
   - Critical issues (P0, P1, P2 priorities)
   - Complete hero section redesign strategy with code approach
   - Component-by-component improvement recommendations
   - Performance optimization plan
   - Implementation roadmap with time estimates

## Requirements:

- This must be **portfolio-quality**, not just "good enough"
- Remove the Matter.js physics animation - replace with something professional
- Modern design trends (2024-2026)
- Perfect mobile experience
- Fast performance (Core Web Vitals)
- WCAG 2.1 AA accessibility
- Clean, maintainable TypeScript
- Next.js 16 + React 19 best practices

## Tech Stack:
- Next.js 16.1.6, React 19.2.3
- Tailwind CSS v4
- Framer Motion
- shadcn/ui
- TypeScript

## Deliverable Format:

```markdown
# Analysis & Improvement Plan

## Executive Summary
[Your findings]

## Critical Issues
[Prioritized list with file references]

## Hero Section Redesign
### Current Problems
[Analysis]

### Proposed Solution
[Design concept + technical approach]

## Complete Improvement Plan
[Categorized recommendations]

## Implementation Roadmap
### Phase 1: Quick Wins (1-2h)
### Phase 2: Hero Redesign (4-6h)
### Phase 3: Site-Wide Polish (3-4h)
### Phase 4: QA (1-2h)
```

**Be thorough, be honest, be specific. This is a portfolio piece - every detail matters.**

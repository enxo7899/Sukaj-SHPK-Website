# Sukaj SHPK Website - Complete Codebase Documentation

## Project Overview

**Sukaj SHPK** is a visually stunning, high-performance corporate website for a premier Balkan infrastructure distributor. This is NOT a standard B2B catalog—this is a Portfolio Piece designed to translate massive industrial scale (2000mm pipes, 200k sqm factories) into a digital experience that feels premium, weighty, and precision-engineered.

### Core Philosophy: "The Infrastructure of Tomorrow"
The user should feel like they are interacting with high-tech machinery, not just scrolling a webpage.

### Aesthetic: "Industrial Luxury" / High-End Portfolio / Apple-meets-Heavy-Industry

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x (App Router) | React framework with SSR/SSG |
| TypeScript | 5.x | Type-safe development |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | Latest | Animations and gestures |
| React Three Fiber | Latest | 3D rendering with Three.js |
| React Three Drei | Latest | 3D helpers and abstractions |
| Three.js | Latest | 3D graphics library |
| Lucide React | Latest | Icon library |
| Shadcn/UI | Latest | UI component primitives |
| clsx + tailwind-merge | Latest | Conditional class handling |

---

## Design System (Industrial Luxury)

### Color Palette (Dark Mode First)

```css
/* Backgrounds */
--background: #020617;        /* Deep Void - bg-slate-950 */
--surface: #0f172a;          /* Industrial Steel - bg-slate-900 */
--card: rgba(255,255,255,0.05);  /* Glassmorphism surface */

/* Primary Accent */
--primary: #f97316;          /* Safety Orange - text-orange-500 */
--primary-foreground: #020617;

/* Secondary Accent */
--accent: #22d3ee;           /* Hydraulic Blue - text-cyan-400 */
--accent-foreground: #020617;

/* Utility Colors */
--industrial-green: #22c55e;
--industrial-purple: #a855f7;
--industrial-red: #ef4444;

/* Borders */
--border: rgba(255,255,255,0.10);
--ring: #f97316;
```

### Typography (Swiss/Brutalist)

- **Display/Headings**: Inter font, uppercase, massive letter-spacing, heavy weight (700-900)
- **Example**: "INFRASTRUCTURE." not "Infrastructure"
- **Body**: Inter font, regular weight (400-500)
- **Technical/Mono**: JetBrains Mono, small text, technical look
- **Pattern**: Headlines use `tracking-tight` or `tracking-wider` for emphasis

### UI Patterns ("The Wow Factors")

1. **The Bento Grid**: Partner ecosystem displayed in responsive Apple-style grid
2. **Parallax Drill-Down**: z-index and scale shifts on scroll simulating "digging" underground
3. **Micro-Interactions**: Magnetic pull buttons, mechanical "click" animations
4. **Glassmorphism**: `bg-white/5 backdrop-blur-md border-white/10`
5. **Dot Matrix**: Radial gradient pattern overlay for industrial texture
6. **Grid Lines**: Blueprint-style background patterns

### Custom CSS Utilities (globals.css)

```css
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
}

.text-gradient {
  background: linear-gradient(135deg, #f97316 0%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dot-matrix {
  background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.grid-lines {
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.glow-orange {
  box-shadow: 0 0 20px rgba(249,115,22,0.3), 0 0 40px rgba(249,115,22,0.1);
}
```

---

## Project File Structure

```
/Users/enxom/Desktop/sukaj-shpk-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage (Hero, Bento, Categories, Timeline, CTA)
│   │   ├── layout.tsx                # Root layout with fonts, SEO, JSON-LD
│   │   ├── globals.css               # Global styles, CSS variables, utilities
│   │   ├── catalog/
│   │   │   └── page.tsx              # Product catalog with filters
│   │   ├── about/
│   │   │   └── page.tsx              # About page with Timeline, Stats, Sustainability
│   │   ├── partners/
│   │   │   └── page.tsx              # Partners detail page
│   │   └── contact/
│   │       └── page.tsx              # Contact form page
│   │
│   ├── components/                   # React components
│   │   ├── hero.tsx                  # Hero section with 3D pipe model
│   │   ├── bento-grid.tsx            # Partner ecosystem Bento Grid
│   │   ├── catalog.tsx               # Smart catalog with filters and Spec Cards
│   │   ├── categories.tsx            # Industry solutions grid
│   │   ├── timeline.tsx              # Company history timeline with pipe animation
│   │   ├── stats.tsx                 # Animated statistics counters
│   │   ├── cta.tsx                   # Call-to-action section
│   │   ├── navigation.tsx            # Header navigation with glassmorphism
│   │   └── footer.tsx                # Footer component
│   │
│   ├── lib/
│   │   ├── data.ts                   # All company data, partners, products, timeline
│   │   └── utils.ts                  # Utility functions (cn helper)
│   │
│   └── components/ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── slider.tsx
│       ├── card.tsx
│       └── dialog.tsx
│
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration (if using v3)
├── components.json                   # shadcn/ui configuration
└── package.json                      # Dependencies
```

---

## Data Structure (src/lib/data.ts)

### Company Information
```typescript
export const company = {
  name: "Sukaj SHPK",
  established: 1995,
  capital: "74.4M ALL",
  location: "Shkoder, Albania",
  tagline: "Bridging European Manufacturing with Balkan Infrastructure.",
  description: "The Premier Balkan Infrastructure Distributor...",
  stats: {
    yearsExperience: 30,
    countriesServed: 12,
    projectsCompleted: 2500,
    partnersCount: 15
  }
};
```

### Partners Array
Key partners with complete details:
- **Konti** (Slovenia) - Spiral Sewage Pipes up to 2000mm - Large 2x2 Bento tile
- **FITT** (Italy) - Technical Hoses - Medium 1x2 Bento tile
- **Ferplast** (Italy) - Flexible Conduits
- **Plastika-ks** (Slovenia) - Recycled HDPE Systems
- **Arol-Plast** (Albania) - Local Manufacturing Partner

Each partner has:
- `id`, `name`, `country`, `specialty`, `tagline`, `description`
- `products` array with `name`, `type`, `diameters`
- `color` for branding
- `featured` boolean for Bento Grid inclusion
- `maxDiameter` or `factorySize` for special badges

### Products Array
Products with technical specifications:
```typescript
{
  id: number,
  name: string,
  partner: string,
  category: "civil" | "agri" | "industrial",
  material: "HDPE" | "PVC" | "PP",
  application: "Sewage" | "Water" | "Drainage" | "Electrical" | "Cable",
  diameterMin: number,
  diameterMax: number,
  description: string,
  specs: { [key: string]: string }  // Blueprint-style technical specs
}
```

### Timeline Array
Company history milestones:
- 1995: Foundation (Shkoder, Albania)
- 2009: Capital Injection (74.4M ALL)
- 2015: European Expansion (Konti, FITT partnerships)
- 2024: Arol-Plast Merger (Vertical Integration - highlighted as major shift)

### Categories Array
Three main solution categories:
- **Civil Engineering**: Municipal infrastructure, sewage systems
- **Agriculture**: Irrigation, water management
- **Industrial**: Heavy-duty conduits, cable protection

---

## Component Details

### Hero (hero.tsx)
**Features:**
- Cinematic dark background with dot-matrix and grid-lines overlays
- Framer Motion parallax effects on scroll
- 3D Spiral Pipe model using React Three Fiber:
  - Torus geometry main ring (orange metallic material)
  - Secondary cyan ring with transparency
  - Inner cylinder for depth
  - Auto-rotation with OrbitControls
  - Float animation
  - Point lights (orange and cyan) for dramatic lighting
- Massive typography: "SUKAJ INFRASTRUCTURE." with gradient text
- Company stats display (30+ years, 12 countries, 15+ partners)
- macOS-style floating dock navigation at bottom
- Chevron scroll indicator with bounce animation

**Key Dependencies:** `@react-three/fiber`, `@react-three/drei`, `three`

### Bento Grid (bento-grid.tsx)
**Features:**
- CSS Grid layout: 4 columns, auto-rows 200px
- Featured partners only (Konti, FITT, Plastika-ks, Arol-Plast)
- Responsive sizing: 2x2 large, 1x2 medium, 1x1 small tiles
- Hover effects:
  - Dim non-hovered tiles (opacity 0.5)
  - Glow effect with partner brand color
  - Radial gradient spotlight on hover
  - "Watch Demo" button overlay for large tiles
- Partner badges: Country, max diameter (Ø 2000mm)
- Color-coded top border for each partner

### Catalog (catalog.tsx)
**Features:**
- Sidebar filters:
  - Search input with icon
  - Material filter buttons (HDPE, PVC, PP) - multi-select
  - Application filter buttons (Sewage, Water, Drainage, Electrical, Cable) - multi-select
  - Diameter range slider (0-2000mm) using shadcn/ui Slider
  - Clear all filters button
- Spec Cards (blueprint-style):
  - Partner brand color header
  - Diameter range display (Ø min-max)
  - Material and application badges
  - Technical specs grid (3 columns)
  - **Scale Reference Feature**: For pipes ≥1000mm, "Show Scale Reference" button displays human silhouette comparison
- Framer Motion layout animations
- Responsive: Mobile filter dropdown, desktop sticky sidebar

### Timeline (timeline.tsx)
**Features:**
- Vertical pipe design running down center
- Scroll-triggered fluid fill animation using `useScroll` + `useTransform`
  - Cyan gradient fills pipe as user scrolls
- Alternating left/right milestone cards
- Icon badges for each milestone:
  - Company Founded (Milestone icon)
  - Capital Growth (TrendingUp icon)
  - Partnerships (Handshake icon)
  - Vertical Integration (Factory icon)
- Highlighted 2024 Arol-Plast merger with orange accent
- Scale-in animation on milestone icons
- Final "2025 - The Future" call-to-action card

### Categories (categories.tsx)
**Features:**
- 3-column grid of industry solutions
- Each card has:
  - Color-coded icon (Orange=Industrial, Green=Agriculture, Cyan=Civil)
  - Product badges below description
  - "Explore Solutions" link with hover arrow animation
- Hover lift effect (`y: -8`)
- Top gradient border reveal on hover

### Stats (stats.tsx)
**Features:**
- 4-column animated counters
- `useInView` trigger for counting animation
- 2-second duration, 60 steps
- Large bold numbers with suffixes (+)
- Labels in monospace uppercase
- Background gradient from orange to cyan

### Navigation (navigation.tsx)
**Features:**
- Fixed header with glassmorphism on scroll
- Logo: "S" in orange gradient with "SUKAJ INFRASTRUCTURE" text
- Desktop nav: CIVIL, AGRI, INDUSTRIAL, ABOUT, CONTACT
- Mobile hamburger menu with slide-down animation
- "Explore Catalog" CTA button (orange)
- Hover effect: `layoutId` shared layout animation

### CTA (cta.tsx)
**Features:**
- Gradient background (orange to cyan)
- Large headline: "READY TO BUILD?"
- Two buttons: "Get a Quote" (primary) + "Explore Catalog" (secondary)
- Contact links: Phone and email
- Massive blurred orb decoration

### Footer (footer.tsx)
**Features:**
- 4-column layout
- Logo + company info
- Solutions links
- Partners links
- Company links
- Dot matrix overlay
- Bottom bar with copyright and legal links

---

## Pages

### Homepage (/) - page.tsx
Sections in order:
1. Hero (3D + dock navigation)
2. Stats (animated counters)
3. Bento Grid (partner ecosystem)
4. Categories (industry solutions)
5. Timeline (company history)
6. CTA (contact call-to-action)

### Catalog (/catalog)
- Full-width header with "ENGINEERING SOLUTIONS." headline
- Sidebar filters + product grid
- Suspense loading state
- Query param support for category filtering

### About (/about)
- Company introduction
- Stats section
- Features grid (Location, Experience, Partners, Sustainability)
- Timeline component (anchored with #timeline)
- Sustainability section with 3 cards (Recycled, Lifespan, Local)

### Partners (/partners)
- Full partner detail cards
- Each card has: Logo, country, tagline, description, product list
- Special metrics (Max Diameter, Factory Size) where applicable
- "View Products" link per partner

### Contact (/contact)
- Two-column layout: Info + Form
- Contact details with icons
- Technical support CTA card
- Form fields: Name, Email, Company, Project Type (select), Message
- Success state with animation

---

## SEO Implementation

### Meta Tags (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: "Sukaj SHPK | The Infrastructure of Tomorrow",
  description: "Bridging European Manufacturing with Balkan Infrastructure...",
  keywords: ["infrastructure", "pipes", "HDPE", "PVC", "sewage", "Albania", "Balkans", "Konti", "FITT"],
  openGraph: {
    title: "Sukaj SHPK | Industrial Infrastructure Solutions",
    description: "The Premier Balkan Infrastructure Distributor",
    type: "website",
  },
};
```

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Sukaj SHPK",
  "description": "Premier Balkan Infrastructure Distributor",
  "foundingDate": "1995",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Shkoder",
    "addressCountry": "Albania"
  }
}
```

---

## Performance Optimizations

1. **Next.js 15 App Router**: Server Components by default
2. **Static Generation**: All pages pre-rendered at build time
3. **Lazy Loading**: 3D Canvas wrapped in `<Suspense>`
4. **Image Optimization**: `next/image` used throughout
5. **Animation Performance**: GPU-accelerated Framer Motion
6. **CSS**: Tailwind purges unused styles
7. **Bundle**: Three.js loaded only where needed (Hero section)

---

## Key Features Summary

| Feature | Implementation |
|---------|---------------|
| **3D Pipe Model** | React Three Fiber with torus geometry, metallic materials |
| **Bento Grid** | CSS Grid with Framer Motion layout animations |
| **Parallax Effects** | `useScroll` + `useTransform` from Framer Motion |
| **Scale Reference** | Human silhouette comparison for 2000mm pipes |
| **Timeline Animation** | Scroll-triggered pipe fill with cyan gradient |
| **Smart Filtering** | Multi-select material/application + diameter slider |
| **Glassmorphism** | `backdrop-blur-md bg-white/5` pattern |
| **Micro-interactions** | Magnetic dock, hover glows, animated counters |
| **Responsive** | Mobile-first with breakpoints (sm, md, lg) |
| **Dark Mode Only** | No light mode - pure Industrial Luxury aesthetic |

---

## Dependencies to Install (if recreating)

```bash
# Core
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 3D
npm install @react-three/fiber @react-three/drei three @types/three

# Animation
npm install framer-motion

# UI Components
npm install lucide-react clsx tailwind-merge class-variance-authority
npx shadcn@latest init -d
npx shadcn@latest add button slider card dialog

# Fonts (automatic via next/font)
# Inter - Headings
# JetBrains Mono - Technical text
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## Design Principles (For Future Edits)

1. **Dark Mode Only**: Always use `bg-slate-950` or darker backgrounds
2. **Safety Orange for CTA**: Primary actions use `bg-orange-500`
3. **Hydraulic Blue for Water**: Water-related elements use cyan accents
4. **Swiss Typography**: Uppercase headings with tight/wide tracking
5. **Industrial Patterns**: Dot matrix and grid lines for texture
6. **Glassmorphism**: Use sparingly for cards and overlays
7. **Parallax for Depth**: Use on scroll-driven sections
8. **Scale References**: Always show scale for large industrial objects
9. **Real Data Only**: Never use Lorem Ipsum - use actual partner/product data

---

## Common Tasks

### Adding a New Partner
1. Add partner object to `partners` array in `src/lib/data.ts`
2. Include: id, name, country, specialty, tagline, description, products[], color
3. Set `featured: true` to include in Bento Grid
4. Add products to `products` array with full specs
5. Run build to verify

### Adding a New Product
1. Add to `products` array in `src/lib/data.ts`
2. Include: id, name, partner, category, material, application, diameters, description, specs
3. Specs object should have blueprint-style technical data
4. Catalog will automatically display with filters

### Modifying Colors
1. Edit CSS variables in `src/app/globals.css` :root
2. Update partner colors in `src/lib/data.ts`
3. Update gradient utilities in globals.css

### Adding New Pages
1. Create folder in `src/app/[route]/`
2. Create `page.tsx` with default export
3. Add metadata export for SEO
4. Import from `layout.tsx` automatically
5. Add link to `navigation.tsx` if needed

---

## File References

- **Data**: `@/lib/data.ts` - All content data
- **Layout**: `@/app/layout.tsx` - Root layout, fonts, SEO
- **Styles**: `@/app/globals.css` - Global CSS, utilities
- **Components**: `@/components/*.tsx` - All React components
- **Pages**: `@/app/*/page.tsx` - Route pages

---

## Build Output

Successful build produces:
- Static HTML files in `.next/`
- Optimized chunks for each route
- Pre-rendered pages for SEO
- Tree-shaken CSS and JS

**Routes Generated:**
- `/` - Homepage
- `/catalog` - Product catalog
- `/about` - About page
- `/partners` - Partners page
- `/contact` - Contact page

---

## Notes for AI Assistants

When working with this codebase:
1. Always reference real data from `src/lib/data.ts` - no placeholder text
2. Maintain the Industrial Luxury aesthetic - dark mode, orange/cyan accents
3. Use Framer Motion for animations - check existing patterns
4. For 3D elements, use React Three Fiber patterns from hero.tsx
5. Keep accessibility in mind - WCAG AA contrast ratios
6. Mobile-first responsive design - test on all breakpoints
7. Preserve the Swiss/Brutalist typography style
8. Use glassmorphism sparingly and consistently

---

**Last Updated**: February 2026
**Project**: Sukaj SHPK Infrastructure Website
**Status**: Production Ready

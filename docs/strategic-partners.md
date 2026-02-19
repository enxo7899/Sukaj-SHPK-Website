# Strategic Partners Section

## Overview

The **Strategic Partners** section is a showcase component displaying Sukaj SHPK's network of 12 manufacturing partners across 7 countries. The section features a sophisticated bento-grid layout with interactive cards, video backgrounds, and an expanded modal view for detailed partner information.

---

## Component Architecture

### File: `@/components/bento-grid.tsx`

The section is implemented as a React client component using:
- **Framework:** Next.js 16 with App Router
- **Animation:** Framer Motion for hover effects and transitions
- **Styling:** Tailwind CSS with custom gradients and glassmorphism
- **Icons:** Lucide React (MapPin, ArrowUpRight, ExternalLink, X)

---

## Partner Data Structure

### Interface: `Partner`

```typescript
interface Partner {
  id: string;                    // Unique identifier (e.g., "konti-hidroplast")
  name: string;                  // Company name
  country: string;               // Country of origin
  specialty: string;             // Primary business focus
  tagline: string;               // Short marketing tagline
  maxDiameter?: string;          // Maximum pipe diameter (if applicable)
  factorySize?: string;          // Factory specifications
  description: string;           // Full company description
  website: string;             // External website URL
  partnerType: PartnerType;      // Category classification
  keyStandards: string[];        // Certifications and standards
  heroMetrics: string[];         // Key stats displayed on cards
  logo: { light?: string; dark?: string };  // Logo assets
  featuredPriority: number;      // Display order for featured partners
  products: {                    // Product offerings
    name: string;
    type: string;
    diameters: string;
  }[];
  featured: boolean;             // Whether shown in bento grid
  color: string;               // Brand color (hex code)
}
```

### Partner Types

| Type | Label | Description |
|------|-------|-------------|
| `manufacturer` | Manufacturers | Primary pipe and hose manufacturers |
| `recycler` | Recycling & Foils | Plastic recycling and film production |
| `packaging` | Packaging | Food and industrial packaging |
| `hoses` | Hoses | Technical and garden hose specialists |
| `local-albania` | Local Albania | Albania-based manufacturers |

---

## Partner Database (12 Partners)

### Featured Partners (Bento Grid)

| Priority | ID | Name | Country | Specialty | Color | Tagline |
|----------|-----|------|---------|-----------|-------|---------|
| 1 | `konti-hidroplast` | Konti Hidroplast | North Macedonia | PE/PP Pipe Producer — Spiral & Solid Wall | `#f97316` (Orange) | Export-oriented pipe manufacturing since 1975 |
| 2 | `ferplast-ks` | Ferplast | Kosovo | Corrugated HDPE Pipes SN4/SN8 | `#a855f7` (Purple) | Corrugated pipe specialist since 1996 |
| 3 | `teqja` | Teqja International | Albania | HDPE 100 & Corrugated Pipe Manufacturer | `#ef4444` (Red) | Albanian manufacturer with ISO certification |
| 4 | `fitt` | FITT | Italy | Technical Hoses & Garden Systems | `#22d3ee` (Cyan) | Italian hose engineering for every application |
| 5 | `plastika-ks` | PLASTIKA | Kosovo | Recycling → Granulates → Agricultural & Construction Foils | `#22c55e` (Green) | Circular-economy plastics for agriculture & construction |
| 6 | - | (Additional featured partner slot) | - | - | - | - |

### Extended Network (Logo Wall)

| Priority | ID | Name | Country | Specialty | Color |
|----------|-----|------|---------|-----------|-------|
| 7 | `poly-plast-system` | Poly Plast System | Albania | Plastic Pipe Manufacturer | `#ef4444` |
| 8 | `assos-viokon` | ASSOS-VIOKON | Greece | Plastic Food Packaging — Barrels & Accessories | `#3b82f6` |
| 9 | `polins` | Polins doo | Serbia | Agricultural & Household Plastic Products | `#64748b` |
| 10 | `plastika-nv` | Plastika DOO Nova Varoš | Serbia | Plastic Processing & Packaging with In-House Recycling | `#64748b` |
| 11 | `perplast` | Perplast Kompani | North Macedonia | PVC Hoses & PVC Granulate | `#64748b` |
| 12 | `albplast` | Albplast | Albania | Irrigation & Water Pipe Systems | `#64748b` |

### Non-Featured but Catalogued

| Priority | ID | Name | Country | Specialty |
|----------|-----|------|---------|-----------|
| 6 | `sel-polimer` | Polimer Kauçuk / SEL-Polimer | Turkey | Rubber & PVC Hose Manufacturer |

---

## Detailed Partner Profiles

### 1. Konti Hidroplast (North Macedonia)

**Overview:** Founded in 1975, one of the region's largest PE/PP pipe producers.

**Key Metrics:**
- Max Diameter: Ø 2000 mm
- Export Rate: 95%
- Established: 1975

**Standards:** EN 13476, EN 12201

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| Spiral Sewage Pipe | PP Spiral | 300–2000 mm |
| Solid Wall PE Pipe | PE100 | 20–630 mm |

**Website:** https://konti-hidroplast.com.mk

---

### 2. Ferplast (Kosovo)

**Overview:** Founded in 1996, corrugated HDPE pipe specialist.

**Key Metrics:**
- Max Inner Diameter: ID 2000 mm
- Stiffness Classes: SN4 / SN8
- Established: 1996

**Standards:** EN 13476, SN4, SN8

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| Corrugated HDPE SN4 | HDPE Corrugated | 100–2000 mm |
| Corrugated HDPE SN8 | HDPE Corrugated | 100–1200 mm |

**Website:** https://ferplast-ks.com

---

### 3. Teqja International (Albania)

**Overview:** ISO-certified Albanian manufacturer for water and sewage networks.

**Key Metrics:**
- Diameter Range: Ø 20–630 mm
- Pressure Classes: PN4–PN32
- Standard Length: 12 m

**Standards:** EN 13476-1:2018, ISO 9001, HDPE PE100

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| HDPE 100 Pressure Pipe | HDPE PE100 | 20–630 mm |
| Corrugated Sewage Pipe | HDPE Corrugated | 150–630 mm |

**Website:** https://teqja.com.al

---

### 4. FITT (Italy)

**Overview:** Leading Italian manufacturer of thermoplastic hoses.

**Key Metrics:**
- Product Lines: 3 flagship (Force, Mint, Mimosa)
- Distribution: Global
- Origin: Made in Italy

**Standards:** EN ISO 1307, REACH

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| FITT Force | Reinforced PVC Hose | 12–50 mm |
| FITT Mint | Garden Hose | 12–25 mm |
| FITT Mimosa | Lightweight Hose | 12–19 mm |

**Website:** https://fitt.com

---

### 5. PLASTIKA (Kosovo)

**Overview:** Circular-economy plastics processor.

**Key Metrics:**
- Primary Output: Recycled granulates
- Applications: Agricultural & construction foils

**Standards:** ISO 14001

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| Recycled Granulates | HDPE/LDPE Granulate | N/A |
| Agricultural Film | PE Film | N/A |

**Website:** https://plastika-ks.com/en

---

### 6. SEL-Polimer (Turkey)

**Overview:** Turkish hose manufacturer since 1957.

**Key Metrics:**
- Established: 1957
- Materials: Rubber & PVC hoses

**Standards:** ISO 9001

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| Industrial Rubber Hose | Rubber | 6–150 mm |
| PVC Suction Hose | PVC | 20–200 mm |

**Website:** https://sel-polimer.com

---

### 7. Poly Plast System (Albania)

**Overview:** Albanian manufacturer of plastic pipe systems.

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| PE Pipe Systems | HDPE | 20–400 mm |

**Website:** https://polyplastsystem.com

---

### 8. ASSOS-VIOKON (Greece)

**Overview:** Greek packaging specialist for food and industry.

**Key Metrics:**
- Focus: Barrels & accessories
- Grade: Food-grade plastics

**Standards:** EU Food Contact

**Products:**
| Product | Type |
|---------|------|
| General Barrels | Food-Grade Plastic |
| Special Barrels | Food-Grade Plastic |

**Website:** https://viokon.gr

---

### 9. Polins doo (Serbia)

**Overview:** Serbian plastics processor established 1996.

**Key Metrics:**
- Workers: ~70
- Facility: ~5,000 m²
- Established: 1996

**Products:**
| Product | Type |
|---------|------|
| Agricultural Plastics | Various PE/PP |

**Website:** https://polins.co.rs

---

### 10. Plastika DOO Nova Varoš (Serbia)

**Overview:** Plastic processing factory with sustainability initiatives.

**Key Metrics:**
- Capability: In-house recycling
- Energy: Solar-powered operations

**Products:**
| Product | Type |
|---------|------|
| Plastic Packaging | PE/PP Packaging |

**Website:** https://plastikanv.com

---

### 11. Perplast Kompani (North Macedonia)

**Overview:** PVC hose and granulate producer from Tetovo.

**Key Metrics:**
- Products: PVC hoses, PVC granulate

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| PVC Hose | PVC | 10–100 mm |
| PVC Granulate | PVC Granulate | N/A |

---

### 12. Albplast (Albania)

**Overview:** Albanian producer focused on irrigation systems.

**Key Metrics:**
- Focus: Irrigation & water networks

**Products:**
| Product | Type | Diameters |
|---------|------|-----------|
| Irrigation Pipe | PE | 20–110 mm |

---

## Visual Design System

### Color Palette

| Partner | Brand Color | Hex |
|---------|-------------|-----|
| Konti Hidroplast | Orange | `#f97316` |
| Ferplast | Purple | `#a855f7` |
| Teqja International | Red | `#ef4444` |
| FITT | Cyan | `#22d3ee` |
| PLASTIKA | Green | `#22c55e` |
| ASSOS-VIOKON | Blue | `#3b82f6` |
| Polins / Plastika NV / Perplast / Albplast | Slate | `#64748b` |
| Poly Plast System | Red | `#ef4444` |
| SEL-Polimer | Amber | `#f59e0b` |

### Section Styling

**Background:**
```
Gradient: from-slate-950 via-slate-900/70 to-slate-950
```

**Card Styling:**
- Background: `bg-slate-900/70` with `border-white/10`
- Hover: `y: -4` translation via Framer Motion
- Dimming: Non-hovered cards opacity 0.4 when one card is hovered
- Video overlay: 40% opacity with `bg-slate-950/60` overlay
- Gradient glow: Radial gradient from brand color at 15% 15%

**Typography:**
- Section label: Mono, 0.2em tracking, `text-slate-300`
- Section title: 4xl/6xl, font-black, 0.14em tracking, white
- Partner name: 18px, font-bold, white
- Tagline/Description: 12px/14px, `text-slate-300`
- Metrics: Mono, 10px, tracking-wider, `text-slate-200`

---

## Layout System

### Bento Grid (Desktop)

**Grid Configuration:**
- Columns: 4 (`grid-cols-4`)
- Row height: 220px (`auto-rows-[220px]`)
- Gap: 16px (`gap-4`)

**Tile Layout Map:**

| Position | Grid Class | Size |
|----------|------------|------|
| 1 | `md:col-span-2 md:row-span-2` | 2×2 (Large) |
| 2 | `md:col-span-2 md:row-span-1` | 2×1 (Wide) |
| 3 | `md:col-span-1 md:row-span-1` | 1×1 (Small) |
| 4 | `md:col-span-1 md:row-span-2` | 1×2 (Tall) |
| 5 | `md:col-span-1 md:row-span-1` | 1×1 (Small) |
| 6 | `md:col-span-1` | 1×1 (Default) |

### Mobile Scroll Strip

- Layout: Horizontal scroll (`overflow-x-auto`)
- Snap: `snap-x snap-mandatory`
- Card width: 82% viewport (`min-w-[82%]`)
- Gap: 16px

### Logo Wall (Extended Network)

- Grid: Responsive (2/3/6 columns)
- Breakpoints: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`
- Gap: 12px
- Card: Icon + Name + Country

---

## Interactive Features

### Hover Effects (Desktop)

1. **Card Lift:** `whileHover={{ y: -4 }}`
2. **Dimming:** Non-hovered cards reduce to 40% opacity
3. **Icon Color:** Arrow changes from `text-slate-400` to `text-white`
4. **Cursor:** Pointer on all interactive elements

### Click Interactions

1. **Card Click:** Opens expanded modal with full partner details
2. **Logo Wall Click:** Navigates to `/partners#${partner.id}`
3. **Modal Close:** Click outside, X button, or ESC (implied)

### Expanded Modal Content

**Header:**
- Large brand icon (14×14, rounded-xl)
- Partner name (2xl, font-black)
- Country with MapPin icon
- External website link (if available)
- Close button (X icon)

**Body:**
- Full description paragraph
- Key standards badges (cyan styling)
- Product grid (2 columns on desktop)
  - Product name (bold)
  - Product type (description)
  - Diameter (mono, orange)

**Footer Actions:**
- "Full Profile" → `/partners#${id}`
- "View Products" → `/catalog?partner=${id}` (orange CTA)

---

## Media Assets

### Video Backgrounds

Featured partners with video loops:

| Partner | Video Path |
|---------|------------|
| Konti Hidroplast | `/media/partners/konti-loop.mp4` |
| FITT | `/media/partners/fitt-loop.mp4` |
| PLASTIKA | `/media/partners/plastika-loop.mp4` |

**Video Attributes:**
- `muted loop autoPlay playsInline preload="none"`
- Opacity: 40%
- Object fit: cover
- Full card coverage

### Logo Assets

All partners have SVG logos at:
```
/partners/{partner-id}/logo.svg
```

---

## Navigation Integration

### Inbound Links

- Homepage hero CTA: "View Partners"
- Navigation menu: Partners link
- Footer: Quick links to partners

### Outbound Links

From expanded modal:
- Full Profile → `/partners#${id}`
- View Products → `/catalog?partner=${id}`
- External Website → `partner.website` (new tab)

---

## State Management

### React State Hooks

```typescript
const [hoveredId, setHoveredId] = useState<string | null>(null);
const [expandedId, setExpandedId] = useState<string | null>(null);
```

### State Flow

1. **Hover:** `setHoveredId(partner.id)` on mouse enter, `null` on section leave
2. **Click:** `setExpandedId(partner.id)` opens modal
3. **Close:** `setExpandedId(null)` closes modal

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (≥768px) | Bento grid with 4 columns, hover effects, dimming |
| Mobile (<768px) | Horizontal scroll strip, no hover effects, tap to expand |

**Mobile Optimizations:**
- Scroll snap for smooth card browsing
- Simplified card design (no videos)
- Full-width modal with overflow scroll

---

## Accessibility

- **Focus States:** `focus-visible:ring-2 focus-visible:ring-orange-400` on all interactive elements
- **Keyboard Navigation:** Tab through cards, Enter to open modal
- **Screen Reader:** Semantic headings, alt text for icons (via Lucide)
- **Reduced Motion:** Respects `prefers-reduced-motion` via Framer Motion

---

## Section Header

**Label:** "PARTNER ECOSYSTEM"  
**Title:** "STRATEGIC PARTNERS"  
**Subtitle:** "12 manufacturing partners across 7 countries — producing pipes, hoses, films, and packaging for every infrastructure need."

---

## Extended Network Label

**Label:** "EXTENDED NETWORK"  
Displayed above the logo wall containing non-featured partners.

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total Partners | 12 |
| Featured Partners | 5-6 (bento grid) |
| Extended Partners | 6-7 (logo wall) |
| Countries | 7 (Albania, Kosovo, North Macedonia, Serbia, Greece, Italy, Turkey) |
| Partner Types | 5 categories |
| With Video Backgrounds | 3 |
| With External Websites | 10/12 |

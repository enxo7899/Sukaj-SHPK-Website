# AI Video Generation Prompt for Sukaj SHPK Hero Section

## Primary Prompt (Recommended)

**Cinematic industrial product showcase: Premium black HDPE corrugated pipes falling gracefully in slow motion against a dark slate background (#020617). Multiple large-diameter pipes (300-2000mm) with distinctive ribbed corrugation patterns tumble elegantly through space with realistic physics - rotating, bouncing softly, and settling into an artistic arrangement. Dramatic studio lighting with cyan-blue accent lights (#22d3ee, #0891b2) creating glossy reflections and rim lighting on the black plastic surfaces. Atmospheric depth with subtle blue-tinted volumetric fog. Professional product photography aesthetic. Camera slowly orbits the scene. Pipes feature embossed "SUKAJ SHPK" branding and "PE100" technical markings. Ultra-realistic materials with proper subsurface scattering on black HDPE plastic. 4K resolution, 60fps, 10-15 second loop.**

---

## Alternative Prompt (More Detailed)

**Professional industrial product video: High-end cinematography of premium corrugated HDPE pipes in obsidian black. Scene opens with 5-7 large diameter pipes (ranging from 300mm to 2000mm) suspended in a dark studio space with deep slate blue background (#020617). Pipes begin falling in choreographed sequence with realistic physics - each pipe rotates gracefully showing the distinctive double-wall corrugated structure with smooth inner wall and ribbed outer surface. 

LIGHTING: Three-point studio lighting setup with key cyan-blue accent lights (#22d3ee) creating dramatic rim lighting along the pipe edges. Soft fill light reveals the technical details. Glossy reflections dance across the black HDPE surfaces showing premium material quality.

BRANDING: Each pipe features subtle embossed text:
- "SUKAJ SHPK" company logo (white/silver)
- "PE100" material certification marking
- "EN 13476" standard certification
- "SN8" stiffness class marking
- Diameter specifications (e.g., "Ø 630mm", "Ø 1200mm")

ATMOSPHERE: Subtle volumetric fog with cyan-blue tint creating depth. Fine particles floating in air catching light. Dark gradient background transitioning from deep slate (#020617) to slightly lighter blue-gray at edges.

MOTION: Pipes fall with varied speeds and rotation rates, creating dynamic composition. Soft bounces when pipes contact each other with realistic dampening. Final frame shows pipes artistically arranged in a stable, premium product display formation.

CAMERA: Smooth orbital camera movement, starting from low angle looking up, slowly rotating 45 degrees around the scene. Shallow depth of field with focus pulling between foreground and background pipes.

TECHNICAL: Photorealistic HDPE material shader with proper specularity, slight subsurface scattering, and fingerprint-resistant matte finish. 4K resolution (3840x2160), 60fps for smooth slow-motion, 12-15 second duration optimized for seamless looping.

STYLE REFERENCES: Apple product launch cinematography, industrial design showcase, premium automotive advertising, Blender Cycles/Octane render quality.**

---

## Simplified Prompt (For Faster Generation)

**Slow motion product video: Black corrugated HDPE pipes falling and rotating against dark blue background. Cyan-blue studio lighting with glossy reflections. Pipes show "SUKAJ SHPK" branding. Professional industrial aesthetic. 4K, cinematic, 10 seconds.**

---

## Brand Color Palette

- **Background**: `#020617` (Deep slate)
- **Primary Accent**: `#22d3ee` (Cyan)
- **Secondary Accent**: `#0891b2` (Dark cyan)
- **Tertiary Accent**: `#38bdf8` (Light blue)
- **Text/Branding**: White or silver metallic

---

## Technical Specifications for Video

- **Resolution**: 3840x2160 (4K) or 1920x1080 (Full HD minimum)
- **Frame Rate**: 60fps (for smooth slow motion) or 30fps minimum
- **Duration**: 10-15 seconds (optimized for looping)
- **Format**: MP4 (H.264) or WebM (VP9) for web
- **Aspect Ratio**: 16:9 or 1:1 (square for mobile)
- **File Size**: Under 5MB for web performance (use compression)

---

## Implementation Notes

Once you have the AI-generated video:

1. **Optimize for web**: Compress to under 5MB using tools like HandBrake or FFmpeg
2. **Create multiple formats**: MP4 (Safari/Chrome) and WebM (Firefox/Chrome) for compatibility
3. **Add poster frame**: Extract a high-quality still frame for initial load
4. **Consider mobile**: Create a lighter version (720p, 30fps) for mobile devices
5. **Loop seamlessly**: Ensure first and last frames match for infinite loop

---

## Recommended AI Video Tools

- **Runway Gen-3**: Best for realistic physics and product cinematography
- **Pika Labs**: Good for industrial/product videos with custom branding
- **Luma AI Dream Machine**: Excellent for realistic materials and lighting
- **Stable Video Diffusion**: Open-source option for custom control
- **Kaiber**: Good for stylized industrial aesthetics

---

## Video Integration Code

Replace the `<FallingPipes />` component in `hero-ultimate.tsx` with:

```tsx
<div className="relative mx-auto w-full max-w-[640px] lg:mx-0 aspect-video">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover rounded-2xl"
    poster="/media/hero/pipes-poster.jpg"
  >
    <source src="/media/hero/falling-pipes.webm" type="video/webm" />
    <source src="/media/hero/falling-pipes.mp4" type="video/mp4" />
  </video>
</div>
```

Place video files in: `/public/media/hero/`

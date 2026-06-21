# PersonaPro — Design System

> "Career glow-up" neo-brutalism. Warm, bold, youthful, and deliberately *not* generic AI dark-mode.

## 1. Design Tokens

### Color
| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#FBF7EC` | App background (warm cream) |
| `--paper-2` | `#F2EAD7` | Texture dots, deeper surface |
| `--ink` | `#15130E` | Text, borders, hard shadows |
| `--ink-soft` | `#4A4534` | Placeholders, muted text |
| `--cobalt` | `#2D4CFF` | Primary brand / primary CTA |
| `--lime` | `#C6F24E` | Energy, highlights, "strong" band |
| `--coral` | `#FF5B3A` | Warmth, alerts, "needs work" band |
| `--lilac` | `#B79CFF` | Tertiary accent |

Soft variants (`-soft`) exist for cobalt / lime / coral / lilac for tinted fills.

**Band logic (score):** ≥75 → lime ("Strong"), ≥50 → cobalt ("Getting there"), else coral ("Needs work").

### Typography
- **Display / headings:** Space Grotesk (700), `letter-spacing: -0.02em`
- **Body:** DM Sans (400/500/700)
- **Mono / kickers:** Space Mono — uppercase, `letter-spacing: 0.14em`, 11px (`.nb-kicker`)
- Body min size 15–16px; line-height 1.5–1.75.

### Surfaces, borders & shadows
- Border: `2.5px solid var(--ink)` (`.nb-border`)
- Radius: `14px` (`rounded-nb`)
- Hard offset shadows (no blur): `--shadow` `5px 5px 0`, `--shadow-sm` `3px 3px 0`, press `2px 2px 0`
- **RTL:** shadows flip to `-Xpx Ypx` so depth reads correctly (handled in `globals.css`).

### Motion
- Micro-interactions 80–300ms, `cubic-bezier(0.22,1,0.36,1)`
- `.nb-press`: hover lifts (-1,-1) + bigger shadow; active presses (3,3) + small shadow
- Respects `prefers-reduced-motion` (animations disabled).

## 2. Components

| Component | Variants / States | Notes |
|-----------|-------------------|-------|
| **Button (primary)** | default / hover / active | `bg-cobalt` text paper, `.nb-press`, hard shadow |
| **Button (ghost)** | default / hover | white bg, ink border, hover → lime |
| **Input / Textarea** (`.nb-input`) | default / focus | focus = shadow + 1px lift |
| **UploadZone** | idle / dragging / loading / loaded | dashed→solid border; lime fill on success; SVG icons (no emoji) |
| **ResultCard** | static + copy(default/copied) | rotating accent kicker by `index`; star/number bullets; copy → ink fill |
| **ScoreRing** | band-colored | double ink hairlines, chunky bordered bars, `verdict` chip |
| **LanguageSelector** | per-lang active | segmented ink pill; active = ink fill |
| **LogoMark / Wordmark** | size prop | two overlapping P's (lime + paper) on cobalt tile; also `app/icon.svg` favicon |

## 3. Principles & Anti-patterns
- ✅ SVG icons only — never emojis as UI icons (🎉 used once as decorative confetti only).
- ✅ `cursor-pointer` + visible hover feedback on every interactive element.
- ✅ Contrast: ink on paper/white passes WCAG AA; color never the sole signal (verdict has text label).
- ❌ No smooth-gradient "AI SaaS" backgrounds, no glassmorphism, no neon-on-black.
- ❌ No layout-shifting scale hovers — use translate + shadow instead.

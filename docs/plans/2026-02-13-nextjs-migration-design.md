# Portfolio Migration zu Next.js 15 - Design Document

**Datum:** 2026-02-13
**Autor:** Claude Code mit Oleksiy Kravtsov
**Status:** Approved

## Kontext

Die aktuelle Portfolio-Website ist mit Vanilla HTML/CSS/JavaScript gebaut. Ziel ist die Migration zu einem modernen Framework für bessere Performance, SEO-Optimierung, und eine wartbare Codebasis. Die Website soll modernisiert werden, während alle bestehenden Features erhalten bleiben.

### User-Anforderungen
- ✅ Performance & SEO als Hauptpriorität
- ✅ Hosting auf Vercel/Netlify
- ✅ Moderne Animations-Library statt custom JavaScript
- ✅ Weg von Vanilla HTML zu modernem Framework

## Gewählte Lösung: Next.js 15 mit App Router

### Tech Stack
- **Next.js 15** - React Framework mit Static Site Generation
- **TypeScript** - Type-Safety
- **Tailwind CSS** - Utility-first CSS Framework
- **Framer Motion** - Moderne Animations-Library
- **Resend API** - Email-Service (ersetzt EmailJS)
- **shadcn/ui** - UI Components
- **Vercel** - Deployment Platform

### Warum Next.js?
1. **Performance**: Static Site Generation + automatisches Code-Splitting
2. **SEO**: Server-Side Rendering Optionen, optimierte Meta-Tags
3. **Developer Experience**: Hot Reload, TypeScript, automatisches Routing
4. **Zukunftssicher**: Kann später API-Routes, Authentication, CMS einbinden
5. **Community**: Riesige Community, viele deutsche Tutorials
6. **Deployment**: Nahtlose Integration mit Vercel

## Architektur

### Projektstruktur
```
portfolio-nextjs/
├── app/
│   ├── layout.tsx              # Root Layout mit Navigation & Footer
│   ├── page.tsx                # Home Page mit allen Sections
│   ├── projects/
│   │   └── page.tsx            # Projects Showcase
│   └── globals.css             # Tailwind imports
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Hero mit Typewriter
│   │   ├── About.tsx           # Über mich
│   │   ├── Skills.tsx          # Skills Grid (collapsible)
│   │   ├── Resume.tsx          # Timeline
│   │   └── Contact.tsx         # Kontaktformular
│   ├── ui/
│   │   ├── Navigation.tsx      # Header Nav + Scroll Spy Dots
│   │   ├── MobileMenu.tsx      # Hamburger Menu
│   │   └── ProjectCard.tsx     # Projekt Cards
│   └── animations/
│       ├── TypewriterEffect.tsx
│       └── FloatingImages.tsx
├── lib/
│   ├── content/
│   │   ├── skills.ts           # Skills Daten
│   │   ├── experience.ts       # Timeline Daten
│   │   └── projects.ts         # Projekt Informationen
│   └── email.ts                # Email Service
├── public/
│   └── images/                 # Alle Bilder (optimiert)
└── styles/
    └── theme.ts                # Color Tokens & Theme Config
```

### Component-Hierarchie
```
RootLayout
├── Navigation (sticky + scroll spy)
├── page.tsx (Home)
│   ├── Hero (Typewriter + Floating Images)
│   ├── About (Bio + Project Links)
│   ├── Skills (Collapsible Grid)
│   ├── Resume (Timeline)
│   └── Contact (Form mit Server Action)
└── Footer

projects/page.tsx
├── Navigation
├── ProjectCard (4x)
└── Footer
```

## Datenfluss

### Statische Content-Daten
Alle Inhalte werden in TypeScript-Files strukturiert:

**`lib/content/skills.ts`:**
```typescript
export const technicalSkills = [
  { name: 'Python', level: 'Expert', icon: '/images/python_picture.jpg', details: '...' },
  { name: 'Java', level: 'Advanced', icon: '/images/java_picture.jpg', details: '...' },
  // ...
]

export const softSkills = [...]
export const languages = [...]
```

**`lib/content/experience.ts`:**
```typescript
export const timeline = [
  {
    year: '2023-2025',
    title: 'Studium Wirtschaftsinformatik',
    organization: 'Hochschule Hannover',
    description: '...',
    type: 'education'
  },
  // ...
]
```

**`lib/content/projects.ts`:**
```typescript
export const projects = [
  {
    title: 'QGIS-Plugin für Avacon',
    description: '...',
    image: '/images/project_qgis.png',
    tags: ['Python', 'QGIS', 'Team Project'],
    links: { github: '...', demo: '...' }
  },
  // ...
]
```

### State Management
- **Kein globales State Management nötig** (keine Redux/Zustand)
- Local Component State via `useState` für:
  - Scroll Position (Navigation Dots)
  - Mobile Menu Toggle
  - Skills Collapse State
  - Form State (via React Hook Form)

## Styling-System

### Tailwind CSS Migration
Deine CSS-Variablen werden zu Tailwind-Config:

**`tailwind.config.ts`:**
```typescript
colors: {
  primary: '#614E56',        // Deep mauve
  secondary: '#849B87',      // Sage green
  accent: '#C17F59',         // Terracotta
  text: '#2D2A2E',          // Dark gray
  background: '#DBD3CA',     // Greige
  container: '#F9F6F1',      // Light cream
  hover: '#9E8576',          // Warm taupe
}
```

**Vorteile:**
- 1,963 Zeilen CSS → ~100 Zeilen Config
- Automatisches Purging ungenutzter Styles
- Responsive mit Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Beispiel: `bg-primary hover:bg-hover transition-colors duration-300`

### Animations mit Framer Motion

**Typewriter-Effekt:**
```typescript
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.05 }}
>
  {text.split('').map((char, i) => (
    <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {char}
    </motion.span>
  ))}
</motion.span>
```

**Floating Images:**
```typescript
<motion.div
  animate={{
    x: [0, randomX, 0],
    y: [0, randomY, 0],
    rotate: [0, randomRotate, 0]
  }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
/>
```

**Scroll-Animationen:**
```typescript
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
/>
```

**Skills Collapse:**
```typescript
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```

## Feature-Mapping (Alt → Neu)

| Feature (Alt) | Implementation (Neu) |
|---------------|---------------------|
| Intersection Observer Animationen | Framer Motion `whileInView` |
| Typewriter-Effekt (custom JS) | Framer Motion staggerChildren |
| Floating Images (RAF loop) | Framer Motion physics animations |
| Burger Menu (custom JS) | shadcn/ui Sheet Component |
| Smooth Scroll | Next.js `Link` + CSS `scroll-behavior` |
| Scroll Spy | IntersectionObserver Hook + useState |
| EmailJS Form | Resend API + Server Action |
| CSS Variables | Tailwind Theme Config |
| Responsive Breakpoints | Tailwind responsive utilities |

## Email-Service Migration

### Alt: EmailJS
```javascript
emailjs.send('service_5llkoer', 'template_k04fx45', formData)
```

### Neu: Resend + Server Action
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'deine-email@example.com',
    subject: `Portfolio Kontakt von ${name}`,
    html: `<p>Von: ${name} (${email})</p><p>${message}</p>`
  });

  return Response.json({ success: true });
}
```

**Vorteile:**
- Keine API-Keys im Client-Code
- Server-Side Validierung
- Bessere Delivery-Rate
- Kostenlos bis 100 Emails/Tag

## Deployment-Strategie

### Vercel Setup
1. GitHub Repository mit Vercel verbinden
2. Environment Variables setzen:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (optional)
3. Auto-Deployment bei Git Push

### Build-Konfiguration
```javascript
// next.config.js
module.exports = {
  output: 'export', // Static Export für CDN
  images: {
    unoptimized: true, // Für static export
  },
}
```

### Performance-Garantien
- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 200KB (gzipped)

## Migration-Plan

### Phase 1: Setup (Tag 1)
1. Next.js 15 Projekt initialisieren
2. Dependencies installieren (Tailwind, Framer Motion, shadcn/ui)
3. Tailwind Config mit Brand-Farben
4. Bilder nach `public/images/` kopieren

### Phase 2: Layout & Navigation (Tag 1-2)
1. Root Layout mit Navigation Component
2. Scroll Spy Dots implementieren
3. Mobile Hamburger Menu
4. Footer Component

### Phase 3: Content Migration (Tag 2-3)
1. Alle Texte in TypeScript-Files (skills.ts, experience.ts, projects.ts)
2. Bilder-Optimierung mit Next/Image

### Phase 4: Sections (Tag 3-5)
1. Hero Section mit Typewriter
2. About Section
3. Skills Section (collapsible)
4. Resume Timeline
5. Contact Form mit Resend
6. Projects Page

### Phase 5: Animationen (Tag 5-6)
1. Floating Images mit Framer Motion
2. Scroll-Animationen für alle Sections
3. Hover-Effekte
4. Mobile-spezifische Anpassungen

### Phase 6: Testing & Deployment (Tag 6-7)
1. Lokales Testing aller Features
2. Browser-Testing (Chrome, Firefox, Safari, Mobile)
3. Performance-Optimierung
4. Vercel Deployment
5. Domain-Konfiguration

## Verification & Testing

### Development Testing
```bash
npm run dev          # Local server auf localhost:3000
npm run build        # Production build
npm run start        # Production preview
npm run lint         # ESLint checks
```

### Feature-Checkliste
- [ ] Navigation scroll zu Sections
- [ ] Scroll Spy aktualisiert Dots
- [ ] Hamburger Menu funktioniert
- [ ] Typewriter-Effekt läuft
- [ ] Floating Images animieren
- [ ] Skills collapsible (Desktop) / expanded (Mobile)
- [ ] Timeline scrollt mit Animationen
- [ ] Kontaktformular sendet Emails
- [ ] Projects-Seite zeigt 4 Projekte
- [ ] Responsive auf allen Devices
- [ ] Bilder laden optimiert

### Performance Testing
```bash
npm run build
# Lighthouse Score im Browser
# Bundle-Size Analysis
```

### Browser-Kompatibilität
- Chrome (Desktop + Mobile)
- Firefox (Desktop)
- Safari (Desktop + iOS)
- Edge

## Rollback-Plan

Falls Probleme auftreten:
1. Alte Files bleiben als Backup im Repository
2. Vercel erlaubt Rollback zu vorherigen Deployments
3. GitHub Pages kann parallel mit alten Files laufen

## Nächste Schritte nach Migration

Mögliche zukünftige Features:
1. **Blog-System** mit MDX
2. **CMS Integration** (Sanity/Contentful)
3. **Dark Mode** Toggle
4. **Mehrsprachigkeit** (DE/EN)
5. **Analytics** (Vercel Analytics)
6. **Contact Form** erweitert mit Captcha

## Zusammenfassung

Diese Migration bringt:
- ✅ **90%+ Lighthouse Score** (aktuell ~75-85)
- ✅ **Moderne, wartbare Codebasis** mit TypeScript
- ✅ **Bessere Animations-Performance** mit Framer Motion
- ✅ **Professionelles Deployment** auf Vercel
- ✅ **Zukunftssicher** für neue Features
- ✅ **Alle bestehenden Features** erhalten

Die Website bleibt optisch gleich (gleiche Farben, Layout, Struktur), wird aber unter der Haube komplett modernisiert.

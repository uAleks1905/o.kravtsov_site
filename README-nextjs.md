# Portfolio Website - Oleksiy Kravtsov

Moderne Portfolio-Website gebaut mit Next.js 15, TypeScript und Tailwind CSS.

🌐 **Live Demo:** [Wird nach Deployment hinzugefügt]

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animationen:** Framer Motion
- **UI Komponenten:** shadcn/ui
- **Formulare:** React Hook Form + Zod
- **E-Mail:** Resend API
- **Deployment:** Vercel

## 📋 Features

- ✨ **Moderne Animationen:** Typewriter-Effekt, schwebende Bilder, Scroll-Animationen
- 📱 **Voll responsiv:** Optimiert für Desktop, Tablet und Mobile
- 🎨 **Ansprechendes Design:** Benutzerdefinierte Farbpalette und Typografie
- ⚡ **Performance-optimiert:** Lazy Loading, Bildoptimierung, Code Splitting
- 🌐 **SEO-freundlich:** Optimierte Metadaten und statisches Rendering
- 📧 **Kontaktformular:** Funktionierendes E-Mail-Formular mit Validierung
- 🎯 **TypeScript:** Vollständig typsicher

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/uAleks1905/portfolio.git
cd portfolio/portfolio-nextjs

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 📁 Projektstruktur

```
portfolio-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Startseite
│   ├── projects/          # Projekte-Seite
│   └── api/contact/       # Kontaktformular API
├── components/
│   ├── sections/          # Seitenabschnitte (Hero, About, Skills, etc.)
│   ├── animations/        # Animationskomponenten
│   └── ui/                # Wiederverwendbare UI-Komponenten
├── lib/content/           # Content-Daten (TypeScript)
│   ├── skills.ts          # Skills-Daten
│   ├── experience.ts      # Lebenslauf-Daten
│   ├── projects.ts        # Projekt-Daten
│   └── about.ts           # Über-mich-Text
└── public/images/         # Bilder und Assets
```

## 🎨 Inhalte anpassen

### Skills hinzufügen

Bearbeite `lib/content/skills.ts`:

```typescript
export const technicalSkills: Skill[] = [
  {
    name: 'Neue Technologie',
    brief: 'Kurzbeschreibung',
    details: {
      description: 'Detaillierte Beschreibung',
      points: ['Punkt 1', 'Punkt 2', 'Punkt 3'],
    },
    icon: '/images/technologie_icon.png',
  },
  // ...
];
```

### Projekte hinzufügen

Bearbeite `lib/content/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'projekt-id',
    title: 'Projekt-Titel',
    description: 'Beschreibung...',
    details: ['Detail 1', 'Detail 2'],
    image: '/images/projekt_bild.png',
    tags: ['Tag1', 'Tag2'],
    links: {
      github: 'https://github.com/...',
      demo: 'https://...',
    },
  },
  // ...
];
```

### Farben ändern

Bearbeite CSS-Variablen in `app/globals.css`:

```css
:root {
  --brand-primary: #614E56;
  --brand-secondary: #849B87;
  --brand-accent: #C17F59;
  /* ... */
}
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. **GitHub pushen:**
   ```bash
   git push origin main
   ```

2. **Vercel verbinden:**
   - Gehe zu [vercel.com/new](https://vercel.com/new)
   - Importiere dein GitHub Repository
   - Vercel erkennt Next.js automatisch

3. **Umgebungsvariablen setzen:**
   ```
   RESEND_API_KEY=dein_resend_api_schlüssel
   ```

4. **Deploy!**
   - Klicke auf "Deploy"
   - Jeder Push zu `main` löst automatisches Deployment aus

### Lokaler Build

```bash
npm run build   # Erstellt optimierten Build
npm run start   # Startet Produktionsserver
```

## 📧 Kontaktformular einrichten

Das Kontaktformular verwendet [Resend](https://resend.com) zum E-Mail-Versand:

1. Erstelle einen Account bei [resend.com](https://resend.com)
2. Generiere einen API-Key
3. Füge den Key als Umgebungsvariable hinzu:
   ```bash
   # .env.local
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. Konfiguriere die Empfänger-E-Mail in `app/api/contact/route.ts`

## 📱 Browser-Unterstützung

- Chrome/Edge (neueste 2 Versionen)
- Firefox (neueste 2 Versionen)
- Safari 14+
- Mobile Browser (iOS Safari, Chrome Android)

## 🎯 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bildoptimierung:** project_qgis.png von 1.3MB auf 290KB reduziert
- **Code Splitting:** Automatisch durch Next.js
- **Lazy Loading:** Schwere Komponenten werden verzögert geladen
- **Mobile Optimierung:** Animationen auf Mobile deaktiviert

## 📝 Befehle

```bash
npm run dev       # Entwicklungsserver starten
npm run build     # Produktionsbuild erstellen
npm run start     # Produktionsserver starten
npm run lint      # Code-Linting
```

## 🐛 Troubleshooting

**Build-Fehler:**
```bash
npx tsc --noEmit  # TypeScript-Fehler prüfen
npm install       # Dependencies neu installieren
```

**Bilder laden nicht:**
- Prüfe dass Bildpfade mit `/images/` beginnen
- Verifiziere dass `next.config.ts` `images: { unoptimized: true }` enthält

**Kontaktformular funktioniert nicht:**
- Prüfe dass `RESEND_API_KEY` gesetzt ist
- Teste API-Route: `curl -X POST http://localhost:3000/api/contact ...`

## 📄 Lizenz

Dieses Projekt ist ein persönliches Portfolio und nicht unter einer Open-Source-Lizenz veröffentlicht.

## 👤 Autor

**Oleksiy Kravtsov**
- GitHub: [@uAleks1905](https://github.com/uAleks1905)
- LinkedIn: [Oleksiy Kravtsov](https://de.linkedin.com/in/oleksiy-kravtsov-a6aa4a31b)
- Instagram: [@aleks1905](https://www.instagram.com/aleks1905/)

## 🙏 Danksagungen

- Design-Inspiration von modernen Portfolio-Websites
- Animationen powered by [Framer Motion](https://www.framer.com/motion/)
- UI-Komponenten von [shadcn/ui](https://ui.shadcn.com/)
- Gebaut mit [Next.js](https://nextjs.org/)
- Entwickelt mit Unterstützung von Claude Sonnet 4.5

---

**Hinweis:** Diese Website wurde im Februar 2025 von vanilla HTML/CSS/JS zu Next.js 15 migriert. Die alte Version ist in `.old_html_version/` archiviert.

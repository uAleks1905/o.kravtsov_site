# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Oleksiy Kravtsov. All content is in **German**. Built with **Next.js 15**, TypeScript, Tailwind CSS, and Framer Motion.

**Tech Stack:**
- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend API
- **Deployment:** Vercel

## Development

### Setup

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Then open `http://localhost:3000` in a browser.

### Build

```bash
npm run build    # Creates static export in out/
npm run start    # Serve production build locally
```

## Architecture

### Directory Structure

```
├── app/
│   ├── layout.tsx           # Root layout with Navigation & Footer
│   ├── page.tsx             # Home page (Hero, About, Skills, Resume, Contact)
│   ├── projects/            # Projects showcase page
│   │   ├── page.tsx
│   │   └── ProjectList.tsx
│   ├── api/contact/         # Contact form API endpoint
│   │   └── route.ts
│   └── globals.css          # Global styles & Tailwind config
├── components/
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── animations/          # Animation components
│   │   ├── TypewriterEffect.tsx
│   │   └── FloatingImages.tsx
│   └── ui/                  # Reusable UI components
│       ├── Navigation.tsx
│       ├── MobileMenu.tsx
│       ├── Footer.tsx
│       ├── ProjectCard.tsx
│       └── [shadcn components]
├── lib/
│   └── content/             # Content data (TypeScript)
│       ├── skills.ts        # Technical/Soft skills, Languages
│       ├── experience.ts    # Education & Work history
│       ├── projects.ts      # Project showcase data
│       └── about.ts         # Bio text
├── public/images/           # Static assets
├── .old_html_version/       # Archived vanilla HTML version
└── [Next.js config files]   # package.json, next.config.ts, etc.
```

### Page Structure

**Home Page (`/`):**
Sections: Hero → About → Skills → Resume → Contact

**Projects Page (`/projects`):**
Grid of 4 project cards with images, descriptions, tech tags, and links

### Navigation

- **Desktop:** Fixed header with nav links + scroll spy dots (side navigation)
- **Mobile:** Hamburger menu using shadcn Sheet component
- **Smooth scrolling** to anchor sections (#home, #about, etc.)
- **Active section tracking** via IntersectionObserver

### Design System

**Brand Colors** (CSS variables in `globals.css`):
```css
--brand-primary: #614E56      /* Headings, primary text */
--brand-secondary: #849B87    /* Accents, badges */
--brand-accent: #C17F59       /* Links, highlights */
--brand-text: #2D2A2E         /* Body text */
--brand-background: #DBD3CA   /* Page background */
--brand-container: #F9F6F1    /* Card backgrounds */
--brand-hover: #9E8576        /* Hover states */
```

**Typography:**
- Headings: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)

### Key Features

#### 1. Animations

- **TypewriterEffect:** Character-by-character typing animation for hero name/title
- **FloatingImages:** Physics-based floating skill badges (disabled on mobile for performance)
- **Scroll animations:** Framer Motion `whileInView` for fade-in effects
- **Hover effects:** Scale and shadow transitions on cards and buttons

#### 2. Mobile Optimization

- **Mobile detection:** `window.innerWidth <= 768`
- **Skills section:** Collapsed on desktop, expanded on mobile
- **FloatingImages:** Disabled on mobile (returns null)
- **Touch optimization:** `touch-action: manipulation` for buttons/links

#### 3. Performance Optimizations

- **Image optimization:** Next.js `<Image>` component with `unoptimized: true` for static export
- **Hero image:** `priority` prop for faster LCP
- **Lazy loading:** FloatingImages dynamically imported with `ssr: false`
- **Code splitting:** Automatic via Next.js
- **Font optimization:** `next/font` for Inter and Playfair Display

#### 4. Contact Form

- **Client-side validation:** React Hook Form + Zod schema
- **API endpoint:** `/api/contact` (POST) sends email via Resend
- **Email recipient:** `kravtsov.o@icloud.com`
- **Environment variable:** `RESEND_API_KEY` (required for production)

### Content Management

All content is in TypeScript files under `lib/content/`:

- **skills.ts:** 9 technical skills (including 4 AI-focused: Prompt Engineering, Context Engineering, LLM APIs, AI Agents), 6 soft skills, 3 languages
- **experience.ts:** Education (Abitur 2016-2019, Bachelor 2019-2025 with AI specialization) + Work (2 positions)
- **projects.ts:** 4 projects (QGIS Plugin, Chat-Bot, Portfolio, Calculator)
- **about.ts:** Biography paragraphs

To update content, edit these TypeScript files. Changes are type-safe and compile-time validated.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Deploy:**
   - Via CLI: `vercel --prod`
   - Via Dashboard: Import GitHub repo at https://vercel.com/new

3. **Environment Variables:**
   Set in Vercel Dashboard:
   ```
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Automatic Deployments:**
   Every push to `main` auto-deploys to production

### Static Export (Alternative)

The site can be exported as static HTML:

```bash
npm run build
# Output in out/ directory
```

Deploy the `out/` directory to any static host (Netlify, Cloudflare Pages, GitHub Pages).

**Note:** Contact form requires serverless functions, so static export needs a backend for email sending.

## Migration Notes

This site was migrated from vanilla HTML/CSS/JS to Next.js 15 in February 2025. Old files are preserved in `.old_html_version/` for reference.

**Key Changes:**
- Vanilla JS → React components with TypeScript
- Inline CSS → Tailwind CSS utility classes
- EmailJS → Resend API
- Manual animations → Framer Motion
- Single HTML file → Component-based architecture
- Content hardcoded in HTML → TypeScript data files

**Performance Improvements:**
- Image optimization (e.g., project_qgis.png: 1.3MB → 290KB)
- Code splitting and lazy loading
- Mobile-specific optimizations (disabled animations)
- Modern web vitals (LCP, FID, CLS)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Common Tasks

### Add a new skill

Edit `lib/content/skills.ts`, add to `technicalSkills`, `softSkills`, or `languages` array.

### Add a new project

Edit `lib/content/projects.ts`, add to `projects` array. Add project image to `public/images/`.

### Update experience/education

Edit `lib/content/experience.ts`, modify or add entries to `experience` array.

### Change brand colors

Update CSS variables in `app/globals.css` under `:root`.

### Add a new page

Create `app/new-page/page.tsx`. Add link to navigation in `components/ui/Navigation.tsx`.

## Troubleshooting

**Build errors:**
- Run `npx tsc --noEmit` to check TypeScript errors
- Check for missing dependencies: `npm install`

**Images not loading:**
- Verify image paths start with `/images/` (relative to `public/`)
- Check `next.config.ts` has `images: { unoptimized: true }`

**Contact form not working:**
- Verify `RESEND_API_KEY` is set in environment
- Check API route at `/api/contact` returns 200 status
- Test with curl: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Test"}'`

**Animations laggy:**
- Check `FloatingImages` is disabled on mobile
- Verify `will-change: transform` is set on animated elements
- Use Chrome DevTools Performance tab to profile

'use client';

import { Heart, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-text text-brand-container border-t-8 border-brand-primary py-12">
      {/* Top accent bars */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-3 bg-brand-primary text-brand-text border-4 border-brand-container px-6 py-3 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
            <Terminal className="w-5 h-5" strokeWidth={3} />
            <span className="font-['var(--font-bebas)'] text-xl tracking-wider">
              OK
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 font-['var(--font-ibm-mono)'] text-sm">
            <span>&copy; {currentYear} Oleksiy Kravtsov</span>
            <span className="opacity-50">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-brand-primary text-brand-primary" strokeWidth={0} /> and Code
            </span>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-['var(--font-ibm-mono)'] opacity-70">
            <span className="px-2 py-1 bg-brand-container/10 border border-brand-container/30">Next.js 15</span>
            <span className="px-2 py-1 bg-brand-container/10 border border-brand-container/30">TypeScript</span>
            <span className="px-2 py-1 bg-brand-container/10 border border-brand-container/30">Tailwind CSS</span>
            <span className="px-2 py-1 bg-brand-container/10 border border-brand-container/30">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

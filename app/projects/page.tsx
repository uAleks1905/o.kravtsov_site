import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowLeft, Code } from 'lucide-react';
import { projects } from '@/lib/content/projects';
import ProjectList from './ProjectList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Oleksiy Kravtsov - Projekte',
  description:
    'Projekte von Oleksiy Kravtsov - QGIS Plugin, Chat-Bot Architektur, Portfolio Website und mehr',
};

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-80 h-80 border-[12px] border-brand-primary rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-[12px] border-brand-secondary -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 bg-brand-accent border-4 border-brand-text px-6 py-3 mb-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]">
            <Code className="w-6 h-6" strokeWidth={3} />
            <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">PROJECTS.JSX</span>
          </div>
          <h1 className="font-['var(--font-bebas)'] text-6xl sm:text-7xl lg:text-8xl leading-none mb-6">
            MEINE PROJEKTE
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Eine Auswahl meiner technischen Projekte und Entwicklungen
          </p>
        </div>

        {/* Project Cards Grid */}
        <ProjectList projects={projects} />

        {/* Back Button */}
        <div className="flex justify-center mt-20">
          <Link
            href="/"
            className="
              inline-flex items-center gap-3 bg-brand-primary text-brand-text
              border-4 border-brand-text px-8 py-4
              font-['var(--font-bebas)'] text-2xl tracking-wider
              shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]
              hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
              hover:translate-x-[4px] hover:translate-y-[4px]
              active:shadow-none active:translate-x-[8px] active:translate-y-[8px]
              transition-all duration-200
            "
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={3} />
            ZURÜCK ZUR STARTSEITE
          </Link>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-accent"></div>
    </main>
  );
}

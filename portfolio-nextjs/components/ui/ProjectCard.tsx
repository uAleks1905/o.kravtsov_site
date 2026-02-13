'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import type { Project } from '@/lib/content/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const colors = ['brand-primary', 'brand-secondary', 'brand-accent', 'brand-pink'];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-brand-container border-4 border-brand-text shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 overflow-hidden"
    >
      {/* Project Image */}
      <div className="relative h-[250px] overflow-hidden border-b-4 border-brand-text">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-${accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

        {/* Project number badge */}
        <div className={`absolute top-4 right-4 bg-${accentColor} border-4 border-brand-text px-4 py-2 font-['var(--font-bebas)'] text-2xl shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]`}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`bg-${accentColor} border-3 border-brand-text p-2 shrink-0`}>
            <Folder className="w-5 h-5" strokeWidth={3} />
          </div>
          <h3 className="font-['var(--font-bebas)'] text-2xl leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 opacity-90">
          {project.description}
        </p>

        {/* Details */}
        {project.details.length > 0 && (
          <ul className="space-y-2 mb-6">
            {project.details.map((detail, i) => (
              <li key={i} className="text-xs flex items-start gap-2 opacity-80">
                <div className={`bg-${accentColor} w-1.5 h-1.5 mt-1.5 shrink-0 border-2 border-brand-text`}></div>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-brand-text text-brand-container font-['var(--font-ibm-mono)'] text-xs font-bold border-2 border-brand-text"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.links?.github || project.links?.demo) && (
          <div className="flex gap-3 pt-4 border-t-4 border-brand-text">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 bg-${accentColor} border-3 border-brand-text
                  px-4 py-2 font-['var(--font-ibm-mono)'] text-xs font-bold
                  shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                  hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)]
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  transition-all duration-200
                `}
              >
                <Github className="w-4 h-4" strokeWidth={3} />
                CODE
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 bg-brand-text text-brand-primary border-3 border-brand-text
                  px-4 py-2 font-['var(--font-ibm-mono)'] text-xs font-bold
                  shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                  hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)]
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  transition-all duration-200
                `}
              >
                <ExternalLink className="w-4 h-4" strokeWidth={3} />
                DEMO
              </a>
            )}
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-${accentColor} opacity-30`}></div>
    </motion.div>
  );
}

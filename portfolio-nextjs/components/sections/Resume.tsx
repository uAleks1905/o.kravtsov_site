'use client';

import { motion } from 'framer-motion';
import { FileText, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import {
  educationExperience,
  workExperience,
  type ExperienceItem,
} from '@/lib/content/experience';

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
}) {
  const colors = ['brand-primary', 'brand-secondary', 'brand-accent', 'brand-pink'];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-start gap-8 mb-16`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        {/* Year badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          className={`inline-flex items-center gap-2 bg-${accentColor} border-4 border-brand-text px-4 py-2 mb-4 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] font-['var(--font-ibm-mono)'] text-sm font-bold`}
        >
          <Calendar className="w-4 h-4" strokeWidth={3} />
          {item.year}
        </motion.div>

        {/* Main content */}
        <div className={`bg-brand-container border-4 border-brand-text p-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200`}>
          {/* Title */}
          <h4 className="font-['var(--font-bebas)'] text-2xl mb-2">
            {item.title}
          </h4>

          {/* Organization */}
          <p className="font-['var(--font-ibm-mono)'] text-sm mb-4 opacity-70">
            {item.organization}
          </p>

          {/* Details */}
          <ul className="space-y-2">
            {item.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                className={`flex items-start gap-3 text-sm ${isLeft ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className={`bg-${accentColor} w-2 h-2 mt-1.5 shrink-0 border-2 border-brand-text`}></div>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>

          {/* Decorative corner */}
          <div className={`absolute ${isLeft ? 'bottom-0 left-0' : 'top-0 right-0'} w-12 h-12 ${isLeft ? 'border-b-4 border-l-4' : 'border-t-4 border-r-4'} border-${accentColor}`}></div>
        </div>
      </div>

      {/* Center dot */}
      <div className="relative flex-shrink-0">
        <div className={`w-6 h-6 bg-${accentColor} border-4 border-brand-text shadow-[3px_3px_0px_0px_rgba(15,15,15,1)] z-10 relative`}></div>
        {/* Pulse effect */}
        <motion.div
          className={`absolute inset-0 bg-${accentColor}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>
    </motion.div>
  );
}

function TimelineCategory({
  title,
  icon: Icon,
  items,
  color,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  items: ExperienceItem[];
  color: string;
}) {
  return (
    <div className="mb-20">
      {/* Category header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center mb-16"
      >
        <div className={`inline-flex items-center gap-4 bg-${color} border-4 border-brand-text px-8 py-4 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]`}>
          <Icon className="w-8 h-8" strokeWidth={2.5} />
          <h3 className="font-['var(--font-bebas)'] text-4xl tracking-wider">
            {title}
          </h3>
        </div>
      </motion.div>

      {/* Timeline line */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-text -translate-x-1/2 opacity-20"></div>

        {/* Timeline items */}
        {items.map((item, index) => (
          <TimelineItem
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 border-[12px] border-brand-accent rotate-45"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 border-[12px] border-brand-primary -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-brand-secondary border-4 border-brand-text px-6 py-3 mb-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]">
            <FileText className="w-6 h-6" strokeWidth={3} />
            <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">RESUME.JSON</span>
          </div>
          <h2 className="font-['var(--font-bebas)'] text-6xl sm:text-7xl lg:text-8xl leading-none">
            LEBENSLAUF
          </h2>
        </motion.div>

        {/* Desktop: Side-by-side timeline */}
        <div className="hidden lg:block">
          <TimelineCategory
            title="BILDUNG"
            icon={GraduationCap}
            items={educationExperience}
            color="brand-primary"
          />

          <TimelineCategory
            title="BERUFSERFAHRUNG"
            icon={Briefcase}
            items={workExperience}
            color="brand-secondary"
          />
        </div>

        {/* Mobile: Stacked */}
        <div className="lg:hidden space-y-12">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-brand-primary border-4 border-brand-text px-6 py-3 mb-8 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
            >
              <GraduationCap className="w-6 h-6" strokeWidth={3} />
              <h3 className="font-['var(--font-bebas)'] text-3xl">BILDUNG</h3>
            </motion.div>

            <div className="space-y-8">
              {educationExperience.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-brand-container border-4 border-brand-text p-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
                >
                  <div className="inline-flex items-center gap-2 bg-brand-primary border-3 border-brand-text px-3 py-1 mb-3 text-xs font-['var(--font-ibm-mono)'] font-bold">
                    {item.year}
                  </div>
                  <h4 className="font-['var(--font-bebas)'] text-2xl mb-1">{item.title}</h4>
                  <p className="text-sm mb-3 opacity-70">{item.organization}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <div className="bg-brand-primary w-2 h-2 mt-1.5 shrink-0 border-2 border-brand-text"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-brand-secondary border-4 border-brand-text px-6 py-3 mb-8 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
            >
              <Briefcase className="w-6 h-6" strokeWidth={3} />
              <h3 className="font-['var(--font-bebas)'] text-3xl">BERUFSERFAHRUNG</h3>
            </motion.div>

            <div className="space-y-8">
              {workExperience.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-brand-container border-4 border-brand-text p-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
                >
                  <div className="inline-flex items-center gap-2 bg-brand-secondary border-3 border-brand-text px-3 py-1 mb-3 text-xs font-['var(--font-ibm-mono)'] font-bold">
                    {item.year}
                  </div>
                  <h4 className="font-['var(--font-bebas)'] text-2xl mb-1">{item.title}</h4>
                  <p className="text-sm mb-3 opacity-70">{item.organization}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <div className="bg-brand-secondary w-2 h-2 mt-1.5 shrink-0 border-2 border-brand-text"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-pink"></div>
    </section>
  );
}

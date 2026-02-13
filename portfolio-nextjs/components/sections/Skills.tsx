'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Zap } from 'lucide-react';
import { skillCategories, type Skill } from '@/lib/content/skills';

function SkillCard({ skill, isExpanded, onToggle, index }: {
  skill: Skill;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  // Cycle through colors for variety
  const colors = ['brand-primary', 'brand-secondary', 'brand-accent', 'brand-pink'];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`
        bg-brand-container border-4 border-brand-text overflow-hidden
        shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]
        hover:shadow-[3px_3px_0px_0px_rgba(15,15,15,1)]
        hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all duration-200 cursor-pointer
      `}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-['var(--font-bebas)'] text-2xl leading-tight mb-1">
            {skill.name}
          </h4>
          <p className="text-sm opacity-70 leading-snug">
            {skill.brief}
          </p>
        </div>

        {/* Expand/Collapse button */}
        <div className={`bg-${bgColor} border-3 border-brand-text p-2 shrink-0 shadow-[3px_3px_0px_0px_rgba(15,15,15,1)]`}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {isExpanded ? (
              <Minus className="w-5 h-5" strokeWidth={3} />
            ) : (
              <Plus className="w-5 h-5" strokeWidth={3} />
            )}
          </motion.div>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t-4 border-brand-text bg-brand-text/5 p-4">
              <p className="text-sm mb-3 font-['var(--font-ibm-mono)']">
                {skill.details.description}
              </p>
              <ul className="space-y-2">
                {skill.details.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className={`bg-${bgColor} w-2 h-2 mt-1.5 shrink-0 border-2 border-brand-text`}></div>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        // On mobile, expand all cards
        const allKeys = new Set<string>();
        skillCategories.forEach((category) => {
          category.skills.forEach((skill) => {
            allKeys.add(`${category.title}-${skill.name}`);
          });
        });
        setExpandedCards(allKeys);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCard = (key: string) => {
    if (isMobile) return; // Don't collapse on mobile
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 border-[12px] border-brand-secondary rotate-45"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 border-[12px] border-brand-accent -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-brand-primary border-4 border-brand-text px-6 py-3 mb-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]">
            <Zap className="w-6 h-6" strokeWidth={3} />
            <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">SKILLS.TS</span>
          </div>
          <h2 className="font-['var(--font-bebas)'] text-6xl sm:text-7xl lg:text-8xl leading-none">
            FÄHIGKEITEN
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              {/* Category title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="mb-8"
              >
                <div className="inline-block bg-brand-text text-brand-primary border-4 border-brand-text px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,255,136,1)]">
                  <h3 className="font-['var(--font-bebas)'] text-3xl tracking-wider">
                    {category.title}
                  </h3>
                </div>
              </motion.div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => {
                  const key = `${category.title}-${skill.name}`;
                  return (
                    <SkillCard
                      key={key}
                      skill={skill}
                      isExpanded={expandedCards.has(key)}
                      onToggle={() => toggleCard(key)}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="font-['var(--font-ibm-mono)'] text-sm opacity-60">
              {'>'} Klicke auf eine Karte um Details zu sehen
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-accent"></div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { aboutText } from '@/lib/content/about';
import { Sparkles, ArrowRight, User, Code, Target } from 'lucide-react';

const features = [
  {
    icon: User,
    title: 'Über mich',
    color: 'brand-primary',
  },
  {
    icon: Code,
    title: 'Skills',
    color: 'brand-secondary',
  },
  {
    icon: Target,
    title: 'Projekte',
    color: 'brand-accent',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 border-[12px] border-brand-primary rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 border-[12px] border-brand-secondary -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with brutal style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-brand-accent border-4 border-brand-text px-6 py-3 mb-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]">
            <Sparkles className="w-6 h-6" strokeWidth={3} />
            <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">ABOUT.ME</span>
          </div>
          <h2 className="font-['var(--font-bebas)'] text-6xl sm:text-7xl lg:text-8xl leading-none">
            ÜBER MICH
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main content card */}
            <div className="bg-brand-container border-4 border-brand-text p-8 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]">
              <div className="space-y-6">
                {aboutText.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-lg leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                href="/projects"
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
                MEINE PROJEKTE ANSEHEN
                <ArrowRight className="w-6 h-6" strokeWidth={3} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`
                    relative group bg-brand-container border-4 border-brand-text p-6
                    shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]
                    hover:shadow-[3px_3px_0px_0px_rgba(15,15,15,1)]
                    hover:translate-x-[3px] hover:translate-y-[3px]
                    transition-all duration-200
                  `}
                >
                  {/* Icon */}
                  <div className={`inline-flex bg-${feature.color} border-4 border-brand-text p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]`}>
                    <Icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-['var(--font-bebas)'] text-3xl">
                    {feature.title}
                  </h3>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-${feature.color}`}></div>
                </motion.div>
              );
            })}

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-brand-text text-brand-primary border-4 border-brand-text p-6 shadow-[6px_6px_0px_0px_rgba(0,255,136,1)]"
            >
              <p className="font-['var(--font-ibm-mono)'] text-sm leading-relaxed">
                "Code is like humor. When you have to explain it, it's bad."
              </p>
              <p className="font-['var(--font-ibm-mono)'] text-xs mt-2 opacity-70">
                — Cory House
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-secondary"></div>
    </section>
  );
}

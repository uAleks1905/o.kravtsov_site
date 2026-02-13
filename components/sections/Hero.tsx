'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Terminal, Sparkles } from 'lucide-react';

// Lazy load FloatingImages for better performance
const FloatingImages = dynamic(() => import('@/components/animations/FloatingImages'), {
  ssr: false,
});

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/uAleks1905',
    label: 'GitHub',
    icon: Github,
    color: 'brand-primary',
  },
  {
    href: 'https://de.linkedin.com/in/oleksiy-kravtsov-a6aa4a31b',
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'brand-secondary',
  },
  {
    href: 'https://www.instagram.com/aleks1905/',
    label: 'Instagram',
    icon: Instagram,
    color: 'brand-pink',
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <FloatingImages />

      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-[6px] border-brand-primary rotate-12"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 border-[6px] border-brand-secondary -rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 border-[6px] border-brand-accent rotate-45"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Image + decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative corners */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-[6px] border-l-[6px] border-brand-primary"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-[6px] border-r-[6px] border-brand-secondary"></div>

            {/* Profile image with brutalist border */}
            <div className="relative brutalist-border bg-brand-container p-8">
              <div className="relative aspect-square">
                <Image
                  src="/images/profile_picture.jpeg"
                  alt="Oleksiy Kravtsov"
                  fill
                  priority
                  className="object-cover border-4 border-brand-text"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Glitch overlay effect */}
                <div className="absolute inset-0 border-4 border-brand-primary opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-screen"></div>
              </div>

              {/* Tech badge */}
              <div className="absolute -top-4 -right-4 bg-brand-primary border-4 border-brand-text px-4 py-2 rotate-3 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">DEV</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className={`
                    bg-${link.color} border-4 border-brand-text p-4
                    shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                    hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)]
                    hover:translate-x-[2px] hover:translate-y-[2px]
                    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                    transition-all duration-200
                  `}
                >
                  <link.icon size={24} strokeWidth={2.5} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-accent border-4 border-brand-text px-4 py-2 font-['var(--font-ibm-mono)'] text-sm font-bold shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI SPEZIALIST</span>
            </motion.div>

            {/* Name - Bebas Neue extra large */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-['var(--font-bebas)'] text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tight"
            >
              <span className="block">OLEKSIY</span>
              <span className="block text-brand-primary">KRAVTSOV</span>
            </motion.h1>

            {/* Title with glitch effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="bg-brand-text text-brand-background border-4 border-brand-text px-6 py-3 inline-block shadow-[6px_6px_0px_0px_rgba(0,255,136,1)]">
                <span className="font-['var(--font-ibm-mono)'] text-lg sm:text-xl font-bold">
                  {'> '} Softwareentwickler
                </span>
              </div>
              {/* Glitch shadow */}
              <div className="absolute inset-0 bg-brand-secondary opacity-50 translate-x-1 -translate-y-1 -z-10 border-4 border-brand-text"></div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg sm:text-xl leading-relaxed max-w-xl"
            >
              Bachelor of Science in Informatik mit Schwerpunkt{' '}
              <span className="font-bold text-brand-primary">Künstliche Intelligenz</span>
              {' '}an der Leibniz Universität Hannover.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a
                href="#contact"
                className="
                  inline-block bg-brand-primary text-brand-text border-4 border-brand-text
                  px-8 py-4 font-['var(--font-bebas)'] text-2xl tracking-wider
                  shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]
                  hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                  hover:translate-x-[4px] hover:translate-y-[4px]
                  active:shadow-none active:translate-x-[8px] active:translate-y-[8px]
                  transition-all duration-200
                "
              >
                KONTAKT AUFNEHMEN →
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-3 text-sm font-['var(--font-ibm-mono)'] opacity-60"
            >
              <div className="w-12 h-[2px] bg-brand-text"></div>
              <span>SCROLL FOR MORE</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-primary"></div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';
import { Code2, Circle } from 'lucide-react';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'Über mich' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#resume', label: 'Lebenslauf' },
  { href: '/#contact', label: 'Kontakt' },
  { href: '/projects', label: 'Projekte' },
];

const scrollSections = ['home', 'about', 'skills', 'resume', 'contact'];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = scrollSections
        .map((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      const current = sections.find(
        (section) =>
          section && section.top <= 100 && section.bottom > 100
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle smooth scroll for same-page anchors
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Desktop Navigation - Neo-Brutalist */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? 'bg-brand-container border-b-4 border-brand-text shadow-[0_4px_0px_0px_rgba(15,15,15,1)]'
              : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with brutalist box */}
            <Link
              href="/"
              className="relative group"
            >
              <div className="flex items-center gap-3 bg-brand-primary border-4 border-brand-text px-4 py-2 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
                <Code2 size={24} strokeWidth={3} />
                <span className="font-['var(--font-bebas)'] text-2xl tracking-wider">
                  OK
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === `/#${activeSection}` ||
                  (link.href === '/projects' && pathname === '/projects');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`
                      relative px-4 py-2 font-['var(--font-ibm-mono)'] text-sm font-bold
                      border-2 border-transparent transition-all duration-200
                      ${
                        isActive
                          ? 'bg-brand-text text-brand-primary border-brand-text'
                          : 'hover:border-brand-text hover:bg-brand-primary hover:text-brand-text'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu navLinks={navLinks} />
            </div>
          </div>
        </div>

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary"></div>
      </motion.nav>

      {/* Scroll Spy Dots (Desktop Only) - Brutalist style */}
      {pathname === '/' && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
        >
          <div className="flex flex-col gap-6">
            {scrollSections.map((section, index) => {
              const isActive = activeSection === section;
              return (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, `/#${section}`)}
                  className="group relative flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  {/* Square dot instead of circle */}
                  <div
                    className={`
                      w-4 h-4 border-3 border-brand-text transition-all duration-300
                      ${
                        isActive
                          ? 'bg-brand-primary scale-125 shadow-[3px_3px_0px_0px_rgba(15,15,15,1)]'
                          : 'bg-transparent hover:bg-brand-secondary hover:scale-110'
                      }
                    `}
                  />

                  {/* Label */}
                  <span
                    className={`
                      absolute right-8 whitespace-nowrap font-['var(--font-ibm-mono)'] text-xs font-bold
                      bg-brand-text text-brand-primary px-3 py-1 border-2 border-brand-text
                      shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 capitalize
                    `}
                  >
                    {section === 'about'
                      ? 'Über mich'
                      : section === 'resume'
                      ? 'Lebenslauf'
                      : section}
                  </span>

                  {/* Pulse effect for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 w-4 h-4 bg-brand-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Side decoration */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-full bg-brand-text opacity-20 -z-10"></div>
        </motion.div>
      )}
    </>
  );
}

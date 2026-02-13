'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

interface MobileMenuProps {
  navLinks: Array<{ href: string; label: string }>;
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          bg-brand-primary border-4 border-brand-text p-3
          shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
          active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
          transition-all duration-200
        "
        aria-label="Menu öffnen"
      >
        {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
      </button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-text/80 backdrop-blur-sm z-[60]"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="
                fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-[70]
                bg-brand-container border-l-8 border-brand-text
                shadow-[-8px_0_0_0_rgba(15,15,15,1)]
                overflow-y-auto
              "
            >
              {/* Close button */}
              <div className="p-6 border-b-4 border-brand-text flex justify-between items-center bg-brand-text">
                <span className="font-['var(--font-bebas)'] text-3xl text-brand-primary">
                  MENÜ
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    bg-brand-primary border-4 border-brand-background p-2
                    hover:bg-brand-hover transition-colors
                  "
                  aria-label="Menu schließen"
                >
                  <X size={24} strokeWidth={3} className="text-brand-text" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="
                        block w-full text-left p-4
                        font-['var(--font-bebas)'] text-2xl tracking-wider
                        bg-brand-background border-4 border-brand-text
                        hover:bg-brand-primary hover:translate-x-2
                        shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                        hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)]
                        transition-all duration-200
                      "
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-secondary"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

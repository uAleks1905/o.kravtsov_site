'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingTech {
  label: string;
  color: string;
  icon: string;
}

interface FloatingElement {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

// Modern tech stack with brutalist colors
const TECH_STACK: FloatingTech[] = [
  { label: 'TS', color: '#00d9ff', icon: 'TS' },      // TypeScript - Cyan
  { label: 'React', color: '#00ff88', icon: 'R' },   // React - Lime
  { label: 'Next', color: '#ff6b35', icon: 'N' },    // Next.js - Orange
  { label: 'JS', color: '#ff0080', icon: 'JS' },     // JavaScript - Pink
  { label: 'Node', color: '#00ff88', icon: 'n' },    // Node.js - Lime
  { label: 'Git', color: '#ff6b35', icon: 'G' },     // Git - Orange
  { label: 'AI', color: '#00d9ff', icon: 'AI' },     // AI - Cyan
  { label: 'Python', color: '#ff0080', icon: 'Py' }, // Python - Pink
  { label: 'Tail', color: '#00ff88', icon: 'T' },    // Tailwind - Lime
  { label: 'FM', color: '#ff6b35', icon: 'F' },      // Framer Motion - Orange
];

export default function FloatingImages() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationFrameRef = useRef<number>(0);
  const techRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initializeElements = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    elementsRef.current = TECH_STACK.map(() => {
      const size = 50 + Math.random() * 40;
      return {
        x: Math.random() * (rect.width - size),
        y: Math.random() * (rect.height - size),
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        size,
      };
    });

    techRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const el = elementsRef.current[i];
      ref.style.width = `${el.size}px`;
      ref.style.height = `${el.size}px`;
      ref.style.transform = `translate3d(${el.x}px, ${el.y}px, 0) rotate(${el.rotation}deg)`;
    });
  }, []);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    elementsRef.current.forEach((el, i) => {
      el.x += el.speedX;
      el.y += el.speedY;
      el.rotation += el.rotationSpeed;

      if (el.x <= 0 || el.x >= rect.width - el.size) {
        el.speedX *= -1;
        el.x = Math.max(0, Math.min(el.x, rect.width - el.size));
        el.rotationSpeed = (Math.random() - 0.5) * 1.5;
      }
      if (el.y <= 0 || el.y >= rect.height - el.size) {
        el.speedY *= -1;
        el.y = Math.max(0, Math.min(el.y, rect.height - el.size));
        el.rotationSpeed = (Math.random() - 0.5) * 1.5;
      }

      const ref = techRefs.current[i];
      if (ref) {
        ref.style.transform = `translate3d(${el.x}px, ${el.y}px, 0) rotate(${el.rotation}deg)`;
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Disable animations on mobile for better performance
    if (isMobile) return;

    initializeElements();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initializeElements, animate, isMobile]);

  // Don't render on mobile for better performance
  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
    >
      {TECH_STACK.map((tech, i) => (
        <div
          key={i}
          ref={(el) => { techRefs.current[i] = el; }}
          className="absolute will-change-transform"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Brutalist tech badge */}
          <div
            className="flex items-center justify-center font-['var(--font-ibm-mono)'] font-bold border-4 border-brand-text shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] opacity-20 hover:opacity-40 transition-opacity"
            style={{
              backgroundColor: tech.color,
              width: '100%',
              height: '100%',
            }}
          >
            <span className="text-brand-text text-xs sm:text-sm">
              {tech.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

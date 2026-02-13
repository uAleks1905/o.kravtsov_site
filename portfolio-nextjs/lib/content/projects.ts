export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'qgis-plugin',
    title: 'QGIS-Plugin für Avacon',
    description: 'In einem viermonatigen Teamprojekt entwickelte ich ein spezialisiertes Plugin für QGIS, das die Beeinflussung von Hochspannungsleitungen (HSP) auf Telekommunikationsleitungen (TK) berechnet. Dieses komplexe Tool ermöglicht:',
    details: [
      'Präzise Berechnung von Beeinflussungsfaktoren zwischen HSP- und TK-Leitungen',
      'Visualisierung der Ergebnisse in der QGIS-Umgebung',
      'Effiziente Teamarbeit und Koordination während der gesamten Entwicklungsphase',
      'Integration in bestehende Avacon-Systeme',
    ],
    image: '/images/project_qgis.png',
    tags: ['Python', 'QGIS', 'Team Project'],
  },
  {
    id: 'chatbot',
    title: 'Verteilte Chat-Bot Architektur',
    description: 'Entwicklung eines fortschrittlichen Chat-Bot-Systems mit:',
    details: [
      'Server-basierte Nachrichtenverarbeitung',
      'Microservice-Architektur für parallele Anfragenverarbeitung',
      'Skalierbare und effiziente Kommunikationsstrukturen',
    ],
    image: '/images/project_chat_bot.png',
    tags: ['Java', 'Microservices'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website - Next.js 15',
    description: 'Moderne Portfolio-Website mit Next.js 15 und Neo-Brutalist Design. Vollständige Migration von Vanilla HTML/CSS/JS zu einem professionellen React-Framework mit TypeScript:',
    details: [
      'Next.js 15 mit App Router und Static Export für optimale Performance',
      'Neo-Brutalist Design: Bold Typography, 3D Shadows, Custom Cursor, Grain Texture',
      'TypeScript für Type-Safety und bessere Developer Experience',
      'Tailwind CSS 4 mit Custom Design System und Brand Colors',
      'Framer Motion für flüssige Animationen und Micro-Interactions',
      'Responsive Design mit Mobile-First Approach',
      'Contact Form mit React Hook Form, Zod Validation und Resend API',
      'Lighthouse Score 95+ (Performance, Accessibility, Best Practices, SEO)',
      'Deployment auf Vercel mit automatischen CI/CD Pipelines',
    ],
    image: '/images/project_portfolio.png',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React', 'Vercel'],
    links: {
      github: 'https://github.com/okravtsov',
      demo: 'https://portfolio-okravtsov.vercel.app',
    },
  },
  {
    id: 'calculator',
    title: 'Wissenschaftlicher Taschenrechner',
    description: 'Implementierung eines wissenschaftlichen Taschenrechners mit erweiterten Funktionen:',
    details: [
      'Komplexe mathematische Berechnungen',
      'Schnelle berechnung in der Shell',
      'Erweiterbare Architektur',
    ],
    image: '/images/project_calculator.png',
    tags: ['C'],
  },
];

export interface ExperienceItem {
  year: string;
  title: string;
  organization: string;
  details: string[];
  type: 'education' | 'work';
}

export const experience: ExperienceItem[] = [
  // Education
  {
    year: '2016 - 2019',
    title: 'Abitur mit Schwerpunkt Informatik',
    organization: 'Eugen-Reintjes-Schule Hameln',
    details: [
      'Erste praktische Programmiererfahrungen mit Java',
      'Grundlagen der Informatik und algorithmisches Denken',
    ],
    type: 'education',
  },
  {
    year: '2019 - 2025',
    title: 'Bachelor of Science - Informatik mit Schwerpunkt KI',
    organization: 'Leibniz Universität Hannover',
    details: [
      'Schwerpunkt: Künstliche Intelligenz und Machine Learning',
      'Bachelorarbeit: KI im Einsatz der Anforderungserweiterung',
      'Praktische Erfahrung mit LLMs, Prompt Engineering und AI-Integration',
      'Umfassende Ausbildung in verschiedenen Programmiersprachen',
      'Vertiefung in Algorithmen und Datenstrukturen',
    ],
    type: 'education',
  },
  // Work Experience
  {
    year: '2022 - Heute',
    title: 'IT-Administrator & Webentwickler',
    organization: 'Goldener Elch GmbH',
    details: [
      'Moderne Webentwicklung mit Next.js 15, React, TypeScript und Tailwind CSS',
      'Entwicklung responsiver und performanter Web-Anwendungen',
      'Integration von AI-Features und LLM-APIs in Web-Projekte',
      'Unterstützung bei der ISO 9001 Zertifizierung',
      'Administrative Tätigkeiten in Windows Server Umgebung',
      'Entwicklung und Implementierung von Prozessautomatisierungen',
      'Microsoft 365 Administration und Verwaltung der M365-Umgebung',
      'Umfassende Kenntnisse in M365-Services und deren Integration',
    ],
    type: 'work',
  },
];

export const educationExperience = experience.filter((item) => item.type === 'education');
export const workExperience = experience.filter((item) => item.type === 'work');

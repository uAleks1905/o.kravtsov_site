export interface Skill {
  name: string;
  brief: string;
  details: {
    description: string;
    points: string[];
  };
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const technicalSkills: Skill[] = [
  {
    name: 'C',
    brief: 'Systemnahe Programmierung',
    details: {
      description: 'Fundierte Kenntnisse in systemnaher Programmierung:',
      points: [
        'Speicherverwaltung und Pointer',
        'Systemprogrammierung',
        'Prozess- und Thread-Management',
        'Low-Level Optimierung',
        'Hardware-nahe Entwicklung',
      ],
    },
    icon: '/images/c_picture.jpeg',
  },
  {
    name: 'Java',
    brief: 'Objektorientierte Entwicklung',
    details: {
      description: 'Clean Code und objektorientierte Programmierung:',
      points: [
        'OOP-Prinzipien und Best Practices',
        'Design Patterns',
        'Java Collections Framework',
        'Multithreading',
        'Unit Testing',
      ],
    },
    icon: '/images/java_picture.jpg',
  },
  {
    name: 'Python',
    brief: 'Skriptentwicklung & Datenverarbeitung',
    details: {
      description: 'Erstellung von Skripten und Anwendungen:',
      points: [
        'Datenverarbeitung und -analyse',
        'Automatisierung',
        'Skript-Entwicklung',
        'Python Libraries',
        'Datenbank-Integration',
      ],
    },
    icon: '/images/python_picture.jpg',
  },
  {
    name: 'Basic-Web',
    brief: 'Webentwicklung Grundlagen',
    details: {
      description: 'Grundlegende Kenntnisse in Webtechnologien:',
      points: [
        'HTML5 & CSS3',
        'JavaScript Basics',
        'Responsive Design',
        'Web-Standards',
        'Frontend-Entwicklung',
      ],
    },
    icon: '/images/html_picture.png',
  },
  {
    name: 'Algorithmen',
    brief: 'Algorithmen-Design & Optimierung',
    details: {
      description: 'Entwicklung effizienter Algorithmen:',
      points: [
        'Komplexitätsanalyse',
        'Optimierungsstrategien',
        'Datenstrukturen',
        'Problemlösungsansätze',
        'Performance-Tuning',
      ],
    },
    icon: '/images/data_picture.jpg',
  },
  {
    name: 'Prompt Engineering',
    brief: 'Fortgeschrittenes Prompt-Design für LLMs',
    details: {
      description: 'Advanced Prompt-Engineering Techniken:',
      points: [
        'Chain-of-Thought Prompting',
        'Few-Shot Learning',
        'Prompt Patterns',
        'Systematische Optimierung',
        'Best Practices',
      ],
    },
    icon: '/images/ai_picture.jpg',
  },
  {
    name: 'Context Engineering',
    brief: 'KI-Kontext-Optimierung & Memory Management',
    details: {
      description: 'Kontext-Optimierung für KI-Systeme:',
      points: [
        'Kontext-Fenster Optimierung',
        'RAG (Retrieval-Augmented Generation)',
        'Memory Management',
        'Informationsarchitektur',
        'Chunk-Strategien',
      ],
    },
    icon: '/images/ai_picture.jpg',
  },
  {
    name: 'LLM Integration & APIs',
    brief: 'Large Language Model Integration',
    details: {
      description: 'Integration von LLM-Diensten:',
      points: [
        'OpenAI API',
        'Anthropic Claude API',
        'Langchain Framework',
        'API-Orchestrierung',
        'Token-Management',
      ],
    },
    icon: '/images/ai_picture.jpg',
  },
  {
    name: 'AI-Agenten & Workflows',
    brief: 'Multi-Agent Systeme & Agentic AI',
    details: {
      description: 'Entwicklung von AI-Agenten-Systemen:',
      points: [
        'Agent-Architekturen',
        'Tool Use',
        'Multi-Agent Koordination',
        'Workflow-Automatisierung',
        'MCP (Model Context Protocol)',
      ],
    },
    icon: '/images/ai_picture.jpg',
  },
  {
    name: 'Git',
    brief: 'Versionskontrolle',
    details: {
      description: 'Professionelle Versionskontrolle:',
      points: [
        'Repository-Management',
        'Branching-Strategien',
        'Kollaboratives Arbeiten',
        'Konfliktlösung',
        'Git-Workflow',
      ],
    },
    icon: '/images/git_picture.png',
  },
  {
    name: 'Software-Design',
    brief: 'Architektur & Design',
    details: {
      description: 'Entwicklung skalierbarer Architekturen:',
      points: [
        'Design Patterns',
        'Clean Architecture',
        'SOLID Prinzipien',
        'Microservices',
        'System-Design',
      ],
    },
  },
  {
    name: 'Linux',
    brief: 'System-Administration',
    details: {
      description: 'Linux Administration und Konfiguration:',
      points: [
        'System-Management',
        'Shell-Scripting',
        'Netzwerkkonfiguration',
        'Sicherheit',
        'Troubleshooting',
      ],
    },
  },
];

export const softSkills: Skill[] = [
  {
    name: 'Problemlösung',
    brief: 'Analytisches Denken',
    details: {
      description: 'Strukturierte Herangehensweise an Probleme:',
      points: [
        'Analytisches Denken',
        'Kreative Lösungsfindung',
        'Systematische Analyse',
        'Kritisches Denken',
        'Entscheidungsfindung',
      ],
    },
  },
  {
    name: 'Kommunikation',
    brief: 'Effektive Kommunikation',
    details: {
      description: 'Klare und effektive Kommunikation:',
      points: [
        'Präsentationsfähigkeiten',
        'Stakeholder-Management',
        'Technische Dokumentation',
        'Aktives Zuhören',
        'Feedback-Kultur',
      ],
    },
  },
  {
    name: 'Agile Methoden',
    brief: 'Agiles Projektmanagement',
    details: {
      description: 'Erfahrung in agilen Methoden:',
      points: [
        'Scrum Framework',
        'Kanban-Prinzipien',
        'Sprint Planning',
        'Retrospektiven',
        'Continuous Improvement',
      ],
    },
  },
  {
    name: 'Zeitmanagement',
    brief: 'Effiziente Organisation',
    details: {
      description: 'Strukturierte Aufgabenorganisation:',
      points: [
        'Prioritätensetzung',
        'Projektplanung',
        'Deadline-Management',
        'Ressourcenplanung',
        'Work-Life-Balance',
      ],
    },
  },
  {
    name: 'Teamarbeit',
    brief: 'Kollaborative Zusammenarbeit',
    details: {
      description: 'Erfolgreiche Teamarbeit:',
      points: [
        'Teambuilding',
        'Konfliktmanagement',
        'Mentoring',
        'Kulturelle Sensibilität',
        'Gemeinsame Zielerreichung',
      ],
    },
  },
  {
    name: 'Lernfähigkeit',
    brief: 'Kontinuierliches Lernen',
    details: {
      description: 'Kontinuierliches Lernen:',
      points: [
        'Schnelle Auffassungsgabe',
        'Eigenständige Weiterbildung',
        'Aktive Wissenssuche',
        'Anpassungsfähigkeit',
        'Technologie-Updates',
      ],
    },
  },
];

export const languages: Skill[] = [
  {
    name: 'Deutsch',
    brief: 'Muttersprachliches Niveau',
    details: {
      description: 'Umfassende Sprachkenntnisse:',
      points: [
        'Fließend in Wort und Schrift',
        'Akademisches Schreiben',
        'Technische Dokumentation',
        'Geschäftskommunikation',
        'Präsentationsfähigkeiten',
      ],
    },
  },
  {
    name: 'Englisch',
    brief: 'Sehr gute Kenntnisse',
    details: {
      description: 'Fundierte Sprachkenntnisse:',
      points: [
        'Schulische Ausbildung bis zum Abitur',
        'Aktive Anwendung im Studium',
        'Technische Dokumentation',
        'Fachspezifische IT-Terminologie',
      ],
    },
  },
  {
    name: 'Russisch',
    brief: 'Muttersprachliche Kenntnisse',
    details: {
      description: 'Seit der Kindheit:',
      points: [
        'Fließend im Sprechen',
        'Sehr gutes Leseverständnis',
        'Mündliche Kommunikation',
        'Kulturelles Verständnis',
        'Alltagskommunikation',
      ],
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Technische Skills',
    skills: technicalSkills,
  },
  {
    title: 'Soft Skills',
    skills: softSkills,
  },
  {
    title: 'Sprachen',
    skills: languages,
  },
];

// Floating badge images for animations
export const floatingBadges = [
  { src: '/images/ai_picture.jpg', alt: 'AI' },
  { src: '/images/c_picture.jpeg', alt: 'C' },
  { src: '/images/data_picture.jpg', alt: 'Data' },
  { src: '/images/git_picture.png', alt: 'Git' },
  { src: '/images/html_picture.png', alt: 'HTML' },
  { src: '/images/java_picture.jpg', alt: 'Java' },
  { src: '/images/python_picture.jpg', alt: 'Python' },
  { src: '/images/python_picture.png', alt: 'Python' },
];

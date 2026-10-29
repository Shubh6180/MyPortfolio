export type ProjectCategory = 
  | 'HACKATHON PROTOTYPE'
  | 'PROPOSED ARCHITECTURE / CONCEPT'
  | 'EXPLORATORY CODE & UTILITIES'
  | 'FOUNDATIONAL LEARNING';

export interface StarMethodology {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  statusBadge: string;
  timeframe: string;
  summary: string;
  star: StarMethodology;
  technologies: string[];
  keyLearnings: string[];
  verifiedLinks?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  interactiveType: 'hostlur-preview' | 'urbanpulse-telemetry' | 'python-playground' | 'game-engine';
  isFlagship?: boolean;
}

export type SkillStage = 'Building With' | 'Exploring & Learning' | 'Foundational';
export type SkillCategory = 'All' | 'Languages' | 'Web & Frontend' | 'Core CS & AI' | 'Developer Tools';

export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Web & Frontend' | 'Core CS & AI' | 'Developer Tools';
  stage: SkillStage;
  relevance: string;
  application: string;
}

export interface JourneyMilestone {
  era: string;
  phaseLabel: string;
  title: string;
  institutionOrContext: string;
  description: string;
  keyTakeaway: string;
  tags: string[];
  type: 'education' | 'early-spark' | 'hackathon' | 'expansion' | 'current';
}


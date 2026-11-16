export type IdentityId = 'developer' | 'designer' | 'builder' | 'explorer' | 'creator';

export interface IdentityState {
  id: IdentityId;
  stateNumber: string;
  roleName: string;
  headline: string;
  supportingLine: string;
  accentColor: string;
  glowColor: string;
  badge: string;
  visualType: 'code' | 'wireframe' | 'workflow' | 'analytics' | 'creative';
  codeSnippet?: string;
  visualTokens: string[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technicalDetails: string[];
  simulatedNote?: string;
  iconName: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  description?: string;
  role: string;
  files: string[];
  tech: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  sampleRequest?: string;
  sampleResponse?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  flagshipNumber?: string;
  isFlagship: boolean;
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  heroImage: string;
  problem: {
    title: string;
    description: string;
    points: { title: string; desc: string }[];
  };
  solution: {
    title: string;
    description: string;
    pillars: { title: string; desc: string; icon: string }[];
  };
  features: ProjectFeature[];
  architecture: {
    description: string;
    nodes: ArchitectureNode[];
  };
  apiEndpoints: ApiEndpoint[];
  engineeringDeepDive: {
    frontend: { title: string; summary: string; code: string };
    backend: { title: string; summary: string; code: string };
    database: { title: string; summary: string; code: string };
    deployment: { title: string; summary: string };
  };
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Data & Analytics' | 'UI/UX' | 'Exploration';
  status: 'Experienced' | 'Working knowledge' | 'Currently learning';
  icon: string;
  projectLinked?: string;
  projectUrl?: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  explanation: string;
  deliverables: string[];
  technologies: string[];
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  institutionOrContext: string;
  description: string;
  category: 'Education' | 'Milestone' | 'Project' | 'Ambition';
  skillsUsed: string[];
}

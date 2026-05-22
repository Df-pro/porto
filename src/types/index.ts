// ========================================
// Type Definitions — Dwi Ferdianto Portfolio
// ========================================

export interface Project {
  slug: string;
  name: string;
  category: string[];
  status: 'Active' | 'Research' | 'Completed' | 'Ongoing';
  statusLabel: string;
  featured: boolean;
  onChain: boolean;
  description: string;
  shortDescription: string;
  responsibilities: string[];
  techStack: string[];
  icon: string;
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  color: 'green' | 'cyan' | 'purple' | 'orange' | 'white';
  colorHex: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  organization: string;
  status: 'ACTIVE' | 'COMPLETED';
  description?: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NFTData {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  network: string;
  openseaUrl?: string;
}

export interface StatCounter {
  value: string;
  label: string;
}

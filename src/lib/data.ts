export const CONTACT = {
  name: 'Daniel Adegbuyi',
  title: 'Web Developer',
  tagline: 'Turn Ideas Into Fast, Modern, Responsive Websites',
  brand: 'BUILD \u2022 FIX \u2022 IMPROVE',
  email: 'dadegbuyi52@gmail.com',
  phoneDisplay: '+234 806 995 3285',
  whatsapp:
    'https://wa.me/2348069953285?text=Hi%20Daniel%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  location: 'Nigeria',
  portfolioStatus: 'Coming Soon',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  category_label: string;
  description: string;
  technologies: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  case_study_url: string | null;
  status: string;
  placeholder: boolean;
  sort_order: number;
}

export interface Technology {
  id: number;
  name: string;
  category: string;
  category_label: string;
  logo_url: string;
  icon_invert: boolean;
  sort_order: number;
}

export interface SkillCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: string[];
  sort_order: number;
}

export type SiteSettings = Record<string, string>;

export async function fetchList<T>(path: string): Promise<T[]> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Unexpected response format');
  return data as T[];
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch('/api/settings');
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as SiteSettings;
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

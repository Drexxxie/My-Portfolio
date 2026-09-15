import type { SkillCard, Technology } from '../lib/data';

/**
 * Local skills data — mirrors the `technologies` and `skill_cards`
 * database tables. Used as a fallback when the `/api/technologies`
 * and `/api/skill-cards` routes are unavailable (e.g. running the
 * site from the terminal with `npm run dev`), so the Skills
 * section always renders.
 */
export const technologies: Technology[] = [
  { id: 1, name: 'HTML5', category: 'core', category_label: 'Core Web', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', icon_invert: false, sort_order: 1 },
  { id: 2, name: 'CSS3', category: 'core', category_label: 'Core Web', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', icon_invert: false, sort_order: 2 },
  { id: 3, name: 'JavaScript', category: 'core', category_label: 'Core Web', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', icon_invert: false, sort_order: 3 },
  { id: 4, name: 'React', category: 'frontend', category_label: 'Frontend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', icon_invert: false, sort_order: 4 },
  { id: 5, name: 'TypeScript', category: 'frontend', category_label: 'Frontend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', icon_invert: false, sort_order: 5 },
  { id: 6, name: 'Tailwind CSS', category: 'frontend', category_label: 'Frontend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', icon_invert: false, sort_order: 6 },
  { id: 7, name: 'Vite', category: 'frontend', category_label: 'Frontend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', icon_invert: false, sort_order: 7 },
  { id: 8, name: 'Node.js', category: 'backend', category_label: 'Backend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', icon_invert: false, sort_order: 8 },
  { id: 9, name: 'Express.js', category: 'backend', category_label: 'Backend', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', icon_invert: true, sort_order: 9 },
  { id: 10, name: 'MongoDB', category: 'data', category_label: 'Database / Services', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', icon_invert: false, sort_order: 10 },
  { id: 11, name: 'PostgreSQL', category: 'data', category_label: 'Database / Services', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', icon_invert: false, sort_order: 11 },
  { id: 12, name: 'Supabase', category: 'data', category_label: 'Database / Services', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', icon_invert: false, sort_order: 12 },
  { id: 13, name: 'Git', category: 'tools', category_label: 'Development Tools', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', icon_invert: false, sort_order: 13 },
  { id: 14, name: 'GitHub', category: 'tools', category_label: 'Development Tools', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', icon_invert: true, sort_order: 14 },
  { id: 15, name: 'VS Code', category: 'tools', category_label: 'Development Tools', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', icon_invert: false, sort_order: 15 },
];

export const skillCards: SkillCard[] = [
  {
    id: 1,
    title: 'Frontend',
    description: 'Interfaces built with modern, component-based tools.',
    icon: 'Code2',
    points: ['React & TypeScript', 'Responsive layouts', 'Interactive UI states'],
    sort_order: 1,
  },
  {
    id: 2,
    title: 'UI / UX',
    description: 'Clean, usable designs focused on the visitor.',
    icon: 'Palette',
    points: ['Clear visual hierarchy', 'Consistent styling', 'Mobile-first thinking'],
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Backend & Data',
    description: 'Connecting interfaces to real functionality.',
    icon: 'Database',
    points: ['APIs & data fetching', 'Databases & auth basics', 'Form handling'],
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Dev Practices',
    description: 'A reliable workflow behind every project.',
    icon: 'GitBranch',
    points: ['Git version control', 'Clean, readable code', 'Testing & refinement'],
    sort_order: 4,
  },
];

export default technologies;

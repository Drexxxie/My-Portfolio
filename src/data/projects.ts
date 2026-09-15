import type { Project } from '../lib/data';

/**
 * Local projects data — mirrors the `projects` database table.
 * Used as a fallback when the `/api/projects` route is unavailable
 * (e.g. running the site from the terminal with `npm run dev`),
 * so the Projects section always renders.
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'AI Smart Todo List',
    category: 'web-apps',
    category_label: 'Personal Project / In Development',
    description:
      'An intelligent task-management application designed to help users organize tasks, priorities, generate schedules, and manage productivity more efficiently.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image_url: '/projects/ai-smart-todo.png',
    live_url: null,
    github_url: null,
    case_study_url: null,
    status: 'In Development',
    placeholder: false,
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Your Project Here',
    category: 'websites',
    category_label: 'Open Slot',
    description:
      'This space is reserved for upcoming work. Have a website or web app in mind? Let\u2019s build something worth showcasing.',
    technologies: [],
    image_url: null,
    live_url: null,
    github_url: null,
    case_study_url: null,
    status: 'Coming Soon',
    placeholder: true,
    sort_order: 2,
  },
];

export default projects;

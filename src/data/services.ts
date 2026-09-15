import type { Service } from '../lib/data';

/**
 * Local services data — mirrors the `services` database table.
 * Used as a fallback when the `/api/services` route is unavailable
 * (e.g. running the site from the terminal with `npm run dev`),
 * so the Services section always renders.
 */
export const services: Service[] = [
  {
    id: 1,
    title: 'Website Development',
    description:
      'Complete, modern websites built from the ground up — designed around your goals and ready to represent your business online.',
    icon: 'Globe',
    features: [
      'Custom pages built around your content',
      'Clean structure that is easy to navigate',
      'Optimized for speed and search engines',
    ],
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Frontend Development',
    description:
      'Responsive, interactive interfaces built with modern tools — turning designs into smooth, working experiences in the browser.',
    icon: 'Code2',
    features: [
      'React + TypeScript development',
      'Pixel-considered layouts from designs',
      'Smooth interactions and animations',
    ],
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Web Applications',
    description:
      'Functional web apps with real features — dashboards, forms, data handling, and interfaces your users can actually work with.',
    icon: 'AppWindow',
    features: [
      'Interactive features and workflows',
      'Forms, validation, and data display',
      'Built to grow with your needs',
    ],
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Responsive Design',
    description:
      'Layouts that adapt beautifully to every screen — mobile, tablet, and desktop — so every visitor gets the best experience.',
    icon: 'Smartphone',
    features: [
      'Mobile-first layout approach',
      'Tested across screen sizes',
      'Touch-friendly navigation',
    ],
    sort_order: 4,
  },
  {
    id: 5,
    title: 'Website Improvements',
    description:
      'Already have a website? I help fix issues, refresh outdated designs, and improve speed, layout, and usability.',
    icon: 'Wrench',
    features: [
      'Fix layout and display issues',
      'Refresh outdated sections',
      'Improve speed and usability',
    ],
    sort_order: 5,
  },
  {
    id: 6,
    title: 'Website Maintenance',
    description:
      'Ongoing care for your website — updates, small changes, and fixes that keep everything running smoothly over time.',
    icon: 'ShieldCheck',
    features: [
      'Content and section updates',
      'Bug fixes and improvements',
      'Reliable ongoing support',
    ],
    sort_order: 6,
  },
];

export default services;

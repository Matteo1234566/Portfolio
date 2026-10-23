// Nintendo-related projects: shown on /nintendo and hidden from the main Projects grid.
// Add new entries here (ids must match `Projects.items.<id>` in messages/*.json).
export const NINTENDO_PROJECTS = [
  { id: 'pyquark', link: '/pyquark', techCount: 4 },
  { id: 'puse', link: '/puse', techCount: 4 },
];

export const NINTENDO_PROJECT_IDS = NINTENDO_PROJECTS.map((project) => project.id);

export const projects = [
  {
    id: "portfolio-site",
    title: "Portfolio Website",
    category: "web",
    description: "A personal website to show my work and skills.",
    details:
      "Built with Next.js and Tailwind CSS. Includes a projects section and contact form.",
  },
  {
    id: "shop-landing",
    title: "Shop Landing Page",
    category: "ui",
    description: "A clean landing page for an online store.",
    details:
      "Focused on responsive layout, readable content, and clear call-to-action buttons.",
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    category: "app",
    description: "A simple app to manage daily tasks.",
    details:
      "Includes add, edit, and complete features with basic local state management.",
  },
];

export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

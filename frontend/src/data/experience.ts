export interface ExperienceItem {
  company: string;
  roleKey: string;
  period: string;
  descriptionKey: string;
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "Datalitica",
    roleKey: "experience.list.job2.role",
    period: "2025 — Present",
    descriptionKey: "experience.list.job2.description",
    tags: ["Python", "SQL", "Looker", "Google Cloud", "Google Sheets"],
  },
  {
    company: "GITNII",
    roleKey: "experience.list.job1.role",
    period: "2025 — 2026",
    descriptionKey: "experience.list.job1.description",
    tags: ["n8n", "Qdrant", "Docker", "LLMs"],
  },
];

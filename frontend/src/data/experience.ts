export interface ExperienceItem {
  company: string;
  roleKey: string;
  period: string;
  descriptionKey: string;
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "TechCorp",
    roleKey: "experience.list.job1.role",
    period: "2022 — Present",
    descriptionKey: "experience.list.job1.description",
    tags: ["Python", "SQL", "Tableau", "AWS"],
  },
  {
    company: "DataStart",
    roleKey: "experience.list.job2.role",
    period: "2020 — 2022",
    descriptionKey: "experience.list.job2.description",
    tags: ["Python", "R", "Power BI", "PostgreSQL"],
  },
  {
    company: "AnalyticsLab",
    roleKey: "experience.list.job3.role",
    period: "2019 — 2020",
    descriptionKey: "experience.list.job3.description",
    tags: ["Excel", "SQL", "Python", "Data Visualization"],
  },
];

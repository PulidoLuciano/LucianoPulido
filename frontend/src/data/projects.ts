export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    titleKey: "projects.list.portfolio.title",
    descriptionKey: "projects.list.portfolio.description",
    tags: ["Astro", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: "data-dashboard",
    titleKey: "projects.list.dataDashboard.title",
    descriptionKey: "projects.list.dataDashboard.description",
    tags: ["Python", "React", "D3.js", "FastAPI"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: "etl-pipeline",
    titleKey: "projects.list.etlPipeline.title",
    descriptionKey: "projects.list.etlPipeline.description",
    tags: ["Python", "SQL", "Apache Airflow", "Docker"],
    sourceUrl: "#",
  },
  {
    id: "ml-classifier",
    titleKey: "projects.list.mlClassifier.title",
    descriptionKey: "projects.list.mlClassifier.description",
    tags: ["Python", "scikit-learn", "Pandas", "Jupyter"],
    sourceUrl: "#",
  },
];

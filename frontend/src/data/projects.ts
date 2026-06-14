export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    titleKey: "projects.list.portfolio.title",
    descriptionKey: "projects.list.portfolio.description",
    tags: ["Astro", "Tailwind CSS", "TypeScript"],
    image: "https://placehold.co/600x400/283618/FEFAE0?text=Portfolio",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: "data-dashboard",
    titleKey: "projects.list.dataDashboard.title",
    descriptionKey: "projects.list.dataDashboard.description",
    tags: ["Python", "React", "D3.js", "FastAPI"],
    image: "https://placehold.co/600x400/606C38/FEFAE0?text=Dashboard",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: "etl-pipeline",
    titleKey: "projects.list.etlPipeline.title",
    descriptionKey: "projects.list.etlPipeline.description",
    tags: ["Python", "SQL", "Apache Airflow", "Docker"],
    image: "https://placehold.co/600x400/DDA15E/283618?text=ETL+Pipeline",
    sourceUrl: "#",
  },
  {
    id: "ml-classifier",
    titleKey: "projects.list.mlClassifier.title",
    descriptionKey: "projects.list.mlClassifier.description",
    tags: ["Python", "scikit-learn", "Pandas", "Jupyter"],
    image: "https://placehold.co/600x400/BC6C25/FEFAE0?text=ML+Classifier",
    sourceUrl: "#",
  },
];

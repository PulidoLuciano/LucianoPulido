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
    id: "pneumoniaCNN",
    titleKey: "projects.list.pneumoniaCNN.title",
    descriptionKey: "projects.list.pneumoniaCNN.description",
    tags: ["CNNs", "Python", "Keras", "Tensorflow"],
    image: "https://placehold.co/600x400/283618/FEFAE0?text=PneumoniaCNN",
    sourceUrl: "https://github.com/PulidoLuciano/pneumoniaCNN",
  },
  {
    id: "retailClustering",
    titleKey: "projects.list.retailClustering.title",
    descriptionKey: "projects.list.retailClustering.description",
    tags: ["Python", "scikit-learn", "Clustering", "Dagster", "MlFlow"],
    image: "https://placehold.co/600x400/606C38/FEFAE0?text=Retail Clustering",
    sourceUrl: "https://github.com/PulidoLuciano/RetailClustering",
  },
  {
    id: "chatbotCNRT",
    titleKey: "projects.list.chatbotCNRT.title",
    descriptionKey: "projects.list.chatbotCNRT.description",
    tags: ["LLMs", "n8n", "Qdrant", "Docker"],
    image: "https://placehold.co/600x400/DDA15E/283618?text=Chatbot CNRT",
    sourceUrl: "https://github.com/PulidoLuciano/Chatbot-CNRT",
  },
  {
    id: "iterolingua",
    titleKey: "projects.list.iterolingua.title",
    descriptionKey: "projects.list.iterolingua.description",
    tags: ["TypeScript", "AI", "Supabase", "PostgreSQL"],
    image: "https://placehold.co/600x400/BC6C25/FEFAE0?text=ML+Classifier",
    sourceUrl: "https://github.com/PulidoLuciano/IteroLingua",
    liveUrl: "https://iterolingua.vercel.app/",
  },
];

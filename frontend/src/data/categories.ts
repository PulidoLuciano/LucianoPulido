export interface Category {
	slug: string;
	nameKey: string;
}

export const categories: Category[] = [
	{ slug: "go-backend", nameKey: "categories.goBackend" },
	{ slug: "frontend", nameKey: "categories.frontend" },
	{ slug: "ai-ml", nameKey: "categories.aiMl" },
	{ slug: "devops", nameKey: "categories.devops" },
	{ slug: "career", nameKey: "categories.career" },
];

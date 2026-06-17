const API_URL = process.env.API_URL || "http://localhost:8080";

export interface CategorySummary {
	id: number;
	slug: string;
	name: string;
}

export interface PostSummary {
	id: number;
	slug: string;
	title: string;
	image_url: string | null;
	read_time_minutes: number;
	categories: CategorySummary[] | null;
	created_at: string;
}

export interface PaginatedPosts {
	posts: PostSummary[];
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
}

export async function fetchPosts(
	locale: string,
	page = 1,
	perPage = 10,
	category?: string,
): Promise<PaginatedPosts | null> {
	const params = new URLSearchParams();
	params.set("lang", locale);
	params.set("page", String(page));
	params.set("per_page", String(perPage));
	if (category) {
		params.set("category", category);
	}

	try {
		const res = await fetch(`${API_URL}/api/posts?${params}`);
		if (!res.ok) {
			console.error("fetchPosts failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchPosts error:", err);
		return null;
	}
}

export interface PostDetail {
	id: number;
	slug: string;
	title: string;
	content: string;
	image_url: string | null;
	read_time_minutes: number;
	total_views: number;
	view_id: number;
	categories: CategorySummary[];
	created_at: string;
}

export async function fetchPost(
	locale: string,
	slug: string,
): Promise<PostDetail | null> {
	const params = new URLSearchParams();
	params.set("lang", locale);

	try {
		const res = await fetch(`${API_URL}/api/posts/${slug}?${params}`);
		if (!res.ok) {
			console.error("fetchPost failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchPost error:", err);
		return null;
	}
}

export async function fetchCategories(locale: string): Promise<CategorySummary[] | null> {
	const params = new URLSearchParams();
	params.set("lang", locale);

	try {
		const res = await fetch(`${API_URL}/api/categories?${params}`);
		if (!res.ok) {
			console.error("fetchCategories failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchCategories error:", err);
		return null;
	}
}

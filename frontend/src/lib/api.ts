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

// Admin API

function adminHeaders(cookieHeader?: string): Record<string, string> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (cookieHeader) {
		headers["Cookie"] = cookieHeader;
	}
	return headers;
}

export async function loginAdmin(email: string, password: string): Promise<boolean> {
	try {
		const res = await fetch(`${API_URL}/api/admin/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});
		return res.ok;
	} catch (err) {
		console.error("loginAdmin error:", err);
		return false;
	}
}

export async function logoutAdmin(): Promise<boolean> {
	try {
		const res = await fetch(`${API_URL}/api/admin/logout`, {
			method: "POST",
			credentials: "include",
		});
		return res.ok;
	} catch (err) {
		console.error("logoutAdmin error:", err);
		return false;
	}
}

export interface AdminPostSummary {
	id: number;
	slug: string;
	title: string;
	image_url: string | null;
	is_public: boolean;
	read_time_minutes: number;
	categories: CategorySummary[];
	created_at: string;
}

export interface AdminPaginatedPosts {
	posts: AdminPostSummary[];
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
}

export async function fetchAdminPosts(
	locale: string,
	page = 1,
	perPage = 20,
	cookieHeader?: string,
): Promise<AdminPaginatedPosts | null> {
	const params = new URLSearchParams();
	params.set("lang", locale);
	params.set("page", String(page));
	params.set("per_page", String(perPage));

	try {
		const res = await fetch(`${API_URL}/api/admin/posts?${params}`, {
			headers: adminHeaders(cookieHeader),
		});
		if (!res.ok) {
			console.error("fetchAdminPosts failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchAdminPosts error:", err);
		return null;
	}
}

export interface CreatePostInput {
	slug: string;
	image_url?: string | null;
	is_public: boolean;
	category_ids: number[];
	translations: Record<string, { title: string; content: string }>;
}

export interface CreatePostOutput {
	id: number;
	slug: string;
}

export async function createPost(
	data: CreatePostInput,
	cookieHeader?: string,
): Promise<CreatePostOutput | null> {
	try {
		const res = await fetch(`${API_URL}/api/admin/posts`, {
			method: "POST",
			headers: adminHeaders(cookieHeader),
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			console.error("createPost failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("createPost error:", err);
		return null;
	}
}

export async function updatePost(
	id: number,
	data: CreatePostInput,
	cookieHeader?: string,
): Promise<boolean> {
	try {
		const res = await fetch(`${API_URL}/api/admin/posts/${id}`, {
			method: "PUT",
			headers: adminHeaders(cookieHeader),
			body: JSON.stringify(data),
		});
		return res.ok;
	} catch (err) {
		console.error("updatePost error:", err);
		return false;
	}
}

export async function deletePost(id: number, cookieHeader?: string): Promise<boolean> {
	try {
		const res = await fetch(`${API_URL}/api/admin/posts/${id}`, {
			method: "DELETE",
			headers: adminHeaders(cookieHeader),
		});
		return res.ok;
	} catch (err) {
		console.error("deletePost error:", err);
		return false;
	}
}

export async function fetchAdminCategories(
	locale: string,
	cookieHeader?: string,
): Promise<CategorySummary[] | null> {
	const params = new URLSearchParams();
	params.set("lang", locale);

	try {
		const res = await fetch(`${API_URL}/api/admin/categories?${params}`, {
			headers: adminHeaders(cookieHeader),
		});
		if (!res.ok) {
			console.error("fetchAdminCategories failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchAdminCategories error:", err);
		return null;
	}
}

export interface AdminPostDetail {
	id: number;
	slug: string;
	image_url: string | null;
	is_public: boolean;
	created_at: string;
	translations: Record<string, { title: string; content: string }>;
	category_ids: number[];
}

export async function fetchAdminPost(
	id: number,
	cookieHeader?: string,
): Promise<AdminPostDetail | null> {
	try {
		const res = await fetch(`${API_URL}/api/admin/posts/${id}`, {
			headers: adminHeaders(cookieHeader),
		});
		if (!res.ok) {
			console.error("fetchAdminPost failed:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.error("fetchAdminPost error:", err);
		return null;
	}
}

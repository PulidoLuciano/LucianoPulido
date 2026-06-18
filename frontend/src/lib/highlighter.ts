import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
	themes: ["github-dark"],
	langs: [
		"bash",
		"c",
		"cpp",
		"css",
		"dockerfile",
		"go",
		"graphql",
		"html",
		"java",
		"javascript",
		"json",
		"jsx",
		"markdown",
		"php",
		"python",
		"regex",
		"ruby",
		"rust",
		"shell",
		"sql",
		"toml",
		"tsx",
		"typescript",
		"xml",
		"yaml",
	],
});

const loaded = new Set(highlighter.getLoadedLanguages());

export function highlightCode(code: string, lang: string): string {
	if (lang && loaded.has(lang)) {
		return highlighter.codeToHtml(code, {
			lang,
			theme: "github-dark",
		});
	}
	return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

import { marked } from "marked";
import katex from "katex";

function renderMath(text: string, displayMode: boolean): string {
	return katex.renderToString(text, {
		displayMode,
		throwOnError: false,
	});
}

marked.use({
	extensions: [
		{
			name: "latexDisplayBlock",
			level: "block",
			tokenizer(src) {
				const match = /^\$\$\n?([\s\S]*?)\n?\$\$/.exec(src);
				if (match) {
					return {
						type: "latexDisplayBlock",
						raw: match[0],
						text: match[1].trim(),
					};
				}
			},
			renderer(token) {
				return `<div style="text-align:center;margin:1em 0">${renderMath(token.text, true)}</div>`;
			},
		},
		{
			name: "latexDisplayInline",
			level: "inline",
			start(src) {
				return src.indexOf("$$");
			},
			tokenizer(src) {
				const match = /^\$\$([^$\n]+?)\$\$/.exec(src);
				if (match) {
					return {
						type: "latexDisplayInline",
						raw: match[0],
						text: match[1].trim(),
					};
				}
			},
			renderer(token) {
				return `<span style="display:block;text-align:center;margin:1em 0">${renderMath(token.text, true)}</span>`;
			},
		},
		{
			name: "latexInline",
			level: "inline",
			start(src) {
				return src.indexOf("$");
			},
			tokenizer(src) {
				const match = /^\$(?!\$)(?!\s)(?!\d)([^$\n]+?)(?<!\s)\$(?!\$)/.exec(src);
				if (match) {
					return {
						type: "latexInline",
						raw: match[0],
						text: match[1].trim(),
					};
				}
			},
			renderer(token) {
				return renderMath(token.text, false);
			},
		},
	],
});

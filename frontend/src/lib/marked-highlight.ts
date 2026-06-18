import { marked } from "marked";
import { highlightCode } from "./highlighter";

marked.use({
	renderer: {
		code(token) {
			return highlightCode(token.text, token.lang || "");
		},
	},
});

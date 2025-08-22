import { defineConfig } from "vite";

export default defineConfig({
	base: "/kana-app/",
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/index.js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: (info) => {
					if (info.names.includes("styles.css")) {
						return "index.css";
					}
					return 'assets/[name][extname]';
				},
			}
		}
	}
})

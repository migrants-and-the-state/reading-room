import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: '/reading-room'
		},
		prerender: {
			concurrency: 1,
			crawl: true,
			entries: ['*', '/view/afile/*/*', '/results/*']
		}
	}
};

export default config;

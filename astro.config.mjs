// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://kadrdulmin.github.io',
	base: '/raminda-kariyawasam',
	integrations: [mdx(), sitemap()],
	output: 'static'
});

import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';

// https://astro.build/config
//import node from "@astrojs/node";

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config

// https://astro.build/config
import rollup from "astro-rollup";

// https://astro.build/config
export default defineConfig({
  legacy: { astroFlavoredMarkdown: true },
  integrations: [
  // Enable Preact to support Preact JSX components.
  preact(),
  // Enable React for the Algolia search component.
  react(), sitemap(), mdx(), tailwind(), rollup()],
  site: `https://astro.build`
  //output: "server",
  //adapter: node()
});
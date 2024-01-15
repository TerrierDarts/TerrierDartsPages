import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
//import cloudflare from '@astrojs/cloudflare';

import node from "@astrojs/node";

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
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  legacy: {
    astroFlavoredMarkdown: true
  },
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(),
    // Enable React for the Algolia search component.
    react(), 
    sitemap(), 
    mdx(), 
    tailwind(), 
    //cloudflare(),
    rollup({
      exclude: [
        "filler.js",
        "blue_waffle.js",
        "blinder.js",
        "mario_clicker.js",
        "catch_game.js",
        "obs_chat.js",
        "screen_grabber.js",
        "script.js"

      ]
    }), 
    vue()
  ],
  site: `https://astro.build`
  //output: 'hybrid',
  //adapter: node({ mode: 'middleware' })
});
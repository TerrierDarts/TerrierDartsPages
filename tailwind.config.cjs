/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [],
	module: {
		parser: {
			javascript: {
				importMeta: true,
			  importMetaContext: true,
			  url: true,
			},
		  },
		rules: [
		  {
			resourceQuery: /raw/,
			type: 'asset/source',
		  },
		  // ...other rules
		],
	  },

	
}

import './astro.4bd90412.mjs';
import 'html-escaper';

const id = "using-mdx.mdx";
const collection = "blog";
const slug = "using-mdx";
const body = `
This theme comes with the [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) integration installed and configured in your \`astro.config.mjs\` config file. If you prefer not to use MDX, you can disable support by removing the integration from your config file.

## Why MDX?

MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to [mix JavaScript and UI Components into your Markdown content](https://docs.astro.build/en/guides/markdown-content/#mdx-features) for things like interactive charts or alerts.

If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze.

## Example

Here is how you import and use a UI component inside of MDX.  
When you open this page in the browser, you should see the clickable button below.

import HeaderLink from '../../components/HeaderLink.astro';

<HeaderLink href="#" onclick="alert('clicked!')">
	Embedded component in MDX
</HeaderLink>

## More Links

- [MDX Syntax Documentation](https://mdxjs.com/docs/what-is-mdx)
- [Astro Usage Documentation](https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages)
- **Note:** [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) are still required to create interactive components. Otherwise, all components in your MDX will render as static HTML (no JavaScript) by default.
`;
const data = {
  title: "Using MDX",
  description: "Lorem ipsum dolor sit amet",
  pubDate: new Date(16567164e5),
  heroImage: "/placeholder-hero.jpg"
};
const _internal = {
  filePath: "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/content/blog/using-mdx.mdx",
  rawData: "\ntitle: 'Using MDX'\ndescription: 'Lorem ipsum dolor sit amet'\npubDate: 'Jul 02 2022'\nheroImage: '/placeholder-hero.jpg'"
};

export { _internal, body, collection, data, id, slug };

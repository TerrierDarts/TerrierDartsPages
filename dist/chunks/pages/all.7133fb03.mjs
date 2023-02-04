/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, m as maybeRenderHead, s as spreadAttributes, d as renderSlot, e as renderComponent, f as renderHead, g as createVNode, F as Fragment, h as createCollectionToGlobResultMap, i as createGetCollection } from '../astro.4bd90412.mjs';
import rss from '@astrojs/rss';
/* empty css                           *//* empty css                           *//* empty css                           *//* empty css                                                                    *//* empty css                           */
const $$Astro$9 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/placeholder-social.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>

<!-- Canonical URL -->
<link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title"${addAttribute(title, "content")}>
<meta name="description"${addAttribute(description, "content")}>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url"${addAttribute(Astro2.url, "content")}>
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url"${addAttribute(Astro2.url, "content")}>
<meta property="twitter:title"${addAttribute(title, "content")}>
<meta property="twitter:description"${addAttribute(description, "content")}>
<meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/components/BaseHead.astro");

const $$Astro$8 = createAstro("https://example.com");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([[className, { active: isActive }], "astro-EIMMU3LG"], "class:list")}${spreadAttributes(props)}>
	${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/components/HeaderLink.astro");

const SITE_TITLE = "TerrierDarts Site";
const SITE_DESCRIPTION = "Home of TerrierDarts's Content and Blog ";

const $$Astro$7 = createAstro("https://example.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header class="astro-3EF6KSR2">
	<h2 class="astro-3EF6KSR2">
		${SITE_TITLE}
	</h2>
	<nav class="astro-3EF6KSR2">
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Home` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/builds", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Builds` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/podcasts", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Podcasts` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://twitter.com/TerrierDarts", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Twitter` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://Youtube.com/@TerrierDarts", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`YouTube` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://twitch.tv/TerrierDarts", "target": "_blank", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Twitch` })}
		${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-3EF6KSR2" }, { "default": () => renderTemplate`Blog` })}
	</nav>
</header>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/components/Header.astro");

const $$Astro$6 = createAstro("https://example.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Footer;
  const today = new Date();
  return renderTemplate`${maybeRenderHead($$result)}<footer class="astro-SZ7XMLTE">
	&copy; ${today.getFullYear()} TerrierDarts. All rights reserved.
</footer>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/components/Footer.astro");

const $$Astro$5 = createAstro("https://example.com");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`<html lang="en">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	<body>
		${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}
		<main>
			<h1><b>Welcome To My Site</b></h1>
			<p>
				My Name is TerrierDarts, but most people call me TD. I am Twitch Streamer and YouTube Content Creator who like to learn coding and other nerdy stuff so if you enjoy that kind of stuff be sure to drop me a follow on Twitch and a sub on YouTube! 
			</p>
			<p>
				In my spare time and occasionally on stream I will play with <a href="https://streamer.bot">Streamer.bot</a> , a free tool to help you take your streams to the next level and adding a whole new meaning to Interactive!
				Streamer.bot is also the basis for many of my YouTube Videos where I will share the projects I make.
			</p>
			<p>
			I also plan to start a blog where I will talk about new releases and updates for streamer.bot so be sure to check that out!
			</p>
		</main>
		${renderComponent($$result, "Footer", $$Footer, {})}
	</body></html>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/index.astro");

const $$file$4 = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/index.astro";
const $$url$4 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$2,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://example.com");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" class="astro-BVZIHDZO">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "class": "astro-BVZIHDZO" })}
		
	${renderHead($$result)}</head>

	<body class="astro-BVZIHDZO">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-BVZIHDZO" })}
		<main class="astro-BVZIHDZO">
			<article class="astro-BVZIHDZO">
				${heroImage && renderTemplate`<img${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(heroImage, "src")} alt="" class="astro-BVZIHDZO">`}
				<h1 class="title astro-BVZIHDZO">${title}</h1>
				${pubDate && renderTemplate`<time class="astro-BVZIHDZO">${pubDate}</time>`}
				${updatedDate && renderTemplate`<div class="astro-BVZIHDZO">
							Last updated on <time class="astro-BVZIHDZO">${updatedDate}</time>
						</div>`}
				<hr class="astro-BVZIHDZO">
				${renderSlot($$result, $$slots["default"])}
			</article>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-BVZIHDZO" })}
	</body></html>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/layouts/BlogPost.astro");

const html$1 = "<p>Podcast Guests</p>\n<p>Episode 1 - Bongo1986</p>";

				const frontmatter$1 = {"layout":"../layouts/BlogPost.astro","title":"About Me","description":"Lorem ipsum dolor sit amet","updatedDate":"August 08 2022","heroImage":"/placeholder-about.jpg"};
				const file$1 = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/podcasts.md";
				const url$1 = "/podcasts";
				function rawContent$1() {
					return "\r\nPodcast Guests\r\n\r\nEpisode 1 - Bongo1986";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [];
				}
				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$BlogPost, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$1,
	compiledContent: compiledContent$1,
	default: Content$1,
	file: file$1,
	frontmatter: frontmatter$1,
	getHeadings: getHeadings$1,
	rawContent: rawContent$1,
	url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post.1926911d.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide.f6f6b811.mjs'),"/src/content/blog/second-post.md": () => import('../second-post.c26acbce.mjs'),"/src/content/blog/third-post.md": () => import('../third-post.301f3626.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx.e790965a.mjs'),"/src/content/builds/followageresponses.md": () => import('../followageresponses.70ba0c50.mjs'),"/src/content/builds/welcomeusers.md": () => import('../welcomeusers.d69c3996.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/first-post.md": () => import('../first-post.3a7a88d6.mjs'),"/src/content/blog/markdown-style-guide.md": () => import('../markdown-style-guide.ed1591a7.mjs'),"/src/content/blog/second-post.md": () => import('../second-post.e1220670.mjs'),"/src/content/blog/third-post.md": () => import('../third-post.3e7a2ae9.mjs'),"/src/content/blog/using-mdx.mdx": () => import('../using-mdx.6b12a7b6.mjs'),"/src/content/builds/followageresponses.md": () => import('../followageresponses.55bcfa9d.mjs'),"/src/content/builds/welcomeusers.md": () => import('../welcomeusers.31f39c63.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	collectionToRenderEntryMap,
});

async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://example.com");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = (await getCollection("builds")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" class="astro-CL62STHB">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "class": "astro-CL62STHB" })}
		
	${renderHead($$result)}</head>
	<body class="astro-CL62STHB">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-CL62STHB" })}
		<main class="astro-CL62STHB">
			<section class="astro-CL62STHB">
				<ul class="astro-CL62STHB">
					${posts.map((post) => renderTemplate`<li class="astro-CL62STHB">
								<time${addAttribute(post.data.pubDate.toISOString(), "datetime")} class="astro-CL62STHB">
									${post.data.pubDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
								</time>
								<a${addAttribute(`/builds/${post.slug}/`, "href")} class="astro-CL62STHB">${post.data.title}</a>
							</li>`)}
				</ul>
			</section>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-CL62STHB" })}
	</body></html>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/builds/index.astro");

const $$file$3 = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/builds/index.astro";
const $$url$3 = "/builds";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://example.com");
async function getStaticPaths$1() {
  const posts = await getCollection("builds");
  return posts.map((post) => ({
    params: {
      slug: post.slug
    },
    props: post
  }));
}
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$$1;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>${post.data.title}</h1>${renderComponent($$result, "Content", Content, {})}` })}`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/builds/[...slug].astro");

const $$file$2 = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/builds/[...slug].astro";
const $$url$2 = "/builds/[...slug]";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$$1,
	file: $$file$2,
	getStaticPaths: getStaticPaths$1,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.</p>\n<p>Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.</p>\n<p>Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.</p>\n<p>Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.</p>\n<p>Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.</p>";

				const frontmatter = {"layout":"../layouts/BlogPost.astro","title":"About Me","description":"Lorem ipsum dolor sit amet","updatedDate":"August 08 2022","heroImage":"/placeholder-about.jpg"};
				const file = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/about.md";
				const url = "/about";
				function rawContent() {
					return "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.\n\nMorbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.\n\nMollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.\n\nMattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.\n\nTempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$BlogPost, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" class="astro-5TZNM7MJ">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "class": "astro-5TZNM7MJ" })}
		
	${renderHead($$result)}</head>
	<body class="astro-5TZNM7MJ">
		${renderComponent($$result, "Header", $$Header, { "class": "astro-5TZNM7MJ" })}
		<main class="astro-5TZNM7MJ">
			<section class="astro-5TZNM7MJ">
				<ul class="astro-5TZNM7MJ">
					${posts.map((post) => renderTemplate`<li class="astro-5TZNM7MJ">
								<time${addAttribute(post.data.pubDate.toISOString(), "datetime")} class="astro-5TZNM7MJ">
									${post.data.pubDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
								</time>
								<a${addAttribute(`/blog/${post.slug}/`, "href")} class="astro-5TZNM7MJ">${post.data.title}</a>
							</li>`)}
				</ul>
			</section>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "class": "astro-5TZNM7MJ" })}
	</body></html>`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/blog/index.astro");

const $$file$1 = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: {
      slug: post.slug
    },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>${post.data.title}</h1>${renderComponent($$result, "Content", Content, {})}` })}`;
}, "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/blog/[...slug].astro");

const $$file = "/mnt/c/Users/tnpot/Documents/TerrierDarts/terrierdarts.github.io/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeaderLink as $, _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g };

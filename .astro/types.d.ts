declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}
declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"docs": {
"en/casino_roulette.md": {
  id: "en/casino_roulette.md",
  slug: "en/casino_roulette",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"en/death_counter_multi_game.mdx": {
  id: "en/death_counter_multi_game.mdx",
  slug: "en/death_counter_multi_game",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/follow_age_responses.mdx": {
  id: "en/follow_age_responses.mdx",
  slug: "en/follow_age_responses",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/free_for_all.mdx": {
  id: "en/free_for_all.mdx",
  slug: "en/free_for_all",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/gamble.mdx": {
  id: "en/gamble.mdx",
  slug: "en/gamble",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/gameboy_game_change.mdx": {
  id: "en/gameboy_game_change.mdx",
  slug: "en/gameboy_game_change",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/heat_click_map.mdx": {
  id: "en/heat_click_map.mdx",
  slug: "en/heat_click_map",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/heat_core_ws5.mdx": {
  id: "en/heat_core_ws5.mdx",
  slug: "en/heat_core_ws5",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/heat_mario.mdx": {
  id: "en/heat_mario.mdx",
  slug: "en/heat_mario",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/heat_offline_test.mdx": {
  id: "en/heat_offline_test.mdx",
  slug: "en/heat_offline_test",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/heists.mdx": {
  id: "en/heists.mdx",
  slug: "en/heists",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/home.md": {
  id: "en/home.md",
  slug: "en/home",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"en/lotto.mdx": {
  id: "en/lotto.mdx",
  slug: "en/lotto",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/raffles.mdx": {
  id: "en/raffles.mdx",
  slug: "en/raffles",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/slots.mdx": {
  id: "en/slots.mdx",
  slug: "en/slots",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
"en/welcome_users.mdx": {
  id: "en/welcome_users.mdx",
  slug: "en/welcome_users",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}

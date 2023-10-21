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
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
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

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"en/chat_games/cludeo.mdx": {
	id: "en/chat_games/cludeo.mdx";
  slug: "en/chat_games/cludeo";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/chat_games/hangman.mdx": {
	id: "en/chat_games/hangman.mdx";
  slug: "en/chat_games/hangman";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/chat_games/snakes_and_ladders.mdx": {
	id: "en/chat_games/snakes_and_ladders.mdx";
  slug: "en/chat_games/snakes_and_ladders";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/chat_games/word_wheel.mdx": {
	id: "en/chat_games/word_wheel.mdx";
  slug: "en/chat_games/word_wheel";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/darts_scorer.mdx": {
	id: "en/darts_scorer.mdx";
  slug: "en/darts_scorer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/game_alerts_credits/ga_dark_souls.mdx": {
	id: "en/game_alerts_credits/ga_dark_souls.mdx";
  slug: "en/game_alerts_credits/ga_dark_souls";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/game_alerts_credits/ga_sonic_one.mdx": {
	id: "en/game_alerts_credits/ga_sonic_one.mdx";
  slug: "en/game_alerts_credits/ga_sonic_one";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/game_alerts_credits/ga_sonic_two.mdx": {
	id: "en/game_alerts_credits/ga_sonic_two.mdx";
  slug: "en/game_alerts_credits/ga_sonic_two";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/game_alerts_credits/ga_valheim.mdx": {
	id: "en/game_alerts_credits/ga_valheim.mdx";
  slug: "en/game_alerts_credits/ga_valheim";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/game_alerts_credits/gc_star_wars.mdx": {
	id: "en/game_alerts_credits/gc_star_wars.mdx";
  slug: "en/game_alerts_credits/gc_star_wars";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/follow_age_responses.mdx": {
	id: "en/general/follow_age_responses.mdx";
  slug: "en/general/follow_age_responses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/log_viewer.mdx": {
	id: "en/general/log_viewer.mdx";
  slug: "en/general/log_viewer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/play_with_viewers.mdx": {
	id: "en/general/play_with_viewers.mdx";
  slug: "en/general/play_with_viewers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/random_action_no_repeat.mdx": {
	id: "en/general/random_action_no_repeat.mdx";
  slug: "en/general/random_action_no_repeat";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/random_game_change.mdx": {
	id: "en/general/random_game_change.mdx";
  slug: "en/general/random_game_change";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/watch_streaks.mdx": {
	id: "en/general/watch_streaks.mdx";
  slug: "en/general/watch_streaks";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/general/welcome_users.mdx": {
	id: "en/general/welcome_users.mdx";
  slug: "en/general/welcome_users";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/heat/heat_click_map.mdx": {
	id: "en/heat/heat_click_map.mdx";
  slug: "en/heat/heat_click_map";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/heat/heat_core_ws5.mdx": {
	id: "en/heat/heat_core_ws5.mdx";
  slug: "en/heat/heat_core_ws5";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/heat/heat_mario.mdx": {
	id: "en/heat/heat_mario.mdx";
  slug: "en/heat/heat_mario";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/heat/heat_offline_test.mdx": {
	id: "en/heat/heat_offline_test.mdx";
  slug: "en/heat/heat_offline_test";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/heat/heat_street_fighter.mdx": {
	id: "en/heat/heat_street_fighter.mdx";
  slug: "en/heat/heat_street_fighter";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/home.mdx": {
	id: "en/home.mdx";
  slug: "en/home";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/additional_overlays.mdx": {
	id: "en/overlays/additional_overlays.mdx";
  slug: "en/overlays/additional_overlays";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/chat_dots.mdx": {
	id: "en/overlays/chat_dots.mdx";
  slug: "en/overlays/chat_dots";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/death_counter_multi_game.mdx": {
	id: "en/overlays/death_counter_multi_game.mdx";
  slug: "en/overlays/death_counter_multi_game";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/gameboy_game_change.mdx": {
	id: "en/overlays/gameboy_game_change.mdx";
  slug: "en/overlays/gameboy_game_change";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/screen_filler.mdx": {
	id: "en/overlays/screen_filler.mdx";
  slug: "en/overlays/screen_filler";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/overlays/windows_live.mdx": {
	id: "en/overlays/windows_live.mdx";
  slug: "en/overlays/windows_live";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/podcasts.mdx": {
	id: "en/podcasts.mdx";
  slug: "en/podcasts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/casino_roulette.mdx": {
	id: "en/points_system/casino_roulette.mdx";
  slug: "en/points_system/casino_roulette";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/free_for_all.mdx": {
	id: "en/points_system/free_for_all.mdx";
  slug: "en/points_system/free_for_all";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/gamble.mdx": {
	id: "en/points_system/gamble.mdx";
  slug: "en/points_system/gamble";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/heists.mdx": {
	id: "en/points_system/heists.mdx";
  slug: "en/points_system/heists";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/lotto.mdx": {
	id: "en/points_system/lotto.mdx";
  slug: "en/points_system/lotto";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/raffles.mdx": {
	id: "en/points_system/raffles.mdx";
  slug: "en/points_system/raffles";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/points_system/slots.mdx": {
	id: "en/points_system/slots.mdx";
  slug: "en/points_system/slots";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/ranking_system/core.mdx": {
	id: "en/ranking_system/core.mdx";
  slug: "en/ranking_system/core";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/ranking_system/leaderboard.mdx": {
	id: "en/ranking_system/leaderboard.mdx";
  slug: "en/ranking_system/leaderboard";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/ranking_system/lotto.mdx": {
	id: "en/ranking_system/lotto.mdx";
  slug: "en/ranking_system/lotto";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"en/ranking_system/points_viewer.mdx": {
	id: "en/ranking_system/points_viewer.mdx";
  slug: "en/ranking_system/points_viewer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}

import { defineCollection, z } from 'astro:content';
import { SITE } from '../consts';

const docs = defineCollection({
	schema: z.object({
		title: z.string().default(SITE.title),
		description: z.string().default(SITE.description),
		lang: z.literal('en-us').default(SITE.defaultLanguage),
		code: z.string(),
		pubDate: z.string(),
		setUpDifficulty: z.string(),
		heroImage: z.string(),
		dir: z.union([z.literal('ltr'), z.literal('rtl')]).default('ltr'),
		image: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		ogLocale: z.string().optional(),
	}),
});

export const collections = { docs };

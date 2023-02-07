import { link } from "fs";

export const SITE = {
	title: 'TerrierDarts',
	description: 'Home of all Things TD',
	defaultLanguage: 'en-us',
} as const;

export const OPEN_GRAPH = {
	image: {
		src: './icon.png',
		alt:
			'TerrierDarts Logo',
	},
	twitter: 'TerrierDarts',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = ``;

export const COMMUNITY_INVITE_URL = ``;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	(typeof KNOWN_LANGUAGE_CODES)[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: 
	{'Pages':[
		{ text: 'Home', link:'../en/home'}
	],
		'Builds': [
			{ text: 'Custom Welcomes', link: '../en/welcomeusers' },
			{ text: 'Follow Age Responses', link: '../en/followageresponses' }
			
		]
	},
};

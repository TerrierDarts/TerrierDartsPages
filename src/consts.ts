
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

export const HEADING = {
  children: Map
} as const;
export const HEADING_NAMES = Object.values(HEADING);

export const KNOWN_LANGUAGES = {
  English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = ``;

export const COMMUNITY_INVITE_URL = ``;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: 'terrierdarts',
  appId: '838PE0CCOQ',
  apiKey: 'fd6e9a258b906c49aae341b2335ff8f6',
};

export interface NavLink {
  text: string;
  link: string;
}

export interface NavGroup {
  text: string;
  children?: (NavLink | NavGroup)[];
  link?: string;
}


export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, NavLink[] | NavGroup>
>;

export const SIDEBAR: Sidebar = {
  en: {
    Pages: { text: '', children: [{ text: 'Home', link: '../en/home' }] },
    Builds: {
      text: 'Builds',
      children: [
        {
          text: 'General',
          link: '',
          children: [
            { text: 'Custom Welcomes', link: '../en/welcome_users' },
            { text: 'Follow Age Responses', link: '../en/follow_age_responses' },
            {
              text: 'Per Game Death Counter',
              link: '../en/death_counter_multi_game',
            },
          ]
        },
        {
          text: 'Heat',
          link: '',
          children: [
            { text: 'Heat - Core', link: '../en/heat_core_ws5' },
            { text: 'Heat - Mario', link: '../en/heat_mario' },
            { text: 'Heat - Click Map', link: '../en/heat_click_map' },
            { text: 'Heat - Offline Test', link: '../en/heat_offline_test' },
          ],
        },
        {
          text: 'Point System Games',
          link: '',
          children: [
            { text: 'Slots', link: '' },
            { text: 'Gamble', link: '' },
            { text: 'Casino Roulette', link: '' },
            { text: 'Lotto', link: '' },
            { text: 'Heists', link: '' },
            { text: 'Boss Battles', link: '' },
            { text: 'Raffles', link: '' },
            { text: 'Free-For-Alls', link: '' },
            { text: 'Dice Game', link: '' },
          ],
        },
        {
          text: 'Chat Based Games',
          link: '',
          children: [
            { text: 'Cluedo', link: '' },
            { text: 'Snakes and Ladders', link: '' },
            { text: 'Hangman', link: '' },
            { text: 'Word Wheel', link: '' },
          ],
        },
      ],
    },
  },
};


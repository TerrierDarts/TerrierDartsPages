import { Children } from "react";


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
  indexName: 'TD_Search',
  appId: 'G0IGEJ4ZKT',
  apiKey: 'b616a19419fb11dcda495f7bb20db388',
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
    Pages: { 
      text: '', 
      children: 
      [
      { 
        text: 'General', 
        children: [
          {text: 'Home', link: '../en/home' },
          {text: 'Podcasts', link: '../en/home' },
          {text: 'Streamer.bot', link: '../en/home' },
          {text: 'Extensions', link: '../en/home' },
      ] 
      },
      {
        text: 'Builds',
        children: [

          {
             text: 'General',
             children: [
              { text: 'Custom Welcomes', link: '../en/welcome_users' },
              { text: 'Follow Age Responses', link: '../en/follow_age_responses' },
              { text: 'Per Game Death Counter', link: '../en/death_counter_multi_game'},
              { text: 'Gameboy Game Changer', link: '../en/gameboy_game_change'},
              { text: 'Random Game Changer', link: '../en/random_game_change'},
          ]
          },

          {
          text: 'Heat',
          children: [
           { text: 'Heat - Core', link: '../en/heat_core_ws5' },
           //{ text: 'Heat - Mario', link: '../en/heat_mario' },
           // { text: 'Heat - Click Map', link: '../en/heat_click_map' },
           // { text: 'Heat - Offline Test', link: '../en/heat_offline_test' },
          ],
          },

          {
          text: 'Point System Games',
          children: [
          //{ text: 'Slots', link: '../en/slots' },
          { text: 'Gamble', link: '../en/gamble' },
          // { text: 'Casino Roulette', link: '../en/casino_roulette' },
          // { text: 'Lotto', link: '../en/lotto' },
          // { text: 'Heists', link: '../en/heists' },
          // { text: 'Boss Battles', link: '' },
          // { text: 'Raffles', link: '../en/raffles' },
          // { text: 'Free-For-Alls', link: '../en/free_for_all' },
          // { text: 'Dice Game', link: '' },
          ],
          },

          {
          text: 'Chat Based Games',
          children: [
           { text: 'Cluedo', link: '' },
           // { text: 'Snakes and Ladders', link: '' },
           // { text: 'Hangman', link: '' },
           // { text: 'Word Wheel', link: '' },
          ],
          },
      ],
   },
  ],
  },
  }
}
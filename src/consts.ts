import { Children } from "react";


export const SITE = {
  title: 'TerrierDarts',
  description: 'Collection of Streamer.bot Extensions and Add-Ons',
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

//See "Algolia" section of the README for more information.
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
              { text: 'Home', link: '/en/home' },
              { text: 'Podcasts', link: '/en/podcasts' },
              { text: 'Streamer.bot', link: 'https://streamer.bot' },
              { text: 'Extensions', link: 'https://extensions.streamer.bot' },
              { text: 'My Dart Scorer', link: ' /en/darts_scorer'}
            ],
          },
          {
            text: 'Builds',
            children: [

              {
                text: 'General',
                children: [
                //  { text: 'A Selection of Smaller Codes', link: '' },
                  { text: 'Custom Welcomes', link: '/en/general/welcome_users' },
                  { text: 'Follow Age Responses', link: '/en/general/follow_age_responses' },
                //  {text: 'Football Chat Alerts', link: 'en/general/footbal_chat_alerts'}
                  { text: 'Log Viewer', link: '/en/general/log_viewer' },
                //  { text: 'Mod Added Commands', link: '' },
                  { text: 'Random Actions with No Repeat', link: '/en/general/random_action_no_repeat' },
                  { text: 'Random Game Changer', link: '/en/general/random_game_change' },    
                //  { text: 'User Queue System', link: '' },
                
                
                ],
              },

              {
                text: 'Overlays',
                children: [
                  { text : 'Additional Overlays', link:'/en/overlays/additional_overlays'}, 
                  { text: 'Chat Dots', link: '/en/overlays/chat_dots' },
                //  { text: 'Per Game Death Counter', link: '/en/overlays/death_counter_multi_game' },
                { text: 'Gameboy Game Changer', link: '/en/overlays/gameboy_game_change' },
                { text: "Screen Fillers",  link: '/en/overlays/screen_filler'},
                { text: 'Windows Live First Words', link: '/en/overlays/windows_live' },
                //  { text: 'Simple Donation Goal', link: '' },
                ],
              },

              {
                text : 'Alert/Credit Systems',
                children: [
                  {text : 'Dark Souls Alerts', link:'/en/game_alerts_credits/ga_dark_souls'},
                  {text : 'Sonic 1 Alerts', link:'/en/game_alerts_credits/ga_sonic_one'},
                  {text : 'Sonic 2 Alerts', link:'/en/game_alerts_credits/ga_sonic_two'}, 
                  {text : 'Star Wars Credits', link:'/en/game_alerts_credits/gc_star_wars'},
                  {text : 'Valheim Alerts', link:'/en/game_alerts_credits/ga_valheim'}
                  
                 
                ]
              },

              {
                text: 'Heat',
                children: [
                  { text: 'Core', link: '/en/heat/heat_core_ws5' },
                //  { text: 'Mario', link: '/en/heat/heat_mario' },
                //  { text: 'Click Map', link: '/en/heat/heat_click_map' },
                  {text : 'Street Fighter', link:'/en/heat/heat_street_fighter'}
                //  { text: 'Heat - Offline Test', link: '/en/heat/heat_offline_test' },
                ],
              },

              {
                text: 'Point System Add-Ons',
                children: [
                  
                //  { text: 'Additional Commands', link: '' },
                //  { text: 'Boss Battles', link: '' },
                { text: 'Casino Roulette', link: '/en/points_system/casino_roulette' },
                //  { text: 'Dice Game', link: '' },
                //  { text: 'Free-For-Alls', link: '/en/free_for_all' },
                { text: 'Gamble', link: '/en/points_system/gamble' },
                //  { text: 'Heists', link: '/en/heists' },
                //  { text: 'Leaderboard', link: '' },
                //{ text: 'Lotto', link: '/en/points_system/lotto' },
                { text: 'Raffles', link: '/en/points_system/raffles' },
                { text: 'Slots', link: '/en/points_system/slots' }               
                ],
              },
              {
                text: 'Ranking System',
                children: [
                //  {text: 'Core', link: '/en/ranking_system/core'}
                //  { text: 'Slots', link: '/en/points_system/slots' },
                //  { text: 'Gamble', link: '/en/points_system/gamble' },
                //  { text: 'Casino Roulette', link: '/en/points_system/casino_roulette' },
                //  { text: 'Lotto', link: '/en/points_system/lotto' },
                //  { text: 'Heists', link: '/en/points_system/heists' },
                //  { text: 'Boss Battles', link: 'en/points_system/boss_battles' },
                //  { text: 'Raffles', link: '/en/points_system/raffles' },
                //  { text: 'Free-For-Alls', link: '/en/points_system/free_for_all' },
                //  { text: 'Dice Game', link: 'en/points_system/dice_game' },
                ],
              },


              {
                text: 'Chat Based Games',
                children: [
                 // { text: 'Cluedo', link: '/en/chat_games/cludeo' },
                 // { text: 'Snakes and Ladders', link: '/en/chat_games/snake_and_ladders' },
                 // { text: 'Hangman', link: '/en/chat_games/hangman' },
                 // { text: 'Word Wheel', link: '/en/chat_games/word_wheel' },
                ],
              },
            ],
          },
        ],
    },
  }
}
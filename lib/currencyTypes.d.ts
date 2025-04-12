/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    asset_platform_id: string | null;
    categories: string[];
    description: Record<string, string>;
    genesis_date: string;
    market_cap_rank: number;
    image: {
      thumb: string;
      small: string;
      large: string;
    };   
    web_slug: string;
    links: {
      homepage: string[];
      blockchain_site: string[];
      official_forum_url: string[];
      twitter_screen_name: string;
      facebook_username: string;
      bitcointalk_thread_identifier: number | null;
      telegram_channel_identifier: string;
      subreddit_url: string;
      repos_url: {
        github: string[];
        bitbucket: string[];
      };
    };
    market_data: {
      current_price: Record<string, number>;
      market_cap: Record<string, number>;
      total_volume: Record<string, number>;
      price_change_24h: number;
      price_change_percentage_24h: number;

      last_updated: string;
    };
  }
  
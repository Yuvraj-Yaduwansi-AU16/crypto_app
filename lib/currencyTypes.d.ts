/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    asset_platform_id: string | null;
    block_time_in_minutes: number;
    hashing_algorithm: string;
    categories: string[];
    description: Record<string, string>;
    genesis_date: string;
    market_cap_rank: number;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    image: {
      thumb: string;
      small: string;
      large: string;
    };
    localization: Record<string, string>;
    country_origin: string;
    contract_address?: string;
    public_notice: string | null;
    additional_notices: string[];
    supply?: {
      circulating: number;
      total: number;
      max: number;
    };
    last_updated: string;
    platforms: Record<string, string>;
    detail_platforms: Record<string, any>;
    preview_listing: boolean;
    watchlist_portfolio_users: number;
    web_slug: string;
    links: {
      homepage: string[];
      whitepaper: string;
      blockchain_site: string[];
      official_forum_url: string[];
      chat_url: string[];
      announcement_url: string[];
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

    community_data: {
      facebook_likes: number | null;
      twitter_followers: number;
      reddit_average_posts_48h: number;
      reddit_average_comments_48h: number;
      reddit_subscribers: number;
      reddit_accounts_active_48h: number | null;
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
  
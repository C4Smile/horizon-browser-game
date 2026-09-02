const {
  VITE_APP_NAME,
  VITE_API_URL,
  VITE_THIS_URL,
  // cookies
  VITE_LANGUAGE,
  VITE_BASIC_KEY,
  VITE_ACCEPT_COOKIE,
  VITE_DECLINE_COOKIE,
  VITE_REMEMBER,
  VITE_USER,
  VITE_VALIDATION_COOKIE,
  VITE_RECOVERING_COOKIE,
  // COMMUNICATION
  VITE_CRYPTO,
  // CACHE
  VITE_RECENT_SEARCHES,
  VITE_RECENT_SEARCHES_LIMIT,
  VITE_RECENT_PAGES,
  VITE_RECENT_PAGES_LIMIT,
  // HASH
  VITE_HASH,
} = import.meta.env;

export type Config = {
  appName: string;
  apiUrl: string;
  thisUrl: string;
  language: string;
  basicKey: string;
  accept: string;
  decline: string;
  remember: string;
  user: string;
  validating: string;
  recovering: string;
  crypto: string;
  recentSearches: string;
  recentSearchesLimit: string;
  recentPages: string;
  recentPagesLimit: string;
  hash: string;
};

const config: Config = {
  appName: VITE_APP_NAME,
  apiUrl: VITE_API_URL,
  thisUrl: VITE_THIS_URL,
  // cookie
  language: VITE_LANGUAGE,
  basicKey: VITE_BASIC_KEY,
  accept: VITE_ACCEPT_COOKIE,
  decline: VITE_DECLINE_COOKIE,
  remember: VITE_REMEMBER,
  user: VITE_USER,
  validating: VITE_VALIDATION_COOKIE,
  recovering: VITE_RECOVERING_COOKIE,
  // COMMUNICATION
  crypto: VITE_CRYPTO,
  // CACHE
  recentSearches: VITE_RECENT_SEARCHES,
  recentSearchesLimit: VITE_RECENT_SEARCHES_LIMIT,
  recentPages: VITE_RECENT_PAGES,
  recentPagesLimit: VITE_RECENT_PAGES_LIMIT,
  // hash
  hash: VITE_HASH,
};

export default config;

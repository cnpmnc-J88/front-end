/**
 * Service for managing authentication tokens using localStorage
 */

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const tokenService = {
  /**
   * Get the stored access token
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN);
    }
    return null;
  },

  /**
   * Get the stored refresh token
   */
  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN);
    }
    return null;
  },

  /**
   * Save a token with specified key
   */
  setToken: (key: string, token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, token);
    }
  },

  /**
   * Set both access and refresh tokens
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
  },

  /**
   * Remove a token with specified key
   */
  removeToken: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  /**
   * Remove both tokens (complete logout)
   */
  removeAllTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    }
  },

  /**
   * Check if a valid token exists
   */
  hasToken: (): boolean => {
    return !!tokenService.getToken();
  },
};

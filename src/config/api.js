/**
 * API Configuration
 * Automatically detects if running on Vercel or local development
 */

const getApiBaseUrl = () => {
  // In production (Vercel), use relative URLs
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();


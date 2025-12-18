/**
 * API Configuration
 * Backend is deployed separately at https://backend-dehn-project-lcqehwnmx-rathoryash7s-projects.vercel.app
 */

const getApiBaseUrl = () => {
  // In production (Vercel), use the deployed backend URL
  if (import.meta.env.PROD) {
    return 'https://backend-dehn-project-lcqehwnmx-rathoryash7s-projects.vercel.app/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();


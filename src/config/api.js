/**
 * API Configuration
 * Backend is deployed separately at https://backenddehnproject.vercel.app
 */

const getApiBaseUrl = () => {
  // In production (Vercel), use the deployed backend URL
  if (import.meta.env.PROD) {
    return 'https://backenddehnproject.vercel.app/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();


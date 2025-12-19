/**
 * API Configuration
 * Backend deployment URLs:
 * - Render: https://denn-project.onrender.com
 * - Vercel (old): https://backend-dehn-project-lcqehwnmx-rathoryash7s-projects.vercel.app
 */

const getApiBaseUrl = () => {
  // In production, use Render backend
  if (import.meta.env.PROD) {
    // Check if RENDER_BACKEND_URL is set (for Render deployments)
    // Otherwise use the Render backend by default
    return import.meta.env.VITE_API_BASE_URL || 'https://denn-project.onrender.com/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Log the API URL for debugging (remove in production)
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
}


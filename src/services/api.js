/**
 * Base API client for PathForge
 * Configured to connect to Node.js/Express backend or gracefully fallback to local intelligent simulation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiClient = {
  get: async (endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'GET' });
  },

  post: async (endpoint, data, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
  }
};

async function request(endpoint, options) {
  const cleanEndpoint = endpoint.replace(/^\//, '');
  const url = API_BASE_URL
    ? `${API_BASE_URL.replace(/\/$/, '')}/${cleanEndpoint}`
    : `/${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }
      throw new ApiError(
        errorData?.message || `HTTP request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network failure (server down, CORS, offline)
    console.warn(`[PathForge API] Network request to ${url} failed. Falling back to local engine:`, error.message);
    return null;
  }
}

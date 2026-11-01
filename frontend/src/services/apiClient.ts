import type { ApiError } from '../types/api';

class ApiClient {
  private baseUrl: string;

  constructor() {
    // If VITE_API_BASE_URL is provided in environment, strip trailing slash.
    // In local dev, if unset, relative URLs leverage Vite's dev server proxy.
    const rawBase = import.meta.env.VITE_API_BASE_URL || '';
    this.baseUrl = rawBase.replace(/\/+$/, '');
  }

  private resolveUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return this.baseUrl ? `${this.baseUrl}${cleanEndpoint}` : cleanEndpoint;
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = this.resolveUrl(endpoint);

    try {
      const response = await fetch(url, {
        ...options,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        let errorPayload: unknown;
        try {
          errorPayload = await response.json();
        } catch {
          errorPayload = await response.text();
        }

        const apiError: ApiError = {
          statusCode: response.status,
          message:
            typeof errorPayload === 'object' && errorPayload !== null && 'message' in errorPayload
              ? String((errorPayload as Record<string, unknown>).message)
              : `HTTP Error ${response.status}: ${response.statusText}`,
          details: errorPayload,
        };

        throw apiError;
      }

      return (await response.json()) as T;
    } catch (err: unknown) {
      if ((err as ApiError).statusCode) {
        throw err;
      }

      const networkError: ApiError = {
        message:
          err instanceof Error
            ? `Connection to backend failed (${err.message}). Verify backend is running.`
            : 'An unknown network error occurred while reaching the backend service.',
      };
      throw networkError;
    }
  }
}

export const apiClient = new ApiClient();

import { ApiResponse } from './types';
import { tokenService } from '../auth/tokenService';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api`;

/**
 * Generic API request handler with error handling and CORS configuration
 */
export async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  queryParams?: Record<string, string>,
  body?: any
): Promise<ApiResponse<T>> {
  try {
    // Construct URL with query parameters
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Configure request options with CORS settings
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Enable CORS
      credentials: 'include', // Include credentials like cookies if needed
    };

    // Add authorization token if available
    const token = tokenService.getToken();
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }

    if (body) {
      options.body = JSON.stringify(body);
    }
    // Debug request details
    console.log(`[API Request] ${method} ${url.toString()}`, {
      headers: options.headers,
      body: body ? body : 'No body'
    });
    // Make the request
    const response = await fetch(url.toString(), options);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
    return {
      success: true,
      data
    };
    }

    return {
      success: true,
      // data
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

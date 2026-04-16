import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../config/config';

export class GenericApiClient {
  constructor(protected request: APIRequestContext) {}

  /**
   * Generic GET request
   */
  async get(endpoint: string, options: any = {}): Promise<APIResponse> {
    const response = await this.request.get(endpoint, {
      ...options,
      headers: this.getHeaders(options.headers),
    });
    this.logRequest('GET', endpoint, response);
    return response;
  }

  /**
   * Generic POST request
   */
  async post(endpoint: string, payload: any, options: any = {}): Promise<APIResponse> {
    const response = await this.request.post(endpoint, {
      data: payload,
      ...options,
      headers: this.getHeaders(options.headers),
    });
    this.logRequest('POST', endpoint, response);
    return response;
  }

  /**
   * Generic PUT request
   */
  async put(endpoint: string, payload: any, options: any = {}): Promise<APIResponse> {
    const response = await this.request.put(endpoint, {
      data: payload,
      ...options,
      headers: this.getHeaders(options.headers),
    });
    this.logRequest('PUT', endpoint, response);
    return response;
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint: string, options: any = {}): Promise<APIResponse> {
    const response = await this.request.delete(endpoint, {
      ...options,
      headers: this.getHeaders(options.headers),
    });
    this.logRequest('DELETE', endpoint, response);
    return response;
  }

  /**
   * Internal helper to merge headers
   */
  private getHeaders(customHeaders: any = {}) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api_key': config.apiKey,
      ...customHeaders,
    };
  }

  /**
   * Basic logging for visibility
   */
  private logRequest(method: string, endpoint: string, response: APIResponse) {
    if (!config.isCI) {
      console.log(`[API Request] ${method} ${endpoint} - Status: ${response.status()}`);
    }
  }
}

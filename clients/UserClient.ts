import { APIRequestContext } from '@playwright/test';
import { GenericApiClient } from '../utils/api/GenericApiClient';
import { ENDPOINTS } from '../utils/config/endpoints';

export class UserClient extends GenericApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(user: any) {
    return this.post(ENDPOINTS.USER.BASE, user);
  }

  async getUser(username: string) {
    return this.get(ENDPOINTS.USER.BY_USERNAME(username));
  }

  async deleteUser(username: string) {
    return this.delete(ENDPOINTS.USER.BY_USERNAME(username));
  }

  async login(username: string, password: string) {
    return this.get(ENDPOINTS.USER.LOGIN, {
      params: { username, password }
    });
  }

  async logout() {
    return this.get(ENDPOINTS.USER.LOGOUT);
  }
}

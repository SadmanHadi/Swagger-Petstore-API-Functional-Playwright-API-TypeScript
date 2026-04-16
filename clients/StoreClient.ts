import { APIRequestContext } from '@playwright/test';
import { GenericApiClient } from '../utils/api/GenericApiClient';
import { ENDPOINTS } from '../utils/config/endpoints';

export class StoreClient extends GenericApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async placeOrder(order: any) {
    return this.post(ENDPOINTS.STORE.ORDER, order);
  }

  async getOrderById(orderId: string | number) {
    return this.get(ENDPOINTS.STORE.ORDER_BY_ID(orderId));
  }

  async deleteOrder(orderId: string | number) {
    return this.delete(ENDPOINTS.STORE.ORDER_BY_ID(orderId));
  }

  async getInventory() {
    return this.get(ENDPOINTS.STORE.INVENTORY);
  }
}

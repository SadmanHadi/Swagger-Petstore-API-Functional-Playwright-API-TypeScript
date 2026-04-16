import { test } from '@playwright/test';
import { StoreClient } from '../../../clients/StoreClient';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { testData } from '../../../data/testData';

test.describe('Store Operations: Delete Order', () => {
  let storeClient: StoreClient;
  let orderId: number;

  test.beforeEach(async ({ request }) => {
    storeClient = new StoreClient(request);
    
    // Setup data
    const petClient = new PetClient(request);
    const petResponse = await petClient.addPet(testData.getPetPayload());
    const petBody = await petResponse.json();
    
    const orderResponse = await storeClient.placeOrder(testData.getOrderPayload(petBody.id));
    const orderBody = await orderResponse.json();
    orderId = orderBody.id;
  });

  test('Happy Path: Delete order by valid ID', async () => {
    const response = await storeClient.deleteOrder(orderId);
    await ResponseValidator.validateStatus(response, 200);

    // Verify it's gone
    const getResponse = await storeClient.getOrderById(orderId);
    await ResponseValidator.validateStatus(getResponse, 404);
  });

  test('Negative Case: Delete order with non-existent ID', async () => {
    const response = await storeClient.deleteOrder(999999999);
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Delete order twice', async () => {
    await storeClient.deleteOrder(orderId);
    const response = await storeClient.deleteOrder(orderId);
    await ResponseValidator.validateStatus(response, 404);
  });
});

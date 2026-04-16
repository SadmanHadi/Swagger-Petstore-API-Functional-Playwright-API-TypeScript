import { test } from '@playwright/test';
import { StoreClient } from '../../../clients/StoreClient';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { orderSchema } from '../../../utils/schemas/orderSchema';
import { testData } from '../../../data/testData';

test.describe('Store Operations: Get Order', () => {
  let storeClient: StoreClient;
  let orderId: number;

  test.beforeAll(async ({ request }) => {
    const petClient = new PetClient(request);
    const petResponse = await petClient.addPet(testData.getPetPayload());
    const petBody = await petResponse.json();
    
    const client = new StoreClient(request);
    const orderResponse = await client.placeOrder(testData.getOrderPayload(petBody.id));
    const orderBody = await orderResponse.json();
    orderId = orderBody.id;
  });

  test.beforeEach(async ({ request }) => {
    storeClient = new StoreClient(request);
  });

  test('Happy Path: Get order by valid ID', async () => {
    const response = await storeClient.getOrderById(orderId);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateSchema(response, orderSchema);
    await ResponseValidator.validateField(response, 'id', orderId);
  });

  test('Negative Case: Get order with invalid ID string', async () => {
    const response = await storeClient.getOrderById('abc_123');
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Get order with ID = 0', async () => {
    const response = await storeClient.getOrderById(0);
    await ResponseValidator.validateStatus(response, 404);
  });
});

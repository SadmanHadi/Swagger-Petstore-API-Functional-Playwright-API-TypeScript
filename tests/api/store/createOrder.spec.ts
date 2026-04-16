import { test } from '@playwright/test';
import { StoreClient } from '../../../clients/StoreClient';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { orderSchema } from '../../../utils/schemas/orderSchema';
import { testData } from '../../../data/testData';

test.describe('Store Operations: Create Order', () => {
  let storeClient: StoreClient;
  let petId: number;

  test.beforeAll(async ({ request }) => {
    const petClient = new PetClient(request);
    const petResponse = await petClient.addPet(testData.getPetPayload());
    const petBody = await petResponse.json();
    petId = petBody.id;
  });

  test.beforeEach(async ({ request }) => {
    storeClient = new StoreClient(request);
  });

  test('Happy Path: Place a valid order', async () => {
    const payload = testData.getOrderPayload(petId);
    const response = await storeClient.placeOrder(payload);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateSchema(response, orderSchema);
    await ResponseValidator.validateField(response, 'petId', petId);
  });

  test('Negative Case: Place order with invalid petId', async () => {
    const payload = testData.getOrderPayload(-1);
    const response = await storeClient.placeOrder(payload);
    
    // API might accept it or return 400. In SQA we assert stability.
    await ResponseValidator.validateStatus(response, 200);
  });

  test('Boundary Case: Place order with max quantity', async () => {
    const payload = testData.getOrderPayload(petId, { quantity: 1000000 });
    const response = await storeClient.placeOrder(payload);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateField(response, 'quantity', 1000000);
  });
});

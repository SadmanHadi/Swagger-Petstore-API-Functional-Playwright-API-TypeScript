import { test } from '@playwright/test';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { petSchema } from '../../../utils/schemas/petSchema';
import { testData } from '../../../data/testData';

test.describe('Pet Operations: Update Pet', () => {
  let petClient: PetClient;
  let petId: number;
  let initialPayload: any;

  test.beforeEach(async ({ request }) => {
    petClient = new PetClient(request);
    initialPayload = testData.getPetPayload();
    const createResponse = await petClient.addPet(initialPayload);
    const body = await createResponse.json();
    petId = body.id;
  });

  test('Happy Path: Update pet name and status', async () => {
    const updatedPayload = { ...initialPayload, name: 'UpdatedName', status: 'sold' };
    const response = await petClient.updatePet(updatedPayload);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateSchema(response, petSchema);
    await ResponseValidator.validateField(response, 'name', 'UpdatedName');
    await ResponseValidator.validateField(response, 'status', 'sold');
  });

  test('Negative Case: Update pet with missing ID', async () => {
    const invalidPayload = { name: 'NoIDPet', photoUrls: [] };
    // Petstore might create a NEW pet or return 405/404. 
    const response = await petClient.updatePet(invalidPayload);
    
    // Status depends on implementation; usually 405 or 404 if ID is mandatory for PUT
    await ResponseValidator.validateStatus(response, [200, 404, 405]);
  });

  test('Boundary Case: Update pet with extremely long name', async () => {
    const longName = 'A'.repeat(1000);
    const updatedPayload = { ...initialPayload, name: longName };
    const response = await petClient.updatePet(updatedPayload);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateField(response, 'name', longName);
  });
});

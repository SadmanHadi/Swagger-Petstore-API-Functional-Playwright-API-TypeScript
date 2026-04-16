import { test } from '@playwright/test';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { petSchema } from '../../../utils/schemas/petSchema';
import { testData } from '../../../data/testData';

test.describe('Pet Operations: Get Pet', () => {
  let petClient: PetClient;
  let petId: number;

  test.beforeAll(async ({ request }) => {
    // Setup data for GET tests
    const client = new PetClient(request);
    const payload = testData.getPetPayload();
    const response = await client.addPet(payload);
    const body = await response.json();
    petId = body.id;
  });

  test.beforeEach(async ({ request }) => {
    petClient = new PetClient(request);
  });

  test('Happy Path: Get pet by valid ID', async () => {
    const response = await petClient.getPetById(petId);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateSchema(response, petSchema);
    await ResponseValidator.validateField(response, 'id', petId);
  });

  test('Negative Case: Get pet with non-existent ID', async () => {
    const response = await petClient.getPetById(999999999);
    
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Get pet with invalid string ID', async () => {
    const response = await petClient.getPetById('invalid_id_string');
    
    // API returns 404/400 for invalid formats
    await ResponseValidator.validateStatus(response, [400, 404]);
  });
});

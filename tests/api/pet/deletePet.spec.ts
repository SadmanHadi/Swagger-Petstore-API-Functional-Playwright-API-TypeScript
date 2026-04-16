import { test } from '@playwright/test';
import { PetClient } from '../../../clients/PetClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { testData } from '../../../data/testData';

test.describe('Pet Operations: Delete Pet', () => {
  let petClient: PetClient;
  let petId: number;

  test.beforeEach(async ({ request }) => {
    petClient = new PetClient(request);
    const payload = testData.getPetPayload();
    const response = await petClient.addPet(payload);
    const body = await response.json();
    petId = body.id;
  });

  test('Happy Path: Delete pet by valid ID', async () => {
    const response = await petClient.deletePet(petId);
    await ResponseValidator.validateStatus(response, 200);

    // Verify it's gone
    const getResponse = await petClient.getPetById(petId);
    await ResponseValidator.validateStatus(getResponse, 404);
  });

  test('Negative Case: Delete pet with non-existent ID', async () => {
    const response = await petClient.deletePet(1234567890); // Large non-existent ID
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Delete pet with invalid ID format (null)', async () => {
    // Note: deletePet(null) is handled by the client as a string/number
    // passing an empty string or null to check API behavior
    const response = await petClient.deletePet('');
    await ResponseValidator.validateStatus(response, [404, 405]);
  });
});

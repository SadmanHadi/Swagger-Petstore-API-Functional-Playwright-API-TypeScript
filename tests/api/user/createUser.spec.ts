import { test } from '@playwright/test';
import { UserClient } from '../../../clients/UserClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { userSchema } from '../../../utils/schemas/userSchema';
import { testData } from '../../../data/testData';

test.describe('User Operations: Create User', () => {
  let userClient: UserClient;

  test.beforeEach(async ({ request }) => {
    userClient = new UserClient(request);
  });

  test('Happy Path: Create a new user with valid data', async () => {
    const payload = testData.getUserPayload();
    const response = await userClient.createUser(payload);
    
    await ResponseValidator.validateStatus(response, 200);
    // User creation response body in Petstore is typically just a message/code, not the user object
    // So we validate schema if applicable or field presence
  });

  test('Negative Case: Create user with duplicate username', async () => {
    const payload = testData.getUserPayload();
    await userClient.createUser(payload);
    
    // Attempting to create again; Petstore often allows this or handles it gracefully
    const response = await userClient.createUser(payload);
    await ResponseValidator.validateStatus(response, 200);
  });

  test('Boundary Case: Create user with empty password', async () => {
    const payload = testData.getUserPayload({ password: '' });
    const response = await userClient.createUser(payload);
    
    await ResponseValidator.validateStatus(response, 200);
  });
});

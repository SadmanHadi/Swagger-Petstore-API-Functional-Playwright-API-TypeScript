import { test } from '@playwright/test';
import { UserClient } from '../../../clients/UserClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { userSchema } from '../../../utils/schemas/userSchema';
import { testData } from '../../../data/testData';

test.describe('User Operations: Get User', () => {
  let userClient: UserClient;
  let username: string;
  let userData: any;

  test.beforeAll(async ({ request }) => {
    const client = new UserClient(request);
    userData = testData.getUserPayload();
    await client.createUser(userData);
    username = userData.username;
  });

  test.beforeEach(async ({ request }) => {
    userClient = new UserClient(request);
  });

  test('Happy Path: Get user by valid username', async () => {
    const response = await userClient.getUser(username);
    
    await ResponseValidator.validateStatus(response, 200);
    await ResponseValidator.validateSchema(response, userSchema);
    await ResponseValidator.validateField(response, 'username', username);
  });

  test('Negative Case: Get user with non-existent username', async () => {
    const response = await userClient.getUser('non_existent_123456789');
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Get user with empty username', async () => {
    const response = await userClient.getUser('');
    await ResponseValidator.validateStatus(response, [404, 405]);
  });
});

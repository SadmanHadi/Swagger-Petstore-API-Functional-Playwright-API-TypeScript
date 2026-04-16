import { test } from '@playwright/test';
import { UserClient } from '../../../clients/UserClient';
import { ResponseValidator } from '../../../utils/validation/ResponseValidator';
import { testData } from '../../../data/testData';

test.describe('User Operations: Delete User', () => {
  let userClient: UserClient;
  let username: string;

  test.beforeEach(async ({ request }) => {
    userClient = new UserClient(request);
    const userData = testData.getUserPayload();
    await userClient.createUser(userData);
    username = userData.username;
  });

  test('Happy Path: Delete user by valid username', async () => {
    const response = await userClient.deleteUser(username);
    await ResponseValidator.validateStatus(response, 200);

    // Verify it's gone
    const getResponse = await userClient.getUser(username);
    await ResponseValidator.validateStatus(getResponse, 404);
  });

  test('Negative Case: Delete user with non-existent username', async () => {
    const response = await userClient.deleteUser('non_existent_user_99999');
    await ResponseValidator.validateStatus(response, 404);
  });

  test('Boundary Case: Delete user with numeric string as username', async () => {
    const fakeUsername = '123456';
    const response = await userClient.deleteUser(fakeUsername);
    await ResponseValidator.validateStatus(response, [200, 404]);
  });
});

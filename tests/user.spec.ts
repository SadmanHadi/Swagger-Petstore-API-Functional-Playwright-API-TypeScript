import { test, expect } from '@playwright/test';
import { UserClient } from '../helpers/UserClient';

test.describe('Petstore API - User Operations', () => {
  let userClient: UserClient;
  const username = `user_${Date.now()}`;
  const userData = {
    id: Math.floor(Math.random() * 10000),
    username: username,
    firstName: 'QA',
    lastName: 'Tester',
    email: 'tester@example.com',
    password: 'password123',
    phone: '123456789',
    userStatus: 1
  };

  test.beforeEach(async ({ request }) => {
    userClient = new UserClient(request);
  });

  test('Happy Path: Create and Delete User', async () => {
    const createResponse = await userClient.createUser(userData);
    expect(createResponse.status()).toBe(200);
    
    const getResponse = await userClient.getUser(username);
    expect(getResponse.status()).toBe(200);
    const user = await getResponse.json();
    expect(user.username).toBe(username);
    expect(user.email).toBe(userData.email);
    expect(user.id).toBe(userData.id);

    const deleteResponse = await userClient.deleteUser(username);
    expect(deleteResponse.status()).toBe(200);
  });

  test('Negative Case: Delete Non-Existent User', async () => {
    const response = await userClient.deleteUser('non_existent_user_xyz_123');
    // Swagger Petstore may return 404 or 405 for non-existent users or method not allowed
    expect([404, 405]).toContain(response.status());
  });

  test('Boundary Case: Get User with invalid username format', async () => {
    // Empty or path-invalid username; API may return 404, 405, or 400
    const response = await userClient.getUser('');
    expect([400, 404, 405]).toContain(response.status());
  });
});

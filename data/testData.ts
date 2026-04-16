export const testData = {
  getPetPayload: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000000),
    name: `Pet_${Date.now()}`,
    photoUrls: ['https://example.com/photo.jpg'],
    status: 'available',
    ...overrides,
  }),

  getUserPayload: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000000),
    username: `user_${Date.now()}`,
    firstName: 'QA',
    lastName: 'Tester',
    email: `tester_${Date.now()}@example.com`,
    password: 'password123',
    phone: '1234567890',
    userStatus: 1,
    ...overrides,
  }),

  getOrderPayload: (petId: number, overrides = {}) => ({
    id: Math.floor(Math.random() * 1000000),
    petId: petId,
    quantity: 1,
    status: 'placed',
    complete: false,
    ...overrides,
  }),
};

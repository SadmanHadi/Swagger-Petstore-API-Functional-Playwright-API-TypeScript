export const userSchema = {
  type: 'object',
  required: ['id', 'username', 'email'],
  properties: {
    id: { type: 'integer' },
    username: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    userStatus: { type: 'integer' },
  },
};

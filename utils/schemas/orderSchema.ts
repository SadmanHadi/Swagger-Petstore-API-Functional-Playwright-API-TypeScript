export const orderSchema = {
  type: 'object',
  required: ['id', 'petId', 'quantity', 'status', 'complete'],
  properties: {
    id: { type: 'integer' },
    petId: { type: 'integer' },
    quantity: { type: 'integer' },
    shipDate: { type: 'string', format: 'date-time' },
    status: {
      type: 'string',
      enum: ['placed', 'approved', 'delivered'],
    },
    complete: { type: 'boolean' },
  },
};

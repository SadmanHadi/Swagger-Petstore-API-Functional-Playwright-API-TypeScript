export const ENDPOINTS = {
  PET: {
    BASE: 'v2/pet',
    BY_ID: (petId: string | number) => `v2/pet/${petId}`,
    FIND_BY_STATUS: 'v2/pet/findByStatus',
  },
  USER: {
    BASE: 'v2/user',
    BY_USERNAME: (username: string) => `v2/user/${username}`,
    LOGIN: 'v2/user/login',
    LOGOUT: 'v2/user/logout',
    CREATE_WITH_LIST: 'v2/user/createWithList',
    CREATE_WITH_ARRAY: 'v2/user/createWithArray',
  },
  STORE: {
    INVENTORY: 'v2/store/inventory',
    ORDER: 'v2/store/order',
    ORDER_BY_ID: (orderId: string | number) => `v2/store/order/${orderId}`,
  },
} as const;



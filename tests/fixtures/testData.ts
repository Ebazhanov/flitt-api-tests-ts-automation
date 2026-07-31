/**
 * Test Data Constants
 */

export const TEST_DATA = {
  CURRENCIES: {
    VALID: ['EUR', 'USD', 'GBP'],
    INVALID: ['XYZ', 'ABC', '123'],
  },
  AMOUNTS: {
    MIN_VALID: 1,
    MAX_VALID: 999999999,
    EXCEEDS_MAX: '9007199254740992111111',
    NEGATIVE: -1000,
  },
  SPECIAL_CHARS: 'Order & #123 / Test "Special" <Chars> - 🛒 💳 🇩🇪 %20',
  ORDER_DESCRIPTIONS: {
    DEFAULT: 'Test Order',
    DATA_INTEGRITY: 'Data Integrity Verification Order',
    MIN_AMOUNT: 'Min Amount Test',
    LARGE_AMOUNT: 'Large Amount Test',
    MAX_LIMIT: 'Max Limit Exceeded Test',
    VALIDATION: 'Validation Test Order',
    STATUS_CHECK: 'Status Check Test Order',
  },
  VALID_ORDER_STATUSES: ['created', 'approved', 'processing', 'declined'],
};

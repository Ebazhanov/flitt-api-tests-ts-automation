/**
 * Test Data Factory Functions
 */

import { CreateCheckoutPayload } from '../../src/types/api.types';

/**
 * Generate a unique test order ID
 */
export const createTestOrderId = (): string =>
  `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

/**
 * Create default checkout payload
 */
export const defaultCheckoutPayload = (
  overrides?: Partial<CreateCheckoutPayload>
): CreateCheckoutPayload => ({
  order_id: createTestOrderId(),
  order_desc: 'Test Order',
  currency: 'EUR',
  amount: 1000,
  ...overrides,
});

/**
 * Create checkout payload with custom amount
 */
export const checkoutPayloadWithAmount = (
  amount: number | string,
  overrides?: Partial<CreateCheckoutPayload>
): CreateCheckoutPayload => defaultCheckoutPayload({ amount, ...overrides });

/**
 * Create checkout payload with custom currency
 */
export const checkoutPayloadWithCurrency = (
  currency: string,
  overrides?: Partial<CreateCheckoutPayload>
): CreateCheckoutPayload => defaultCheckoutPayload({ currency, ...overrides });

/**
 * Create checkout payload with custom description
 */
export const checkoutPayloadWithDescription = (
  orderDesc: string,
  overrides?: Partial<CreateCheckoutPayload>
): CreateCheckoutPayload => defaultCheckoutPayload({ order_desc: orderDesc, ...overrides });

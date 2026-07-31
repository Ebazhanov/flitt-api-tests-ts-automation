/**
 * Test Assertion Helpers
 */

import { AxiosResponse } from 'axios';
import { expect } from 'vitest';
import { CheckoutUrlResponse, OrderStatusResponse } from '../../src/types/api.types';

/**
 * Assert successful checkout response
 */
export function expectSuccessCheckoutResponse(response: AxiosResponse<CheckoutUrlResponse>) {
  expect(response.status).toBe(200);
  expect(response.data.response.response_status).toBe('success');
  expect(response.data.response.checkout_url).toBeDefined();
  expect(response.data.response.checkout_url).toContain('https://');
  return response.data.response;
}

/**
 * Assert successful status response
 */
export function expectSuccessStatusResponse(response: AxiosResponse<OrderStatusResponse>) {
  expect(response.status).toBe(200);
  expect(response.data.response.response_status).toBe('success');
  return response.data.response;
}

/**
 * Assert failure response with error code
 */
export function expectFailureResponse(
  response: AxiosResponse<CheckoutUrlResponse | OrderStatusResponse>
) {
  expect(response.status).toBe(200);
  expect(response.data.response.response_status).toBe('failure');
  expect(response.data.response.error_code).toBeDefined();
  return response.data.response;
}

/**
 * Assert order status is valid
 */
export function expectValidOrderStatus(status: string | undefined, validStatuses: string[]) {
  expect(validStatuses).toContain(status?.toLowerCase());
}

/**
 * Assert order data integrity
 */
export function expectOrderDataIntegrity(
  responseOrderId: string | undefined,
  expectedOrderId: string,
  responseAmount: number | string | undefined,
  expectedAmount: number | string,
  responseCurrency: string | undefined,
  expectedCurrency: string
) {
  expect(responseOrderId).toBe(expectedOrderId);
  expect(Number(responseAmount)).toBe(Number(expectedAmount));
  expect(responseCurrency?.toUpperCase()).toBe(expectedCurrency.toUpperCase());
}

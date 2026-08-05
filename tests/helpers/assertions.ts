/**
 * Test Assertion Helpers (Playwright API Testing)
 */

import { APIResponse, expect } from '@playwright/test';
import { CheckoutUrlResponse, OrderStatusResponse } from '../../src/types/api.types';

/**
 * Standard API client result wrapper returned by FlittApiClient methods
 */
export interface ApiClientResult<T> {
  response: APIResponse;
  body: T;
}

/**
 * Assert successful checkout response
 */
export function expectSuccessCheckoutResponse(result: ApiClientResult<CheckoutUrlResponse>) {
  expect(result.response.status()).toBe(200);
  expect(result.response.ok()).toBeTruthy();
  expect(result.body.response.response_status).toBe('success');
  expect(result.body.response.checkout_url).toBeDefined();
  expect(result.body.response.checkout_url).toContain('https://');
  return result.body.response;
}

/**
 * Assert successful status response
 */
export function expectSuccessStatusResponse(result: ApiClientResult<OrderStatusResponse>) {
  expect(result.response.status()).toBe(200);
  expect(result.response.ok()).toBeTruthy();
  expect(result.body.response.response_status).toBe('success');
  return result.body.response;
}

/**
 * Assert failure response with error code
 */
export function expectFailureResponse(
  result: ApiClientResult<CheckoutUrlResponse | OrderStatusResponse>
) {
  expect(result.response.status()).toBe(200);
  expect(result.body.response.response_status).toBe('failure');
  expect(result.body.response.error_code).toBeDefined();
  return result.body.response;
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

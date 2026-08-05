import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount } from '../fixtures/factories';
import { expectSuccessCheckoutResponse } from '../helpers/assertions';

test.describe('Flitt API - Checkout Boundary Tests', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Boundary Path: should handle minimum valid amount', async () => {
    const payload = checkoutPayloadWithAmount(1);
    const result = await flittClient.createCheckoutUrl(payload);
    expectSuccessCheckoutResponse(result);
  });

  test('Boundary Path: should handle maximum valid amount', async () => {
    const payload = checkoutPayloadWithAmount(99999999);
    const result = await flittClient.createCheckoutUrl(payload);
    expectSuccessCheckoutResponse(result);
  });
});

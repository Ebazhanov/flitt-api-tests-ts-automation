import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { checkoutPayloadWithDescription } from '../fixtures/factories';
import { expectSuccessCheckoutResponse } from '../helpers/assertions';

test.describe('Flitt API - Checkout Character Handling Tests', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Character Handling: should handle special characters in description', async () => {
    const payload = checkoutPayloadWithDescription('Order #123 & <Test> @ 100%');
    const result = await flittClient.createCheckoutUrl(payload);
    await expectSuccessCheckoutResponse(result);
  });
});

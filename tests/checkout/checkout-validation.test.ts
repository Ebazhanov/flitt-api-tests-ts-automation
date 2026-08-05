import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount, checkoutPayloadWithCurrency } from '../fixtures/factories';
import { expectFailureResponse } from '../helpers/assertions';

test.describe('Flitt API - Checkout Validation Tests', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Validation Path: should fail on negative amount', async () => {
    const payload = checkoutPayloadWithAmount(-500);
    const result = await flittClient.createCheckoutUrl(payload);
    expectFailureResponse(result);
  });

  test('Validation Path: should fail on invalid currency', async () => {
    const payload = checkoutPayloadWithCurrency('INVALID');
    const result = await flittClient.createCheckoutUrl(payload);
    expectFailureResponse(result);
  });
});

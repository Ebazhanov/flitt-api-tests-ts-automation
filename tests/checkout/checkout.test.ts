import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { defaultCheckoutPayload } from '../fixtures/factories';
import { expectSuccessCheckoutResponse, expectFailureResponse } from '../helpers/assertions';

test.describe('Flitt API - Checkout Endpoint (/api/checkout/url)', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Happy Path: should successfully return checkout_url when valid payload is sent', async () => {
    const payload = defaultCheckoutPayload({
      order_desc: 'Demo Test Order',
      amount: 1000,
    });

    const result = await flittClient.createCheckoutUrl(payload);

    // Adjust expectation helper to accept Playwright response/body object
    expectSuccessCheckoutResponse(result);
  });

  test('Negative Path: should return failure status when invalid signature is provided', async () => {
    const payload = defaultCheckoutPayload({
      order_desc: 'Demo Test Order',
      amount: 1000,
      signature: 'invalid_signature_hash',
    });

    const result = await flittClient.createCheckoutUrl(payload);

    expectFailureResponse(result);
  });
});

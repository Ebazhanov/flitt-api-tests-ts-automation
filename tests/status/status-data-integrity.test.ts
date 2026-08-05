import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount } from '../fixtures/factories';
import {
  expectSuccessCheckoutResponse,
  expectSuccessStatusResponse,
  expectOrderDataIntegrity,
} from '../helpers/assertions';

test.describe('Flitt API - Order Status Data Integrity', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Data Integrity: should match checkout order details in status response', async () => {
    const amount = 1500;
    const checkoutPayload = checkoutPayloadWithAmount(amount);

    const checkoutResult = await flittClient.createCheckoutUrl(checkoutPayload);
    expectSuccessCheckoutResponse(checkoutResult);

    const statusResult = await flittClient.getOrderStatus(checkoutPayload.order_id);
    const statusData = expectSuccessStatusResponse(statusResult);

    expectOrderDataIntegrity(
      statusData.order_id,
      checkoutPayload.order_id,
      statusData.amount,
      amount,
      statusData.currency,
      checkoutPayload.currency
    );
  });
});

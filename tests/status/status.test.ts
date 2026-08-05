import { test } from '@playwright/test';
import { FlittApiClient } from '../../src/api/flitt.client';
import { defaultCheckoutPayload } from '../fixtures/factories';
import {
  expectFailureResponse,
  expectSuccessCheckoutResponse,
  expectSuccessStatusResponse,
  expectValidOrderStatus,
} from '../helpers/assertions';

test.describe('Flitt API - Order Status Endpoint (/api/status/order_id)', () => {
  let flittClient: FlittApiClient;

  test.beforeEach(({ request }) => {
    flittClient = new FlittApiClient(request);
  });

  test('Happy Path: should successfully retrieve status of created order', async () => {
    const payload = defaultCheckoutPayload();

    const checkoutResult = await flittClient.createCheckoutUrl(payload);
    expectSuccessCheckoutResponse(checkoutResult);

    const statusResult = await flittClient.getOrderStatus(payload.order_id);
    const statusData = expectSuccessStatusResponse(statusResult);

    expectValidOrderStatus(statusData.order_status, [
      'created',
      'processing',
      'approved',
      'declined',
      'pending',
    ]);
  });

  test('Negative Path: should fail when fetching status for non-existent order_id', async () => {
    const statusResult = await flittClient.getOrderStatus('non_existent_order_id_999999');
    expectFailureResponse(statusResult);
  });
});

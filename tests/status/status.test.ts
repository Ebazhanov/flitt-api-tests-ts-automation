import { describe, it, expect } from 'vitest';
import { createCheckoutUrl, getOrderStatus } from '../../src/api/flitt.client';
import { defaultCheckoutPayload } from '../../tests/fixtures/factories';
import { expectSuccessCheckoutResponse, expectSuccessStatusResponse, expectFailureResponse, expectValidOrderStatus } from '../../tests/helpers/assertions';
import { TEST_DATA } from '../../tests/fixtures/testData';

describe('Flitt API - Order Status Check (/api/status/order_id)', () => {

    it('Happy Path: should successfully return status for a newly created order', async () => {
        // ARRANGE
        const payload = defaultCheckoutPayload({
            order_desc: TEST_DATA.ORDER_DESCRIPTIONS.STATUS_CHECK,
            amount: 1000,
        });

        // ACT - Create order
        const checkoutResponse = await createCheckoutUrl(payload);
        expectSuccessCheckoutResponse(checkoutResponse);

        // ACT - Get status
        const statusResponse = await getOrderStatus(payload.order_id);

        // ASSERT
        const statusData = expectSuccessStatusResponse(statusResponse);
        expect(statusData.order_id).toBe(payload.order_id);
        expectValidOrderStatus(statusData.order_status, TEST_DATA.VALID_ORDER_STATUSES);
    });

    it('Negative Path: should return appropriate error when checking status for non-existent order_id', async () => {
        // ARRANGE
        const nonExistentOrderId = `order_nonexistent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // ACT
        const statusResponse = await getOrderStatus(nonExistentOrderId);

        // ASSERT
        expectFailureResponse(statusResponse);
    });

});
import { describe, it, expect } from 'vitest';
import { createCheckoutUrl, getOrderStatus } from '../../src/api/flitt.client';

describe('Flitt API - Order Status Check (/api/status/order_id)', () => {

    it('Happy Path: should successfully return status for a newly created order', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // 1. Create a new order via checkout API
        const checkoutResponse = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Status Check Test Order',
            currency: 'EUR',
            amount: 1000,
        });

        expect(checkoutResponse.status).toBe(200);
        expect(checkoutResponse.data.response.response_status).toBe('success');

        // 2. Fetch status for the created order
        const statusResponse = await getOrderStatus(orderId);

        // 3. Verify status response validity
        expect(statusResponse.status).toBe(200);
        expect(statusResponse.data.response.response_status).toBe('success');
        expect(statusResponse.data.response.order_id).toBe(orderId);

        // Assert initial state ('created', 'approved', 'processing', or 'declined')
        expect(['created', 'approved', 'processing', 'declined']).toContain(
            statusResponse.data.response.order_status?.toLowerCase()
        );
    });

    it('Negative Path: should return appropriate error when checking status for non-existent order_id', async () => {
        const nonExistentOrderId = `order_nonexistent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const statusResponse = await getOrderStatus(nonExistentOrderId);

        expect(statusResponse.status).toBe(200);
        expect(statusResponse.data.response.response_status).toBe('failure');
        expect(statusResponse.data.response.error_code).toBeDefined();
    });

});
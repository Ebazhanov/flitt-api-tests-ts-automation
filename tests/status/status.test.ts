import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { generateSignature } from '../../src/utils/signature';

const BASE_URL = 'https://pay.flitt.com';
const MERCHANT_ID = 1549901;
const SECRET_KEY = 'test';

describe('Flitt API - Order Status Check (/api/status/order_id)', () => {

    it('Happy Path: should successfully return status for a newly created order', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // 1. Create a new order via checkout API
        const checkoutPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: 'Status Check Test Order',
            currency: 'EUR',
            amount: 1000,
        };
        checkoutPayload.signature = generateSignature(checkoutPayload, SECRET_KEY);

        const checkoutResponse = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: checkoutPayload,
        });

        expect(checkoutResponse.status).toBe(200);
        expect(checkoutResponse.data.response.response_status).toBe('success');

        // 2. Build order status payload
        const statusPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
        };
        statusPayload.signature = generateSignature(statusPayload, SECRET_KEY);

        // 3. Request status from the correct endpoint (/api/status/order_id)
        const statusResponse = await axios.post(`${BASE_URL}/api/status/order_id`, {
            request: statusPayload,
        });

        // 4. Verify status response validity
        expect(statusResponse.status).toBe(200);
        expect(statusResponse.data.response.response_status).toBe('success');
        expect(statusResponse.data.response.order_id).toBe(orderId);

        // Assert initial state ('created', 'processing', or 'approved')
        expect(['created', 'approved', 'processing', 'declined']).toContain(
            statusResponse.data.response.order_status?.toLowerCase()
        );
    });

});
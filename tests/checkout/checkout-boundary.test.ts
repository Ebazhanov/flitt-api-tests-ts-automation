import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';

describe('Flitt API - Checkout Boundary Values (/api/checkout/url)', () => {

    it('Boundary: should successfully process minimum valid amount (amount: 1)', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Min Amount Test',
            currency: 'EUR',
            amount: 1,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
    });

    it('Boundary: should successfully process large transaction amounts on link generation', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Large Amount Test',
            currency: 'EUR',
            amount: 999999999,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
    });

    it('Boundary: should return failure when amount exceeds maximum integer limits', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Max Limit Exceeded Test',
            currency: 'EUR',
            amount: 9007199254740992111111n.toString(),
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
        expect(response.data.response.error_code).toBeDefined();
    });

});
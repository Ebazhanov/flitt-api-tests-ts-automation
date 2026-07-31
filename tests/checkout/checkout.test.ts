import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';

describe('Flitt API - Checkout Endpoint (/api/checkout/url)', () => {

    it('Happy Path: should successfully return checkout_url when valid payload is sent', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Demo Test Order',
            currency: 'EUR',
            amount: 1000,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
        expect(response.data.response.checkout_url).toContain('https://');
    });

    it('Negative Path: should return failure status when invalid signature is provided', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Demo Test Order',
            currency: 'EUR',
            amount: 1000,
            signature: 'invalid_signature_hash',
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
    });

});
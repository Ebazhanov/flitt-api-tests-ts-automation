import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';

describe('Flitt API - Checkout Payload Validation', () => {

    it.each([
        { description: 'negative amount', amount: -1000, currency: 'EUR' },
        { description: 'unsupported currency', amount: 1000, currency: 'XYZ' },
    ])('Validation: should return failure response when $description is provided', async ({ amount, currency }) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Validation Test Order',
            currency: currency,
            amount: amount,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
        expect(response.data.response.error_code).toBeDefined();
    });

});
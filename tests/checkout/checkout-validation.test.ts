import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { generateSignature } from '../../src/utils/signature';

const BASE_URL = 'https://pay.flitt.com';
const MERCHANT_ID = 1549901;
const SECRET_KEY = 'test';

describe('Flitt API - Checkout Payload Validation', () => {

    it.each([
        { description: 'negative amount', amount: -1000, currency: 'EUR' },
        { description: 'unsupported currency', amount: 1000, currency: 'XYZ' },
    ])('Validation: should return failure response when $description is provided', async ({ amount, currency }) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: 'Validation Test Order',
            currency: currency,
            amount: amount,
        };

        requestPayload.signature = generateSignature(requestPayload, SECRET_KEY);

        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
        expect(response.data.response.error_code).toBeDefined();
    });

});
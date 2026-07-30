import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { generateSignature } from '../../src/utils/signature';

const BASE_URL = 'https://pay.flitt.com';
const MERCHANT_ID = 1549901;
const SECRET_KEY = 'test';

describe('Flitt API - Checkout Endpoint (/api/checkout/url)', () => {

    it('Happy Path: should successfully return checkout_url when valid payload is sent', async () => {
        const orderId = `order_${Date.now()}`;

        // 1. Prepare request payload
        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: 'Demo Test Order',
            currency: 'EUR',
            amount: 1000, // 10.00 EUR in cents
        };

        // 2. Calculate signature and add it to the payload
        requestPayload.signature = generateSignature(requestPayload, SECRET_KEY);

        // 3. Send POST request
        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        // 4. Assertions
        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
        expect(response.data.response.checkout_url).toContain('https://');
    });

    it('Negative Path: should return failure status when invalid signature is provided', async () => {
        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: `order_${Date.now()}`,
            order_desc: 'Negative Test Order',
            currency: 'EUR',
            amount: 1000,
            signature: 'invalid_signature_hash_123',
        };

        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
        expect(response.data.response.error_code).toBeDefined();
    });

});
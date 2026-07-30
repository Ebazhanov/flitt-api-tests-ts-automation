import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { generateSignature } from '../../src/utils/signature';

const BASE_URL = 'https://pay.flitt.com';
const MERCHANT_ID = 1549901;
const SECRET_KEY = 'test';

describe('Flitt API - Checkout Endpoint (/api/checkout/url)', () => {

    it('Happy Path: should successfully return checkout_url when valid payload is sent', async () => {
        // Guaranteed unique order ID
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: 'Demo Test Order',
            currency: 'EUR',
            amount: 1000,
        };

        requestPayload.signature = generateSignature(requestPayload, SECRET_KEY);

        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
        expect(response.data.response.checkout_url).toContain('https://');
    });

    it('Negative Path: should return failure status when invalid signature is provided', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: 'Demo Test Order',
            currency: 'EUR',
            amount: 1000,
            signature: 'invalid_signature_hash',
        };

        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('failure');
    });

});
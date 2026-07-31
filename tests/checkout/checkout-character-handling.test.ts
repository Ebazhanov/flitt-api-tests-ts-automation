import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { generateSignature } from '../../src/utils/signature';

const BASE_URL = 'https://pay.flitt.com';
const MERCHANT_ID = 1549901;
const SECRET_KEY = 'test';

describe('Flitt API - Character Handling & Encoding (/api/checkout/url)', () => {

    it('Character Handling: should generate checkout URL with special characters, symbols, and emojis in order_desc', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // Special characters, URL query delimiters, quotes, unicode, and emojis
        const complexOrderDesc = 'Order & #123 / Test "Special" <Chars> - 🛒 💳 🇩🇪 %20';

        const requestPayload: Record<string, any> = {
            merchant_id: MERCHANT_ID,
            order_id: orderId,
            order_desc: complexOrderDesc,
            currency: 'EUR',
            amount: 1500,
        };

        // Signature must be generated against the raw unescaped payload string
        requestPayload.signature = generateSignature(requestPayload, SECRET_KEY);

        const response = await axios.post(`${BASE_URL}/api/checkout/url`, {
            request: requestPayload,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
        expect(response.data.response.checkout_url).toContain('https://');
    });

});
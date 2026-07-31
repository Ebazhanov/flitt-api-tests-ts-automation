import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';

describe('Flitt API - Character Handling & Encoding (/api/checkout/url)', () => {

    it('Character Handling: should generate checkout URL with special characters, symbols, and emojis in order_desc', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // Special characters, URL query delimiters, quotes, unicode, and emojis
        const complexOrderDesc = 'Order & #123 / Test "Special" <Chars> - 🛒 💳 🇩🇪 %20';

        const response = await createCheckoutUrl({
            order_id: orderId,
            order_desc: complexOrderDesc,
            currency: 'EUR',
            amount: 1500,
        });

        expect(response.status).toBe(200);
        expect(response.data.response.response_status).toBe('success');
        expect(response.data.response.checkout_url).toBeDefined();
        expect(response.data.response.checkout_url).toContain('https://');
    });

});
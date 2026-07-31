import { describe, it, expect } from 'vitest';
import { createCheckoutUrl, getOrderStatus } from '../../src/api/flitt.client';

describe('Flitt API - Order Status Data Integrity (/api/status/order_id)', () => {

    it('Data Integrity: should verify amount, currency, and order_id match initial order payload', async () => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const initialAmount = 2550; // 25.50 EUR
        const initialCurrency = 'EUR';

        // 1. Create an order with specific payload parameters
        const checkoutResponse = await createCheckoutUrl({
            order_id: orderId,
            order_desc: 'Data Integrity Verification Order',
            currency: initialCurrency,
            amount: initialAmount,
        });

        expect(checkoutResponse.status).toBe(200);
        expect(checkoutResponse.data.response.response_status).toBe('success');

        // 2. Fetch status for the newly created order
        const statusResponse = await getOrderStatus(orderId);

        expect(statusResponse.status).toBe(200);
        expect(statusResponse.data.response.response_status).toBe('success');

        // 3. Perform data integrity assertions against the returned payload
        const responseData = statusResponse.data.response;

        expect(responseData.order_id).toBe(orderId);
        expect(Number(responseData.amount)).toBe(initialAmount);
        expect(responseData.currency?.toUpperCase()).toBe(initialCurrency);
    });

});
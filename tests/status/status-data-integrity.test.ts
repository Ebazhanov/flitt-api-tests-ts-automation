import { describe, it } from 'vitest';
import { createCheckoutUrl, getOrderStatus } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount } from '../../tests/fixtures/factories';
import { expectSuccessCheckoutResponse, expectSuccessStatusResponse, expectOrderDataIntegrity } from '../../tests/helpers/assertions';
import { TEST_DATA } from '../../tests/fixtures/testData';

describe('Flitt API - Order Status Data Integrity (/api/status/order_id)', () => {

    it('Data Integrity: should verify amount, currency, and order_id match initial order payload', async () => {
        // ARRANGE
        const initialAmount = 2550;
        const initialCurrency = 'EUR';
        const payload = checkoutPayloadWithAmount(initialAmount, {
            order_desc: TEST_DATA.ORDER_DESCRIPTIONS.DATA_INTEGRITY,
            currency: initialCurrency,
        });

        // ACT - Create order
        const checkoutResponse = await createCheckoutUrl(payload);
        expectSuccessCheckoutResponse(checkoutResponse);

        // ACT - Get status
        const statusResponse = await getOrderStatus(payload.order_id);
        const statusData = expectSuccessStatusResponse(statusResponse);

        // ASSERT - Verify data integrity
        expectOrderDataIntegrity(
            statusData.order_id,
            payload.order_id,
            statusData.amount,
            initialAmount,
            statusData.currency,
            initialCurrency
        );
    });

});
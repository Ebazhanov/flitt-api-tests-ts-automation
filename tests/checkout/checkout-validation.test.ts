import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount, checkoutPayloadWithCurrency } from '../../tests/fixtures/factories';
import { expectFailureResponse } from '../../tests/helpers/assertions';
import { TEST_DATA } from '../../tests/fixtures/testData';

describe('Flitt API - Checkout Payload Validation', () => {

    it.each([
        { description: 'negative amount', amount: TEST_DATA.AMOUNTS.NEGATIVE, currency: 'EUR' },
        { description: 'unsupported currency', amount: 1000, currency: TEST_DATA.CURRENCIES.INVALID[0] },
    ])('Validation: should return failure response when $description is provided', async ({ amount, currency }) => {
        const payload = checkoutPayloadWithAmount(amount, {
            order_desc: 'Validation Test Order',
            currency: currency,
        });

        const response = await createCheckoutUrl(payload);

        expectFailureResponse(response);
    });

});
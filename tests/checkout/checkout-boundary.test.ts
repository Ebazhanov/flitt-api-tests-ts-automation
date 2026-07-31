import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';
import { checkoutPayloadWithAmount } from '../../tests/fixtures/factories';
import { expectSuccessCheckoutResponse, expectFailureResponse } from '../../tests/helpers/assertions';
import { TEST_DATA } from '../../tests/fixtures/testData';

describe('Flitt API - Checkout Boundary Values (/api/checkout/url)', () => {

    it('Boundary: should successfully process minimum valid amount (amount: 1)', async () => {
        const payload = checkoutPayloadWithAmount(
            TEST_DATA.AMOUNTS.MIN_VALID,
            {
                order_desc: TEST_DATA.ORDER_DESCRIPTIONS.MIN_AMOUNT,
            }
        );

        const response = await createCheckoutUrl(payload);

        expectSuccessCheckoutResponse(response);
    });

    it('Boundary: should successfully process large transaction amounts on link generation', async () => {
        const payload = checkoutPayloadWithAmount(
            TEST_DATA.AMOUNTS.MAX_VALID,
            {
                order_desc: TEST_DATA.ORDER_DESCRIPTIONS.LARGE_AMOUNT,
            }
        );

        const response = await createCheckoutUrl(payload);

        expectSuccessCheckoutResponse(response);
    });

    it('Boundary: should return failure when amount exceeds maximum integer limits', async () => {
        const payload = checkoutPayloadWithAmount(
            TEST_DATA.AMOUNTS.EXCEEDS_MAX,
            {
                order_desc: TEST_DATA.ORDER_DESCRIPTIONS.MAX_LIMIT,
            }
        );

        const response = await createCheckoutUrl(payload);

        expectFailureResponse(response);
    });

});
import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';
import { checkoutPayloadWithDescription } from '../../tests/fixtures/factories';
import { expectSuccessCheckoutResponse } from '../../tests/helpers/assertions';
import { TEST_DATA } from '../../tests/fixtures/testData';

describe('Flitt API - Character Handling & Encoding (/api/checkout/url)', () => {

    it('Character Handling: should generate checkout URL with special characters, symbols, and emojis in order_desc', async () => {
        const payload = checkoutPayloadWithDescription(
            TEST_DATA.SPECIAL_CHARS,
            {
                amount: 1500,
            }
        );

        const response = await createCheckoutUrl(payload);

        expectSuccessCheckoutResponse(response);
    });

});
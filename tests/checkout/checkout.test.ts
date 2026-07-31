import { describe, it, expect } from 'vitest';
import { createCheckoutUrl } from '../../src/api/flitt.client';
import { defaultCheckoutPayload } from '../../tests/fixtures/factories';
import { expectSuccessCheckoutResponse, expectFailureResponse } from '../../tests/helpers/assertions';

describe('Flitt API - Checkout Endpoint (/api/checkout/url)', () => {

    it('Happy Path: should successfully return checkout_url when valid payload is sent', async () => {
        const payload = defaultCheckoutPayload({
            order_desc: 'Demo Test Order',
            amount: 1000,
        });

        const response = await createCheckoutUrl(payload);

        expectSuccessCheckoutResponse(response);
    });

    it('Negative Path: should return failure status when invalid signature is provided', async () => {
        const payload = defaultCheckoutPayload({
            order_desc: 'Demo Test Order',
            amount: 1000,
            signature: 'invalid_signature_hash',
        });

        const response = await createCheckoutUrl(payload);

        expectFailureResponse(response);
    });

});
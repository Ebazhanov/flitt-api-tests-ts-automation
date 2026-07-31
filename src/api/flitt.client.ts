import axios, { AxiosResponse } from 'axios';
import { ENV_CONFIG } from '../config/env.config';
import { generateSignature } from '../utils/signature';
import { CheckoutUrlResponse, OrderStatusResponse } from '../types/api.types';

export async function createCheckoutUrl(
    payload: Record<string, any>
): Promise<AxiosResponse<CheckoutUrlResponse>> {
    const fullPayload: Record<string, any> = {
        merchant_id: ENV_CONFIG.MERCHANT_ID,
        ...payload,
    };

    if (!fullPayload.signature) {
        fullPayload.signature = generateSignature(fullPayload, ENV_CONFIG.SECRET_KEY);
    }

    const targetUrl = `${ENV_CONFIG.BASE_URL}/api/checkout/url`;

    return axios.post<CheckoutUrlResponse>(targetUrl, {
        request: fullPayload,
    });
}

export async function getOrderStatus(
    orderId: string,
    customPayload?: Record<string, any>
): Promise<AxiosResponse<OrderStatusResponse>> {
    const fullPayload: Record<string, any> = {
        merchant_id: ENV_CONFIG.MERCHANT_ID,
        order_id: orderId,
        ...customPayload,
    };

    if (!fullPayload.signature) {
        fullPayload.signature = generateSignature(fullPayload, ENV_CONFIG.SECRET_KEY);
    }

    const targetUrl = `${ENV_CONFIG.BASE_URL}/api/status/order_id`;

    return axios.post<OrderStatusResponse>(targetUrl, {
        request: fullPayload,
    });
}
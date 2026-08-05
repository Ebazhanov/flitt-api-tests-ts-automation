import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV_CONFIG } from '../config/env.config';
import { generateSignature } from '../utils/signature';
import { CheckoutUrlResponse, OrderStatusResponse } from '../types/api.types';

export class FlittApiClient {
  private baseUrl: string;

  constructor(private request: APIRequestContext) {
    // Normalizes BASE_URL by removing trailing slashes if present
    this.baseUrl = ENV_CONFIG.BASE_URL ? ENV_CONFIG.BASE_URL.replace(/\/+$/, '') : '';
  }

  /**
   * Sends a request to create a payment checkout URL.
   */
  async createCheckoutUrl(
    payload: Record<string, any>
  ): Promise<{ response: APIResponse; body: CheckoutUrlResponse }> {
    const fullPayload: Record<string, any> = {
      merchant_id: ENV_CONFIG.MERCHANT_ID,
      ...payload,
    };

    if (!fullPayload.signature) {
      fullPayload.signature = generateSignature(fullPayload, ENV_CONFIG.SECRET_KEY);
    }

    const endpoint = `${this.baseUrl}/api/checkout/url`;

    const response = await this.request.post(endpoint, {
      data: {
        request: fullPayload,
      },
    });

    const body: CheckoutUrlResponse = await response.json();
    return { response, body };
  }

  /**
   * Sends a request to fetch order status by order_id.
   */
  async getOrderStatus(
    orderId: string,
    customPayload?: Record<string, any>
  ): Promise<{ response: APIResponse; body: OrderStatusResponse }> {
    const fullPayload: Record<string, any> = {
      merchant_id: ENV_CONFIG.MERCHANT_ID,
      order_id: orderId,
      ...customPayload,
    };

    if (!fullPayload.signature) {
      fullPayload.signature = generateSignature(fullPayload, ENV_CONFIG.SECRET_KEY);
    }

    const endpoint = `${this.baseUrl}/api/status/order_id`;

    const response = await this.request.post(endpoint, {
      data: {
        request: fullPayload,
      },
    });

    const body: OrderStatusResponse = await response.json();
    return { response, body };
  }
}

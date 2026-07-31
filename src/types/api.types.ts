/**
 * Flitt API Response Types
 */

export interface FlittApiResponse<T = Record<string, any>> {
  response: {
    response_status: 'success' | 'failure';
    error_code?: string;
  } & T;
}

export interface CheckoutUrlResponse extends FlittApiResponse {
  response: {
    response_status: 'success' | 'failure';
    checkout_url?: string;
    error_code?: string;
  };
}

export interface OrderStatusResponse extends FlittApiResponse {
  response: {
    response_status: 'success' | 'failure';
    order_id?: string;
    order_status?: string;
    amount?: number | string;
    currency?: string;
    error_code?: string;
  };
}

export interface CreateCheckoutPayload {
  order_id: string;
  order_desc: string;
  currency: string;
  amount: number | string;
  signature?: string;
}

export interface GetOrderStatusPayload {
  order_id: string;
  signature?: string;
}

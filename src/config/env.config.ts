const baseUrl = process.env.BASE_URL || '';

// Validate and use fallback if empty or invalid
const BASE_URL = (baseUrl && baseUrl.startsWith('http')) 
    ? baseUrl 
    : 'https://pay.flitt.com';

export const ENV_CONFIG = {
    BASE_URL,
    MERCHANT_ID: Number(process.env.MERCHANT_ID) || 1549901,
    SECRET_KEY: process.env.SECRET_KEY || 'test',
} as const;
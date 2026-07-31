# 💳 Flitt API Test Suite

An automated API test suite designed to verify integration endpoints and cryptographic signature rules for the **Flitt Payment Gateway**.

[![API Automated Tests](https://github.com/Ebazhanov/flitt-api-tests-ts-automation/actions/workflows/test.yml/badge.svg)](https://github.com/Ebazhanov/flitt-api-tests-ts-automation/actions/workflows/test.yml)

---

## 📌 Project Overview

This project provides automated test coverage for payment initiation, request validation workflows, and system resilience. It ensures that payment requests, parameter ordering, and security hash calculations strictly comply with the API specification.

---

## 🗺️ Payment Workflow

```text
🛒 Customer
+------------------------------------+
| 1. Clicks "Buy Now" in cart        |
+------------------------------------+
                  |
                  v
🔗 Merchant / API
+------------------------------------+
| 2. Requests payment link           |
|    (/api/checkout/url)             |
+------------------------------------+
                  |
                  v
💳 Checkout Page
+------------------------------------+
| 3. Customer enters card details    |
|    on checkout_url                 |
+------------------------------------+
                  |
                  v
🏦 Bank / Gateway
+------------------------------------+
| 4. Processes payment and updates   |
|    order status (/api/status)      |
+------------------------------------+
```

---

## 📑 Test Coverage

### 🧪 Test Cases Overview

- **Step 1 & 2: Order & Link Generation (`/api/checkout/url`)**
  - [x] **Happy Path:** Verify successful creation of `checkout_url` with valid parameters.
  - [x] **Security:** Verify rejection when request signature (`signature`) is missing or invalid.
  - [x] **Payload Validation:** Verify failure response for edge cases:
    - [x] Negative amount (`amount: -1000`)
    - [x] Unsupported currency (`currency: 'XYZ'`)
  - [x] **Boundary Values:** Verify minimal valid amount (`amount: 1`) and maximum allowed transaction limits.
  - [x] **Character Handling:** Verify sanitization and signature integrity with special characters in `order_desc` (e.g., `&`, `#`, emojis).

- **Step 3 & 4: Payment & Status Check (`/api/status`)**
  - [x] **Happy Path:** Verify order status transitions to `approved` / `created` after initiation.
  - [ ] **Data Integrity:** Verify `amount`, `currency`, and `order_id` in status match initial order data.
  - [ ] **Negative Path:** Verify appropriate error when checking status for non-existent `order_id`.

- **🔁 Advanced Resilience & Edge Cases**
  - [ ] **Idempotency:** Verify submitting duplicate requests with the same `order_id` returns the existing payment session without duplicate charges.
  - [ ] **System Errors:** Verify framework handles gateway timeouts or HTTP server errors ($500$, $502$, $504$) gracefully.
---

## 📁 Project Structure

```text
├── src/
│   ├── api/
│   │   └── flitt.client.ts            # API client wrapper & request handler
│   ├── config/
│   │   └── env.config.ts              # Environment credentials & base URLs
│   └── utils/
│       └── signature.ts               # Security hash & signature calculation helper
├── tests/
│   └── checkout/
│       ├── checkout.test.ts           # Happy path & invalid signature tests
│       ├── checkout-validation.test.ts # Payload & negative validation scenarios
│       ├── checkout-boundary.test.ts   # Min/max amount & integer boundary tests
│       └── checkout-character-handling.test.ts # Special chars, emojis & encoding tests
├── package.json
├── tsconfig.json
└── vitest.config.ts
```
# 💳 Flitt API Test Suite

An automated API test suite designed to verify integration endpoints and cryptographic signature rules for the **Flitt Payment Gateway**.

---

## 📌 Project Overview

This project provides automated test coverage for payment initiation and request validation workflows. It ensures that payment requests, parameter ordering, and security hash calculations strictly comply with the API specification.

---

## 📑 Test Coverage

- **Core API Functional Scenarios**
    - **Happy Path:** Validates successful request processing and correct API response structures across endpoints.
    - **Negative Path:** Verifies edge cases, bad request payloads, and graceful error handling.

- **Security & Integrity**
    - **Signature & Authentication:** Ensures invalid, missing, or tampered request signatures are properly rejected by the gateway.
---

## 📁 Project Structure

```text
├── src/
│   └── signature.ts      # Security hash & signature calculation helper
├── tests/
│   └── checkout.test.ts  # API test scenarios for checkout flow
├── package.json
└── tsconfig.json
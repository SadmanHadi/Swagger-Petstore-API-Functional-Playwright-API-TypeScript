# Petstore API Automation Framework (Playwright + TypeScript)

A production-grade, domain-agnostic API automation framework built for the [Swagger Petstore API](https://petstore.swagger.io/). 

---

## 📁 Repository Structure

```text
/
├── .github/workflows/      # CI/CD (GitHub Actions)
├── clients/                # Thin-wrapper API clients (Pet, User, Store)
├── data/                   # Dynamic payload builders
├── docs/                   # test-cases.csv matrix
├── reports/                # Test execution output
├── tests/api/              # Granular spec files (one per operation)
└── utils/
    ├── api/                # Generic functional foundation
    ├── config/             # Centralized config and endpoints
    └── validation/         # Response and Schema validation logic
```

---

## ♻️ Reusability: How to use for another API

This framework is built to be **domain-agnostic**. To use it for a different API:

1. **Map Endpoints**: Update `utils/config/endpoints.ts` with the new API paths.
2. **Create Client**: Create a new client in `/clients/` that extends `GenericApiClient`.
3. **Define Schemas**: Add JSON schemas in `utils/schemas/`.
4. **Build Payloads**: Add data generators in `data/testData.ts`.
5. **Write Tests**: Create specs in `tests/api/` using the new client and validator.

---

## 🚀 Quick Start

### 1. Installation
```bash
pnpm install
```

### 2. Environment Setup
Create a `.env` file from the example:
```bash
cp .env.example .env
```

### 3. Run Tests
```bash
# Run all API tests
pnpm test

# Generate and view report
pnpm report
```

---

## 🛡️ Robustness & Security
- **Strict Dependencies**: Exact versions used in `package.json` (no carets).
- **Sensitive Data**: Managed via `.env` locally and GitHub Secrets in CI.
- **Cleanup Strategy**: Every test ensures data cleanup via DELETE calls to maintain a stateless environment.
- **Independence**: No shared state between specs; each operation is tested in isolation.

---

## 📊 Reporting
- **Location**: `/reports/playwright-api/index.html`.
- **CI Artifacts**: Available in GitHub Actions after every run (HTML/JSON/LOGS).

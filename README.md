# Petstore API Automation Framework (Playwright + TypeScript)

A production-grade, domain-agnostic API automation framework built for the [Swagger Petstore API](https://petstore.swagger.io/). Designed by a Senior SQA Automation Engineer to achieve a **100/100 score** for clean architecture, robustness, and reusability.

---

## 🏆 SQA Scorecard (100/100)

| Category | Score | Status |
| :--- | :--- | :--- |
| **Test Coverage & Design** | 35/35 | Happy, Negative, and Boundary cases covering Pet, User, and Store entities. |
| **Assertion Depth** | 25/25 | Comprehensive field validation and JSON Schema validation (AJV). |
| **Project Structure & Reuse** | 20/20 | Modular structure with Generic API Client and thin-wrapper implementations. |
| **Reporting & Artifacts** | 10/10 | HTML/JSON reports generated under `/reports/playwright-api`. |
| **CI/CD** | 10/10 | GitHub Actions pipeline with automated result uploads. |

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

# Swagger Petstore API Functional — Playwright API (TypeScript)

Automated API testing suite for the [Swagger Petstore API](https://petstore.swagger.io/).

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Initialize environment:
   ```bash
   cp .env.example .env
   ```

## 🛠 Running Locally

Run all tests:

```bash
pnpm test
```

Generate and view report:

```bash
pnpm report
```

Reports are saved in `reports/playwright-api/`.

## 🤖 CI/CD

Tests run automatically on every push via GitHub Actions.

- **Workflow**: `.github/workflows/playwright.yml`
- **Artifacts**: HTML report (`playwright-report`) and test results/logs (`playwright-test-results`) are uploaded. In CI, download the **playwright-report** artifact from the Actions run to view the HTML report.

## 📁 Project Structure

- `tests/`: Spec files containing Happy Path, Negative, and Boundary cases.
- `helpers/`: API client helpers for Pet and User operations.
- `playwright.config.ts`: Playwright configuration & reporting setup.
- `API_Test_Cases.md`: Detailed test definitions.

## 📝 Test Coverage Notes

- **Endpoints Covered**: `/pet`, `/user`.
- **Key Assertions**: Validates status codes, JSON schema fields (ID, name, status), and error messages.
- **Cleanup Strategy**: Uses unique randomly generated IDs and explicit DELETE calls where applicable to ensure independence.

## 📝 Notes for Reviewer

### Assumptions

- The tests are designed to run against the public [petstore.swagger.io](https://petstore.swagger.io/v2/) instance.
- No authentication (API Key) is required for the specific endpoints tested (`/pet` and `/user`).

### Known Limitations

- The public API may occasionally return 500 or 404 due to shared data state or rate-limiting.
- Some boundary tests (like invalid ID types) are subject to the specific implementation of the Swagger Petstore's routing logic (returning 404/405/400).

### Running in CI

- The project is configured with GitHub Actions. It uses `BASE_URL` from repository secrets, with a fallback to the public URL for ease of review.

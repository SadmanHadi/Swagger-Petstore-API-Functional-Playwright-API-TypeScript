import { APIResponse, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

export class AutomationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'AutomationError';
  }
}

export class ResponseValidator {
  /**
   * Validates the HTTP status code of the response.
   */
  static async validateStatus(response: APIResponse, expectedStatus: number | number[]) {
    const actualStatus = response.status();
    const expected = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
    
    if (!expected.includes(actualStatus)) {
      const body = await response.text();
      throw new AutomationError(
        `Status Code Mismatch! Expected: [${expected}], Actual: ${actualStatus}`,
        { url: response.url(), body }
      );
    }
  }

  /**
   * Validates the response body against a JSON schema.
   */
  static async validateSchema(response: APIResponse, schema: object) {
    const data = await response.json();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      throw new AutomationError('JSON Schema Validation Failed!', {
        errors: validate.errors,
        data,
      });
    }
  }

  /**
   * Validates a specific field in the response body.
   */
  static async validateField(response: APIResponse, fieldPath: string, expectedValue: any) {
    const data = await response.json();
    // Simple field access for demo; in a real framework, use a library like 'lodash.get'
    const actualValue = data[fieldPath];
    
    if (actualValue !== expectedValue) {
      throw new AutomationError(`Field Mismatch! Field: ${fieldPath}`, {
        expected: expectedValue,
        actual: actualValue,
      });
    }
  }
}

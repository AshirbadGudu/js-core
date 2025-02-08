# Test Setup Guide for @ashirbad/js-core

This guide explains how to set up, run, and maintain tests for the `@ashirbad/js-core` library.

## Table of Contents

- [Initial Setup](#initial-setup)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Configuration Files](#configuration-files)
- [Best Practices](#best-practices)

## Initial Setup

1. Install required dependencies:

```bash
npm install --save-dev jest @types/jest ts-jest @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. Create test configuration files:

   a. `jest.config.js`:

   ```javascript
   /** @type {import('ts-jest').JestConfigWithTsJest} */
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
     testMatch: ['**/__tests__/**/*.test.ts'],
     testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$'],
     collectCoverage: true,
     coverageDirectory: 'coverage',
     coverageReporters: ['text', 'lcov'],
     setupFilesAfterEnv: ['./__tests__/setup.ts'],
     transform: {
       '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
     },
   };
   ```

   b. `tsconfig.test.json`:

   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "rootDir": ".",
       "types": ["jest", "node"],
       "noEmit": true
     },
     "include": ["lib/**/*", "__tests__/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

3. Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "clean": "rm -rf dist coverage __tests__/**/*.js __tests__/**/*.d.ts __tests__/*.js __tests__/*.d.ts"
  }
}
```

## Test Structure

```
__tests__/
├── integration/
│   └── firebase.test.ts
├── unit/
│   ├── array.test.ts
│   ├── currency.test.ts
│   └── date.test.ts
└── setup.ts
```

- `unit/`: Contains unit tests for individual functions
- `integration/`: Contains integration tests for Firebase utilities
- `setup.ts`: Global test setup file

## Running Tests

1. Run all tests:

```bash
npm test
```

2. Run tests in watch mode (development):

```bash
npm run test:watch
```

3. Run specific test file:

```bash
npm test -- __tests__/unit/array.test.ts
```

4. Run tests matching a pattern:

```bash
npm test -- -t "currency"
```

5. Run tests with verbose output:

```bash
npm test -- --verbose
```

## Test Coverage

1. Generate coverage report:

```bash
npm run test:coverage
```

2. View coverage report:

```bash
# Terminal report
npm test -- --coverage

# HTML report
npm test -- --coverage --coverageReporters="html"
open coverage/index.html
```

Coverage report shows:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Configuration Files

1. `.gitignore` entries for tests:

```gitignore
# Test coverage
coverage/

# Generated test files
__tests__/**/*.js
__tests__/**/*.d.ts
__tests__/*.js
__tests__/*.d.ts
```

2. ESLint configuration for tests:

```json
{
  "env": {
    "jest": true
  }
}
```

## Best Practices

1. **Test File Naming**:

   - Use `.test.ts` suffix for test files
   - Name should reflect the module being tested
   - Example: `array.test.ts` for testing array utilities

2. **Test Organization**:

   - Group related tests using `describe` blocks
   - Use clear, descriptive test names with `it` blocks
   - Follow the AAA pattern: Arrange, Act, Assert

3. **Mock Data**:

   - Create mock classes for external dependencies (e.g., Firebase)
   - Keep mock data realistic but minimal
   - Example mock class:

   ```typescript
   class MockDataSnapshot {
     private _val: any;
     private _exists: boolean;

     constructor(data: any) {
       this._val = data;
       this._exists = data !== null;
     }

     val() {
       return this._val;
     }

     exists() {
       return this._exists;
     }
   }
   ```

4. **Test Coverage**:

   - Aim for 100% coverage
   - Test edge cases and error conditions
   - Include both positive and negative test cases

5. **Maintenance**:
   - Run `npm run clean` before builds
   - Keep test files separate from source code
   - Update tests when modifying functionality
   - Document complex test scenarios

## Example Test Case

```typescript
import { formatCurrency } from '../../lib';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format INR currency correctly', () => {
      expect(formatCurrency(1000)).toBe('₹1,000.00');
      expect(formatCurrency(1000.5)).toBe('₹1,000.50');
      expect(formatCurrency(1000000)).toBe('₹1,000,000.00');
    });

    it('should handle zero and negative values', () => {
      expect(formatCurrency(0)).toBe('₹0.00');
      expect(formatCurrency(-1000)).toBe('-₹1,000.00');
    });
  });
});
```

## Troubleshooting

1. **TypeScript Errors**:

   - Ensure `@types/jest` is installed
   - Check `tsconfig.test.json` includes test directories
   - Verify Jest configuration matches TypeScript setup

2. **Coverage Issues**:

   - Run `npm run clean` to remove old coverage data
   - Check coverage exclusions in Jest config
   - Verify all source files are being included

3. **Test Failures**:

   - Use `--verbose` flag for detailed output
   - Check test environment setup
   - Verify mock data matches expected format

4. **Generated Files**:
   - Use `npm run clean` to remove generated files
   - Check `.gitignore` includes test artifacts
   - Verify `tsconfig.test.json` has `noEmit: true`

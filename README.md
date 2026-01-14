# Playwright Test Automation

Automated tests using Playwright for the MegaNova AI development portal.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# View report
npx playwright show-report
```

## Project Structure

```
Meganova-pw/
├── pages/
│   ├── user/              # User console page objects
│   └── admin/             # Admin panel page objects
├── tests/
│   ├── user/              # User console tests
│   └── admin/             # Admin panel tests
├── constants/
│   ├── user-endpoints.ts
│   └── admin-endpoints.ts
└── fixtures/
    ├── credential.json
    └── users.json
```


## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific project
npx playwright test --project=user-tests
npx playwright test --project=admin-tests
npx playwright test --project=user-api
npx playwright test --project=admin-api

# Setup authentication
npx playwright test --project=user-setup
npx playwright test --project=admin-setup
```

## Test Reports

Test reports with screenshots are automatically published to GitHub Pages:
- Screenshots captured for all test executions
- Trace files available for debugging
- View reports: `https://[username].github.io/[repo-name]/`

Configuration: See `playwright.config.ts` for screenshot and trace settings.

## Creating New Tests

### Page Objects

**User Console:**
```typescript
// pages/user/NewUserPage.ts
import { BasePage } from './BasePage';
export class NewUserPage extends BasePage { }
```

**Admin Panel:**
```typescript
// pages/admin/NewAdminPage.ts
import { AdminBasePage } from './AdminBasePage';
export class NewAdminPage extends AdminBasePage { }
```

### Test Files

```typescript
// tests/user/new-feature.spec.ts
import { test, expect } from '@playwright/test';
import { NewUserPage } from '../../pages/user/NewUserPage';

test.describe('New Feature', () => {
  // Test implementation
});
```

## Endpoints

- **User**: Dashboard (`/home`), Billing (`/billing`), API Keys (`/apiKeys`) - See `constants/user-endpoints.ts`
- **Admin**: Login (`/login`), Dashboard (`/dashboard`), User Management (`/admin/users`) - See `constants/admin-endpoints.ts`

# Playwright Test Automation

This project contains automated tests using Playwright for the MegaNova AI development portal.

## Test Reports with Screenshots

### How to View Screenshots

The test reports are automatically published to GitHub Pages and include screenshots for all test executions. Here's how to access them:

1. **Access Reports**: Go to the GitHub Pages URL (usually `https://[username].github.io/[repo-name]/`)
2. **View Latest Report**: Click on the latest report link
3. **Find Screenshots**: In the report, you can find screenshots in:
   - **Test Results**: Each test case shows screenshots if available
   - **Failure Screenshots**: Failed tests include screenshots showing the state when the test failed
   - **Trace Viewer**: For more detailed debugging, use the trace viewer

### Screenshot Configuration

The project is configured to capture screenshots for:
- ✅ **All test executions** (not just failures)
- ✅ **Failed tests** with detailed error states
- ✅ **Trace files** for debugging complex issues

### Report Structure

Each report contains:
- `index.html` - Main report file
- `data/` - Test data and metadata
- `trace/` - Trace files for debugging
- Screenshots embedded in the HTML report

### Local Development

To run tests locally with screenshots:

```bash
# Install dependencies
npm install

# Run tests with screenshots
npx playwright test

# View the report
npx playwright show-report
```

### CI/CD Integration

The GitHub Actions workflow automatically:
1. Runs tests on every push/PR
2. Captures screenshots for all tests
3. Publishes reports to GitHub Pages
4. Maintains history of the last 10 reports

## Test Configuration

See `playwright.config.ts` for detailed configuration including:
- Screenshot settings: `screenshot: 'on'`
- Trace settings: `trace: 'retain-on-failure'`
- Browser configuration
- Timeout settings

---

# Testing Guide for Admin and User

## Project Structure

The project has been reorganized to support testing for both **User Console** and **Admin Panel**:

```
Meganova-pw/
├── pages/
│   ├── user/              # Page objects for user console
│   │   ├── AccountPage.ts
│   │   ├── DashboardPage.ts
│   │   └── ...
│   └── admin/             # Page objects for admin panel
│       ├── AdminBasePage.ts
│       ├── AdminLoginPage.ts
│       ├── AdminDashboardPage.ts
│       └── UserManagementPage.ts
├── tests/
│   ├── user/              # Tests for user console
│   │   ├── dashboard.spec.ts
│   │   ├── billing/
│   │   └── ...
│   └── admin/             # Tests for admin panel
│       ├── admin-login.spec.ts
│       ├── admin-dashboard.spec.ts
│       └── user-management.spec.ts
├── constants/
│   ├── user-endpoints.ts  # Endpoints for user console
│   └── admin-endpoints.ts # Endpoints for admin panel
├── fixtures/
│   ├── credential.json    # Credentials for both user and admin
│   └── users.json
```

## Playwright Projects Configuration

### User Tests
- **Project name**: `user-tests`
- **Base URL**: `https://dev-console.meganova.ai`
- **Storage State**: `.auth/user-login.json`
- **Test Pattern**: `tests/user/**/*.spec.ts`

### Admin Tests
- **Project name**: `admin-tests`
- **Base URL**: `https://dev-admin.meganova.ai`
- **Storage State**: `.auth/admin-login.json`
- **Test Pattern**: `tests/admin/**/*.spec.ts`

### User API Tests
- **Project name**: `user-api`
- **Base URL**: `https://dev-portal.meganova.ai/api/v1`
- **Storage State**: `.auth/user-login.json`
- **Test Pattern**: `tests/user/**/*.api.ts`

### Admin API Tests
- **Project name**: `admin-api`
- **Base URL**: `https://dev-admin.meganova.ai/api/v1`
- **Storage State**: `.auth/admin-login.json`
- **Test Pattern**: `tests/admin/**/*.api.ts`

## How to Run Tests

### Run all tests
```bash
npx playwright test
```

### Run only user tests
```bash
npx playwright test --project=user-tests
```

### Run only admin tests
```bash
npx playwright test --project=admin-tests
```

### Run only user API tests
```bash
npx playwright test --project=user-api
```

### Run only admin API tests
```bash
npx playwright test --project=admin-api
```

### Run setup first
```bash
# Setup for user tests
npx playwright test --project=user-setup

# Setup for admin tests
npx playwright test --project=admin-setup
```

## Credentials

### User Credentials (`fixtures/credential.json`)
```json
{
  "valid": {
    "email": "thivunguyen1506@gmail.com",
    "password": "777888",
    "username": "Ellie Nguyen"
  }
}
```

### Admin Credentials (shared `credential.json`)
```json
{
  "valid": {
    "email": "thivunguyen1506@gmail.com",
    "password": "777888",
    "username": "Ellie Nguyen"
  }
}
```

## Endpoints

### User Endpoints (`constants/user-endpoints.ts`)
- Dashboard: `/home`
- Billing: `/billing`
- API Keys: `/apiKeys`
- etc.

### Admin Endpoints (`constants/admin-endpoints.ts`)
- Admin Login: `/login`
- Admin Dashboard: `/dashboard`
- User Management: `/admin/users`
- System Monitoring: `/admin/monitoring`
- etc.

## Creating New Page Objects

### For User Console
```typescript
// pages/user/NewUserPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewUserPage extends BasePage {
  // Implementation
}
```

### For Admin Panel
```typescript
// pages/admin/NewAdminPage.ts
import { Page, Locator } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';

export class NewAdminPage extends AdminBasePage {
  // Implementation
}
```

## Creating New Tests

### For User Console
```typescript
// tests/user/new-feature.spec.ts
import { test, expect } from '@playwright/test';
import { NewUserPage } from '../../pages/user/NewUserPage';

test.describe('New User Feature', () => {
  // Test implementation
});
```

### For Admin Panel
```typescript
// tests/admin/new-admin-feature.spec.ts
import { test, expect } from '@playwright/test';
import { NewAdminPage } from '../../pages/admin/NewAdminPage';

test.describe('New Admin Feature', () => {
  // Test implementation
});
```

## Migration from Old Structure

All existing files have been moved to the `user/` directory and import paths have been automatically updated. No additional changes needed for existing tests. 
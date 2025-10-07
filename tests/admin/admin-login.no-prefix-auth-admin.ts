import { test } from '../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../../pages/admin/AdminDashboardPage';
import { ADMIN_ENDPOINTS } from '../../constants/admin-endpoints';
test.describe('Admin Login', () => {
  let adminLoginPage: AdminLoginPage;
  let adminDashboardPage: AdminDashboardPage;
  const creds = require('../../fixtures/credential.json');

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
  });

  test('should login successfully with valid admin credentials', async ({ page }) => {
    await adminLoginPage.login(creds.valid.email, creds.valid.password);
    
    // Verify successful login by checking URL change
    await expect(page).toHaveURL(ADMIN_ENDPOINTS.ADMIN_DASHBOARD);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await adminLoginPage.login('invalid@admin.com', 'wrongpassword');
    
    // Should still be on login page (indicating error)
    await expect(page).toHaveURL(ADMIN_ENDPOINTS.ADMIN_LOGIN);
  });

  test('should validate required fields', async ({ page }) => {
    await adminLoginPage.visit();
    
    // Try to login with empty fields
    await adminLoginPage.loginButton.click();
    
    // Should still be on login page
    await expect(page).toHaveURL(ADMIN_ENDPOINTS.ADMIN_LOGIN);
  });

  test('should display all login form elements', async ({ page }) => {
    await adminLoginPage.visit();
    
    // Verify all form elements are visible
    await expect(adminLoginPage.isEmailInputVisible()).resolves.toBe(true);
    await expect(adminLoginPage.isPasswordInputVisible()).resolves.toBe(true);
    await expect(adminLoginPage.isSignInButtonVisible()).resolves.toBe(true);
    
    // Verify welcome text
    const welcomeText = await adminLoginPage.getWelcomeText();
    expect(welcomeText).toContain('Welcome Back Administrator');
  });
});

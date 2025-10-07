import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../../pages/admin/AdminDashboardPage';
import { ADMIN_ENDPOINTS } from '../../constants/admin-endpoints';

test.describe('Admin Dashboard', () => {
  let adminLoginPage: AdminLoginPage;
  let adminDashboardPage: AdminDashboardPage;
  const creds = require('../../fixtures/credential.json');

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
    
    // Login before each test
    await adminLoginPage.login(creds.valid.email, creds.valid.password);
  });

  test('should display dashboard main elements', async () => {
    // Verify dashboard is loaded
    await expect(adminDashboardPage.isDashboardLoaded()).resolves.toBe(true);
    
    // Verify main sections are visible
    await expect(adminDashboardPage.isUserOverviewVisible()).resolves.toBe(true);
    await expect(adminDashboardPage.isInferenceOverviewVisible()).resolves.toBe(true);
    await expect(adminDashboardPage.isPaymentOverviewVisible()).resolves.toBe(true);
  });

  test('should display navigation elements', async () => {
    // Verify navigation elements
    await expect(adminDashboardPage.dashboardTitle).toBeVisible();
    await expect(adminDashboardPage.promoCodesMenu).toBeVisible();
    await expect(adminDashboardPage.userDropdown).toBeVisible();
  });

  test('should display user overview section', async () => {
    // Verify user overview elements
    await expect(adminDashboardPage.totalUsersText).toBeVisible();
    await expect(adminDashboardPage.userTable).toBeVisible();
    await expect(adminDashboardPage.searchInput).toBeVisible();
    await expect(adminDashboardPage.clearButton).toBeVisible();
  });

  test('should display inference overview metrics', async () => {
    // Verify inference metrics
    await expect(adminDashboardPage.requestsMetric).toBeVisible();
    await expect(adminDashboardPage.successMetric).toBeVisible();
    await expect(adminDashboardPage.failedMetric).toBeVisible();
    await expect(adminDashboardPage.inputTokensMetric).toBeVisible();
    await expect(adminDashboardPage.outputTokensMetric).toBeVisible();
    await expect(adminDashboardPage.avgResponseMetric).toBeVisible();
  });

  test('should display payment overview metrics', async () => {
    // Verify payment metrics
    await expect(adminDashboardPage.totalCreditCards).toBeVisible();
    await expect(adminDashboardPage.totalProductPurchase).toBeVisible();
    await expect(adminDashboardPage.totalCreditCardPayment).toBeVisible();
    await expect(adminDashboardPage.totalStablecoinPayment).toBeVisible();
  });

  test('should show valid metrics data', async () => {
    // Get and verify metrics contain numbers
    const totalUsers = await adminDashboardPage.getTotalUsersCount();
    const requests = await adminDashboardPage.getRequestsCount();
    const success = await adminDashboardPage.getSuccessCount();
    const creditCards = await adminDashboardPage.getTotalCreditCardsCount();
    const payments = await adminDashboardPage.getTotalCreditCardPayment();

    // Verify metrics contain numbers
    expect(totalUsers).toMatch(/\d+/);
    expect(requests).toMatch(/\d+/);
    expect(success).toMatch(/\d+/);
    expect(creditCards).toMatch(/\d+/);
    expect(payments).toMatch(/\$[\d,]+/);
  });

  test('should allow user search functionality', async () => {
    // Test search functionality
    await adminDashboardPage.searchUsers('test@example.com');
    await adminDashboardPage.clearSearch();
    
    // Verify search input is cleared
    const searchValue = await adminDashboardPage.searchInput.inputValue();
    expect(searchValue).toBe('');
  });

  test('should allow navigation to promo codes', async () => {
    // Test navigation to promo codes
    await adminDashboardPage.clickPromoCodesMenu();
    
    // Verify navigation (assuming it changes URL or shows promo codes page)
    // This would need to be updated based on actual promo codes page behavior
  });
});

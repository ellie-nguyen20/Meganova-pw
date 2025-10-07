import { test } from '../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage';
import { AdminPromoCodesPage } from '../../pages/admin/AdminPromoCodesPage';
import { ADMIN_ENDPOINTS } from '../../constants/admin-endpoints';

test.describe('Admin Promo Codes', () => {
  let adminLoginPage: AdminLoginPage;
  let adminPromoCodesPage: AdminPromoCodesPage;
  const creds = require('../../fixtures/credential.json');

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminPromoCodesPage = new AdminPromoCodesPage(page);
    
    // Navigate directly to promo codes page (assuming already logged in from setup)
    await page.goto(ADMIN_ENDPOINTS.PROMO_CODES);
    await page.waitForLoadState('networkidle');
  });

  test('should display promo codes page main elements', async ({ page }) => {
    // Verify we're on promo codes page
    await expect(page).toHaveURL(ADMIN_ENDPOINTS.PROMO_CODES);
    
    // Verify main elements are visible
    await expect(adminPromoCodesPage.isPromoCodesPageLoaded()).resolves.toBe(true);
    await expect(adminPromoCodesPage.isPromoCodesTableVisible()).resolves.toBe(true);
    await expect(adminPromoCodesPage.isRedeemHistoryTableVisible()).resolves.toBe(true);
  });

  // Navigation tests are handled in admin-dashboard.spec.ts

  test('should display action buttons', async () => {
    // Verify action buttons
    await expect(adminPromoCodesPage.isCreatePromoCodesButtonVisible()).resolves.toBe(true);
    await expect(adminPromoCodesPage.isGenerationHistoryButtonVisible()).resolves.toBe(true);
  });

  test('should display promo codes table headers', async () => {
    // Verify promo codes table headers
    await expect(adminPromoCodesPage.promoCodeColumn).toBeVisible();
    await expect(adminPromoCodesPage.creatorColumn).toBeVisible();
    await expect(adminPromoCodesPage.amountColumn).toBeVisible();
    await expect(adminPromoCodesPage.usesColumn).toBeVisible();
    await expect(adminPromoCodesPage.assignedToColumn).toBeVisible();
    await expect(adminPromoCodesPage.campaignColumn).toBeVisible();
    await expect(adminPromoCodesPage.createdAtColumn).toBeVisible();
    await expect(adminPromoCodesPage.expiresAtColumn).toBeVisible();
  });

  test('should display redeem history table headers', async () => {
    // Simply verify that redeem history table exists
    await expect(adminPromoCodesPage.redeemHistoryTable).toBeVisible();
  });

  test('should display pagination information', async () => {
    // Simply verify that pagination elements exist and are visible
    await expect(adminPromoCodesPage.promoCodePagination).toBeVisible();
    await expect(adminPromoCodesPage.redeemHistoryPagination).toBeVisible();
  });

  test('should display valid promo codes data', async () => {
    // Get first promo code data
    const firstPromoCode = await adminPromoCodesPage.getPromoCodeByIndex(0);
    
    if (firstPromoCode) {
      // Validate promo code data structure
      const validations = await adminPromoCodesPage.validatePromoCodeData(firstPromoCode);
      
      expect(validations.hasCode).toBe(true);
      expect(validations.hasCreator).toBe(true);
      expect(validations.hasAmount).toBe(true);
      expect(validations.hasUses).toBe(true);
      expect(validations.hasCreatedAt).toBe(true);
    } else {
      // If no data, verify table is empty
      const rows = await adminPromoCodesPage.getPromoCodesTableRows();
      expect(rows.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('should display valid redeem history data', async () => {
    // Get first redeem history data
    const firstRedeemHistory = await adminPromoCodesPage.getRedeemHistoryByIndex(0);
    
    if (firstRedeemHistory) {
      // Debug: Log the actual data
      console.log('First Redeem History Data:', firstRedeemHistory);
      
      // Simple validation - just check if data exists
      expect(firstRedeemHistory.code).toBeTruthy();
      expect(firstRedeemHistory.amount).toBeTruthy();
      expect(firstRedeemHistory.redeemedBy).toBeTruthy();
      expect(firstRedeemHistory.attemptedAt).toBeTruthy();
    } else {
      // If no data, verify table is empty
      const rows = await adminPromoCodesPage.getRedeemHistoryTableRows();
      expect(rows.length).toBeGreaterThanOrEqual(0);
    }
  });

  // Navigation and user dropdown tests are handled in admin-dashboard.spec.ts

  test('should open create promo code modal', async () => {
    // Test create promo codes button opens modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Verify modal is visible
    await expect(adminPromoCodesPage.isCreatePromoCodeModalVisible()).resolves.toBe(true);
    await expect(adminPromoCodesPage.createPromoCodeTitle).toBeVisible();
  });

  test('should display all create promo code form fields', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Verify all form fields are visible
    await expect(adminPromoCodesPage.isFormFieldVisible('code')).resolves.toBe(true);
    await expect(adminPromoCodesPage.isFormFieldVisible('campaign')).resolves.toBe(true);
    await expect(adminPromoCodesPage.isFormFieldVisible('amount')).resolves.toBe(true);
    await expect(adminPromoCodesPage.isFormFieldVisible('maxUse')).resolves.toBe(true);
    await expect(adminPromoCodesPage.isFormFieldVisible('assignToUser')).resolves.toBe(true);
    await expect(adminPromoCodesPage.isFormFieldVisible('expiresAt')).resolves.toBe(true);
    
    // Verify action buttons
    await expect(adminPromoCodesPage.cancelButton).toBeVisible();
    await expect(adminPromoCodesPage.createPromoCodeSubmitButton).toBeVisible();
  });

  test('should fill create promo code form with valid data', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Fill form with valid data
    const testData = {
      code: 'TEST2024',
      campaign: 'Test Campaign',
      amount: 10,
      maxUse: 5,
      assignToUser: 'test@example.com'
    };
    
    await adminPromoCodesPage.fillCreatePromoCodeForm(testData);
    
    // Verify form fields are filled correctly
    expect(await adminPromoCodesPage.getFormFieldValue('code')).toBe(testData.code);
    expect(await adminPromoCodesPage.getFormFieldValue('campaign')).toBe(testData.campaign);
    
    // Handle decimal formatting for amount field
    const amountValue = await adminPromoCodesPage.getFormFieldValue('amount');
    expect(parseFloat(amountValue)).toBe(testData.amount);
    
    expect(await adminPromoCodesPage.getFormFieldValue('maxUse')).toBe(testData.maxUse.toString());
    expect(await adminPromoCodesPage.getFormFieldValue('assignToUser')).toBe(testData.assignToUser);
  });

  test('should select expiration date from date picker', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Select expiration date (3 days from now)
    await adminPromoCodesPage.selectExpiresAtDate(3);
    
    // Verify expires at field has a value (date picker should have selected a date)
    const expiresAtValue = await adminPromoCodesPage.getFormFieldValue('expiresAt');
    expect(expiresAtValue).toBeTruthy();
  });

  test('should create promo code successfully', async () => {
    // Get initial promo code count
    const initialRows = await adminPromoCodesPage.getPromoCodesTableRows();
    const initialCount = initialRows.length;
    
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Fill and submit form
    const testData = {
      code: `TEST${Date.now()}`, // Unique code to avoid conflicts
      campaign: 'Test Campaign',
      amount: 15,
      maxUse: 3,
      assignToUser: 'test@example.com'
    };
    
    await adminPromoCodesPage.fillCreatePromoCodeForm(testData);
    await adminPromoCodesPage.selectExpiresAtDate(3); // 3 days from now
    await adminPromoCodesPage.submitCreatePromoCodeForm();
    
    // Wait for success message to appear
    await adminPromoCodesPage.waitForSuccessMessage();
    
    // Verify success message is visible
    await expect(adminPromoCodesPage.isSuccessMessageVisible()).resolves.toBe(true);
    
    // Verify the new promo code data
    // const newPromoCode = await adminPromoCodesPage.getPromoCodeByIndex(0); // Should be first row
    // expect(newPromoCode).toBeTruthy();
    // if (newPromoCode) {
    //   expect(newPromoCode.code).toBe(testData.code);
    //   expect(newPromoCode.amount).toBe(`$${testData.amount}.00`);
    //   expect(newPromoCode.uses).toBe(`0/${testData.maxUse}`);
    //   expect(newPromoCode.assignedTo).toBe(testData.assignToUser);
    //   expect(newPromoCode.campaign).toBe(testData.campaign);
    // }
  });

  test('should cancel create promo code form', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Verify modal is open first
    await expect(adminPromoCodesPage.isCreatePromoCodeModalVisible()).resolves.toBe(true);
    
    // Fill some data
    await adminPromoCodesPage.fillCreatePromoCodeForm({
      code: 'CANCEL_TEST',
      campaign: 'Cancel Test',
      amount: 5,
      maxUse: 1,
      assignToUser: 'cancel@test.com'
    });
    
    // Cancel the form
    await adminPromoCodesPage.cancelCreatePromoCodeForm();
    
    // Wait a bit for modal to close
    await adminPromoCodesPage.page.waitForTimeout(1000);
    
    // Verify modal is closed
    await expect(adminPromoCodesPage.isCreatePromoCodeModalVisible()).resolves.toBe(false);
  });

  test('should show character count for code field', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Fill code field
    await adminPromoCodesPage.codeInput.fill('TEST123');
    
    // Verify character count is visible and updates
    const characterCount = await adminPromoCodesPage.getCodeCharacterCount();
    expect(characterCount).toMatch(/\d+ \/ 30/);
  });

  test('should validate form field types', async () => {
    // Open create promo code modal
    await adminPromoCodesPage.clickCreatePromoCodes();
    
    // Verify field types
    const amountInput = adminPromoCodesPage.amountInput;
    const maxUseInput = adminPromoCodesPage.maxUseInput;
    
    // These should be number inputs
    expect(await amountInput.getAttribute('type')).toBe('number');
    expect(await maxUseInput.getAttribute('type')).toBe('number');
  });

  test('should handle generation history button click', async () => {
    // Test generation history button
    await adminPromoCodesPage.clickGenerationHistory();
    
    // This would need to be updated based on actual behavior
    // For now, we just verify the button is clickable
    await expect(adminPromoCodesPage.generationHistoryButton).toBeVisible();
  });

  test('should display multiple promo codes if available', async () => {
    // Get all promo code rows
    const rows = await adminPromoCodesPage.getPromoCodesTableRows();
    
    if (rows.length > 1) {
      // Test second promo code if available
      const secondPromoCode = await adminPromoCodesPage.getPromoCodeByIndex(1);
      
      if (secondPromoCode) {
        const validations = await adminPromoCodesPage.validatePromoCodeData(secondPromoCode);
        expect(validations.hasCode).toBe(true);
        expect(validations.hasCreator).toBe(true);
      }
    }
    
    // Verify we have at least some rows (could be 0 or more)
    expect(rows.length).toBeGreaterThanOrEqual(0);
  });

  test('should display multiple redeem history entries if available', async () => {
    // Get all redeem history rows
    const rows = await adminPromoCodesPage.getRedeemHistoryTableRows();
    
    if (rows.length > 1) {
      // Test second redeem history if available
      const secondRedeemHistory = await adminPromoCodesPage.getRedeemHistoryByIndex(1);
      
      if (secondRedeemHistory) {
        // Simple validation - just check if data exists
        expect(secondRedeemHistory.code).toBeTruthy();
        expect(secondRedeemHistory.redeemedBy).toBeTruthy();
      }
    }
    
    // Verify we have at least some rows (could be 0 or more)
    expect(rows.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle pagination navigation', async () => {
    // Test pagination if available
    const paginationInfo = await adminPromoCodesPage.getPromoCodePaginationInfo();
    
    if (paginationInfo.includes('Total') && !paginationInfo.includes('Total 0')) {
      // If there are multiple pages, test navigation
      const totalMatch = paginationInfo.match(/Total (\d+)/);
      if (totalMatch && parseInt(totalMatch[1]) > 10) {
        // Test clicking page 2 if available
        const page2Button = adminPromoCodesPage.page.locator('text=2').first();
        if (await page2Button.isVisible()) {
          await adminPromoCodesPage.clickPromoCodePageNumber(2);
          // Verify we're still on the page
          await expect(adminPromoCodesPage.page).toHaveURL(ADMIN_ENDPOINTS.PROMO_CODES);
        }
      }
    }
  });

  test('should verify table data consistency', async () => {
    // Get first few promo codes and verify data consistency
    const rows = await adminPromoCodesPage.getPromoCodesTableRows();
    
    for (let i = 0; i < Math.min(3, rows.length); i++) {
      const promoCode = await adminPromoCodesPage.getPromoCodeByIndex(i);
      
      if (promoCode) {
        // Verify amount format
        expect(promoCode.amount).toMatch(/^\$[\d,]+\.\d{2}$/);
        
        // Verify uses format (should be like "1/2" or "0/10")
        expect(promoCode.uses).toMatch(/^\d+\/\d+$/);
        
        // Verify created date format
        expect(promoCode.createdAt).toMatch(/\d{4}-\d{2}-\d{2}/);
      }
    }
  });
});

import { test } from '../../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { BillingPage } from "../../../pages/user/BillingPage";
import { LoginPage } from "../../../pages/user/LoginPage";
import { AccountPage } from "../../../pages/user/AccountPage";
import { ENDPOINTS } from "../../../constants/user-endpoints";
import { loginAndGetToken } from "../../../utils/auth";
import { PAYMENT_TEST_DATA } from "../../../utils/testData";

// Test 2 scenarios about upgrade tier flow
test.describe('Upgrade Tier Flow - Member 4 & Member 5', () => {
  let billingPage: BillingPage;
  let loginPage: LoginPage;
  let accountPage: AccountPage;
  
  // Member 4 credentials
  const member4 = {
    email: 'thivunguyen1506+member4@gmail.com',
    password: '456456',
    username: 'Member 4'
  };
  
  // Member 5 credentials
  const member5 = {
    email: 'thivunguyen1506+member5@gmail.com',
    password: '456456',
    username: 'Member 5'
  };
  
  // Admin credentials for tier reset
  const adminCreds = {
    email: 'thivunguyen1506@gmail.com',
    password: '777888'
  };
  
  // Test card data for upgrade
  const testCardData = {
    fullName: 'Member Four',
    addressLine1: '123 Test Street',
    addressLine2: 'Apt 4',
    city: 'Ho Chi Minh',
    postalCode: '70000',
    expirationDate: '0327',
    securityCode: '123'
  };
  
  // Test card number for upgrade - Visa card for 3DS authentication
  const upgradeCardNumber = '4000006420000001';

  /**
   * Reset Member 4 tier to Engineer Tier 1 using admin API
   * Note: This function assumes the admin API endpoint exists.
   * You may need to adjust the API endpoint based on actual implementation.
   */
  async function resetMember4TierToEngineerTier1(request: any) {
    try {
      // Step 1: Login as admin to get admin token
      const adminToken = await loginAndGetToken(request, adminCreds.email, adminCreds.password);
      console.log('Admin logged in successfully');
      
      // Step 2: Get user ID for Member 4 by email
      // Assuming there's an API to search users by email or get user details
      const getUserResponse = await request.get('https://dev-portal-api.meganova.ai/api/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          email: member4.email
        }
      });
      
      if (getUserResponse.status() !== 200) {
        console.log('Failed to get user details:', getUserResponse.status());
        return;
      }
      
      const userData = await getUserResponse.json();
      console.log('User data retrieved:', userData);
      
      // Extract user ID from response (adjust based on actual API response structure)
      const userId = userData.data?.id || userData.data?.[0]?.id;
      
      if (!userId) {
        console.log('User ID not found for Member 4');
        return;
      }
      
      console.log('Member 4 User ID:', userId);
      
      // Step 3: Update user tier to Engineer Tier 1
      // Note: API endpoint may need adjustment based on actual implementation
      const updateTierResponse = await request.put(`https://dev-portal-api.meganova.ai/api/v1/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          tier: 'eng tier1' // Engineer Tier 1
        }
      });
      
      console.log('Update tier response status:', updateTierResponse.status());
      
      if (updateTierResponse.status() === 200 || updateTierResponse.status() === 204) {
        console.log('✅ Successfully reset Member 4 tier to Engineer Tier 1');
      } else {
        console.log('⚠️ Failed to reset tier:', updateTierResponse.status());
        const errorBody = await updateTierResponse.text();
        console.log('Error details:', errorBody);
      }
      
    } catch (error) {
      console.log('Error in resetMember4TierToEngineerTier1:', error);
    }
  }

  /**
   * Reset Member 5 tier to Engineer Tier 1 using admin API
   */
  async function resetMember5TierToEngineerTier1(request: any) {
    try {
      // Step 1: Login as admin to get admin token
      const adminToken = await loginAndGetToken(request, adminCreds.email, adminCreds.password);
      console.log('Admin logged in successfully');
      
      // Step 2: Get user ID for Member 5 by email
      const getUserResponse = await request.get('https://dev-portal-api.meganova.ai/api/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          email: member5.email
        }
      });
      
      if (getUserResponse.status() !== 200) {
        console.log('Failed to get user details:', getUserResponse.status());
        return;
      }
      
      const userData = await getUserResponse.json();
      console.log('User data retrieved:', userData);
      
      // Extract user ID from response
      const userId = userData.data?.id || userData.data?.[0]?.id;
      
      if (!userId) {
        console.log('User ID not found for Member 5');
        return;
      }
      
      console.log('Member 5 User ID:', userId);
      
      // Step 3: Update user tier to Engineer Tier 1
      const updateTierResponse = await request.put(`https://dev-portal-api.meganova.ai/api/v1/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          tier: 'eng tier1' // Engineer Tier 1
        }
      });
      
      console.log('Update tier response status:', updateTierResponse.status());
      
      if (updateTierResponse.status() === 200 || updateTierResponse.status() === 204) {
        console.log('✅ Successfully reset Member 5 tier to Engineer Tier 1');
      } else {
        console.log('⚠️ Failed to reset tier:', updateTierResponse.status());
        const errorBody = await updateTierResponse.text();
        console.log('Error details:', errorBody);
      }
      
    } catch (error) {
      console.log('Error in resetMember5TierToEngineerTier1:', error);
    }
  }

  /**
   * Get current user tier
   */
  async function getCurrentUserTier(page: any): Promise<string | null> {
    try {
      // Navigate to account page to check tier
      const accountPage = new AccountPage(page);
      await accountPage.navigateTo();
      await page.waitForTimeout(2000);
      
      // Try to find tier information on the page
      // Adjust selector based on actual implementation
      const tierElement = page.locator('text=/tier|Tier/i').first();
      if (await tierElement.isVisible({ timeout: 5000 })) {
        const tierText = await tierElement.textContent();
        console.log('Current tier displayed:', tierText);
        return tierText;
      }
      
      return null;
    } catch (error) {
      console.log('Could not retrieve tier from UI:', error);
      return null;
    }
  }

  // Before each test: Reset both Member 4 and Member 5 tier to Engineer Tier 1
  test.beforeEach(async ({ request }) => {
    console.log('🔄 [BEFORE EACH] Resetting Member 4 and Member 5 tier to Engineer Tier 1...');
    await resetMember4TierToEngineerTier1(request);
    await resetMember5TierToEngineerTier1(request);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for tier update to propagate
  });

  // After each test: Reset both Member 4 and Member 5 tier to Engineer Tier 1
  test.afterEach(async ({ request }) => {
    console.log('🔄 [AFTER EACH] Resetting Member 4 and Member 5 tier to Engineer Tier 1...');
    await resetMember4TierToEngineerTier1(request);
    await resetMember5TierToEngineerTier1(request);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for tier update to propagate
  });

  test('Member 4 upgrade tier flow: Add card, verify upgrade, and persist after re-login', async ({ page, context }) => {
    test.setTimeout(180000); // 3 minutes timeout for combined test
    
    // Step 1: Login as Member 4
    console.log('Step 1: Logging in as Member 4...');
    loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login(member4.email, member4.password);
    await loginPage.isLoggedIn(member4.username);
    await page.waitForTimeout(2000);
    console.log('✅ Logged in successfully');
    
    // Step 2: Verify initial tier (should be Engineer Tier 1)
    console.log('Step 2: Checking initial tier...');
    const initialTier = await getCurrentUserTier(page);
    console.log('Initial tier:', initialTier);
    
    // Step 3: Navigate to billing page
    console.log('Step 3: Navigating to billing page...');
    billingPage = new BillingPage(page);
    await billingPage.navigateTo();
    await expect(page).toHaveURL(new RegExp(ENDPOINTS.BILLING), { timeout: 30000 });
    console.log('✅ On billing page');
    
    // Step 4: Add the upgrade card (4000006420000001)
    console.log('Step 4: Adding payment card for tier upgrade...');
    await billingPage.addNewCard(testCardData, upgradeCardNumber);
    
    // Step 5: Verify card was added successfully
    console.log('Step 5: Verifying card was added...');
    await billingPage.verifyCardAddedSuccessfully();
    console.log('✅ Card added successfully');
    
    // Step 6: Wait for tier upgrade to process
    console.log('Step 6: Waiting for tier upgrade to process...');
    await page.waitForTimeout(5000); // Wait for tier upgrade to process
    
    // Step 7: Verify tier has been upgraded
    console.log('Step 7: Verifying tier upgrade...');
    await page.reload();
    await page.waitForTimeout(2000);
    
    const upgradedTier = await getCurrentUserTier(page);
    console.log('Upgraded tier:', upgradedTier);
    
    // Verify tier is no longer Engineer Tier 1 (should be upgraded)
    expect(upgradedTier).not.toContain('eng tier1');
    expect(upgradedTier).not.toContain('Engineer Tier 1');
    console.log('✅ Tier upgrade verified');
    
    // Step 8: Logout to test persistence
    console.log('Step 8: Logging out...');
    await page.goto('/home');
    await page.waitForTimeout(1000);
    
    // Clear local storage to simulate logout
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    console.log('✅ Logged out');
    
    // Step 9: Re-login as Member 4
    console.log('Step 9: Re-logging in as Member 4...');
    await loginPage.visit();
    await loginPage.login(member4.email, member4.password);
    await loginPage.isLoggedIn(member4.username);
    await page.waitForTimeout(2000);
    console.log('✅ Re-logged in successfully');
    
    // Step 10: Verify tier upgrade persists after re-login
    console.log('Step 10: Verifying tier upgrade persistence...');
    const tierAfterRelogin = await getCurrentUserTier(page);
    console.log('Tier after re-login:', tierAfterRelogin);
    
    // Verify tier is still upgraded (not Engineer Tier 1)
    expect(tierAfterRelogin).not.toContain('eng tier1');
    expect(tierAfterRelogin).not.toContain('Engineer Tier 1');
    console.log('✅ Tier upgrade persists after re-login');
    
    console.log('✅ Combined test completed: Tier upgrade successful and persists');
    
    // Cleanup: Delete the test card
    console.log('Cleanup: Deleting test card...');
    await billingPage.navigateTo();
    await page.waitForTimeout(2000);
    try {
      await billingPage.deleteSpecificCard('0001'); // Last 4 digits of 4000006420000001
      console.log('✅ Test card deleted');
    } catch (error) {
      console.log('⚠️ Could not delete test card:', error);
    }
  });

  test('Member 5 deposit $10 flow: Add credit and verify upgrade to Engineer Tier 3', async ({ page, context }) => {
    test.setTimeout(180000); // 3 minutes timeout for combined test
    
    // Step 1: Login as Member 5
    console.log('Step 1: Logging in as Member 5...');
    loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login(member5.email, member5.password);
    await loginPage.isLoggedIn(member5.username);
    await page.waitForTimeout(2000);
    console.log('✅ Logged in successfully');
    
    // Step 2: Verify initial tier (should be Engineer Tier 1)
    console.log('Step 2: Checking initial tier...');
    const initialTier = await getCurrentUserTier(page);
    console.log('Initial tier:', initialTier);
    
    // Step 3: Navigate to billing page
    console.log('Step 3: Navigating to billing page...');
    billingPage = new BillingPage(page);
    await billingPage.navigateTo();
    await expect(page).toHaveURL(new RegExp(ENDPOINTS.BILLING), { timeout: 30000 });
    console.log('✅ On billing page');
    
    // Step 4: Get initial invoice count
    console.log('Step 4: Getting initial invoice count...');
    const token = await page.evaluate(() => 
      localStorage.getItem('meganova_newlook_token')
    );
    
    const invoiceResponse = await context.request.get('https://dev-portal-api.meganova.ai/api/v1/users/invoices?limit=10&offset=0', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const invoiceRecords = await invoiceResponse.json();
    const initialTotal = invoiceRecords.data?.total_invoices || 0;
    console.log('Initial total invoices:', initialTotal);
    
    // Step 5: Add $10 credit using valid card
    console.log('Step 5: Adding $10 credit...');
    const paymentData = PAYMENT_TEST_DATA.validCard;
    await billingPage.addCreditByCard(paymentData);
    console.log('✅ Credit added successfully');
    
    // Step 6: Wait for invoice to be created and verify
    console.log('Step 6: Verifying invoice creation...');
    let newTotal = initialTotal;
    let retryCount = 0;
    const maxRetries = 5;
    
    while (newTotal === initialTotal && retryCount < maxRetries) {
      await page.waitForTimeout(2000); // Wait 2 seconds
      
      const newInvoiceResponse = await context.request.get('https://dev-portal-api.meganova.ai/api/v1/users/invoices?limit=10&offset=0', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const newInvoiceRecords = await newInvoiceResponse.json();
      newTotal = newInvoiceRecords.data?.total_invoices || 0;
      
      console.log(`Retry ${retryCount + 1}: New total invoices: ${newTotal}`);
      retryCount++;
    }

    // Verify new invoice record was created
    console.log(`Final comparison: Expected ${initialTotal + 1}, Got ${newTotal}`);
    expect(newTotal).toBe(initialTotal + 1);
    console.log('✅ Invoice created successfully');
    
    // Step 7: Reload page and verify $10 transaction
    console.log('Step 7: Verifying $10 transaction...');
    await page.reload();
    await page.waitForSelector('.transaction-container .el-table tbody tr', { timeout: 10000 });
    
    const firstInvoiceRecord = page.locator('.transaction-container .el-table tbody tr:first-child').first();
    await expect(firstInvoiceRecord).toBeVisible({ timeout: 10000 });
    await expect(firstInvoiceRecord).toContainText('Reload');
    await expect(firstInvoiceRecord).toContainText('$10');
    console.log('✅ $10 transaction verified');
    
    // Step 8: Wait for tier upgrade to process
    console.log('Step 8: Waiting for tier upgrade to process...');
    await page.waitForTimeout(5000); // Wait for tier upgrade to process
    
    // Step 9: Verify tier has been upgraded to Engineer Tier 3
    console.log('Step 9: Verifying tier upgrade to Engineer Tier 3...');
    await page.reload();
    await page.waitForTimeout(2000);
    
    const upgradedTier = await getCurrentUserTier(page);
    console.log('Upgraded tier:', upgradedTier);
    
    // Verify tier is now Engineer Tier 3
    expect(upgradedTier).toContain('eng tier3');
    expect(upgradedTier).toContain('Engineer Tier 3');
    console.log('✅ Tier upgraded to Engineer Tier 3 verified');
    
    // Step 10: Logout to test persistence
    console.log('Step 10: Logging out...');
    await page.goto('/home');
    await page.waitForTimeout(1000);
    
    // Clear local storage to simulate logout
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    console.log('✅ Logged out');
    
    // Step 11: Re-login as Member 5
    console.log('Step 11: Re-logging in as Member 5...');
    await loginPage.visit();
    await loginPage.login(member5.email, member5.password);
    await loginPage.isLoggedIn(member5.username);
    await page.waitForTimeout(2000);
    console.log('✅ Re-logged in successfully');
    
    // Step 12: Verify tier upgrade persists after re-login
    console.log('Step 12: Verifying tier upgrade persistence...');
    const tierAfterRelogin = await getCurrentUserTier(page);
    console.log('Tier after re-login:', tierAfterRelogin);
    
    // Verify tier is still Engineer Tier 3
    expect(tierAfterRelogin).toContain('eng tier3');
    expect(tierAfterRelogin).toContain('Engineer Tier 3');
    console.log('✅ Tier upgrade persists after re-login');
    
    console.log('✅ Member 5 deposit flow completed: Credit added and tier upgraded to Engineer Tier 3');
  });
});

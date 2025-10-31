import { test } from '../../../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { BillingPage } from '../../../../pages/user/BillingPage';
import { ENDPOINTS } from '../../../../constants/user-endpoints';

test.describe('Billing Page, Visa Cards', () => {
  let billingPage: BillingPage;
  const testData = {
      fullName: 'Ellie nguyen',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'HCM',
      postalCode: '90000',
      expirationDate: '0327',
      securityCode: '111'
  }
  const cards = {
    visaCredit: '4242424242424242',  // Visa test card
    visaDebit: '4000056655665556',  // Visa Debit test card
    visaGreece: '4000003000000030', // Visa Greece (GR)
  }

  test.beforeAll(async ({ browser }) => {
    test.setTimeout(60000); // Set 1 minute timeout for beforeAll
    // Create a new context for cleanup
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      // Navigate to billing page first
      const billingPage = new BillingPage(page);
      await billingPage.navigateTo();
      await page.waitForTimeout(2000); // Wait for page to load
      
      // Clean up test cards before all tests
      const token = await page.evaluate(() => 
        localStorage.getItem('meganova_newlook_token')
      );
    
      console.log('=== BEFORE ALL CLEANUP (VISA CARDS) ===');
      console.log('JWT Token:', token ? token.substring(0, 50) + '...' : 'No token found');
      
      if (!token) {
        console.log('No JWT token found in localStorage');
        return;
      }
      
      const getPaymentMethods = await context.request.get('https://dev-portal-api.meganova.ai/api/v1/payment/payment-methods', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', getPaymentMethods.status());
      
      const paymentJson = await getPaymentMethods.json();
      
      if (getPaymentMethods.status() !== 200 || !paymentJson.data) {
        console.log('API call failed or no data returned. Status:', getPaymentMethods.status());
        return;
      }
      
      // Find Visa test cards with last4 digits that need to be deleted
      const cardsToDelete = paymentJson.data.filter((card: any) => 
        card.last4 === '4242' || card.last4 === '5556' || card.last4 === '0030'
      );
      
      console.log('Visa test cards to delete:', cardsToDelete);
      
      // Delete each found card using stripe_id
      for (const card of cardsToDelete) {
        const deleteResponse = await context.request.post('https://dev-portal-api.meganova.ai/api/v1/payment/delete', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: {
            payment_method_id: card.stripe_id
          }
        });
        console.log(`🗑️ Deleted Visa card ${card.last4}, status:`, deleteResponse.status());
      }
      
      console.log('=== BEFORE ALL CLEANUP COMPLETED (VISA CARDS) ===');
    } catch (error) {
      console.log('Error in beforeAll cleanup:', error);
    } finally {
      await context.close();
    }
  });

  test.beforeEach(async ({ page }) => {
    billingPage = new BillingPage(page);
    await billingPage.navigateTo();
    await expect(page).toHaveURL(new RegExp(ENDPOINTS.BILLING), {timeout: 60000});
  });

  test.afterAll(async ({ browser }) => {
    test.setTimeout(60000); // Set 1 minute timeout for afterAll
    // Create a new context for final cleanup
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      // Navigate to billing page first
      const billingPage = new BillingPage(page);
      await billingPage.navigateTo();
      await page.waitForTimeout(2000); // Wait for page to load
      
      // Final cleanup after all tests
      const token = await page.evaluate(() => 
        localStorage.getItem('meganova_newlook_token')
      );
    
      console.log('=== AFTER ALL CLEANUP (VISA CARDS) ===');
      console.log('JWT Token:', token ? token.substring(0, 50) + '...' : 'No token found');
      
      if (!token) {
        console.log('No JWT token found in localStorage');
        return;
      }
      
      const getPaymentMethods = await context.request.get('https://dev-portal-api.meganova.ai/api/v1/payment/payment-methods', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', getPaymentMethods.status());
      
      const paymentJson = await getPaymentMethods.json();
      
      if (getPaymentMethods.status() !== 200 || !paymentJson.data) {
        console.log('API call failed or no data returned. Status:', getPaymentMethods.status());
        return;
      }
      
      // Find Visa test cards with last4 digits that need to be deleted
      const cardsToDelete = paymentJson.data.filter((card: any) => 
        card.last4 === '4242' || card.last4 === '5556' || card.last4 === '0030'
      );
      
      console.log('🧹 Final cleanup - Visa test cards to delete:', cardsToDelete);
      console.log('📊 Total cards found before final cleanup:', paymentJson.data.length);
      
      // Delete each found card using stripe_id
      for (const card of cardsToDelete) {
        console.log(`🗑️ Final cleanup - Attempting to delete Visa card ${card.last4} with ID: ${card.stripe_id}`);
        const deleteResponse = await context.request.post('https://dev-portal-api.meganova.ai/api/v1/payment/delete', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: {
            payment_method_id: card.stripe_id
          }
        });
        console.log(`✅ Final cleanup - Deleted Visa card ${card.last4}, status:`, deleteResponse.status());
      }
      
      // Final verification - check if cards still exist
      console.log('🔍 Final verification...');
      const finalCheck = await context.request.get('https://dev-portal-api.meganova.ai/api/v1/payment/payment-methods', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const finalData = await finalCheck.json();
      const remainingTestCards = finalData.data?.filter((card: any) => 
        card.last4 === '4242' || card.last4 === '5556' || card.last4 === '0030'
      ) || [];
      
      console.log('📊 Total cards after final cleanup:', finalData.data?.length || 0);
      console.log('🚨 Remaining Visa test cards:', remainingTestCards);
      
      if (remainingTestCards.length > 0) {
        console.log('⚠️ WARNING: Some Visa test cards were not deleted in final cleanup!');
      } else {
        console.log('✅ All Visa test cards successfully cleaned up in final cleanup!');
      }
      
      console.log('=== AFTER ALL CLEANUP COMPLETED (VISA CARDS) ===');
    } catch (error) {
      console.log('Error in afterAll cleanup:', error);
    } finally {
      await context.close();
    }
  });

  test('should accept Visa Credit - 4000000000000002', async () => {
    test.setTimeout(120000);
    await billingPage.addNewCard(testData, cards.visaCredit);
    await billingPage.verifyCardAddedSuccessfully();
  });

  test('should accept Visa Debit - 4000056655665556', async () => {
    test.setTimeout(90000);
    await billingPage.addNewCard(testData, cards.visaDebit);
    await billingPage.verifyCardAddedSuccessfully();
  });

  test('should accept Visa Greece (GR) - 4000003000000030', async () => {
    test.setTimeout(90000);
    await billingPage.addNewCard(testData, cards.visaGreece);
    await billingPage.verifyCardAddedSuccessfully();
  });

});

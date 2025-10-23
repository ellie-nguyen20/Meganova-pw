import { test, expect } from '@playwright/test';
import { ExplorePage } from '../../pages/user/landing_pages/ExplorePage';

test.describe('Explore Page', () => {
  let explorePage: ExplorePage;

  test.beforeEach(async ({ page }) => {
    explorePage = new ExplorePage(page);
    await explorePage.visit();
  });

  test.describe('check page UI', () => {
    test('should display all UI elements correctly', async ({ page }) => {
      await explorePage.checkUI();
    });
  });


  test.describe('check model sections', () => {
    test('should display all model sections', async ({ page }) => {
      await explorePage.checkModelSections();
    });

    test('should display model cards with correct information', async ({ page }) => {
      await explorePage.checkModelCards();
    });

    test('should display pricing information', async ({ page }) => {
      await explorePage.checkPricing();
    });
  });


  test.describe('check model interactions', () => {
    test('should click Explore Models button', async ({ page }) => {
      await explorePage.clickExploreModels();
      // Add assertion based on expected behavior
    });

    test('should click See Docs button', async ({ page }) => {
      // See Docs button navigates in same tab
      await explorePage.clickSeeDocs();
      
      // Wait for navigation to complete
      await page.waitForLoadState();
      
      // Check if URL contains docs
      await expect(page).toHaveURL(/.*docs\.meganova\.ai.*/, { timeout: 30000 });
    });

    test('should click Start Free button', async ({ page }) => {
      await explorePage.clickStartFree();
      // Add assertion based on expected behavior
    });
  });
});

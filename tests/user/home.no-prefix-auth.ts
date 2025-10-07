import { test } from '../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { HomePage } from "../../pages/user/HomePage";

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test.describe('check UI', () => {
    test('should display Home Page UI', async ({ page }) => {
      await homePage.checkUI();
    });

    test('should display main menu', async ({ page }) => {
      await homePage.checkMenu();
    });
  });

  test.describe('check navigation functionality', () => {
    test('should navigate to Sign in page', async ({ page }) => {
      await homePage.clickSignIn();
      // Add assertion to check if we're on sign in page
      await expect(page).toHaveURL('/home');
    });

    test('should navigate to Sign up page', async ({ page }) => {
      await homePage.clickSignUp();
      // Add assertion to check if we're on sign up page
      await expect(page).toHaveURL(/.*sign.*up.*|.*register.*/i);
    });

    test('should navigate to Explore page', async ({ page }) => {
      await homePage.clickExplore();
      // Add assertion to check if we're on explore page
      await expect(page).toHaveURL(/.*explore.*/i);
    });

    test('should navigate to Pricing page', async ({ page }) => {
      await homePage.clickPricing();
      // Add assertion to check if we're on pricing page
      await expect(page).toHaveURL(/.*pricing.*/i);
    });

    test('should navigate to Docs page', async ({ page, context }) => {
      // Docs link opens in new tab
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.clickDocs()
      ]);

      // Wait for new page to load
      await newPage.waitForLoadState();
      
      // Check if URL contains docs
      expect(newPage.url()).toContain('docs.meganova.ai');
    });
  });

  test.describe('check pricing section', () => {
    test('should display all pricing tiers', async ({ page }) => {
      // Scroll to pricing section
      await page.getByRole('paragraph').filter({ hasText: 'Pricing' }).scrollIntoViewIfNeeded();
      
      // Check for all three pricing tiers
      await expect(page.getByRole('heading', { name: 'Engineer', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Expert', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Enterprise', exact: true })).toBeVisible();
      
      // Check for pricing tier descriptions
      await expect(page.locator('text=Get started with fast, flexible inference at pay as you go')).toBeVisible();
      await expect(page.locator('text=Scale with reserved GPUs and advanced configs for production traffic')).toBeVisible();
      await expect(page.locator('text=Your private model, infra, deployments and optimization at scale')).toBeVisible();
    });
  });

  test('should verify page responsiveness on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.checkUI();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.checkUI();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await homePage.checkUI();
  });
}); 
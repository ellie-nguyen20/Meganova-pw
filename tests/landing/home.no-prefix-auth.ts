import { test } from '../../fixtures/testFixtures';
import { expect } from '@playwright/test';
import { HomePage } from "../../pages/user/landing_pages/HomePage";

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
      await expect(page).toHaveURL('https://dev-console.meganova.ai/home', { timeout: 30000 });
    });

    test('should navigate to Sign up page', async ({ page }) => {
      await homePage.clickSignUp();
      // Add assertion to check if we're on sign up page
      await expect(page).toHaveURL(/.*sign.*up.*|.*register.*/i, { timeout: 30000 });
    });

    test('should navigate to Explore page', async ({ page }) => {
      await homePage.clickExplore();
      // Add assertion to check if we're on explore page
      await expect(page).toHaveURL(/.*explore.*/i, { timeout: 30000 });
    });

    test('should navigate to Pricing page', async ({ page }) => {
      await homePage.clickPricing();
      // Add assertion to check if we're on pricing page
      await expect(page).toHaveURL(/.*pricing.*/i, { timeout: 30000 });
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

    test('should navigate to Compute page', async ({ page }) => {
      // Compute link navigates in same tab
      await homePage.clickCompute();
      
      // Wait for navigation to complete
      await page.waitForLoadState();
      
      // Check if URL contains compute
      await expect(page).toHaveURL(/.*docs\.meganova\.ai\/compute.*/, { timeout: 30000 });
    });

    test('should navigate to Blog page', async ({ page, context }) => {
      // Blog link opens in new tab
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.clickBlog()
      ]);

      // Wait for new page to load
      await newPage.waitForLoadState();
      
      // Check if URL contains blog
      expect(newPage.url()).toContain('blog.meganova.ai');
    });
  });

  test.describe('check model cards section', () => {
    test('should display model cards with correct information', async ({ page }) => {
      await homePage.checkModelCards();
    });
  });

  test.describe('check serverless engine section', () => {
    test('should display serverless engine information', async ({ page }) => {
      await homePage.checkServerlessEngine();
    });
  });

  test.describe('check dedicated compute section', () => {
    test('should display dedicated compute information', async ({ page }) => {
      await homePage.checkDedicatedCompute();
    });
  });

  test.describe('check why choose meg nova section', () => {
    test('should display why choose meg nova features', async ({ page }) => {
      await homePage.checkWhyChooseMegaNova();
    });
  });

  test.describe('check roleplay community section', () => {
    test('should display roleplay community information', async ({ page }) => {
      await homePage.checkRoleplayCommunity();
    });
  });

  test.describe('check footer section', () => {
    test('should display footer with all links', async ({ page }) => {
      await homePage.checkFooter();
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
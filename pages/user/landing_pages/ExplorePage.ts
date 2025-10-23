import { Page, expect } from '@playwright/test';

export class ExplorePage {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto('https://dev-portal.meganova.ai/explore', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
  }

  async checkUI() {
    // Ensure we're on the explore page first
    await this.page.goto('https://dev-portal.meganova.ai/explore', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Check for logo
    await expect(this.page.locator('header img[alt="Logo"]').first()).toBeVisible();
    
    const visibleTexts = [
      'Explore',
      'Compute',
      'Blog',
      'Docs',
      'Pricing',
      'Sign in',
      'Sign up',
      'DeepSeek-V3-0324 (free)',
      'The most powerful AI-driven LLM with 685B parameters released by Deepseek',
      'L3.3-MS-Nevoria-70b',
      'A 70B-parameter model designed to generate richly detailed, coherent, and balanced narrative outputs',
      'Bytedance-Seedream-3.0',
      'A top-tier bilingual text-to-image model rivaling GPT-4',
      'Seedance-1.0-Pro-Text-to-Video',
      'Pro-tier model, turns images into cinematic 1080p videos with smooth motion',
      'Recently Added',
      'Best Roleplay Models',
      'Best Image Models',
      'Best Video Models',
      'Let Your Characters Live Everywhere',
      'Connect with communities, scale with confidence, and bring your worlds to life',
      'Start Free'
    ];

    for (const text of visibleTexts) {
      const el = this.page.getByText(text, { exact: false }).first();
      await expect(el).toBeVisible();
    }
  }

  async checkNavigation() {
    // Check main navigation menu
    const mainMenu = this.page.locator('nav.flex.items-center.space-x-3');
    await expect(mainMenu).toBeVisible();
    
    const mainMenuItems = ['Explore', 'Compute', 'Blog', 'Docs', 'Pricing'];
    for (const item of mainMenuItems) {
      await expect(mainMenu.getByText(item, { exact: false })).toBeVisible();
    }
  }

  async checkModelSections() {
    // Check Recently Added section
    await expect(this.page.getByText('Recently Added', { exact: false })).toBeVisible();
    
    // Check Best Roleplay Models section
    await expect(this.page.getByText('Best Roleplay Models', { exact: false })).toBeVisible();
    
    // Check Best Image Models section
    await expect(this.page.getByText('Best Image Models', { exact: false })).toBeVisible();
    
    // Check Best Video Models section
    await expect(this.page.getByText('Best Video Models', { exact: false })).toBeVisible();
  }

  async checkModelCards() {
    // Check specific model cards using more specific selectors
    await expect(this.page.getByText('DeepSeek-V3-0324 (free)', { exact: false }).first()).toBeVisible();
    await expect(this.page.getByText('L3.3-MS-Nevoria-70b', { exact: false }).first()).toBeVisible();
    await expect(this.page.getByText('Bytedance-Seedream-3.0', { exact: false }).first()).toBeVisible();
    await expect(this.page.getByText('Seedance-1.0-Pro-Text-to-Video', { exact: false }).first()).toBeVisible();
    await expect(this.page.getByText('Seedance-1.0-Pro-Image-to-Video', { exact: false }).first()).toBeVisible();
  }

  async checkPricing() {
    // Check pricing information using more specific selectors
    await expect(this.page.locator('div').filter({ hasText: '$2.50/1M' }).first()).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: '$0.021/image' }).first()).toBeVisible();
    await expect(this.page.getByText('Free', { exact: false }).first()).toBeVisible();
  }

  async checkFooter() {
    // Find footer element first
    const footer = this.page.locator('footer').or(this.page.locator('[class*="footer"]')).first();
    
    // Check footer sections using more specific selectors
    await expect(footer.getByRole('heading', { name: 'Models' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Company' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Tech' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Contact' })).toBeVisible();

    // Check specific footer links
    const footerLinks = [
      'Manta-Mini', 'Manta-Flash', 'Manta-Pro', 'Nevoria', 'Mistral',
      'About', 'Blog', 'Pricing',
      'API Status', 'GitHub', 'Docs', 'Compute',
      'X', 'Reddit', 'Discord', 'Contact us'
    ];

    for (const link of footerLinks) {
      await expect(footer.getByText(link, { exact: false })).toBeVisible();
    }
  }

  // Navigation methods
  async clickSignIn() {
    await this.page.getByText('Sign in', { exact: false }).first().click();
  }

  async clickSignUp() {
    await this.page.getByText('Sign up', { exact: false }).first().click();
  }

  async clickCompute() {
    await this.page.getByText('Compute', { exact: false }).first().click();
  }

  async clickBlog() {
    await this.page.getByText('Blog', { exact: false }).first().click();
  }

  async clickDocs() {
    await this.page.getByText('Docs', { exact: false }).first().click();
  }

  async clickPricing() {
    await this.page.getByText('Pricing', { exact: false }).first().click();
  }

  async clickExplore() {
    await this.page.getByText('Explore', { exact: false }).first().click();
  }

  // Model interaction methods
  async clickExploreModels() {
    await this.page.getByText('Explore Models', { exact: false }).first().click();
  }

  async clickSeeDocs() {
    await this.page.getByText('See Docs', { exact: false }).first().click();
  }

  async clickStartFree() {
    await this.page.getByText('Start Free', { exact: false }).first().click();
  }
}

/**
 * Home Page Object Model
 */
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit() {
    await this.page.goto('https://dev-portal.meganova.ai/');
  }

  async checkUI() {
    const visibleTexts = [
      'MegaNova AI',
      'Serverless AI models built for creators',
      'Deploy, scale, and manage immersive roleplay experiences with ease',
      'Features',
      'Features Designed for Immersive AI Roleplay',
      'From analytics to model access, we give you everything you need to bring characters to life',
      'Conversation-first design',
      'Built for roleplay. From system prompts to persona alignment, MegaNova AI makes it easy to create immersive, consistent characters',
      'Instant deployment, no infra hassle',
      'Spin up powerful roleplay models without touching servers',
      'Shared workspace for creators',
      'Collaborate with friends, writers, and devs in a single hub',
      'Always-on support',
      'Our team (and community) are here 24/7',
      'Open integrations',
      'Connect with the platforms you already use: SillyTavern, Janitor AI, RisuAI, and more',
      'Analytics built for roleplay AI',
      'Track conversation quality, user engagement, and model performance with real-time insights',
      'Pricing',
      'Serverless AI Plans',
      'Unbeatable Value Guaranteed: from idea to production, experience top-tier performance at the most competitive rates on the market',
      'Engineer',
      'Get started with fast, flexible inference at pay as you go',
      'Started for free',
      'Expert',
      'Scale with reserved GPUs and advanced configs for production traffic',
      'Enterprise',
      'Your private model, infra, deployments and optimization at scale',
      'Bring Characters to Life Today',
      'Roleplay without limits, stable APIs, fast models, and intuitive management in one place',
      'Subscribes to our newsletter for update, new releases and get the latest special offers'
    ];

    for (const text of visibleTexts) {
      const el = this.page.getByText(text, { exact: false }).first();
      await expect(el).toBeVisible();
    }
  }

  async checkMenu() {
    const mainMenuItems = [
      'Explore', 'Blog', 'Docs', 'Pricing'
    ];

    const topRightItems = [
      'Sign in', 'Sign up'
    ];

    const mainMenu = this.page.locator('nav.flex.items-center.space-x-6');

    for (const item of mainMenuItems) {
      const locator = mainMenu.getByText(item, { exact: false }).first();
      await expect(locator, `Main menu item '${item}' not visible`).toBeVisible();
      await locator.scrollIntoViewIfNeeded();
    }

    // Check for Sign in and Sign up buttons
    for (const item of topRightItems) {
      const locator = this.page.getByText(item, { exact: false }).first();
      await expect(locator, `Top-right item '${item}' not visible`).toBeVisible();
      await locator.scrollIntoViewIfNeeded();
    }
  }

  async clickSignIn() {
    await this.page.getByText('Sign in', { exact: false }).first().click();
  }

  async clickSignUp() {
    await this.page.getByText('Sign up', { exact: false }).first().click();
  }

  async clickExplore() {
    await this.page.getByText('Explore', { exact: false }).first().click();
  }

  async clickPricing() {
    await this.page.getByText('Pricing', { exact: false }).first().click();
  }

  async clickDocs() {
    await this.page.getByText('Docs', { exact: false }).first().click();
  }
} 
/**
 * Home Page Object Model
 */
import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit() {
    await this.page.goto('https://dev-portal.meganova.ai/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
  }

  async checkUI() {
    // Ensure we're on the home page first
    await this.page.goto('https://dev-portal.meganova.ai/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Check for logo first (header logo only)
    await expect(this.page.locator('header img[alt="Logo"]').first()).toBeVisible();
    
    const visibleTexts = [
      'Generative Inference Cloud',
      'for Role-players',
      '& Developers',
      'The world\'s best roleplay models, all in one place. Build, fine-tune, and deploy immersive RP experiences with serverless GPUs and on-demand hybrid compute.',
      'Get Started',
      'Contact Sales',
      'Supporting over',
      '100,000',
      'role-players and developers',
      'Community Scale',
      'Explore all models',
      'Built, deploy, train.',
      'Roleplay-tuned AI models. Ready to drop in.',
      'Explore a living collection of character-driven models built for immersion, emotion, and story depth. Every model runs instantly — no setup, no servers, just creation on demand.',
      'Use it to:',
      'Building immersive characters and worlds',
      'Personalizing AI for your story, fandom, or brand voice',
      'Getting early access to new and experimental models',
      'Model Library',
      'Explore models',
      'Serverless Engine',
      'Run models. Zero GPU setup. Zero wait.',
      'Our distributed GPU engine delivers instant inference anywhere in the world — optimized for real-time interaction and creative flow. No cold starts, no scaling pain, no infrastructure in your way.',
      'Use it to:',
      'Instant access to high-speed inference for any model',
      'Scale from one chat to thousands of sessions seamlessly',
      'Unified tools to run, deploy, and monitor usage',
      'Real-time dashboard for latency and performance tracking',
      'Learn more',
      'Dedicated Compute',
      'Power for advanced creators and research studios.',
      'For teams and creators who want full control — run fine-tuning, long-context experiments, or custom training on guaranteed hardware built for frontier workloads.',
      'Use it to:',
      'Access to the latest NVIDIA Blackwell™ and A100 GPUs',
      'Large-scale model training and fine-tuning',
      'Distributed data pipelines for high-volume workloads',
      'Enterprise-grade reliability with creator-level access',
      'Learn more',
      'Why Choose',
      'MegaNova?',
      'Persona & Dialogue Management',
      'Control system prompts, role profiles, memory chaining, persona alignment, branching logic — everything to make characters feel alive and consistent.',
      'Model Hosting & Serving',
      'Bring your custom models (or fine-tune ours) and run them in production. We manage infrastructure, GPU scaling, versioning, and latency so you don\'t have to.',
      'Cost, Safety & Controls',
      'Token costs, user quotas, rate limits, content safety filters — we give you guardrails and visibility so you can grow confidently.',
      'Roleplay-First Inference',
      'MegaNova is built from the ground up for character conversations, narrative flows, persona consistency, memory context. Every feature is optimized for RP use cases.',
      'Analytics & User Insights',
      'Track session durations, user drop-offs, prompt effectiveness, character usage. Use data to improve experiences, dynamically adapt characters.',
      'Built for',
      'Roleplay Community',
      'Connect to Janitor AI, Silly Tavern, Risu, Chub & more — host your personas everywhere',
      'Get Started',
      'Users Across the Globe',
      'Technical Partners',
      'Let your characters live everywhere',
      'Connect with communities, scale with confidence, and bring your worlds to life.',
      'Start Free'
    ];

    for (const text of visibleTexts) {
      const el = this.page.getByText(text, { exact: false }).first();
      await expect(el).toBeVisible();
    }
  }

  async checkMenu() {
    const mainMenuItems = [
      'Explore', 'Compute', 'Blog', 'Docs', 'Pricing'
    ];

    const topRightItems = [
      'Sign in', 'Sign up'
    ];

    const mainMenu = this.page.locator('nav.flex.items-center.space-x-3');

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

  async clickCompute() {
    await this.page.getByText('Compute', { exact: false }).first().click();
  }

  async clickBlog() {
    await this.page.getByText('Blog', { exact: false }).first().click();
  }

  async checkModelCards() {
    // Check H1 heading for model library section
    await expect(this.page.locator('h1').filter({ hasText: /The World's Largest Library\s+of Roleplay AI Models/ })).toBeVisible();
    
    // Check for specific model cards
    const modelCards = [
      'Seedance-1.0-Pro-Text-to-Video',
      'Seedance-1.0-Pro-Image-to-Video', 
      'Bytedance-Seedream-3.0',
      'L3.3-MS-Nevoria-70b'
    ];

    for (const model of modelCards) {
      await expect(this.page.getByText(model, { exact: false })).toBeVisible();
    }

    // Check for pricing information
    await expect(this.page.getByText('$2.50', { exact: false })).toBeVisible();
    await expect(this.page.getByText('$0.021', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Free', { exact: false })).toBeVisible();
  }

  async checkServerlessEngine() {
    await expect(this.page.getByText('Serverless Engine', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Run models. Zero GPU setup. Zero wait.', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Our distributed GPU engine delivers instant inference anywhere in the world', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Learn more', { exact: false }).first()).toBeVisible();
  }

  async checkDedicatedCompute() {
    await expect(this.page.getByText('Dedicated Compute', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Power for advanced creators and research studios.', { exact: false })).toBeVisible();
    await expect(this.page.getByText('For teams and creators who want full control', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Access to the latest NVIDIA Blackwell™ and A100 GPUs', { exact: false })).toBeVisible();
  }

  async checkWhyChooseMegaNova() {
    await expect(this.page.getByText('Why Choose', { exact: false })).toBeVisible();
    await expect(this.page.getByText('MegaNova?', { exact: false })).toBeVisible();
    
    const featureCards = [
      'Persona & Dialogue Management',
      'Model Hosting & Serving',
      'Cost, Safety & Controls',
      'Roleplay-First Inference',
      'Analytics & User Insights'
    ];

    for (const feature of featureCards) {
      await expect(this.page.getByText(feature, { exact: false })).toBeVisible();
    }
  }

  async checkRoleplayCommunity() {
    await expect(this.page.getByRole('heading', { name: 'Built for Roleplay Community' })).toBeVisible();
    await expect(this.page.getByText('Connect to Janitor AI, Silly Tavern, Risu, Chub & more', { exact: false })).toBeVisible();
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
} 
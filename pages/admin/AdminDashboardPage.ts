import { Page, Locator } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';

export class AdminDashboardPage extends AdminBasePage {
  // Navigation elements
  readonly dashboardTitle: Locator;
  readonly promoCodesMenu: Locator;
  readonly userDropdown: Locator;
  readonly signOutButton: Locator;

  // User Overview section
  readonly totalUsersText: Locator;
  readonly userOverviewSection: Locator;
  readonly userTable: Locator;
  readonly searchInput: Locator;
  readonly clearButton: Locator;

  // Inference Overview section
  readonly requestsMetric: Locator;
  readonly successMetric: Locator;
  readonly failedMetric: Locator;
  readonly inputTokensMetric: Locator;
  readonly outputTokensMetric: Locator;
  readonly avgResponseMetric: Locator;
  readonly inferenceOverviewSection: Locator;

  // Payment Overview section
  readonly totalCreditCards: Locator;
  readonly totalProductPurchase: Locator;
  readonly totalCreditCardPayment: Locator;
  readonly totalStablecoinPayment: Locator;
  readonly paymentOverviewSection: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation elements
    this.dashboardTitle = page.getByRole('menuitem', { name: 'Dashboard' });
    this.promoCodesMenu = page.getByText('Promo Codes');
    this.userDropdown = page.getByText('Ellie Nguyen');
    this.signOutButton = page.getByText('Sign Out');

    // User Overview section
    this.totalUsersText = page.locator('text=Total Registered User:').first();
    this.userOverviewSection = page.getByText('User Overview');
    this.userTable = page.locator('table').first();
    this.searchInput = page.getByPlaceholder('Search');
    this.clearButton = page.getByText('Clear');

    // Inference Overview section
    this.requestsMetric = page.locator('text=Requests').first();
    this.successMetric = page.locator('text=Success').first();
    this.failedMetric = page.locator('text=Failed').first();
    this.inputTokensMetric = page.locator('text=Input Tokens').first();
    this.outputTokensMetric = page.locator('text=Output Tokens').first();
    this.avgResponseMetric = page.locator('text=Avg Response').first();
    this.inferenceOverviewSection = page.getByText('Inference Overview');

    // Payment Overview section
    this.totalCreditCards = page.locator('text=Total Credit Cards:').first();
    this.totalProductPurchase = page.locator('text=Total Product Purchase:').first();
    this.totalCreditCardPayment = page.locator('text=Total Credit Card Payment:').first();
    this.totalStablecoinPayment = page.locator('text=Total Stablecoin Payment:').first();
    this.paymentOverviewSection = page.getByText('Payment Overview');
  }

  // Navigation methods
  async clickPromoCodesMenu() {
    await this.promoCodesMenu.click();
  }

  async navigateToPromoCodes() {
    await this.clickPromoCodesMenu();
  }

  async clickUserDropdown() {
    await this.userDropdown.click();
  }

  async signOut() {
    await this.clickUserDropdown();
    await this.signOutButton.click();
  }

  // User Overview methods
  async getTotalUsersCount(): Promise<string> {
    return await this.totalUsersText.textContent() || '';
  }

  async searchUsers(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  // Inference Overview methods
  async getRequestsCount(): Promise<string> {
    return await this.requestsMetric.textContent() || '';
  }

  async getSuccessCount(): Promise<string> {
    return await this.successMetric.textContent() || '';
  }

  async getFailedCount(): Promise<string> {
    return await this.failedMetric.textContent() || '';
  }

  async getInputTokensCount(): Promise<string> {
    return await this.inputTokensMetric.textContent() || '';
  }

  async getOutputTokensCount(): Promise<string> {
    return await this.outputTokensMetric.textContent() || '';
  }

  async getAvgResponseTime(): Promise<string> {
    return await this.avgResponseMetric.textContent() || '';
  }

  // Payment Overview methods
  async getTotalCreditCardsCount(): Promise<string> {
    return await this.totalCreditCards.textContent() || '';
  }

  async getTotalProductPurchaseCount(): Promise<string> {
    return await this.totalProductPurchase.textContent() || '';
  }

  async getTotalCreditCardPayment(): Promise<string> {
    return await this.totalCreditCardPayment.textContent() || '';
  }

  async getTotalStablecoinPayment(): Promise<string> {
    return await this.totalStablecoinPayment.textContent() || '';
  }

  // General methods
  async isDashboardLoaded(): Promise<boolean> {
    return await this.dashboardTitle.isVisible();
  }

  async isUserOverviewVisible(): Promise<boolean> {
    return await this.userOverviewSection.isVisible();
  }

  async isInferenceOverviewVisible(): Promise<boolean> {
    return await this.inferenceOverviewSection.isVisible();
  }

  async isPaymentOverviewVisible(): Promise<boolean> {
    return await this.paymentOverviewSection.isVisible();
  }
}

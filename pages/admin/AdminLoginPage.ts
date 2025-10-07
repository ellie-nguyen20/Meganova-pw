import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';
import { ADMIN_ENDPOINTS } from '../../constants/admin-endpoints';

export class AdminLoginPage extends AdminBasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    super(page);
    // Sử dụng locators chính xác từ trang admin thực tế
    this.emailInput = page.getByPlaceholder('Your email address');
    this.passwordInput = page.getByPlaceholder('Your password');
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
    this.rememberMeCheckbox = page.getByText('Remember me');
    this.welcomeText = page.getByText('Welcome Back Administrator');
  }

  async visit() {
    await this.page.goto(ADMIN_ENDPOINTS.ADMIN_LOGIN);
    await expect(this.page).toHaveURL(new RegExp(ADMIN_ENDPOINTS.ADMIN_LOGIN), {timeout: 60000});

  }

  async login(email: string, password: string) {
    await this.visit(); // Navigate to login page first
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRememberMe(email: string, password: string) {
    await this.visit(); // Navigate to login page first
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.click();
    await this.loginButton.click();
  }

  async isLoginPage(): Promise<boolean> {
    return await this.welcomeText.isVisible();
  }

  async isEmailInputVisible(): Promise<boolean> {
    return await this.emailInput.isVisible();
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  async isSignInButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async getWelcomeText(): Promise<string> {
    return await this.welcomeText.textContent() || '';
  }
}

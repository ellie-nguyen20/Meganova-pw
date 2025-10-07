import { Page, Locator } from '@playwright/test';

export class AdminBasePage {
  readonly page: Page;
  readonly adminHeader: Locator;
  readonly adminSidebar: Locator;
  readonly adminFooter: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminHeader = page.locator('[data-testid="admin-header"]');
    this.adminSidebar = page.locator('[data-testid="admin-sidebar"]');
    this.adminFooter = page.locator('[data-testid="admin-footer"]');
    this.userMenu = page.locator('[data-testid="admin-user-menu"]');
    this.logoutButton = page.locator('[data-testid="admin-logout"]');
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.adminHeader.isVisible();
  }
}

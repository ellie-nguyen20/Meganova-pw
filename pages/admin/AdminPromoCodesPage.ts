import { Page, Locator } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';

export class AdminPromoCodesPage extends AdminBasePage {
  // Navigation elements
  readonly pageTitle: Locator;
  readonly dashboardMenu: Locator;
  readonly promoCodesMenu: Locator;
  readonly userDropdown: Locator;
  readonly signOutButton: Locator;

  // Action buttons
  readonly createPromoCodesButton: Locator;
  readonly generationHistoryButton: Locator;

  // Create Promo Code Form
  readonly createPromoCodeModal: Locator;
  readonly createPromoCodeTitle: Locator;
  readonly codeInput: Locator;
  readonly codeCharacterCount: Locator;
  readonly campaignInput: Locator;
  readonly amountInput: Locator;
  readonly maxUseInput: Locator;
  readonly assignToUserInput: Locator;
  readonly expiresAtInput: Locator;
  readonly cancelButton: Locator;
  readonly createPromoCodeSubmitButton: Locator;

  // Promo Codes Table
  readonly promoCodesTable: Locator;
  readonly promoCodeColumn: Locator;
  readonly creatorColumn: Locator;
  readonly amountColumn: Locator;
  readonly usesColumn: Locator;
  readonly assignedToColumn: Locator;
  readonly campaignColumn: Locator;
  readonly createdAtColumn: Locator;
  readonly expiresAtColumn: Locator;

  // Redeem History Table
  readonly redeemHistoryTable: Locator;

  // Success message
  readonly successMessage: Locator;
  readonly redeemCodeColumn: Locator;
  readonly redeemAmountColumn: Locator;
  readonly redeemedByColumn: Locator;
  readonly redeemCampaignColumn: Locator;
  readonly attemptedAtColumn: Locator;
  readonly redeemedAtColumn: Locator;
  readonly statusColumn: Locator;

  // Pagination
  readonly promoCodePagination: Locator;
  readonly redeemHistoryPagination: Locator;
  readonly promoCodePageInfo: Locator;
  readonly redeemHistoryPageInfo: Locator;
  readonly promoCodePageNumbers: Locator;
  readonly redeemHistoryPageNumbers: Locator;
  readonly promoCodeItemsPerPage: Locator;
  readonly redeemHistoryItemsPerPage: Locator;

  // Filters (if visible)
  readonly dateRangeFilter: Locator;
  readonly statusFilter: Locator;
  readonly countryFilter: Locator;
  readonly cityFilter: Locator;
  readonly amountRangeFilter: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation elements
    this.pageTitle = page.locator('.flex.flex-ai-center.meganova-icon.font-28.font-bold').getByText('Promo Codes');
    this.dashboardMenu = page.getByRole('menuitem', { name: 'Dashboard' });
    this.promoCodesMenu = page.getByRole('menuitem', { name: 'Promo Codes' });
    this.userDropdown = page.getByText('Ellie Nguyen');
    this.signOutButton = page.getByText('Sign Out');

    // Action buttons
    this.createPromoCodesButton = page.getByRole('button', { name: 'Create Promo Codes' });
    this.generationHistoryButton = page.getByText('Generation History');

    // Create Promo Code Form
    this.createPromoCodeModal = page.locator('.el-dialog').first();
    this.createPromoCodeTitle = page.getByText('Create New Promo Code');
    this.codeInput = page.getByPlaceholder('Code');
    this.codeCharacterCount = page.locator('text=/\\d+ \\/ 30/').first();
    this.campaignInput = page.getByPlaceholder('Campaign');
    this.amountInput = page.getByPlaceholder('Amount');
    this.maxUseInput = page.getByPlaceholder('Max Use');
    this.assignToUserInput = page.getByPlaceholder('User');
    this.expiresAtInput = page.getByPlaceholder('Expires At');
    this.cancelButton = page.getByText('Cancel');
    this.createPromoCodeSubmitButton = page.getByRole('button', { name: 'Create Promo Code', exact: true });

    // Promo Codes Table
    this.promoCodesTable = page.locator('table').first();
    this.promoCodeColumn = page.locator('table').first().getByText('Code');
    this.creatorColumn = page.locator('table').first().getByText('Creator');
    this.amountColumn = page.locator('table').first().getByText('Amount');
    this.usesColumn = page.locator('table').first().getByText('Uses');
    this.assignedToColumn = page.locator('table').first().getByText('Assigned To');
    this.campaignColumn = page.locator('table').first().getByText('Campaign');
    this.createdAtColumn = page.locator('table').first().getByText('Created At');
    this.expiresAtColumn = page.locator('table').first().getByText('Expires At');

    // Redeem History Table
    this.redeemHistoryTable = page.locator('table').nth(1);

    // Success message
    this.successMessage = page.getByText('Promo code successfully generated');
    this.redeemCodeColumn = page.locator('table').nth(1).getByText('Code');
    this.redeemAmountColumn = page.locator('table').nth(1).getByText('Amount');
    this.redeemedByColumn = page.locator('table').nth(1).getByText('Redeemed By');
    this.redeemCampaignColumn = page.locator('table').nth(1).getByText('Campaign');
    this.attemptedAtColumn = page.locator('table').nth(1).getByText('Attempted At');
    this.redeemedAtColumn = page.locator('table').nth(1).getByText('Redeemed At');
    this.statusColumn = page.locator('table').nth(1).getByText('Status');

    // Pagination
    this.promoCodePagination = page.locator('text=Showing').first();
    this.redeemHistoryPagination = page.locator('text=Showing').nth(1);
    this.promoCodePageInfo = page.locator('text=/ Total 34').first();
    this.redeemHistoryPageInfo = page.locator('text=/ Total 328').first();
    this.promoCodePageNumbers = page.locator('text=1').first();
    this.redeemHistoryPageNumbers = page.locator('text=1').nth(1);
    this.promoCodeItemsPerPage = page.locator('text=10/page').first();
    this.redeemHistoryItemsPerPage = page.locator('text=10/page').nth(1);

    // Filters (generic selectors - may need adjustment based on actual implementation)
    this.dateRangeFilter = page.locator('text=15 Days').first();
    this.statusFilter = page.locator('text=All').first();
    this.countryFilter = page.locator('text=All').nth(1);
    this.cityFilter = page.locator('text=All').nth(2);
    this.amountRangeFilter = page.locator('text=All').nth(3);
  }

  // Navigation methods
  async clickDashboardMenu() {
    await this.dashboardMenu.click();
  }

  async clickUserDropdown() {
    await this.userDropdown.click();
  }

  async signOut() {
    await this.clickUserDropdown();
    await this.signOutButton.click();
  }

  // Action methods
  async clickCreatePromoCodes() {
    await this.createPromoCodesButton.click();
  }

  async clickGenerationHistory() {
    await this.generationHistoryButton.click();
  }

  // Create Promo Code Form methods
  async isCreatePromoCodeModalVisible(): Promise<boolean> {
    return await this.createPromoCodeModal.isVisible();
  }

  async fillCreatePromoCodeForm(data: {
    code: string;
    campaign: string;
    amount: number;
    maxUse: number;
    assignToUser: string;
    expiresAt?: string;
  }) {
    // Fill code
    await this.codeInput.fill(data.code);
    
    // Fill campaign
    await this.campaignInput.fill(data.campaign);
    
    // Fill amount
    await this.amountInput.fill(data.amount.toString());
    
    // Fill max use
    await this.maxUseInput.fill(data.maxUse.toString());
    
    // Fill assign to user
    await this.assignToUserInput.fill(data.assignToUser);
    
    // Handle expires at if provided
    if (data.expiresAt) {
      await this.expiresAtInput.fill(data.expiresAt);
    }
  }

  async selectExpiresAtDate(daysFromNow: number) {
    // Click on expires at input to open date picker
    await this.expiresAtInput.click();
    
    // Calculate target date (days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysFromNow);
    const dayOfMonth = targetDate.getDate();
    
    // Use JavaScript to click on the specific date
    await this.page.evaluate((day) => {
      const dateCells = document.querySelectorAll('.el-date-table-cell');
      dateCells.forEach(cell => {
        const text = cell.textContent?.trim();
        if (text === day.toString()) {
          const span = cell.querySelector('.el-date-table-cell__text') as HTMLElement;
          if (span && span.textContent?.trim() === day.toString()) {
            span.click();
          }
        }
      });
    }, dayOfMonth);
  }

  async submitCreatePromoCodeForm() {
    // Use JavaScript to click submit button to avoid modal overlay issues
    await this.page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const text = button.textContent?.trim();
        if (text === 'Create Promo Code') {
          (button as HTMLElement).click();
        }
      });
    });
  }

  async cancelCreatePromoCodeForm() {
    // Use JavaScript to click cancel button to avoid modal overlay issues
    await this.page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const text = button.textContent?.trim();
        if (text === 'Cancel') {
          (button as HTMLElement).click();
        }
      });
    });
  }

  async getCodeCharacterCount(): Promise<string> {
    return await this.codeCharacterCount.textContent() || '';
  }

  async isFormFieldVisible(fieldName: string): Promise<boolean> {
    switch (fieldName) {
      case 'code':
        return await this.codeInput.isVisible();
      case 'campaign':
        return await this.campaignInput.isVisible();
      case 'amount':
        return await this.amountInput.isVisible();
      case 'maxUse':
        return await this.maxUseInput.isVisible();
      case 'assignToUser':
        return await this.assignToUserInput.isVisible();
      case 'expiresAt':
        return await this.expiresAtInput.isVisible();
      default:
        return false;
    }
  }

  async getFormFieldValue(fieldName: string): Promise<string> {
    switch (fieldName) {
      case 'code':
        return await this.codeInput.inputValue();
      case 'campaign':
        return await this.campaignInput.inputValue();
      case 'amount':
        return await this.amountInput.inputValue();
      case 'maxUse':
        return await this.maxUseInput.inputValue();
      case 'assignToUser':
        return await this.assignToUserInput.inputValue();
      case 'expiresAt':
        return await this.expiresAtInput.inputValue();
      default:
        return '';
    }
  }

  // Promo Codes Table methods
  async getPromoCodesTableRows() {
    return await this.promoCodesTable.locator('tbody tr').all();
  }

  async getPromoCodeByIndex(index: number) {
    const rows = await this.getPromoCodesTableRows();
    if (rows[index]) {
      return {
        code: await rows[index].locator('td').nth(0).textContent(),
        creator: await rows[index].locator('td').nth(1).textContent(),
        amount: await rows[index].locator('td').nth(2).textContent(),
        uses: await rows[index].locator('td').nth(3).textContent(),
        assignedTo: await rows[index].locator('td').nth(4).textContent(),
        campaign: await rows[index].locator('td').nth(5).textContent(),
        createdAt: await rows[index].locator('td').nth(6).textContent(),
        expiresAt: await rows[index].locator('td').nth(7).textContent(),
      };
    }
    return null;
  }

  async searchPromoCode(code: string) {
    // This would need to be implemented based on actual search functionality
    // For now, we'll assume there's a search input
    const searchInput = this.page.locator('input[placeholder*="search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(code);
    }
  }

  // Redeem History Table methods
  async getRedeemHistoryTableRows() {
    return await this.redeemHistoryTable.locator('tbody tr').all();
  }

  async getRedeemHistoryByIndex(index: number) {
    const rows = await this.getRedeemHistoryTableRows();
    if (rows[index]) {
      return {
        code: await rows[index].locator('td').nth(0).textContent(),
        amount: await rows[index].locator('td').nth(1).textContent(),
        redeemedBy: await rows[index].locator('td').nth(2).textContent(),
        campaign: await rows[index].locator('td').nth(3).textContent(),
        attemptedAt: await rows[index].locator('td').nth(4).textContent(),
        redeemedAt: await rows[index].locator('td').nth(5).textContent(),
        status: await rows[index].locator('td').nth(6).textContent(),
      };
    }
    return null;
  }

  // Pagination methods
  async getPromoCodePaginationInfo(): Promise<string> {
    const fullText = await this.promoCodePagination.textContent() || '';
    // Return full text for now, let test handle the validation
    return fullText;
  }

  async getRedeemHistoryPaginationInfo(): Promise<string> {
    const fullText = await this.redeemHistoryPagination.textContent() || '';
    // Return full text for now, let test handle the validation
    return fullText;
  }

  async clickPromoCodePageNumber(pageNumber: number) {
    await this.page.locator(`text=${pageNumber}`).first().click();
  }

  async clickRedeemHistoryPageNumber(pageNumber: number) {
    await this.page.locator(`text=${pageNumber}`).nth(1).click();
  }

  // Filter methods
  async selectDateRange(range: string) {
    await this.dateRangeFilter.click();
    await this.page.locator(`text=${range}`).first().click();
  }

  async selectStatus(status: string) {
    await this.statusFilter.click();
    await this.page.locator(`text=${status}`).first().click();
  }

  async selectCountry(country: string) {
    await this.countryFilter.click();
    await this.page.locator(`text=${country}`).first().click();
  }

  async selectCity(city: string) {
    await this.cityFilter.click();
    await this.page.locator(`text=${city}`).first().click();
  }

  async selectAmountRange(range: string) {
    await this.amountRangeFilter.click();
    await this.page.locator(`text=${range}`).first().click();
  }

  // General methods
  async isPromoCodesPageLoaded(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }

  // Success message verification
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async waitForSuccessMessage(timeout: number = 10000): Promise<void> {
    await this.successMessage.waitFor({ state: 'visible', timeout });
  }

  async isPromoCodesTableVisible(): Promise<boolean> {
    return await this.promoCodesTable.isVisible();
  }

  async isRedeemHistoryTableVisible(): Promise<boolean> {
    return await this.redeemHistoryTable.isVisible();
  }

  async isCreatePromoCodesButtonVisible(): Promise<boolean> {
    return await this.createPromoCodesButton.isVisible();
  }

  async isGenerationHistoryButtonVisible(): Promise<boolean> {
    return await this.generationHistoryButton.isVisible();
  }

  // Validation methods
  async validatePromoCodeData(promoCode: any) {
    const validations = {
      hasCode: !!promoCode.code && promoCode.code.trim() !== '',
      hasCreator: !!promoCode.creator && promoCode.creator.trim() !== '',
      hasAmount: !!promoCode.amount && promoCode.amount.includes('$'),
      hasUses: !!promoCode.uses && promoCode.uses.includes('/'),
      hasCreatedAt: !!promoCode.createdAt && promoCode.createdAt.includes('2025'),
    };
    return validations;
  }

  async validateRedeemHistoryData(redeemHistory: any) {
    const validations = {
      hasCode: !!redeemHistory.code && redeemHistory.code.trim() !== '',
      hasAmount: !!redeemHistory.amount && redeemHistory.amount.includes('$'),
      hasRedeemedBy: !!redeemHistory.redeemedBy && redeemHistory.redeemedBy.includes('@'),
      hasAttemptedAt: !!redeemHistory.attemptedAt && (redeemHistory.attemptedAt.includes('2025') || redeemHistory.attemptedAt.includes('2024') || redeemHistory.attemptedAt.match(/\d{4}-\d{2}-\d{2}/)),
    };
    return validations;
  }
}

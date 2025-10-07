import { Page } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { ADMIN_ENDPOINTS } from "../../constants/admin-endpoints";
import { expect, test as setup } from "@playwright/test";
// Load credentials and login

setup("admin login", async ({ page }: { page: Page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const creds = require('../../fixtures/credential.json');
    await adminLoginPage.visit();
    await adminLoginPage.login(creds.valid.email, creds.valid.password);
    await expect(page).toHaveURL(new RegExp(ADMIN_ENDPOINTS.ADMIN_DASHBOARD), {timeout: 60000});
    await page.context().storageState({ path: '.auth/admin-login.json' });
})

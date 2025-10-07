import { Page } from "@playwright/test";
import { LoginPage } from "../../pages/user/LoginPage";
import { ENDPOINTS } from "../../constants/user-endpoints";
import { expect, test as setup } from "@playwright/test";
// Load credentials and login

setup("login", async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    const creds = require('../../fixtures/credential.json');
    await loginPage.visit();
    await loginPage.login(creds.valid.email, creds.valid.password);
    await loginPage.isLoggedIn(creds.valid.username);
    await expect(page).toHaveURL(new RegExp(ENDPOINTS.SERVERLESS), {timeout: 60000});
    await page.context().storageState({ path: '.auth/user-login.json' });
}) 
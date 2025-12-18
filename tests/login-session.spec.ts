import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MainPage } from '../pages/main.page';

test.describe.parallel('login-session', () => {
    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    let mainPage: MainPage;


    const emailForTests = 'testuser_20251216003309488_6375@example.com';
    const passwordForTests = 'Test@20251216003309';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);

        mainPage = new MainPage(page);
    });

    test('Login_ShouldSucceed', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);

        expect(await mainPage.isCustomerLogged()).toBe(true);
    });

    test('Login_ShouldKeepUserLoggedIn_OnPageReload', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);
        expect(await mainPage.isCustomerLogged()).toBe(true);

        await page.reload();
        expect(await mainPage.isCustomerLogged()).toBe(true);
    });

    test('LoggedInUser_ShouldMatchExpectedAccount', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);
        expect(await mainPage.isCustomerLogged()).toBe(true);

        await mainPage.accountPage.openEditAcountPage();
        expect(await mainPage.accountPage.editAccountPage.getEmailValue()).toBe(emailForTests);
    });
});
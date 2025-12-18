import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MainPage } from '../pages/main.page';
import { generateRandomEmail, generateTestPassword } from '../tests/utils'

test.describe.parallel('registration-login', () => {
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

    test('Registration_ShouldSucceed', async ({ page }) => {
        await registerPage.navigateToRegisterPage();

        const email = generateRandomEmail();
        const password = generateTestPassword();

        await registerPage.registerNewUser(
            'TestFirstName',
            'TestLastName',
            email,
            '1234567890',
            password,
            password,
            true,
            true
        );

        expect(await registerPage.isCustomerCreatedContinueVisible()).toBe(true);
        await expect(page).toHaveURL(RegisterPage.SUCCESS_PAGE_URL);
    });

    test('Registration_ShouldFailEmail_Empty', async () => {
        await registerPage.navigateToRegisterPage();

        const password = generateTestPassword();

        await registerPage.registerNewUser(
            'TestFirstName',
            'TestLastName',
            '',
            '1234567890',
            password,
            password,
            true,
            true
        );

        expect(await registerPage.isEmailErrorMessageVisible()).toBe(true);
    });

    test('Login_ShouldSucceed', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);

        expect(await mainPage.isCustomerLogged()).toBe(true);

        await page.reload();
        expect(await mainPage.isCustomerLogged()).toBe(true);
    });
});

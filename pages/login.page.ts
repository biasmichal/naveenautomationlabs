import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // locators
    private get username(): Locator {
        return this.page.locator('#input-email');
    }

    private get password(): Locator {
        return this.page.locator('#input-password');
    }

    private get loginButton(): Locator {
        return this.page.locator("input[type='submit'][value='Login']");
    }

    // actions
    async enterUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto(
            'https://naveenautomationlabs.com/opencart/index.php?route=account/login'
        );
    }
}

import { Page, Locator } from '@playwright/test';

export class TopNavBar {
    readonly page: Page;

    readonly myAccountLink: Locator;
    readonly loginLink: Locator;
    readonly registerLink: Locator;
    readonly logoutLink: Locator;
    readonly myAccountPageLink: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.myAccountLink = page.locator("a[title='My Account']");
        this.loginLink = page.locator('text=Login');
        this.registerLink = page.locator('text=Register');
        this.logoutLink = page.locator('li > a[href*="logout"]');
        this.myAccountPageLink = page.locator("a[href*='route=account/account']")
        this.shoppingCartLink = this.page.locator('a[title="Shopping Cart"]');

    }

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickLogin(): Promise<void> {
        await this.myAccountLink.click();
        await this.loginLink.click();
    }

    async clickRegister(): Promise<void> {
        await this.myAccountLink.click();
        await this.registerLink.click();
    }

    async navigateToLoginPage(): Promise<void> {
        await this.clickLogin();
    }

    async navigateToRegisterPage(): Promise<void> {
        await this.clickRegister();
    }

    async isLogoutLinkVisible(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async isLoggedIn(): Promise<boolean> {
        await this.myAccountLink.click();
        return await this.logoutLink.isVisible();
    }

    async isMyAccountPageLinkVisible(): Promise<boolean> {
        return await this.myAccountPageLink.isVisible();
    }

    async clickMyAccountPage(): Promise<void> {
        await this.myAccountLink.click();
        await this.myAccountPageLink.click();
    }

    async goToShoppingCart() {
        await this.shoppingCartLink.click();
        await this.page.waitForURL(/route=checkout\/cart/);
    }
}

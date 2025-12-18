import { Page, Locator } from '@playwright/test';
import { EditAccountPage } from './edit-account.page'

export class AccountPage {
    readonly page: Page;
    readonly editAccountPage: EditAccountPage;

    readonly myAccountLinkHeader: Locator;
    readonly editAccountLink: Locator;
    readonly emailInput: Locator;


    constructor(page: Page) {
        this.page = page;
        this.editAccountPage = new EditAccountPage(page);

        this.myAccountLinkHeader = page.locator('#content h2:text("My Account")');
        this.editAccountLink = page.locator('a:text("Edit your account information")');
        this.emailInput = page.locator('#input-email');
    }

    async getEmailValue(): Promise<string> {
        const value = await this.emailInput.inputValue();
        return value;
    }

    async isMyAccountPageVisible(): Promise<boolean> {
        return await this.myAccountLinkHeader.isVisible()
    }

    async openEditAcountPage(): Promise<void> {
        await this.editAccountLink.click();
    }
}

import { Page, Locator } from '@playwright/test';

export class EditAccountPage {
    readonly page: Page;

    readonly email: Locator;

    constructor(page: Page) {
        this.page = page;

        this.email = page.locator('#input-email');
    }

    async getEmailValue(): Promise<string> {
        return this.email.inputValue();
    }
}

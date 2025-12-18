import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ===== locators =====

    private get firstName(): Locator {
        return this.page.locator('#input-firstname');
    }

    private get lastName(): Locator {
        return this.page.locator('#input-lastname');
    }

    private get email(): Locator {
        return this.page.locator('#input-email');
    }

    private get emailErrorMessage(): Locator {
        return this.page.locator('#input-email + div.text-danger');
    }

    private get telephone(): Locator {
        return this.page.locator('#input-telephone');
    }

    private get password(): Locator {
        return this.page.locator('#input-password');
    }

    private get confirmPassword(): Locator {
        return this.page.locator('#input-confirm');
    }

    private get subscribeYes(): Locator {
        return this.page.locator("input[name='newsletter'][value='1']");
    }

    private get subscribeNo(): Locator {
        return this.page.locator("input[name='newsletter'][value='0']");
    }

    private get privacyPolicyCheckbox(): Locator {
        return this.page.locator("input[name='agree']");
    }

    private get continueButton(): Locator {
        return this.page.locator('text=Continue');
    }

    private get customerCreatedContinue(): Locator {
        return this.page.locator(
            'div.buttons div.pull-right a.btn.btn-primary',
            { hasText: 'Continue' }
        );
    }

    // ===== constants =====

    static readonly SUCCESS_PAGE_URL =
        'https://naveenautomationlabs.com/opencart/index.php?route=account/success';

    // ===== actions =====

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async enterTelephone(telephone: string): Promise<void> {
        await this.telephone.fill(telephone);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPassword.fill(confirmPassword);
    }

    async selectSubscribe(subscribe: boolean): Promise<void> {
        subscribe
            ? await this.subscribeYes.check()
            : await this.subscribeNo.check();
    }

    async acceptPrivacyPolicy(check: boolean): Promise<void> {
        check
            ? await this.privacyPolicyCheckbox.check()
            : await this.privacyPolicyCheckbox.uncheck();
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    // ===== assertions / state =====

    async isCustomerCreatedContinueVisible(): Promise<boolean> {
        return await this.customerCreatedContinue.isVisible();
    }

    async isEmailErrorMessageVisible(): Promise<boolean> {
        return await this.emailErrorMessage.isVisible();
    }

    // ===== flows =====

    async registerNewUser(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        confirmPassword: string,
        subscribe: boolean,
        policy: boolean
    ): Promise<void> {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterTelephone(telephone);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.selectSubscribe(subscribe);
        await this.acceptPrivacyPolicy(policy);
        await this.clickContinueButton();
    }

    async navigateToRegisterPage(): Promise<void> {
        await this.page.goto(
            'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
        );
    }
}

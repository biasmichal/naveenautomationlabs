import { Page, Locator, expect } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly cartRows: Locator;
    readonly totalPriceCell: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartRows = this.page.locator('#content table tbody tr');
        this.totalPriceCell = page.locator('div.row div.col-sm-4.col-sm-offset-8 table tr:last-child td:last-child');
    }

    async getCartQuantity(): Promise<number> {
        const qtyInputs = this.page.locator('#content table tbody tr input[name^="quantity"]');
        const count = await qtyInputs.count();
        let totalQuantity = 0;

        for (let i = 0; i < count; i++) {
            const value = await qtyInputs.nth(i).inputValue();
            totalQuantity += Number(value);
        }

        return totalQuantity;
    }

    async getTotalPrice(): Promise<string> {
        return (await this.totalPriceCell.textContent())?.trim() ?? '';
    }

    async goToCheckout() {
        await this.page.locator('a.btn-primary:has-text("Checkout")').click();
        await this.page.waitForURL('**/route=checkout/checkout');
    }

    async continueShopping() {
        await this.page.locator('a.btn-default:has-text("Continue Shopping")').click();
        await this.page.waitForURL('**/route=common/home');
    }

    getProductRowByName(productName: string): Locator {
        return this.cartRows.filter({ hasText: productName });
    }

    async getProductQuantityByName(productName: string): Promise<number> {
        const row = this.getProductRowByName(productName);
        const qtyInput = await row.locator('input[name^="quantity"]').inputValue();
        return Number(qtyInput);
    }

    async getProductPriceByName(productName: string): Promise<string> {
        const row = this.getProductRowByName(productName);
        return (await row.locator('td.text-right').nth(0).textContent())?.trim() ?? '';
    }

    async removeAllProducts() {
        const count = await this.cartRows.count();
        for (let i = 0; i < count; i++) {
            const row = this.cartRows.nth(0);
            const removeButton = row.locator('button.btn-danger');
            await removeButton.click();
            await expect(row).toHaveCount(0);
        }
    }
}
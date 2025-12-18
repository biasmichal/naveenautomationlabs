import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;

    readonly productTitle: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly addToCartButton: Locator;
    readonly infoAlert: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productTitle = page.locator('#content h1');
        this.price = page.locator('ul.list-unstyled h2');
        this.availability = page.locator('li:has-text("Availability")');
        this.addToCartButton = page.locator('#button-cart');
        this.infoAlert = page.locator('.alert-info');
    }

    async isProductVisible(expectedProductName?: string): Promise<boolean> {
        try {
            if (!(await this.productTitle.isVisible())) {
                return false;
            }

            if (expectedProductName) {
                const text = await this.productTitle.textContent();
                return text?.trim() === expectedProductName;
            }

            return true;
        } catch {
            return false;
        }
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}

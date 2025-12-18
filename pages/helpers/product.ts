import { Page, Locator, expect} from '@playwright/test';


export class Product {
    private root: Locator;
    readonly page: Page;
    constructor(root: Locator) {
        this.root = root;
        this.page = root.page();
    }

    async getName(): Promise<string> {
        return (await this.root.locator('h4 a').textContent())?.trim() ?? '';
    }

    async getPrice(): Promise<number> {
            const priceRoot = this.root.locator('.price');

            if(await priceRoot.locator('.price-new').count() > 0) {
            return await this.parsePrice(
                await priceRoot.locator('.price-new').textContent()
            );
        }

        const priceText = await priceRoot.evaluate(el => el.childNodes[0].textContent ?? '');
        return this.parsePrice(priceText);
    }

    private parsePrice(priceText: string | null): number {
        if (!priceText) {
            throw new Error('Price text is empty');
        }

        const match = priceText.match(/\$[\d,]+\.\d{2}/);
        if (!match) {
            throw new Error(`Cannot parse price from: ${priceText}`);
        }

        return Number(
            match[0]
                .replace('$', '')
                .replace(',', '')
        );
    }

    async getDescription(): Promise<string> {
        return (await this.root.locator('.caption p').first().textContent())?.trim() ?? '';
    }

    async getLink(): Promise<string> {
        return (await this.root.locator('h4 a').getAttribute('href')) ?? '';
    }

    async addToCart(): Promise<void> {
        await this.root.locator('button[onclick^="cart.add"]').click();

        const cartTotal = this.page.locator('#cart-total');
        await expect(cartTotal).not.toHaveText('0 item(s) - $0.00');
    }

    async addToWishlist(): Promise<void> {
        await this.root.locator('button[onclick^="wishlist.add"]').click();
    }

    async addToCompare(): Promise<void> {
        await this.root.locator('button[onclick^="compare.add"]').click();
    }

    async openProduct(): Promise<string> {
        const name = await this.getName();
        await Promise.all([
            this.root.locator('h4 a').click(),
            this.page.waitForURL(/product_id=/)
        ]);
        return name;
    }
}
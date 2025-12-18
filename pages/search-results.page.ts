import { Page, Locator } from '@playwright/test';
import { Product } from './helpers/product';

export class SearchResultsPage {
    readonly page: Page;
    readonly searchCriteriaTextBox: Locator;
    readonly searchInDescriptionCheckbox: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchCriteriaTextBox = page.locator('#input-search');
        this.searchInDescriptionCheckbox = page.locator('#description');
        this.productItems = page.locator('.product-layout');
    }
          
    async setSearchCriteria(searchText: string): Promise<void> {
        await this.searchCriteriaTextBox.fill(searchText);
    }

    async enableSearchInDescription(): Promise<void> {
        if (!(await this.searchInDescriptionCheckbox.isChecked())) {
            await this.searchInDescriptionCheckbox.check();
        }
    }

    async disableSearchInDescription(): Promise<void> {
        if (await this.searchInDescriptionCheckbox.isChecked()) {
            await this.searchInDescriptionCheckbox.uncheck();
        }
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    getProductByIndex(index: number): Product {
        const productLocator = this.productItems.nth(index);
        return new Product(productLocator);
    }

    async getAllProducts(): Promise<Product[]> {
        const count = await this.getProductCount();
        const products: Product[] = [];
        for (let i = 0; i < count; i++) {
            products.push(this.getProductByIndex(i));
        }
        return products;
    }
}

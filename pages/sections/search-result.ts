import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    readonly searchCriteriaTextBox: Locator;
    readonly searchInDescriptionCheckbox: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchCriteriaTextBox = page.locator('#input-search')
        this.searchInDescriptionCheckbox = page.locator('#description');
        this.productItems = page.locator('.product-layout');

    }

    async setSearchCriteria(searchText: string): Promise<void> {
        await this.searchCriteriaTextBox.fill(searchText);
    }

    async enableSearchInDescription(): Promise<void> {
        const isChecked = await this.searchInDescriptionCheckbox.isChecked();
        if (!isChecked) {
            await this.searchInDescriptionCheckbox.check();
        }
    }

    async disableSearchInDescription(): Promise<void> {
        const isChecked = await this.searchInDescriptionCheckbox.isChecked();
        if (isChecked) {
            await this.searchInDescriptionCheckbox.uncheck();
        }
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    getProductByIndex(index: number): Locator {
        return this.productItems.nth(index);
    }
}

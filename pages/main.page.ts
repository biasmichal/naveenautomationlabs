import { Page, Locator } from '@playwright/test';
import { TopNavBar } from './sections/top-nav-bar';
import { AccountPage } from './account.page'
import { SearchResultsPage } from './sections/search-result';
import { ProductDetailsPage } from './product-details.page';

export class MainPage {
    readonly page: Page;
    readonly topNavBar: TopNavBar;
    readonly accountPage: AccountPage;
    readonly searchResultsPage: SearchResultsPage;
    readonly ProductDetailPage: ProductDetailsPage;

    readonly searchTextBox: Locator;
    readonly searchButton: Locator;
    readonly sortBySelect: Locator;
    readonly desktopsMenu: Locator;
    readonly showAllDesktops: Locator;
    readonly cartTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.topNavBar = new TopNavBar(page);
        this.accountPage = new AccountPage(page)
        this.searchResultsPage = new SearchResultsPage(page);
        this.ProductDetailPage = new ProductDetailsPage(page);

        this.searchTextBox = page.locator('input[name="search"]');
        this.searchButton = page.locator('button:has(i.fa-search)');
        this.sortBySelect = page.locator('#input-sort');
        this.desktopsMenu = page.locator('a.see-all', { hasText: 'Show All Desktops' });
        this.showAllDesktops = page.locator('ul.navbar-nav > li.dropdown > a', { hasText: 'Desktops' });
        this.cartTotal = page.locator('#cart-total');

    }

    async isCustomerLogged(): Promise<boolean> {
        return await this.topNavBar.isLoggedIn();
    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    async enterSearchText(searchText: string): Promise<void> {
        await this.searchTextBox.fill(searchText);
    }

    async selectSortOption(optionText: string): Promise<void> {
        await this.sortBySelect.selectOption({ label: optionText });
    }

    async showAllDesktopsResuts(): Promise<void>{
        await this.showAllDesktops.hover();
        await this.desktopsMenu.click();
        await this.page.waitForURL(/route=product\/category/);
    }

    async getBasketQuantity(): Promise<number> {
        const text = await this.cartTotal.innerText();
        const itemsPart = text.split(' - ')[0];
        return parseInt(itemsPart);
    }

    async getTotalPrice(): Promise<number> {
        const text = await this.page.locator('#cart-total').textContent() ?? '';
        const match = text.match(/\$([\d,]+\.\d{2})/);
        if (!match) throw new Error(`Cannot parse total price from: ${text}`);
        return Number(match[1].replace(',', ''));
    }

}
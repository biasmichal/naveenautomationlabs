import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MainPage } from '../pages/main.page';
import { SearchResultsPage } from '../pages/search-results.page';

test.describe.parallel('search-producta', () => {
    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    let mainPage: MainPage;

    const emailForTests = 'testuser_20251216003309488_6375@example.com';
    const passwordForTests = 'Test@20251216003309';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);

        mainPage = new MainPage(page);
    });

    test('SearchResults_ShouldSortProductsByPrice', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);

        await mainPage.enterSearchText('macbook');
        await mainPage.clickSearchButton();

        await page.waitForSelector('.product-layout');

        const searchResults = new SearchResultsPage(page);

        expect(await searchResults.getProductCount()).toBe(3);

        let product = await searchResults.getProductByIndex(0);
        let firstProductName = await product.getName();

        expect(firstProductName).toBe('MacBook')

        let coount = await searchResults.getProductCount();

        expect(coount).toBe(3);

        await mainPage.selectSortOption('Price (High > Low)');

        product = await searchResults.getProductByIndex(0);
        firstProductName = await product.getName();
        let secondProduct = await searchResults.getProductByIndex(1);

        let price1 = await product.getPrice();
        let price2 = await secondProduct.getPrice();
        
        expect(firstProductName).toBe('MacBook Pro');
        expect(await product.getPrice()).toBeGreaterThanOrEqual(await secondProduct.getPrice());
    });

    test('ViewProduct_ShouldOpenProductDetails', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(emailForTests, passwordForTests);

        await mainPage.showAllDesktopsResuts();
        const searchResults = new SearchResultsPage(page);

        expect(await searchResults.getProductCount()).toBeGreaterThan(0);
        const product = await searchResults.getProductByIndex(0);
        const productName = await product.openProduct();

        expect(await mainPage.ProductDetailPage.isProductVisible('Apple Cinema 30"')).toBe(true);
    });


});
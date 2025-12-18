import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MainPage } from '../pages/main.page';
import { SearchResultsPage } from '../pages/search-results.page';
import { ShoppingCartPage } from '../pages/shopping-card.page'; 
import { generateRandomEmail, generateTestPassword } from '../tests/utils'

test.describe.parallel('add-to-card', () => {
    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    let mainPage: MainPage;
    let searchResultsPage: SearchResultsPage;
    let shoppingCartPage: ShoppingCartPage;

    const emailForTests = 'testuser_20251216003309488_6375@example.com';
    const passwordForTests = 'Test@20251216003309';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        mainPage = new MainPage(page);
        searchResultsPage = new SearchResultsPage(page);
        shoppingCartPage = new ShoppingCartPage(page);
    });

    test('AddSingleProductToCart_ShouldUpdateBasketCorrectly', async ({ page }) => {
        await registerPage.navigateToRegisterPage();

        const email = generateRandomEmail();
        const password = generateTestPassword();

        await registerPage.registerNewUser(
            'TestFirstName',
            'TestLastName',
            email,
            '1234567890',
            password,
            password,
            true,
            true
        );

        await mainPage.enterSearchText('macbook');
        await mainPage.clickSearchButton();

        await page.waitForSelector('.product-layout');

        const searchResults = new SearchResultsPage(page);

        expect(await searchResults.getProductCount()).toBe(3);

        let product = await searchResults.getProductByIndex(0);

        await product.addToCart();
        expect(await mainPage.getBasketQuantity()).toBe(1);

        expect(await mainPage.getTotalPrice()).toBe(await product.getPrice());

        await mainPage.topNavBar.goToShoppingCart();

        const cartPage = new ShoppingCartPage(page);

        expect(await cartPage.getCartQuantity()).toBe(1);

        const macbookRow = cartPage.getProductRowByName('MacBook');
        expect(await macbookRow.count()).toBe(1);

    });

    test('AddMultipleProductsToCard_ShouldUpdateBasketCorrectly', async ({ page }) => {
        await registerPage.navigateToRegisterPage();

        const email = generateRandomEmail();
        const password = generateTestPassword();

        await registerPage.registerNewUser(
            'TestFirstName',
            'TestLastName',
            email,
            '1234567890',
            password,
            password,
            true,
            true
        );

        await mainPage.enterSearchText('macbook');
        await mainPage.clickSearchButton();

        await page.waitForSelector('.product-layout');

        const searchResults = new SearchResultsPage(page);

        expect(await searchResults.getProductCount()).toBe(3);

        let product = await searchResults.getProductByIndex(0);

        await product.addToCart();
        expect(await mainPage.getBasketQuantity()).toBe(1);

        let macbookPrice = await product.getPrice();

        expect(await mainPage.getTotalPrice()).toBe(await product.getPrice());

        await mainPage.topNavBar.goToShoppingCart();

        const cartPage = new ShoppingCartPage(page);

        expect(await cartPage.getCartQuantity()).toBe(1);

        const macbookRow = cartPage.getProductRowByName('MacBook');
        expect(await macbookRow.count()).toBe(1);

        await mainPage.enterSearchText('sony');
        await mainPage.clickSearchButton();

        expect(await searchResults.getProductCount()).toBe(1);

        let product2 = await searchResults.getProductByIndex(0);
        let sonyPrice = await product2.getPrice();
        await product2.addToCart();
        expect(await mainPage.getBasketQuantity()).toBe(2);

        expect(await mainPage.getTotalPrice()).toBe(macbookPrice + sonyPrice);

        await mainPage.topNavBar.goToShoppingCart();

        const sonyRow = cartPage.getProductRowByName('Sony VAIO');
        expect(await sonyRow.count()).toBe(1);

    });
});
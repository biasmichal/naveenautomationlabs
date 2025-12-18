Test Structure:

Tests are separated into different files, each test uses beforeEach to create instances of pages (LoginPage, RegisterPage, MainPage, etc.), ensuring a fresh environment for each test. Tests are organized using the Page Object Model (POM) for better readability and maintainability.

Test Data Generation:

Emails and passwords are generated dynamically in utils.ts to ensure uniqueness and avoid registration conflicts.

Assumptions:

Tests assume that the server and database are reset or in a fresh state for each run to avoid conflicts with existing users.
Prices and demo product values are static and do not change dynamically during the tests.
The site has stable CSS selectors that do not change frequently.
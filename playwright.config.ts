import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // <--- tutaj folder z testami
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://naveenautomationlabs.com/opencart',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          slowMo: 200
        },
      },
    },
  ],
});

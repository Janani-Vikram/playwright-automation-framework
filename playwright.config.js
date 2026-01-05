// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.js',
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
});

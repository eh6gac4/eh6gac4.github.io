import { test, expect } from '@playwright/test';

// パスワードオーバーレイをスキップするヘルパー
async function skipPassword(page: import('@playwright/test').Page) {
  await page.evaluate(() => sessionStorage.setItem('fc_auth', 'true'));
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
});

test.describe('milk-web works page', () => {
  test('full page snapshot', async ({ page }) => {
    await page.goto('/works/milk-web');
    await skipPassword(page);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('milk-web.png', { fullPage: true });
  });
});

test.describe('milk-no42 works page (editorial layout)', () => {
  test('full page snapshot', async ({ page }) => {
    await page.goto('/works/milk-no42');
    await skipPassword(page);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('milk-no42.png', { fullPage: true });
  });
});

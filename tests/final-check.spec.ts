import { test } from '@playwright/test';

async function bypass(page: import('@playwright/test').Page, path: string) {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.setItem('fc_auth', 'true'));
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

const pages = [
  { name: 'index', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'works-milk-no51', path: '/works/milk-no51' },
  { name: 'works-milk-no42', path: '/works/milk-no42' },
  { name: 'works-milk-web', path: '/works/milk-web' },
  { name: 'works-udg', path: '/works/udg' },
];

for (const { name, path } of pages) {
  test(`final: ${name}`, async ({ page }, testInfo) => {
    await bypass(page, path);
    const project = testInfo.project.name;
    await page.screenshot({
      path: `test-results/final-${project}-${name}.png`,
      fullPage: true,
    });
  });
}

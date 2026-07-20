/**
 * スマホレイアウト重点チェック
 * `npx playwright test mobile-check --project=mobile` で実行
 *
 * 主な確認ポイント:
 * 1. 横方向オーバーフロー（全ページ）
 * 2. ヘッダーのサブタイトルとハンバーガーの衝突
 * 3. ハンバーガーメニューの開閉
 * 4. 作品一覧グリッド（1カラム切替）
 * 5. 作品詳細ヘッダー（flex space-between にモバイル MQ なし）
 * 6. エディトリアル作品詳細
 * 7. Web レイアウト作品（picture 要素の mobile 画像切替）
 * 8. パスワードオーバーレイ
 * 9. About ページ
 */

import { test, expect } from '@playwright/test';

// このファイルはモバイルレイアウト専用。mobile プロジェクト以外ではスキップする。
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only checks');
});

async function skipPassword(page: import('@playwright/test').Page) {
  await page.evaluate(() => sessionStorage.setItem('fc_auth', 'true'));
}

/** ページの横スクロールバーが出ていないか検証 */
async function checkNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow, 'horizontal overflow detected').toBe(false);
}

// ─────────────────────────────────────────────────────────────────
// 1. パスワードオーバーレイ（バイパス無し）
// ─────────────────────────────────────────────────────────────────
test('1. password overlay — centered and no overflow', async ({ page }) => {
  await page.goto('/');
  // セッションをクリアして確実にオーバーレイを表示
  await page.evaluate(() => sessionStorage.removeItem('fc_auth'));
  await page.reload();
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-01-password-overlay.png', fullPage: true });

  // オーバーレイが表示されているか
  const overlay = page.locator('#pw-overlay');
  await expect(overlay).toBeVisible();

  // 横はみ出しなし
  await checkNoHorizontalOverflow(page);

  // input が viewport 内に収まっているか
  const input = page.locator('#pw-input');
  const inputBox = await input.boundingBox();
  const viewportWidth = page.viewportSize()!.width;
  expect(inputBox!.x, 'input left edge out of viewport').toBeGreaterThanOrEqual(0);
  expect(inputBox!.x + inputBox!.width, 'input right edge out of viewport').toBeLessThanOrEqual(viewportWidth);
});

// ─────────────────────────────────────────────────────────────────
// 2. TOP ページ — ヘッダー＋一覧グリッド
// ─────────────────────────────────────────────────────────────────
test('2. index — no overflow, header subtext vs hamburger, 1-col grid', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-02-index-top.png' });
  await page.screenshot({ path: 'test-results/mobile-02-index-full.png', fullPage: true });

  // 横はみ出しなし
  await checkNoHorizontalOverflow(page);

  const viewportWidth = page.viewportSize()!.width;

  // ── ヘッダーのサブタイトルテキストがハンバーガーと重なっていないか ──
  // header 要素のボックスは full-width になるので、実際のテキストで計測する
  const subtitle = page.locator('header .header-left p').first();
  const h1 = page.locator('header h1').first();
  const hamburger = page.locator('.hamburger');
  const hamburgerBox = await hamburger.boundingBox();

  const subtitleBox = await subtitle.boundingBox();
  const h1Box = await h1.boundingBox();

  if (subtitleBox && hamburgerBox) {
    const isOverlapping = !(
      subtitleBox.x + subtitleBox.width <= hamburgerBox.x ||
      hamburgerBox.x + hamburgerBox.width <= subtitleBox.x ||
      subtitleBox.y + subtitleBox.height <= hamburgerBox.y ||
      hamburgerBox.y + hamburgerBox.height <= subtitleBox.y
    );
    expect(isOverlapping, `subtitle text overlaps hamburger`).toBe(false);
  }
  if (h1Box && hamburgerBox) {
    const isOverlapping = !(
      h1Box.x + h1Box.width <= hamburgerBox.x ||
      hamburgerBox.x + hamburgerBox.width <= h1Box.x ||
      h1Box.y + h1Box.height <= hamburgerBox.y ||
      hamburgerBox.y + hamburgerBox.height <= h1Box.y
    );
    expect(isOverlapping, `h1 text overlaps hamburger`).toBe(false);
  }

  // ── グリッドが 1 カラムになっているか ──
  const gridItems = page.locator('.work-item');
  const count = await gridItems.count();
  if (count >= 2) {
    const first = await gridItems.nth(0).boundingBox();
    const second = await gridItems.nth(1).boundingBox();
    if (first && second) {
      expect(
        second.y,
        '2nd grid item should be BELOW 1st (1-column layout)'
      ).toBeGreaterThan(first.y + first.height / 2);
    }
  }
});

// ─────────────────────────────────────────────────────────────────
// 3. ハンバーガーメニュー — 開閉
// ─────────────────────────────────────────────────────────────────
test('3. hamburger menu — open and close', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const hamburger = page.locator('.hamburger');
  const mobileMenu = page.locator('.mobile-menu');

  // 初期: メニュー非表示
  await expect(mobileMenu).not.toHaveClass(/is-open/);

  // 開く
  await hamburger.click();
  await page.screenshot({ path: 'test-results/mobile-03-menu-open.png' });
  await expect(mobileMenu).toHaveClass(/is-open/);
  await expect(page.locator('.mobile-menu a').first()).toBeVisible();

  // 閉じる
  await hamburger.click();
  await page.screenshot({ path: 'test-results/mobile-03-menu-closed.png' });
  await expect(mobileMenu).not.toHaveClass(/is-open/);
});

// ─────────────────────────────────────────────────────────────────
// 4. 作品詳細ヘッダー — flex space-between のモバイル崩れ
//    (close-btn + ハンバーガー との重なりも確認)
// ─────────────────────────────────────────────────────────────────
test('4. work detail header — no overflow, title vs date layout', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  // milk-no42 には date: '2021.04' がある（milk-no51 には date フィールドなし）
  await page.goto('/works/milk-no42');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-04-detail-header.png', fullPage: true });

  await checkNoHorizontalOverflow(page);

  // ── タイトルと日付が縦にスタックしているか、横並びで窮屈でないか ──
  const title = page.locator('.work-detail-title');
  const pagination = page.locator('.work-detail-pagination');
  const titleBox = await title.boundingBox();
  const paginBox = await pagination.boundingBox();

  if (titleBox && paginBox) {
    // 日付の右端が viewport を超えていないか
    const viewportWidth = page.viewportSize()!.width;
    expect(
      paginBox.x + paginBox.width,
      'pagination right edge overflows viewport'
    ).toBeLessThanOrEqual(viewportWidth + 1);

    // タイトルと日付が重なっていないか
    const isOverlapping = !(
      titleBox.x + titleBox.width <= paginBox.x ||
      paginBox.x + paginBox.width <= titleBox.x ||
      titleBox.y + titleBox.height <= paginBox.y ||
      paginBox.y + paginBox.height <= titleBox.y
    );
    expect(isOverlapping, `title overlaps pagination`).toBe(false);
  }
});

// ─────────────────────────────────────────────────────────────────
// 5. エディトリアル作品 — hero + サブ画像グリッド 1 カラム
// ─────────────────────────────────────────────────────────────────
test('5. editorial works — no overflow, 1-col sub-image grid', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/works/milk-no51');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-05-editorial-full.png', fullPage: true });

  await checkNoHorizontalOverflow(page);

  // サブ画像が 1 カラム（縦並び）になっているか
  const subImages = page.locator('.work-detail-sub');
  const count = await subImages.count();
  if (count >= 2) {
    const first = await subImages.nth(0).boundingBox();
    const second = await subImages.nth(1).boundingBox();
    if (first && second) {
      expect(
        second.y,
        '2nd sub-image should be BELOW 1st (1-column layout)'
      ).toBeGreaterThan(first.y + first.height / 2);
    }
  }
});

// ─────────────────────────────────────────────────────────────────
// 6. Web レイアウト作品 (milk-web) — mobile 画像切替＋hero 幅
// ─────────────────────────────────────────────────────────────────
test('6. milk-web — mobile image loaded, no overflow', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/works/milk-web');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-06-milk-web-full.png', fullPage: true });

  await checkNoHorizontalOverflow(page);

  // picture 要素の img が viewport 幅に収まっているか
  const webImg = page.locator('.work-web-image img');
  const imgBox = await webImg.boundingBox();
  if (imgBox) {
    const viewportWidth = page.viewportSize()!.width;
    expect(imgBox.width, 'work-web-image img too wide').toBeLessThanOrEqual(viewportWidth + 1);
  }
});

// ─────────────────────────────────────────────────────────────────
// 7. Web レイアウト作品 (udg) — hero + picture
// ─────────────────────────────────────────────────────────────────
test('7. udg — hero width 100%, no overflow', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/works/udg');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-07-udg-full.png', fullPage: true });

  await checkNoHorizontalOverflow(page);

  // hero (.work-web-hero img) が viewport 幅 ≒ 100% になっているか
  const heroImg = page.locator('.work-web-hero img');
  const heroBox = await heroImg.boundingBox();
  if (heroBox) {
    const viewportWidth = page.viewportSize()!.width;
    // 左右パディング 24px × 2 = 48px 引いたもの程度の幅になるはず
    const expectedMinWidth = viewportWidth - 48 - 10; // 10px バッファ
    expect(heroBox.width, 'hero img width should expand to near full width on mobile').toBeGreaterThan(expectedMinWidth);
  }
});

// ─────────────────────────────────────────────────────────────────
// 8. About ページ
// ─────────────────────────────────────────────────────────────────
test('8. about — no overflow, full page screenshot', async ({ page }) => {
  await page.goto('/');
  await skipPassword(page);
  await page.goto('/about');
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'test-results/mobile-08-about-full.png', fullPage: true });

  await checkNoHorizontalOverflow(page);
});

// ─────────────────────────────────────────────────────────────────
// 9. 作品詳細 — 全スラッグで横オーバーフロー一括チェック
// ─────────────────────────────────────────────────────────────────
const allSlugs = [
  'milk-no51', 'milk-no50', 'milk-no49', 'milk-no48',
  'milk-no44', 'milk-no43', 'milk-no42',
  'milk-web', 'udg',
  'milk-no41', 'milk-no40', 'milk-no39',
];

for (const slug of allSlugs) {
  test(`9. overflow check: /works/${slug}`, async ({ page }) => {
    await page.goto('/');
    await skipPassword(page);
    await page.goto(`/works/${slug}`);
    await page.waitForLoadState('networkidle');
    await checkNoHorizontalOverflow(page);
  });
}

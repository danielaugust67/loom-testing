import { test, expect } from '@playwright/test';

test.describe('Category Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app/categories');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Melihat daftar semua kategori', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Kategori' })).toBeVisible();
    });

    test('Melihat thread per kategori', async ({ page }) => {
        const categoryLink = page.locator('a[href^="/categories/"]').first();
        if (await categoryLink.count() > 0) {
            await categoryLink.click();
            await expect(page).toHaveURL(/.*categories\/.*/);
        }
    });

    test('Filter thread berdasarkan kategori dari Beranda', async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
        const filterCategory = page.locator('a[href^="/categories/"]').first();
        if (await filterCategory.count() > 0) {
            await filterCategory.click();
            await expect(page).toHaveURL(/.*categories\/.*/);
        }
    });
});

import { test, expect } from '@playwright/test';

test.describe('Search Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Mencari thread melalui search bar', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Cari', { exact: false }).first();
        if (await searchInput.count() > 0) {
            await searchInput.fill('Playwright');
            await searchInput.press('Enter');
            
            await expect(page).toHaveURL(/.*search.*/);
        }
    });

    test('Pencarian dengan kata yang tidak ada', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Cari', { exact: false }).first();
        if (await searchInput.count() > 0) {
            await searchInput.fill('xyz123randomwordthatdoesnotexist');
            await searchInput.press('Enter');
            
            await expect(page).toHaveURL(/.*search.*/);
        }
    });
});

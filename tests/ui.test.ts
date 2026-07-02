import { test, expect } from '@playwright/test';

test.describe('UI and Misc Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Dark Mode / Light Mode toggle', async ({ page }) => {
        const themeToggle = page.getByRole('button', { name: 'Toggle theme', exact: false }).first();
        if (await themeToggle.count() > 0) {
            await themeToggle.click();
            
        }
    });

    test('Halaman 404 untuk URL tidak valid', async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app/url-yang-pasti-tidak-ada-12345');
    });

    test('Responsive layout di mobile (layar kecil)', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        
    });
});

import { test, expect } from '@playwright/test';

test.describe('Bookmark Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Bookmark sebuah thread dari Beranda', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        const bookmarkBtn = page.getByRole('button', { name: 'Bookmark' }).first();
        if (await bookmarkBtn.count() > 0) {
            await bookmarkBtn.click();
        }
    });

    test('Hapus bookmark dari Beranda', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        const removeBookmarkBtn = page.getByRole('button', { name: 'Remove bookmark' }).or(page.getByRole('button', { name: 'Hapus dari bookmark' })).first();
        if (await removeBookmarkBtn.count() > 0) {
            await removeBookmarkBtn.click();
        }
    });

    test('Melihat daftar thread yang di-bookmark', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('link', { name: 'Bookmark', exact: true }).click();
        await expect(page.getByRole('heading', { level: 1, name: 'Tersimpan' })).toBeVisible();
    });

    test('Halaman bookmark kosong jika belum ada', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('link', { name: 'Bookmark', exact: true }).click();
    });
});

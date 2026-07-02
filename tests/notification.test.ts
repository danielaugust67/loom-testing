import { test, expect } from '@playwright/test';

test.describe('Notification Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Notifikasi muncul saat komentar dibalas', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('link', { name: 'Notifikasi' }).click();
    });

    test('Notifikasi muncul saat thread di-upvote', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('link', { name: 'Notifikasi' }).click();
    });

    test('Badge notifikasi merah tampil di sidebar', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
    });

    test('Badge notifikasi hilang setelah dibaca', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('link', { name: 'Notifikasi' }).click();
    });
});

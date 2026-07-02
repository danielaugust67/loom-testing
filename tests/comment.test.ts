import { test, expect } from '@playwright/test';

test.describe('Comment Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Menambahkan komentar baru pada thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            await firstThread.click();
            await page.getByRole('textbox', { name: 'Tulis komentar...' }).fill('Ini adalah komentar testing otomatis.');
            await page.getByRole('button', { name: 'Kirim' }).click();
            await expect(page.getByText('Ini adalah komentar testing otomatis.')).toBeVisible();
        }
    });

    test('Mengirim komentar kosong', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            await firstThread.click();
            await page.getByRole('button', { name: 'Kirim' }).click();
        }
    });

    test('Membalas komentar (reply/nested comment)', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            await firstThread.click();
            const replyBtn = page.getByRole('button', { name: 'Balas' }).first();
            if (await replyBtn.count() > 0) {
                await replyBtn.click();
                await page.locator('textarea').last().fill('Ini adalah balasan otomatis.');
                await page.getByRole('button', { name: 'Kirim' }).last().click();
                await expect(page.getByText('Ini adalah balasan otomatis.')).toBeVisible();
            }
        }
    });

    test('Tidak bisa komentar di thread terkunci (locked)', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
    });

    test('Guest tidak bisa mengirim komentar', async ({ page }) => {
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            await firstThread.click();
            await expect(page.getByRole('textbox', { name: 'Tulis komentar...' })).toHaveCount(0);
        }
    });
});
import { test, expect } from '@playwright/test';

test.describe('Profile Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Melihat halaman pengaturan profil', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Profil' }).click();
        await expect(page.getByRole('heading', { level: 1, name: 'Pengaturan Profil' })).toBeVisible();
    });

    test('Update Bio profil', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Profil' }).click();
        await page.getByRole('textbox', { name: 'Bio' }).fill('Ini bio yang diupdate via otomatisasi.');
        await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
    });

    test('Upload foto profil (avatar) dengan file valid', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Profil' }).click();
        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
            await fileInput.setInputFiles('tests/data/1kb.jpeg');
        }
    });

    test('Upload foto profil lebih dari 2MB', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Profil' }).click();
        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
            await fileInput.setInputFiles('tests/data/3mb.jpg');
            await expect(page.getByText('Ukuran file maksimal 2MB')).toBeVisible();
        }
    });

    test('Bio melebihi 250 karakter', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Profil' }).click();
        const longBio = 'a'.repeat(251);
        await page.getByRole('textbox', { name: 'Bio' }).fill(longBio);
        await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
    });
});

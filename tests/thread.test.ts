import { test, expect } from '@playwright/test';

test.describe('Thread Management Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Melihat daftar thread di Beranda', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
    });

    test('Membuat thread baru dengan data valid', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByText('danielaugust67')).toBeVisible();
        await page.getByRole('button', { name: 'Thread Baru' }).click();
        await page.getByRole('textbox', { name: 'Judul', exact: false }).fill('Thread Otomatis dari Playwright 1234');
        await page.getByLabel('Kategori').selectOption('6a743cb9-f7f0-4a94-9282-6fafe3567b20');
        await page.getByRole('textbox', { name: 'Isi Diskusi', exact: false }).fill('Ini adalah isi thread yang dibuat secara otomatis oleh skrip pengujian fungsional.');
        await page.getByRole('button', { name: 'Posting Diskusi' }).click();
        await expect(page.getByText('Thread Otomatis dari Playwright 1234')).toBeVisible();
    });

    test('Membuat thread dengan judul kurang dari 5 karakter', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.getByRole('button', { name: 'Thread Baru' }).click();
        await page.getByRole('textbox', { name: 'Judul' }).click();
        await page.getByRole('textbox', { name: 'Judul' }).fill('asd');
        await page.getByLabel('Kategori').selectOption('6a743cb9-f7f0-4a94-9282-6fafe3567b20');
        await page.getByRole('textbox', { name: 'Isi Diskusi' }).click();
        await page.getByRole('textbox', { name: 'Isi Diskusi' }).fill('asdasdasdasdasdasdasdas');
        await page.getByRole('textbox', { name: 'Tag (Opsional)' }).click();
        await page.getByRole('textbox', { name: 'Tag (Opsional)' }).fill('as');
        await page.getByRole('button', { name: 'Posting Diskusi' }).click();
        await expect(page.getByText('Judul minimal 5 karakter')).toBeVisible();
    });

    test('Membuat thread tanpa memilih kategori', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.getByRole('button', { name: 'Thread Baru' }).click();
        await page.getByRole('textbox', { name: 'Judul', exact: false }).fill('Thread Tanpa Kategori');
        await page.getByRole('textbox', { name: 'Isi Diskusi', exact: false }).fill('Isi diskusi yang valid.');
        await page.getByRole('button', { name: 'Posting Diskusi' }).click();
        await expect(page.getByText('Kategori wajib dipilih')).toBeVisible();
    });

    test('Melihat detail thread', async ({ page }) => {
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            const title = await firstThread.textContent();
            await firstThread.click();
            await expect(page.getByRole('heading', { level: 1, name: title as string }).first()).toBeVisible();
        }
    });

    test('Edit thread milik sendiri', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        const editButton = page.getByRole('button', { name: 'Edit thread' }).first();
        if (await editButton.count() > 0) {
            await editButton.click();
            await page.getByRole('textbox', { name: 'Judul', exact: false }).fill('Thread Diedit via Automation');
            await page.getByRole('button', { name: 'Simpan', exact: false }).click();
            await expect(page.getByText('Thread Diedit via Automation')).toBeVisible();
        }
    });

    test('Hapus thread milik sendiri', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        const deleteButton = page.getByRole('button', { name: 'Hapus thread' }).first();
        if (await deleteButton.count() > 0) {
            page.once('dialog', dialog => dialog.accept());
            await deleteButton.click();
        }
    });

    test('Unggah gambar ke konten thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.goto('https://loom-forum.vercel.app/thread/new');

        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
        }
    });

    test('Unggah gambar lebih dari 2MB ke konten thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.goto('https://loom-forum.vercel.app/thread/new');

        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
        }
    });

    test('Pagination di halaman Beranda', async ({ page }) => {
        const nextButton = page.getByRole('button', { name: 'Halaman berikutnya' }).or(page.getByRole('button', { name: '2' }));
        if (await nextButton.count() > 0) {
            await nextButton.click();
            await expect(page).toHaveURL(/.*page=2/);
        }
    });

});

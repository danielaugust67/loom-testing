import { test, expect } from '@playwright/test';

test.describe('Admin Tests', () => {

    async function loginAsAdmin(page: any) {
        await page.goto('https://loom-forum.vercel.app/login');
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('adminpassword');
        await page.getByRole('button', { name: 'Log in' }).click();
    }

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Admin menambah kategori baru', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('https://loom-forum.vercel.app/admin/categories'); // Sesuaikan URL
        
    });

    test('Admin mengedit kategori', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('https://loom-forum.vercel.app/admin/categories');
        
    });

    test('Admin menghapus kategori', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('https://loom-forum.vercel.app/admin/categories');
        
    });

    test('User biasa tidak bisa akses halaman admin', async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app/login');
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.goto('https://loom-forum.vercel.app/admin/categories');
    });

    test('Admin melihat daftar user', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('https://loom-forum.vercel.app/admin/users');
    });

    test('Admin ban/unban user', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('https://loom-forum.vercel.app/admin/users');
        
    });
});

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://loom-forum.vercel.app');
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
});

test.describe('Authentication Tests ', () => {
    test('Register akun baru dengan data valid', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('link', { name: 'Daftar sekarang' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('johndoe');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('email@email.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).click();
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).fill('password');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByText('Cek Email Anda')).toBeVisible();
    });

    test('Register dengan username kurang dari 3 karakter', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('link', { name: 'Daftar sekarang' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('jo');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('email2@email.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).click();
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).fill('password');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByText('Username minimal 3 karakter')).toBeVisible();
    });

    test('Belum login, email sudah terdaftar di sistem', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('link', { name: 'Daftar sekarang' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('johndoe');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).click();
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).fill('password');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByText('email already exists')).toBeVisible();
    });

    test('Register password tidak cocok dengan konfirmasi password', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('link', { name: 'Daftar sekarang' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('johndoe');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('email12@email.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).click();
        await page.getByRole('textbox', { name: 'Konfirmasi Password' }).fill('differentpassword');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByText('Password tidak cocok')).toBeVisible();
    });


    test('Login dengan email & password yang benar', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByText('danielaugust67')).toBeVisible();
    });

    test('Login dengan password salah', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByText('invalid email or password')).toBeVisible();
    });

    test('Login dengan email yang tidak terdaftar', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('notregistered@email.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('password123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByText('invalid email or password')).toBeVisible();
    });

    test('Logout dari akun', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByText('danielaugust67')).toBeVisible();
        await page.getByRole('button', { name: 'Profil' }).click();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await page.getByRole('button', { name: 'Keluar' }).click();
    });

    test('Akses halaman terproteksi tanpa login', async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app/thread/new');
        await expect(page).toHaveURL(/.*login/);
    });

});
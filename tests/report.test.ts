import { test, expect } from '@playwright/test';

test.describe('Report Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('User melaporkan thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const firstThread = page.getByRole('heading', { level: 2 }).first();
        if (await firstThread.count() > 0) {
            await firstThread.click();
            
            const reportBtn = page.getByRole('button', { name: 'Laporkan thread' }).first();
            if (await reportBtn.count() > 0) {
                await reportBtn.click();
                
                await page.getByRole('textbox', { name: 'Alasan' }).fill('Mengandung spam atau promosi terselubung.');
                await page.getByRole('button', { name: 'Kirim Laporan' }).click();
                
            }
        }
    });

    test('Moderator melihat laporan', async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app/login');
        await page.getByRole('textbox', { name: 'Email' }).fill('mod@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('modpassword');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.goto('https://loom-forum.vercel.app/admin/reports'); // atau /mod/reports
        
    });
});

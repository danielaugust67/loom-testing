import { test, expect } from '@playwright/test';

test.describe('Vote Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://loom-forum.vercel.app');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test('Upvote sebuah thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const upvoteBtn = page.getByRole('button', { name: 'Upvote' }).first();
        if (await upvoteBtn.count() > 0) {
            await upvoteBtn.click();
        }
    });

    test('Batalkan upvote (toggle)', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const upvoteBtn = page.getByRole('button', { name: 'Upvote' }).first();
        if (await upvoteBtn.count() > 0) {
            await upvoteBtn.click(); // Batalkan
        }
    });

    test('Downvote sebuah thread', async ({ page }) => {
        await page.getByRole('link', { name: 'Masuk' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('danielgirsang67@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('daniel123');
        await page.getByRole('button', { name: 'Log in' }).click();
        
        const downvoteBtn = page.getByRole('button', { name: 'Downvote' }).first();
        if (await downvoteBtn.count() > 0) {
            await downvoteBtn.click();
        }
    });

    test('Guest tidak bisa vote', async ({ page }) => {
        const upvoteBtn = page.getByRole('button', { name: 'Upvote' }).first();
        if (await upvoteBtn.count() > 0) {
            await upvoteBtn.click();
        }
    });
});

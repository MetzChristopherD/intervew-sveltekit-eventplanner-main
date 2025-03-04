import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('user can add a new event', async ({ page }) => {
	await page.goto('/');
	await page.click('text=Add Event');
	await page.fill('input[name="title"]', 'Team Building');
	const now = new Date();
	const eventDate = now.toISOString().slice(0, 16);
	await page.fill('input[name="date"]', eventDate);
	await page.click('text=Create Event');
  
	await expect(page.locator('text=Team Building')).toBeVisible();
  });

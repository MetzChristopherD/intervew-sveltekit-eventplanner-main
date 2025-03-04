import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('user can add a new event', async ({ page }) => {
	await page.goto('/');
	await page.click('text=Add Event');
	await page.fill('input[name="title"]', 'Team Building');
	await page.fill('textarea[name="description"]', 'We make a great team!');
	const now = new Date();
	const eventDate = now.toISOString().slice(0, 16);
	await page.fill('input[name="date"]', eventDate);
	await page.click('text=Create Event');
  
	await expect(page.locator('text=Team Building')).toBeVisible({timeout: 10000});
  });

  test('user can edit an event', async ({ page }) => {
	await page.goto('/');
	await page.click('text=Team Building');
	await page.click('text=Edit');
	await page.fill('textarea[name="description"]', 'Lets build together!');
	const now = new Date();
	const eventDate = now.toISOString().slice(0, 16);
	await page.fill('input[name="date"]', eventDate);
	await page.click('text=Update Event');

	await expect(page.locator('text=Lets build together!')).toBeVisible({timeout: 10000});
  });

  test('user can delete an event', async ({ page }) => {
	await page.goto('/');
	await page.click('text=Team Building');
	await page.click('text=Delete');
	await expect(page.locator('text=Team Building')).toHaveCount(0);
  });

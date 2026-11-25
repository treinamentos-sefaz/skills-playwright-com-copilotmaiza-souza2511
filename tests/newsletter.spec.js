const { test, expect } = require('@playwright/test');

test('confirma a inscrição na newsletter', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Seu e-mail').fill('mapsouzah@gmail.com');
  await page.getByRole('button', { name: 'Inscrever' }).click();
  await expect(page.getByText('Inscrição confirmada!')).toBeVisible();
});

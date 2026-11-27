import { test, expect } from '@playwright/test'

test('a recruiter can find the role, work history and contact details', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior Software Engineer')
  await page.getByRole('link', { name: 'View experience', exact: true }).click()
  await expect(page).toHaveURL(/#resume$/)
  await expect(page.getByRole('heading', { name: 'Super', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Mercado Libre', exact: true })).toBeVisible()
  await page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page.getByRole('link', { name: 'manuelnfabri@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:manuelnfabri@gmail.com',
  )
})

test('both CV links download a PDF in the indicated language', async ({ page, request }) => {
  await page.goto('/')
  for (const [name, filename] of [
    ['CV - English PDF', 'Manuel_Fabri_CV_EN.pdf'],
    ['Spanish PDF', 'Manuel_Fabri_CV_ES.pdf'],
  ]) {
    const link = page.locator('#home').getByRole('link', { name, exact: true })
    await expect(link).toHaveAttribute('href', `/cv/${filename}`)
    const response = await request.get(`/cv/${filename}`)
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('application/pdf')
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
    const download = page.waitForEvent('download')
    await link.click()
    expect((await download).suggestedFilename()).toBe(filename)
  }
})

test('mobile navigation closes after selection and supports keyboard dismissal', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: /^(Menu|Close)$/ })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('navigation').getByRole('link', { name: 'Experience', exact: true }).click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#resume')).toBeFocused()
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }),
  ).toBeHidden()
  await menu.press('Enter')
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await menu.press('Tab')
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('content fits narrow and wide screens and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const width of [320, 390, 720, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
})

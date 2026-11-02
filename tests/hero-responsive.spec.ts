import { expect, test } from "@playwright/test";

test("El banner muestra texto, llamadas a la acción y foto completa en la primera pantalla", async ({ page }, testInfo) => {
  const sizes = testInfo.project.name === "mobile"
    ? [[320, 568], [360, 640], [375, 667], [390, 740], [390, 741], [390, 844], [430, 932]]
    : [[768, 1024], [1024, 768], [1280, 720], [1366, 768], [1440, 900]];

  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const image = page.locator(".home-hero-photo img");
    await image.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      await document.fonts.ready;
    });

    const metrics = await page.locator(".home-hero").evaluate((hero) => {
      const box = hero.getBoundingClientRect();
      const content = [...hero.querySelectorAll<HTMLElement>(".home-hero-eyebrow, h1, .home-hero-description, .home-hero-cta, .home-hero-trust, .home-hero-photo img, figcaption")];
      return {
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        bottom: box.bottom,
        content: content.map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            text: element.textContent || "Imagen principal",
            visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none",
            insideBanner: rect.top >= box.top && rect.bottom <= box.bottom + 1 && rect.left >= box.left && rect.right <= box.right + 1,
            initiallyVisible: rect.top >= 0 && rect.bottom <= innerHeight + 1,
            unclippedText: !["hidden", "clip"].includes(style.overflowY) || element.scrollHeight <= element.clientHeight + 1,
            fitsWidth: element.scrollWidth <= element.clientWidth + 1,
          };
        }),
      };
    });
    expect(metrics.documentWidth, `${width} × ${height}: sin scroll horizontal`).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.bottom, `${width} × ${height}: banner completo en pantalla`).toBeLessThanOrEqual(metrics.viewportHeight + 1);
    for (const item of metrics.content) {
      expect(item.visible && item.insideBanner && item.initiallyVisible && item.unclippedText && item.fitsWidth, `${width} × ${height}: ${item.text}`).toBe(true);
    }
    const photo = await image.evaluate((element: HTMLImageElement) => ({ natural: element.naturalWidth / element.naturalHeight, rendered: element.clientWidth / element.clientHeight, fit: getComputedStyle(element).objectFit }));
    expect(photo.fit).toBe("contain");
    expect(Math.abs(photo.natural - photo.rendered)).toBeLessThan(.03);
    if (width === 360 || width === 390 && height === 844 || width === 1366) {
      await page.screenshot({ path: `artifacts/banner-${width}x${height}.png` });
    }
  }
});

test("El teléfono en horizontal conserva el contenido y permite desplazarlo", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Comprobación de orientación móvil");
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const photo = page.locator(".home-hero-photo img");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  for (const name of ["Encuentra tu taller", "Crea en casa"]) {
    const link = page.locator(".home-hero-actions").getByRole("link", { name });
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
  }
});

import { expect, test } from "@playwright/test";

test("Los anuncios rotan, se pueden pausar y enlazan a su categoría", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  const bar = page.getByRole("region", { name: "Ofertas y anuncios de demostración" });
  await expect(bar).toContainText("CREA15");
  await expect(bar).toHaveAttribute("data-autoplay", "playing");
  await page.clock.fastForward(6600);
  await expect(bar).toContainText("DUPLA20");
  await bar.getByRole("button", { name: "Pausar anuncios", exact: true }).click();
  await page.mouse.move(0, 300);
  await page.clock.fastForward(15000);
  await expect(bar).toContainText("DUPLA20");
  await bar.getByRole("button", { name: "Anuncio siguiente" }).click();
  await expect(bar).toContainText("REGALO");
  await expect(bar.getByRole("link")).toHaveAttribute("href", "/obras");
  await bar.getByRole("link").click();
  await expect(page).toHaveURL("/obras");
  await expect(page.getByRole("complementary", { name: "Promoción de demostración" })).toContainText("Envoltorio de regalo sin costo");
});

test("El carrusel rota, permite elegir tarjetas y conserva enlaces individuales", async ({ page }, testInfo) => {
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Ideas y promociones para tu próxima pausa" });
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute("data-autoplay", "playing");
  await page.clock.fastForward(8100);
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("El próximo café, con una dosis de arte.");
  await carousel.getByRole("button", { name: "Pausar carrusel", exact: true }).click();
  await page.clock.fastForward(18000);
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("El próximo café, con una dosis de arte.");
  await carousel.getByRole("button", { name: "Ver promoción 3: Para regalar con intención", exact: true }).click();
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("Los mejores regalos tienen una historia.");
  await expect(carousel.getByRole("link", { name: "Descubre las piezas" })).toHaveAttribute("href", "/obras");
  await carousel.getByRole("button", { name: "Promoción siguiente", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("Ese «quiero aprender» empieza aquí.");
  if (testInfo.project.name === "mobile") {
    await carousel.locator(".campaign-viewport").evaluate((element) => {
      const touch = (x: number) => new Touch({ identifier: 1, target: element, clientX: x, clientY: 100 });
      element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [touch(200)], changedTouches: [touch(200)] }));
      element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, touches: [], changedTouches: [touch(100)] }));
    });
    await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("La mejor tarde cabe en una caja.");
  }
});

test("Los códigos se copian con feedback y no descuentan el pedido de demostración", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { (window as Window & { copiedCode?: string }).copiedCode = value; } } });
  });
  await page.goto("/kits");
  const promo = page.getByRole("complementary", { name: "Promoción de demostración" });
  await expect(promo).toContainText("no se aplica al subtotal");
  await promo.getByRole("button", { name: "Copiar código de demostración CREA15" }).click();
  await expect(promo.getByRole("status")).toHaveText("¡Código copiado!");
  expect(await page.evaluate(() => (window as Window & { copiedCode?: string }).copiedCode)).toBe("CREA15");
  await page.getByRole("button", { name: "Agregar Kit · Pinta tu Corazón en Familia a mi bolsa", exact: true }).click();
  await page.getByRole("button", { name: "Abrir mi bolsa, 1 producto", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const href = await dialog.getByRole("link", { name: /Consultar pedido por WhatsApp/ }).getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain("18.900");
});

test("Movimiento reducido detiene la rotación y mantiene los controles manuales", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("/");
  const bar = page.getByRole("region", { name: "Ofertas y anuncios de demostración" });
  await expect(bar.getByRole("button", { name: "Anuncios automáticos desactivados por movimiento reducido" })).toBeDisabled();
  const carousel = page.getByRole("region", { name: "Ideas y promociones para tu próxima pausa" });
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel.getByRole("button", { name: "Carrusel automático desactivado por movimiento reducido" })).toBeDisabled();
  await page.clock.fastForward(25000);
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("La mejor tarde cabe en una caja.");
  await carousel.getByRole("button", { name: "Promoción siguiente", exact: true }).click();
  await expect(carousel.getByRole("heading", { level: 3 })).toHaveText("El próximo café, con una dosis de arte.");
  expect(await carousel.locator("article").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
});

test("Si el navegador bloquea el portapapeles se puede copiar el código a mano", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Portapapeles no disponible"); } } }));
  await page.goto("/guias");
  const promo = page.getByRole("complementary", { name: "Promoción de demostración" });
  await promo.getByRole("button", { name: "Copiar código de demostración APRENDE2" }).click();
  await expect(promo.getByRole("status")).toHaveText("Copia este código: APRENDE2");
});

test("Rotar tarjetas y anuncios mantiene la altura y no desborda la pantalla", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const sizes = testInfo.project.name === "mobile" ? [[320, 568], [390, 844]] : [[768, 1024], [1440, 900]];
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const carousel = page.locator(".campaign-section");
    const slideHeights: number[] = [];
    const barHeights: number[] = [];
    for (let index = 0; index < 4; index++) {
      await carousel.locator(".campaign-pagination button").nth(index).click();
      slideHeights.push(await carousel.locator("article").evaluate((element) => element.getBoundingClientRect().height));
      const bar = page.locator(".announcement-bar");
      await bar.getByRole("button", { name: "Anuncio siguiente" }).click();
      barHeights.push(await bar.evaluate((element) => element.getBoundingClientRect().height));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(Math.max(...slideHeights) - Math.min(...slideHeights), `Tarjetas estables en ${width}px`).toBeLessThan(2);
    expect(Math.max(...barHeights) - Math.min(...barHeights), `Barra estable en ${width}px`).toBeLessThan(2);
  }
});

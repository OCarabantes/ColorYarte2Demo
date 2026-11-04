import { expect, test } from "@playwright/test";

test("La portada carga imágenes locales y no desborda en móvil", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("momento para ti.");
  await expect(page.locator("#talleres, #catalogo")).toHaveCount(0);
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((image) => { image.loading = "eager"; });
    await Promise.all([...document.images].map((image) => image.decode()));
    await document.fonts.ready;
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: `artifacts/color-arte-${testInfo.project.name}.png`, fullPage: true });
  if (testInfo.project.name === "desktop") {
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const fits = await page.getByRole("heading", { level: 1 }).evaluate((element) => {
        const heading = element.getBoundingClientRect();
        return [...element.querySelectorAll("span")].every((span) => span.getBoundingClientRect().right <= heading.right + 1);
      });
      expect(fits, `El título cabe en ${width}px`).toBe(true);
      if (width === 768) await page.screenshot({ path: "artifacts/color-arte-tablet.png", fullPage: true });
    }
  }
});

test("La navegación abre catálogos independientes y ordena precios", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Kits DIY Familiares", exact: true }).click();
  await expect(page).toHaveURL("/kits");
  const catalogue = page.locator("#catalogo");
  await expect(catalogue.locator("article")).toHaveCount(8);
  await expect(page.getByRole("navigation").getByRole("link", { name: "Kits DIY Familiares", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByLabel("Ordenar productos").selectOption("price-desc");
  await expect(catalogue.locator("article").first()).toContainText("Repujado Familiar");
  await page.getByRole("navigation").getByRole("link", { name: "Guías PDF", exact: true }).click();
  await expect(page).toHaveURL("/guias");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Guías PDF.");
  await expect(catalogue.locator("article")).toHaveCount(2);
  await catalogue.getByRole("button", { name: "Ver detalles de Guía PDF · Mi primer repujado", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const href = await dialog.getByRole("link", { name: /Consultar guía por WhatsApp/ }).getAttribute("href");
  const url = new URL(href!);
  expect(url.pathname).toBe("/56983855951");
  expect(url.searchParams.get("text")).toContain("Mi primer repujado");
  expect(url.searchParams.get("text")).toContain("PDF");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(catalogue.getByRole("button", { name: "Ver detalles de Guía PDF · Mi primer repujado", exact: true })).toBeFocused();
});

test("La bolsa actualiza cantidades, persiste y prepara el mensaje correcto", async ({ page }) => {
  await page.goto("/kits");
  await page.getByRole("button", { name: "Agregar Kit · Pinta tu Corazón en Familia a mi bolsa", exact: true }).click();
  await page.getByRole("button", { name: "Abrir mi bolsa, 1 producto", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Sumar una unidad de Kit · Pinta tu Corazón en Familia", exact: true }).click();
  const href = await dialog.getByRole("link", { name: /Consultar pedido por WhatsApp/ }).getAttribute("href");
  const url = new URL(href!);
  expect(url.pathname).toBe("/56983855951");
  expect(url.searchParams.get("text")).toContain("2 × Kit · Pinta tu Corazón en Familia");
  expect(url.searchParams.get("text")).toContain("37.800");
  await expect.poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem("color-arte-bag-v1")!)[0].quantity)).toBe(2);
  await page.reload();
  await page.getByRole("button", { name: "Abrir mi bolsa, 2 productos", exact: true }).click();
  await expect(dialog).toContainText("37.800");
  await dialog.getByRole("button", { name: "Eliminar Kit · Pinta tu Corazón en Familia de la bolsa", exact: true }).click();
  await expect(dialog).toContainText("Aquí empieza algo bonito");
  await dialog.getByRole("button", { name: /Explorar la tiendita/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL("/kits");
});

test("Las guías digitales solo se agregan una vez", async ({ page }) => {
  await page.goto("/guias");
  const addGuide = page.getByRole("button", { name: "Agregar Guía PDF · Mi primer repujado a mi bolsa", exact: true });
  await addGuide.click();
  await addGuide.click();
  await expect(page.getByRole("status", { name: "Avisos de la bolsa" })).toContainText("Esta guía ya está en tu bolsa.");
  await page.getByRole("button", { name: "Abrir mi bolsa, 1 producto", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("1 guía digital");
});

test("La programación muestra cupos y gestiona la lista de espera", async ({ page }) => {
  await page.goto("/talleres");
  const section = page.locator("#talleres");
  await expect(section.locator("article")).toHaveCount(3);
  await page.getByLabel("Mes de los talleres").selectOption("2026-12");
  await expect(section.locator("article")).toHaveCount(2);
  await section.getByRole("button", { name: "Para ti", exact: true }).click();
  await expect(section.locator("article")).toHaveCount(1);
  await expect(section).toContainText("Cupos completos");
  const href = await section.getByRole("link", { name: /Consultar lista de espera/ }).getAttribute("href");
  const url = new URL(href!);
  expect(url.searchParams.get("text")).toContain("lista de espera");
  expect(url.searchParams.get("text")).toContain("12 de diciembre");
  await section.getByRole("button", { name: "En familia", exact: true }).click();
  await expect(section).toContainText("10 cupos disponibles");
  await expect(section).toContainText("Diciembre se pinta en familia");
});

test("El almacenamiento dañado no rompe la compra y el diálogo mantiene el foco", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("color-arte-bag-v1", JSON.stringify([
    { productId: "unknown", quantity: 1 },
    { productId: "kit-calabazas", quantity: -1 },
    { productId: "guia-repujado", quantity: 999 },
    { productId: "guia-repujado", quantity: 999 },
  ])));
  await page.goto("/");
  const bagButton = page.getByRole("button", { name: "Abrir mi bolsa, 1 producto", exact: true });
  await bagButton.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(bagButton).toBeFocused();
});

test("Cada menú tiene URL propia, contenido exclusivo y navegación de regreso", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegación principal" });
  const routes = [
    { name: "Talleres Presenciales", path: "/talleres", title: "Talleres Presenciales." },
    { name: "Kits DIY Familiares", path: "/kits", title: "Kits DIY Familiares." },
    { name: "Obras Únicas", path: "/obras", title: "Obras Únicas." },
    { name: "Guías PDF", path: "/guias", title: "Guías PDF." },
  ];
  for (const route of routes) {
    const link = nav.getByRole("link", { name: route.name, exact: true });
    await expect(link).toHaveAttribute("href", route.path);
    await link.click();
    await expect(page).toHaveURL(route.path);
    await expect(link).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.title);
    await expect(page).toHaveTitle(new RegExp(route.name));
    await expect(page.locator("#inicio")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (route.path === "/talleres") await expect(page.locator("#catalogo")).toHaveCount(0);
    else {
      await expect(page.locator("#talleres")).toHaveCount(0);
      const cards = page.locator("#catalogo article");
      await expect(cards).toHaveCount(route.path === "/kits" ? 8 : 2);
      await expect(cards.filter({ hasText: route.path === "/kits" ? "Guía PDF" : "Kit ·" })).toHaveCount(0);
    }
  }
  await page.goBack();
  await expect(page).toHaveURL("/obras");
  await expect(nav.getByRole("link", { name: "Obras Únicas", exact: true })).toHaveAttribute("aria-current", "page");
  await page.goForward();
  await expect(page).toHaveURL("/guias");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Guías PDF.");
  await nav.getByRole("link", { name: "Inicio", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("#talleres, #catalogo")).toHaveCount(0);
});

test("La bolsa reúne productos de distintas páginas sin perder su contenido", async ({ page }) => {
  await page.goto("/kits");
  await page.getByRole("button", { name: "Agregar Kit · Pinta tu Corazón en Familia a mi bolsa", exact: true }).click();
  const nav = page.getByRole("navigation");
  await nav.getByRole("link", { name: "Obras Únicas", exact: true }).click();
  await expect(page).toHaveURL("/obras");
  await page.getByRole("button", { name: "Agregar Pulsera · Jardín de colores a mi bolsa", exact: true }).click();
  await nav.getByRole("link", { name: "Guías PDF", exact: true }).click();
  await page.getByRole("button", { name: "Agregar Guía PDF · Mi primer repujado a mi bolsa", exact: true }).click();
  await page.getByRole("button", { name: "Abrir mi bolsa, 3 productos", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("listitem")).toHaveCount(3);
  const href = await dialog.getByRole("link", { name: /Consultar pedido por WhatsApp/ }).getAttribute("href");
  const message = new URL(href!).searchParams.get("text")!;
  expect(message).toContain("Pinta tu Corazón en Familia");
  expect(message).toContain("Jardín de colores");
  expect(message).toContain("Mi primer repujado");
  expect(message).toContain("39.700");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.getByRole("button", { name: "Abrir mi bolsa, 3 productos", exact: true })).toBeVisible();
});

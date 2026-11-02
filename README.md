# ColorYarte2Demo

Sitio de Color & Arte: talleres, kits familiares, obras artesanales y guías digitales.

Landing, tienda y consultas de reserva con **Next.js App Router, TypeScript, Tailwind CSS 4 y Lucide React**. Implementación local solicitada; no se ha publicado.

```bash
npm install
npm run dev
```

Abre **http://127.0.0.1:3000**. Para producción: `npm run build` y `npm start`.

Cada opción del menú tiene su propia página de Next.js:

| Página | Ruta | Archivo |
| --- | --- | --- |
| Inicio y presentación de la marca | `/` | `app/page.tsx` |
| Talleres Presenciales | `/talleres` | `app/talleres/page.tsx` |
| Kits DIY Familiares | `/kits` | `app/kits/page.tsx` |
| Obras Únicas | `/obras` | `app/obras/page.tsx` |
| Guías PDF | `/guias` | `app/guias/page.tsx` |

Inicio presenta la marca y enlaza a cada experiencia. Los talleres y los catálogos se muestran exclusivamente en sus respectivas rutas. Los tipos y arrays `workshops`, `products` y `testimonials` están en `lib/storefront.ts`. Los componentes de cada página están en `components/`; `SiteShell`, montado en `app/layout.tsx`, comparte el menú, la bolsa, los diálogos y el footer entre rutas.

- Navbar de cápsulas con enlaces de Next.js, estado activo por URL y desplazamiento horizontal en móvil.
- Talleres filtrables por mes y público; cupos calculados como `capacity - booked`; lista de espera cuando se agotan.
- Catálogos independientes de kits, obras y guías, orden por precio y fichas de detalle. La bolsa conserva productos de todas las páginas al navegar y al recargar con `localStorage`.
- Mensajes específicos para talleres, productos y pedido completo a **+56 9 8385 5951**, codificados con `encodeURIComponent`.
- Diálogo nativo, gestión de foco, Escape, anuncios para lectores de pantalla, enlace para saltar al contenido y preferencias de movimiento reducido.
- Logo original suministrado e imágenes WebP locales. Las fuentes también se sirven localmente.
- Banner adaptado al ancho y alto disponibles mediante `svh`: conserva texto, dos llamadas a la acción e imagen completa. En teléfonos de poca altura, la foto y la descripción comparten una fila. La imagen mantiene su proporción original, sin recortarse. En horizontal o con zoom se permite desplazamiento para conservar la legibilidad.
- Announcement Bar con cuatro anuncios rotativos, enlaces a las páginas de cada categoría, controles manuales y pausa.
- Carrusel de campañas con flechas, selector de tarjetas, gesto táctil y códigos copiables. Todas las ofertas están identificadas como **DEMO** y no modifican los precios ni el subtotal.
- Franjas promocionales en Talleres, Kits, Obras y Guías; campañas tipadas en `lib/marketing.ts`.
- Animaciones suaves al entrar en pantalla y detalles animados en el banner. La rotación se pausa al interactuar, salir de pantalla u ocultar la pestaña; el movimiento reducido desactiva animaciones y reproducción automática.
- Iconografía artesanal propia: 11 ilustraciones SVG en `components/craft-icons.tsx`, con mariposa, caballete, kit de materiales, cobre repujado, mostacillas Miyuki, familia, café creativo, guía, regalo, bienestar y calabazas pintadas. Se reutilizan en menú, categorías, promociones y técnicas; Lucide mantiene los controles de navegación.

## Datos de ejemplo y conexión real

Los talleres de noviembre/diciembre de 2026, precios, cupos, existencias, sedes y testimonios son **mock data**, identificados en la interfaz. Las imágenes son de ambientación; no representan productos ni asistentes reales. Sustituye los arrays antes de publicar una oferta real. La fecha de cada taller se formatea sin desplazamientos por zona horaria.

El flujo de venta y reserva se coordina por WhatsApp. La bolsa no retiene existencias, no reserva cupos, no realiza cobros y no envía mensajes automáticamente. Las guías PDF son fichas demostrativas: no se incluye un archivo de pago ni una descarga automática. Para una venta digital inmediata necesitas conectar pago confirmado, almacenamiento del PDF y entrega protegida. Para cupos en tiempo real, reemplaza los datos estáticos por una API/CMS y valida disponibilidad en el servidor.

## Verificación

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Las pruebas de navegador usan Microsoft Edge instalado (`channel: "msedge"`) y levantan temporalmente el servidor de producción. En otros sistemas puedes instalar Chromium con Playwright y cambiar el canal en `playwright.config.ts`. Cubren rutas independientes, contenido exclusivo por categoría, estado del menú, historial del navegador, recarga directa, bolsa compartida entre páginas, orden, mensajes de WhatsApp, cantidades, persistencia, límites de guías, lista de espera, foco y ausencia de desbordamiento horizontal.

Las capturas se generan en `artifacts/color-arte-desktop.png` y `artifacts/color-arte-mobile.png`.

Los recursos generados, la herramienta utilizada y sus prompts finales están documentados en [`docs/ASSETS.md`](docs/ASSETS.md).

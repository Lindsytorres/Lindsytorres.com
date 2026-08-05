# Content & Assets Checklist — The Private Room

Estado a la fecha de esta entrega. Actualiza la columna **Estado** conforme cada elemento quede resuelto.

| # | Elemento | Estado | Ubicación en la página | Formato requerido | Dimensiones recomendadas | Variable / archivo a reemplazar | Prioridad |
|---|----------|--------|-------------------------|--------------------|---------------------------|----------------------------------|-----------|
| 1 | Logo principal de The Private Room | **Resuelto** — recortado del key art oficial (`the-private-room-key-art.png`), fondo transparente, en `pr-monogram.png` | Navbar, hero, footer | PNG (recorte del key art) | 438×333px aprox. | `siteAssets.logoPrimary` en `assets/js/config.js` | — |
| 2 | Monograma PR en SVG | Resuelto como PNG (no vectorial todavía) — si más adelante hay un SVG oficial, reemplaza `pr-monogram.png` sin tocar el CSS (`.pr-logo-img` ya está listo) | Navbar, hero, footer | Ideal: SVG. Actual: PNG transparente | Vectorial, cuadrado | `siteAssets.logoMonogram`, clase `.pr-logo-img` en `assets/css/main.css` | Baja |
| 3 | Banner desktop del hero | Pendiente (composición CSS provisional con puerta/marco) | Hero, escritorio | WebP/AVIF | ~1600×1200px | `siteAssets.heroDesktop`, sección `.door-scene` en `index.html` | Alta |
| 4 | Banner móvil del hero | Pendiente (composición CSS equivalente) | Hero, móvil | WebP/AVIF | ~900×1200px | `siteAssets.heroMobile` | Media |
| 5 | Imagen Open Graph final | Pendiente (placeholder SVG incluido) | Meta tags `og:image` / `twitter:image` | PNG/JPG (la mayoría de redes no renderiza SVG) | 1200×630px | `assets/images/og-placeholder.svg` → reemplazar y actualizar rutas en `<head>` de cada página | Alta |
| 6 | Retrato editorial de Lindsy Torres | Disponible pero **desactivado por decisión de Lindsy** (`showFounderPortrait: false`) — el archivo `lindsy-founder-portrait.jpg` queda listo por si se reconsidera | — (no se muestra actualmente) | JPG/WebP | 900×1200px (3:4) | `siteAssets.founderPortrait`, `showFounderPortrait` en `assets/js/config.js` | — |
| 7 | Imagen de cierre (puerta más abierta) | Pendiente | Sección de cierre (13) | WebP/AVIF | ~1600×1000px | `siteAssets.closingImage` | Media |
| 8 | Firma transparente de Lindsy Torres | Pendiente (se muestra en cursiva tipográfica) | Sección de cierre | PNG transparente | ~600×240px | `siteAssets.signature`, `.placeholder-signature` | Media |
| 9 | Integración del formulario | Pendiente — hoy las respuestas **no llegan a ningún lado**, solo se guardan en el navegador de quien aplica (`localStorage`, modo demo) | `/apply/` | Recomendado: Formspree (gratis, reenvía por email sin backend) apuntando a `info@lindsytorres.com`. También sirven Tally / Fillout / Supabase / HubSpot | — | `FORM_ENDPOINT` en `assets/js/config.js`, función `submitApplication()` en `assets/js/apply.js` | Alta |
| 10 | Correo receptor de solicitudes | **Resuelto** — `info@lindsytorres.com` | Footer, legal, destino sugerido para el formulario | — | — | `CONTACT_EMAIL` en `assets/js/config.js` | — |
| 11 | Plantillas de correo (recibido / aceptación) | Pendiente | Flujo posterior al envío | Definido por la plataforma de email elegida | — | Fuera del alcance del código de este sitio | Media |
| 12 | Calendario de reservas | **Resuelto** — Calendly conectado (`calendly.com/lindsytorres-info/30min`), embebido en `/private-calendar/` y enlazado directamente desde los botones "Reservar/Solicitar" del sitio | Todos los CTA de reserva + `/private-calendar/` | Calendly (embed iframe) | — | `CALENDAR_URL` en `assets/js/config.js` | — |
| 13 | Política de privacidad definitiva | Provisional | `/privacy/` | Texto legal revisado | — | Contenido de `privacy/index.html` | Alta antes de lanzamiento |
| 14 | Términos y condiciones definitivos | Provisional | `/terms/` | Texto legal revisado | — | Contenido de `terms/index.html` | Alta antes de lanzamiento |
| 15 | Meta Pixel | Pendiente | Todo el sitio | ID de píxel | — | `META_PIXEL_ID` en `assets/js/config.js` | Media |
| 16 | Google Analytics / GA4 | Pendiente | Todo el sitio | Measurement ID | — | `GA_MEASUREMENT_ID` en `assets/js/config.js` | Media |
| 17 | Dominio final | **Resuelto** — `lindsytorres.com/theprivateroom/` ya configurado en canonical, Open Graph y JSON-LD de todas las páginas | Canonical, Open Graph, JSON-LD, `site.webmanifest` | — | — | Búscalo por `lindsytorres.com/theprivateroom` si cambia | — |
| 18 | Favicon final | Provisional (monograma PR en SVG) | `<head>` de todas las páginas | SVG o PNG multi-tamaño | 32×32 / 180×180 | `assets/icons/favicon.svg` | Baja |
| 19 | Testimonios | No incluidos por decisión de diseño (`showTestimonials: false`) | — | — | Activar únicamente cuando existan testimonios específicos y aprobados | — |
| 20 | Enlaces de pago privados | Intencionalmente vacíos | Sección de inversión (no se usan aún) | Stripe / PayPal / link de pago | — | `FULL_PAYMENT_URL`, `PAYMENT_PLAN_URL` — compartir solo después de la conversación privada | Baja hasta apertura de ventas |

## Notas

- El logo de Lindsy Torres (marca personal, sello circular dorado sobre fondo vino) sí está disponible en `assets/images/lindsy-torres-seal.png`, pero **no es** el logo de The Private Room — ambos productos tienen identidades distintas. Confirmar con Lindsy si desea reutilizar ese sello o si existe/está en proceso un logo específico de The Private Room.
- Todo elemento marcado como "Pendiente" se renderiza hoy mediante un placeholder editorial construido en CSS/HTML (marco de puerta, monograma tipográfico, firma cursiva) — nunca como una imagen rota o un bloque vacío.
- El panel `assets/js/config.js` es el único lugar donde deben activarse `showFounderPortrait`, `showTestimonials`, `calendarEnabled`, `formIntegrationEnabled` y `analyticsEnabled`.

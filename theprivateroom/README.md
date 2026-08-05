# The Private Room

Landing page de aplicación y reserva para **The Private Room**, la mentoría privada 1:1 de más alta proximidad de Lindsy Torres (Inside The Legacy Method™).

Sitio estático — HTML, CSS y JavaScript vanilla, sin build step ni dependencias de Node. Se eligió esta arquitectura porque el entorno de desarrollo no tenía Node.js/npm instalado; el resultado funciona igual (o mejor, en términos de simplicidad de despliegue) en cualquier hosting estático.

## Cómo ejecutarlo localmente

No requiere instalación. Cualquiera de estas opciones sirve:

```bash
# Opción 1 — servidor estático de Python (incluido en macOS)
cd the-private-room
python3 -m http.server 8080
# abrir http://localhost:8080

# Opción 2 — abrir index.html directamente en el navegador
open index.html
```

> Todos los enlaces internos y assets usan rutas **relativas** (`apply/`, `../assets/...`), no absolutas. Esto es intencional: el sitio funciona igual si se publica en la raíz de un dominio o dentro de una subcarpeta, sin tocar código.

## Cómo desplegarlo

**Dominio final: `lindsytorres.com/theprivateroom/`** — el sitio se publica como subcarpeta del dominio principal de Lindsy, no en la raíz.

Cualquier hosting estático funciona: Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3 + CloudFront, o directamente subiendo esta carpeta como `/theprivateroom/` dentro del hosting donde ya vive `lindsytorres.com`. No hay comando de build — se publica la carpeta tal cual, dentro de esa ruta.

Los únicos lugares donde el dominio final está escrito explícitamente (porque así lo exigen los estándares, no por conveniencia) son: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, el bloque JSON-LD y `site.webmanifest`. Si el dominio o la subcarpeta cambian, actualiza esos valores (búscalos por `lindsytorres.com/theprivateroom`).

## Estructura del proyecto

```
the-private-room/
├── index.html                     Página principal (todas las secciones)
├── apply/index.html               Formulario de solicitud de acceso
├── application-received/index.html Confirmación tras enviar la solicitud
├── private-calendar/index.html    Placeholder de calendario (ruta NO pública)
├── thank-you/index.html           Confirmación tras reservar una llamada
├── privacy/index.html             Política de privacidad (provisional)
├── terms/index.html               Términos y condiciones (provisional)
├── assets/
│   ├── css/main.css               Sistema visual completo (paleta, tipografía, componentes, animaciones)
│   ├── js/config.js               Configuración central — copy, flags de features, integraciones
│   ├── js/analytics.js            trackEvent() + carga condicional de Meta Pixel / GA4
│   ├── js/main.js                 Nav sticky, menú móvil, scroll reveals, acordeón FAQ, cookies
│   ├── js/apply.js                Validación y envío del formulario (submitApplication())
│   ├── images/                    Fotografías e imágenes (incluye retrato real de Lindsy Torres)
│   └── icons/favicon.svg          Favicon provisional (monograma PR)
├── .env.example                   Referencia de variables (ver nota abajo)
└── CONTENT-AND-ASSETS-CHECKLIST.md Lista de recursos pendientes antes del lanzamiento
```

## Configuración central

Todo lo que se puede activar o editar sin tocar múltiples archivos vive en **`assets/js/config.js`**:

```js
window.siteConfig = {
  siteName: "The Private Room",
  fullInvestment: "USD $11,888",
  paymentPlan: "6 pagos de USD $2,500",
  showTestimonials: false,
  showFounderPortrait: true,
  calendarEnabled: false,
  formIntegrationEnabled: false,
  analyticsEnabled: false, // se activa solo si hay IDs configurados
  integrations: { CALENDAR_URL, FORM_ENDPOINT, META_PIXEL_ID, ... }
};
```

Este archivo se carga en **todas** las páginas antes que `analytics.js` y `main.js`.

### Nota sobre `.env.example`

Al no haber build step, el navegador no puede leer un archivo `.env` en tiempo de ejecución. `.env.example` documenta las mismas variables que existen en `config.js.integrations` para que, si el proyecto migra a un framework con bundler (Next.js, Vite, etc.) o a funciones serverless, la migración sea directa. Mientras tanto, **edita los valores directamente en `assets/js/config.js`**.

## Cómo cambiar el copy

Todo el texto vive directamente en el HTML de cada sección, en español y tal como fue aprobado en el brief. Para editar un párrafo, busca la sección correspondiente en `index.html` (están comentadas con su número: `<!-- 03 — RECONOCIMIENTO DEL PROBLEMA -->`, etc.) y edita el texto ahí.

## Cómo reemplazar los placeholders visuales

Todos los elementos visuales pendientes están construidos en CSS/HTML — nunca como imágenes rotas. Para reemplazarlos:

1. Coloca el archivo final en `assets/images/` (o `assets/icons/` para el favicon).
2. Actualiza la ruta correspondiente en `siteAssets` dentro de `assets/js/config.js`.
3. Sustituye el bloque de placeholder en el HTML por una etiqueta `<img>` apuntando al nuevo archivo (los bloques están marcados con comentarios `TODO:` para ubicarlos rápido).

Consulta **`CONTENT-AND-ASSETS-CHECKLIST.md`** para la lista completa de qué falta, dónde va, formato y dimensiones recomendadas.

### Cómo activar el retrato de la fundadora

Ya está activo: `siteAssets.founderPortrait` apunta a `assets/images/lindsy-founder-portrait.jpg` (retrato profesional real) y se muestra en la sección "High Proximity". Para reemplazarlo por uno nuevo, sobrescribe el archivo o actualiza la ruta y pon `showFounderPortrait: true` si alguna vez lo desactivas.

## Cómo conectar el formulario de aplicación

El formulario (`/apply/`) guarda las respuestas en `localStorage` mientras `FORM_ENDPOINT` esté vacío — esto es intencional para poder revisar el flujo visual completo sin una integración real. Para conectarlo:

1. Crea el formulario/base de datos en Tally, Fillout, Supabase, Formspree, HubSpot, ConvertKit o un webhook propio.
2. Define `FORM_ENDPOINT` en `assets/js/config.js` con la URL del endpoint.
3. La función `submitApplication()` en `assets/js/apply.js` ya está preparada: si `FORM_ENDPOINT` existe, hace un `POST` con el payload completo en JSON; si no, cae automáticamente al modo local de demostración.
4. Pon `formIntegrationEnabled: true` en `config.js` como referencia de que la integración quedó conectada.

## Cómo conectar el calendario

1. Crea el evento de reserva en Calendly, TidyCal o la plataforma elegida.
2. Define `CALENDAR_URL` en `assets/js/config.js`.
3. Reemplaza el bloque `.calendar-placeholder` en `private-calendar/index.html` por el embed/iframe de la plataforma.
4. Pon `calendarEnabled: true`.

La ruta `/private-calendar/` **no está enlazada en la navegación pública** y lleva `<meta name="robots" content="noindex, nofollow">` — su acceso debe compartirse manualmente solo con solicitudes aprobadas.

## Cómo activar la analítica

1. Define `META_PIXEL_ID`, `GA_MEASUREMENT_ID` y/o `GTM_ID` en `assets/js/config.js`.
2. `assets/js/analytics.js` inyecta los scripts correspondientes automáticamente solo cuando detecta un ID — mientras estén vacíos, no se hace ninguna llamada externa y los eventos solo se registran en la consola (en `localhost`).
3. Eventos ya instrumentados vía `trackEvent()`: `view_private_room`, `click_private_room_apply`, `start_private_room_application`, `complete_private_room_application`, `view_private_room_calendar`, `book_private_room_call`, `click_private_room_investment`, `view_private_room_investment`.
4. Los parámetros UTM de la URL se capturan automáticamente en `sessionStorage` y viajan con el payload del formulario.

## Cómo modificar la inversión

Edita `fullInvestment`, `paymentPlan` y `totalPaymentPlan` en `assets/js/config.js`, y actualiza los mismos valores en la sección "The Private Investment" de `index.html` (las cifras están escritas directamente en el copy, no interpoladas, para mantener el HTML legible sin un motor de plantillas).

## Cómo activar los testimonios

`showTestimonials` está en `false` intencionalmente — no se inventaron testimonios ni cifras. Cuando existan testimonios reales y aprobados, crea la sección `TestimonialsSection` (mencionada como pendiente en la arquitectura), agrégala a `index.html` y cambia el flag a `true`.

## Qué recursos faltan antes de publicar

Ver **`CONTENT-AND-ASSETS-CHECKLIST.md`** — incluye logo, monograma en SVG, banners de hero, imagen Open Graph final, imagen de cierre, firma transparente, integración de formulario/calendario, textos legales definitivos, Meta Pixel, GA4 y dominio final.

## Rutas públicas vs. privadas

| Ruta | Pública | Indexable |
|------|---------|-----------|
| `/` | Sí | Sí |
| `/apply/` | Sí | Sí |
| `/application-received/` | Sí (solo se llega tras enviar el formulario) | No (`noindex`) |
| `/private-calendar/` | **No** — no enlazada en navegación | No (`noindex, nofollow`) |
| `/thank-you/` | Sí (tras reservar llamada) | No (`noindex`) |
| `/privacy/`, `/terms/` | Sí | No (`noindex, follow`, contenido provisional) |

## Variables de entorno / configuración

Ver `.env.example` para la lista completa. Los mismos valores se configuran en `assets/js/config.js` → `integrations`.

## Accesibilidad y rendimiento

- Contraste AA, estados de foco visibles, `prefers-reduced-motion` respetado.
- Sin frameworks ni dependencias externas más que Google Fonts (con `preconnect`).
- Sin imágenes rotas: todo placeholder pendiente se resuelve en CSS.
- Objetivo Lighthouse >90 en Performance, SEO y Accessibility — a validar contra el hosting final una vez definido el dominio.

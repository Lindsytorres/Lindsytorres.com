/**
 * LINDSY TORRES — Home ("The Legacy Gallery") — Central configuration
 * TODO: Replace placeholder values before public launch.
 */
window.siteConfig = {
  siteName: "Lindsy Torres",
  methodology: "The Legacy Method™",

  // Feature flags — the only place that should decide what renders.
  showMagnetaria: false, // Activar cuando exista la página pública de Magnetaria.
  showNewsletter: false, // Activar cuando exista una estrategia de email activa.

  // Exactly one offer may be featured at a time — set its key here, or ""
  // for none. Matches the `data-offer` attribute on each artwork panel.
  featuredOffer: "",

  integrations: {
    CONCIERGE_WHATSAPP_URL: "https://wa.link/yq1lau",
    CONCIERGE_MESSAGE:
      "Hola, llegué desde la página de Lindsy Torres y quisiera saber cuál de las experiencias corresponde mejor con mi momento actual.",

    INSTAGRAM_URL: "https://instagram.com/lindsytorres",
    TIKTOK_URL: "https://www.tiktok.com/@lindsytorres.com",
    YOUTUBE_URL: "https://www.youtube.com/@LindsyTorres23",

    CONTACT_EMAIL: "info@lindsytorres.com",

    // TODO: Provision and paste real IDs — analytics scripts stay off
    // until then (see assets/js/analytics.js).
    GA_MEASUREMENT_ID: "",
    META_PIXEL_ID: "",
    VERCEL_ANALYTICS: false,
  },
};

window.hasAsset = function hasAsset(path) {
  return typeof path === "string" && path.trim().length > 0;
};

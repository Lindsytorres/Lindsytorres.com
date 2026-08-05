/**
 * RECALIBRACIÓN DE AUTORIDAD™ — Central configuration
 * TODO: Replace placeholder values before public launch.
 */
window.siteConfig = {
  siteName: "Recalibración de Autoridad™",
  mentor: "Lindsy Torres",
  duration: "3 a 4 horas de trabajo intensivo",

  integrations: {
    // Every "Reservar" button opens this single WhatsApp link — a personal,
    // concierge-style booking flow instead of a self-serve calendar.
    BOOKING_URL: "https://wa.link/9ldkcx",
    INSTAGRAM_URL: "https://instagram.com/lindsytorres",
    CONTACT_EMAIL: "info@lindsytorres.com",
    WHATSAPP_NUMBER: "",
  },
};

/** True when a configured asset/link path actually points at something usable. */
window.hasAsset = function hasAsset(path) {
  return typeof path === "string" && path.trim().length > 0;
};

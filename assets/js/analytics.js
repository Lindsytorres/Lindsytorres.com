/**
 * Analytics utility — GA4 / Meta Pixel ready, silent until real IDs exist.
 * Same pattern used across theprivateroom/ and recalibracion/.
 */
(function () {
  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  function loadGA(measurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }

  function loadMetaPixel(pixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }

  if (cfg.GA_MEASUREMENT_ID) loadGA(cfg.GA_MEASUREMENT_ID);
  if (cfg.META_PIXEL_ID) loadMetaPixel(cfg.META_PIXEL_ID);

  window.trackEvent = function trackEvent(eventName, payload) {
    payload = payload || {};
    try {
      if (isLocal) console.info("[trackEvent]", eventName, payload);
      if (cfg.META_PIXEL_ID && window.fbq) window.fbq("trackCustom", eventName, payload);
      if (cfg.GA_MEASUREMENT_ID && window.gtag) window.gtag("event", eventName, payload);
    } catch (err) {
      if (isLocal) console.warn("[trackEvent] failed silently", err);
    }
  };

  window.captureUTMs = function captureUTMs() {
    const params = new URLSearchParams(location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const existing = JSON.parse(sessionStorage.getItem("lt_utms") || "{}");
    let changed = false;
    utmKeys.forEach((key) => {
      if (params.has(key)) {
        existing[key] = params.get(key);
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem("lt_utms", JSON.stringify(existing));
    return existing;
  };

  window.captureUTMs();
})();

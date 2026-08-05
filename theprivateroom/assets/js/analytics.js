/**
 * Analytics utility — Meta Pixel / GA4 / GTM ready, but silent until
 * real IDs are configured in assets/js/config.js.
 *
 * TODO: Once META_PIXEL_ID / GA_MEASUREMENT_ID / GTM_ID are set, this file
 * will lazy-inject the corresponding scripts. Until then it only logs to
 * the console in local development so the event map can be reviewed.
 */
(function () {
  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};
  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

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

  window.siteConfig.analyticsEnabled = Boolean(
    cfg.META_PIXEL_ID || cfg.GA_MEASUREMENT_ID || cfg.GTM_ID
  );

  if (cfg.META_PIXEL_ID) loadMetaPixel(cfg.META_PIXEL_ID);
  if (cfg.GA_MEASUREMENT_ID) loadGA(cfg.GA_MEASUREMENT_ID);

  /**
   * trackEvent(eventName, payload)
   * Fires to Meta Pixel + GA4 when configured. Always logs in local dev.
   * Never throws — a missing analytics provider must never break the UI.
   */
  window.trackEvent = function trackEvent(eventName, payload) {
    payload = payload || {};
    try {
      if (isLocal) {
        console.info("[trackEvent]", eventName, payload);
      }
      if (cfg.META_PIXEL_ID && window.fbq) {
        window.fbq("trackCustom", eventName, payload);
      }
      if (cfg.GA_MEASUREMENT_ID && window.gtag) {
        window.gtag("event", eventName, payload);
      }
      if (cfg.GTM_ID && window.dataLayer) {
        window.dataLayer.push({ event: eventName, ...payload });
      }
    } catch (err) {
      if (isLocal) console.warn("[trackEvent] failed silently", err);
    }
  };

  /** Preserve UTM params across the application flow via sessionStorage. */
  window.captureUTMs = function captureUTMs() {
    const params = new URLSearchParams(location.search);
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    const existing = JSON.parse(sessionStorage.getItem("tpr_utms") || "{}");
    let changed = false;
    utmKeys.forEach((key) => {
      if (params.has(key)) {
        existing[key] = params.get(key);
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem("tpr_utms", JSON.stringify(existing));
    return existing;
  };

  window.captureUTMs();
})();
